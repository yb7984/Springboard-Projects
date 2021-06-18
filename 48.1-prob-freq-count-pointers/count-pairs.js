// add whatever parameters you deem necessary
function countPairs(nums, sum) {

    function merge(nums1, nums2) {
        let i = 0;
        let j = 0;
        const result = [];
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] <= nums2[j]) {
                result.push(nums1[i]);
                i++;
            } else {
                result.push(nums2[j]);
                j++;
            }
        }

        while (i < nums1.length) {
            result.push(nums1[i]);
            i ++;
        }

        while (j < nums2.length) {
            result.push(nums2[j]);
            j ++;
        }

        return result;
    }
    function sort(nums) {
        if (nums.length <= 1){
            return nums;
        }

        let arr = nums.map(num => ([num]));

        let length = nums.length;

        while (length > 1) {
            const result = [];

            let i = 0;
            while (i < arr.length) {
                if (i + 1 === arr.length) {
                    result.push(arr[i]);
                    i++;
                }
                else {
                    result.push(merge(arr[i], arr[i + 1]));
                    i += 2;
                }
            }
            arr = result;
            length = arr.length;
        }

        return arr[0];
    }

    const sorted = sort(nums);

    let left = 0;
    let right = sorted.length - 1;

    let count = 0;
    while (left < right) {
        const total = sorted[left] + sorted[right];
        if (total === sum) {
            count++;
            left++;
            right--;
        } else if (total < sum) {
            left++;
        } else {
            right--;
        }
    }

    return count;
}

module.exports = countPairs;
