const Hashids = require('hashids')
const hashids = new Hashids()



function generateHashIDs(hashIt)
{
    
	var ids = new Hashids(hashIt);

    var id = ids.encode(1, 2, 3, 4);
    
    var hashed = ids.decode(id);
    //console.log('ANy ID????:::: ', id);
    
    return id;
}

/*
import Hashids from "https://cdn.skypack.dev/hashids@2.2.8";
var ids = new Hashids("610a96cd72cf2a5fe88c2f98");

var id = ids.encode(1, 2, 3, 4);
var numbers = ids.decode(id);

console.log('id: ', id);
console.log('numbers: ', numbers);
*/

const bankNames = [{
    name: "C0E405A4-DF1F-4EFB-A07D-016C59194BFA",
    value: 'Nedbank',
  },
  {
    name: "E747A210-F00A-4E27-975E-2CF6EFDEB68D",
    value: 'Capitec Bank',
  },
  {
    name: "18B75560-681A-48F0-8895-5A0261AF24B8",
    value: 'FNB Namibia',
  },
  {
    name: "BAB094657-DE17-43FA-812A-8030F9A4895F",
    value: 'Bank of Baroda',
  },
  {
    name: "64102B65-D1F7-438A-8D3E-AAB6AC376F57",
    value: 'Bank Windhoek',
  },
  {
    name: "F479BA15C-A85C-44CC-93A8-EB9F76FD6AF8",
    value: 'FNB Botswana',
  },
  {
    name: "F08AFE75-39C1-4590-9389-CBCEC8339CEE",
    value: 'ABSA',
  },
  {
    name: "B57737C5D-5114-48FF-857A-E51D40079429",
    value: 'Bank of Athens',
  },
  {
    name: "168D23D9-CB7A-47FB-8308-EF85DB4C20DD",
    value: 'Standard Bank', // South Africa
  },
  {
    name: "0CF9A57A-37BD-4943-94C7-FC7D3955AC1A",
    value: 'FNB', // South Africa
  },
  {
    name: "0CF9A57A-37BD-4943-94C7-FC7D3955AC1A",
    value: 'FNB',
  }
];

function getBankName(aUuid) {
  var bank = bankNames.filter((x) => x.name === aUuid);

  if (bank.length > 0) return bank[0].value;
  return bank.value;
}

module.exports = {getBankName, generateHashIDs} ;