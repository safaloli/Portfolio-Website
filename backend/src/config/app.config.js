require('dotenv').config()

const AppConfig = {
    port: process.env.PORT || 2000,
    appUrl: process.env.APP_URL,
}

module.exports = {
    AppConfig,
}