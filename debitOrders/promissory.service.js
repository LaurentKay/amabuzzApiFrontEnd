const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const db = require('_helpers/db');
const Role = require('_helpers/role');

module.exports = {
    getAllPromissories,
    create,
    getPromissory,
    updatePromissory,
    insertResponse,
    getResponseData,
    insertAccount,
    getAccountData,
    getPromissoryByLoanRef,
};


function basicDetails(promissory) {
    const { _id, allow_date_chg , allow_max_inst ,allow_tracking ,branch_cd ,client_no ,collection_day ,create_dt ,date_adj ,first_amt ,
    first_dt ,guid ,id ,ifee_amt ,ifee_inst_amt ,ifee_perc ,ifee_type ,inst_adj_amt,inst_adj_freq ,inst_adj_rate,instalment ,loan_ref_no ,
    max_inst_amt ,org_cd ,pmt_cycle ,prom_type ,promissory_id ,reply_cd ,reply_str , restart,status ,track_cd ,value , web_user_id } = promissory;
    //const totalValue = 24 * instalmentAmount;
    //const totalOutstanding = instalmentAmount * remainingInstalments;
    //const lastResponseCode = lastResponseCodes[lastResponseCodes.length-1].lastResponseCode;
    return { _id, allow_date_chg , allow_max_inst ,allow_tracking ,branch_cd ,client_no ,collection_day ,create_dt ,date_adj ,first_amt ,
        first_dt ,guid ,id ,ifee_amt ,ifee_inst_amt ,ifee_perc ,ifee_type ,inst_adj_amt,inst_adj_freq ,inst_adj_rate,instalment ,loan_ref_no ,
        max_inst_amt ,org_cd ,pmt_cycle ,prom_type ,promissory_id ,reply_cd ,reply_str , restart,status ,track_cd ,value , web_user_id };    
}


async function getAllPromissories() {
    const promissaries = await db.Promissory.find();
    return promissaries.map(x=>basicDetails(x));
}
async function getPromissory(promid){
    const promissory = await db.Promissory.findOne({"promissory_id":promid});
    return promissory;
}
async function getPromissoryByLoanRef(loan_ref_no){
    const promissory = await db.Promissory.findOne({'loan_ref_no':loan_ref_no});
    return promissory;
}
async function updatePromissory(promissory){
    const filter = {"promissory_id":promissory.promissory_id};
    const result = db.Promissory.findOneAndUpdate(filter, promissory);
    //console.log('Upda prom res:::: ', result);
    return result;
}

async function create(params) {
    // validate    
    const promissory = new db.Promissory(params);
    
    // save customer
    await promissory.save();
    return basicDetails(promissory);
}
async function insertResponse(data){
    const response = new db.ResponseData(data);
    await response.save();
    return response;
}
async function getResponseData(){
    const responseData = db.ResponseData.find();
    return responseData;
}
async function insertAccount(data){
    const response = new db.ResponseAccount(data);
    await response.save();
    return response;
}
async function getAccountData(){
    const responseData = db.ResponseAccount.find();
    return responseData;
}