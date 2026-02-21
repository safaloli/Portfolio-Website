module.exports = (schema) => {
    return async(req, res, next) => {
        try{
            const data = req.body
            console.log(data)
            if(!data){
                next({code: 422, message: "Empty payload...", status: "EMPTY_DATA_ERR"})
            }

            await schema.validateAsync(data, {abordEarly: false})
            next()
        }catch(exception){
            // validation failed
            console.log(exception)
            let errBag = {}
            if(exception.details){
                exception.details.map((error) => {
                    let field = error.path.pop()
                    errBag[field] = error.message
                })
            }
            next({code: 500, message: "Validation Failed", status: "VALIDATION_FAILED", details: errBag})
        }
    }
}