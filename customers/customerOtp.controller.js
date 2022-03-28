const axios = require('axios');
const express = require('express');
const customerOtpservice = require('./customerOtp.service');
const router = express.Router();

//routes
router.post('/otpDetails', getSendOtp);
router.post('/verify', getVerifyOtp);
router.post('/resendOtp', resendOtp);
router.post('/updateV', updateVerification);

async function getVerifyOtp(req, res, next){
        const OTP = between(10000,99999);
        //Check for excessive requests for this number (more than 2 request in a 24hr period)
        //if(customerOtp.service.numRequestLast24h(req.body.RSAIDNumber) < 2){
        const otpCall = await customerOtpservice.otpFind(req.body.RSAIDNumber);
        const dte = new Date();
        if(dte.getDate() - otpCall[0].dateRequested.getDate() === 0 && otpCall[0].otp.length >=3){
            res.status(201).send({OTP:[], message:'You have reach your daily limit, please try again tomorrow'});
        }else{
            let otparr1 = [...otpCall[0].otp];
            if(dte.getDate() - otpCall[0].dateRequested.getDate() >= 1 && otpCall[0].otp.length >=3){
                customerOtpservice.updateResend([], otpCall._id, req.body.RSAIDNumber);
                otparr1 = [];
            }
            //if(otpCall.SMSSentID === 'incomplete'){
                const otparr = [OTP,...otparr1];
                //otparr.push({otp:OTP});
                const result = await customerOtpservice.updateResend(otparr, otpCall._id, req.body.RSAIDNumber); //update as the record already exists
                console.log('The result ', result);
                const ToMSISDN = "27" + req.body.mobileNumber.slice(1, 10);
                const text=`Your One Time Pin (OTP) code is: ${OTP}. Kind Regards, Intellicell.`;
                //console.log('Message to numner: ', text, ToMSISDN, req.body);
                const uri = `https://blds2.panaceamobile.com/json?action=message_send&username=intelicell&password=casino&to=${ToMSISDN}&text=${text}`;
                try{
                    const {data} = await axios.get(uri);
                    console.log('Sms Data before if: ', data);
                    if(data.message === "Sent"){
                        const SMSSentID = data.details;
                        console.log('Sms Data: ', data);
                        //update the db
                        //customerOtpservice.update(req.body.RSAIDNumber, SMSSentID);
                        res.status(200).send({OTP:otparr, message:'sent', SMSSentID});
                    }else{
                        res.status(201).send({OTP:[], message:'There was an error sending your One Time Pin code, please try again.', SMSSentID:''});
                    }
                }catch(e){
                    console.log('Error: ', e.message);
                    res.status(201).send({OTP:[], message:e.message, SMSSentID:''});
                }
            //}
        }
        // req.body.otp = [OTP];
        // const ToMSISDN = "27" + req.body.mobileNumber.slice(1, 10);
        // const text=`Your One Time Pin (OTP) code is: ${OTP}. Kind Regards, Intellicell.`;
        // console.log('Message to numner: ', text, ToMSISDN, req.body);
        // const uri = `https://blds2.panaceamobile.com/json?action=message_send&username=intelicell&password=casino&to=${ToMSISDN}&text=${text}`;
        // try{
        //     const {data} = await axios.get(uri);
        //     console.log('Sms Data before if: ', data);
        //     if(data.message === "Sent"){
        //         const SMSSentID = data.details;
        //         console.log('Sms Data: ', data);
        //         //update the db
        //         customerOtpservice.updateRegistered(req.body.callbackID, SMSSentID, OTP);
        //         res.send({OTP:OTP, message:'sent'});
        //     }else{
        //         res.status(200).send({OTP:'', message:'There was an error sending your One Time Pin code, please try again.'});
        //     }
        // }catch(e){
        //     console.log('Error: ', e.message);
        //     res.status(401).send({OTP:'', message:e.message});
        // }
}
async function getSendOtp(req, res, next){
    const OTP = between(10000,99999);
    //Check for excessive requests for this number (more than 2 request in a 24hr period)
    //if(customerOtp.service.numRequestLast24h(req.body.RSAIDNumber) < 2){
        req.body.otp = OTP;
        req.body.SMSSentID = 'incomplete';
        customerOtpservice.save(req.body, OTP);
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
                //customerOtpservice.update(req.body.RSAIDNumber, SMSSentID);
                res.send({OTP:OTP, message:'sent', SMSSentID});
            }else{
                res.status(200).send({OTP:'', message:'There was an error sending your One Time Pin code, please try again.', SMSSentID:''});
            }
        }catch(e){
            console.log('Error: ', e.message);
            res.status(401).send({OTP:'', message:e.message, SMSSentID:''});
        }
    // }else{
    //    res.send({OTP:'', message:'We have received too many OTP request for this number'}) 
    // }
}
async function resendOtp(req, res, next){
    const OTP = between(10000,99999);
    //console.log('The body ', req.body);
    //Check for excessive requests for this number (more than 2 request in a 24hr period)
    //if(customerOtp.service.numRequestLast24h(req.body.RSAIDNumber) < 2){
        const otpCall = await customerOtpservice.otpFind(req.body.RSAIDNumber);
        const dte = new Date();
        console.log('Days ', dte.getDate() - otpCall[0].dateRequested.getDate());
        if(dte.getDate() - otpCall[0].dateRequested.getDate() === 0 && otpCall[0].otp.length >=3){
            res.status(201).send({OTP:[], message:'You have reach your daily limit, please try again tomorrow'});
        }else{
            let otparr1 = [...otpCall[0].otp];
            if(dte.getDate() - otpCall[0].dateRequested.getDate() >= 1 && otpCall[0].otp.length >=3){
                customerOtpservice.updateResend([], otpCall._id, req.body.RSAIDNumber);
                otparr1 = [];
            }
            //if(otpCall.SMSSentID === 'incomplete'){
                const otparr = [OTP,...otparr1];
                // const otparr = otpCall.otpArr;
                // otparr.push({otp:OTP});
                customerOtpservice.updateResend(otparr, otpCall._id, req.body.RSAIDNumber); //update as the record already exists
                const ToMSISDN = "27" + req.body.mobileNumber.slice(1, 10);
                const text=`Your One Time Pin (OTP) code is: ${OTP}. Kind Regards, Intellicell.`;
                //console.log('Message to numner: ', text, ToMSISDN, req.body);
                const uri = `https://blds2.panaceamobile.com/json?action=message_send&username=intelicell&password=casino&to=${ToMSISDN}&text=${text}`;
                try{
                    const {data} = await axios.get(uri);
                    console.log('Sms Data before if: ', data);
                    if(data.message === "Sent"){
                        const SMSSentID = data.details;
                        console.log('Sms Data: ', data);
                        //update the db
                        //customerOtpservice.update(req.body.RSAIDNumber, SMSSentID);
                        res.status(200).send({OTP:otparr, message:'sent', SMSSentID});
                    }else{
                        res.status(201).send({OTP:[], message:'There was an error sending your One Time Pin code, please try again.', SMSSentID:''});
                    }
                }catch(e){
                    console.log('Error: ', e.message);
                    res.status(201).send({OTP:[], message:e.message, SMSSentID:''});
                }
            //}
        }
    // }else{
    //    res.send({OTP:'', message:'We have received too many OTP request for this number'}) 
    // }
}
async function updateVerification(req, res){
    const RSAIDNumber = req.body.RSAIDNumber;
    const SMSSentID = req.body.SMSSentID;
    const otpVer = req.body.otpVer;
    const arrOtp = req.body.arrOtp;
    if(arrOtp.find(o => parseInt(o) === parseInt(otpVer))){
        customerOtpservice.update(RSAIDNumber, SMSSentID);
        res.status(200).send({message:'Positively Verified'});
    }else{
        res.status(201).resend({message:'Negatively Verified'});
    }
}
function between(min, max){
    return Math.floor(
        Math.random() * (max-min) + min
    );
}
module.exports = router;