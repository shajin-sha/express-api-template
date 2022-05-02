var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("This is an simple express api. Go to user/add & users/get to work with.");
});

module.exports = router;
