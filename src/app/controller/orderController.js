const { setConvertSQL } = require("../../ulti/ulti");
const SQLpool = require("../../database/connectSQL");
class OrderController {
  index(req, res, next) {
    res.send("Order controller....");
  }

  async getAllOrder(req, res) {
    try {
      var command = "SELECT * FROM `Order`";
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
  async getAllOrderItems(req, res) {
    try {
      var command = "SELECT * FROM `OrderItems`";
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
  async getOrderItemsByOrderID(req, res) {
    try {
      var command =
        "SELECT * FROM `OrderItems` WHERE OrderItems.order_id = " +
        req.params.id;
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

  async getOrderWithUserID(req, res) {
    try {
      var command = "SELECT * FROM `Order` WHERE user_id =" + req.params.id;
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
  async getOrderItemsWithUserID(req, res) {
    try {
      var command =
        "SELECT " +
        "`OrderItems`.* " +
        "FROM " +
        "`OrderItems` " +
        "JOIN `Order` ON `OrderItems`.`order_id` = `Order`.`id` " +
        "JOIN `User` ON `Order`.`user_id` = `User`.`id` " +
        "WHERE User.id = " +
        req.params.id;
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

  async updateOrderByIDRequest(req, res) {
    const {
      userID,
      addressID,
      name,
      gender,
      phone,
      province,
      district,
      ward,
      quantity,
      totalCost,
      status,
    } = req.body;
    const OrderID = req.params.id;
    const setUserID = setConvertSQL(userID, "user_id");
    const setAddressID = setConvertSQL(addressID, "address_id");
    const setName = setConvertSQL(name, "name");
    const setGender = setConvertSQL(gender, "gender");
    const setPhone = setConvertSQL(phone, "phone");
    const setProvince = setConvertSQL(province, "province");
    const setDistrict = setConvertSQL(district, "district");
    const setWard = setConvertSQL(ward, "ward");
    const setQuantity = setConvertSQL(quantity, "quantity");
    const setTotalCost = setConvertSQL(totalCost, "total_cost");
    const setStatus = setConvertSQL(status, "status");

    try {
      var command =
        "UPDATE `Order` SET " +
        `${setUserID}${setAddressID}${setName}${setGender}${setPhone}${setProvince}${setDistrict}${setWard}${setQuantity}${setTotalCost}${setStatus}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        OrderID;
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
  async updateOrderItemsByIDRequest(req, res) {
    const {
      orderID,
      categoryID,
      productID,
      name,
      price,
      quantity,
      discount,
      image,
    } = req.body;
    const id = req.params.id;
    const setOrderID = setConvertSQL(orderID, "user_id");
    const setCategoryID = setConvertSQL(categoryID, "category_id");
    const setProductID = setConvertSQL(productID, "product_id");
    const setName = setConvertSQL(name, "name");
    const setPrice = setConvertSQL(price, "price");
    const setQuantity = setConvertSQL(quantity, "quantity");
    const setDiscount = setConvertSQL(discount, "discount");
    const setImage = setConvertSQL(image, "image");

    try {
      var command =
        "UPDATE `OrderItems` SET " +
        `${setOrderID}${setCategoryID}${setProductID}${setName}${setPrice}${setQuantity}${setDiscount}${setImage}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        id;
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
  async deleteOrderByIDRequest(req, res) {

    try {
      var command = "DELETE FROM Order WHERE `Order`.`id` = " + req.params.id;
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

  async deleteOrderItemByIDRequest(req, res) {
    const { OrderItemID } = req.body;

    try {
      var command =
        "DELETE FROM Order WHERE `OrderItems`.`id` = " + OrderItemID;
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

  async addOrder(req, res) {
    try {
      var {
        userID,
        addressID,
        name,
        gender,
        phone,
        province,
        district,
        ward,
        quantity,
        totalCost,
        status,
        payment
      } = req.body;
      var command =
        "INSERT INTO `Order` (`id`, `user_id`, `address_id`, `name`, `gender`, `phone`, `province`, `district`, `ward`, `quantity`, `total_cost`, `status`, `payment`, `create_time`, `update_time`) VALUES (NULL, '" +
        userID +
        "', '" +
        addressID +
        "', '" +
        name +
        "', '" +
        gender +
        "', '" +
        phone +
        "', '" +
        province +
        "', '" +
        district +
        "', '" +
        ward +
        "', '" +
        quantity +
        "', '" +
        totalCost +
        "', '" +
        status +
        "', '" +
        payment +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Order Success");
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async addOrderItem(req, res) {
    try {
      var {
        orderID,
        categoryID,
        productID,
        name,
        price,
        quantity,
        discount,
        image,
      } = req.body;
      var command =
        "INSERT INTO `OrderItems` (`id`, `order_id`, `category_id`, `product_id`, `name`, `price`, `quantity`, `discount`, `image`, `create_time`, `update_time`) VALUES (NULL, '" +
        orderID +
        "', '" +
        categoryID +
        "', '" +
        productID +
        "', '" +
        name +
        "', '" +
        price +
        "', '" +
        quantity +
        "', '" +
        discount +
        "', '" +
        image +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Order Success");
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

module.exports = new OrderController();
