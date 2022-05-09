const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");

const GET_ALL_COMMENT_DETAIL = (field, value) =>
  "SELECT " +
  "`Comment`.`id`, " +
  "`Comment`.`product_id`, " +
  "`Comment`.`user_id`, " +
  "`Comment`.`comment`, " +
  "`Comment`.`rating`, " +
  'GROUP_CONCAT(CONCAT("{id: ",CommentImage.id,""), CONCAT(", image: \'",CommentImage.image_path,"\'}")) as images, ' +
  "`Comment`.`create_time`, " +
  "`Comment`.`update_time` " +
  "FROM `Comment` LEFT JOIN CommentImage ON `Comment`.`id` = CommentImage.comment_id " +
  (field ? `WHERE Comment.${field}` + "=" + `'${value}'` : "") +
  "GROUP BY `Comment`.id;";
class CommentController {
  index(req, res, next) {
    res.send("Comment controller....");
  }

  async getAllComment(req, res) {
    try {
      var command = GET_ALL_COMMENT_DETAIL();
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result)
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async getCommentWithProductID(req, res) {
    try {
      var command = GET_ALL_COMMENT_DETAIL("product_id", req.query.productID)
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result)
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async updateCommentByIDRequest(req, res) {
    const { productID, userID, comment, rating } = req.body;
    const CommentID = req.params.id;
    const setProductID = setConvertSQL(productID, "product_id");
    const setUserID = setConvertSQL(userID, "user_id");
    const setComment = setConvertSQL(comment, "comment");
    const setRating = setConvertSQL(rating, "rating");

    try {
      var command =
        "UPDATE `Comment` SET " +
        `${setProductID}${setUserID}${setComment}${setRating}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        CommentID;
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
