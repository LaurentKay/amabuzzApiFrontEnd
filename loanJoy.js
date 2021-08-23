
const Joi = require('joi');
let data = [{
    "customerLoanId": {type:String, required: true},
    "clientNumber": {type:String, required: true},
    "promissoryId": {type:String},
    "firstName": {type:String, required: true},
    "lastName": {type:String, required: true},
    "idNumber":{type:String, required: true},
    "product" : {
        "productId": {type:String, required: true}, 
        "productName": {type:String, required: true}, 
        "productPrice": {type:Number, required: true}
    },
    "approveStatus": {type:String, required: true},
    "disbursementApprovalStatus": {type:String, required: true},
    "amountBeingDisbursed": {type:Number, required: true},
    "statusOfDisbursement": {
        "hasBeenPaidOut": {type:Boolean, required: true},
        "dateDisbursementHappened": {type:Date}
    },
    "bankAccountNumber": {type:String, required: true},
    "bankName": {type:String, required: true},
    "bankAccHolderName" : {type:String, required: true},
    "bankAccountType": {type:String, required: true},
    "branchCode": {type:String, required: true},
    "approvedBy": {
        "disbursementApproverId": {type:String, required: true},
        "disbursementApproverFullName": {type:String, required: true},
        "loanApproverFullName": {type:String, required: true},
        "loanApproverId": {type:String, required: true},
        "approvedDisbursementDate": {type:Date},
        "approvedLoanDate": {type:Date}
    },
    "inteconResponse":{
        "PromissoryID": {type: String}
    }
}]
const finalSchema = { loan: data}

const loanSchema = Joi.array().items({ 
        customerId:Joi.string(),
        monthlyFixedsalary: Joi.number(),
        monthlyOvertime: Joi.number(),
        monthlyFixedsalary: Joi.number(),
        monthlyOvertime: Joi.number(),
        monthlyOtherIncome: Joi.number(),
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
        loans1: Joi.number(),
        loand2: Joi.number(),
        loans3: Joi.number(),
        loans4: Joi.number(),
        bankStatementMonthlyExpenses: Joi.number(),
        incomeMinusExpensesTotal: Joi.number()
    }
)
const schema = Joi.object().keys({
    loan:loanSchema
})

const xx = schema.validate(kak)
    console.log(xx)

