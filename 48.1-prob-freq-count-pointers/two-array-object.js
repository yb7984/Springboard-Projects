// add whatever parameters you deem necessary
function twoArrayObject(keys, values) {
    const obj = {};

    const len = keys.length;
    const vLen = values.length;

    for (let i = 0; i < len; i++) {
        obj[keys[i]] = i < vLen ? values[i] : null;
    }
    return obj;
}

module.exports = twoArrayObject;