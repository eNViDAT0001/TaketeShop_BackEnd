const router = require("express").Router();
const { messagerController } = require("../app/controller/index");

router.get('/',messagerController.getAllMessager)
router.get('/chanel/:chanelId',messagerController.getAllMessagerFromChanelId)
router.get('/:userId',messagerController.getMessagerFromUserId)
router.post('/:chanelId',messagerController.addMessager)


module.exports = router;
