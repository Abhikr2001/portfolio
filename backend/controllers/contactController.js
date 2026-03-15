import { sendEmail } from "../services/emailService.js";

export const sendContact = async (req, res) => {

  const { name, email, message } = req.body;

  try {

    await sendEmail(name, email, message);

    res.json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });

  }

};