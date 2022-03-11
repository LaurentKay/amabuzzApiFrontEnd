const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {type:String},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    RSAIDNumber: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    homeNumber: { type: String },
    workNumber: { type: String },
    maritalStatus: {type: String},
    emailAddress: {type: String, required: true },
    homeAddress1: {type: String, required: true },
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
        loan1: {type: Number},
        loand2: {type: Number},
        loans3: {type: Number},
        loans4: {type: Number},
        loanTerms:{type: Number},
        installMent:{type: Number},
        bankStatementMonthlyExpenses: {type: Number},
        incomeMinusExpensesTotal:{type: Number},
        ExpenseRent: {type: Number},
        ExpenseAccomodation: {type: Number},
        ExpenseEducation: {type: Number},
        ExpenseFood: {type: Number},
        ExpenseMaintenance: {type: Number},
        ExpenseMedical: {type: Number},
        ExpenseTransport: {type: Number},
        ExpenseUtilities: {type: Number},
        IncomeMonthlyFixedsalary: {type: Number},
        IncomeMonthlyOtherIncome: {type: Number},
        IncomeMonthlyOvertime: {type: Number},
        IncomeRental: {type: Number},
        installMent: {type: Number},
        loan1: {type: Number},
        loanTerms: {type: Number},
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
    homeCity: {type: String, required: true },
    homeSuburb: {type: String, required: true },
    homeProvince: {type: String, required: true},
    homePostalCode: {type: String, required: true },
    deliveryAddress1: {type: String, required: true },
    deliveryAddress2: {type: String},
    deliveryCity: {type: String, required: true },
    deliverySuburb: {type: String, required: true },
    deliveryPostalCode: {type: String, required: true },
    employerName:{type: String},
    employerAddress1: {type: String},
    employerAddress2: {type: String},
    employerAddressCity: {type: String},
    employerAddressPostalCode: {type: String},
    employerContactNumber: {type:String},
    salaryDay:{type:String},
    yearEmployed:{type:Number},
    monthEmployed: {type:Number},
    occupation: {type:String},
    salaryFrequency:{type:String},
    employmentNumber:{type:String},
    bankName:{type: String, required: true },
    bankBranch:{type: String },
    bankAccountNumber:{type: String, required: true },
    bankAccountType:{type: String, required: true },
    bankAccHolderName:{type: String},
    verifiableIncome:{type: Boolean},
    role: { type: String, required: true },
    creditScore:{type: String},
    applicationStatus:{type: String},
    uploadedDocs: {
        name:{type: String},
        surname:{type: String},
        idNumber:{type: String},
        dateUploaded:{type: String},
        paySlip:{type:String},
        bankStatement:{type: String},
        idDocument:{type: String}
    },
    //creditScore:{type: String},
    verificationToken: String,
    verified: Date,
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account'
    },
    EmploymentVerificationStatus:{type: String},
    DocmentationVerificationStatus:{type: String},
    AffordabilityVerificationStatus:{type: String},
    FirstDebitOrderStatus:{type: String},
    CreditReportStatus:{type: String},
    CreditReportReason:{type: String},
    applicationFailureReason:{type: String},
    createDate:{type:Date, default: Date.now},
    applicationReferenceNumber:{type:String},
    promoCode:{type:String},
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

module.exports = mongoose.model('Customer', schema);
