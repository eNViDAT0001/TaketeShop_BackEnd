const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");

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

  async getAddressWithUserID(req, res) {
    try {
      var command =
        "SELECT * FROM `Address` WHERE user_id =" + req.query.userID;
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

  async deleteAddressByIDRequest(req, res) {
    const id = req.params.id;

    try {
      var command = "DELETE FROM Address WHERE `Address`.`id` = " + id;
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
