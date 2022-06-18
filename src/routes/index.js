const userRoute = require('./userRouter.js')
const productRoute = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const addressRouter = require('./addressRouter')
const bannerRouter = require('./bannerRouter')
const discountRouter = require('./discountRouter')
const cartRouter = require('./cartRouter')
const commentRouter = require('./commentRouter')
const imageRouter = require('./imageRouter')
const orderRouter = require('./orderRouter')
const messageRouter = require('./messageRouter')
const chanelRouter = require('./chanelRouter')  
const wishlistRouter = require('./wishlistRouter')  
function route(app) {
    app.use('/user', userRoute)
    app.use('/product', productRoute)
    app.use('/address', addressRouter)
    app.use('/banner', bannerRouter)
    app.use('/discount', discountRouter)
    app.use('/category', categoryRouter)
    app.use('/cart', cartRouter)
    app.use('/comment', commentRouter)
    app.use('/image', imageRouter)
    app.use('/order', orderRouter)
    app.use('/chanel', chanelRouter)
    app.use('/message', messageRouter)
    app.use('/wishlist', wishlistRouter)
}
module.exports = route;