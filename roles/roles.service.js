const db = require('_helpers/db');

module.exports = {
  getAllRoles,
  //getById,
  create,
  //update,
  //delete: _delete
};
// -----------------------------------------------------------------------------
// ROLES
// -----------------------------------------------------------------------------
function roleDetails(aData) {
  console.log('role Details')
  const { role } = aData;
  return { role };
}

async function getAllRoles() {
  console.log('In Service getAllRoles');
  const ROLES = await db.Roles.find();
  console.log('RES:: ', ROLES);
  return ROLES
}

async function create(aData) {
  console.log('>>>>>>>')
  const ROLES = new db.Roles(aData);
  // save roles
  await ROLES.save();

  return roleDetails(ROLES);
}
