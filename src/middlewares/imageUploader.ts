import path from 'path';
import multer from "multer";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
});


const upload = multer({
    storage,
    fileFilter(req, file, callback) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            callback(null, true)
        }
        else {
            console.log(file)
            console.log('Only jpg and png files supported')
        }
    }
});

export default upload;