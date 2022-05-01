const userRoute = require('./userRouter.js')
const productRoute = require('./productRouter')
const categoryRouter = require('./categoryRouter')
function route(app) {
    app.use('/user', userRoute)
    app.use('/product', productRoute)
    app.use('/category', categoryRouter)
}

module.exports = route;