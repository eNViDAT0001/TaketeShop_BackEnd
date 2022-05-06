const SQLpool = require("../../database/connectSQL");

class BannerController {
  index(req, res, next) {
    res.send("Banner controller....");
  }

  async getAllBanner(req, res) {
    try {
      var command = "SELECT * from Banner";
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

  async updateBannerByIDRequest(req, res) {
    const field = req.query.field;
    const value = req.query.value;
    const bannerID = req.params.id;

    try {
      var command =
        "UPDATE `Banner` SET `" +
        field +
        "` = '" +
        value +
        "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
        bannerID;
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
  async deleteBannerByIDRequest(req, res) {
    const { bannerID } = req.body;

    try {
      var command = "DELETE FROM Banner WHERE `Banner`.`id` = " + bannerID;
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

  async addBanner(req, res) {
    try {
      var { title, discount, image, endTime } = req.body;
      var command =
        "INSERT INTO `Banner` (`id`, `title`, `discount`, `image`, `endTime`, `create_time`, `update_time`) VALUES (NULL, '" +
        title +
        "', '" +
        discount +
        "', '" +
        image +
        "', '" +
        endTime +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Banner Success");
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

module.exports = new BannerController();
