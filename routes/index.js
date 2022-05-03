//  This is the root of Your API, it is also called Index.
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.json("Yeah, it is working.🎉");
});

module.exports = router;
