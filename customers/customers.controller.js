const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest, validateReque, validateRequ } = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
//const accountService = require('../accounts/account.service');
const customerService = require('./customers.service');
const fs = require('fs');
const nodemailer = require('nodemailer');
const config = require('config.json');
const { default: axios } = require('axios');
const xml2js = require('xml2js');
const { validateAccountCDV } = require('../intecon/intecon');
const { generateHashIDs } = require('../_helpers/utils');
const { v4: uuidv4 } = require("uuid");
const ID = require('nodejs-unique-numeric-id-generator');

const parser = new xml2js.Parser({ explicitArray: false, trim: true, stripPrefix: true });
const updateAssessment = (req, res, next) => {
  // if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
  //     return res.status(401).json({ message: 'Unauthorized' });
  // }
  customerService.updateAssessment(req.params.customerId, req.body)
    .then(customer => res.status(200).json(customer))
    .catch(next);
}
// routes
router.post('/login', authenticateSchema, authenticate);
router.post('/register', createCustomerSchema, createCustomer);
router.get('/appMessageSettings', appMessageSettings);
router.get('/prequalifiedids', prequalifiedids)
router.get('/getCustomerDocs/:id', getCustomerDocs);
router.get('/calculateAffordability/:id', calculateAffordability);
//router.get('/:id', authorize(), getById);
router.post('/uploads', uploads);
router.post('/', createSchema, create); //authorize(),
router.put('/:id', updateSchema, update); //authorize(),
router.put('/appstatus/:id', appStatus);
router.put('/affordability/:customerId', updateAssemssmentSchema, updateAssessment); //authorize(),
router.post('/sendpassword', sendResetLink);
router.post('/sendEmail', sendEmail);
router.post('/resetpassword', resetPassword);
router.post('/emailactivate', emailActivate);
router.post('/viewContract', viewContract);
//router.post('/insertHistory',  createHistory); //
router.post('/insertSignature', insertSignature);
router.post('/validateAccount', validateAccount);
//router.get('/contract/:id', getSigedContract)

async function validateAccount(req, res, next) {
  console.log('\nReq::: ', req.body);
  const params = {
    //id_no:req.body.RSAIDNumber,
    account_type: req.body.account_type,
    bank_acc_no: req.body.bank_acc_no,
    bank_branch_cd: req.body.bank_branch_cd,
    //client_no, 
    //first_name:req.body.first_name, 
    //surname:req.body.surname
  };
  const response = await validateAccountCDV(params);
  parser.parseString(response, (err, irt) => {
    if (err) {
      console.log('Xml_Err::: ', err);
    }
    //const g = irt['soap:Envelope']['soap:Body'].CallResponse;
    const g1 = irt['soap:Envelope']['soap:Body'].CallResponse.CallResult;
    let reply_cd;
    let reply_str;
    parser.parseString(g1, (errw, opData) => {
      if (errw) {
        console.log(errw);
      }
      reply_cd = opData.responses.ValidateAccountCDV.reply_cd;
      const len = opData.responses.ValidateAccountCDV.reply_str.indexOf('(');
      reply_str = opData.responses.ValidateAccountCDV.reply_str.substr(0, len - 1);
      console.log('Finally:::: ', reply_cd, reply_str);
    });
    // const len = g.CallResult.indexOf('</reply_str>') - g.CallResult.indexOf('<reply_str>');
    // const resp = g.CallResult.substr(g.CallResult.indexOf('<reply_str>')+11,len-11);
    //console.log('Response:::: ', resp, g1);
    if (Number(reply_cd) === 207) {//resp === 'Request successfully completed (0000)'){
      res.status(200).send({ message: reply_str });
    } else {
      res.status(201).send({ message: reply_str })
    }
  });
}
function updateUploadSchema(req, res, next) {
  const documentsSchema = Joi.object.keys({
    name: Joi.string(),
    surname: Joi.string(),
    idNumber: Joi.string(),
    idDocument: Joi.string(),
    dateUploaded: Joi.date(),
    bankStatement: Joi.string().allow(null, ''),
    paySlip: Joi.string().allow(null, '')
  });
  const schema = Joi.object().keys({
    uploadedDocs: documentsSchema
  });
  // const v = schema.validate(req.body)

  validateRequest(req, next, schema)
}
function getCustomerDocs(req, res, next) {
  customerService.getCustomerDocs(req.params.id)
    .then(custDocs => res.status(200).send(custDocs));
}
function updateAssemssmentSchema(req, res, next) {

  const affordabilityCalculationSchema = Joi.object().keys({
    affordabilityWeight: Joi.number(),
    dateTimeCriteriaApproved: Joi.date().allow(null, ''),
    humanAffordAbilityApprover: Joi.string().allow(null, ''),
    totalIncomeGreaterThanExpenses: Joi.boolean(),
    monthlyIncome: Joi.number(),
    monthlyExpense: Joi.number(),
    affordabilityApproval: Joi.string().allow(null, '')
  });

  const affordSchema = Joi.object().keys({
    customerId: Joi.string(),
    IncomeRental: Joi.number(),
    familyContribution: Joi.number(),
    spouseJointIncome: Joi.number(),
    monthlyGrossIncome: Joi.number(),
    totalDeductions: Joi.number(),
    monthlyNettIncome: Joi.number(),
    ExpenseAccomodation: Joi.number(),
    ExpenseTransport: Joi.number(),
    ExpenseFood: Joi.number(),
    ExpenseEducation: Joi.number(),
    ExpenseMedical: Joi.number(),
    ExpenseUtilities: Joi.number(),
    ExpenseMaintenance: Joi.number(),
    totalMonthlyExpense: Joi.number(),
    loan1: Joi.number(),
    loand2: Joi.number(),
    loans3: Joi.number(),
    loans4: Joi.number(),
    loanTerms: Joi.number(),
    installMent: Joi.number(),
    bankStatementMonthlyExpenses: Joi.number(),
    incomeMinusExpensesTotal: Joi.number(),
    ExpenseRent: Joi.number(),
    IncomeMonthlyFixedSalary: Joi.number(),
    IncomeMonthlyOtherIncome: Joi.number(),
    IncomeMonthlyOvertime: Joi.number(),
    installMent: Joi.number(),
    loan1: Joi.number(),
    loanTerms: Joi.number(),
    affordabilityCalculation: affordabilityCalculationSchema
  })
  //console.log(req.body);
  // const calcIncome = () => {
  //   let obj = req.body[0];// ? req.body[0] : req.body;
  //   return (obj.monthlyFixedsalary + obj.monthlyOvertime +
  //     obj.monthlyOtherIncome + obj.familyContribution + obj.spouseJointIncome);
  // }

  // const calcExpemse = () => {
  //   let obj = req.body[0];// ? req.body[0] : req.body;
  //   return (obj.totalDeductions +
  //       obj.expenseAccomodation + obj.expenseTransport + obj.expenseFood +
  //        obj.expsenseEducation + obj.expenseMedical + obj.expenseUtilities +
  //         obj.expenseMaintenance + obj.totalMonthlyExpense);
  // }

  // Object.assign(req.body[0], {
  //   affordabilityCalculation: {
  //     affordabilityWeight: calcIncome() > calcExpemse() ? 1 : 0,
  //     dateTimeCriteriaApproved: '',
  //     humanAffordAbilityApprover: '',
  //     totalIncomeGreaterThanExpenses: calcIncome() > calcExpemse(),
  //     monthlyIncome: calcIncome(),
  //     monthlyExpense: calcExpemse(),
  //     affordabilityApproval: ''
  //   }
  // })

  const schema = Joi.object().keys({
    affordability: affordSchema
  });
  // const v = schema.validate(req.body) [0]
  validateRequest(req.body, next, schema);
}
function appMessageSettings(req, res, next) {
  //console.log('Is this being called at all');
  customerService.appMessageSettings()
    .then(appsettings => res.send(appsettings))
    .catch(next);
}
function prequalifiedids(req, res, next) {
  const cb = (xyz, code) => {
    res.status(code).send(xyz);
  }
  customerService.prequalifiedids(cb);
}
function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    RSAIDNumber: Joi.string().required(),
    customerPassword: Joi.string().required()
  });
  //console.log('=>: ', req.body);
  validateReque(req, next, schema);
}

async function authenticate(req, res, next) {
  console.log('=>: ', req.body);
  const { RSAIDNumber, customerPassword } = req.body.value;
  const reCaptchaValue = req.body.reCaptchaValue;
  const promoCode = req.body.promoCode;
  const ipAddress = req.ip;
  const dataRes = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${config.private_key}&response=${reCaptchaValue}`
  );
  if (dataRes.data.success) {
    customerService.authenticate({ RSAIDNumber, customerPassword, ipAddress })
      .then(({ message, account, jwtToken, custRetu, OTP, SMSSentID, callbackID }) => {
        if (message === '') {
          //setTokenCookie(res, refreshToken);
          //console.log('=>: ', account);
          const custRet = {
            _id: custRetu._id,
            RSAIDNumber: custRetu.RSAIDNumber,
            firstName: custRetu.firstName,
            lastName: custRetu.lastName,
            mobileNumber: custRetu.mobileNumber,
            emailAddress: custRetu.emailAddress,
            customerPassword: custRetu.customerPassword,
            createDate: custRetu.createDate,
            pwdrestCode: custRetu.pwdrestCode,
            emailVerify: custRetu.emailVerify,
            promoCode
          };
          console.log('=>: ', custRet, promoCode);
          res.status(200).json({ account, custRet, message: '', OTP, SMSSentID, callbackID });
        } else {
          res.status(201).json({ message });
        }

      })
      .catch(next);
  } else {
    res.status(201).send({ message: 'You are a robot' });
  }
}

// function refreshToken(req, res, next) {
//   const token = req.cookies.refreshToken;
//   const ipAddress = req.ip;
//   accountService.refreshToken({ token, ipAddress })
//     .then(({ refreshToken, ...account }) => {
//       setTokenCookie(res, refreshToken);
//       res.json(account);
//     })
//     .catch(next);
// }

const customerSignatureSchema = Joi.object().keys({
  CustomerIDnumber: Joi.string(),
  dateSigned: Joi.date().allow(null, ''),
  signature: Joi.string().allow(null, ''),
  IPAddress: Joi.string()
});

function revokeTokenSchema(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().empty('')
  });
  validateRequest(req, next, schema);
}

// function revokeToken(req, res, next) {
//   // accept token from request body or cookie
//   const token = req.body.token || req.cookies.refreshToken;
//   const ipAddress = req.ip;

//   if (!token) return res.status(400).json({ message: 'Token is required' });

//   // users can revoke their own tokens and admins can revoke any tokens
//   if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   accountService.revokeToken({ token, ipAddress })
//     .then(() => res.json({ message: 'Token revoked' }))
//     .catch(next);
// }


function getAll(req, res, next) {
  customerService.getAll()
    .then(customers => res.json(customers))
    .catch(next);
}
function getDocuments(req, res, next) {
  customerService.getAllCustomerDocs()
    .then(customers => res.send(customers))
  //res.send([{firstName:'John', lastName:'Doe', idNumber:'1234567890123',bankStatement:'Thistest.pdf', paySlips:'thispayslips.pdf' }])
}
function uploads(req, res, next) {
  // if (!req.files || Object.keys(req.files).length === 0) {
  //     return res.status(400).send('No files were uploaded.');
  // }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file __dirname +
  //console.log(req.body);
  // const uploadPath = 'C:/myprojects/amabuzz/public/uploads/';
  // const attach1 = req.files.attach1;
  // attach1.mv(uploadPath + attach1.name);
  // //const paySlips = req.files.paySlip
  // const fePath = "./uploads/";

  // Use the mv() method to place the file somewhere on your server


  //type_date_idnumber bank_20210101_8798765131452_1
  // var todayDate = replaceAll(new Date().toLocaleDateString('en-ZA'),"/", ""); 
  // let saveStatPath = '';
  // let paySlipPath = '';
  // var bexten = attach1.name.split(".")[1];
  // let DocumentDet = {};
  // if(req.body.documentType === "bankStatement"){
  //     saveStatPath = 'bank_' + todayDate + "_" + req.body.idNumber + "_1."+bexten;
  //     DocumentDet.bankStatement = fePath + saveStatPath;
  // }else if(req.body.documentType === "payslip"){
  //     saveStatPath = 'pay_' + todayDate + "_" + req.body.idNumber + "_2."+bexten;
  //     DocumentDet.paySlip =fePath + saveStatPath;
  // }else if(req.body.documentType === 'identityDocument'){
  //     saveStatPath = 'id_' + todayDate + "_" + req.body.idNumber + "_3."+bexten;
  //     DocumentDet.idDocument = fePath + saveStatPath;
  // }
  // fs.rename(uploadPath + attach1.name, uploadPath + saveStatPath, function(err){
  //     if(err) {console.log(err);}else{
  //     console.log('The file has been renamed ' + saveStatPath);}
  // });
  //console.log('The file  ' + req.body, req, req.body);
  let uploadedDocs = req.body;
  uploadedDocs.dateUploaded = new Date().toLocaleDateString('en-ZA');

  //console.log(uploadedDocs);

  customerService.updateCustDoc(req.body.idNumber, uploadedDocs)
    .then(customer => {
      //console.log("Any Res:::: ", customer);
      res.status(200).send(customer.message);
    })
    .catch(next);
  //res.send('File(s) uploaded');
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
function getAllAssessments(req, res, next) {
  customerService.getAllAssessments()
    .then(customers => res.json(customers))
    .catch(next);
}
function getAllAssessments(req, res, next) {
  customerService.getAllAssessments()
    .then(customers => res.json(customers))
    .catch(next);
}
function getById(req, res, next) {
  // users can get their own account and admins can get any account
  // if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
  //     return res.status(401).json({ message: 'Unauthorized' });
  // }
  customerService.getById(req.params.id)
    .then(customer => customer ? res.json(customer) : res.sendStatus(404))
    .catch(next);
}
async function resetPassword(req, res, next) {
  try {
    const ret = await customerService.resetPassword(req.body);
    if (ret.ok) {
      res.status(200).send({ message: 'Password updated successfully' });
    } else {
      res.status(201).send({ message: 'There was an error updating your password, please try again later' });
    }
  } catch (e) {
    res.status(201).send({ message: 'Unable to reset your password, please try again later' });
  }
}
async function emailActivate(req, res, next) {
  const ret = await customerService.emailActivate(req.body);
  if (ret.ok && ret.nModified > 0) {
    res.status(200).send({ message: 'Your email has been verified' });
  } else {
    res.status(201).send({ message: 'Unable to verify your email, Please try again later' });
  }
}
async function viewContract(req, res, next) {
  const cb = (xyz, code) => {
    res.status(code).send(xyz);
  }
  await customerService.viewContract(req.body, cb);
}
async function sendEmail(req, res, next) {
  //console.log('The ID: ', req.body);
  try {
    const message = req.body.message + '<br />' + req.body.name;
    const subject = req.body.subject;
    const email = req.body.email;
    const name = req.body.name;
    sendNotificationfnc(message, subject, email, res);
    //console.log('An Error? ', e);
  }catch(e){
    res.status(201).send({ message: e });
  }
}
async function sendResetLink(req, res, next) {
  //console.log('The ID: ', req.body);
  try {
    const customer = await customerService.getLoginById(req.body.RSAIDNumber);
    if (customer) {
      const str = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const pwdrestCode = shuffle(str).substr(0, 12);
      const ret = await customerService.upLoginById(req.body.RSAIDNumber, pwdrestCode);
      if (ret.ok) {
        const message = `
                <h2>Password Reset</h2>
                <p>Your Account:</p>
                <p>Email: ${customer.emailAddress}</p>
                <p>Please click the link below to reset your password.</p>
                <a href='https://www.amabuzz.co.za/reset-password?code=${pwdrestCode}&user=${customer.RSAIDNumber}'>Reset Password</a>
                `;
        const subject = "'Amabuzz System Password Reset'";
        sendNotification(message, subject, customer.emailAddress, res);
        //next();
      } else {
        res.status(201).send({ message: 'There was an error reseting your password, please try again later' });
      }
    } else {
      res.status(201).send({ message: 'Customer details could not be located' });
    }
  } catch (e) {
    //console.log('An Error? ', e);
    res.status(201).send({ message: e });
  }
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
function sendNotificationfnc(body, subject, email, res) {
  //console.log("The email: ", req.body);
  let testAccount = nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport(config.smtpOptions);

  //const email = email;
  //const message = req.body.message; Your email was submitted, we will come back to you shortly 
  //const subject = subject;
  const content = body;
  var mail = {
    from: config.emailFrom,
    to: email,
    subject: subject,
    html: content
  }
  let bsent = false;
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log('Mail Error: ', err, mail);
      res.status(201).send({ message: 'Unable to send email, please try again later' });
    } else {
      //console.log('Mail data: ', data);
      res.status(200).send({ message: 'Your message has been received. We will get back to you.' });
    }
  });
}
function sendNotification(body, subject, email, res) {
  //console.log("The email: ", req.body);
  let testAccount = nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport(config.smtpOptions);

  //const email = email;
  //const message = req.body.message; Your email was submitted, we will come back to you shortly 
  //const subject = subject;
  const content = body;
  var mail = {
    from: config.emailFrom,
    to: email,
    subject: subject,
    html: content
  }
  let bsent = false;
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      //console.log('Mail Error: ', err);
      res.status(201).send({ message: 'Unable to reset your password, please try again later' });
    } else {
      //console.log('Mail data: ', data);
      res.status(200).send({ message: 'A link to reset your password has been sent to you email' });
    }
  });
}
function calculateAffordability(req, res, next) {
  customerService.calculateAffordability(req.params.id)
    .then(customer => customer ? res.json(customer) : res.sendStatus(404))
    .catch(next);
}

function createCustomerSchema(req, res, next) {
  const schema = Joi.object({
    _id: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    RSAIDNumber: Joi.string().required(),
    customerPassword: Joi.string(),
    mobileNumber: Joi.string().required(),
    emailAddress: Joi.string(),
    termsConditions: Joi.boolean(),
  });

  validateRequ(req, next, schema);
}

function createCustomer(req, res, next) {
  const cb = (xyz, code) => {
    res.status(code).send(xyz);
  }
  const { value, promoCode } = req.body;
  customerService.createCustomer(value, promoCode, cb);
  // .then(customer => res.status(200).json(customer))
  // .catch(next);
}

function createSchema(req, res, next) {
  const uploadedDocsSchema = Joi.object().keys({
    name: Joi.string(),
    surname: Joi.string(),
    idNumber: Joi.string(),
    dateUploaded: Joi.date(),
    bankStatement: Joi.string().allow(null, ''),
    paySlip: Joi.string().allow(null, ''),
    idDocument: Joi.string().allow(null, '')
  });
  const schema = Joi.object({
    _id: Joi.string(),
    applicationId: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    RSAIDNumber: Joi.string().required(),
    mobileNumber: Joi.string().required(),
    homeNumber: Joi.string(),
    workNumber: Joi.string(),
    maritalStatus: Joi.string(),
    emailAddress: Joi.string(),
    homeAddress1: Joi.string().required(),
    homeAddress2: Joi.string(),
    homeCity: Joi.string(),
    deliveryAddress1: Joi.string(),
    deliverySuburb: Joi.string(),
    deliveryCity: Joi.string(),
    deliveryPostalCode: Joi.string(),
    employerName: Joi.string(),
    employerAddress1: Joi.string(),
    employerAddressCity: Joi.string(),
    salaryDay: Joi.string(),
    yearEmployed: Joi.number(),
    monthEmployed: Joi.number(),
    occupation: Joi.string(),
    salaryFrequency: Joi.string(),
    employmentNumber: Joi.string(),
    employerAddressPostalCode: Joi.string(),
    employerContactNumber: Joi.string(),

    affordability: Joi.array(),
    homeSuburb: Joi.string(),
    homeProvince: Joi.string().required(),
    homePostalCode: Joi.string(),
    bankName: Joi.string(),
    bankAccountNumber: Joi.string(),
    bankBranch: Joi.string(),
    bankAccHolderName: Joi.string(),
    bankAccountType: Joi.string(),
    verifiableIncome: Joi.boolean(),
    updated: Joi.date(),
    createDate: Joi.date(),
    active: Joi.boolean(),
    role: Joi.string().valid(Role.Admin, Role.User, Role.Customer).required(),
    creditScore: Joi.string(),
    applicationStatus: Joi.string().allow(null, ''),
    uploadedDocs: uploadedDocsSchema,
    EmploymentVerificationStatus: Joi.string().allow(null, ''),
    CreditReportStatus: Joi.string().allow(null, ''),
    AffordabilityVerificationStatus: Joi.string().allow(null, ''),
    baningStatus: Joi.string().allow(null, ''),
    promoCode: Joi.string().allow(null, '')
  });
  //In case data is comming from the web form these field will not be available  Assessment
  req.body.homeAddress1 = req.body.homeAddress1 ? req.body.homeAddress1 : 'Incomplete';
  req.body.bankAccountType = req.body.bankAccountType ? req.body.bankAccountType : 'Incomplete';
  req.body.bankAccountNumber = req.body.bankAccountNumber ? req.body.bankAccountNumber : 'Incomplete';
  req.body.bankName = req.body.bankName ? req.body.bankName : 'Incomplete';
  req.body.homePostalCode = req.body.homePostalCode ? req.body.homePostalCode : 'Incomplete';
  req.body.bankBranch = req.body.bankBranch ? req.body.bankBranch : 'Incomplete';
  req.body.homeSuburb = req.body.homeSuburb ? req.body.homeSuburb : 'Incomplete';
  req.body.homeProvince = req.body.homeProvince ? req.body.homeProvince : 'Incomplete';
  req.body.homeCity = req.body.homeCity ? req.body.homeCity : 'Incomplete';
  req.body.deliveryPostalCode = req.body.deliveryPostalCode ? req.body.deliveryPostalCode : 'Incomplete';
  req.body.deliverySuburb = req.body.deliverySuburb ? req.body.deliverySuburb : 'Incomplete';
  req.body.deliveryCity = req.body.deliveryCity ? req.body.deliveryCity : 'Incomplete';
  req.body.deliveryAddress1 = req.body.deliveryAddress1 ? req.body.deliveryAddress1 : 'Incomplete';
  //employer info
  req.body.employerName = req.body.employerName ? req.body.employerName : 'Incomplete';
  req.body.employerAddress1 = req.body.employerAddress1 ? req.body.employerAddress1 : 'Incomplete';
  req.body.workNumber = req.body.workNumber ? req.body.workNumber : 'Incomplete';
  req.body.employerAddressCity = req.body.employerAddressCity ? req.body.employerAddressCity : 'Incomplete';
  req.body.employerAddressPostalCode = req.body.employerAddressPostalCode ? req.body.employerAddressPostalCode : 'Incomplete';
  req.body.employerContactNumber = req.body.employerContactNumber ? req.body.employerContactNumber : 'Incomplete';
  req.body.salaryDay = req.body.salaryDay ? req.body.salaryDay : 'Incomplete';
  req.body.yearEmployed = req.body.yearEmployed ? req.body.yearEmployed : 0;
  req.body.monthEmployed = req.body.monthEmployed ? req.body.monthEmployed : 0;
  req.occupation = req.body.occupation ? req.body.occupation : 'Incomplete';
  req.body.salaryFrequency = req.body.salaryFrequency ? req.body.salaryFrequency : 'monthly';
  req.body.employmentNumber = req.body.employmentNumber ? req.body.employmentNumber : 'Incomplete';
  req.body.applicationStatus = req.body.applicationStatus ? req.body.applicationStatus : '';
  req.body.EmploymentVerificationStatus = req.body.EmploymentVerificationStatus ? req.body.EmploymentVerificationStatus : '';
  req.body.CreditReportStatus = req.body.CreditReportStatus ? req.body.CreditReportStatus : '';
  req.body.AffordabilityVerificationStatus = req.body.AffordabilityVerificationStatus ? req.body.AffordabilityVerificationStatus : '';
  req.body.baningStatus = req.body.baningStatus ? req.body.baningStatus : '';
  req.body.promoCode = req.body.promoCode ? req.body.promoCode : '';
  req.body.contractType = 'Loan';
  req.body.applicationId = ID.generate(new Date().toJSON()); //generateHashIDs(uuidv4()).toUpperCase();

  const uploadedDocs = {
    name: req.body.firstName,
    surname: req.body.lastName,
    idNumber: req.body.RSAIDNumber,
    paySlip: '',
    idDocument: ''
  };
  req.body.uploadedDocs = uploadedDocs;
  //End case
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  const cb = (xyz) => {
    res.send(xyz);
  }
  customerService.create(req.body, cb);
  // .then(customer => res.status(200).json(customer))
  // .catch(next);
}

function updateSchema(req, res, next) {

  const uploadedDocsSchema = Joi.object().keys({
    name: Joi.string(),
    surname: Joi.string(),
    idNumber: Joi.string(),
    dateUploaded: Joi.date(),
    bankStatement: Joi.string().allow(null, ''),
    paySlip: Joi.string().allow(null, ''),
    idDocument: Joi.string().allow(null, '')
  });
  const schemaRules = Joi.object().keys({
    id: Joi.string(),
    applicationId: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    RSAIDNumber: Joi.string().required(),
    mobileNumber: Joi.string().required(),
    homeNumber: Joi.string(),
    workNumber: Joi.string(),
    maritalStatus: Joi.string(),
    emailAddress: Joi.string(),
    homeAddress1: Joi.string().required(),
    homeAddress2: Joi.string().allow(null, ''),
    employerName: Joi.string(),
    employerAddress1: Joi.string(),
    employerAddressCity: Joi.string(),
    salaryDay: Joi.string(),
    yearEmployed: Joi.number(),
    monthEmployed: Joi.number(),
    occupation: Joi.string(),
    salaryFrequency: Joi.string(),
    employmentNumber: Joi.string(),
    employerAddressPostalCode: Joi.string(),
    employerContactNumber: Joi.string(),
    affordability: Joi.array(),
    homeCity: Joi.string(),
    homeSuburb: Joi.string(),
    homeProvince: Joi.string().required(),
    homePostalCode: Joi.string(),
    bankName: Joi.string(),
    bankAccountNumber: Joi.string(),
    bankBranch: Joi.string(),
    bankAccHolderName: Joi.string(),
    bankAccountType: Joi.string(),
    verifiableIncome: Joi.boolean(),
    updated: Joi.date(),
    created: Joi.date(),
    active: Joi.boolean(),
    role: Joi.string().valid(Role.Admin, Role.User, Role.Customer).required(),
    creditScore: Joi.string(),
    applicationStatus: Joi.string().allow(null, ''),
    uploadedDocs: uploadedDocsSchema,
    EmploymentVerificationStatus: Joi.string().allow(null, ''),
    CreditReportStatus: Joi.string().allow(null, ''),
    AffordabilityVerificationStatus: Joi.string().allow(null, ''),
    baningStatus: Joi.string().allow(null, ''),
    promoCode: Joi.string().allow(null, ''),
    contractType: Joi.string()
  });
  // only admins can update role
  //Now updates coming from web form, do we still need this??
  // if (req.user.role === Role.Admin) {
  //     schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty(''); Assessment
  // }

  //const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
  validateRequest(req, next, schemaRules);
}

function update(req, res, next) {
  // users can update their own account and admins can update any account
  //let first comment this as we are not yer logged in
  // if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }
  const cb = (xyz) => {
    res.send(xyz);
  }
  customerService.update(req.params.id, req.body, cb);
  // .then(customer => res.status(200).json(customer))
  // .catch(next);
}

function _delete(req, res, next) {
  // users can delete their own account and admins can delete any account
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  customerService.delete(req.params.id)
    .then(() => res.json({ message: 'Customer deleted successfully' }))
    .catch(next);
}

function createHistory(req, res, next) {
  customerService.createHistory(req.body)
    .then(customerHistory => res.send(customerHistory))
    .catch(next);
}

function insertSignature(req, res, next) {
  //console.log(req);
  const cb = (xyz) => {
    res.send(xyz);
  }
  customerService.insertSignature(req.body, cb);

  // .then(customerSignature => res.send(customerSignature))
  // .catch(next);
}
function appStatus(req, res, next) {
  const cb = (xyz) => {
    res.send(xyz);
  }
  customerService.appStatus(req.params.id, req.body, cb)
  // .then(appStatus => res.status(200).send(appStatus))
  // .catch(next);
}
// helper functions
function setTokenCookie(res, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };
  res.cookie('refreshToken', token, cookieOptions);
}
function getSigedContract(req, res, next) {
  customerService.getApplicantSigedContract(req.params.id)
    .then(customers => res.json(customers))
    .catch(next);
}

module.exports = router;
