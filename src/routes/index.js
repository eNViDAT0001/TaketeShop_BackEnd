const userRoute = require('./userRouter.js')
const productRoute = require('./productRouter')
const messageRouter = require('./messageRouter')
const chanelRouter = require('./chanelRouter')  
function route(app) {
    app.use('/user', userRoute)
    app.use('/product', productRoute)
    app.use('/chanel',chanelRouter)
    app.use('/message',messageRouter)
}

module.exports = route;