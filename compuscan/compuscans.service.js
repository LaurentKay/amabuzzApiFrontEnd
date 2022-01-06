const db = require('_helpers/db');
const xml2js = require('xml2js');
const request = require('request');
const fs = require('fs');
const JSZip = require('jszip');
const config = require('config.json');
const mongodb = require('mongodb')

const parser = new xml2js.Parser({explicitArray: false, trim: true, stripPrefix:true});

module.exports ={
    create,
    getById,
    getReportFromDB,
    createHistory,
    insertCustomerAnswers
}



let dbTruId;
let connectionString = config.connectionString

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, truID) {
    dbTruId = truID.db()
    
  }
)


async function getById(id) {
    const compuscan = await getReport(id);
    return compuscan; //basicDetails(customer);
}
async function getReport(id) {

    const compuscan = await db.Compuscan.findOne({"customerId":id});
     //console.log(compuscan,id)
     if (!compuscan) throw 'Compuscan report not found '+ id;
     return compuscan;
 }


async function create(params) {
    console.log('Create params? : ', params.ROOT);
    // validate    
    // db.collection('compuscans').insertOne(params.ROOT, function(err, info){
    //     params.ROOT
    // });
    const compuscan = new db.Compuscan(params.ROOT);
    
    // save compuscan report
    await compuscan.save();

    return compuscan;
}

async function createHistory(params) {

    const compuscanHistory = new db.compuscanHistory(params);
    
    // save compuscan report
    await compuscanHistory.save();

    return compuscanHistory;
}

async function getReportFromDB(id) {

    //const compuscan = await db.Compuscan.findOne({"customerId":id},{createDate:1});
    const compuscan = await db.Compuscan.findOne({"customerId":id});
    
    if (!compuscan)  return ""; //throw 'Compuscan report not found '+ id;
    let dte = new Date();
    let cMonth = (dte.getMonth() - compuscan['createDate'].getMonth()) + (12 * (dte.getFullYear() - compuscan['createDate'].getFullYear()));
    console.log('Month diff: ' + cMonth, dte.getMonth(), compuscan['createDate'].getMonth());
    if(cMonth > 3){
        return "";
    }
    console.log('Month diff: ' + cMonth, id);
    return compuscan;
}

async function insertCustomerAnswers(params) {
    const compAns = dbTruId.collection('compuscanAnswerSaves').findOne({"applicationReference":params.applicationReference});
    if(!compAns){
        // validate    
        dbTruId.collection('compuscanAnswerSaves').insertOne(params, function (
            err,
            info
        ) {
            params
            
        });
        return params;
    }else{
        const filter = {"applicationReference":params.applicationReference};
        const upAns = {
            $set:{
                telephoneNumbers:params.telephoneNumbers,
                employers:params.employers,
                addresses:params.addresses,
                accounts:params.accounts
            }
        };
        const result = await dbTruId.collection('compuscanAnswerSaves').updateOne(filter, upAns);
        return result;
    }

}