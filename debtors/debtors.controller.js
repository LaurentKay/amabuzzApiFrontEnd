// const express = require('express');
// const router = express.Router();
const authorize = require('../_middleware/authorize');
const debtorService = require('./debtors.service');
const {getBankName} = require('../_helpers/utils');
const axios = require('axios');
const { dateParser } = require('./datab');
const intecon = require('./../acol/intecon/intecon');
const customerService = require('../customers/customers.service');
//const moment = require('moment');
var getRandomValues = require('get-random-values');

const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray: false, trim: true, stripPrefix:true});

// routes
// router.post('/', insrt_Debtors);
// router.post('/tranferToClientAccount/:ok', authorize(), payLoanToClientAccount);
// router.post('/sendSMS', sendSMS);
// router.get('/loanToDisburse', authorize(), loanToDisburse);
// router.get('/:debtorID', getDebtorByID);
// router.get('/', getDebtorAll);
// router.get('/application/:applicationID', getDebtorByApplicationReferenceNumber);



//Schemas

//End of Schemas

const bacnkAccountTypes = [{
		name: '1',
		value: 'Savings'
	},
	{
		name: '2',
		value: 'Cheque/Current'
}];

function getBankType(aType) {
  var type = bacnkAccountTypes.filter((x) => x.name === aType);
  if (type.length > 0) return type[0].value;
  return type.value;
}


async function getCaliDadClient(RSAIDNumber) {
  //https://BASEURL/ambapi/client?RSAIDNumber=7212121252360 -H
  // const URL = 'https://bolshoi.runaloan.com/ambapi/client';
  const URL = `https://bolshoi.runaloan.com/ambapi/client?RSAIDNumber=${RSAIDNumber}`;
  const CONFIG = {
    "Content-Type": "application/json",
    "Tenant": "AMB",
    "Authorisation": "AMBQ9YTOeD3456Nhjr",
    "Accept": "application/json"
  };
return await axios.get(URL,{ headers: CONFIG });
}
async function createCaliDadClient(aClient) {
  //https://BASEURL/ambapi/client?RSAIDNumber=7212121252360 -H
  const URL = 'https://bolshoi.runaloan.com/ambapi/client';
  //const URL = `https://bolshoi.runaloan.com/ambapi/client?RSAIDNumber=${aClient.RSAIDNumber}`;
  const CONFIG = {
    "Content-Type": "application/json",
    "Tenant": "AMB",
    "Authorisation": "AMBQ9YTOeD3456Nhjr",
    "Accept": "application/json"
  };
  return await axios.post(URL, aClient, { headers: CONFIG });
  //return await axios.get(URL,{ headers: CONFIG });
}

async function createCaliDadApplication(aApplication) {
  const URL = 'https://bolshoi.runaloan.com/ambapi/application';
  const CONFIG = {
    "Content-Type": "application/json",
    "Tenant": "AMB",
    "Authorisation": "AMBQ9YTOeD3456Nhjr",
    "Accept": "application/json"
  };
  return await axios.post(URL, aApplication, { headers: CONFIG });
}
async function getCaliDadApplication(clientIDNumber) {
  const URL = `https://bolshoi.runaloan.com/ambapi/application?RSAIDNumber=${clientIDNumber}`;
  const CONFIG = {
    "Content-Type": "application/json",
    "Tenant": "AMB",
    "Authorisation": "AMBQ9YTOeD3456Nhjr",
    "Accept": "application/json"
  };
  return await axios.get(URL, { headers: CONFIG });
}
async function uploadCaliDadDocuments(aAppDocs){
  const URL = 'https://bolshoi.runaloan.com/ambapi/applicationattachment';
  const CONFIG = {
    "Content-Type" : "application/json",
    "Tenant": "AMB",
    "Authorisation": "AMBQ9YTOeD3456Nhjr",
    "Accept": "application/json"
  };
  return await axios.post(URL, aAppDocs, {headers:CONFIG});
}
// function insrt_Debtors(req, res, next){
//   //console.log('The body ', req.body);
//   debtorService.insertDebtor(req.body)
//     .then(resp =>{
//       res.send(resp);
//     }).catch(error => console.log('The error::: ', error));
// }

async function insertDebtor(body) {
  const col_obj = {'Monday':'01', 'Tuesday': '02', 'Wednesday':'03', 'Thursday':'04', 'Friday':'05', 'Saturday':'06',
  '2nd Monday':'08', '2nd Tuesday':'09', '2nd Wednesday':'10', '2nd Thursday':'11', '2nd Friday':'12',
  '2nd Saturday':'13', '2nd Sunday':'14'};
  let {
    _id,
    uploadedDocs,
    firstName,
    lastName,
    RSAIDNumber,
    mobileNumber,
    maritalStatus,
    emailAddress,
    promoCode,
    role,
    affordability,
    homeAddress1,
    bankAccountType,
    bankAccountNumber,
    bankName,
    homePostalCode,
    bankBranch,
    homeSuburb,
    homeProvince,
    homeCity,
    deliveryPostalCode,
    deliverySuburb,
    deliveryCity,
    deliveryAddress1,
    employerName,
    employerAddress1,
    workNumber,
    employerAddressCity,
    employerAddressPostalCode,
    employerContactNumber,
    employerAddress,
    salaryDay,
    yearEmployed,
    monthEmployed,
    salaryFrequency,
    employmentNumber,
    applicationStatus,
    EmploymentVerificationStatus,
    CreditReportStatus,
    createDate,
    homeAddress2,
    occupation,
  } = body;
  let newBody = {
    _id,
    uploadedDocs,
    firstName,
    lastName,
    RSAIDNumber,
    mobileNumber,
    maritalStatus,
    emailAddress,
    promoCode,
    role,
    affordability,
    homeAddress1,
    bankAccountType,
    bankAccountNumber,
    bankName,
    homePostalCode,
    bankBranch,
    homeSuburb,
    homeProvince,
    homeCity,
    deliveryPostalCode,
    deliverySuburb,
    deliveryCity,
    deliveryAddress1,
    employerName,
    employerAddress1,
    workNumber,
    employerAddressCity,
    employerAddressPostalCode,
    employerContactNumber,
    employerAddress,
    salaryDay,
    yearEmployed,
    monthEmployed,
    salaryFrequency,
    employmentNumber,
    applicationStatus,
    EmploymentVerificationStatus,
    CreditReportStatus,
    createDate,
    homeAddress2,
    occupation,
  };
  const mobileNumber1 = newBody.mobileNumber.replace(/\D|^0+/g, '+27');
  const  bankName1 = getBankName(newBody.bankName);
  const bankAccountType1 = getBankType(newBody.bankAccountType);
  const account_type1 = bankAccountType1 === 'Cheque/Current' ? 1 : 0;
  const homeAddress3 = newBody.homeAddress1; //As homeAddress2 is optional replace it with address1
  let message = 'completed';
  let type = 'success'; // warning, fail, success
  
  let gender = '';
  let title = '';
  if(parseInt(RSAIDNumber.substr(7, 1)) >= 5){
    gender = 'Male';
    title = 'Mr';
  }else{
    gender = 'Female';
    title = 'Ms';
  }
  let clientObj = {mobileNumber:mobileNumber1, bankName:bankName1, 
    bankAccountType1, 
    homeAddress2: homeAddress3, //As homeAddress2
    RSAIDNumber,
    firstName,
    lastName,
    maritalStatus,
    homeAddress1,
    homePostalCode,
    homeProvince,
    employerName,
    gender,
    title,
    employerAddress,
    yearEmployed,
    monthEmployed,
    occupation,
    salaryFrequency,
    salaryDay};
    clientObj.bankAccountNumber = parseInt(bankAccountNumber,10);
  let pf = {
    freq: clientObj.salaryFrequency,
    name: clientObj.salaryDay
  };
  //No longer needed '2021-09-25'
  console.log('InsertDebtor: The body part =====> ', clientObj);
  let { ExpenseFood, ExpenseMaintenance, loan1, loanTerms, ExpenseRent, ExpenseAccomodation,ExpenseEducation, ExpenseMedical, ExpenseTransport,ExpenseUtilities, IncomeMonthlyFixedsalary, IncomeMonthlyOtherIncome, IncomeMonthlyOvertime  } = newBody.affordability[0]
  const ExpFood = ExpenseFood ? ExpenseFood : 0;
  const ExpMaint = ExpenseMaintenance ? ExpenseMaintenance : 0;
  var applicationObj = {
    RSAIDNumber: body.RSAIDNumber,
    firstInstalmentDate: dateParser(pf).toLocaleString().substr(0,10),
    loanAmount: loan1,
    term: loanTerms,
    Rent: ExpenseRent ? ExpenseRent : 0,
    BondInstalment: ExpenseAccomodation ? ExpenseAccomodation : 0,
    Education: ExpenseEducation ? ExpenseEducation : 0,
    Other: ExpFood + ExpMaint,
    MedicalBills: ExpenseMedical ? ExpenseMedical : 0,
    TransportCosts: ExpenseTransport ? ExpenseTransport : 0,
    Electricity: ExpenseUtilities ? ExpenseUtilities : 0,
    IncomeSalary: IncomeMonthlyFixedsalary ? IncomeMonthlyFixedsalary : 0,
    IncomeOther: IncomeMonthlyOtherIncome ? IncomeMonthlyOtherIncome : 0,
    IncomeSupplementaryEmployment: IncomeMonthlyOvertime ? IncomeMonthlyOvertime : 0,

    //...req.body
  };
  /**
   * generate a uniqid everytime this is called
   * @param {*} dec 
   * @returns 
   */
  console.log('Testing installment data::::: ', applicationObj);
  return;
   const dec2hex = (dec) => {
    return dec.toString(32).padStart(6, "fAzJKLMabcdemnopBCDEFqrstuvwxyzghijklAGHINOPQRTUVWXYZ")
  }
  const addInteconClient = async (clientDetails) => {

    const clientData = await intecon.addClient(clientDetails);
    let message = null;
    let prm = new Promise((resolve, reject) => {
        if (clientData) {
            parser.parseString(clientData, (err, it) => {
                if (err) {
                    console.log(err);
                }
                const d = it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
                return parser.parseString(d, (errw, clients) => {
                    if (err) {
                        console.log(errw);
                    }

                    let { guid, org_cd, branch_cd,
                        client_no, id_no, first_name,
                        surname, employer_cd, cell_tel_no, reply_str, reply_cd } = clients.responses.AddClient;
                      console.log('::::: client create detail :::::',clients.responses.AddClient)
                    message = reply_str;
                    let type = ''
                    if (reply_cd === '207') {
                        type = 'success'
                    } else {
                        type = 'warning'
                    }
                    return resolve({message,type});

                });
            });
           // return resolve(message)
        } else {
            return resolve({ message: 'process failed', type: 'warning' });
        }
    })
    return prm
  }
  // getCaliDadApplication(RSAIDNumber).then(app =>  console.log('THE APP:::::: ', app)).catch(err => console.log('THE APP:::::: ', err));
  // return;
  const getInteconClient = async (clientDetails) => {

    const clientData = await intecon.getClient(clientDetails);
    let message = null;
    let prm = new Promise((resolve, reject) => {
        if (clientData) {
            parser.parseString(clientData, (err, it) => {
                if (err) {
                    console.log(err);
                }
                const d = it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
                return parser.parseString(d, (errw, clients) => {
                    if (err) {
                        console.log(errw);
                    }

                    let { guid, org_cd, branch_cd,
                        client_no, id_no, first_name,
                        surname, employer_cd, cell_tel_no, reply_str, reply_cd } = clients.responses.GetClient;
                      console.log('::::: client create detail :::::',clients.responses.GetClient)
                    message = reply_str;
                    let type = ''
                    if (reply_cd === '207') {
                        type = 'success'
                    } else {
                        type = 'warning'
                    }
                    return resolve({message,type});

                });
            });
           // return resolve(message)
        } else {
            return resolve({ message: 'process failed', type: 'warning' });
        }
    })
    return prm
  }

  const createPromisory = async (data) => {  
      if (data.client_no) {
        const clientData = await intecon.createACOLPromissory(data);
        
        if (clientData) {
          parser.parseString(clientData, (err, it) => {
            if (err) {
              console.log(err);
            }
            const d = it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
            parser.parseString(d, (errw, promData) => {
              if (err) {
                console.log(errw);
              }
              
              /**
               * debtor id is only assigned after first payment received
               * not when the mandate has been established
               */
          
              console.log('DIE OOG VANDITIET', promData.responses.CreatePromissory)
     
            })
         
          });
        }
    } else {
      const myPromise = new Promise((resolve, reject) => {
       
          resolve({fetchStatus:'failed',data, message:'no client no'})
     
      });
     return myPromise
    }
  }
  // generateId :: Integer -> String
  const generateId =(len)=> {
      var arr = new Uint8Array((len ||10) / 2)
      //window.crypto.getRandomValues(arr)
      getRandomValues(arr)
      return Array.from(arr, dec2hex).join('')
  }
  /**
   * 
   * 
   * 
   * 
   * 
   */
   let calidClient;
  try {
    calidClient = await createCaliDadClient(clientObj) 
  } catch (errr) {
    console.log('createCaliDadClient failed');
    calidClient = await getCaliDadClient(clientObj.RSAIDNumber)
  } finally {
    console.log('createCaliDadClient');
  }

   //const { client_id } = calidClient.data;
 
   newBody = Object.assign(newBody, {
    client_id: calidClient.data.client_id
  });
    /**TODO map variables for CLIENT */
    /** there is no wait for this just suppose the success */
    try {
      const inteClient = await addInteconClient({client_no:calidClient.data.client_id,id_no: newBody.RSAIDNumber,
                       first_name:newBody.firstName,surname:newBody.lastName,employer_cd:'EMPTEMP2', 
                       cell_tel_no:newBody.mobileNumber, email:newBody.emailAddress});
                   
        message = 'Intecon Client created'; type = 'success';
    } catch (errrr) {
      console.log('addInteconClient failed');
      message = 'Intecon Client NOT created'; type = 'warning';
      inteClient = await getInteconClient(calidClient.data.client_id)
    } finally {
      console.log('Intecon client creation');
    }


    let calApplication;
    try {
      calApplication = await createCaliDadApplication(applicationObj);
      Object.assign(newBody, {
        application_id: calApplication.data.application_id,
        applicationStatus: 'AWAITING CALIDAD'
      });
      message = 'Calidad Application created'; type = 'success';
    } catch (appErr) {
      console.log('createCaliDadApplication failed');
      message = 'Calidad Application NOT created'; type = 'warning';
      console.log('The client ID ====> ', body.RSAIDNumber);
      calApplication = await getCaliDadApplication(body.RSAIDNumber);
      newBody = Object.assign(newBody, {
        application_id: calApplication.data.application_id,
        applicationStatus: 'AWAITING CALIDAD'
      });
      console.log('The app return ====> ', calApplication);
    } finally {
      console.log('createCaliDadApplication ');
    }
    

    try {
      let loan_ref_no = newBody.application_id.toString() + generateId(4)
      const installMent = Math.ceil(body.affordability[0].installMent); // converted to cents
      const loanTerms = body.affordability[0].loanTerms;
      console.log(installMent,loanTerms, '::::::::::::::: instalment and loan terms :::::::::::')
      let payFreq = 2;
      const firstInstalmentDt = dateParser(pf).substr(0,10).replace(/-/g, '');
      if(pf.freq === 'weekly'){
        payFreq = 0;
      }else if(pf.freq === 'fortnightly'){
        payFreq = 1;
      }
      let col_day = '';
      if(payFreq === 2){
        col_day = body.salaryDay;
      }else if(payFreq === 0 || payFreq === 1){
        col_day = col_obj[pf.name];
      }
      const acoolDetails = {
        date_adj: 4,
        loan_ref_no,
        first_dt: firstInstalmentDt, // moment(firstDebitDay).format('YYYYMMDD'),
        client_no:  newBody.client_id,
        mode: 'Online',
        account_type: parseInt(account_type1, 10),
        bank_acc_no: newBody.bankAccountNumber,
        issuerName:bankName1,
        bank_branch_cd: newBody.bankBranch, //bankName.unicode
        pmt_stream: 'ACOL',
        //collection_day: payDay.freq,
        frequency: parseInt(payFreq, 10),
        track_cd: '07',
        status: 1,
        collection_day:col_day,
        inst_adj_freq: 3,
        inst_adj_rate: 10,
        inst_amt: installMent ,
        /**
        total_amt - The sum of all periodic collections to be made from the client’s account specified in cents
        */
        total_amt: installMent  * loanTerms,
        firstDebitDay: firstInstalmentDt,
        allow_date_chg: 'T',
        allow_scheduling: 'T',
    };

    console.log('ACOL PARAM::::=> ', acoolDetails);
     const calAcol =  await createPromisory(acoolDetails);
     newBody = Object.assign(newBody, {debitCheckInitiated:'Debit check data submitted successffuly to intecon'},{loan_ref_no},{promSentToCalidad:false});
     //add loan ref no to new body here
     message = 'ACOL created'; type = 'success';
    } catch (acolErr) {
      console.log('acolErr failed => ', acolErr);
      message = 'ACOL NOT created'; type = 'failure';
      newBody = Object.assign(newBody, {debitCheckInitiated:'Debit check data NOT submitted  to intecon'})
    } finally {

      console.log('created the acol');
    }

   const approvedImg =`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`
   try {
        let aAppPaySlip = {
                  "RSAIDNumber": body.RSAIDNumber,
                  "application_id": newBody.application_id,
                  "attachment_type_id": 7,
                  "file_name": "Payslip.pdf",
                  "attachment": approvedImg //req.body.uploadedDocs.paySlip.substring(28)
            };
      const uploadPayslip = await uploadCaliDadDocuments(aAppPaySlip);
      message = 'uploadPayslip created'; type = 'success';
    }  catch (payslipErr) {
      console.log('payslipErr failed')
      newBody = Object.assign(newBody, {
        applicationStatus: 'uploadPayslip failed'
      });
    } finally {
      console.log('cleanup the payslip')
    }
  


    try {
      let aAppID = {
        "RSAIDNumber": body.RSAIDNumber,
        "application_id": newBody.application_id,
        "attachment_type_id": 1,
        "file_name": "IDDocument.pdf",
        "attachment": approvedImg //req.body.uploadedDocs.idDocument.substring(28)
      }
      const uploadIDdocument = await uploadCaliDadDocuments(aAppID)
    } catch (idDocErr) {
      console.log('idDocErr failed')
      newBody = Object.assign(newBody, {
        applicationStatus: 'uploadIDdocument failed'
      });
    } finally {
      console.log('clean up the id doc upload ')
    }


    try {
        var aAppBankStatements = {
          "RSAIDNumber": body.RSAIDNumber,
          "application_id": newBody.application_id,
          "attachment_type_id": 4,
          "file_name": "BankStament.pdf",
          "attachment": approvedImg //req.body.bankStatement   
        }
        const uploadBankStatment =  await uploadCaliDadDocuments(aAppBankStatements);
        /** end user sees this final statement last step in process of creating application */
        newBody = Object.assign(newBody, {
          applicationStatus: 'AWAITING APPROVAL'
        });
    } catch (bankstatmntErr) {
      console.log('bankstatmntErr failed')
      newBody = Object.assign(newBody, {
        applicationStatus: 'uploadBankStatment failed'
      });
    } finally {
      console.log('cleanup bankstatement errors')
    }

    try {
      newBody = Object.assign(newBody,{disburseStatus:'Not Yet Disbursed'});
      //console.log('newBody ===> ', newBody);
    let dbSe = await debtorService.insertDebtor(newBody);
    //customerService.removeCustomer(body._id);
    } catch(debitorError) {
      console.log('debitorError failed');
      message = 'Debitor not created'; type:'failure';
    } finally {
      console.log('final debtor creation')
    }
   return {message:message, type:type};
   
}
//module.exports = router;
module.exports = {
  insertDebtor
};
