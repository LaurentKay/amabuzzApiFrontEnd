const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const compuscanService = require('../compuscan/compuscans.service');
const _ = require("lodash"); 
const { response } = require('express');
//const lodashClonedeep = require('lodash.clonedeep');

module.exports = {
    getAllCustomerVerificationQuestions,
    getCustomerVerificationQuestions,
    getCustomerCompuscanAnswers
};


async function getAllCustomerVerificationQuestions() 
{
    const customerVerification = await db.Customerincorrectanswers.find();
    return customerVerification;
}


async function getCustomerVerificationQuestions(req) 
{   
    const customerVerification = await db.Customerincorrectanswers.find();
    var questions = _.pick(customerVerification[0], req.questionTypes)
    return questions
}

async function getCustomerCompuscanAnswers(request) 
{   
    let compuscanAnswers = {};
    const compuscan = await db.Compuscan.findOne({"customerId":request.customerId});
    console.log(compuscan.EnqCC_ADDRESS);
    console.log(compuscan.EnqCC_EMPLOYER);
    compuscanAnswers = compuscan.EnqCC_ADDRESS;
    console.log('compuscanAnswers' + compuscanAnswers);
    compuscanFinal = Object.assign(compuscanAnswers, compuscan.EnqCC_CPA_ACCOUNTS);
    console.log('compuscanAnswersafterassign' + compuscanFinal);
    /*
    for(var i = 0; i < request.questionTypes.length; i++)
    {
        
            switch(request.questionTypes[i])
            {
                case 'addresses':
                    //console.log(request.questionTypes[i])
                    var addresses = compuscan.EnqCC_PUBLIC_DEFAULTS; 
                    console.log("addresses Switch " + addresses)
                    if(addresses)
                    {
                        addresses.questionType = "Addresses";
                        compuscanAnswers = Object.assign(compuscanAnswers, addresses)
                    }
                    
                    break;

                case 'accounts':
                    console.log(request.questionTypes[i] + ' ' + i)
                    var accounts = compuscan.EnqCC_ADDRESS
                    console.log(accounts)
                    if(accounts)
                    {
                        accounts.questionType = "Accounts";
                        compuscanAnswers = Object.assign(compuscanAnswers, accounts)
                    }
                    
                    break;

                case 'employers':
                    //console.log(request.questionTypes[i])
                    var employers = compuscan.EnqCC_EMPLOYER
                    if(employers)
                    {
                        employers.questionType = "Employers";
                        compuscanAnswers = Object.assign(compuscanAnswers, employers)
                    }
                    break;

                case 'telephoneNumbers':
                    //console.log(request.questionTypes[i])
                    var telephoneNumbers = compuscan.EnqCC_TELEPHONE
                    if(telephoneNumbers)
                    {
                        telephoneNumbers.questionType = "Telephone Numbers"
                        compuscanAnswers = Object.assign(compuscanAnswers, telephoneNumbers)
                    }
                    break;
        }        
    }  */ 
    
    return compuscanFinal;
}

