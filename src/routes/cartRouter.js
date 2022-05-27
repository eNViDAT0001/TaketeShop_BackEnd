const router = require("express").Router();
const { cartController } = require("../app/controller/index");


router.post("/add", cartController.addCart);
router.post("/item/add", cartController.addCartItem);
router.delete("/:id", cartController.deleteCartByIDRequest);
router.delete("/item/:id", cartController.deleteCartItemsByIDRequest);
router.patch("/:id", cartController.updateCartByIDRequest);
router.patch("/item/:id", cartController.updateCartByIDRequest);
router.get("/all", cartController.getAllCart);
router.get("/item/all/user/:id", cartController.getCartItemsWithUserID);
router.get("/item/all/:id", cartController.getCartItemsByCartID);
router.get("/", cartController.index);


module.exports = router;
