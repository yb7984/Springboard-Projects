function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let makeChange = false;
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                makeChange = true;
            }
        }

        if (!makeChange){
            break;
        }
    }

    return arr;
}

module.exports = bubbleSort;