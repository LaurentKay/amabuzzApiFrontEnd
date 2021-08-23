const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        customerId:{type:String},
        customerName:{type:String},
        customerSurname:{type:String},
        createDate:{type:Date},
    EnqCC_ENQ_COUNTS:{
        ROW:{
            // $: {
            //     num: {type:String}
            // },
            ADDR: {type:String},
            ADMORDS: {type:String},
            COLLECTIONS: {type:String},
            DMATCHES: {type:String},
            JUDGE: {type:String},
            NOTICES: {type:String},
            PMATCHES: {type:String},
            PREV_ENQ: {type:String},
            TPHONE: {type:String},
            EMPLOYERS: {type:String},
            FRAUDALERT: {type:String},
            CPACC: {type:String},
            NLRACC: {type:String},
            PUB_DEF: {type:String},
            CS_ADVERSE: {type:String}
        }
    },
    EnqCC_ADDRESS:{
        ROW:[{
                // $: {
                //     num: {type:String}
                // },
                ADDRESS_TYPE:{type:String},
                LINE_1: {type:String},
                LINE_2: {type:String},
                LINE_3: {type:String},
                LINE_4: {type:String},
                POSTAL_CODE: {type:String},
                DATE_CREATED: {type:String},
                ADDR_DATE_CREATED: {type:String}
            }
        ]
    },
    EnqCC_HP:{type:String},
    EnqCC_DMATCHES:{
        ROW:{
            // $: {
            //     num: {type:String}
            // },
            ID_NUMBER: {type:String},
            COUNTRY_CODE: {type:String},
            NAME: {type:String},
            SURNAME: {type:String},
            STATUS: {type:String},
            DECEASED_DATE: {type:String}
        }
    },
    EnqCC_PREVENQ:{
        ROW:[{
            // $: {
            //     num: {type:String}
            // },
            ADDRESS_TYPE:{type:String},
            ENQUIRY_DATE: {type:String},
            BRANCH_NAME: {type:String},
            CONTACT_PERSON: {type:String},
            TELEPHONE_NUMBER: {type:String},
                }
            ]
    },
    EnqCC_TELEPHONE:{
        ROW:[{
            // $: {
            //     num: {type:String}
            // },
            TEL_NUMBER_TYPE:{type:String},
            TEL_NUMBER: {type:String},
            DATE_CREATED: {type:String},
            TEL_DATE_CREATED: {type:String}
        }]
    },
    EnqCC_SRCHCRITERIA: {
        ROW:{
            // $: {
            //     num: {type:String}
            // },
            CRIT_IDNUMBER: {type:String},
            CRIT_NAME: {type:String},
            CRIT_SURNAME: {type:String},
            ENQ_CNT_NAME: {type:String},
            ENQ_DATE: {type:String},
            DOB: {type:String},
            GENDER: {type:String},
            PASSPORT_FLAG: {type:String},
            ADDRESS: {type:String},
            LOAN_AMOUNT:{type:String},
            NET_INCOME: {type:String},
            ENQUIRY_PURPOSE: {type:String},
            HOMETEL: {type:String},
            WORK_TEL: {type:String},
            CRIT_CELL_NUM: {type:String}
        }
    },
    EnqCC_EMPLOYER:{
        ROW:{
            // $: {
            //     num: {type:String}
            // },
            EMP_NAME: {type:String},
            EMP_DATE: {type:String},
            OCCUPATION: {type:String},
            EMP_TYPE: {type:String},
            SALARY_FREQ: {type:String},
            PAYSLIP_REF: {type:String},
            EMPLOYEE_NO: {type:String},
            DATE_CREATED: {type:String}
        }
    },
    EnqCC_ACTIVITIES:{
        ROW:{
            // $: {
            //     num: {type:String}
            // },
            ENQUIRIES: {type:String},
            LOANS: {type:String},
            JUDGEMENTS: {type:String},
            NOTICES: {type:String},
            COLLECTIONS: {type:String},
            ADMINORDERS: {type:String},
            BALANCE: {type:String},
            INSTALLMENT: {type:String}
        }
    },
    EnqCC_PUBLIC_DEFAULTS:{
        ROW:[{
            // $: {
            //     num: {type:String}
            // },
            FK_SUBSCR_CODE: {type:String},
            BRANCH_NAME: {type:String},
            ACCOUNT_REF_NUMBER: {type:String},
            DEFAULT_AMOUNT: {type:String},
            DEFAULT_DATE: {type:String},
            LEGAL_ACTION_CODE: {type:String},
            LEGAL_ACTION_DESC: {type:String}
        }]
    },
    EnqCC_CompuSCORE:{
        ROW:{
            // $: {
            //     num: {type:String}
            // },
            RISK_TYPE: {type:String},
            RISK_COLOUR_R: {type:String},
            RISK_COLOUR_G: {type:String},
            RISK_COLOUR_B: {type:String},
            SCORE: {type:String},
            DECLINE_R_1: {type:String},
            DECLINE_R_2: {type:String},
            DECLINE_R_3: {type:String},
            DECLINE_R_4: {type:String},
            DECLINE_R_5: {type:String},
            THIN_FILE_INDICATOR: {type:String},
            VERSION: {type:String},
            SCORE_TYPE: {type:String}
        }
    },
    EnqCC_STATS:{
        ROW:{
            // $: {
            //     num: {type:String}
            // },
            CC_JUDGE_12_CNT: {type:String},
            CC_JUDGE_24_CNT: {type:String},
            CC_JUDGE_36_CNT: {type:String},
            CC_NOTICE_12_CNT: {type:String},
            CC_NOTICE_24_CNT: {type:String},
            CC_NOTICE_36_CNT: {type:String},
            CC_ADVERSE_12_CNT: {type:String},
            CC_ADVERSE_24_CNT: {type:String},
            CC_ADVERSE_36_CNT: {type:String},
            CC_EVO_ADVERSE_12_CNT: {type:String},
            CC_EVO_ADVERSE_24_CNT: {type:String},
            CC_EVO_ADVERSE_36_CNT: {type:String},
            CC_ADVERSE_TOT: {type:String}
        }
    },
    EnqCC_NLR_SUMMARY:{
        Summary:{
            NLR_Past_12_Months:{
                Enquiries_by_client: {type:String},
                Enquiries_by_other: {type:String},
                Positive_loans: {type:String},
                Highest_months_in_arrears: {type:String}
            },
            NLR_Past_24_Months:{
                Enquiries_by_client: {type:String},
                Enquiries_by_other: {type:String},
                Positive_loans: {type:String},
                Highest_months_in_arrears: {type:String}
            },
            NLR_Past_36_Months:{
                Enquiries_by_client: {type:String},
                Enquiries_by_other: {type:String},
                Positive_loans: {type:String},
                Highest_months_in_arrears: {type:String}
            },
            NLR_WorstMonthsArrears: {type:String},
            NLR_ActiveAccounts: {type:String},
            NLR_BalanceExposure: {type:String},
            NLR_MonthlyInstallment: {type:String},
            NLR_CumulativeArrears: {type:String},
            NLR_ClosedAccounts: {type:String},
            CCA_Past_12_Months:{
                Enquiries_by_client: {type:String},
                Enquiries_by_other: {type:String},
                Positive_loans: {type:String},
                Highest_months_in_arrears: {type:String}
            },
            CCA_Past_24_Months:{
                Enquiries_by_client: {type:String},
                Enquiries_by_other: {type:String},
                Positive_loans: {type:String},
                Highest_months_in_arrears: {type:String}
            },
            CCA_Past_36_Months:{
                Enquiries_by_client: {type:String},
                Enquiries_by_other: {type:String},
                Positive_loans: {type:String},
                Highest_months_in_arrears: {type:String}
            },
            CCA_WorstMonthsArrears: {type:String},
            CCA_ActiveAccounts: {type:String},
            CCA_BalanceExposure: {type:String},
            CCA_MonthlyInstallment: {type:String},
            CCA_CumulativeArrears: {type:String},
            CCA_ClosedAccounts: {type:String},
            AdverseAccounts: {type:String},
            RevolvingAccounts: {type:String},
            InstalmentAccounts: {type:String},
            OpenAccounts: {type:String},
            HighestJudgement: {type:String}
        }
    },
    EnqCC_CustomSCORE:{
        ROW:{
            // $: {
            //     num: {type:String}
            // },
            SCORE: {type:String},
            COLOUR: {type:String},
            DECLINE_R_1: {type:String},
            DECLINE_R_1_DESC: {type:String},
            DECLINE_R_2: {type:String},
            DECLINE_R_2_DESC: {type:String},
            DECLINE_R_3: {type:String},
            DECLINE_R_3_DESC: {type:String},
            DECLINE_R_4: {type:String},
            DECLINE_R_4_DESC: {type:String},
            DECLINE_R_5: {type:String},
            DECLINE_R_5_DESC: {type:String},
            RISK_GRADE: {type:String},
            RISK_GRADE_DESC: {type:String},
            THIN_FILE_INDICATOR: {type:String},
            VERSION: {type:String},
            SCORE_TYPE: {type:String},
            SCORE_ID: {type:String},
            SHOW_DECLINE_REASONS: {type:String}
        }
    },
    Enquiry_ID:{type:String},
    CODIX:{
        version:{type:String},
        PRODUCTS:{
            product:{
                // $: {
                //     num: {type:String}
                // },
                product_description:{type:String},
                outcome:{type:String},
                reasons:{
                    reason:[{
                        "_":{type:String},
                        // $:{
                        //     num:{type:String},
                        //     outcome:{type:String}
                        // }
                    }]
                }
            }
        }
    },
    PINPOINT:{
        ALL_PercPayments2Years: {type:String},
        COL_NumOpenTrades: {type:String},
        AU8_NumOpenTrades: {type:String},
        VAP_GMIPVALUE: {type:String},
        VAP_GMIPDISCRETIONARYINCOME: {type:String}
    }
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

module.exports = mongoose.model('Compuscan', schema);