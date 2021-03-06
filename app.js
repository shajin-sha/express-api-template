var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//Set up mongoose connection
// connect to database on all endpoints
var mongoose = require("mongoose");
// TODO mongoDB connection url should be used in .env file to safety.
var mongoDB = "mongodb://localhost:27017/users";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
// console log the error on connecting
db.on("error", (err) => console.error(err));
db.once("open", () => console.info("Connected to database."));

// view engine setup.
// Not required for api, but it helps to show error in user friendly way.
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function () {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send json error the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    statusCode: err.status || 500,
    errorStack: err.stack,
  });
});

module.exports = app;
