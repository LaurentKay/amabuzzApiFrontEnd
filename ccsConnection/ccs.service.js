const request = require('request');
const axios = require('axios');
const sql = require('mssql');


const configMSSQLLive = {
    user: 'sa',
    password: 'Intellicell123',
    server: '192.168.1.40',
    database: 'Intellicell_CallCentre',
    connectionTimeout: 30000,
    requestTimeout: 30000,
    options:{
        trustedConnection:true,
        encrypt:true,
        enableArithAbort:true,
        trustServerCertificate:true,
    },
    pool: {
      max: 1000,
      min: 0,
      idleTimeoutMillis: 30000
    }
  };
module.exports = {
    getPayHistory,
};
async function getPayHistory(){
    // try{
    //     const {data} = await axios('http://192.168.1.99/Contracts/12MonthRenewals_Data.asp?amabuzz=Yes');
    //     return data;
    // }catch(error){ MSSQL01
    //     console.log(error.response.body);
    // }

    // const pool = new sql.ConnectionPool(configMSSQLLive);
    // pool.on('error', err =>{
    //     console.log(err, "Human");
    // })
    // const poolConnect = pool.connect();
    // await poolConnect;
    // try{
    //     const requestq = pool.Request();
    //     requestq.execute('tweleveMonthRenewals', (err, result) =>{
    //         if(err) console.log(error);

    //         console.log("ABC", result.recordsets.length);
    //         console.log("CBA", result.recordset);

    //         return result.recordsets;
    //     })
    // }catch(error){
    //     console.log(error, "Error?");
    // }


    sql.close();
    try {
        const m = await new sql.ConnectionPool(configMSSQLLive).connect();
        const g = await m.request().execute('tweleveMonthRenewals');
        //console.log(g);
        return g.recordset;
    } catch  (errr) {
        console.log("ABC: ", errr);
        //res.send({DebitOrderFileRef:'load file on ccs first'});
    }
    // sql.connect(configMSSQLLive, function(err){
    //     if(err) console.log(err);

    //     //Create Request object
    //     var request = new sql.Request();
        
    //     //query to the database and get the records
    //     var sqQuery = "EXEC tweleveMonthRenewals";
    //     request.query(sqQuery, function(err, recordset){
    //         if(err) console.log(err);

    //         //send records as a response
    //         console.log(recordset)
    //         return recordset;
    //         //res.send(recordset);
    //     });
    // });
}