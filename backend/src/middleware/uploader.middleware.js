const multer = require('multer')
const fs = require('fs')

const uploader = (type='image') => {
    const diskStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            const path = "./public/uploads"
            if(!fs.existsSync(path)){
                fs.mkdirSync(path, {recursive: true})
            }
            cb(null, path)
        },
        filename: (req, file, cb) => {
            const filename = Date.now() + "-" + file.originalname            

            cb(null, filename)
        }
    })

    let allowedExts = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'bmp', 'gif']

    if(type === 'doc'){
        allowedExts = ['docx', 'doc', 'txt', 'json', 'csv']
    }

    const fileFilter = (req, file, cb) => {
        const fileExt = file.originalname.split(".").pop()
        if(allowedExts.includes(fileExt.toLowerCase())){
            cb(null, true)
        }else{
            cb({code: 400, details: {[file.fieldname]: "File format not supported"}, message: "File upload error", status: "FILE_FORMAT_ERR"})
        }
    }

    return multer({
        storage: diskStorage,
        filter: fileFilter,
        limit: {
            fileSize: 5*1024*1024
        },
    })
}

module.exports = uploader