'use strict';

module.exports = function(err, req, res, next) {
    var responseData;

    if (err.name === 'JsonSchemaValidation') {
        res.status(400);
        responseData = {
            statusText: 'Bad Request',
            jsonSchemaValidation: true,
            validations: err.validations
        };
        res.json(responseData);
    } else {
        next(err);
    }
};