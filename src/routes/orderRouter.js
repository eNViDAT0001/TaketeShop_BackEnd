const router = require("express").Router();
const { orderController } = require("../app/controller/index");


router.post("/add", orderController.addOrder);
router.post("/item/add", orderController.addOrderItem);
router.post("/item/user/:id", orderController.addOrderItemsByLastOrderIDWithUserID);
router.patch("/update/:id", orderController.updateOrderByIDRequest);
router.patch("/item/update/:id", orderController.updateOrderItemsByIDRequest);
router.delete("/:id", orderController.deleteOrderByIDRequest);
router.delete("/item/:id", orderController.deleteOrderItemByIDRequest);
router.get("/all", orderController.getAllOrder);
router.get("/item/all", orderController.getAllOrderItems);
router.get("/user/:id", orderController.getOrderWithUserID);
router.get("/item/order/:id", orderController.getOrderItemsByOrderID);
router.get("/item/user/:id", orderController.getOrderItemsWithUserID);
router.get("/", orderController.index);


module.exports = router;
