function findRotatedIndex(arr, num) {

    const length = arr.length;
    const first = arr[0];
    const last = arr[length - 1];

    let midIndex;
    let midValue;

    let left = 0;
    let right = length - 1;

    let turnIndex = -1;

    if (first >= last) {
        //find the turn point
        while (left <= right) {
            midIndex = Math.floor((left + right) / 2);
            midValue = arr[midIndex];

            if (midValue === num) {
                //found the value 
                return midIndex;
            }
            if (midValue >= first) {
                if (midValue > arr[midIndex + 1]) {
                    //turn point
                    turnIndex = midIndex + 1;
                    break;
                }
                left = midIndex + 1;
            } else {
                if (midValue < arr[midIndex - 1]) {
                    //turn point
                    turnIndex = midIndex;
                    break;
                }
                right = midIndex - 1;
            }
        }
    }

    left = num >= first ? 0 : turnIndex;
    right = num >= first ? turnIndex - 1 : length - 1;

    //find the index
    while (left <= right) {
        midIndex = Math.floor((left + right) / 2);
        midValue = arr[midIndex];

        if (midValue === num) { 
            //found the value 
            return midIndex;
        }
        if (midValue < num) {
            left = midIndex + 1;
        } else {
            right = midIndex - 1;
        }
    }

    return -1;
}

module.exports = findRotatedIndex