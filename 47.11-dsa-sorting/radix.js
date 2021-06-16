function radixSort(arr) {
    function sortHelper(arr, level) {
        const result = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];

        for (let i = 0; i < arr.length; i++) {
            result[getDigit(arr[i] , level)].push(arr[i]);
        }

        return result[0].concat(
            result[1],
            result[2],
            result[3],
            result[4],
            result[5],
            result[6],
            result[7],
            result[8],
            result[9]);
    }

    const maxLevel = mostDigits(arr);

    for (let i = 0; i <= maxLevel; i++) {
        arr = sortHelper(arr, i);
    }

    return arr;
}

function getDigit(num, level) {
    return Math.floor(num / (Math.pow(10 , level))) % 10;
}

function digitCount(num) {
    return String(num).length;
}

function mostDigits(arr) {
    if (arr.length === 0){
        return 0;
    }
    return digitCount(Math.max(...arr));
}

module.exports = {
    radixSort,
    getDigit,
    digitCount,
    mostDigits
};