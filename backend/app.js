var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mysql = require("mysql2");

var indexRouter = require("./routes/index");
var todosRouter = require("./routes/todos");

var cors = require("cors");

var app = express();
app.use(cors());

app.locals.con = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "todo",
  password: "todo",
  database: "todo",
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/todos", todosRouter);

module.exports = app;
