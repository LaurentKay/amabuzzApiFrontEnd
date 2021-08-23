
const Joi = require('joi');
let data = [{"customerId":"6001a311543980814b99cfe1",
    "monthlyFixedsalary": 10,
    "monthlyOvertime": 10,
    "monthlyOtherIncome": 10,
    "familyContribution": 10,
    "spouseJointIncome": 10,
    "monthlyGrossIncome": 10,
    "totalDeductions": 10,
    "monthlyNettIncome": 10,
    "expenseAccomodation": 10,
    "expenseTransport": 23,
    "expenseFood": 10,
    "expsenseEducation": 10,
    "expenseMedical": 10,
    "expenseUtilities": 10,
    "expenseMaintenance": 10,
    "totalMonthlyExpense": 10,
    "loans1": 10,
    "loand2": 10,
    "loans3": 10,
    "loans4": 10,
    "bankStatementMonthlyExpenses": 10,
    "incomeMinusExpensesTotal": 23,
    "affordabilityCalculation": {
      "affordabilityWeight": 1,
      "dateTimeCriteriaApproved": '',
      "humanAffordAbilityApprover": '',
      "totalIncomeGreaterThanExpenses": true,
      "monthlyIncome": 1100,
      "monthlyExpense": 600,
      "affordabilityApproval": ''
    }
}]
const aObject = { affordability: data }

const affordabilityCalculationSchema = Joi.object().keys({
  affordabilityWeight: Joi.number(),
  dateTimeCriteriaApproved:  Joi.date().allow(null, ''),
  humanAffordAbilityApprover: Joi.string().allow(null, ''),
  totalIncomeGreaterThanExpenses: Joi.boolean(),
  monthlyIncome: Joi.number(),
  monthlyExpense: Joi.number(),
  affordabilityApproval: Joi.string().allow(null, '')
});

const affordSchema = Joi.array().items({ customerId:Joi.string(),
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
  incomeMinusExpensesTotal: Joi.number(),
  affordabilityCalculation: affordabilityCalculationSchema
})
const schema = Joi.object().keys({
    affordability: affordSchema
})

const xx = schema.validate(aObject)
    console.log(xx)
