const { sendMail } = require('./mailController');

let OTP = 999999;

function generateOTP(req, res) {
    const userEmail = req.query.email;
    const userName = req.query.name;
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    // req.session.otp = otp;
    OTP = otp;
    console.log(`Generated OTP for user: ${otp}`);
    sendMail(userEmail, `Generated OTP: ${otp}`, userName, "CropConnect OTP Verification");
    res.status(200).send({ message: "OTP successfully sent to mail" });
}

function getOTP() {
    return OTP;
}

module.exports = { generateOTP, getOTP };
