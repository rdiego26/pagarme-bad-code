'use strict';

module.exports = function(err, req, res, next) {

    if (err.name === 'JsonSchemaValidation') {
        res.status(400);

        res.json({
            statusText: 'Bad Request',
            validations: err.validations
        });
    } else {
        next(err);
    }
};