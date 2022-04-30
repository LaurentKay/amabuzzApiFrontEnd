const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
var axios = require('axios');
const mongodb = require('mongodb')

module.exports = {
    getCompanies,
    getDataServices,
    getDataProviders,
    get90DayTransactions,
    downloadTransactions,
    insertTransactions,
    getCategorisations,
    uploadPDF,
    downloadAllProductsbyCollectionID,
    getTransactionsByCustomerRSAIdNumber
};

let dbTruId;
let connectionString = config.connectionString

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, truID) {
    dbTruId = truID.db()
    
  }
)

async function getCompanies() 
{
        var config = {
        method: 'get',
        url: 'https://api.truidconnect.com/consultant-api/companies',
        headers: {
            'Accept': 'application/json', 
            'X-API-KEY': '0360c7f508194384a2845e3f793351e5'
            }
        };

        const resultData  = await axios(config)
        console.log(resultData.data)
        return resultData.data;
        
}


async function getDataServices() 
{
    var config = {
        method: 'get',
        url: 'https://api.truidconnect.com/consultant-api/companies/95smo6sl8bqiw9wl4l4p3fenl/brands/458vvj0stkcwdlfe3yhor3lac/data-services',
        headers: { 
          'Accept': 'application/json', 
          'X-API-KEY': '0360c7f508194384a2845e3f793351e5'
        }
      };
      
      const resultData  = await axios(config)
      //console.log(resultData.data)
      return resultData.data;
        
}


async function getDataProviders()
{
  var config = {
    method: 'get',
    url: 'https://api.truidconnect.com/consultant-api/data-providers',
    headers: { 
      'Accept': 'application/json', 
      'X-API-KEY': '0360c7f508194384a2845e3f793351e5'
    }
  };  
}

async function get90DayTransactions(customerData)
  {

  var config = {
    method: 'post',
    url: 'https://api.truidconnect.com/consultant-api/collections',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'X-API-KEY': '0360c7f508194384a2845e3f793351e5' //'9e98edfc9cf048b6b0bfaa91c1c2d7d9'
    },
    data : customerData
    };

    const resultData  = await axios(config)
    console.log('Any Data Returned???? ===> ',resultData.data);
    let collectionID = resultData.headers.location.replace('https://www.truidconnect.com/','');
    linkApplicantToCustomerIDNumber(customerData, collectionID);
    insertTransactions(resultData.data);
    return resultData.headers.location;
};

function linkApplicantToCustomerIDNumber(data, collectionID)
{
    //collectionID = '8wdz1k6248qcy0o126phuft06';
    //let downloadURL = '';
    //console.log(JSON.stringify(data.idNumber))

    /*
    var config = {
      method: 'get',
      url: 'https://api.truidconnect.com/delivery-api/collections/'+collectionID+'/products',
      headers: { 
        'Accept': 'application/json', 
        'X-API-KEY': '9e98edfc9cf048b6b0bfaa91c1c2d7d9'
      }
    };
    
    axios(config)
    .then(function (response) {
      downloadURL = JSON.stringify(response.data[0].url);
    })
    .catch(function (error) {
      console.log(error);
    });
  */

  //console.log("insertCollection" + JSON.stringify(data) +" " + collectionID);
    applicationCollection = {
        "idNumber": JSON.stringify(data.idNumber),
        "collectionID": collectionID
    }


  dbTruId.collection('applicantTruIdCollections').insertOne(applicationCollection, function (
    err,
    info
  ) {
    applicationCollection    
  })

}

async function downloadTransactions(params)
  {
    //url: 'https://api.truidconnect.com/delivery-api/collections/a5b0umy7wb5lk5le3c7qwgu9k/products/cqnczbkwnyurvza7cjjrl1v2w',
    var config = {
      method: 'get',
      //url: 'https://api.truidconnect.com/delivery-api/collections/'+params.collectionID+'/products/'+params.productCollectionID+'',
      url: 'https://api.truidconnect.com/delivery-api/collections/75gnwp9edqykpblp6ltov1x86/products/cqnczbkwnyurvza7cjjrl1v2w',
      headers: { 
        'Accept': 'application/json', 
        'X-API-KEY': '0360c7f508194384a2845e3f793351e5'
      }
    };
    
    const resultData  = await axios(config)
        //console.log(resultData.data)
        return resultData.data;
};

async function insertTransactions(params) {
  console.log('>>>>>>>>insertTransactions Before Insert<<<<<<<<');
  dbTruId.collection('truidcollections').insertOne(params, function (
    err,
    info
  ) {
    params
    
  })
}

async function getCategorisations(params)
{
  
      var config = {
        method: 'get',
        url: 'https://api.truidconnect.com/categorisation-api/categorisations/'+params.collectionID+'',
        headers: { 
          'Accept': 'application/json', 
          'X-API-KEY': '0360c7f508194384a2845e3f793351e5'
        }
      };
      
      const resultData  = await axios(config)
          console.log(resultData.data)
          return resultData.data;
};

async function uploadPDF(params)
{
  
  var axios = require('axios');
  var FormData = require('form-data');
  var fs = require('fs');
  var data = new FormData();
  data.append('files', fs.createReadStream('/truidUploads/Statement9540.pdf'));
  //data.append('files', fs.createReadStream('/Users/centipod/Downloads/Bank statements/2.pdf'));
  //data.append('files', fs.createReadStream('/Users/centipod/Downloads/Bank statements/3.pdf'));
  data.append('name', 'Enver Customer', {contentType: 'multipart/form-data'});
  data.append('idNumber', '8901015000111', {contentType: 'multipart/form-data'});
  data.append('idType', 'id', {contentType: 'multipart/form-data'});
  data.append('nationality', 'za', {contentType: 'multipart/form-data'});
  data.append('brandId', '458vvj0stkcwdlfe3yhor3lac', {contentType: 'multipart/form-data'});
  data.append('webhookUrl', '', {contentType: 'multipart/form-data'});
  
  var config = {
    method: 'post',
    url: 'https://api.truidconnect.com/extracter-api/uploads',
    headers: { 
      'Accept': 'application/json', 
      'X-API-KEY': '0360c7f508194384a2845e3f793351e5', 
      ...data.getHeaders()
    },
    data : data
  };
     
  const resultData  = await axios(config)
  console.log(resultData.data)
  return resultData.data;
};

async function downloadPDF(params)
{
  var config = {
    method: 'get',
    url: 'https://api.truidconnect.com/delivery-api/collections/'+params.collectionID+'/products/' + params.productID +'',
    headers: { 
      'Accept': 'application/json', 
      'X-API-KEY': '0360c7f508194384a2845e3f793351e5'
    }
  };

  const resultData  = await axios(config)
  console.log(resultData.data)
  return resultData.data;
};

async function downloadAllProductsbyCollectionID(params)
{
  
  var config = {
    method: 'get',
    url: 'https://api.truidconnect.com/delivery-api/collections/'+params.collectionID+'/products/all',
    headers: { 
      'X-API-KEY': '0360c7f508194384a2845e3f793351e5'
    }
  };

  const resultData  = await axios(config)
  
  
  return resultData.data;
};


async function getTransactionsByCustomerRSAIdNumber(rsaIDNumber) {  
  
  return await dbTruId.collection("truidcollections").findOne({"idNumber":rsaIDNumber})
}