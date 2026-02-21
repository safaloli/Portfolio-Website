const app = require('./src/config/express.config')
const {AppConfig} = require('./src/config/app.config') 

const PORT = AppConfig.port
app.listen(PORT, (err)=> {
    try{
        console.log("Server is running in port: ", PORT)
    }catch(exception){
        console.error("Error while running server", exception)
        throw exception
    }
})