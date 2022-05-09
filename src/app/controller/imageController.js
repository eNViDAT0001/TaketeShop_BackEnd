const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");

class ImageController {
  index(req, res, next) {
    res.send("Image controller....");
  }

  async getAllImage(req, res) {
    const type = req.query.type + Image;
    try {
      var command = "SELECT * from " + type;
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

  async getImageByID(req, res) {
    const type = req.query.type + Image;
    try {
      var command = "SELECT * FROM " + type + " WHERE id =" + req.query.imageID;
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
    const id = req.params.id;
    const { type, imageID, imagePath, objectID } = req.body;
    const setTable = type + "Image";
    const setID = setConvertSQL(imageID, "id");
    const setPath = setConvertSQL(imagePath, "image_path");
    const setObject = setConvertSQL(objectID, `${type}_id`);
    try {
      var command = `UPDATE ${setTable} SET ${setID}${setPath}${setObject} WHERE id = ${id}`;
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
    const setTable = req.query.type + "Image";

    try {
      var command =
        "DELETE FROM Image WHERE `" + setTable + "`.`id` = " + req.params.id;
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
    const { type, imagePath, objectID } = req.body;
    const setTable = type + "Image";
    try {
      var command =
        "INSERT INTO `" +
        setTable +
        "` (`id`, `product_id`, `image_path`, `create_time`, `update_time`) VALUES (NULL, '" +
        objectID +
        "', '" +
        imagePath +
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
