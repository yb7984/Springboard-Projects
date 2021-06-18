// add whatever parameters you deem necessary
function isSubsequence(sub, str) {
    if (sub.length > str.length) {
        return false;
    }

    if (sub === str) {
        return true;
    }

    let i = 0;
    let j = 0;
    const subArr = Array.from(sub);
    const strArr = Array.from(str);
    while (i < sub.length && j < str.length) {
        if (subArr[i] !== strArr[j]) {
            j++;
        } else {
            i++;
            j++;
        }
    }

    return i === sub.length;
}

module.exports = isSubsequence;
