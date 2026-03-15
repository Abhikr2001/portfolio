import multer from 'multer';
import path from 'path';

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, 'uploads/resumes/');
        } else if (file.fieldname === 'projectImage') {
            cb(null, 'uploads/projects/');
        } else if (file.mimetype.startsWith('image/')) {
            cb(null, 'uploads/images/');
        } else {
            cb(null, 'uploads/');
        }
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using timestamp and original extension
        const ext = path.extname(file.originalname);
        cb(null, `${String(Date.now())}${ext}`);
    }
});

// File filter to allow only PDFs or images depending on the route
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

export default upload;
