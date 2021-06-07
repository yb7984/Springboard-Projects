function sortedFrequency(arr, num) {

    const length = arr.length;

    let left = 0;
    let right = length - 1;

    let midIndex;
    let midValue;


    while (left <= right) {
        midIndex = Math.floor((left + right) / 2);
        midValue = arr[midIndex];
        if (midValue >= num) {
            right = midIndex - 1;
        } else {
            left = midIndex + 1;
        }
    }

    const firstIndex = midValue === num ? midIndex : midIndex + 1;


    left = 0;
    right = length - 1;
    while (left <= right) {
        midIndex = Math.floor((left + right) / 2);
        midValue = arr[midIndex];
        if (midValue > num) {
            right = midIndex - 1;
        } else {
            left = midIndex + 1;
        }
    }

    const lastIndex = midValue === num ? midIndex : midIndex - 1;

    return lastIndex - firstIndex + 1;
}

module.exports = sortedFrequency