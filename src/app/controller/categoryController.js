const { authService } = require("../services");
const { authValidation } = require("../validations");
const SQLpool = require("../../database/connectSQL");

class CategoryController {
  index(req, res, next) {
    res.send("Category controller....");
  }

  async getAllCategory(req, res) {
    try {
      var command = "SELECT * FROM Category;";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      console.log("Product Error");
      console.log(err);
    }
  }

  async getCategoryByID(req, res) {
    try {
      var command = "SELECT * FROM `Category` WHERE id =" + req.params.id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result.length);
        res.send(result);
      });
    } catch (err) {
      console.log("Product Error");
      console.log(err);
    }
  }

  async updateCategoryByIDRequest(req, res) {
    const name = req.query.name;
    const image = req.query.field;
    const categoryID = req.params.id;

    try {
      var command =
        "UPDATE `Product` SET `name` = '" +
        name +
        "', `image` = '" +
        image +
        "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
        categoryID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async addCategory(req, res) {
    try {
      var { name, image } = req.body;
      var command =
        "INSERT INTO `Category` (`id`, `name`, `discount`, `image`, `create_time`, `update_time`) VALUES (NULL, '" +
        name +
        "', '0', '" +
        image +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";
      if (!image) {
        command =
          "INSERT INTO `Category` (`id`, `name`, `discount`, `image`, `create_time`, `update_time`) VALUES (NULL, '" +
          name +
          "', '0', 'https://www.englishclub.com/images/vocabulary/food/fish-seafood/fish-seafood.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";
      }

      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Category Success");
        res.send(result);
      });
    } catch (err) {
      console.log("Add Category Error: ");
      console.log(err);
    }
  }
}

module.exports = new CategoryController();
