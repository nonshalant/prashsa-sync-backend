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
    const verification = await client.verify.v2
      .services(serviceId)
      .verifications.create({ to: `+1${phoneNumber}`, channel: "sms" });

    console.log("OTP Sent. Verification SID:", verification.sid);

    res.status(200).json({
      message: "OTP sent successfully",
      sid: verification.sid,
    });
  } catch (error) {
    console.error("Twilio Error:", error);
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
});

router.post("/verify-code", async (req, res) => {
  const { phoneNumber, verificationCode } = req.body;
    req.body.accountCredentials;
  try {
    const verificationCheck = await client.verify.v2
      .services(serviceId)
      .verificationChecks.create({
        to: `+1${phoneNumber}`,
        code: verificationCode,
      });
    if (verificationCheck.status === "approved") {
      res.status(200).json({ message: "Phone number verified" });
    } else {
      res.status(400).json({ message: "Invalid verification code" });
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({ message: "Could not verify code" });
  }
});

module.exports = router;
