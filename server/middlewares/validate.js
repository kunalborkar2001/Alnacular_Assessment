const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
    // Request body should be JSON, if present
    if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
        return next(
            new ApiError(
                httpStatus.UNSUPPORTED_MEDIA_TYPE,
                "Supports JSON request body only"
            )
        );
    }

    const object = { body: req.body }; // Wrap req.body in a 'body' object

    
    // Define custom Joi schema to allow single object or array of objects
    const customSchema = Joi.object({
        body: Joi.alternatives().try(
            schema.body,
            Joi.array().items(schema.body)
        ).required()
    });

    const { value, error } = customSchema
        .prefs({ errors: { label: "key" } })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    // Extract validated body array or object and assign it to req.body
    req.body = value.body;

    return next();
};

module.exports = validate;
