var express = require("express");
var router = express.Router();
const sql = require("mysql2");

router.get("/", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) console.log(err);

    let sql = `SELECT * FROM todos`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) console.log(err);

      console.log("result", result);
      res.json(result);
    });
  });
});

router.post("/add", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) console.log(err);

    console.log("req.body", req.body);

    let sql = `INSERT INTO todos (task, completed) VALUES ('${req.body.task}', ${req.body.completed})`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) console.log(err);

      console.log("result", result);
      res.send(result);
    });
  });
});

router.delete("/delete/:id", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) console.log(err);

    console.log("req.body", req.body);

    let sql = `DELETE FROM todos WHERE id = ${req.params.id}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) console.log(err);

      console.log("result", result);
      res.send(result);
    });
  });
});

router.put("/update/:id", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) console.log(err);

    console.log("req.body", req.body);

    let sql = `UPDATE todos SET completed = ${req.body.completed} WHERE id = ${req.params.id}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) console.log(err);

      console.log("result", result);

      res.send(result);
    });
  });
});

module.exports = router;
