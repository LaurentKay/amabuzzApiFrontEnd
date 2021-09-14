const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {validateRequest} = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
//const accountService = require('../accounts/account.service');
const configService = require('./config.service');
const customerService = require('../customers/customers.service');

// routes
router.get('/pools',  _getAllPools);
router.get('/workflownames',  _getAllWorkflowNames);
router.get('/workflows',  _getAllWorkflows);
//router.get('/:id',  getById);
router.post('/pools',  createSchema, _createPools);
router.post('/workflownames',  createSchemaWorkflowName, _createworkflowNames);
router.post('/assignWorkflow',  createSchemaWorkflow, _createWorkflow);
//router.put('/:id', authorize(), updateSchema, update);
router.put('/workflows/:id', authorize(), updateSchema, _updateWorkflow);

router.delete('/pools/:id', authorize(), _deletePools);
router.delete('/workflownames/:id', authorize(), _deleteWorkflownames);
router.delete('/workflows/:id', authorize(), _deleteWorkflow);

module.exports = router;
// -----------------------------------------------------------------------------
// POOLS NAMES
// -----------------------------------------------------------------------------
function _getAllPools(req, res, next) {
  console.log('THis one here');
  configService.getAllPools()
   .then(pools => res.status(200).json(pools))
   .catch(next);
}

function insert(req, res, next) {
  configService.create(req.body)
    .then(pools => res.status(200).send(pools))
    .catch(next);
}


function createSchema(req, res, next) {
  const poolSchema = Joi.object({
    name: Joi.string()
  });

  validateRequest(req, next, poolSchema);
}

function _createPools(req, res, next) {
  configService.create(req.body)
    .then(pools => res.status(200).json(pools))
    .catch(next);
}

function _deletePools(req, res, next) {
  // users can delete their own account and admins can delete any account
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  configService.deletePools(req.params.id)
    .then(() => res.status(200).json({ message: 'Pool deleted successfully' }))
    .catch(next);
}
// -----------------------------------------------------------------------------
// WORKFLOWS NAMES
// -----------------------------------------------------------------------------
function _getAllWorkflowNames(req, res, next) {
  console.log('THis one here');
  configService.getAllWorkflowNames()
   .then(workflownames => res.status(200).json(workflownames))
   .catch(next);
}

function insert(req, res, next) {
  configService.create(req.body)
    .then(workflowNames => res.status(200).send(workflowNames))
    .catch(next);
}


function createSchemaWorkflowName(req, res, next) {
  const workflowNamesSchema = Joi.object({
    name: Joi.string()
  });

  validateRequest(req, next, workflowNamesSchema);
}

function _createworkflowNames(req, res, next) {
  configService.createWorkFlowNames(req.body)
    .then(workflowNames => res.status(200).json(workflowNames))
    .catch(next);
}

function _deleteWorkflownames(req, res, next) {
  // users can delete their own account and admins can delete any account
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  configService.deleteWorkflowName(req.params.id)
    .then(() => res.status(200).json({ message: 'Workflow Name deleted successfully' }))
    .catch(next);
}
// -----------------------------------------------------------------------------
// ASSIGN WORKFLOWS
// -----------------------------------------------------------------------------
function _getAllWorkflows(req, res, next) {
  console.log('THis one here');
  configService.getAllWorkflows()
   .then(workflows => res.status(200).json(workflows))
   .catch(next);
}

function insert(req, res, next) {
  configService.create(req.body)
    .then(workflows => res.status(200).send(workflows))
    .catch(next);
}


function createSchemaWorkflow(req, res, next) {
  const workflowSchema = Joi.object({
    role: Joi.string(),
    id: Joi.string(),
    workflow: Joi.object({
      name: Joi.string(),
      id: Joi.string(),
      pools: Joi.array().items({
        name: Joi.string(),
        id: Joi.string()
      })
    })
  });

  validateRequest(req, next, workflowSchema);
}

function _createWorkflow(req, res, next) {
  configService.createWorkFlow(req.body)
    .then(workflows => res.status(200).json(workflows))
    .catch(next);
}

function _deleteWorkflow(req, res, next) {
  // users can delete their own account and admins can delete any account
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  configService.deleteWorkflow(req.params.id)
    .then(() => res.json({ message: 'Workflow deleted successfully' }))
    .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
      role: Joi.string(),
      id: Joi.string(),
      workflow: Joi.object({
        name: Joi.string(),
        id: Joi.string(),
        pools: Joi.array().items({
          name: Joi.string(),
          id: Joi.string()
        })
      })
    };

    // only admins can update role
    if (req.user.role === Role.Admin) {
        schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty('');
    }

    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}

function _updateWorkflow(req, res, next) {

    // users can update their own account and admins can update any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    configService.update(req.params.id, req.body)
      .then(workflow => res.status(200).json(workflow))
      .catch(next);
}
_updateWorkflow
