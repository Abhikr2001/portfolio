import express from 'express';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // 1. Save to Database
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        // 2. Send Email via Nodemailer (Non-blocking)
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `New Portfolio Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        // Don't await this so the user doesn't experience SMTP timeouts!
        transporter.sendMail(mailOptions)
            .then(() => console.log("Email sent successfully"))
            .catch(err => console.error("Email sending failed:", err.message));
        
        res.status(201).json({ success: true, message: 'Message saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

export default router;
