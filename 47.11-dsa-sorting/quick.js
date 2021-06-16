/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, start = 0, end = -1) {

    if (end === -1) {
        end = arr.length - 1;
    }
    if (arr.length === 0 || start > end) {
        return -1;
    } else if (arr.length === 1 || end === start) {
        return 0;
    }

    const pivotValue = arr[start];
    let pivotIndex = start;

    for (let i = start + 1; i <= end; i++) {
        if (arr[i] < pivotValue) {
            const value = arr[i];
            arr.splice(i, 1);  //delete from arr
            arr.splice(start, 0, value); //insert into the first position
            pivotIndex++;
        }
    }
    return pivotIndex;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr) {

    const start = 0;
    const end = arr.length - 1;

    function sortHelper(arr, start, end) {
        let pivotIndex = pivot(arr, start, end);

        if (start < pivotIndex - 1) {
            sortHelper(arr, start, pivotIndex - 1);
        }
        if (end > pivotIndex + 1) {
            sortHelper(arr, pivotIndex + 1, end);
        }
    }

    sortHelper(arr, start, end);

    return arr;
}

module.exports = { pivot, quickSort };