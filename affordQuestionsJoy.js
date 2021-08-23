const Joi = require('joi');
let data = [
    {
        "_id": "3kjdfls343",
        "vendorID": "123",
        "apiVersion":"0.1",
        "questions":[{
            "questionType":"Income",
            "question":"Salary"       
        },
        {
            "questionType":"Income",
            "question":"Rental Income"       
        },
        {
            "questionType":"Expense",
            "question":"Bond Instalment"
        }
        ]   
    }]
const incomingSchema = { schemaToValidate: data}



const questionsSchema = Joi.array().items(Joi.object().keys({
        questionType: Joi.string(),
        question: Joi.string()
    }));

const Schema = Joi.array().items({
    _id: Joi.string(),
    vendorID: Joi.string(),
    apiVersion: Joi.string(),
    questions: questionsSchema
});

const finalSchema = Joi.object().keys({
    schemaToValidate: Schema,
    questions: questionsSchema
});

const xx = finalSchema.validate(incomingSchema)
    console.log(xx)