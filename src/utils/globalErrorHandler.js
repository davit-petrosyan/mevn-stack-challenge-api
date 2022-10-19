const createError = require('http-errors');
const customErrors = require('./customErrors');

module.exports = app => {

    const formatError = err => {
        if (err.errors) {
            const errorKey = Object.keys(err.errors)[0];
            return {
                ...customErrors.duplicationDetected,
                message: err.errors[errorKey].message
            }
        } else {
            return {
                message: err.message,
                name: err.name,
                private: err.private || false,
                status: err.status || 500
            }
        }
    };

    app.use((req, res, next) => {
        next(createError(404));
    });

    app.use((err, req, res, next) => {
        const error = formatError(err);
        let unexpectedError = false;

        if (!error.status || error.status >= 500 || error.private) {
            unexpectedError = true;
            console.log('####################');
            console.log(err);
            console.log('####################');

        }

        if (error.private) return;

        if (unexpectedError) res.status(500).json({error: customErrors.defaultError});
        else res.status(error.status).json({error});
    });
};

