// login check and permission check
module.exports = (role = null) => {
    return async (req, res, next) => {
        try{
            next()
        }catch(exception){
            next({code: 401, message: exception.message, status: "AUTH_ERR"})
        }
    }
}