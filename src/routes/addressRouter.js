const router = require("express").Router();
const { addressController } = require("../app/controller/index");


router.post("/add", addressController.addAddress);
router.get("/:id/all", addressController.getAddressWithUserID);
router.get("/all", addressController.getAllAddress);
router.delete("/:id", addressController.deleteAddressByIDRequest);
router.get("/", addressController.index);


module.exports = router;



































