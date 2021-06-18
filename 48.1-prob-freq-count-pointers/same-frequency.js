// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {

    function digitFrequency(num) {
        const counter = new Map();
        const str = String(num);

        for (let digit of str) {
            counter.set(digit, counter.has(digit) ? counter.get(digit) + 1 : 1);
        }
        return counter;
    }

    const counter1 = digitFrequency(num1);
    const counter2 = digitFrequency(num2);

    if (counter1.size !== counter2.size) {
        return false;
    }

    for (let digit of counter1.keys()) {
        if (!counter2.has(digit) ||
            counter1.get(digit) !== counter2.get(digit)) {
            return false;
        }
    }

    return true;
}

module.exports = sameFrequency;