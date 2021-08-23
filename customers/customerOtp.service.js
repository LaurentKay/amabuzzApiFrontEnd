const db = require('_helpers/db');

module.exports = {
    save,
    update,
    numRequestLast24h,
};

async function save(body){
    const callbackcust = new db.CallBacks(body.body);
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