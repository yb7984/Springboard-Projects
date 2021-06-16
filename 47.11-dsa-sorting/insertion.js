function insertionSort(arr) {

    function insert(arr, index) {
        for (let i = 0; i < index; i++) {
            if (arr[i] > arr[index]) {
                const num = arr[index];

                arr.splice(index, 1);
                arr.splice(i, 0, num);
                return;
            }
        }
    }
    for (let i = 1; i < arr.length; i++) {
        insert(arr, i);
    }

    return arr;
}

module.exports = insertionSort;