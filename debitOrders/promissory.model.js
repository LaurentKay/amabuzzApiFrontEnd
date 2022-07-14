const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    allow_date_chg: {type:String} ,
    allow_max_inst: {type:String} ,
    allow_tracking: {type:String} ,
    branch_cd: {type:String} ,
    client_no: {type:String} ,
    collection_day: {type:String} ,
    create_dt: {type:String} ,
    date_adj: {type:String} ,
    first_amt: {type:String} ,
    first_dt: {type:String} ,
    guid: {type:String} ,
    id: {type:String} ,
    ifee_amt: {type:String} ,
    ifee_inst_amt: {type:String} ,
    ifee_perc: {type:String} ,
    ifee_type: {type:String} ,
    inst_adj_amt: {type:String},
    inst_adj_freq: {type:String} ,
    inst_adj_rate: {type:String},
    instalment: {type:String} ,
    loan_ref_no: {type:String} ,
    max_inst_amt: {type:String} ,
    org_cd: {type:String} ,
    pmt_cycle:{type:String} ,
    prom_type: {type:String} ,
    prom_id:{type:String},
    promissory_id: {type:String} ,
    mode:{type:String},
    reply_cd: {type:String} ,
    reply_str: {type:String} ,
    restart: {type:String},
    status: {type:String} ,
    track_cd: {type:String} ,
    value: {type:String} ,
    web_user_id: {type:String},
    machine:{type:String},
    total_amt:{type:String},
    inst_amt:{type:String},
    frequency:{type:String},
    account_type:{type:String},
    bank_acc_no:{type:String},
    bank_branch_cd:{type:String},
    pmt_stream:{type:String},
    iso_rsp_cd:{type:String},
},{collection:'promissories'});

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

module.exports = mongoose.model('promissories', schema);