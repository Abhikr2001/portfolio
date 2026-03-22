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

        // 2. Send Email via Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change this to your email provider
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

        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (emailError) {
            console.error("Email sending failed:", emailError.message);
        }
        
        res.status(201).json({ success: true, message: 'Message saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

export default router;
