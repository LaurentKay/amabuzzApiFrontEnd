const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {validateRequest} = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
//const accountService = require('../accounts/account.service');
const customerVerificationService = require('./customerVerification.service');

// routes
router.get('/getAllCustomerVerificationQuestions', authorize(), getAllCustomerVerificationQuestions);
router.post('/getCustomerVerificationQuestions', authorize(),getCustomerVerificationQuestions);
router.post('/getCustomerCompuscanAnswers', getCustomerCompuscanAnswers);
//Schemas



//End of Schemas


function getAllCustomerVerificationQuestions(req, res, next) {
    customerVerificationService.getAllCustomerVerificationQuestions()
        .then(customerVerificationQuestions => res.json(customerVerificationQuestions))
        .catch(next);
}


function getCustomerVerificationQuestions(req, res, next)
{
   customerVerificationService.getCustomerVerificationQuestions(req.body)
  .then(customerVerificationQuestions => customerVerificationQuestions ? res.json(customerVerificationQuestions) : res.sendStatus(404))
  .catch(next);
}

function getCustomerCompuscanAnswers(req, res, next)
{
   customerVerificationService.getCustomerCompuscanAnswers(req.body)
  .then(customerVerificationQuestions => customerVerificationQuestions ? res.json(customerVerificationQuestions) : res.sendStatus(404))
  .catch(next);
}



// helper functions
function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 7 days
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
  }
  
  module.exports = router;