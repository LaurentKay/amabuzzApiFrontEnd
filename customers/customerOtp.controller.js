const axios = require('axios');
const express = require('express');
customerOtpservice = require('./customerOtp.service');
const router = express.Router();

//routes
router.post('/otpDetails', getSendOtp);

async function getSendOtp(req, res, next){
    const OTP = between(10000,99999);
    //Check for excessive requests for this number (more than 2 request in a 24hr period)
    //if(customerOtp.service.numRequestLast24h(req.body.RSAIDNumber) < 2){
        req.body.otp = OTP;
        req.body.SMSSentID = 'incomplete';
        customerOtpservice.save(req, OTP);
        const ToMSISDN = "27" + req.body.mobileNumber.slice(1, 10);
        const text=`Your One Time Pin (OTP) code is: ${OTP}. Kind Regards, Intellicell.`;
        console.log('Message to numner: ', text, ToMSISDN, req.body);
        const uri = `https://blds2.panaceamobile.com/json?action=message_send&username=intelicell&password=casino&to=${ToMSISDN}&text=${text}`;
        try{
            const {data} = await axios.get(uri);
            console.log('Sms Data before if: ', data);
            if(data.message === "Sent"){
                const SMSSentID = data.details;
                console.log('Sms Data: ', data);
                //update the db
                customerOtpservice.update(req.body.RSAIDNumber, SMSSentID);
                res.send({OTP:OTP, message:'sent'});
            }else{
                res.send({OTP:'', message:'There was an error sending your One Time Pin code, please try again.'});
            }
        }catch(e){
            console.log('Error: ', e.message);
            res.send({OTP:'', message:e.message});
        }
    // }else{
    //    res.send({OTP:'', message:'We have received too many OTP request for this number'}) 
    // }
}

function between(min, max){
    return Math.floor(
        Math.random() * (max-min) + min
    );
}
module.exports = router;