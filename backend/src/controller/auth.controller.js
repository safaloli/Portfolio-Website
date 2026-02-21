class AuthController {
    createUser = async (req, res, next) => {
        try{
            res.json({
                data: req.body,
                image: req.file,
                message: "User has been registered successfully",
                status: "REGISTERED_SUCCESSFULLY"
            })
        }catch(exception){
            next({code: 500, message:"Internal Server Error", status: "REGISTERED_FAILED"})
        }
    }

    loginUser = async (req, res, next) => {
        try{
            res.json({
                data: req.body,
                message: "Login Successfully",
                status: "LOGIN_SUCCESS"
            })
        }catch(exception){
            next({code: 500, message: exception.message, status: "LOGIN_FAILED_ERR"})
        }
    }
}

module.exports = new AuthController()