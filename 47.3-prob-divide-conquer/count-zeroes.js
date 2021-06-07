function countZeroes(arr) {

    const length = arr.length;

    let left = 0;
    let right = length - 1;
    let midValue;
    let midIndex;
    while (left <= right) {
        midIndex = Math.floor((left + right) / 2);
        midValue = arr[midIndex];
        
        if (midValue === 0) {
            right = midIndex - 1;
        } else if (midValue === 1) {
            left = midIndex + 1;
        }
    }

    if (midValue === 0) {
        return length - midIndex;
    } else {
        return length - midIndex - 1;
    }

}

module.exports = countZeroes