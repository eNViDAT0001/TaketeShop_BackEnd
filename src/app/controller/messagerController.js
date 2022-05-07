const messagerSchema = require('../models/messagerModel')
const chanelSchema = require('../models/chanelModel')
class messagerController {
    //Ham lay du lieu tu database
    async getAllMessager(req, res, next) {
        try {
            const messages = await messagerSchema.find()
                .populate()
            res.send(messages);
            console.log("get all messgager susscess")
        }
        catch (err) {
            res.send('Error' + err)
        }
    }

    async getAllMessagerFromChanelId(req, res) {
        const chanelId = req.params.chanelId;
        try {
            const messages = await messagerSchema.find({ chanelId: chanelId })
                .populate()
            res.send(messages);
            console.log("get messgager from chanelId susscess")

        } catch (err) {
            res.send('Error' + err)
        }
    }

    async getMessagerFromUserId(req, res) {
        const userId = req.params.userId
        try {
            const messages = await messagerSchema.find({ userId: userId })
                .populate()
            res.send(messages);

        } catch (err) {
            res.send('Error' + err)
        }
    }

    async addMessager(req, res) {
        const questions = await new messagerSchema({
            chanelId: req.body.chanelId,
            userId: req.body.userId,
            text: req.body.text,
            isStaff: req.body.isStaff,
           // createAt: req.body.createAt,
        })
        try {
            const temp = await questions.save()
            res.json(temp)
            console.log("add messgager from userId susscess")
        } catch (err) {
            res.send('Error' + err)
        }
    }
    // async addMessager(req, res) {             
    //     const messages = await new messagerSchema({
    //         chanelId: req.body.chanelId,
    //         userId: req.body.userId,
    //         text: req.body.text,
    //         isStaff: req.body.isStaff,
    //         createAt : req.body.createAt,
    //     })
    //     try {
    //         const temp = await messages.save()
    //         res.json(temp)
    //         console.log("add messgager from userId susscess")
    //     } catch (err) {
    //         res.send('Error' + err)
    //     }
    // }

    async deleteMessagerFromId(req, res) {
        const _id = req.params.id
        try {
            const user = await messagerSchema.findByIdAndDelete(_id)
            res.send(user)
        } catch (err) {
            throw new Error(err)
        }
    }


}
module.exports = new messagerController

