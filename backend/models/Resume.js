import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    roleTitle: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Resume', resumeSchema);
