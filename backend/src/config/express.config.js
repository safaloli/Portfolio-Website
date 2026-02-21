const express = require('express')
const mainRouter = require('../router')
const errorHandler = require('../middleware/errorHandler.middleware')

const app = express()


// json
app.use(express.json({limit: "5mb"})) // headers

// url encoded
app.use(express.urlencoded({limit: "5mb"}))

// all routers 
app.use('/api/v1', mainRouter)

// 404 not found error 
app.use((req, res, next) => {
    next({code: 404, message: "Path not found.", status: "PATH_NOT_FOUND_ERR"})
})

// error handler middleware
app.use(errorHandler)


module.exports = app