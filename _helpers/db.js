const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    RefreshToken: require('accounts/refresh-token.model'),
    Customer: require('customers/customers.model'),
    CustomerHistory: require('customers/customersHistory.model'),
    Compuscan: require('compuscan/compuscans.model'),
    CompusanAnswerSave: require('compuscan/compuscanAnswerSave.model'),
    compuscanHistory: require('compuscan/compuscanHistory.model'),
    CustomerSignature: require('customers/customerSignature.model'),
    ApplicationMessage: require('customers/applicationCompleted.model'),
    AffordabilityQuestions: require('systemConfig/affordabilityQuestions.model'),
    WorkflowNameConfig: require('globalConfig/workflowNameConfig.model'),
    PoolConfig: require('globalConfig/poolConfig.model'),
    WorkflowConfig: require('globalConfig/workflowConfig.model'),
    Roles: require('roles/roles.model'),
    Customerincorrectanswers: require('customers/customerVerification.model'),
    CustomerLogin: require('customers/customerlogin.model'),
    PrequalifiedIDS: require('customers/prequalifiedids.model'),
    Questions: require('questions/questions.model'),
    truID: require('truID/truID.model'),
    CallBacks: require('customers/customerCallback.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
