const verificationModel = require("./verification-model");
const authModel = require("./auth-model");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sender_email = process.env.my_email;
const sender_password = process.env.my_password;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: sender_email,
    pass: sender_password,
  },
});

function sendMail(email, otp) {
  var details = {
    from: sender_email,
    to: email,
    subject: `The verification code is ${otp}`,
    html: otp,
  };

  transporter.sendMail(details, function (error, data) {
    if (error) console.log(error);
    else console.log(data);
  });
}

const handleOtpSending = async (req, res) => {
  const email = req.body.userEmail;
  try {
    const prevUser = await authModel.findOne({ email });
    if (!prevUser) {
      return res.json({
        message: "Your email does not exists",
        status: 404,
        success: false,
      });
    } else {
      const otpCode = Math.floor(Math.random() * 10000 + 1);
      const otpExpiryTime = new Date().getTime() + 300 * 1000;
      const responseData = verificationModel.create({
        userEmail: email,
        verificationCode: otpCode,
        expiresIn: otpExpiryTime,
      });
      sendMail(email, otpCode);
      return res.json({
        message: "Check your email address",
        success: true,
        responseData,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: `Unable to send otp due to error ${error}`,
      success: false,
    });
  }
};

const handleChangePassword = async (req, res) => {
  const email = req.body.userEmail;
  const code = req.body.verificationCode;
  try {
    const prevUser = await verificationModel.find({ email, code });
    if (!prevUser) {
      return res.json({
        message: "No such user exists",
        status: 404,
        success: false,
      });
    } else {
      const currentTime = new Date.getTime();
      const timeInterval = prevUser.expiresIn - currentTime;
      if (timeInterval < 0) {
        return res.json({
          message: "Time to change password lapsed",
          status: 404,
          success: false,
        });
      } else {
        const currentUser = await authModel.findOne({ email });
        currentUser.userPassword = req.body.userPassword;
        currentUser.save();
        return res.json({
          message: "Password Changes Successfully",
          status: 201,
          success: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: `Unable to change password due to error ${error}`,
    });
  }
};

const express = require("express");
const otpSendingRouter = express.Router();
const passwordChangingRouter = express.Router();

otpSendingRouter.post("/verification/send-otp", handleOtpSending);
passwordChangingRouter.post(
  "/verification/change-password",
  handleChangePassword
);

module.exports = {
  otpSendingRouter: otpSendingRouter,
  passwordChangingRouter: passwordChangingRouter,
};
