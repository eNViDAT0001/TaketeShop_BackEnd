const router = require("express").Router();
const { productController } = require("../app/controller/index");


router.post("/addWthImage", productController.addProductWithoutImage);
router.patch("/update/:id", productController.updateProductByIDRequest);
router.delete("/:id", productController.deleteProductByID);
router.get("/productList", productController.getProductWithCategoryIDPagination);
router.get("/all", productController.getAllProductWithPagination);
router.get("/:id", productController.getProductByID);
router.get("/", productController.index);


module.exports = router;



































