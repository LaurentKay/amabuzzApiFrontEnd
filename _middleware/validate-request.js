module.exports = {validateRequest, validateReques, validateReque, validateRequ};

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    //console.log(req.body)
    const { error, value } = schema.validate(req.body,options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}
function validateReques(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    //console.log('Really: ', req.body)
    const { error, value } = schema.validate(req.body.ROOT);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        //console.log('Really: ', req.body);
        next();
    }
}
function validateReque(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    //console.log('Really: ', req.body)
    const {customer, reCaptchaValue, promoCode} = req.body;
    const { error, value } = schema.validate(customer, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = {value, reCaptchaValue, promoCode};
        //console.log('Reallyyyyy: ', req.body);
        next();
    }
}
function validateRequ(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    //console.log('Really: ', req.body)
    const {customer, promoCode} = req.body;
    const { error, value } = schema.validate(customer, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = {value, promoCode};
        //console.log('Reaaaaaaaly: ', req.body);
        next();
    }
}
