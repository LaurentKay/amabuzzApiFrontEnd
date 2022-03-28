const db = require('_helpers/db');

module.exports = {
    save,
    update,
    numRequestLast24h,
    updateRegistered,
    otpFind,
    updateResend,
};

async function save(body){
    const docsExists = await db.CallBacks.find({RSAIDNumber:body.RSAIDNumber});
    if(docsExists.length > 0){
        await db.CallBacks.deleteMany({RSAIDNumber:body.RSAIDNumber});
    }
    const callbackcust = new db.CallBacks(body);
    await callbackcust.save();
    return callbackcust;
}

async function update(RSAIDNumber, SMSSentID){
    const filter = {"RSAIDNumber": RSAIDNumber};
    const updafield = {
        $set:{
            SMSSentID: SMSSentID
        }
    }
    const result = await db.CallBacks.updateOne(filter, updafield);
    return result;
}
async function updateRegistered(callbackID, SMSSentID, OTP){
    const filter = {"_id":callbackID};
    const updafield = {
        $set:{
            SMSSentID:SMSSentID,
            otp:OTP
        }
    }
    const result = await db.CallBacks.updateOne(filter, updafield);
    return result;
}
async function updateResend(body, callbackID, RSAIDNumber){
    console.log('updateResend :::: The array coming???? ', body, callbackID);
    const filter = {"RSAIDNumber": RSAIDNumber};
    const updafield = {
        $set:{
            otp:body
        }
    }
    const result = await db.CallBacks.updateOne(filter, updafield);
    return result;
}
async function numRequestLast24h(id){
    const callback = await db.CallBacks.findOne({"RSAIDNumber":id});
    if(!callback) return "";
    let count = 0;
    let dte = new Date();
    for(var i = 0; i < callback.length; i++){
        if(dte.getDate() - callback["dateRequested"].getDate() === 1){
            count++;
        }
    }
    console.log('The value of count: ', count);
    return count;
}
async function otpFind(RSAIDNumber){
    const otpColl = await db.CallBacks.find({RSAIDNumber}).sort({"dateRequested":-1}).limit(1);
    console.log('Is it an array?????? ', otpColl);
    return otpColl;
}