const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {validateRequest} = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const truIDService = require('./truID.service');
const io = require("socket.io")
// routes
router.post('/hook-api/:colllectionId', emitStatusFromService)
router.get('/consultant-api/companies',  getCompanies);
router.get('/consultant-api/data-services',  getDataServices);
router.get('/consultant-api/data-providers',  getDataProviders);
router.post('/consultant-api/90DayTransactions',  get90DayTransactions);
router.get('/consultant-api/downloadTransactions/:collectionID/productCollectionID/:productCollectionID', downloadTransactions);
router.get('/consultant-api/insertTransactions',  insertTransactions);
router.get('/consultant-api/categorisations/:collectionID',  getCategorisations);
router.get('/consultant-api/uploads/', uploadPDF);
router.get('/consultant-api/downloadPDFbankStatement/:collectionID/productCollectionID/:productCollectionID', downloadPDF);
router.get('/consultant-api/downloadAllProducts/:collectionID', downloadAllProductsbyCollectionID);
router.get('/consultant-api/getTransactionsByCustomerRSAIdNumber/:customerIDnumber', getTransactionsByCustomerRSAIdNumber);
//Schemas



//End of Schemas
function emitStatusFromService(req, res, next) {
  io.emit('whatever',req.body);
  res.send('emitting-farts')
}

function getCompanies(req, res, next) {
    
    truIDService.getCompanies()
        .then(truID => res.json(truID))
        .catch(next);
}

function getDataServices(req, res, next) {
    
    truIDService.getDataServices()
        .then(truID => res.json(truID))
        .catch(next);
}


function getDataProviders(req, res, next) {
    
  truIDService.getDataProviders()
      .then(truID => res.json(truID))
      .catch(next);
}

function get90DayTransactions(req, res, next)
{
  
  truIDService.get90DayTransactions(req.body)
      .then(truID => res.json(truID))
      .catch(next);
}


function downloadTransactions(req, res, next)
{
  
  truIDService.downloadTransactions(req.params)
      .then(truID => res.json(truID))
      .catch(next);

}


function insertTransactions(req, res, next)
{
  var data = req.body;

  truIDService.insertTransactions(data)
    .then(truID => res.json(truID))
    .catch(next);    
}

function getCategorisations(req, res, next)
{
  console.log(req.params)
  truIDService.getCategorisations(req.params)
      .then(truID => res.json(truID))
      .catch(next);
}

function uploadPDF(req, res, next)
{
  console.log(req.body);
  truIDService.uploadPDF(req.params)
      .then(truID => res.json(truID))
      .catch(next);
}

function downloadPDF(req, res, next)
{
  console.log(req.body);
  truIDService.downloadPDF(req.params)
      .then(truID => res.json(truID))
      .catch(next);
}

function downloadAllProductsbyCollectionID(req, res, next)
{
  console.log(req.body);
    truIDService.downloadAllProductsbyCollectionID(req.params)
      .then(truID => res.json(truID))
      .catch(next);
}

async function getTransactionsByCustomerRSAIdNumber(req, res, next) 
{ 
  let trans = await truIDService.getTransactionsByCustomerRSAIdNumber(req.params.customerIDnumber)
  res.send(trans); 
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
  
  module.exports = router;
  