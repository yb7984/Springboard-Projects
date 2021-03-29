const express = require('express');
const ExpressError = require('./expressError');
const { getNums, getMean, getMedian, getMode } = require('./helper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/mean", (req, res, next) => {
    try {
        const nums = getNums(req.query.nums);
        const result = getMean(nums);

        return res.json({ operation: "mean", value: result });
    } catch (err) {
        next(err);
    }
});


app.get("/median", (req, res, next) => {
    try {
        const nums = getNums(req.query.nums);
        const result = getMedian(nums);

        return res.json({ operation: "median", value: result });
    } catch (err) {
        next(err);
    }
});


app.get("/mode", (req, res, next) => {
    try {
        const nums = getNums(req.query.nums);
        const result = getMode(nums);

        return res.json({ operation: "mode", value: result });
    } catch (err) {
        next(err);
    }
});

// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

// generic error handler
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});
// end generic handler
app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});