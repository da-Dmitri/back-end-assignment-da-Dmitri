var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('backendb');

/* GET number of likes on a post */
router.get('/likes', function(req, res, next) {

  if(req.query.id) {
    const stmt = db.prepare("SELECT Count(*) FROM Likes WHERE Liked=?");
    stmt.get([req.query.id], (err, row) => {
      if(row != null) {
        res.status(200).json({ID: req.query.id, Likes: row});
      } else {
        res.status(404).json({err: "Unexpected API Error"})
      }
  });

  } else {
      res.json({err: "No ID Specified"});
  }
});

/* Like a post */
router.post('/like', function(req, res, next) {

  [user, post] = [req.query.as, req.query.id]

  if(user != null && content != null) {

    const stmt = db.prepare("INSERT INTO Likes (Liker, Liked) VALUES (? , ?)")
    stmt.run([user, post])
    res.json({err: "Liked a Post"});

  } else {
    res.json({err: "Invalid Post"});
  }
});

/* Like a post */
router.post('/unlike', function(req, res, next) {

  [user, post] = [req.query.as, req.query.id]

  if(user != null && content != null) {

    const stmt = db.prepare("DELETE FROM Likes WHERE Liker=? AND Liked=?")
    stmt.run([user, post])
    res.json({err: "Unliked A Post"});

  } else {
    res.json({err: "Invalid Request"});
  }
});

module.exports = router;
