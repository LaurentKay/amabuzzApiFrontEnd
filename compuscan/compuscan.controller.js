const express = require('express');
const router = express.Router();
const Joi = require('joi');
const compuscanService = require('./compuscans.service');
const authorize = require('_middleware/authorize');
const {validateReques} = require('../_middleware/validate-request');
const xml2js = require('xml2js');
const request = require('request');
const fs = require('fs');
const JSZip = require('jszip');
const _ = require('lodash');

const parser = new xml2js.Parser({explicitArray: false, trim: true, stripPrefix:true});
//routes
router.post('/',   getReport, create); //createSchema //authorize(),
router.get('/:id', authorize(), getById); //
router.get('/getReportFromDB/:id',  getReportFromDB); //authorize(),
//router.get('/insertHistory/:id',  authorize(), getReport, createSchema, createHistory); //
router.post('/insertHistory',  createHistory); //

module.exports = router;

async function getReport(req, res, next){ //Identity_number, Surname, Forename, DateOfBirth, Gender, res
    const pUsrnme ='29234-1';
    const pPasswrd='juli@n';
    const DateOfBirth = req.DateOfBirth || '19820914';
    const Identity_number =req.Identity_number || req.body.Identity_number || '8209147250087';
    const Surname = req.Surname || req.body.Surname || 'Doe';
    const Forename= req.Forename || req.body.Forename || 'John';
    const Gender = req.Gender || 'M';

    //let first check if there is an recent report
    const compuscan = await compuscanService.getReportFromDB(Identity_number);
    if(!compuscan){
      console.log('1111111')
        let ret;
        //Check the db first, how old the is the entry

        //if Older than 3 the contact compuscan
        const bdt = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webServices/"><soapenv:Header/><soapenv:Body><web:DoNormalEnquiry><request><pUsrnme>${pUsrnme}</pUsrnme><pPasswrd>${pPasswrd}</pPasswrd><pVersion>1.0</pVersion><pOrigin>PROD</pOrigin><pOrigin_Version>1.0</pOrigin_Version><pInput_Format>XML</pInput_Format><pTransaction><![CDATA[<Transactions><Search_Criteria><CS_Data>Y</CS_Data><CPA_Plus_NLR_Data>Y</CPA_Plus_NLR_Data><Deeds_Data>N</Deeds_Data><Directors_Data>N</Directors_Data><Identity_number>${Identity_number}</Identity_number><Surname>${Surname}</Surname><Forename>${Forename}</Forename><Forename2/><Forename3/><Gender>${Gender}</Gender><Passport_flag>N</Passport_flag><DateOfBirth>${DateOfBirth}</DateOfBirth><Address1></Address1><Address2></Address2><Address3/><Address4/><PostalCode></PostalCode><HomeTelCode/><HomeTelNo/><WorkTelCode/><WorkTelNo/><CellTelNo/><ResultType>XHML</ResultType><RunCodix>Y</RunCodix><CodixParams/><Adrs_Mandatory>N</Adrs_Mandatory><Enq_Purpose>1</Enq_Purpose><Run_CompuScore>Y</Run_CompuScore><ClientConsent>Y</ClientConsent></Search_Criteria></Transactions>]]></pTransaction></request></web:DoNormalEnquiry></soapenv:Body></soapenv:Envelope>`;

        const bdy = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webServices/">\n\t<soapenv:Header/>\n\t<soapenv:Body>\n\t\t<web:DoNormalEnquiry>\n\t\t\t<request>\n\t\t\t\t<pUsrnme>29234-1</pUsrnme>\n\t\t\t\t<pPasswrd>juli@n</pPasswrd>\n\t\t\t\t<pVersion>1.0</pVersion>\n\t\t\t\t<pOrigin>PROD</pOrigin>\n\t\t\t\t<pOrigin_Version>1.0</pOrigin_Version>\n\t\t\t\t<pInput_Format>XML</pInput_Format>\n\t\t\t\t<pTransaction>\n\t\t\t\t\t<![CDATA[\n\t\t\t\t\t<Transactions><Search_Criteria><CS_Data>Y</CS_Data><CPA_Plus_NLR_Data>Y</CPA_Plus_NLR_Data>\n\t\t\t\t\t<Deeds_Data>N</Deeds_Data><Directors_Data>N</Directors_Data><Identity_number>8209147250087</Identity_number><Surname>Doe</Surname><Forename>John</Forename><Forename2/><Forename3/><Gender>M</Gender><Passport_flag>N</Passport_flag><DateOfBirth>19820914</DateOfBirth><Address1></Address1><Address2></Address2><Address3/><Address4/><PostalCode></PostalCode><HomeTelCode/><HomeTelNo/><WorkTelCode/><WorkTelNo/><CellTelNo/><ResultType>XHML</ResultType><RunCodix>Y</RunCodix><CodixParams/><Adrs_Mandatory>N</Adrs_Mandatory><Enq_Purpose>1</Enq_Purpose><Run_CompuScore>Y</Run_CompuScore><ClientConsent>Y</ClientConsent></Search_Criteria></Transactions>\n\t\t\t\t]]>\n\t\t\t\t</pTransaction>\n\t\t\t</request>\n\t\t</web:DoNormalEnquiry>\n\t</soapenv:Body>\n</soapenv:Envelope>';
        const options = {
            method: 'POST',
            url: 'https://webservices.compuscan.co.za/NormalSearchService',
            headers: {
            'Content-Type': 'text/xml'
            },
            body: bdt
        };
        request(options, (error, response) => {
            if (error) throw new Error(error);

            parser.parseString(response.body, (err, irt) => {
            if (err) {
                console.log(err);
            }

            const g = irt['S:Envelope']['S:Body']['ns2:DoNormalEnquiryResponse'].TransReplyClass;

            const buff = Buffer.from(g.retData, 'base64');
            //const text = buff.toString('ascii');
            const fwrite = 'enq8209147250087.zip';
            fs.writeFileSync(fwrite, buff);// => {
            fs.readFile(fwrite, (err, data) => {
                if (err) throw err;
                JSZip.loadAsync(data).then((zip) => {
                // Read the contents of the 'Hello.txt' file
                for (const [key, value] of Object.entries(zip)) {
                    if (key === 'files') {
                    for (const [keyx, valuex] of Object.entries(value)) {
                        if (keyx.endsWith('xml')) {
                        console.log(valuex.name);
                        zip.file(valuex.name).async('string').then((datax) => {
                            // data is "Hello World!"

                            parser.parseString(datax, (err, irt) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log('done');
                            //Save to db
                            irt.ROOT['customerId'] = Identity_number;
                            irt.ROOT['customerName'] = Forename;
                            irt.ROOT['customerSurname'] = Surname;
                            irt.ROOT['createDate'] = new Date(); //.toLocaleDateString('en-ZA');
                            req.body = irt;
                            //console.log(irt);
                            // console.log(irt.ROOT.CODIX.PRODUCTS.product.reasons);
                            let reason = irt.ROOT.CODIX.PRODUCTS.product.reasons;
                            let isAr = _.isArray(reason.reason);
                            if(!isAr){
                                reason = [reason.reason];
                                irt.ROOT.CODIX.PRODUCTS.product.reasons.reason = reason;
                                console.log('reason: ', reason);
                            }
                            if(irt.ROOT.EnqCC_ADDRESS?.ROW){
                                let address = irt.ROOT.EnqCC_ADDRESS.ROW;
                                isAr = _.isArray(address);
                                if(!isAr){
                                    address = [irt.ROOT.EnqCC_ADDRESS.ROW];
                                    irt.ROOT.EnqCC_ADDRESS.ROW = address;
                                }
                            }
                            if(irt.ROOT.EnqCC_PREVENQ?.ROW){
                                let prevEn = irt.ROOT.EnqCC_PREVENQ.ROW;
                                isAr = _.isArray(prevEn);
                                if(!isAr){
                                    prevEn = [irt.ROOT.EnqCC_PREVENQ.ROW];
                                    irt.ROOT.EnqCC_PREVENQ.ROW = prevEn;
                                }
                            }
                            if(irt.ROOT.EnqCC_TELEPHONE?.ROW){
                                let telphone = irt.ROOT.EnqCC_TELEPHONE.ROW;
                                isAr = _.isArray(telphone);
                                if(!isAr){
                                    telphone = [irt.ROOT.EnqCC_TELEPHONE.ROW];
                                    irt.ROOT.EnqCC_TELEPHONE.ROW = telphone;
                                }
                            }
                            if(irt.ROOT.EnqCC_PUBLIC_DEFAULTS){
                                let enqPub = irt.ROOT.EnqCC_PUBLIC_DEFAULTS.ROW;
                                isAr = _.isArray(enqPub);
                                if(!isAr){
                                    enqPub = [irt.ROOT.EnqCC_PUBLIC_DEFAULTS.ROW];
                                    irt.ROOT.EnqCC_PUBLIC_DEFAULTS.ROW = enqPub;
                                }
                            }
                            if(irt.ROOT.EnqCC_EMPLOYER){
                                let emp = irt.ROOT.EnqCC_EMPLOYER.ROW;
                                isAr = _.isArray(emp);
                                if(!isAr){
                                    emp = [irt.ROOT.EnqCC_EMPLOYER.ROW];
                                    irt.ROOT.EnqCC_EMPLOYER.ROW = emp;
                                }
                            }
                            console.log('reason1: ', reason);
                            next();
                            });
                        });
                        }
                    }
                    }
                }
                });
            });
            //});
            });
        });
    }else{
      console.log('2222222')
        res.send(compuscan);
    }
    //return ret;
}
function createSchema(req,res, next){
    //const userSchema = Joi.object().keys({
        const customerIdSchema =Joi.string();
        const customerNameSchema = Joi.string();
        const customerSurnameSchema = Joi.string();
        const createDateSchema = Joi.date();
    //});
    const dolarSchema = Joi.object().keys({
            num: Joi.string()
    });
    const rowSchema = Joi.object().keys({
        $:dolarSchema,
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
        $ :dolarSchema,
        ADDRESS_TYPE:Joi.string().allow(null, ''),
        LINE_1: Joi.string().allow(null, ''),
        LINE_2: Joi.string().allow(null, ''),
        LINE_3: Joi.string().allow(null, ''),
        LINE_4: Joi.string().allow(null, ''),
        POSTAL_CODE: Joi.string(),
        DATE_CREATED: Joi.string(),
        ADDR_DATE_CREATED: Joi.string()
    });
    const EnqCC_ADDRESSSchema = Joi.object().keys({
        ROW:rowdEnqCC_ADDRESSSchema
    });
    //
    const rowdEnqCC_DMATCHESSchema = Joi.object().keys({
            $:dolarSchema,
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
        $:dolarSchema,
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
        $:dolarSchema,
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
            $:dolarSchema,
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
            $:dolarSchema,
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
            $:dolarSchema,
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
                $:dolarSchema,
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
            $:dolarSchema,
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
            $:dolarSchema,
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
            $:dolarSchema,
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
        '_':Joi.string(),
        $:dollarSchema
    });
    const reasonsSchema = Joi.object().keys({
        reason:reasonSchema
    });
    const productSchema = Joi.object().keys({
        $:dolarSchema,
        product_description:Joi.string(),
        outcome:Joi.string(),
        reasons:reasonsSchema
    });
    const productsSchema = Joi.object().keys({product:productSchema});
    const codixSchema = Joi.object().keys({
        version:Joi.string(),
        PRODUCTS:productsSchema
    });
    const pinpointSchema = Joi.object().keys({
        ALL_PercPayments2Years:Joi.string().allow(null, ''),
        COL_NumOpenTrades:Joi.string().allow(null, ''),
        AU8_NumOpenTrades:Joi.string().allow(null, ''),
        VAP_GMIPVALUE:Joi.string().allow(null, ''),
        VAP_GMIPDISCRETIONARYINCOME:Joi.string().allow(null, '')

    })
    const rowdEnqCC_HPSchema = Joi.string().allow(null, '');
    const Enquiry_IDSchema = Joi.string().allow(null, '');
     //user:userSchema,
    const schema = Joi.object().keys({
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
        CODIX:codixSchema,
        PINPOINT:pinpointSchema,
        customerId :customerIdSchema,
        customerSurname:customerSurnameSchema,
        customerName:customerNameSchema,
        createDate:createDateSchema,
    });
    validateReques(req, next, schema);
};
function getById(req, res, next) {
    // users can get their own account and admins can get any account
    // if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    console.log('get previous report')
    let previousCompuscan = getReportFromDB(req, res, next)
    console.log('PreviousCompscan', previousCompuscan);

    compuscanService.getById(req.params.id)
        .then(compuscan => compuscan ? res.json(compuscan) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next){

    compuscanService.create(req.body)
        .then(compuscan =>res.send(compuscan))
        .catch(next);
}

function createHistory(req, res, next){
    console.log(req.body)
    compuscanService.createHistory(req.body)
        .then(compuscanHistory =>res.send(compuscanHistory))
        .catch(next);
}

//Check if the report already exists in the database and if younger than 3 months old, use the DB's data
function getReportFromDB(req, res, next)
{
    compuscanService.getReportFromDB(req.params.id)
      .then((result) => {
        // convert result into json string
        var jsonString = JSON.stringify(result);
        // convert json string back into json object
        var resultObject = JSON.parse(jsonString);

        //console.log('This is createDate:: ', resultObject.createDate);

        res.json(result);
      })
        // .then(compuscan => compuscan ? res.json(compuscan) : res.sendStatus(404))
        // .then((res) => {
        //   console.log('111:: ', res)
        // })
        .catch(next);
}
