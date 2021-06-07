function findRotationCount(arr) {
    const length = arr.length;
    const first = arr[0];
    const last = arr[length - 1];

    let midIndex;
    let midValue;

    let left = 0;
    let right = length - 1;

    if (first > last) {
        //find the turn point
        while (left <= right) {
            midIndex = Math.floor((left + right) / 2);
            midValue = arr[midIndex];

            if (midValue >= first) {
                if (midValue > arr[midIndex + 1]) {
                    //turn point
                    return midIndex + 1;
                }
                left = midIndex + 1;
            } else {
                if (midValue < arr[midIndex - 1]) {
                    //turn point
                    return midIndex;
                }
                right = midIndex - 1;
            }
        }
    }

    return 0;
}

module.exports = findRotationCount