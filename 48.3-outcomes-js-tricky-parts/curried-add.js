function curriedAdd() {
    let result = 0;

    const sum = (num) => {
        if (num === undefined) {
            return result;
        }
        result += num;
        return sum;
    }

    if (arguments.length === 0) {
        return sum();
    } else {
        return sum(arguments[0]);
    }
}

module.exports = { curriedAdd };
