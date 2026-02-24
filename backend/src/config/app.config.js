require('dotenv').config()

const AppConfig = {
    port: process.env.PORT || 2000,
    frontendAppUrl: process.env.FRONTEND_APP_URL,
    backendAppUrl: process.env.BACKEND_APP_URL,
    jwtSecret: process.env.JWT_SECRET,
}

const DbConfig = {
    pg: {
        dbName: process.env.PG_DB_NAME,
        userName: process.env.PG_DB_USERNAME,
        password: process.env.PG_DB_USER_PASSWORD
    }
}

const CloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
}

module.exports = {
    AppConfig,
    DbConfig,
    CloudinaryConfig
}