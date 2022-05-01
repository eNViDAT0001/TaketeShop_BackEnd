const chanelSchema = require('../models/messagerModel')

class MessagerCotroller {
        //Ham lay du lieu tu database
    async getAllMessager(req, res, next) {
        try {
            const question = await questionSchema.find().populate({
                path:'userId',
                select:'nameAccount'
            },)
            res.send(question)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }
    async addMessager(req, res) {
        const questions = await new questionSchema({
            productId: req.body.productId,
            userId: req.body.userId,
            question: req.body.question,
        })
        try {
            const temp = await questions.save()
            res.json(temp)
        } catch (err) {
            res.send('Error' + err)
        }
    }

    async setMessager(req,res){
        try{
            const _id = req.params.id;
            const updateField = await questionSchema.findByIdAndUpdate(_id,req.body)
            res.send(updateField)
        }
        catch(err)
        {
            res.send('error' + err)
        }
    }
    
    async deleteMessagerFromId(req,res){
        const _id = req.params.id
        try{
        const user = await questionSchema.findByIdAndDelete(_id)
        res.send(user)
        }catch(err)
        {
            throw new Error(err)
        }
    }
   
    async getMessagerByIdProduct(req, res, next) {
        try {
            const _id = req.params.id;
            const findQuestion = await questionSchema.find({ "productId": _id }).populate({
                path: 'userId',
                select: 'nameAccount'
            })
            res.send(findQuestion)
        } catch (err) {
            throw new Error(err)
        }
    }

    
    async findMessagerFromId(req,res){
        const _id = req.params.id
        try{
        const question = await questionSchema.findById(_id)
        res.send(question)
        }catch(err)
        {
            throw new Error(err)
        }
    }
}
module.exports = new MessagerCotroller