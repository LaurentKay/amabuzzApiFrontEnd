const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {validateRequest} = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
//const accountService = require('../accounts/account.service');
const customerService = require('./customers.service');
const fs = require('fs');

const updateAssessment = (req, res, next) => {
    // if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    customerService.updateAssessment(req.params.customerId, req.body)
      .then(customer => res.json(customer))
      .catch(next);
}
// routes
router.post('/login', authenticateSchema, authenticate);
router.post('/register', createCustomerSchema, createCustomer);
//router.get('/:id', authorize(), getById);
router.post('/uploads', uploads);
router.post('/',  createSchema, create); //authorize(),
router.put('/:id',  updateSchema, update); //authorize(),
router.put('/affordability/:customerId', updateAssemssmentSchema, updateAssessment); //authorize(),

//router.post('/insertHistory',  createHistory); //
router.post('/insertSignature', insertSignature);
//router.get('/contract/:id', getSigedContract)

function updateUploadSchema(req, res, next){
    const documentsSchema = Joi.object.keys({
        name:Joi.string(),
        surname:Joi.string(),
        idNumber:Joi.string(),
        idDocument:Joi.string(),
        dateUploaded:Joi.date(),
        bankStatement:Joi.string().allow(null, ''),
        paySlip:Joi.string().allow(null, '')
    });
    const schema = Joi.object().keys({
        uploadedDocs:documentsSchema
    });
   // const v = schema.validate(req.body)

    validateRequest(req, next, schema)
}
function updateAssemssmentSchema (req, res, next) {

  const affordabilityCalculationSchema = Joi.object().keys({
    affordabilityWeight: Joi.number(),
    dateTimeCriteriaApproved:  Joi.date().allow(null, ''),
    humanAffordAbilityApprover: Joi.string().allow(null, ''),
    totalIncomeGreaterThanExpenses: Joi.boolean(),
    monthlyIncome: Joi.number(),
    monthlyExpense: Joi.number(),
    affordabilityApproval: Joi.string().allow(null, '')
  });

  const affordSchema = Joi.object().keys({
    customerId:Joi.string(),
    monthlyFixedsalary: Joi.number(),
    monthlyOvertime: Joi.number(),
    monthlyOtherIncome: Joi.number(),
    incomerental: Joi.number(),
    familyContribution: Joi.number(),
    spouseJointIncome: Joi.number(),
    monthlyGrossIncome: Joi.number(),
    totalDeductions: Joi.number(),
    monthlyNettIncome: Joi.number(),
    expenseAccomodation: Joi.number(),
    expenseTransport: Joi.number(),
    expenseFood: Joi.number(),
    expsenseEducation: Joi.number(),
    expenseMedical: Joi.number(),
    expenseUtilities: Joi.number(),
    expenseMaintenance: Joi.number(),
    totalMonthlyExpense: Joi.number(),
    loan1: Joi.number(),
    loand2: Joi.number(),
    loans3: Joi.number(),
    loans4: Joi.number(),
    loanTerms: Joi.number(),
    installMent: Joi.number(),
    bankStatementMonthlyExpenses: Joi.number(),
    incomeMinusExpensesTotal: Joi.number(),
    expenseRent: Joi.number(),
    incomemonthlyFixedSalary: Joi.number(),
    incomemonthlyOtherIncome: Joi.number(),
    incomemonthlyOvertime: Joi.number(),
    expenseAccomodation: Joi.number(),
    expenseEducation: Joi.number(),
    expenseFood: Joi.number(),
    expenseMaintenance: Joi.number(),
    expenseMedical: Joi.number(),
    expenseRent: Joi.number(),
    expenseTransport: Joi.number(),
    expenseUtilities: Joi.number(),
    incomemonthlyFixedsalary: Joi.number(),
    incomemonthlyOtherIncome: Joi.number(),
    incomemonthlyOvertime: Joi.number(),
    incomerental: Joi.number(),
    installMent: Joi.number(),
    loan1: Joi.number(),
    loanTerms: Joi.number(),
    affordabilityCalculation: affordabilityCalculationSchema
  })
  console.log(req.body);
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

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    RSAIDNumber: Joi.string().required(),
    customerPassword: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  const { RSAIDNumber, customerPassword } = req.body;
  const ipAddress = req.ip;
  customerService.authenticate({ RSAIDNumber, customerPassword, ipAddress })
    .then(({ account, jwtToken,custRet }) => {
      //setTokenCookie(res, refreshToken);
      console.log('=>: ', account);
      res.json({account, custRet});
    })
    .catch(next);
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
  dateSigned:  Joi.date().allow(null, ''),
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
function getDocuments(req, res, next){
    customerService.getAllCustomerDocs()
        .then(customers=> res.send(customers))
    //res.send([{firstName:'John', lastName:'Doe', idNumber:'1234567890123',bankStatement:'Thistest.pdf', paySlips:'thispayslips.pdf' }])
}
function uploads(req, res, next){
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file __dirname +
    console.log(req.body);
    const uploadPath = 'C:/myprojects/amabuzz/public/uploads/';
    const attach1 = req.files.attach1;
    attach1.mv(uploadPath + attach1.name);
    //const paySlips = req.files.paySlip
    const fePath = "./uploads/";

      // Use the mv() method to place the file somewhere on your server


    //type_date_idnumber bank_20210101_8798765131452_1
    var todayDate = replaceAll(new Date().toLocaleDateString('en-ZA'),"/", ""); //new Date().toISOString().slice(0, 10);
    let saveStatPath = '';
    let paySlipPath = '';
    var bexten = attach1.name.split(".")[1];
    let DocumentDet = {};
    if(req.body.documentType === "bankStatement"){
        saveStatPath = 'bank_' + todayDate + "_" + req.body.idNumber + "_1."+bexten;
        DocumentDet.bankStatement = fePath + saveStatPath;
    }else if(req.body.documentType === "payslip"){
        saveStatPath = 'pay_' + todayDate + "_" + req.body.idNumber + "_2."+bexten;
        DocumentDet.paySlip =fePath + saveStatPath;
    }else if(req.body.documentType === 'identityDocument'){
        saveStatPath = 'id_' + todayDate + "_" + req.body.idNumber + "_3."+bexten;
        DocumentDet.idDocument = fePath + saveStatPath;
    }
    fs.rename(uploadPath + attach1.name, uploadPath + saveStatPath, function(err){
        if(err) {console.log(err);}else{
        console.log('The file has been renamed ' + saveStatPath);}
    });
    // if(paySlips){
    //     paySlips.mv(uploadPath + paySlips.name);
    //     paySlipPath = 'pay_' + todayDate + "_" + req.body.idNumber + "_2."+pextn;
    //     var pextn = paySlips.name.split(".")[1];
    //     fs.rename(uploadPath + paySlips.name, uploadPath + paySlipPath, function(err){
    //         if(err) {console.log(err)}
    //         console.log('The payslips has been renamed ' + paySlipPath);
    //     });
    // }
    let uploadedDocs ={};
    uploadedDocs = Object.assign({name: req.body.name, surname:req.body.surname,
                    idNumber:req.body.idNumber, bankStatement:req.body.bankStatement, paySlip:req.body.paySlip,
                    idDocument:req.body.idDocument,dateUploaded:new Date().toLocaleDateString('en-ZA')}, DocumentDet);
    // let uploadedDocs = {
    //     name:req.body.name,
    //     surname:req.body.surname,
    //     idNumber:req.body.idNumber,
    //     dateUploaded:new Date().toLocaleDateString('en-ZA')
    // };
    // uploadedDocs = Object.assign(uploadedDocs, DocumentDet);
    console.log(uploadedDocs);
    // documentType: req.body.documentType,
    // bankStatment:req.body.documentType === "bankStatement" ?  fePath+saveStatPath : '',
    // paySlip: req.body.documentType === "payslip" ? fePath+saveStatPath : '',
    // idDocument: req.body.documentType === "identityDocument" ? fePath + saveStatPath : ''

    customerService.updateCustDoc(req.params.id, uploadedDocs)
        .then(customer => res.json(customer))
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

function calculateAffordability(req, res, next)
{
  customerService.calculateAffordability(req.params.id)
  .then(customer => customer ? res.json(customer) : res.sendStatus(404))
  .catch(next);
}

function createCustomerSchema(req, res, next){
  const schema = Joi.object({
    _id: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    RSAIDNumber: Joi.string().required(),
    customerPassword:Joi.string(),
    mobileNumber: Joi.string().required(),
    emailAddress: Joi.string(),
  });

  validateRequest(req, next, schema);
}

function createCustomer(req, res, next) {
  customerService.createCustomer(req.body)
    .then(customer => res.json(customer))
    .catch(next);
}

function createSchema(req, res, next) {
    const uploadedDocsSchema = Joi.object().keys({
      name:Joi.string(),
      surname:Joi.string(),
      idNumber:Joi.string(),
      dateUploaded:Joi.date(),
      bankStatement:Joi.string().allow(null, ''),
      paySlip:Joi.string().allow(null, ''),
      idDocument:Joi.string().allow(null, '')
    });
    const schema = Joi.object({
        _id: Joi.string(),
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
        employerName:Joi.string(),
        employerAddress1: Joi.string(),
        employerAddressCity: Joi.string(),
        salaryDay: Joi.string(),
        yearEmployed: Joi.number(),
        salaryFrequency: Joi.string(),
        employmentNumber: Joi.string(),
        employerAddressPostalCode: Joi.string(),
        employerContactNumber: Joi.string(),

        affordability: Joi.array(),
        homeSuburb: Joi.string(),
        homeProvince:Joi.string().required(),
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
        creditScore:Joi.string(),
        applicationStatus:Joi.string().allow(null, ''),
        uploadedDocs:uploadedDocsSchema
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
    req.body. workNumber = req.body. workNumber ? req.body. workNumber : 'Incomplete';
    req.body.employerAddressCity = req.body.employerAddressCity ? req.body.employerAddressCity : 'Incomplete';
    req.body.employerAddressPostalCode = req.body.employerAddressPostalCode ? req.body.employerAddressPostalCode : 'Incomplete';
    req.body.employerContactNumber = req.body.employerContactNumber ? req.body.employerContactNumber : 'Incomplete';
    req.body.salaryDay = req.body.salaryDay ? req.body.salaryDay : 'Incomplete';
    req.body.yearEmployed = req.body.yearEmployed ? req.body.yearEmployed : 0;
    req.body.salaryFrequency = req.body.salaryFrequency ? req.body.salaryFrequency : 'Incomplete';
    req.body.employmentNumber = req.body.employmentNumber ? req.body.employmentNumber : 'Incomplete';
    req.body.applicationStatus = req.body.applicationStatus ? req.body.applicationStatus : '';
    //End case
    validateRequest(req, next, schema);
}

function create(req, res, next) {
  customerService.create(req.body)
    .then(customer => res.json(customer))
    .catch(next);
}

function updateSchema(req, res, next) {

    const uploadedDocsSchema = Joi.object().keys({
      name:Joi.string(),
      surname:Joi.string(),
      idNumber:Joi.string(),
      dateUploaded:Joi.date(),
      bankStatement:Joi.string().allow(null, ''),
      paySlip:Joi.string().allow(null, ''),
      idDocument:Joi.string().allow(null, '')
    });
    const schemaRules = Joi.object().keys({
        id: Joi.string(),
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
        employerName:Joi.string(),
        employerAddress1: Joi.string(),
        employerAddressCity: Joi.string(),
        salaryDay: Joi.string(),
        yearEmployed: Joi.number(),
        salaryFrequency: Joi.string(),
        employmentNumber: Joi.string(),
        employerAddressPostalCode: Joi.string(),
        employerContactNumber: Joi.string(),
        affordability: Joi.array(),
        homeCity: Joi.string(),
        homeSuburb: Joi.string(),
        homeProvince:Joi.string().required(),
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
        creditScore:Joi.string(),
        applicationStatus:Joi.string().allow(null, ''),
        uploadedDocs:uploadedDocsSchema
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

  customerService.update(req.params.id, req.body)
    .then(customer => res.json(customer))
    .catch(next);
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

function createHistory(req, res, next){
  customerService.createHistory(req.body)
      .then(customerHistory =>res.send(customerHistory))
      .catch(next);
}

function insertSignature(req, res, next)
{
  console.log(req);
  customerService.insertSignature(req.body)
    .then(customerSignature => res.send(customerSignature))
    .catch(next);
}

// helper functions
function setTokenCookie(res, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7*24*60*60*1000)
  };
  res.cookie('refreshToken', token, cookieOptions);
}
function getSigedContract(req, res, next) {
  customerService.getApplicantSigedContract(req.params.id)
  .then(customers => res.json(customers))
  .catch(next);
}

module.exports = router;
