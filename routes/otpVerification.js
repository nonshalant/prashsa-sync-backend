const express = require("express");
const twilio = require("twilio");

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

router.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    await client.verify.v2
      .services(process.env.TWILIO_OTP_VERIFICATION_SERIVCE_ID)
      .verifications.create({ to: phoneNumber, channel: "sms" })
      .then((verification) => console.log(verification.sid));
    req.session.otp = otp;
    res.status(200).send("OTP sent successfully");
  } catch (error) {
    res.status(500).send("Error sending OTP");
  }
});

router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  if (req.session.otp === otp) {
    res.status(200).send("OTP verified successfully");
  } else {
    res.status(400).send("Invalid OTP");
  }
});

module.exports = router;
