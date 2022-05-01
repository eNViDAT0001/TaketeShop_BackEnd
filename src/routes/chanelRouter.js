const router = require("express").Router();
const { chanelController } = require("../app/controller/index");

router.get('/',chanelController.getAllChanel)
router.get('/product/:id', chanelController.getChanelByIdProduct)
router.get('/:id',chanelController.findChanelFromId)
router.post('/',chanelController.addChanel)

router.patch('/:id',chanelController.setChanel)

module.exports = router;
