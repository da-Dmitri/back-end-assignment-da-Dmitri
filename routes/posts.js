var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('backendb');

/* GET a user with a specific ID*/
router.get('/', function(req, res, next) {

  if(req.query.id) {
    const stmt = db.prepare("SELECT * FROM Posts WHERE ID=?");
    stmt.all([req.query.id], (err, rows) => {
      res.status(200).json(rows);
  });

  } else {
    const stmt = db.prepare("SELECT * FROM Posts");
    stmt.all((err, rows) => {
      res.status(200).json({users: rows});
    });
  }
});

/* Create a new Post */
router.post('/', function(req, res, next) {

  [user, content] = [req.body.as, req.body.content]

  if(user != null && content != null) {

    const stmt = db.prepare("INSERT into Posts (Content, Poster) VALUES (? , ?)")
    stmt.run([content, user])
    res.json({err: "Created New Post"});

  } else {
    res.json({err: "Invalid Post"});
  }
});

/* Edit a Post */
router.put('/', function(req, res, next) {

  [id, newContent] = [req.query.id, req.body.content]; 

  if(id != null && content != null) {

    const stmt = db.prepare("SELECT * FROM Users WHERE ID=?");
    stmt.all([req.query.id], (err, rows) => {
      if(rows == null) {
        res.status(404).json({err: "No Post with that ID"});
      } else {
        db.run("UPDATE Posts SET Content=? WHERE ID=?", [newContent, id])

        res.json({err: "Successfully Updated Post"});
      }
    });

  } else {
    res.json({err: "Invalid Request"});
  }
});


// Delete a Post
router.delete('/', function(req, res, next) {

  let id = req.query.id;

  if(id != null) {

    const stmt = db.prepare("SELECT * FROM Posts WHERE ID=?");
    stmt.all([id], (err, rows) => {
      if(rows == null) {
        res.status(404).json({err: "No Post with that ID"});
      } else {
        db.serialize(() => {
          db.run("DELETE FROM Posts WHERE ID=?", [id]);
          db.run("DELETE From Likes WHERE Liked=?", [id]);
          res.json({err: "Deleted User"});
        });
      }
    });

  } else {
    res.json({err: "Invalid Request"});
  }
});

module.exports = router;
