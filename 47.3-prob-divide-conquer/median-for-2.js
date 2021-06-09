const findFloor = require("./find-floor");

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function (nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;

    let left1 = 0;
    let right1 = m - 1;
    let left2 = 0;
    let right2 = n - 1;

    if (m === 0 && n === 0) {
        return null;
    }

    if (m === 0) {
        return getMedian(nums2, left2, right2);
    }

    if (n === 0) {
        return getMedian(nums1, left1, right1);
    }

    let med1;
    let med2;
    while (right1 - left1 >= 2 && right2 - left2 >= 2) {
        med1 = getMedian(nums1, left1, right1);
        med2 = getMedian(nums2, left2, right2);

        let medLength = Math.floor((right1 - left1 > right2 - left2 ? right2 - left2 : right1 - left1) / 2);

        if (med1 > med2) {
            right1 = right1 - medLength;
            left2 = left2 + medLength;
        } else if (med2 > med1) {
            left1 = left1 + medLength;
            right2 = right2 - medLength;
        } else {
            return med1;
        }
    }

    debugger;

    // console.log(left1, right1, left2, right2)

    if (right1 - left1 < 2 && right2 - left2 >= 2) {

        if (right1 === left1) {
            return getMedianFromArrayAnd1Num(nums2, nums1[left1], left2, right2);
        }

        return getMedianFromArrayAnd2Nums(nums2, nums1[left1], nums1[right1], left2, right2);

    } else if (right1 - left1 >= 2 && right2 - left2 < 2) {
        if (right2 === left2) {
            return getMedianFromArrayAnd1Num(nums1, nums2[left2], left1, right1);
        }
        return getMedianFromArrayAnd2Nums(nums1, nums2[left2], nums2[right2], left1, right1);

    }

    const newArray = [];

    let idx1 = left1;
    let idx2 = left2;

    while (idx1 <= right1 || idx2 <= right2) {
        if (idx1 <= right1 && idx2 <= right2) {
            if (nums1[idx1] <= nums2[idx2]) {
                newArray.push(nums1[idx1]);

                idx1++;
            } else {
                newArray.push(nums2[idx2]);
                idx2++;
            }
        }
        if (idx1 > right1) {
            newArray.push(nums2[idx2]);
            idx2++;
        } else if (idx2 > right2) {
            newArray.push(nums1[idx1]);
            idx1++;
        }
    }

    return getMedian(newArray, 0, newArray.length - 1);
};

function getMedian(arr, left, right) {
    if ((left + right) % 2 === 0) {
        return arr[(left + right) / 2];
    } else {
        return (arr[Math.floor((left + right) / 2)] + arr[Math.floor((left + right) / 2) + 1]) / 2;
    }
}

function getMedianFromArrayAnd1Num(arr, num, l, r) {
    let left = l;
    let right = r;

    if (num >= arr[right]) {
        return getMedian(arr, left, right + 1);
    } else if (num <= arr[left]) {
        return getMedian(arr, left - 1, right);
    }

    const floorIdx = findFloorIndex(arr, num, left, right)
    const midIndex = Math.floor((left + right) / 2);

    if ((left + right) % 2 === 1) {
        if (floorIdx === midIndex) {
            return num;
        } else {
            if (floorIdx < midIndex) {
                return arr[midIndex];
            } else {
                return arr[midIndex + 1];
            }
        }
    } else {
        if (floorIdx === midIndex) {
            return (arr[midIndex] + num) / 2;
        } else {
            if (floorIdx === midIndex + 1) {
                return (arr[midIndex + 1] + num) / 2;
            } else if (floorIdx === midIndex - 1) {
                return (arr[midIndex] + num) / 2;
            }

            if (floorIdx > midIndex) {
                return (arr[midIndex] + arr[midIndex + 1]) / 2;
            } else {
                return (arr[midIndex] + arr[midIndex - 1]) / 2;
            }
        }
    }
}

function getMedianFromArrayAnd2Nums(arr, num1, num2, l, r) {

    let left = l;
    let right = r;

    if (num1 >= arr[right]) {
        return getMedian(arr, left + right + 2);
    } else if (num2 <= arr[left]) {
        return getMedian(arr, left - 2, right);
    }

    const floorLeft = findFloorIndex(arr, num1, left, right);
    const floorRight = findFloorIndex(arr, num2, left, right);

    console.log(arr , num1 , num2, left , right, floorLeft, floorRight)

    if (floorLeft === -1 && floorRight === right) {
        return getMedian(arr, left, right);
    } else if (floorLeft == -1) {
        right = right - 1;
        return getMedianFromArrayAnd1Num(arr, num2, left, right);
    } else if (floorRight === right) {
        left = left + 1;
        return getMedianFromArrayAnd1Num(arr, num1, left, right);
    } else {
        if (floorLeft - left === right - floorRight) {
            if (floorLeft === floorRight) {
                return (num1 + num2) / 2;
            } else {
                return getMedian(arr, left, right);
            }
        } else if (floorLeft - left > right - floorRight) {
            left = left + right - floorRight + 1;
            right = floorRight;

            return getMedianFromArrayAnd1Num(arr, num1, left, right);
        } else {
            right = right + left - floorLeft;
            left = floorLeft + 1;

            return getMedianFromArrayAnd1Num(arr, num1, left, right);
        }
    }
}


function findFloorIndex(arr, num, l, r) {

    if (arr[l] > num) {
        //num is smaller than the smallest number in arr, return -1
        return -1;
    }
    if (arr[r] <= num) {
        //num is greater than the largest number in arr, return the last index
        return r;
    }

    let left = l;
    let right = r;

    let midIndex;
    let midValue;

    let floor = -1;

    while (left <= right) {
        midIndex = Math.floor((left + right) / 2);
        midValue = arr[midIndex];

        if (midValue === num) {
            //find num, return midIndex
            return midIndex;
        }

        if (midValue > num) {
            //midValue is greater than num, just check numbers on the left of midValue
            right = midIndex - 1;
        } else {
            //midValue is smaller than num, just check number on the right of midValue
            //let the floor equal to midValue
            left = midIndex + 1;
            floor = midIndex;
        }
    }
    return floor;
}

findMedianSortedArrays
// module.exports = findMedianSortedArrays;