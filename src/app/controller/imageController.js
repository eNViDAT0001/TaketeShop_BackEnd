const SQLpool = require("../../database/connectSQL");

class ImageController {
  index(req, res, next) {
    res.send("Image controller....");
  }

  async getAllImage(req, res) {
    try {
      var command = "SELECT * from Image";
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

  async updateImageByIDRequest(req, res) {
    const field = req.query.field;
    const value = req.query.value;
    const ImageID = req.params.id;

    try {
      var command =
        "UPDATE `Image` SET `" +
        field +
        "` = '" +
        value +
        "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
        ImageID;
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
  async deleteImageByIDRequest(req, res) {
    const { ImageID } = req.body;

    try {
      var command = "DELETE FROM Image WHERE `Image`.`id` = " + ImageID;
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

  async addImage(req, res) {
    try {
      var { title, discount, image, endTime } = req.body;
      var command =
        "INSERT INTO `Image` (`id`, `title`, `discount`, `image`, `endTime`, `create_time`, `update_time`) VALUES (NULL, '" +
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
        console.log("Add Image Success");
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

module.exports = new ImageController();
