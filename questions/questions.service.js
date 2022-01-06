const db = require('_helpers/db');

module.exports = {
  getAllQuestions
};

async function getAllQuestions(aId) {
  console.log('In Service');
  const Questions = await db.Questions.find();
  const Compuscan = await db.Compuscan.findOne({"customerId": aId});
  const stringifyCompuscan = JSON.stringify(Compuscan);
  const parsedCompuscan = JSON.parse(stringifyCompuscan);

  let row = Compuscan.EnqCC_ADDRESS.ROW[0];
  let accRow = parsedCompuscan.EnqCC_CPA_ACCOUNTS?.ROW;
  let subscriber = 'None';
  if(accRow){
    subscriber = accRow?.SUBSCRIBER_NAME;
  }
  let r_address = 'None';
  if(row){
    r_address = row?.LINE_1 + ', ' + row?.LINE_2 + ', ' + row?.LINE_3 + ', ' + row?.POSTAL_CODE;
  }

  Object.assign(Questions, {
    c_questions: {
      telephoneNumbers: [Compuscan.EnqCC_TELEPHONE?.ROW[0]?.TEL_NUMBER],
      addresses: [r_address],
      employers: [Compuscan.EnqCC_EMPLOYER.ROW.EMP_NAME ? Compuscan.EnqCC_EMPLOYER.ROW.EMP_NAME : 'None'],
      accounts: [subscriber]
    }
  });
  // console.log(Questions);
  return Questions
}
