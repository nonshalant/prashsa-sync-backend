const express = require("express");
const twilio = require("twilio");

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_OTP_VERIFICATION_SERVICE_ID;

const client = twilio(accountSid, authToken);

router.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    await client.verify.v2
      .services(serviceId)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Twilio Error:", error);
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
});

module.exports = router;

router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  if (req.session.otp === otp) {
    res.status(200).send("OTP verified successfully");
  } else {
    res.status(400).send("Invalid OTP");
  }
});

module.exports = router;
