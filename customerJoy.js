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

const schema = new Schema({
    id: {type:String},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    RSAIDNumber: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    homeNumber: { type: String },
    workNumber: { type: String },
    emailAddress: {type: String, required: true },
    homeAddress1: {type: String, required: true },
    homeAddress2: {type: String},
    
    homeCity: {type: String, required: true },
    homeSuburb: {type: String, required: true },
    homePostalCode: {type: String, required: true },
    deliveryAddress1: {type: String, required: true },
    deliveryAddress2: {type: String},
    deliveryCity: {type: String, required: true },
    deliverySuburb: {type: String, required: true },
    deliveryPostalCode: {type: String, required: true },
    employerName:{type: String},
    employerAddress1: {type: String},
    employerAddress2: {type: String},
    employerAddressCity: {type: String},
    employerAddressPostalCode: {type: String},
    employerContactNumber: {type:String},
    bankName:{type: String, required: true },
    bankBranch:{type: String },
    bankAccountNumber:{type: String, required: true },
    bankAccountType:{type: String, required: true },
    bankAccHolderName:{type: String},
    verifiableIncome:{type: Boolean},
    role: { type: String, required: true },
    uploadedDocs: {
        name:String,
        surname:String,
        idNumber:String,
        documentType:String,
        dateUploaded:Date,
        bankStatment:String,
        paySlip:String
    },
    //creditScore:{type: String},
    verificationToken: String,
    verified: Date,
    resetToken: {
        token: String,
        expires: Date
    },
    updated : {type: Date}  ,
    active: {type: Boolean},
    createDate: {type : Date, default: Date.now }
});

const incomeSchema = Joi.array().items(Joi.object().keys({
    other: Joi.number(),
    salary: Joi.number(),
    rentalIncome: Joi.number(),
    supplementaryEmployment: Joi.number()
}));

const expenseSchema = Joi.array().items(Joi.object().keys({
    bondInstalment: Joi.number(),
    creditCardInstalment: Joi.number(),
    education: Joi.number(),
    electricity: Joi.number(),
    entertainment: Joi.number(),
    insurancePremiums: Joi.number(),
    loanInstalments: Joi.number()
}));


const finalSchema = Joi.object().keys({
    promissory: promissorySchema,
    lastResponseCodes: lastResponseCodesSchema
});

const xx = finalSchema.validate(promSchema)
    