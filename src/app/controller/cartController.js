const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");

class CartController {
  index(req, res, next) {
    res.send("Cart controller....");
  }

  async getAllCart(req, res) {
    try {
      var command = "SELECT * from Cart";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async getCartWithUserID(req, res) {
    try {
      var command = "SELECT * FROM `Cart` WHERE user_id =" + req.params.id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result.length);
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
}
module.exports = new CartController();
