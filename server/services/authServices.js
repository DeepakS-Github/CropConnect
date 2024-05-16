const sendMail = require("./mailServices");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Seller = require("../models/sellerSchema");
const User = require("../models/userSchema");
const capitalizeFirstLetter = require("../helper/capitalizeFirstLetter");

const saveAndSendVerficationToken = async (id, type) => {
  var salt = await bcrypt.genSalt(8);
  var verificationToken = await bcrypt.hash(id, salt);

  let Model = authModelSelector(type);

  const data = await Model.findById(id);

  data.verificationToken = verificationToken;
  data.verificationTokenExpiry = Date.now() + 3600000;

  await data.save();

  const verificationTokenLink = `https://localhost:5173/${type}/verify/${encodeURIComponent(
    verificationToken
  )}`;

  const mailRes = await sendMail(
    data.email,
    `Click <a href=${verificationTokenLink}>here</a> to verify your account`,
    `Verify your ${capitalizeFirstLetter(type)} account`
  );

  return mailRes;
};

const authModelSelector = (type, res) => {
  if (type === "seller") {
    return Seller;
  } else if (type === "user") {
    return User;
  } else {
    return res.status(400).send({ message: "Invalid type" });
  }
};

const generateAccessToken = (type, id) => {
  const access_token = jwt.sign({ [type]: id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return access_token;
};

module.exports = {
  saveAndSendVerficationToken,
  authModelSelector,
  generateAccessToken,
};
