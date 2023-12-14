const {getOTP} = require('../controllers/otpController')

function verifyOTP(req, res, next) {
    const userEnteredOTP = req.query.otp; 

    // Retrieve the OTP from the user's session
    const storedOTP = getOTP();
    // console.log(OTP);
    console.log(storedOTP);
  
    if (!userEnteredOTP || userEnteredOTP != storedOTP) {
      console.log("Invalid OTP");
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    console.log("OTP Verified");
    next();
  
    // OTP is valid; you can clear it from the session or database
    // delete req.session.otp;
}

module.exports= verifyOTP;