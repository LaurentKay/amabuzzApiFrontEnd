const db = require('_helpers/db');

module.exports = {
  getAllPools,
  getAllWorkflowNames,
  getAllWorkflows,
  //getById,
  create,
  createWorkFlowNames,
  createWorkFlow,
  update,
  deletePools,
  deleteWorkflowName,
  deleteWorkflow
};
// -----------------------------------------------------------------------------
// POOLS NAMES
// -----------------------------------------------------------------------------
function poolDetails(aData) {
  console.log('pool Details')
  const { name } = aData;
  return { name };
}

async function getAllPools() {
  console.log('In Service getAllPools');
  const Pools = await db.PoolConfig.find();
  console.log('RES:: ', Pools);
  return Pools
}

async function create(aData) {
  const pools = new db.PoolConfig(aData);
  // save pool
  await pools.save();

  return poolDetails(pools);
}

async function deletePools(id) {
  const Pool = await getPool(id);
  await Pool.remove();
}

async function getPool(id) {
  if (!db.isValidId(id)) throw 'Pool not found';
  const POOL = await db.PoolConfig.findById(id);
  if (!POOL) throw 'Pool not found';
  return POOL;
}
// -----------------------------------------------------------------------------
// WORKFLOW NAMES
// -----------------------------------------------------------------------------
function workflowNameDetails(aData) {
  console.log('workflownames Details')
  const { name } = aData;
  return { name };
}

async function getAllWorkflowNames() {
  console.log('In Service getAllWorkflowNames');
  const workflowNames = await db.WorkflowNameConfig.find();
  console.log('RES:: ', workflowNames);
  return workflowNames
}

async function createWorkFlowNames(aData) {
  const workflowNames = new db.WorkflowNameConfig(aData);
  // save pool
  await workflowNames.save();

  return workflowNameDetails(workflowNames);
}

async function deleteWorkflowName(id) {
  const WORKFLOW_NAME = await getWorkflowName(id);
  await WORKFLOW_NAME.remove();
}

async function getWorkflowName(id) {
  if (!db.isValidId(id)) throw 'Workflow name not found';
  const WORKFLOW_NAME = await db.WorkflowNameConfig.findById(id);
  if (!WORKFLOW_NAME) throw 'Workflow name not found';
  return WORKFLOW_NAME;
}
// -----------------------------------------------------------------------------
// ASSIGN WORKFLOWs
// -----------------------------------------------------------------------------
function workflowDetails(aData) {
  console.log('workflow Details')
  const { role, workflow, name, pools, id } = aData;
  return { role, workflow, name, pools, id };
}

async function getAllWorkflows() {
  console.log('In Service getAllWorkflows');
  const getAllWorkflows = await db.WorkflowConfig.find();
  console.log('RES:: ', getAllWorkflows);
  return getAllWorkflows
}

async function createWorkFlow(aData) {
  const workflow = new db.WorkflowConfig(aData);
  // save pool
  await workflow.save();

  return workflowDetails(workflow);
}

async function deleteWorkflow(id) {
  const WORKFLOW = await getWorkflow(id);
  await WORKFLOW.remove();
}

async function getWorkflow(id) {
  if (!db.isValidId(id)) throw 'Workflow not found';
  const WORKFLOW = await db.WorkflowConfig.findById(id);
  if (!WORKFLOW) throw 'Workflow not found';
  return WORKFLOW;
}

async function update(id, params) {
    const WORKFLOW = await getWorkflow(id);

    // copy params to WORKFLOW and save
    Object.assign(WORKFLOW, params);
    //WORKFLOW.updated = Date.now();
    await WORKFLOW.save();

    return workflowDetails(WORKFLOW);
}
