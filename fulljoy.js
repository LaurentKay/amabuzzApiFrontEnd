
const Joi = require('joi');
const { join } = require('path');

const compuScan = {
    "EnqCC_ENQ_COUNTS": {
        "ROW": {
            "$": {
                "num": "1"
            },
            "ADDR": "5",
            "ADMORDS": "0",
            "COLLECTIONS": "0",
            "DMATCHES": "1",
            "JUDGE": "0",
            "NOTICES": "0",
            "PMATCHES": "0",
            "PREV_ENQ": "15",
            "TPHONE": "5",
            "EMPLOYERS": "1",
            "FRAUDALERT": "0",
            "CPACC": "0",
            "NLRACC": "0",
            "PUB_DEF": "2",
            "CS_ADVERSE": "0"
        }
    },
    "EnqCC_ADDRESS": {
        "ROW": [
            {
                "$": {
                    "num": "1"
                },
                "ADDRESS_TYPE": "R",
                "LINE_1": "3 NEUTRON ROAD",
                "LINE_2": "TECHNO PARK",
                "LINE_3": "STELLENBOSCH",
                "LINE_4": "",
                "POSTAL_CODE": "7600",
                "DATE_CREATED": "23/03/2021",
                "ADDR_DATE_CREATED": "26/03/2019"
            },
            {
                "$": {
                    "num": "2"
                },
                "ADDRESS_TYPE": "R",
                "LINE_1": "WEST STREET",
                "LINE_2": "GREYVILLE",
                "LINE_3": "DURBAN",
                "LINE_4": "",
                "POSTAL_CODE": "4001",
                "DATE_CREATED": "23/03/2021",
                "ADDR_DATE_CREATED": "26/03/2019"
            },
            {
                "$": {
                    "num": "3"
                },
                "ADDRESS_TYPE": "R",
                "LINE_1": "10 MARS STREET",
                "LINE_2": "MARS",
                "LINE_3": "",
                "LINE_4": "",
                "POSTAL_CODE": "1234",
                "DATE_CREATED": "23/03/2021",
                "ADDR_DATE_CREATED": "26/03/2019"
            },
            {
                "$": {
                    "num": "4"
                },
                "ADDRESS_TYPE": "R",
                "LINE_1": "80 STRAND STREET",
                "LINE_2": "CAPE TOWN CENTRE",
                "LINE_3": "CAPE TOWN",
                "LINE_4": "",
                "POSTAL_CODE": "8001",
                "DATE_CREATED": "23/03/2021",
                "ADDR_DATE_CREATED": "05/03/2019"
            },
            {
                "$": {
                    "num": "5"
                },
                "ADDRESS_TYPE": "R",
                "LINE_1": "UNIT 321 SAN RIDGE HEIGH",
                "LINE_2": "CO LEVER TH ROADS",
                "LINE_3": "HALFWAY HOUSE",
                "LINE_4": "MIDRAND",
                "POSTAL_CODE": "1685",
                "DATE_CREATED": "23/03/2021",
                "ADDR_DATE_CREATED": "26/02/2019"
            }
        ]
    },
    "EnqCC_HP": "",
    "EnqCC_DMATCHES": {
        "ROW": {
            "$": {
                "num": "1"
            },
            "ID_NUMBER": "8209147250087",
            "COUNTRY_CODE": "South Africa",
            "NAME": "JOHN",
            "SURNAME": "DOE",
            "STATUS": "Not in use",
            "DECEASED_DATE": ""
        }
    },
    "EnqCC_PREVENQ": {
        "ROW": [
            {
                "$": {
                    "num": "1"
                },
                "ENQUIRY_DATE": "23-03-2021 14:49",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "2"
                },
                "ENQUIRY_DATE": "23-03-2021 14:48",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "3"
                },
                "ENQUIRY_DATE": "23-03-2021 14:20",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "4"
                },
                "ENQUIRY_DATE": "23-03-2021 13:46",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "5"
                },
                "ENQUIRY_DATE": "23-03-2021 13:16",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "6"
                },
                "ENQUIRY_DATE": "23-03-2021 13:05",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "7"
                },
                "ENQUIRY_DATE": "23-03-2021 13:02",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "8"
                },
                "ENQUIRY_DATE": "23-03-2021 12:54",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "9"
                },
                "ENQUIRY_DATE": "23-03-2021 12:53",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "10"
                },
                "ENQUIRY_DATE": "23-03-2021 09:21",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "11"
                },
                "ENQUIRY_DATE": "22-03-2021 20:15",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "12"
                },
                "ENQUIRY_DATE": "22-03-2021 19:57",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "13"
                },
                "ENQUIRY_DATE": "22-03-2021 19:56",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "14"
                },
                "ENQUIRY_DATE": "22-03-2021 19:54",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            },
            {
                "$": {
                    "num": "15"
                },
                "ENQUIRY_DATE": "12-03-2021 09:23",
                "BRANCH_NAME": "Intellicell",
                "CONTACT_PERSON": "The Manger",
                "TELEPHONE_NUMBER": "(0861) 114 246"
            }
        ]
    },
    "EnqCC_TELEPHONE": {
        "ROW": [
            {
                "$": {
                    "num": "1"
                },
                "TEL_NUMBER_TYPE": "C",
                "TEL_NUMBER": "0716062368",
                "DATE_CREATED": "23-03-2021",
                "TEL_DATE_CREATED": "29-08-2017"
            },
            {
                "$": {
                    "num": "2"
                },
                "TEL_NUMBER_TYPE": "C",
                "TEL_NUMBER": "0817554675",
                "DATE_CREATED": "23-03-2021",
                "TEL_DATE_CREATED": "13-09-2016"
            },
            {
                "$": {
                    "num": "3"
                },
                "TEL_NUMBER_TYPE": "W",
                "TEL_NUMBER": "0218886000",
                "DATE_CREATED": "23-03-2021",
                "TEL_DATE_CREATED": "07-06-2016"
            },
            {
                "$": {
                    "num": "4"
                },
                "TEL_NUMBER_TYPE": "C",
                "TEL_NUMBER": "0740793291",
                "DATE_CREATED": "23-03-2021",
                "TEL_DATE_CREATED": "26-06-2018"
            },
            {
                "$": {
                    "num": "5"
                },
                "TEL_NUMBER_TYPE": "C",
                "TEL_NUMBER": "0821234567",
                "DATE_CREATED": "23-03-2021",
                "TEL_DATE_CREATED": "31-05-2016"
            }
        ]
    },
    "EnqCC_SRCHCRITERIA": {
        "ROW": {
            "$": {
                "num": "1"
            },
            "CRIT_IDNUMBER": "8209147250087",
            "CRIT_NAME": "John",
            "CRIT_SURNAME": "Doe",
            "ENQ_CNT_NAME": "South Africa",
            "ENQ_DATE": "2021-03-23 14:49:38",
            "DOB": "1982-09-14",
            "GENDER": "MALE",
            "PASSPORT_FLAG": "NO",
            "ADDRESS": "    ",
            "LOAN_AMOUNT": "",
            "NET_INCOME": "",
            "ENQUIRY_PURPOSE": "Fraud Investigation",
            "HOMETEL": " ",
            "WORK_TEL": " ",
            "CRIT_CELL_NUM": ""
        }
    },
    "EnqCC_EMPLOYER": {
        "ROW": {
            "$": {
                "num": "1"
            },
            "EMP_NAME": "SASSA PENSIONER OA SEFT",
            "EMP_DATE": "2018-06-14",
            "OCCUPATION": " ",
            "EMP_TYPE": " ",
            "SALARY_FREQ": " ",
            "PAYSLIP_REF": " ",
            "EMPLOYEE_NO": " ",
            "DATE_CREATED": "2021-03-23"
        }
    },
    "EnqCC_ACTIVITIES": {
        "ROW": {
            "$": {
                "num": "1"
            },
            "ENQUIRIES": "30",
            "LOANS": "0",
            "JUDGEMENTS": "0",
            "NOTICES": "0",
            "COLLECTIONS": "0",
            "ADMINORDERS": "0",
            "BALANCE": "100000",
            "INSTALLMENT": "120000"
        }
    },
    "EnqCC_PUBLIC_DEFAULTS": {
        "ROW": [
            {
                "$": {
                    "num": "1"
                },
                "FK_SUBSCR_CODE": "30500",
                "BRANCH_NAME": "CS Codix Test",
                "ACCOUNT_REF_NUMBER": "1111",
                "DEFAULT_AMOUNT": "1000",
                "DEFAULT_DATE": "2021-01-05",
                "LEGAL_ACTION_CODE": "1",
                "LEGAL_ACTION_DESC": "Handed Over"
            },
            {
                "$": {
                    "num": "2"
                },
                "FK_SUBSCR_CODE": "26685",
                "BRANCH_NAME": "Credit Check UAT",
                "ACCOUNT_REF_NUMBER": "UDA1234",
                "DEFAULT_AMOUNT": "1500",
                "DEFAULT_DATE": "2020-11-30",
                "LEGAL_ACTION_CODE": "1",
                "LEGAL_ACTION_DESC": "Handed Over"
            }
        ]
    },
    "EnqCC_CompuSCORE": {
        "ROW": {
            "$": {
                "num": "1"
            },
            "RISK_TYPE": "VERY HIGH RISK",
            "RISK_COLOUR_R": "233",
            "RISK_COLOUR_G": "13",
            "RISK_COLOUR_B": "13",
            "SCORE": "618",
            "DECLINE_R_1": "MI12-All Accounts have limited performance history",
            "DECLINE_R_2": "MI59-High Number of Enquiries",
            "DECLINE_R_3": "MI51-Few or No Secured Accounts Held",
            "DECLINE_R_4": "",
            "DECLINE_R_5": "",
            "THIN_FILE_INDICATOR": "N",
            "VERSION": "3",
            "SCORE_TYPE": "CU"
        }
    },
    "EnqCC_STATS": {
        "ROW": {
            "$": {
                "num": "1"
            },
            "CC_JUDGE_12_CNT": "0",
            "CC_JUDGE_24_CNT": "0",
            "CC_JUDGE_36_CNT": "0",
            "CC_NOTICE_12_CNT": "0",
            "CC_NOTICE_24_CNT": "0",
            "CC_NOTICE_36_CNT": "0",
            "CC_ADVERSE_12_CNT": "0",
            "CC_ADVERSE_24_CNT": "0",
            "CC_ADVERSE_36_CNT": "0",
            "CC_EVO_ADVERSE_12_CNT": "0",
            "CC_EVO_ADVERSE_24_CNT": "0",
            "CC_EVO_ADVERSE_36_CNT": "0",
            "CC_ADVERSE_TOT": "0"
        }
    },
    "EnqCC_NLR_SUMMARY": {
        "Summary": {
            "NLR_Past_12_Months": {
                "Enquiries_by_client": "92",
                "Enquiries_by_other": "999",
                "Positive_loans": "0",
                "Highest_months_in_arrears": "0"
            },
            "NLR_Past_24_Months": {
                "Enquiries_by_client": "92",
                "Enquiries_by_other": "999",
                "Positive_loans": "0",
                "Highest_months_in_arrears": "0"
            },
            "NLR_Past_36_Months": {
                "Enquiries_by_client": "92",
                "Enquiries_by_other": "999",
                "Positive_loans": "0",
                "Highest_months_in_arrears": "0"
            },
            "NLR_WorstMonthsArrears": "0",
            "NLR_ActiveAccounts": "0",
            "NLR_BalanceExposure": "0",
            "NLR_MonthlyInstallment": "0",
            "NLR_CumulativeArrears": "0",
            "NLR_ClosedAccounts": "0",
            "CCA_Past_12_Months": {
                "Enquiries_by_client": "148",
                "Enquiries_by_other": "56",
                "Positive_loans": "0",
                "Highest_months_in_arrears": "0"
            },
            "CCA_Past_24_Months": {
                "Enquiries_by_client": "148",
                "Enquiries_by_other": "56",
                "Positive_loans": "0",
                "Highest_months_in_arrears": "0"
            },
            "CCA_Past_36_Months": {
                "Enquiries_by_client": "148",
                "Enquiries_by_other": "56",
                "Positive_loans": "0",
                "Highest_months_in_arrears": "0"
            },
            "CCA_WorstMonthsArrears": "0",
            "CCA_ActiveAccounts": "0",
            "CCA_BalanceExposure": "0",
            "CCA_MonthlyInstallment": "0",
            "CCA_CumulativeArrears": "0",
            "CCA_ClosedAccounts": "0",
            "AdverseAccounts": "0",
            "RevolvingAccounts": "0",
            "InstalmentAccounts": "0",
            "OpenAccounts": "0",
            "HighestJudgement": "0"
        }
    },
    "EnqCC_CustomSCORE": {
        "ROW": {
            "$": {
                "num": "1"
            },
            "SCORE": "555",
            "COLOUR": "000000",
            "DECLINE_R_1": "",
            "DECLINE_R_1_DESC": "",
            "DECLINE_R_2": "",
            "DECLINE_R_2_DESC": "",
            "DECLINE_R_3": "",
            "DECLINE_R_3_DESC": "",
            "DECLINE_R_4": "",
            "DECLINE_R_4_DESC": "",
            "DECLINE_R_5": "",
            "DECLINE_R_5_DESC": "",
            "RISK_GRADE": "",
            "RISK_GRADE_DESC": "",
            "THIN_FILE_INDICATOR": "N",
            "VERSION": "",
            "SCORE_TYPE": "AS",
            "SCORE_ID": "8",
            "SHOW_DECLINE_REASONS": "Y"
        }
    },
    "Enquiry_ID": "427995314",
    "CODIX": {
        "version": "1.0",
        "PRODUCTS": {
            "product": {
                "$": {
                    "num": "1"
                },
                "product_description": "Intellicell Cellphone Product",
                "outcome": "R",
                "reasons": {
                    "reason": [
                        {
                            "_": "No. of Enquiries Greater Than Or Equal To 7 In The Last 14 Days",
                            "$": {
                                "num": "1",
                                "outcome": "R"
                            }
                        },
                        {
                            "_": "Less Than Or Equal To 3 Months Since Oldest Compuscan Tradeline Was Opened",
                            "$": {
                                "num": "2",
                                "outcome": "R"
                            }
                        }
                    ]
                }
            }
        }
    },
    "user": {
        "customerId": "8209147250087",
        "customerName": "John",
        "customerSurname": "Doe"
    }
}
//
const userSchema = Joi.object().keys({
    customerId:Joi.string().trim().required(),
    customerName:Joi.string().trim().required(),
    customerSurname:Joi.string().trim().required()
});
const dolarSchema = Joi.object().keys({
        "num": Joi.string()
});
const rowSchema = Joi.object().keys({
    "$":dolarSchema,
    ADDR: Joi.string(),
    ADMORDS: Joi.string(),
    COLLECTIONS: Joi.string(),
    DMATCHES: Joi.string(),
    JUDGE: Joi.string(),
    NOTICES: Joi.string(),
    PMATCHES: Joi.string(),
    PREV_ENQ: Joi.string(),
    TPHONE: Joi.string(),
    EMPLOYERS: Joi.string(),
    FRAUDALERT: Joi.string(),
    CPACC: Joi.string(),
    NLRACC: Joi.string(),
    PUB_DEF: Joi.string(),
    CS_ADVERSE: Joi.string()
});
const EnqCC_ENQ_COUNTSSchema = {
    ROW:rowSchema
}
//

const rowdEnqCC_ADDRESSSchema = Joi.array().items({
    "$" :dolarSchema,
    ADDRESS_TYPE:Joi.string().allow(null, ''),
    LINE_1: Joi.string().allow(null, ''),
    LINE_2: Joi.string().allow(null, ''),
    LINE_3: Joi.string().allow(null, ''),
    LINE_4: Joi.string().allow(null, ''),
    POSTAL_CODE: Joi.string(),
    DATE_CREATED: Joi.string(),
    ADDR_DATE_CREATED: Joi.string()
});
EnqCC_ADDRESSSchema = Joi.object().keys({
    ROW:rowdEnqCC_ADDRESSSchema
});
//
const rowdEnqCC_DMATCHESSchema = Joi.object().keys({
        "$":dolarSchema,
        ID_NUMBER: Joi.string(),
        COUNTRY_CODE: Joi.string(),
        NAME: Joi.string(),
        SURNAME: Joi.string(),
        STATUS: Joi.string(),
        DECEASED_DATE: Joi.string().allow(null, '')
    });
const EnqCC_DMATCHESSchema = Joi.object().keys({
    ROW:rowdEnqCC_DMATCHESSchema
})
//

const rowdEnqCC_PREVENQSchema = Joi.array().items({
    "$":dolarSchema,
    ADDRESS_TYPE:Joi.string(),
    ENQUIRY_DATE: Joi.string(),
    BRANCH_NAME: Joi.string(),
    CONTACT_PERSON: Joi.string(),
    TELEPHONE_NUMBER: Joi.string(),
});
const EnqCC_PREVENQSchema = Joi.object().keys({
    ROW:rowdEnqCC_PREVENQSchema
});
//
const rowdEnqCC_TELEPHONESchema = Joi.array().items({
    "$":dolarSchema,
    TEL_NUMBER_TYPE:Joi.string(),
    TEL_NUMBER: Joi.string(),
    DATE_CREATED: Joi.string(),
    TEL_DATE_CREATED: Joi.string()
});
const EnqCC_TELEPHONESchema = Joi.object().keys({
    ROW:rowdEnqCC_TELEPHONESchema
});
//
const rowdEnqCC_SRCHCRITERIASchema = Joi.object().keys({
        "$":dolarSchema,
        CRIT_IDNUMBER: Joi.string(),
        CRIT_NAME: Joi.string(),
        CRIT_SURNAME: Joi.string(),
        ENQ_CNT_NAME: Joi.string(),
        ENQ_DATE: Joi.string(),
        DOB: Joi.string(),
        GENDER: Joi.string(),
        PASSPORT_FLAG: Joi.string(),
        ADDRESS: Joi.string(),
        LOAN_AMOUNT:Joi.string().allow(null, ''),
        NET_INCOME: Joi.string().allow(null, ''),
        ENQUIRY_PURPOSE: Joi.string().allow(null, ''),
        HOMETEL: Joi.string().allow(null, ''),
        WORK_TEL: Joi.string().allow(null, ''),
        CRIT_CELL_NUM: Joi.string().allow(null, '')
    }
);
const EnqCC_SRCHCRITERIASchema = Joi.object().keys({
    ROW:rowdEnqCC_SRCHCRITERIASchema
});
//
const rowdEnqCC_EMPLOYERSchema = Joi.object().keys({
        "$":dolarSchema,
        EMP_NAME: Joi.string(),
        EMP_DATE: Joi.string(),
        OCCUPATION: Joi.string(),
        EMP_TYPE: Joi.string(),
        SALARY_FREQ: Joi.string(),
        PAYSLIP_REF: Joi.string(),
        EMPLOYEE_NO: Joi.string(),
        DATE_CREATED: Joi.string()
    }
);
const EnqCC_EMPLOYERSchema = Joi.object().keys({
    ROW:rowdEnqCC_EMPLOYERSchema
});
//
const rowdEnqCC_ACTIVITIESSchema = Joi.object().keys({
        "$":dolarSchema,
        ENQUIRIES: Joi.string(),
        LOANS: Joi.string(),
        JUDGEMENTS: Joi.string(),
        NOTICES: Joi.string(),
        COLLECTIONS: Joi.string(),
        ADMINORDERS: Joi.string(),
        BALANCE: Joi.string(),
        INSTALLMENT: Joi.string()
    }
);
const EnqCC_ACTIVITIESSchema = Joi.object().keys({
    ROW:rowdEnqCC_ACTIVITIESSchema
});
//
const rowdEnqCC_PUBLIC_DEFAULTSSchema = Joi.array().items({
            "$":dolarSchema,
            FK_SUBSCR_CODE: Joi.string(),
            BRANCH_NAME: Joi.string(),
            ACCOUNT_REF_NUMBER: Joi.string(),
            DEFAULT_AMOUNT: Joi.string(),
            DEFAULT_DATE: Joi.string(),
            LEGAL_ACTION_CODE: Joi.string(),
            LEGAL_ACTION_DESC: Joi.string()
});
const EnqCC_PUBLIC_DEFAULTSSchema = Joi.object().keys({
    ROW:rowdEnqCC_PUBLIC_DEFAULTSSchema
});
//
const rowdEnqCC_CompuSCORESchema = Joi.object().keys({
        "$":dolarSchema,
        RISK_TYPE: Joi.string().allow(null, ''),
        RISK_COLOUR_R: Joi.string().allow(null, ''),
        RISK_COLOUR_G: Joi.string().allow(null, ''),
        RISK_COLOUR_B: Joi.string().allow(null, ''),
        SCORE: Joi.string().allow(null, ''),
        DECLINE_R_1: Joi.string().allow(null, ''),
        DECLINE_R_2: Joi.string().allow(null, ''),
        DECLINE_R_3: Joi.string().allow(null, ''),
        DECLINE_R_4: Joi.string().allow(null, ''),
        DECLINE_R_5: Joi.string().allow(null, ''),
        THIN_FILE_INDICATOR: Joi.string().allow(null, ''),
        VERSION: Joi.string().allow(null, ''),
        SCORE_TYPE: Joi.string().allow(null, '')
});
const EnqCC_CompuSCORESchema = Joi.object().keys({
    ROW:rowdEnqCC_CompuSCORESchema
});
//
const rowdEnqCC_STATSSchema = Joi.object().keys({
        "$":dolarSchema,
        CC_JUDGE_12_CNT: Joi.string(),
        CC_JUDGE_24_CNT: Joi.string(),
        CC_JUDGE_36_CNT: Joi.string(),
        CC_NOTICE_12_CNT: Joi.string(),
        CC_NOTICE_24_CNT: Joi.string(),
        CC_NOTICE_36_CNT: Joi.string(),
        CC_ADVERSE_12_CNT: Joi.string(),
        CC_ADVERSE_24_CNT: Joi.string(),
        CC_ADVERSE_36_CNT: Joi.string(),
        CC_EVO_ADVERSE_12_CNT: Joi.string(),
        CC_EVO_ADVERSE_24_CNT: Joi.string(),
        CC_EVO_ADVERSE_36_CNT: Joi.string(),
        CC_ADVERSE_TOT: Joi.string()
});
const EnqCC_STATSSchema = Joi.object().keys({
    ROW:rowdEnqCC_STATSSchema
});
//
const NLR_Past_12_MonthsSchema = Joi.object().keys({
    Enquiries_by_client: Joi.string(),
    Enquiries_by_other: Joi.string(),
    Positive_loans: Joi.string(),
    Highest_months_in_arrears: Joi.string()
});
const NLR_Past_24_MonthsSchema = Joi.object().keys({
    Enquiries_by_client: Joi.string(),
    Enquiries_by_other: Joi.string(),
    Positive_loans: Joi.string(),
    Highest_months_in_arrears: Joi.string()
});
const NLR_Past_36_MonthsSchema = Joi.object().keys({
    Enquiries_by_client: Joi.string(),
    Enquiries_by_other: Joi.string(),
    Positive_loans: Joi.string(),
    Highest_months_in_arrears: Joi.string()
});
const CCA_Past_12_MonthsSchema = Joi.object().keys({
    Enquiries_by_client: Joi.string(),
    Enquiries_by_other: Joi.string(),
    Positive_loans: Joi.string(),
    Highest_months_in_arrears: Joi.string()
});
const CCA_Past_24_MonthsSchema = Joi.object().keys({
    Enquiries_by_client: Joi.string(),
    Enquiries_by_other: Joi.string(),
    Positive_loans: Joi.string(),
    Highest_months_in_arrears: Joi.string()
});
const CCA_Past_36_MonthsSchema = Joi.object().keys({
    Enquiries_by_client: Joi.string(),
    Enquiries_by_other: Joi.string(),
    Positive_loans: Joi.string(),
    Highest_months_in_arrears: Joi.string()
});
const SummarySchema = Joi.object().keys({
    NLR_Past_12_Months:NLR_Past_12_MonthsSchema,
    NLR_Past_24_Months:NLR_Past_24_MonthsSchema,
    NLR_Past_36_Months:NLR_Past_36_MonthsSchema,
    NLR_WorstMonthsArrears: Joi.string(),
    NLR_ActiveAccounts: Joi.string(),
    NLR_BalanceExposure: Joi.string(),
    NLR_MonthlyInstallment: Joi.string(),
    NLR_CumulativeArrears: Joi.string(),
    NLR_ClosedAccounts: Joi.string(),
    CCA_Past_12_Months:CCA_Past_12_MonthsSchema,
    CCA_Past_24_Months:CCA_Past_24_MonthsSchema,
    CCA_Past_36_Months:CCA_Past_36_MonthsSchema,
    CCA_WorstMonthsArrears: Joi.string(),
    CCA_ActiveAccounts: Joi.string(),
    CCA_BalanceExposure: Joi.string(),
     CCA_MonthlyInstallment: Joi.string(),
    CCA_CumulativeArrears: Joi.string(),
    CCA_ClosedAccounts: Joi.string(),
    AdverseAccounts: Joi.string(),
    RevolvingAccounts: Joi.string(),
    InstalmentAccounts: Joi.string(),
    OpenAccounts: Joi.string(),
    HighestJudgement: Joi.string()
});
const EnqCC_NLR_SUMMARYSchema = Joi.object().keys({
    Summary: SummarySchema
});
//
const rowdEnqCC_CustomSCORESchema = Joi.object().keys({
        "$":dolarSchema,
        SCORE: Joi.string().allow(null, ''),
        COLOUR: Joi.string().allow(null, ''),
        DECLINE_R_1: Joi.string().allow(null, ''),
        DECLINE_R_1_DESC: Joi.string().allow(null, ''),
        DECLINE_R_2: Joi.string().allow(null, ''),
        DECLINE_R_2_DESC: Joi.string().allow(null, ''),
        DECLINE_R_3: Joi.string().allow(null, ''),
        DECLINE_R_3_DESC: Joi.string().allow(null, ''),
        DECLINE_R_4: Joi.string().allow(null, ''),
        DECLINE_R_4_DESC: Joi.string().allow(null, ''),
        DECLINE_R_5: Joi.string().allow(null, ''),
        DECLINE_R_5_DESC: Joi.string().allow(null, ''),
        RISK_GRADE: Joi.string().allow(null, ''),
        RISK_GRADE_DESC: Joi.string().allow(null, ''),
        THIN_FILE_INDICATOR: Joi.string().allow(null, ''),
        VERSION: Joi.string().allow(null, ''),
        SCORE_TYPE: Joi.string().allow(null, ''),
        SCORE_ID: Joi.string().allow(null, ''),
        SHOW_DECLINE_REASONS: Joi.string().allow(null, '')
});
const EnqCC_CustomSCORESchema = Joi.object().keys({
    ROW:rowdEnqCC_CustomSCORESchema
});
//
const dollarSchema = Joi.object().keys({
    num:Joi.string(),
    outcome:Joi.string()
});
const reasonSchema = Joi.array().items({
    "_":Joi.string(),
    "$":dollarSchema
});
const reasonsSchema = Joi.object().keys({
    reason:reasonSchema
});
const productSchema = Joi.object().keys({
    "$":dolarSchema,
    product_description:Joi.string(),
    outcome:Joi.string(),
    reasons:reasonsSchema
});
const productsSchema = Joi.object().keys({product:productSchema});
const codixSchema = Joi.object().keys({
    version:Joi.string(),
    PRODUCTS:productsSchema
});

rowdEnqCC_HPSchema = Joi.string().allow(null, '');
Enquiry_IDSchema = Joi.string().allow(null, '');

const schema = Joi.object().keys({
    user:userSchema,
    EnqCC_ENQ_COUNTS:EnqCC_ENQ_COUNTSSchema,
    EnqCC_ADDRESS:EnqCC_ADDRESSSchema,
    EnqCC_HP: rowdEnqCC_HPSchema,
    EnqCC_DMATCHES:EnqCC_DMATCHESSchema,
    EnqCC_PREVENQ:EnqCC_PREVENQSchema,
    EnqCC_TELEPHONE:EnqCC_TELEPHONESchema,
    EnqCC_SRCHCRITERIA: EnqCC_SRCHCRITERIASchema,
    EnqCC_EMPLOYER:EnqCC_EMPLOYERSchema,
    EnqCC_ACTIVITIES:EnqCC_ACTIVITIESSchema,
    EnqCC_PUBLIC_DEFAULTS:EnqCC_PUBLIC_DEFAULTSSchema,
    EnqCC_CompuSCORE:EnqCC_CompuSCORESchema,
    EnqCC_STATS:EnqCC_STATSSchema,
    EnqCC_NLR_SUMMARY:EnqCC_NLR_SUMMARYSchema,
    EnqCC_CustomSCORE:EnqCC_CustomSCORESchema,
    Enquiry_ID:Enquiry_IDSchema,
    CODIX:codixSchema
});

const compusacn1= { 
    username: "abc",
    '_': "password",
    repeat_password: "password",
    birth_year: 1994
   }
const schema1 = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    '_': Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    repeat_password: Joi.ref("_"),
    access_token: [Joi.string(), Joi.number()],
    birth_year: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } )
  }).with('username', 'birth_year').xor('_', 'access_token').with('_', 'repeat_password')


const xx = schema.validate(compuScan);
    console.log(xx);

