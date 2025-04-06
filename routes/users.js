var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('backendb');

/* GET a user with a specific ID*/
router.get('/', function(req, res, next) {

  if(req.query.id) {
    const stmt = db.prepare("SELECT * FROM Users WHERE ID=?");
    stmt.all([req.query.id], (err, rows) => {
      res.status(200).json(rows);
    });

  } else if(req.query.name) {
    const stmt = db.prepare("SELECT * FROM Users WHERE Username=?");
    stmt.all([req.query.name], (err, rows) => {
      res.status(200).json(rows);
    });

  } else {
    const stmt = db.prepare("SELECT * FROM Users");
    stmt.all((err, rows) => {
      res.status(200).json({users: rows});
    });
  }
});

/* Create a user */
router.post('/new', function(req, res, next) {
  if(req.body.Username != null) {

    const stmt = db.prepare("INSERT INTO Users (Username) VALUES (?)");
    stmt.run([req.body.Username]);
    res.json({err: "Created New User"});

  } else {
    res.json({err: "No username specified"});
  }
});

/* Change a user's name */
router.put('/edit', function(req, res, next) {
  if(req.body.Username != null && req.query.id != null) {

    const stmt = db.prepare("SELECT * FROM Users WHERE ID=?");
    stmt.get([req.query.id], (err, row) => {
      if(row == null) {
        res.status(404).json({err: "No user with that ID"});
      } else {
        db.run("UPDATE Users SET Username=? WHERE ID=?", [req.body.Username, req.query.id])

        res.json({err: "Successfully Updated Username"});
      }
    });

  } else {
    res.json({err: "Invalid Request"});
  }
});


// Delete a User
router.delete('/', function(req, res, next) {

  let id = req.query.id;

  if(id != null) {

    const stmt = db.prepare("SELECT * FROM Users WHERE ID=?");
    stmt.get([id], (err, row) => {
      if(row == null) {
        res.status(404).json({err: "No user with that ID"});
      } else {
        db.serialize(() => {
          db.run("DELETE FROM Users WHERE ID=?", [id]);
          db.run("Delete From Likes WHERE Liker=?", [id]);
          res.json({err: "Deleted User"});
        });
      }
    });

  } else {
    res.json({err: "Invalid Request"});
  }
});

module.exports = router;
