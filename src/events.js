const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  router.post('/event', (req, res, next) => {
    db.query(
      'INSERT INTO words (value) VALUES (?)',
      [req.body.word],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  router.get('/event', function (req, res, next) {
    db.query(
      'SELECT * FROM words',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });


  router.put('/event/:id', function (req, res, next) {
    db.query(
      'UPDATE words SET value=? WHERE id=?',
      [req.body.word, req.body.Id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/event/:id', function (req, res, next) {
    db.query(
      'DELETE FROM words WHERE id=?',
      [req.body.Id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;