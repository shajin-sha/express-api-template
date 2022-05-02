var express = require("express");
var router = express.Router();
var UserSchema = require("../models/user");

// router to add new user
router.post("/add", async (req, res) => {
  const user = new UserSchema({
    name: req.body.name,
    age: req.body.age,
    location: req.body.location,
    date: req.body.date,
  });
  try {
    // try to save user schema.
    const newUser = await user.save();
    // status code 201 created new object in database.
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.massage);
  }
});

// router to get all users
router.get("/get", async (req, res) => {
  let getAll = true;
  let name;
  if (req.query.name) {
    getAll = false;
    name = req.query.name;
  }
  try {
    if (getAll === true) {
      const users = await UserSchema.find();
      res.status(200).json(users);
    }
    else{
      console.log(name)
      const users = await UserSchema.findOne({name:name});
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
