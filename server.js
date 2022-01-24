require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');
const fileUpload = require('express-fileupload');
//const fs = require("fs");
// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
//   app
// }
const server = require('http').createServer(app);

app.use(express.json({extended:false, limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false, parameterLimit:50000}));
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use(fileUpload({
    createParentPath:true,
    limits:{
      fileseSize: 10 * 1024 * 1024 * 1024 //20MB max file(s) size
    }
  }))

// api routes
//app.use('/accounts', require('./accounts/accounts.controller'));
//app.use('/products', require('./products/products.controller'));
//app.use('/orders', require('./orders/orders.controller'));
app.get('/', (req, res, next) =>{
  res.status(200).send('I am alive');
});
app.use('/customers', require('./customers/customers.controller'));
//app.use('/loans', require('./loans/loans.controller'));
app.use('/compuscan', require('./compuscan/compuscan.controller'));
//app.use('/promissory', require('./debitOrders/promissory.controller'));
app.use('/systemConfig', require('./systemConfig/affordabilityQuestions.controller'));
app.use('/globalConfig', require('./globalConfig/config.controller'));
app.use('/roles', require('./roles/roles.controller'));
app.use('/customerVerification', require('./customers/customerVerification.controller'));
app.use('/questions', require('./questions/questions.controller'));
app.use('/truID', require('./truID/truID.controller'));
//app.use('/debtors', require('./debtors/debtors.controller'));
app.use('/customers', require('./customers/customerOtp.controller'));
// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));

// global error handler
// app.use(errorHandler);

// start server

const port = process.env.PORT || 3000; //process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 443;


//const http = require("http").Server(app)
//const io = require("socket.io")(server)

server.listen(port, () => {
  console.log('Server listening on port ' + port);
});

// const activeUsers = new Set();
// io.on('connection', (socket) => {
//     console.log('io io its off to work i go')
//     socket.on("new_user", function (data) {
//         socket.userId = data;
//         activeUsers.add(data);
//         io.emit("new_user", [...activeUsers]);
//       });
//       app.use('/truidAmabuzzHook', require('./truID/truID.controller'));
 
// });
