const { authService } = require("../services");
const { authValidation } = require("../validations");
const SQLpool = require("../../database/connectSQL");

class ProductController {
  index(req, res, next) {
    res.send("Product controller....");
  }

  async getAllProduct(req, res) {
    try {
      var command =
        "SELECT " +
        "result.*, " +
        "CONVERT(IF (SUM(OrderItems.quantity) IS null, 0, SUM(OrderItems.quantity)), UNSIGNED) AS sold " +
        "FROM ( " +
        "SELECT " +
        "Product.create_time, " +
        "Product.update_time, " +
        "Product.id, " +
        "Product.category_id, " +
        "Product.user_id, " +
        "Product.unit_id, " +
        "Product.name, " +
        "Category.name as category_name, " +
        "Product.descriptions, " +
        "Product.price, " +
        "Product.quantity, " +
        "Product.discount, " +
        "Unit.name as unit, " +
        'GROUP_CONCAT(CONCAT("{id: ",ProductImage.id,""), CONCAT(", image: \'",ProductImage.image_path,"\'}")) as images ' +
        "FROM Product " +
        "JOIN Category ON Product.category_id = Category.id " +
        "JOIN ProductImage ON ProductImage.product_id = Product.id " +
        "JOIN Unit ON Product.unit_id = Unit.id GROUP by ProductImage.product_id) result " +
        "LEFT JOIN OrderItems ON OrderItems.product_id = result.id " +
        "GROUP by result.id " +
        "ORDER BY result.id asc;";
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
      var command =
        "SELECT * FROM `Product` WHERE category_id =" + req.query.categoryID;
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
  async getProductByID(req, res) {
    try {
      var command = "SELECT * FROM `Product` WHERE id =" + req.params.id;
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

  async updateProductByIDRequest(req, res) {
    const field = req.query.field;
    const value = req.query.value;
    const productID = req.params.id;

    try {
      var command =
        "UPDATE `Product` SET `" +
        field +
        "` = '" +
        value +
        "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
        productID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
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
