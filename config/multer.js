const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + ''+ file.originalname)
    }
});

const singleUpload = multer({
    storage:storage,
    limits: {fileSize:1024 * 1024},

}).single('profile_pic');


module.exports = {
    singleUpload
}