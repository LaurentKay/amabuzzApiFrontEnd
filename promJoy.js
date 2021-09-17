const Joi = require('joi');
let data = [
    {
        "_id": "weqweqwe",
        "customerID": "dgfdfgfd",
        "firstName": "Test",
        "lastName": "tester",
        "promissoryId": "F2123AS",
        "nextInstalmentDate": "2021-04-01",
        "instalmentAmount": 500,
        "remainingInstalments":5,
        "bankName": "FNB",
        "accountNumber":"25414774",
        "dateOfLastInstalment":"2021-03-31",
        "lastResponseCodes":
        [
            {
                "lastResponseCode": "00",
                "responseDate": "2021-03-31"
            },
            {
                "lastResponseCode": "F2",
                "responseDate": "2021-02-28"
            }
        ]
}]
const promSchema = { promissory: data}

const promissorySchema = Joi.array().items({
        _id: Joi.string(),
        customerID: Joi.string().trim().required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        promissoryId: Joi.string().trim().required(),
        nextInstalmentDate: Joi.date().required(),
        instalmentAmount: Joi.number(),
        remainingInstalments: Joi.number(),
        bankName: Joi.string().trim().required(),
        accountNumber: Joi.string().trim().required(),
        dateOfLastInstalment: Joi.date() ,
        lastResponseCodes: Joi.array()
});

const lastResponseCodesSchema = Joi.array().items(Joi.object().keys({
    lastResponseCode: Joi.string(),
    responseDate: Joi.date()
}));

const finalSchema = Joi.object().keys({
    promissory: promissorySchema,
    lastResponseCodes: lastResponseCodesSchema
});

const xx = finalSchema.validate(promSchema)
    