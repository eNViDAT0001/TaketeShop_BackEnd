const router = require("express").Router();
const { chanelController } = require("../app/controller/index");

router.get('/',chanelController.getAllMessager)
router.get('/product/:id', chanelController.getMessagerByIdProduct)
router.get('/:id',chanelController.findMessagerFromId)
router.post('/',chanelController.addMessager)

router.patch('/:id',chanelController.setMessager)
router.delete('/:id',chanelController.deleteMessagerFromId)

module.exports = router;
