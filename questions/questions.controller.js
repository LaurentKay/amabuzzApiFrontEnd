const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {validateRequest} = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
//const accountService = require('../accounts/account.service');
const questionsService = require('./questions.service');
const customerService = require('../customers/customers.service');

// routes
router.get('/:id',  getAll);

module.exports = router;

function getAll(req, res, next) {
  const id = req.params.id
  questionsService.getAllQuestions(id)
    .then((questions) => {
      let result = [questions[0], questions.c_questions]
      res.status(200).json(result)
    }).catch(next);
}
