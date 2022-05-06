const SQLpool = require("../../database/connectSQL");
class AddressController {
  index(req, res, next) {
    res.send("Address controller....");
  }

  async getAllAddress(req, res) {
    try {
      var command = "SELECT * from Address";
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

  async getProductWithCategoryID(req, res) {
    try {
      var command =
        "SELECT * FROM `Product` WHERE category_id =" + req.query.categoryID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result.length);
        res.send(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async updateAddressByIDRequest(req, res) {
    const field = req.query.field;
    const value = req.query.value;
    const AddressID = req.params.id;

    try {
      var command =
        "UPDATE `Address` SET `" +
        field +
        "` = '" +
        value +
        "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
        AddressID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async deleteAddressByIDRequest(req, res) {
    const { AddressID } = req.body;

    try {
      var command = "DELETE FROM Address WHERE `Address`.`id` = " + AddressID;
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

  async addAddress(req, res) {
    try {
      var {
        userID,
        phone,
        provinceID,
        districtID,
        wardID,
        street,
        fullAddress,
      } = req.body;
      var command =
        "INSERT INTO `Address` (`id`, `user_id`, `phone`, `province_id`, `district_id`, `ward_id`, `street`, `full_address`, `create_time`, `update_time`) VALUES (NULL, '" +
        userID +
        "', '" +
        phone +
        "', '" +
        provinceID +
        "', '" +
        districtID +
        "', '" +
        wardID +
        "', '" +
        street +
        "', '" +
        fullAddress +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Address Success");
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
module.exports = new AddressController();
