const config = require('config.json');
const getBankName = require('_helpers/utils');
const db = require('_helpers/db');
const { generateHashIDs } = require('../_helpers/utils');
const {v4:uuidv4} = require("uuid");
const mongodb = require('mongodb');

module.exports = {
    insertDebtor,
    getDebtorByID,
    getAllDebtors,
    getDebtorByApplicationReferenceNumber,
    getDebtorByLoanRef,
    updateDebtorPromissorySent,
    updateDebtor,
};

let dbDebtors;
let connectionString = config.connectionString

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, debtors) {
    dbDebtors = debtors.db()

  }
)

async function updateDebtor(clientData) {
  const filter = {"promissory_id":clientData.promissory_id};
  try {
  //const result =  dbDebtors.collection('debtors').findOneAndUpdate(filter, clientData);
  Object.assign(clientData, {disburseStatus:'Disbursed'});
  const result = db.Debtor.findOneAndUpdate(filter, clientData);
  return {message:result, error:false}
  } catch (e) {
    console.warn(e, 'this friday on e')
    return {message:'error occurred with update', error:e}
  }
  
}
async function insertDebtor(debtorData) {

    hashy = generateHashIDs(uuidv4());
    let hashObject = {applicationReferenceNumber: hashy};
    let debtorWithReferenceNumber = Object.assign(debtorData, hashObject);
    //console.log(debtorWithReferenceNumber, hashy, uuidv4());

    try {
        dbDebtors.collection('debtors').insertOne( debtorWithReferenceNumber );
     } catch (e) {
        console.log (e);
     };
     return debtorWithReferenceNumber;
     
};

async function getAllDebtors() {
   const debtor = await db.Debtor.find();
   return debtor;
}


async function getDebtorByID(id) {

    if (!db.isValidId(id)) throw 'Debtor not found';
     const debtor = await db.Debtor.findOne({"customerid":id});
     if (!debtor) throw 'Debtor not found '+id;
     return debtor;
}


 async function getDebtorByApplicationReferenceNumber(applicationReferenceNumber) {

    //if (!db.isValidId(id)) throw 'Application not found';
     const debtor = await db.Debtor.findOne({"applicationReferenceNumber":applicationReferenceNumber});
     if (!debtor) throw 'Application not found '+applicationReferenceNumber;
     return debtor;
 }
 async function getDebtorByLoanRef(loan_ref_no){
   const dbtor = await db.Debtor.findOne({"loan_ref_no":loan_ref_no,promSentToCalidad:false},{RSAIDNumber:1, client_id:1, application_id:1, loan_ref_no:1});
   if(!dbtor) {
     return null;
   }else{
     //console.log('getDebtorByLoanRef res:::: ', debtor, loan_ref_no); 
     const newdebtor={};
     Object.assign(newdebtor, dbtor);
    return newdebtor; //basicDetails(dbtor);
   }
 }
 async function updateDebtorPromissorySent(RSAIDNumber){
  const filter = {"RSAIDNumber":RSAIDNumber};
  const result = await db.Debtor.findOneAndUpdate(filter, {promSentToCalidad:true});
  console.log('updateDebtorPromissorySent res:::: ', result);
  return result;
}
