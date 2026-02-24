const cloudinary = require('cloudinary').v2
const {CloudinaryConfig} = require('../config/app.config')
const fs = require('fs')


class CloudinaryService{
    constructor(){
        cloudinary.config({
            cloud_name: CloudinaryConfig.cloudName,
            api_key: CloudinaryConfig.apiKey,
            api_secret: CloudinaryConfig.apiSecret,
        })
    }

    async uploadSingleFile(filePath, dir="/") {
        try{
            const {public_id, secure_url} = await cloudinary.uploader.upload(filePath, {
                folder: "/portfolio_website" + dir,
                unique_filename: true,
            })

            const optimizedUrl = await cloudinary.url(public_id, {
                transformation: [
                    {fetch_format: 'auto', quality: 'auto'},
                    {crop: 'auto', gravity: 'auto', width: 500, height: 500}
                ]
            })

            return {
                publicId: public_id,
                secureUrl: secure_url,
                optimizedUrl: optimizedUrl
            }
        }catch(exception){
            throw({
                code: 500,
                message: "File upload failed in cloudinary",
                status: "CLOUDINARY_FILE_UPLOAD_ERR"
            })
        }finally{
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
            }
        }
    }

    async deleteSingleFile(publicId, type = 'image'){
        try{
            let result = null
            if(!publicId){
               console.error({
                    code: 400,
                    message: "Public Id is empty",
                    status: "PUBLIC_ID_EMPTY_ERR"
                })
            }else{
                result = await cloudinary.uploader.destroy(publicId, {
                    resource_type: type
                })
            }
            
            return result
        }catch(exception){
            throw exception
        }
    }
}

module.exports = new CloudinaryService()