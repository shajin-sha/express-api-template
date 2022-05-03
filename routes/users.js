var express = require("express");
var router = express.Router();
// Default UserSchema to work with mongodb
var UserSchema = require("../db/models/user");

// Router /add - add new user to database.
// With given information, name, age, location, date.
// Note - This is an post req.
router.post("/add", async (req, res) => {
  const user = new UserSchema({
    name: req.body.name,
    age: req.body.age,
    location: req.body.location,
    date: req.body.date,
  });
  // Try to save user schema.
  // If user missed any data it will throw an error.
  try {
    const newUser = await user.save();
    // status code 201 created new object in database.
    res.status(201).json(newUser);
    // Successfully created new user in database. Return added user object to clint side.
  } catch (error) {
    // Throw an error.
    res.status(500).json(error._message+`, path ${error.errors.name.path} is ${error.errors.name.kind}`);
  }
});
// Router - /get get all users in database.
// If query name is passed form clint side perform a search in database
// else return all users in database.
router.get("/get", async (req, res) => {
  // Get all users is true by default.
  // When it become false we can perform a search in database.
  let getAll = true;
  // intitling name.
  let name;
  // checking that the query name is passed from clint side.
  //  work accordingly, as commented.
  if (req.query.name) {
    getAll = false;
    name = req.query.name;
  }
  try {
    if (getAll === true) {
      // Return all users in database.
      const users = await UserSchema.find();
      // Status code 200 - ok. 
      // Send in reverse oder, newest first.
      res.status(200).json(users.reverse());
    } else {
      // Perform a search in database.
      const users = await UserSchema.findOne({ name: name });
      // Status code 200 - ok. 
      // Send one user with queried name.
      // it can be Null if no user present in database with queried name.
      res.status(200).json(users);
    }
  } catch (error) {
    // Error
    res.status(500).json(error._message);
  }
});
module.exports = router;