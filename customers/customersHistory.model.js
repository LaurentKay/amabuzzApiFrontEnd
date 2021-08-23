const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {type:String},
    firstName: { type: String },
    lastName: { type: String },
    RSAIDNumber: { type: String },
    mobileNumber: { type: String },
    homeNumber: { type: String },
    workNumber: { type: String },
    emailAddress: {type: String },
    homeAddress1: {type: String },
    homeAddress2: {type: String},
    affordability: [{
        customerId:{type: String},
        monthlyFixedsalary: {type: Number},
        monthlyOvertime: {type: Number},
        monthlyOtherIncome: {type: Number},
        familyContribution: {type: Number},
        spouseJointIncome: {type: Number},
        monthlyGrossIncome: {type: Number},
        totalDeductions: {type: Number},
        monthlyNettIncome: {type: Number},
        expenseAccomodation: {type: Number},
        expenseTransport:{type: Number},
        expenseFood: {type: Number},
        expsenseEducation: {type: Number},
        expenseMedical: {type: Number},
        expenseUtilities: {type: Number},
        expenseMaintenance: {type: Number},
        totalMonthlyExpense: {type: Number},
        loans1: {type: Number},
        loand2: {type: Number},
        loans3: {type: Number},
        loans4: {type: Number},
        bankStatementMonthlyExpenses: {type: Number},
        incomeMinusExpensesTotal:{type: Number},
        affordabilityCalculation: {
          affordabilityWeight: {type: Number},
          dateTimeCriteriaApproved: {type: Date},
          humanAffordAbilityApprover: {type: String},
          totalIncomeGreaterThanExpenses: {type: String},
          monthlyIncome: {type: String},
          monthlyExpense: {type: String},
          affordabilityApproval: {type: String}
        }
    }],
    homeCity: {type: String },
    homeSuburb: {type: String },
    homePostalCode: {type: String },
    deliveryAddress1: {type: String },
    deliveryAddress2: {type: String},
    deliveryCity: {type: String },
    deliverySuburb: {type: String },
    deliveryPostalCode: {type: String },
    employerName:{type: String},
    employerAddress1: {type: String},
    employerAddress2: {type: String},
    employerAddressCity: {type: String},
    employerAddressPostalCode: {type: String},
    employerContactNumber: {type:String},
    bankName:{type: String },
    bankBranch:{type: String },
    bankAccountNumber:{type: String },
    bankAccountType:{type: String },
    bankAccHolderName:{type: String},
    verifiableIncome:{type: Boolean},
    role: { type: String },
    uploadedDocs: {
        name:String,
        surname:String,
        idNumber:String,
        documentType:String,
        dateUploaded:Date,
        bankStatment:String,
        paySlip:String
    },
    //creditScore:{type: String},
    verificationToken: String,
    verified: Date,
    resetToken: {
        token: String,
        expires: Date
    },
    updated : {type: Date, default: Date.now},
    active: {type: Boolean},
    createDate: {type : Date}
});

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized


    }
});

module.exports = mongoose.model('CustomerHistory', schema);
