const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const xml2js = require('xml2js');
const axios = require('axios');
const Role = require('_helpers/role');
const intecon = require('./../acol/intecon/intecon')
const promissoryService = require('./promissory.service');
const debtoService = require('../debtors/debtors.service');

const parser = new xml2js.Parser({explicitArray: false, trim: true, stripPrefix:true});
// routes
router.get('/', getAllPromissories);
router.get('/intecon-prom', fetchAllInteconPromissories);
router.get('/intecon-next-reply', getNextReply);
router.get('/getAllNextReplies/:id', getAllNextReplies);
router.get('/intecon-next-reply-type', getNextReplyType);
router.post('/intecon-suspend-prom', suspendPromissory);
router.post('/intecon-activate-prom', activatePromissory);
module.exports = router;
//lastResponseCodes
function createSchema(req, res, next) {
    const promissorySchema = Joi.array().items({
        _id: Joi.string(),
        customerID: Joi.string().trim().required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        RSAIDnumber: Joi.string().trim().required(),
        promissoryId: Joi.string().trim().required(),
        nextInstalmentDate: Joi.date().required(),
        instalmentAmount: Joi.number(),
        remainingInstalments: Joi.number(),
        bankName: Joi.string().trim().required(),
        accountNumber: Joi.string().trim().required(),
        dateOfLastInstalment: Joi.date(),
        lastResponseCodes: Joi.array()
    });

    const lastResponseCodesSchema = Joi.array().items(Joi.object().keys({
    lastResponseCode: Joi.string(),
    responseDate: Joi.date()
    }));

    const finalSchema = Joi.object().keys({
    promissory: promissorySchema,
    lastResponseCodes: lastResponseCodesSchema
    });

    validateRequest(req, next, finalSchema)
}
async function sendCaliDadPromissory(aAppProm){
  const URL = 'https://bolshoi.runaloan.com/ambapi/promissory';
  const CONFIG = {
    "Content-Type" : "application/json",
    "Tenant": "AMB",
    "Authorisation": "AMBQ9YTOeD3456Nhjr",
    "Accept": "application/json"
  };
  return await axios.post(URL, aAppProm, {headers:CONFIG});
}
async function fetchAllInteconPromissories(req, res, next) {
    console.info('get aall promissories');
      const clientData = await intecon.getAllPromissory();
    
      if (clientData) {
        parser.parseString(clientData, (err, it) => {
          if (err) {
            console.log(err);
          }
          const d = it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
          parser.parseString(d, (errw, promissoryData) => {
            if (err) {
              console.log(errw);
            }
            let { client_no, reply_cd, } = promissoryData.responses.GetPromissory;
            let { GetPromissory } = promissoryData.responses;
            // add change feed to updat other tables and such
            // all journeys start with the application
            console.log('Prom Anything in::::: ', GetPromissory);
            if (reply_cd !== 'M9999' && reply_cd !== '3023') {

                //Check if record exist
                promissoryService.getPromissory(GetPromissory.promissory_id).
                then(exists => {
                    console.log('Prom Exists::::: ', exists);
                    if(exists){
                        //update debtor,
                        promissoryService.updatePromissory(GetPromissory);
                        debtoService.getDebtorByLoanRef(GetPromissory.loan_ref_no)
                        .then(debtor =>{
                          const {loan_ref_no, application_id, client_id, RSAIDNumber} = debtor._doc;
                          console.log('debtor::: ',  loan_ref_no, application_id, client_id, GetPromissory.promissory_id); 
                          //return;
                          if(!loan_ref_no && !application_id && !client_id){
                            console.log(`Promissory: ${GetPromissory.promissory_id}, Loan_ref_no: ${GetPromissory.loan_ref_no} already sent`);
                          }else{
                            const aAppProm ={
                              client_id: client_id,
                              application_id: application_id,
                              promissory_id: GetPromissory.promissory_id
                            };
                            sendCaliDadPromissory(aAppProm)
                            .then(calidadProm =>{
                              console.log('Promissory Sent:::: ', calidadProm);
                              debtoService.updateDebtorPromissorySent(RSAIDNumber);
                            }).
                            catch(error => console.log('Sending PromErr:::: ', error));
                          }
                        })
                    }else{
                        //Insert
                        promissoryService.create(GetPromissory); //filter the debtors collection by loan ref no
                        debtoService.getDebtorByLoanRef(GetPromissory.loan_ref_no)
                        .then(debtor =>{
                          const {loan_ref_no, application_id, client_id, RSAIDNumber} = debtor._doc;
                          if(!loan_ref_no && !application_id && !client_id){
                            console.log(`No debtor found for promissory: ${GetPromissory.promissoryId}, Loan_ref_no: ${GetPromissory.loan_ref_no} Or already sent`);
                          }else{
                            const aAppProm ={
                              client_id: client_id,
                              application_id: application_id,
                              promissory_id: GetPromissory.promissory_id
                            };
                            sendCaliDadPromissory(aAppProm)
                            .then(calidadProm =>{
                              console.log('Promossory Sent:::::=> ', calidadProm);
                              debtoService.updateDebtorPromissorySent(RSAIDNumber)
                            }).catch(error => console.log('Sending PromErr::::=> ', error));
                          }
                        })
                    }
                });
                
                fetchAllInteconPromissories(req, res);
            } else {
              res.send(GetPromissory)
            }
          })
    
        });
      } else{
        console.log('NO prom found :::::: ', clientData);
      }
}
async function getNextReplyType(req, res, next){
    let type = req.params.type || '';
    const clientData = await intecon.getNextReply(null, 20, '001');
    console.log('::::: getting client data :::::')
      if (clientData) {
        parser.parseString(clientData, (errq, it) => {
          if (errq) {
            console.log(errq);
          }
          const d = it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
          parser.parseString(d, (errw, nextReplyData) => {
            if (errw) {
              console.log(errw);
            }
     
            let nArray = nextReplyData.responses.GetNextReply.length;
            if (nextReplyData.responses.GetNextReply.reply_cd === '3025') {
              res.send({...nextReplyData.responses.GetNextReply,message:'all data fetched'})
            } else {
            //   const nextReplyHandler =  (esd, dsd) => {
            //     if (esd) throw esd
            //     getNextReply(req, res, next)
            //   }
              for ( let i = 0; i < nArray; i++ ) {
                let GetNextReply  = nextReplyData.responses.GetNextReply[i]
                // add change feed to updat other tables and such
                if (GetNextReply.reply_cd !== 'M9999' && GetNextReply.reply_cd !== '3025') {
           
                  if (type === '001') {
                      promissoryService.insertAccount(GetNextReply);
                      getNextReply(req, res, next);
                  }
           
                } 
                if (GetNextReply.reply_cd === '3025') {
                  res.send(GetNextReply)
                }
              }
            }
          })
    
        });
      }
}
async function getNextReply(req, res, next){
  console.log('::::: getting client data :::::')

  let type = parseInt(req.params.type,10) || '';
  const clientData = await intecon.getNextReply(null, 20, type);
  if (clientData) {
    parser.parseString(clientData, (errq, it) => {
      if (errq) {
        console.log(errq);
      }
      const d = it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
      parser.parseString(d, (errw, nextReplyData) => {
        if (errw) {
          console.log(errw);
          return res.send({process:'ended',errw});
        }
      
        let nArray = nextReplyData.responses?.GetNextReply.length || 0;
        if (nextReplyData?.responses?.GetNextReply.reply_cd === '3025') {
          res.send({...nextReplyData.responses.GetNextReply,message:'all data fetched'})
        } else {
          if (nArray === 0) {
            return res.send({process:'endeds',nextReplyData})
          }
        //   const nextReplyHandler =  (esd, dsd) => {
        //     if (esd) throw esd
        //     getNextReply(req, res, next)
        //   }
          for ( let i = 0; i < nArray; i++ ) {
            let GetNextReply  = nextReplyData.responses.GetNextReply[i]
            // add change feed to updat other tables and such
            if (GetNextReply.reply_cd !== 'M9999' && GetNextReply.reply_cd !== '3025') {
              promissoryService.insertResponse(GetNextReply);
              getNextReply(req, res, next);
              //r.db('VasProducts').table('ResponseData').insert(GetNextReply).run(req._rdb, nextReplyHandler);// Create model for response data
            }
            if (GetNextReply.reply_cd === '3025') {
              res.send(GetNextReply)
            }
          }
          
        }
      });

    });
  }
}

async function suspendPromissory(req, res, next) {
  
  const clientData = await intecon.suspendPromissory({promissory_id:req.body.promissoryId});
  if (clientData) {
    parser.parseString(clientData, (err, it) => {
      if (err) {
        console.log(err);
      }
      const d = it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
      parser.parseString(d, (errw, promData) => {
        console.log('::::final suspend promissory::::')
        res.send({promData, message:'Promissory suspended', type:'success'})
      })
    })
  }
}
async function activatePromissory(req, res, next){
  const clientData = await intecon.activatePromissory({promissory_id:req.body.promissoryId});
  console.log(clientData,'::::entry:::',req.body.promissoryId)
  if (clientData) {
    parser.parseString(clientData, (err, it) => {
      if (err) {
        console.log(err);
      }
      const d = it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
      parser.parseString(d, (errw, promData) => {
        console.log('::::final activat promissory::::')
        res.send(promData)
      })
    })
  }
}

function create(req, res, next) {
    promissoryService.create(req.body)
        .then(promissories => res.json(promissories))
        .catch(next);
}

function getAllPromissories(req, res, next) {
    //console.log('THis one');
    promissoryService.getAllPromissories()
       .then(promissories => res.json(promissories))
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

function getAllNextReplies(req, res, next){
  promissoryService.getResponseData()
    .then(allReplies => res.status(200).send(allReplies))
    .catch(next);
}