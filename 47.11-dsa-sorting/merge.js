function merge(arr1, arr2) {
    const result = [];

    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let newArr = arr.map(item => ([item]));

    function mergeArr(arr) {
        let i = 0;
        let newArr = [];
        while (i < arr.length) {
            if (i + 1 < arr.length) {
                newArr.push(merge(arr[i], arr[i + 1]));
                i += 2;
            } else {
                newArr.push(arr[i]);
                i++;
            }
        }
        return newArr;
    }

    while (newArr.length > 1) {
        newArr = mergeArr(newArr);
    }

    return newArr[0];
}

module.exports = { merge, mergeSort };