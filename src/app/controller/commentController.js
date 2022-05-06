const SQLpool = require("../../database/connectSQL");

class CommentController {
  index(req, res, next) {
    res.send("Comment controller....");
  }

  async getAllComment(req, res) {
    try {
      var command = "SELECT * from Comment";
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

  async getProductWithCategoryID(req, res) {
    try {
      var command =
        "SELECT * FROM `Product` WHERE category_id =" + req.query.categoryID;
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

  async updateCommentByIDRequest(req, res) {
    const field = req.query.field;
    const value = req.query.value;
    const CommentID = req.params.id;

    try {
      var command =
        "UPDATE `Comment` SET `" +
        field +
        "` = '" +
        value +
        "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
        CommentID;
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
  async deleteCommentByIDRequest(req, res) {
    const { CommentID } = req.body;

    try {
      var command = "DELETE FROM Comment WHERE `Comment`.`id` = " + CommentID;
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

  async addComment(req, res) {
    try {
      var { productID, userID, comment, rating } = req.body;
      var command =
        "INSERT INTO `Comment` (`id`, `product_id`, `user_id`, `comment`, `rating`, `create_time`, `update_time`) VALUES (NULL, '" +
        productID +
        "', '" +
        userID +
        "', '" +
        comment +
        "', '" +
        rating +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Comment Success");
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

module.exports = new CommentController();
