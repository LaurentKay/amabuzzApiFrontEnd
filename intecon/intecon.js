const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray: false, trim: true, stripPrefix:true});

const inteconRequest = require('intecon-soap');
const NodeCache = require('node-cache');
const ttl = 60 * 60 * 1; // cache for 1 Hour

const myCache = new NodeCache(ttl);
// const openAsi = {
//     uid:"intellicellWS",
//     pwd:"Sys007abc*#",
//     machine:"IntellicellCCS",
//     user_if:"allps-ws",
//     integrator:"IntelliCell",
//     product:"IntelliCell",
//     version:"1.0.0.1"
// }
let guid = myCache.get('guid') === '' ? this.openAsi() : myCache.get('guid');

 //const url = 'https://web2.intecon.co.za/allpsws_test/allps.asmx?wsdl';
 const url = 'https://web3.intecon.co.za/allpsws/allps.asmx';
//const url = 'https://iserv.intecon.co.za/allpsws/allps.asmx';
//const url = 'https://web2.intecon.co.za/allpsws/allps.asmx';
//const url =  'https://web1.intecon.co.za/allpsws_test/allps.asmx';
const headers  = {
  'Content-Type':'text/xml; charset=utf-8',
  SOAPAction:'http://intecon.co.za/webservices/allps/Call'
};
const getOrgCode = function () {
  // 'Testing
  // 'getOrgCode = "0178"envorgcode === 'testing' ? "0178" :
  //return '0178';
  // 'Live
  // getOrgCode = "0177"
  return '0177';
};
const getAccountTypeCode = (Account_Type) => {
  switch (Account_Type) {
  case 'Savings':
    return '0';
  case 'Current':
    return '1';
  case 'Cheque':
    return '1';
  }
};
const retDataObject = (xmlMethod) => {
  return `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><Call xmlns="http://intecon.co.za/webservices/allps/"><xmlrequest><![CDATA[ ${xmlMethod} ]]></xmlrequest></Call></soap:Body></soap:Envelope>`;
};
const getBranchCode =function () {
  //'Testingenvbranchcode === 'testing' ? "9045" :
  //return '9045';
  //Live
  return '6485';
};
/**
 * Version 1.3.12b CONFIDENTIAL Page 63 of 183
 * collection_day
 * The day on which a collection need to be made. If not specified will be derived from the first_dt field. Can only be different from the first date if monthly by rule is specified or if it is an Authenticated Collections creation.
This value is dependant on the frequency specified.
For weekly and every two weeks, the value denotes the day of the week:
01 = Monday (weekly only)
02 = Tuesday (weekly only) 03 = Wednesday (weekly only) 04 = Thursday (weekly only) 05 = Friday (weekly only)
06 = Saturday (weekly only) 07 = Sunday (weekly only)
08 = 2nd Monday
09 = 2nd Tuesday
10 = 2nd Wednesday
11 = 2nd Thursday
12 = 2nd Friday
13 = 2nd Saturday
14 = 2nd Sunday
For Monthly by rule, the following values are supported:
01 = Last Monday of the month 02 = Last Tuesday of the month 03 = Last Wednesday of the month
04 = Last Thursday of the month 05 = Last Friday of the month 06 = Last Saturday of the month 07 = First Monday of the month 08 = First Tuesday of the month 09 = First Wednesday of the month
10 = First Thursday of the month
11 = First Friday of the month 12 = First Saturday of the month
13 = Last day of the month
14 = Second last day of the month
For Monthly, Every 3 months, Every 6 months and Every 12 months the value will be the calander day of the month.

If 31 is specified it will be treated the same as the last day of the month rule
 */

/**
 * The frequency at which collections need to be made from the client’s account. Valid values are as follow:
0 = Weekly
1 = Every 2 weeks
2 = Monthly
3 = Once-off
4 = Monthly by rule
7 = Every 3 months (Quarterly)
8 = Every 6 months
9 = Every 12 months (Annually)
 */

/**
 * 
 * For weekly and every two weeks, the value denotes the day of the week:
01 = Monday (weekly only)
02 = Tuesday (weekly only) 03 = Wednesday (weekly only) 04 = Thursday (weekly only) 05 = Friday (weekly only)
06 = Saturday (weekly only) 07 = Sunday (weekly only)
08 = 2nd Monday
09 = 2nd Tuesday
10 = 2nd Wednesday
11 = 2nd Thursday
12 = 2nd Friday
13 = 2nd Saturday
14 = 2nd Sunday
 */
module.exports.openAsi = async () => {
    const uid = "intellicellWS";
    const pwd = "Sys007abc*#";
    const machine = "IntellicellCCS";
    const user_if = "allps-ws";
    const integrator = "IntelliCell";
    const product = "IntelliCell";
    const version = "1.0.0.1";
    // const uid = 'amabuzzWS';
    //   pwd = 'Ama998811';
    //   machine = 'IntellicellCCS';
    //   user_if = 'allps-ws';
    //   integrator = 'IntelliCell';
    //   product = 'IntelliCell';
    //   version = '1.0.0.1';
  
    // 'Test to see if still valid by checking the Temp Employer
    const GetEmployerResult = '33';//getEmployer(guid,"EMPTEMP",restart)
    let xmla;
   
    // if (this.getGuid()) {
    //   return this.getGuid();
    // } else {
     
      xmla = `<methods><OpenAsi><uid>${ uid }</uid><pwd>${ pwd }</pwd><machine>${ machine }</machine><user_if>${ user_if }</user_if><integrator>${ integrator }</integrator><product>${ product }</product><version>${ version }</version></OpenAsi></methods>`;
      const data = retDataObject(xmla);
      
      const clientData = await inteconRequest({url, headers, data});
     
      if (clientData) {
        parser.parseString(clientData, (err, it) => {
          if (err) {
            console.log(err);
          }
          const d =it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
          parser.parseString(d, (errw, opData) => {
            if (err) {
              console.log(errw);
            }
            guid = opData.responses.OpenAsi.guid
            console.log(opData.responses.OpenAsi.guid);
            myCache.set('guid', opData.responses.OpenAsi.guid);
           
          });
        });
      // } else {
      //   return {message:'process failed',clientData,data};
      // }
      
      console.log(guid,'settting the guidzz',myCache.get('guid'));
      return guid;
    }
  };
  module.exports.getGuid = () => {
    return myCache.get('guid');
  };
  module.exports.closeAsi = async () => {
    const k =myCache.keys()[0]||'';
    const guidKey = myCache.get(k);
    if (guidKey === undefined || k === null || k === '') {
      console.log(guidKey);
      return;
    }
    const meths = `<methods><CloseAsi><guid>${guidKey}</guid></CloseAsi></methods>`;
    const data = retDataObject(meths);
  
    const icreq = await inteconRequest({url, headers, data});
  
    if (icreq) {
      parser.parseString(icreq, (err, it) => {
        if (err) {
          console.log(err);
        }
        console.log(it);
        const d =it['soap:Envelope']['soap:Body'].CallResponse.CallResult;
        parser.parseString(d, (errw, opData) => {
          if (err) {
            console.log(errw);
          }
          console.log(opData);
          ;
          console.warn(opData);
          return opData;
        });
      });
    } else {
      console.warn('Failed');
      return {message:'process failed'};
    }
  };


module.exports.cancelPromissory = async ({guid,promissory_id}) => {
    let guids = await this.openAsi();
    const actionMethod = `<methods>
              <CancelPromissory>
                  <guid>${ guids }</guid>
                  <org_cd>${ getOrgCode() }</org_cd>
                  <branch_cd>${ getBranchCode() }</branch_cd>
                  <promissory_id>${ promissory_id }</promissory_id>
              </CancelPromissory>
           </methods>`;
  
    const data = retDataObject(actionMethod);
    return inteconRequest({url, headers, data});
  };
module.exports.addClient = async ({guid,client_no, id_no, first_name, surname, employer_cd, cell_tel_no, email}) => {
  let guids = await this.openAsi();
  const actionMethod = `<methods><AddClient><guid>${ guids }</guid><org_cd>${ getOrgCode() }</org_cd><branch_cd>${ getBranchCode() }</branch_cd><client_no>${client_no}</client_no><id_no>${id_no}</id_no><first_name>${first_name}</first_name><surname>${surname}</surname><employer_cd>${employer_cd}</employer_cd><cell_tel_no>${cell_tel_no}</cell_tel_no><email>${email}</email></AddClient></methods>`;
  const data = retDataObject(actionMethod);
  return inteconRequest({url, headers, data});
};
module.exports.editClient = async ({guid,client_no, id_no, first_name, surname, employer_cd, cell_tel_no}) => {
  let guids = await this.openAsi();
  const actionMethod = `<methods><EditClient><guid>${ guids }</guid><org_cd>${ getOrgCode() }</org_cd><branch_cd>${ getBranchCode() }</branch_cd><employer_cd>EMPTEMP</employer_cd><client_no>${client_no}</client_no><id_no>${id_no}</id_no><first_name>${first_name}</first_name><surname>${surname}</surname><employer_cd>${employer_cd}</employer_cd><cell_tel_no>${cell_tel_no}</cell_tel_no></EditClient></methods>`;
  const data = retDataObject(actionMethod);
  return inteconRequest({url, headers, data});
};
module.exports.getClient = async ({guid,client_no}) => {
  let guids = await this.openAsi();
  const actionMethod = `<methods><GetClient><guid>${ guids }</guid><org_cd>${ getOrgCode() }</org_cd><branch_cd>${ getBranchCode() }</branch_cd><client_no>${client_no}</client_no></GetClient></methods>`;
  const data = retDataObject(actionMethod);
  const k = inteconRequest({url, headers, data});
  return k;
};
module.exports.createACOLPromissory = async ({guid,loan_ref_no,first_dt,total_amt,inst_amt,frequency,client_no,track_days,account_type,bank_acc_no,bank_branch_cd,pmt_stream,date_adj,collection_day,mode,mac,max_inst_amt}) =>{
    const status = '1';
    let actionMethod
  /**
   * frequency
  0 = Weekly
  1 = Every 2 weeks
  2 = Monthly
  3 = Once-off
  4 = Monthly by rule
  7 = Every 3 months (Quarterly)
  8 = Every 6 months
  9 = Every 12 months (Annually)
   */
    // '4 = Change date to Processing day before Saturday, Sunday or Public holiday
    // '5 = Leave on the selected day regardless.
  
    date_adj = date_adj || '4';
  
    //max_inst_amt = max_inst_amt || 4 * Math.round(inst_rand_amt);
    mac = mac || '';
  
   
  
    if (frequency === 52 &&  track_days > 7) {
      track_days = 14;
    }
    let guids = await this.openAsi()
      actionMethod = `<methods>
      <CreatePromissory>
        <guid>${ guids }</guid>
        <machine>INTELLICELLCCS</machine>
        <loan_ref_no>${ loan_ref_no }</loan_ref_no>
        <first_dt>${ first_dt }</first_dt>
        <total_amt>${ total_amt * 100 }</total_amt>
        <inst_amt>${ inst_amt * 100 }</inst_amt>
        <first_amt>${ inst_amt * 100 }</first_amt>
        <frequency>${ frequency}</frequency>
        <client_no>${ client_no }</client_no>
        <date_adj>${ date_adj }</date_adj>
        <track_cd>15</track_cd>
        <status>${ status }</status>
        <account_type>${account_type}</account_type>
        <bank_acc_no>${ bank_acc_no }</bank_acc_no>
        <bank_branch_cd>${ bank_branch_cd }</bank_branch_cd>
        <pmt_stream>${ pmt_stream }</pmt_stream>
        <allow_max_inst>F</allow_max_inst>
        <allow_date_chg>T</allow_date_chg>
        <allow_tracking>T</allow_tracking>
        <collection_day>${collection_day}</collection_day>
        <mode>${ mode }</mode>
      </CreatePromissory>
     </methods>`;
  
  
    const data = retDataObject(actionMethod);
    console.log('::::',actionMethod)
    return inteconRequest({url, headers, data});
  };
  module.exports.validateAccountCDV = async ({guid,account_type,bank_acc_no,bank_branch_cd}) => {
    //id_no,  ,client_no, first_name, surname
    let guids = await this.openAsi();
    id_no = "1010101010104";
    client_no = "TEST";
    first_name = "Dummy";
    surname = "Client";
    //bank_branch_cd = '6485';
    const actionMethod = `<methods>
                            <ValidateAccountCDV>
                              <guid>${guids}</guid>
                              <org_cd>${getOrgCode()}</org_cd>
                              <branch_cd>${getBranchCode()}</branch_cd>
                              <id_no>${id_no}</id_no>
                              <client_no>${client_no}</client_no>
                              <first_name>${first_name}</first_name>
                              <surname>${ surname }</surname>
                              <account_type>${getAccountTypeCode(account_type)}</account_type>
                              <bank_acc_no>${ bank_acc_no }</bank_acc_no>
                              <bank_branch_cd>${ bank_branch_cd }</bank_branch_cd>
                            </ValidateAccountCDV>
                          </methods>`;
  
  
    const data = retDataObject(actionMethod);
    return inteconRequest({url, headers, data});
  };
