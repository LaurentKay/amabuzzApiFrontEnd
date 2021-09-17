const Joi = require('joi');
let data = [
    
        {
            "_id": "6040da95e062be0e4442d997",
            "firstName": "Gina",
            "lastName": "Davids",
            "RSAIDNumber": "5708312415211",
            "mobileNumber": "1233223",
            "homeNumber": "078456465",
            "workNumber": "13456454",
            "emailAddress": "test@domain.com",
            "homeAddress1": "14 Burberry Lane",
            "homeAddress2": "Homey2",
            "homeCity": "Pretoria",
            "homeSuburb": "Centurion",
            "homePostalCode": "0002",
            "bankName": "Capitec Bank",
            "bankAccountNumber": "445566887",
            "bankAccHolderName": "D Alli",
            "updated": "2021-03-09T09:39:58.812Z",
            "active": true,
            "verifiableIncome":true,
            "uploadedDocs": {
                "name": "Gina",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                "surname": "Davids",
                "idNumber": "5708312415211",
                "documentType": "BankStatment",
                "dateUploaded": "2021-04-12T22:00:00.000Z",
                "bankStatment": "./uploads/bank_20210413_78845123214_1.pdf",
                "paySlip": "./blah"
            },
            "affordability":[
                {
                    "questionType":"Income",
                    "question":"Rental Income",
                    "amount":5000
                },
                {
                    "questionType":"Expense",
                    "question":"Rent",
                    "amount":500},
                {
                    "questionType":"Income",
                    "question":"Salary",
                    "amount":15000
                }
            ]
     
}]
const incomingSchema = { schemaToValidate: data}

const affordabilitySchema = Joi.array().items(Joi.object().keys({
    questionType: Joi.string(),
    question: Joi.string(),
    amount: Joi.number()
}));

const schema = Joi.array().items({
    _id: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    RSAIDNumber: Joi.string(),
    mobileNumber: Joi.string(),
    homeNumber: Joi.string(),
    workNumber: Joi.string(),
    emailAddress: Joi.string(),
    homeAddress1: Joi.string(),
    homeAddress2: Joi.string(),
    
    homeCity: Joi.string(),
    homeSuburb: Joi.string(),
    homePostalCode: Joi.string(),
    deliveryAddress1: Joi.string(),
    deliveryAddress2: Joi.string(),
    deliveryCity: Joi.string(),
    deliverySuburb: Joi.string(),
    deliveryPostalCode: Joi.string(),
    employerName: Joi.string(),
    employerAddress1: Joi.string(),
    employerAddress2: Joi.string(),
    employerAddressCity: Joi.string(),
    employerAddressPostalCode: Joi.string(),
    employerContactNumber: Joi.string(),
    bankName:Joi.string(),
    bankBranch:Joi.string(),
    bankAccountNumber:Joi.string(),
    bankAccountType:Joi.string(),
    bankAccHolderName:Joi.string(),
    verifiableIncome:Joi.boolean(),
    role: Joi.string(),
    uploadedDocs: {
        name:Joi.string(),
        surname:Joi.string(),
        idNumber:Joi.string(),
        documentType:Joi.string(),
        dateUploaded:Joi.date(),
        bankStatment:Joi.string(),
        paySlip:Joi.string()
    },
    //creditScore:{type: String},
    verificationToken: Joi.string(),
    verified: Joi.date(),
    resetToken: {
        token: Joi.string(),
        expires: Joi.date()
    },
    updated : Joi.date()  ,
    active: Joi.boolean(),
    createDate: Joi.date(),
    affordability:affordabilitySchema

});


const finalSchema = Joi.object().keys({
    schemaToValidate: schema,
    affordability: affordabilitySchema
});

const xx = finalSchema.validate(incomingSchema)
    