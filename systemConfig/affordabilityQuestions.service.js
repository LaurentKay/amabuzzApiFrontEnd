
const db = require('_helpers/db');


module.exports = {
    getAllAffordabilityQuestions,
    //getById,
    create,
    update,
    delete: _delete
};

function basicDetails(affordabilityQuestions) {
    console.log('Basic Details')
    const { _id, other, expense } = affordabilityQuestions;
    return { _id, other, expense };
}

async function getAffordability(id) {
    if (!db.isValidId(id)) throw 'Affordability questions not found';
     const affordability = await db.AffordabilityQuestions.findOne({"_id": id});
     if (!affordability) throw 'Affordability not found '+id;
     return affordability;
 }
 

async function getAllAffordabilityQuestions() {
    console.log('In Service');
    const AffordabilityQuestions = await db.AffordabilityQuestions.find();
    console.log(AffordabilityQuestions);
    //return affordabilityQuestions.map(x => basicDetails(x));
    //return {"stuff":"stuff"}
    return AffordabilityQuestions
}

async function create(params) {
    // validate
    console.log('createService', params)
    const affordabilityQuestions = new db.AffordabilityQuestions(params);
    //product.verified = Date.now();

    // save product
    await affordabilityQuestions.save();

    return affordabilityQuestions;
}

async function update(id, params) {
    const affordability = await getAffordability(id);

    // copy params to customer and save
    Object.assign(affordability, params);
    
    await affordability.save();

    return affordability;
}

async function _delete(id) {
    const affordability = await getAffordability(id);
    await affordability.remove();
}