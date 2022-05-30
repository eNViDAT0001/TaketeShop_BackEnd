const { authService } = require("../services");
const { authValidation } = require("../validations");
const { setConvertSQL } = require("../../ulti/ulti");
const SQLpool = require("../../database/connectSQL");
const GET_ALL_PRODUCT_DETAIL = (field, value) =>
  "SELECT " +
  "result.*, " +
  "CONVERT(IF (SUM(OrderItems.quantity) IS null, 0, SUM(OrderItems.quantity)), UNSIGNED) AS sold " +
  "FROM ( " +
  "SELECT " +
  "Product.create_time, " +
  "Product.update_time, " +
  "Product.id, " +
  "Product.category_id as category_id, " +
  "Product.user_id, " +
  "Product.unit_id, " +
  "Product.name, " +
  "Category.name as category_name, " +
  "Product.descriptions, " +
  "Product.price, " +
  "Product.quantity, " +
  "Product.discount, " +
  "Unit.name as unit, " +
  'GROUP_CONCAT(CONCAT(ProductImage.id," "), CONCAT(ProductImage.image_path)) as images ' +
  "FROM Product " +
  "JOIN Category ON Product.category_id = Category.id " +
  "JOIN ProductImage ON ProductImage.product_id = Product.id " +
  "JOIN Unit ON Product.unit_id = Unit.id GROUP by ProductImage.product_id) result " +
  "LEFT JOIN OrderItems ON OrderItems.product_id = result.id " +
  (field ? (`WHERE result.${field}` + "=" + `'${value}'`) : "") +
  " " +
  "GROUP by result.id " +
  "ORDER BY result.id asc ";

class ProductController {
  index(req, res, next) {
    res.send("Product controller....");
  }

  async getAllProduct(req, res) {
    try {
      var command = GET_ALL_PRODUCT_DETAIL();
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async getProductWithCategoryID(req, res, next) {
    try {
      const categoryID = req.params.id ;
      var command = GET_ALL_PRODUCT_DETAIL("category_id", categoryID);
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result);       
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async getProductByID(req, res) {
    try {
      var command = GET_ALL_PRODUCT_DETAIL( "id",req.params.id);
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result.length);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async deleteProductByID(req, res) {
    try {
      var command = "DELETE FROM `Product` WHERE Product.id =" + req.params.id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async updateProductByIDRequest(req, res) {
    const productID = req.params.id;
    const {
      categoryID,
      userID,
      name,
      descriptions,
      price,
      quantity,
      unitID,
      discount,
    } = req.body;
    const setCategory = setConvertSQL(categoryID, "category_id");
    const setUserID = setConvertSQL(userID, "user_id");
    const setName = setConvertSQL(name, "name");
    const setDescriptions = setConvertSQL(descriptions, "descriptions");
    const setPrice = setConvertSQL(price, "price");
    const setQuantity = setConvertSQL(quantity, "quantity");
    const setUnitID = setConvertSQL(unitID, "unit_id");
    const setDiscount = setConvertSQL(discount, "discount");

    try {
      var command =
        "UPDATE Product SET " +
        `${setCategory}${setUserID}${setName}${setDescriptions}${setPrice}${setQuantity}${setUnitID}${setDiscount}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        productID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send({
          error: false,
          msg: "Update Success",
        });
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async addProductWithoutImage(req, res, next) {
    try {
      var {
        categoryID,
        userID,
        name,
        descriptions,
        price,
        quantity,
        discount,
        unitID,
      } = req.body;
      var command =
        "INSERT INTO `Product` (`id`, `category_id`, `user_id`, `name`, `descriptions`, `price`, `quantity`, `unit_id`, `discount`, `create_time`, `update_time`) VALUES (NULL, '" +
        categoryID +
        "', '" +
        userID +
        "', '" +
        name +
        "', '" +
        descriptions +
        "', '" +
        price +
        "', '" +
        quantity +
        "', '" +
        unitID +
        "', '" +
        discount +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";

      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Product Success");
        next();
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
}

module.exports = new ProductController();
