const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {validateRequest} = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
//const accountService = require('../accounts/account.service');
const roleService = require('./roles.service');
const customerService = require('../customers/customers.service');

// routes
router.get('/',  _getAllRoles);
//router.get('/:id',  getById);
router.post('/',  createSchema, _createRoles);
//router.put('/:id', authorize(), updateSchema, update);
//router.delete('/:id',authorize(), _delete);

module.exports = router;
// -----------------------------------------------------------------------------
// ROLES
// -----------------------------------------------------------------------------
function _getAllRoles(req, res, next) {
  console.log('THis one here');
  roleService.getAllRoles()
   .then(aData => res.json(aData))
   .catch(next);
}

function insert(req, res, next) {
  roleService.create(req.body)
    .then(aData => res.status(200).send(aData))
    .catch(next);
}


function createSchema(req, res, next) {
  const RoleSchema = Joi.object({
    role: Joi.string()
  });

  validateRequest(req, next, RoleSchema);
}

function _createRoles(req, res, next) {
  console.log('--->')
  roleService.create(req.body)
    .then(aData => res.status(200).json(aData))
    .catch(next);
}
