// add whatever parameters you deem necessary
function constructNote(message, letters) {
    function charCounter(str) {
        const counter = new Map();
        for (const char of str) {
            counter.set(char, counter.has(char) ? counter.get(char) + 1 : 1);
        }
        return counter;
    }

    const messageCounter = charCounter(message);
    const lettersCounter = charCounter(letters);

    if (lettersCounter.size < messageCounter.size) {
        return false;
    }

    for (const char of messageCounter.keys()) {
        if (!lettersCounter.has(char) ||
            messageCounter.get(char) > lettersCounter.get(char)) {
            return false;
        }
    }

    return true;
}

module.exports = constructNote;