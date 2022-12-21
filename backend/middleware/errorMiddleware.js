const errorHandler = (err, req, res, next) => {
    // Check the status code, if it is a good status code, send a bad one instead.
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {errorHandler}