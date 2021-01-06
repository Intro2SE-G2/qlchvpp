const multer = require("multer");
const path = require("path");
// Multer config


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/product_img/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({storage:storage,fileFilter:fileFilter});



