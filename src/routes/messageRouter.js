const router = require("express").Router();
const { messagerController } = require("../app/controller/index");

router.get('/',chanelController.getAllMessager)
router.get('/product/:id', chanelController.getMessagerByIdProduct)
router.post('/',chanelController.addMessager)

router.patch('/:id',chanelController.setMessager)
router.delete('/:id',chanelController.deleteMessagerFromId)

module.exports = router;
