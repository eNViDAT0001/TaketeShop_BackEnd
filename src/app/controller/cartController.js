const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");
const GET_ALL_CART_ITEMS = (type, id) =>
  "SELECT result.*, ProductImage.image_path " +
  "FROM " +
  "(SELECT " +
  "CartItem.id as cartItemID, " +
  "Cart.id as cartID, " +
  "Product.id, " +
  "Product.name, " +
  "Product.price, " +
  "Product.discount, " +
  "SUM(CartItem.quantity) as quantity " +
  "FROM `Product` " +
  "LEFT JOIN `CartItem` ON `CartItem`.`product_id` = `Product`.`id` " +
  "INNER JOIN `Cart` ON `CartItem`.`cart_id` = `Cart`.`id` " +
  "INNER JOIN `User` ON `Cart`.`user_id` = `User`.`id` " +
  (type ? `WHERE ${type}.id` + "=" + `'${id}'` : "") +
  "GROUP BY CartItem.id ORDER BY Product.id asc) AS result " +
  "LEFT JOIN ProductImage ON ProductImage.id = result.id;";
class CartController {
  index(req, res, next) {
    res.send("Cart controller....");
  }

  async getAllCart(req, res) {
    try {
      var command = "SELECT * from Cart";
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
  async getCartItemsByCartID(req, res) {
    try {
      var command = GET_ALL_CART_ITEMS("Cart", req.params.id);
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

  async getCartItemsWithUserID(req, res) {
    try {
      var command = GET_ALL_CART_ITEMS("user", req.params.id);
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async updateCartItemByIDRequest(req, res) {
    const id = req.params.id;
    const { userID, cartID, productID, quantity } = req.body;
    const setUserID = setConvertSQL(userID, "user_id");
    const setcartID = setConvertSQL(cartID, "cart_id");
    const setProductID = setConvertSQL(productID, "product_id");
    const setQuantity = setConvertSQL(quantity, "quantity");
    try {
      var command =
        "UPDATE `CartItem` SET " +
        `${setUserID}${setcartID}${setProductID}${setQuantity}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async updateCartByIDRequest(req, res) {
    const CartID = req.params.id;
    const { userID } = req.body;
    const setUserID = setConvertSQL(userID, "user_id");
    try {
      var command =
        "UPDATE `Cart` SET " +
        `${setUserID}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        CartID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async deleteCartByIDRequest(req, res) {
    const { CartID } = req.body;

    try {
      var command = "DELETE FROM Cart WHERE `Cart`.`id` = " + CartID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async deleteCartItemsByIDRequest(req, res) {
    const { CartItemID } = req.body;

    try {
      var command =
        "DELETE FROM CartItem WHERE `CartItem`.`id` = " + CartItemID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async addCart(req, res) {
    try {
      var { userID } = req.body;
      var command =
        "INSERT INTO `Cart` (`id`, `user_id`, `create_time`, `update_time`) VALUES (NULL, '" +
        userID +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Cart Success");
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
  async addCartItem(req, res) {
    try {
      var { cartID, productID, quantity } = req.body;
      var command =
        "INSERT INTO `CartItem` (`id`, `cart_id`, `product_id`, `quantity`, `create_time`, `update_time`) VALUES (NULL, '" +
        cartID +
        "', '" +
        productID +
        "', '" +
        quantity +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Cart Success");
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
}
module.exports = new CartController();
