const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {validateRequest} = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
//const accountService = require('../accounts/account.service');
const affordabilityQuestionsService = require('./affordabilityQuestions.service');
const customerService = require('../customers/customers.service');

// routes
router.get('/',  getAll);
//router.get('/:id',  getById);
router.post('/',  authorize(), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id',authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    //console.log('THis one');
    affordabilityQuestionsService.getAllAffordabilityQuestions()
       .then(AffordabilityQuestions => res.status(200).json(AffordabilityQuestions))
       .catch(next);
}

function insert(req, res, next){
    affordabilityQuestionsService.createAffordabilityQuestions(req.body)
        .then(affordabilityQuestions =>res.status(200).send(affordabilityQuestions))
        .catch(next);
  }


function createSchema(req, res, next) {
       
    const questionsSchema = Joi.array().items(Joi.object().keys({
    questionType: Joi.string(),
    question: Joi.string()
    }));

    const finalSchema = Joi.object().keys({
        vendorID: Joi.string().trim(),
        apiVersion: Joi.string().trim(),
        questions: questionsSchema
        });

    validateRequest(req, next, finalSchema);
}

function updateSchema(req, res, next) {
    
    const questionsSchema = Joi.array().items(Joi.object().keys({
        _id: Joi.string(),
        questionType: Joi.string(),
        question: Joi.string()
    }));
    
    const Schema = Joi.array().items({
        
        vendorID: Joi.string(),
        apiVersion: Joi.string(),
        questions: questionsSchema
        });
    
        const finalSchema = Joi.object().keys({
            vendorID: Joi.string().trim(),
            apiVersion: Joi.string().trim(),
            questions: questionsSchema
    });
        validateRequest(req, next, finalSchema);

}

function create(req, res, next) {
    
    affordabilityQuestionsService.create(req.body)
    .then(affordabilityQuestions => res.status(200).json(affordabilityQuestions))
    .catch(next);
}

function update(req, res, next) {
    // users can update their own account and admins can update any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    affordabilityQuestionsService.update(req.params.id, req.body)
      .then(affordabilityQuestions => res.status(200).json(affordabilityQuestions))
      .catch(next);
  }

  function _delete(req, res, next) {
    
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  affordabilityQuestionsService.delete(req.params.id)
    .then(() => res.status(200).json({ message: 'Affordability question deleted successfully' }))
    .catch(next);
}