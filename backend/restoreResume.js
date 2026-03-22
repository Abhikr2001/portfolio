import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Resume from './models/Resume.js';

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const exists = await Resume.findOne({ fileName: '1773563688175.pdf' });
        if (!exists) {
            const newResume = new Resume({
                roleTitle: 'testing',
                fileName: '1773563688175.pdf',
                path: 'resumes/1773563688175.pdf'
            });
            await newResume.save();
            console.log("Restored testing resume");
        }
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
};

run();
