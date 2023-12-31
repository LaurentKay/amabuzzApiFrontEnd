const config = require('config.json');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const compuscanService = require('../compuscan/compuscans.service');
const customerOtpservice = require('./customerOtp.service');
const truIDService = require('../truID/truID.service');
const ccsService = require('../ccsConnection/ccs.service');
const mongodb = require('mongodb');
const { insertDebtor } = require('../debtors/debtors.controller');
const CCSarr = [ { id: "1", SelectBox: "false", DebtorNo: "ERINTS90086", DebtorID: "89637", MSISDN: "0664790659", ContractID: "118928", ActivationDate: "20200206", ContractEndDate: "20210206", SubscriptionEndDate: "20210418", EndDateDiff: "71", PlanName: "MyMeg 500", Balance: "1848", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 1", PayPercent: "50", Last00DOTxnDateContract: "20210813", Last10Txns: "*00 I|00 I|00 I|00 I|00 I|00 I|00 I|02 I|02 I|02 I", PayDay: "M - 15", EmployerName: "Uitenhage Provincial Hospital", JobDescription: "General Assistant", AccountStatus: "D/O", NextPTP: "", LastNote: "20210810: 0634228978 cant pay anything extra on account as he want to pay the contract first and complete then will take other after ",IDNumber:"2001014800086" },
                 { id: "2", SelectBox: "false", DebtorNo: "SOPMOT02087", DebtorID: "90368", MSISDN: "0664817155", ContractID: "119762", ActivationDate: "20200219", ContractEndDate: "20220219", SubscriptionEndDate: "20210511", EndDateDiff: "-284", PlanName: "MyMeg 500", Balance: "1595", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 2", PayPercent: "47", Last00DOTxnDateContract: "20210701", Last10Txns: "*E1 I|04 I|04 I|00 I|00 I|02 I|00 I|00 I|00 I|02 I", PayDay: "M - Last Working Day", EmployerName: "Si Group Inc", JobDescription: "Truck Washer", AccountStatus: "D/O", "NextPTP": "", LastNote: "20210617: 0834041994: No answer.",IDNumber:"2402014800086" }, 
                 { id: "3", SelectBox: "false", DebtorNo: "NADGOV24086", DebtorID: "56336", MSISDN: "0664831738", ContractID: "77685",  ActivationDate: "20180515", ContractEndDate: "20220515", SubscriptionEndDate: "20210515", EndDateDiff: "-365", PlanName: "MyMeg 500", Balance: "4719", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 2", PayPercent: "49", Last00DOTxnDateContract: "20210531", Last10Txns: "*02 I|02 I|02 I|02 I|00 I|00 I|00 I|02 I|02 I|02 I", PayDay: "M - Last Working Day", EmployerName: "South African Police Services", JobDescription: "Police Officer", AccountStatus: "D/O", "NextPTP": "", LastNote: "20210728: sms sent",IDNumber:"2402034800082" }, 
                 { id: "4", SelectBox: "false", DebtorNo: "JOHBOI82081", DebtorID: "91088", MSISDN: "0823053844", ContractID: "120579", ActivationDate: "20200304", ContractEndDate: "20220304", SubscriptionEndDate: "20210531", EndDateDiff: "-277", PlanName: "MyMeg 500", Balance: "4068", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 2", PayPercent: "27", Last00DOTxnDateContract: "20210604", Last10Txns: "*02 I|02 I|02 I|02 I|00 I|00 I|00 I|02 I|02 I|02 I", PayDay: "M - 31", EmployerName: "Afriboom Pty Ltd", JobDescription: "Supervisor", AccountStatus: "D/O", "NextPTP": "", LastNote: "20210729: 0725841438: No answer.",IDNumber:"2202034800086" }, 
                 { id: "5", SelectBox: "false", DebtorNo: "SOLMAG84085", DebtorID: "91892", MSISDN: "0823222860", ContractID: "121565", ActivationDate: "20200318", ContractEndDate: "20220318", SubscriptionEndDate: "20210601", EndDateDiff: "-290", PlanName: "MyMeg 500", Balance: "1844", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 1", PayPercent: "43", Last00DOTxnDateContract: "20210723", Last10Txns: "*00 I|00 I|02 I|02 I|00 I|02 I|02 I|02 I|02 I|02 I", PayDay: "M - 25", EmployerName: "Civic Data Services", JobDescription: "Technitain", AccountStatus: "D/O", "NextPTP": "", LastNote: "20210722: SMS SENT",IDNumber:"2602034800087" }, 
                 { id: "6", SelectBox: "false", DebtorNo: "JUSPEE13084", DebtorID: "57006", MSISDN: "0664849129", ContractID: "78484", ActivationDate: "20180604", ContractEndDate: "20220604", SubscriptionEndDate: "20210604", EndDateDiff: "-365", PlanName: "MyMeg 500", Balance: "3688", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 2", PayPercent: "52", Last00DOTxnDateContract: "20210602", Last10Txns: "*02 I|02 I|02 I|02 I|00 I|00 I|02 I|02 I|02 I|02 I", PayDay: "M - 31", EmployerName: "Democratic Alliance", JobDescription: "Field Support Officer", AccountStatus: "D/O", "NextPTP": "", LastNote: "20210818: statement sent",IDNumber:"3002034800089" }, 
                 { id: "7", SelectBox: "false", DebtorNo: "SAKNDH72089", DebtorID: "91648", MSISDN: "0664850317", ContractID: "121286", ActivationDate: "20200317", ContractEndDate: "20220317", SubscriptionEndDate: "20210605", EndDateDiff: "-285", PlanName: "MyMeg 500", Balance: "2196", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 1", PayPercent: "44", Last00DOTxnDateContract: "20210730", Last10Txns: "*02 I|02 I|02 I|02 I|00 I|00 I|02 I|02 I|02 I|02 I", PayDay: "W - Thursday", EmployerName: "G And J Auto Body", JobDescription: "Mechanical", AccountStatus: "D/O", "NextPTP": "", LastNote: "20201104: call cust",IDNumber:"3202034800085" }, 
                 { id: "8", SelectBox: "false", DebtorNo: "LAMTHO89081", DebtorID: "92325", MSISDN: "0664852566", ContractID: "122072", ActivationDate: "20200325", ContractEndDate: "20220325", SubscriptionEndDate: "20210608", EndDateDiff: "-290", PlanName: "MyMeg 500", Balance: "2940", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 2", PayPercent: "55", Last00DOTxnDateContract: "20210528", Last10Txns: "*02 I|02 I|02 I|02 I|02 I|00 I|00 I|00 I|00 I|00 I", PayDay: "M - Last Working Day", EmployerName: "Amiis", JobDescription: "Receptionist", AccountStatus: "D/O", "NextPTP": "", LastNote: "20210729: sms sent",IDNumber:"3402034800081" }, 
                 { id: "9", SelectBox: "false", DebtorNo: "NKOMAB65080", DebtorID: "94678", MSISDN: "0674291226", ContractID: "125076", ActivationDate: "20200609", ContractEndDate: "20220609", SubscriptionEndDate: "20210609", EndDateDiff: "-365", PlanName: "MyMeg 500", Balance: "4017", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 2", PayPercent: "13", Last00DOTxnDateContract: "20210525", Last10Txns: "*02 I|02 I|02 I|02 I|00 I|02 I|02 I|02 I|02 I|02 I", PayDay: "M - 24", EmployerName: "Scribante Construction", JobDescription: "Merchanic", AccountStatus: "D/O", "NextPTP": "", LastNote: "20210818: sms sent",IDNumber:"3602034800086" }, 
                 { id: "10", SelectBox: "false", DebtorNo: "THANKU47087", DebtorID: "94690", MSISDN: "0674291281", ContractID: "125089", ActivationDate: "20200609", ContractEndDate: "20220609", SubscriptionEndDate: "20210609", EndDateDiff: "-365", PlanName: "MyMeg 500", Balance: "4053", MigrateToPrepaidDate: "2021/08/31", GroupName: "Group 1", PayPercent: "19", Last00DOTxnDateContract: "20210811", Last10Txns: "*00 I|00 I|02 I|02 I|02 I|02 I|02 I|02 I|02 I|02 I", PayDay: "W - Wednesday", EmployerName: "Buhle betfu carries", JobDescription: "General worker", AccountStatus: "D/O", "NextPTP": "", LastNote: "20210705: 0665143509 client drop call after asking to confirm d.o.b",IDNumber:"3702034800084" }
               ] 
module.exports = {
    getAll,
    getAllAssessments,
    getAllCustomerDocs,
    getById,
    create,
    update,
    updateAssessment,
    delete: _delete,
    updateCustDoc,
    createHistory,
    insertSignature,
    calculateAffordability,
    authenticate,
    createCustomer,
    getApplicantSigedContract,
    getLoginById,
    upLoginById,
    resetPassword,
    emailActivate,
    appMessageSettings,
    appStatus,
    prequalifiedids,
    viewContract,
    getCustomerDocs,
    removeCustomer,
};

let dbTruId;
let connectionString = config.connectionString

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, truID) {
    dbTruId = truID.db()
    
  }
);

function basicDetails(customer) {
    const { _id, firstName, lastName, RSAIDNumber, mobileNumber,
        homeNumber, maritalStatus, emailAddress, promoCode, homeAddress1,deliveryPostalCode, deliverySuburb, deliveryCity, deliveryAddress1,
        homeAddress2, homeCity, homeSuburb, homeProvince, homePostalCode,
        employerName, employerContactNumber, employmentNumber, employerAddress1, employerAddressCity, yearEmployed, monthEmployed, employerAddressPostalCode,
        salaryFrequency, salaryDay, occupation,workNumber, createdDate,
        bankName, bankBranch, bankAccountNumber, bankAccHolderName, bankAccountType, role,  account, affordability,
        applicationStatus, applicationId } = customer; //uploadedDocs,

   return { _id, firstName, lastName, RSAIDNumber, mobileNumber,
            homeNumber, maritalStatus, emailAddress, promoCode, homeAddress1,deliveryPostalCode, deliverySuburb, deliveryCity, deliveryAddress1,
            homeAddress2, homeCity, homeSuburb, homeProvince, homePostalCode,
            employerName, employerContactNumber, employmentNumber, employerAddress1, employerAddressCity, yearEmployed, monthEmployed, employerAddressPostalCode,
            salaryFrequency, salaryDay, occupation,workNumber, createdDate,
            bankName, bankBranch, bankAccountNumber, bankAccHolderName, bankAccountType, role,  account, affordability,
            applicationStatus, applicationId }; //uploadedDocs,
}
function addCreditScore(customer){
    const {_id, firstName, lastName, RSAIDNumber, mobileNumber,
        homeNumber, workNumber, emailAddress, homeAddress1,
        homeAddress2, homeCity, homeSuburb, homePostalCode,
        bankName, bankBranch, bankAccountNumber, bankAccHolderName, updated, active, role, creditScore, affordability, promoCode,
        Balance, PayPercent, GroupName, Last10Txns} = customer;
    const  newcustomer = { _id, firstName, lastName, RSAIDNumber, mobileNumber, homeNumber, workNumber, emailAddress,
        homeAddress1, homeAddress2, homeCity, homeSuburb, homePostalCode,
        bankName, bankBranch, bankAccountNumber, bankAccHolderName, updated, active, role, creditScore, affordability, promoCode,
        Balance, PayPercent, GroupName, Last10Txns}; //compuscan; uploadedDocs, 
    //console.log(newcustomer);
    return newcustomer;
}

// function insertSignature(customerSignature)
// {
//     const {_id, CustomerIDnumber, signature, dateSigned, IPAddress} = customerSignature;
//     const  newcustomerSignature = { _id, CustomerIDnumber, signature, dateSigned, IPAddress};
//     //console.log(newcustomerSignature);
//     return newcustomerSignature;
// }

async function getAll() {
    const ccsCustomers = CCSarr; //await ccsService.getPayHistory();
    //const ccsArr = [ccsCustomers];
    const customers = await db.Customer.find();
    //console.log("Theccs: =>", ccsCustomers);
    for(var j = 0; j < customers.length; j++){
        for(var t = 0; t < ccsCustomers.length; t++){
            //console.log("t : ",t, ccsArr[t]);
            if(customers[j].RSAIDNumber === ccsCustomers[t].IDNumber){
                //console.log("Found: ", ccsCustomers[t]);
                customers[j].Balance = ccsCustomers[t].Balance;
                customers[j].PayPercent = ccsCustomers[t].PayPercent;
                customers[j].GroupName = ccsCustomers[t].GroupName;
                customers[j].Last10Txns = ccsCustomers[t].Last10DOTxnsContract;
            }
        }
    }
    for(var i = 0; i < customers.length; i++){
        const compuscan = await db.Compuscan.findOne({"customerId":customers[i].RSAIDNumber});
        if(compuscan){
            customers[i].creditScore = compuscan.EnqCC_CustomSCORE.ROW.SCORE;
        }
    }
    return customers.map((x) =>addCreditScore(x));
}
async function getAllAssessments() {
    const customers = await db.Customer.find();
    return customers.map((x) => basicDetails(x).affordability);
}
async function getAllCustomerDocs(){
    const customers = await db.Customer.find();
    let customerss = [];
    for(var i = 0; i < customers.length; i++){
        const uploadedDocs = basicDetails(customers[i]).uploadedDocs;
        if(uploadedDocs.name){
            customerss.push(uploadedDocs);
        }

    }
    //console.log('The upload: ' + customerss);
    return customerss; //.map(x=>basicDetails(x).uploadedDocs);
}
async function getById(id) {
    const customer = await getCustomer(id);

    return basicDetails(customer);
}


async function calculateAffordability(id) {
    const customer = await getCustomer(id);
    let expenseTotal = 0;
    let incomeTotal = 0;
    let affordabilityRatio = 0;

    for (var i in customer.affordability)
    {
        if(customer.affordability[i].questionType === "Income")
        {
            incomeTotal += parseInt(customer.affordability[i].amount)
        }

        if(customer.affordability[i].questionType === "Expense")
        {
            expenseTotal += parseInt(customer.affordability[i].amount)
        }
      }

      if(expenseTotal > 0 && incomeTotal > 0)
      {
          affordabilityRatio = (expenseTotal / incomeTotal) * 100
      }

      const affordabilityRatioOutput = '{"affordabilityPercentage": '+affordabilityRatio+'}';
      const obj = JSON.parse(affordabilityRatioOutput);
      return (obj);
}

async function create(params, cb) {
    // validate
    //let testcustomer = await db.Customer.findOne({"RSAIDNumber":params.RSAIDNumber});
    //console.log('Whats returned? ', testcustomer);
    // if(testcustomer){
    //     throw 'Customer: ' + params.RSAIDNumber + ' already registered';
    // }
   // params.customerPassword = hash(params.customerPassword);
    const customer = new db.Customer(params);

    // save customer
    await customer.save();

    cb(basicDetails(customer));
    //return basicDetails(customer);
}

async function createCustomer(params, pc, cb) {
    const str='123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const emailVerify = shuffle(str).substr(0, 12);
    // validate
    let testcustomer = await db.CustomerLogin.findOne({"RSAIDNumber":params.RSAIDNumber});
    //console.log('Whats returned? ', testcustomer); ' + params.RSAIDNumber + '
    if(testcustomer){
        cb({message:'Customer already registered'}, 201);
        return;
        //throw 'Customer already registered';
    }
    params.customerPassword = hash(params.customerPassword);
    params.emailVerify = emailVerify;
    params.emailVerified = false;
    const customer = new db.CustomerLogin(params);

    // save customer
    await customer.save();
    //Send email for verication  
    const html = `
        <h2>Thank you for Registering.</h2>
        <p>Your Account:</p>
        <p>Email: ${customer.emailAddress}</p>
        <p>Please click the link below to verify your email address.</p>
        <a href='https://www.amabuzz.co.za/email-activate?code=${emailVerify}&user=${customer.RSAIDNumber}'>Verify email address</a>
        `;
    const subject = "Amabuzz Email Verification";
    await sendEmail.sendEmail({to: customer.emailAddress, subject, html});
    //Generate OTP and add it to the response
    const OTP = between(10000,99999);
    //Check for excessive requests for this number (more than 2 request in a 24hr period)
    //if(customerOtp.service.numRequestLast24h(req.body.RSAIDNumber) < 2){
    let otpSent = {};
    params['otp'] = OTP;
    params['SMSSentID'] = 'incomplete';
    customerOtpservice.save({
        RSAIDNumber:params.RSAIDNumber, 
        mobileNumber:params.mobileNumber,
        emailAddress:params.emailAddress,
        otp:[OTP],
        SMSSentID:'incomplete'}); //params, OTP
    const ToMSISDN = "27" + params.mobileNumber.slice(1, 10);
    const text=`Your One Time Pin (OTP) code is: ${OTP}. Kind Regards, Intellicell.`;
    console.log('Message to numner: ', text, ToMSISDN, params);
    const uri = `https://blds2.panaceamobile.com/json?action=message_send&username=intelicell&password=casino&to=${ToMSISDN}&text=${text}`;
    const custRet = { 
        _id: customer._id,
        RSAIDNumber: customer.RSAIDNumber,
        firstName: customer.firstName,
        lastName: customer.lastName,
        mobileNumber: customer.mobileNumber,
        emailAddress: customer.emailAddress,
        customerPassword: customer.customerPassword,
        createDate: customer.createDate,
        emailVerify: customer.emailVerify,
        promoCode:pc
      };
    try{
        const {data} = await axios.get(uri);
        //console.log('Sms Data before if: ', data);
        if(data.message === "Sent"){
            const SMSSentID = data.details;
            console.log('Sms Data: ', data);
            //update the db
            //customerOtpservice.update(params.RSAIDNumber, SMSSentID);
            otpSent['OTP'] = [OTP];
            otpSent['SMSSentID'] = SMSSentID;
            otpSent['message'] = 'sent';
            cb({
                message:'Successfully registered, please check your inbox to verify your email address.',
                account:[],
                custRet: custRet,
                otpSent
            }, 200);
            //res.send({OTP:OTP, message:'sent'});
        }else{
             //res.status(200).send({OTP:'', message:'There was an error sending your One Time Pin code, please try again.'});
             otpSent['OTP'] = [];
             otpSent['message'] = 'There was an error sending your One Time Pin code, please try again.';
             otpSent['SMSSentID'] = '';
             cb({
                message:'Successfully registered, please check your inbox to verify your email address.',
                account:[],
                custRet: custRet,
                otpSent
            }, 201);
        }
    }catch(e){
        console.log('Error: ', e.message);
        //res.status(401).send({OTP:'', message:e.message});
        otpSent['OTP'] = [];
        otpSent['message'] = e.message;
        otpSent['SMSSentID'] = ''; 
        cb({
           message:'Successfully registered, please check your inbox to verify your email address.',
           account:[],
           custRet: custRet,
           otpSent
       }, 201);
    }
    // cb({
    //     message:'Successfully registered, please check your inbox to verify your email address.',
    //     account:[],
    //     custRet: customer
    // }, 200);
    //return {message:'Successfully registered, please check your inbox to verify your email address.'};// basicDetails(customer);
}
function between(min, max){
    return Math.floor(
        Math.random() * (max-min) + min
    );
}
function shuffle(str) {
    var parts = str.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('');
  }
async function getLoginById(RSAIDNumber){
    let customer = await db.CustomerLogin.findOne({"RSAIDNumber":RSAIDNumber});
    if(!customer){
        throw 'Customer: ' + RSAIDNumber + ' , not details found ';
    }
    return customer;
}
async function upLoginById(id, pwdrestCode){
    const CustomerLogin = await db.CustomerLogin.findOne({"RSAIDNumber":id});
    //Object.assign(CustomerLogin, pwdrestCode);
    //await CustomerLogin.save();
    
    const filter = {"RSAIDNumber":id};
    const upCust = {
        $set:{
            pwdrestCode:pwdrestCode
        }
    }
    const result = await db.CustomerLogin.updateOne(filter, upCust);
    //console.log('The result: ', result);
    return result;
}
async function resetPassword(dataReset){
    const CustomerLogin = await db.CustomerLogin.findOne({"RSAIDNumber" : dataReset.RSAIDNumber});
    const filter = {"RSAIDNumber" : dataReset.RSAIDNumber, pwdrestCode: dataReset.code};
    const upCust = {
        $set:{
            customerPassword:hash(dataReset.password)
        }
    }
    const result = await db.CustomerLogin.updateOne(filter, upCust);
    //console.log('The resetpwd: ', result);
    return result;
}
async function emailActivate(custData){
    //const CustomerLogin = await db.CustomerLogin.findOne({"RSAIDNumber" : custData.RSAIDNumber});
    const filter = {"RSAIDNumber" : custData.RSAIDNumber, emailVerify: custData.code};
    const upCust = {
        $set:{
            emailVerified:true
        }
    }
    const result = await db.CustomerLogin.updateOne(filter, upCust);
    //console.log('Email Activate::::: ', result, custData);
    return result;
}
async function appMessageSettings(){
    const appMsg = await db.ApplicationMessage.find();
    //console.log('Any Msg? ::::: ', appMsg);
    return appMsg;
}
async function prequalifiedids(cb){
    const preqIDs = await db.PrequalifiedIDS.find();
    cb(preqIDs, 200);
}
async function update(id, params, cb) {
    const customer = await getCustomer(id);

    // copy params to customer and save
    Object.assign(customer, params);
    customer.updated = Date.now();
    await customer.save();

    cb(basicDetails(customer));
    //return basicDetails(customer);
}
async function updateCustDoc(id, uploadedDocs){
    const filter = {"RSAIDNumber":uploadedDocs.idNumber};
    // const updateDoc = {
    //     $set:{
    //         uploadedDocs: uploadeDocs
    //     }
    // }
    // //console.log('Doc 2 up >>>>>> ', uploadeDocs);
    // const result = await  db.Customer.updateOne(filter, updateDoc);
    // return result;
    const customer = await db.Customer.findOne(filter); 
    Object.assign(customer, {uploadedDocs});
    //console.log('The Cust: ', customer.RSAIDNumber);
    await customer.save();
    return {message:'document updated'};
}
async function updateAssessment(id, body) {
    const bodyAff = body; //[0];
    const customerId = id; //body[0].customerId;

    const filter = {"_id": customerId}
    const updateDoc = {
        $set:{
            affordability: bodyAff
        }
    }
    const result = await  db.Customer.updateOne(filter, updateDoc)
    return result;
}
async function _delete(id) {
    const customer = await getCustomer(id);
    await customer.remove();
}

async function getCustomer(id) {

   if (!db.isValidId(id)) throw 'Customer not found';
    const customer = await db.Customer.findById(id);
    if (!customer) throw 'Customer not found '+id;
    return customer;
}

async function createHistory(params) {


    const customerHistory = new db.CustomerHistory(params);

    // save compuscan report
    await customerHistory.save();

    return customerHistory;
}
async function appStatus(id, params, cb){
    const filter = {"_id":id};
    const appstatus = {
        $set:{
            applicationStatus:params.applicationStatus
        }
    }
    const result = await db.Customer.updateOne(filter, appstatus); 
    //the sending of email need to happen here
    const cust = await db.Customer.findOne(filter);
    //const existingCust = await db.CustomerSignature.findOne({"CustomerIDnumber":cust.RSAIDNumber, "CustomerUUID":id});
    //console.log('Customer:: ', cust._id, '  Existing Contr:: ', existingCust.CustomerContract, ' _id: ', id); 
    //Download truID transactions at this point 
    
    const trucol = await db.ApplicantTruIdCollections.find({"idNumber":cust.RSAIDNumber}).sort({'_id':-1}).limit(1);
    
    console.log('Anything in trucol????? :::: ', trucol, ' ========> ', trucol[0].collectionID, cust.RSAIDNumber);
    const truparams = {
      collectionID: trucol[0].collectionID,
      idNumber: cust.RSAIDNumber
    };
    // jerome this downloads all data from truid
    truIDService.downloadAllProductsbyCollectionID(truparams); 
    //Sending of email
    const subject = 'Contract details'; //<h2>Your Contract.</h2>
    const html = `<p>click this link to see the details of your contract:</p>
                <a href='https://www.amabuzz.co.za/view-contract?code=${id}&user=${cust.RSAIDNumber}'>View Contract</a>`;
                //<p><embed src='data:application/pdf;base64,${existingCust.CustomerContract}' type='application/pdf' /></p>`;
    //console.log('HTML::: ', html);
    await sendEmail.sendEmail({to: cust.emailAddress, subject, html});
    //Initiate the debitCheck at this point.
    insertDebtor(cust);
    removeCustomer(id);
    cb(result);
}
async function viewContract(body, cb){
    const existingCust = await db.CustomerSignature.findOne({"CustomerIDnumber":body.RSAIDNumber, "CustomerUUID":body.code});
    if(existingCust){
        cb({message:'', error:'', CustomerContract:existingCust.CustomerContract}, 200);
    }else{
        cb({message:'Customer not contract not found', error:'', CustomerContract:''}, 201);
    }
}
async function insertSignature(params, cb) {

    const existingCust = await db.CustomerSignature.findOne({"CustomerIDnumber":params.CustomerIDnumber, "CustomerUUID":params.CustomerUUID});
    //console.log('New sig: ', params, existingCust); 61d80c1be816e223f847a7b5
    if(!existingCust){
        //console.log('In If: ', params);
        const customerSignature = new db.CustomerSignature(params);

        await customerSignature.save();
        cb(customerSignature);
        //return customerSignature;
    }else{
        //console.log('In Else: ', params);
        const filter = {"CustomerIDnumber": params.CustomerIDnumber}
        const upSignature = {
            $set:{
                CustomerContract:params.CustomerContract
            }
        }
        const result = await db.CustomerSignature.updateOne(filter, upSignature);
        cb(result);
        //return result;
    }
}
async function getCustomerDocs(id){
    //console.log('This is the _id: ', id);
    const filter = {"_id":id};
    const customer = await db.Customer.findById(id);
    //console.log('The customer::::> ', customer);
    const {uploadedDocs} = customer;
    return uploadedDocs;
}
async function authenticate({ RSAIDNumber, customerPassword, ipAddress }) {
    const custRetu = await db.CustomerLogin.findOne({ RSAIDNumber });
    //console.log(custRet, customerPassword);
    if (!custRetu  || !bcrypt.compareSync(customerPassword, custRetu.customerPassword)) {
        return {
            message: 'ID number or password is incorrect',
            account:{},
            jwtToken: '',
            custRetu: {}
        }
        //throw 'ID number or password is incorrect';
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(custRetu);
    const refreshToken = generateRefreshToken(custRetu, ipAddress);

    // save refresh token
    await refreshToken.save();
    const otpColl = await db.CallBacks.find({RSAIDNumber}).sort({"dateRequested":-1}).limit(1);
    const account = await db.Customer.find({ RSAIDNumber });
    
    //.findOne({"$query":{RSAIDNumber}, "$orderby":{"_id":-1}});
    //console.log('OTPColl:::: ', otpColl);
    // const compuscan = compuscanService.getReportFromDB(RSAIDNumber); basicDetails
    // if(!compuscan){
    //     //
    // }
    return {
        message:'',
        account:account.map((x) =>basicDetails(x)),
        jwtToken,
        custRetu,
        OTP: otpColl[0].otp,
        SMSSentID: otpColl[0].SMSSentID,
        callbackID:otpColl[0]._id
    };
    // ,
    //     refreshToken: refreshToken.token
}
function generateJwtToken(account) {
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '15m' });
}

function generateRefreshToken(account, ipAddress) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        account: account.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}
function hash(password) {
    return bcrypt.hashSync(password, 10);
}

async function getApplicantSigedContract(id) {
   const customer = await db.CustomerSignature.find({ 'CustomerUUID': id });
   if (!customer) throw 'Customer contract not found ' + id;
   return customer;
}
async function removeCustomer(id){
    return await db.Customer.findByIdAndRemove(id);
}
