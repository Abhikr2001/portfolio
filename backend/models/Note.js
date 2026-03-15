import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Daily Coding Notes', 'Trading Journal', 'Life Memories', 'Photo Gallery'],
    },
    content: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Note', noteSchema);
