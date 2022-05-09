const userRoute = require('./userRouter.js')
const productRoute = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const addressRouter = require('./addressRouter')
const bannerRouter = require('./bannerRouter')
const cartRouter = require('./cartRouter')
const commentRouter = require('./commentRouter')
const imageRouter = require('./imageRouter')
const orderRouter = require('./orderRouter')
function route(app) {
    app.use('/user', userRoute)
    app.use('/product', productRoute)
    app.use('/address', addressRouter)
    app.use('/banner', bannerRouter)
    app.use('/cart', cartRouter)
    app.use('/comment', commentRouter)
    app.use('/image', imageRouter)
    app.use('/order', orderRouter)
}

module.exports = route;