function findFloor(arr, num) {
    const length = arr.length;

    if (arr[0] > num) {
        //num is smaller than the smallest number in arr, return -1
        return -1;
    }
    if (arr[length - 1] <= num) {
        //num is greater than the largest number in arr, return the last number
        return arr[length - 1];
    }

    let midIndex;
    let midValue;

    let left = 0;
    let right = length - 1;

    let floor = -1;

    while (left <= right) {
        midIndex = Math.floor((left + right) / 2);
        midValue = arr[midIndex];

        if (midValue === num) {
            //find num, return num
            return num;
        }

        if (midValue > num) {
            //midValue is greater than num, just check numbers on the left of midValue
            right = midIndex - 1;
        } else {
            //midValue is smaller than num, just check number on the right of midValue
            //let the floor equal to midValue
            left = midIndex + 1;
            floor = midValue;
        }
    }

    return floor;
}

module.exports = findFloor