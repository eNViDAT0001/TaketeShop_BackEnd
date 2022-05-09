const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");

const GET_ALL_BANNER_DETAIL = (field, value) =>
  "SELECT " +
  "Banner.id, " +
  "Banner.title, " +
  "Banner.discount, " +
  "Banner.image, " +
  "Banner.endTime, " +
  'GROUP_CONCAT(CONCAT("{id: ",Product.id,"}")) as productID, ' +
  "Banner.create_time, Banner.update_time" +
  "FROM `Product` " +
  "JOIN `BannerDetail` ON `BannerDetail`.`product_id` = `Product`.`id` " +
  "JOIN `Banner` ON `BannerDetail`.`banner_id` = `Banner`.`id` " +
  (field ? `WHERE Comment.${field}` + "=" + `'${value}'` : "") +
  "GROUP BY BannerDetail.banner_id;";
class BannerController {
  index(req, res, next) {
    res.send("Banner controller....");
  }

  async getAllBanner(req, res) {
    try {
      var command = GET_ALL_BANNER_DETAIL();
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

  async getProductIDWithBannerID(req, res) {
    try {
      var command = GET_ALL_BANNER_DETAIL("id", req.params.id);
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
    const id = req.params.id;

    try {
      var command = "DELETE FROM Banner WHERE `Banner`.`id` = " + id;
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
        (image
          ? image
          : "https://www.englishclub.com/images/vocabulary/food/fish-seafood/fish-seafood.jpg") +
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
