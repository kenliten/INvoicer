const express = require('express');
const PouchDB = require('pouchdb');
const router = express.Router();
const jwt = require('jsonwebtoken');

const db = new PouchDB('users');

// db.put({
//   _id: "1",
//   name: "Otoniel Reyes Galay",
//   username: "kenliten",
//   password: "oly1029",
//   email: "otonielreyesgalay@gmail.com"
// });

function logger(req, res, next) {
  console.log(req.body);
  next();
}

router.get('/', async function(req, res) {
  await db.allDocs({include_docs: true})
    .then(function(result) {
      res.json(result.rows.map(row => {
          return {
            name: row.doc.name,
            username: row.doc.username,
            email: row.doc.email
          }
        }));
    })
    .catch(err => {
      res.json([{success: false, error: err}]);
    });
});

router.get('/:id', async function(req, res) {
  await db.allDocs({include_docs: true})
    .then(function(result) {
      res.json(result.rows
        .filter(row => row.doc._id == req.params['id'])
        .map(row => {
          return {
            name: row.doc.name,
            username: row.doc.username,
            email: row.doc.email
          }
        }));
    })
    .catch(err => {
      res.json([{success: false, error: err}]);
    });
});

router.post('/', logger, async function(req, res) {
  await db.allDocs({include_docs: true})
    .then(function(result) {
      let docs = result.rows.map(row => row.doc);
      if (docs.filter(doc => doc.username == req.body.username)) {
        if (docs.filter(doc => doc.email == req.body.email)) {
          res.json([
            {
              success: false,
              error: 'The provided username or email already exists'
            }
          ]);
        }
      }
      let id = docs.length > 0 ? Math.max(...docs.map(doc => doc._id)) + 1 : 1;
      let user = req.body;
      user._id = "" + id;

      db.put(user)
        .then(function(result) {
          res.json(result);
        })
        .catch(err => {
          res.json([{success: false, error: err}]);
        });
    })
    .catch(err => {
      res.json([{success: false, error: err}]);
    });
});

router.post('/login', logger, async function(req, res) {
  await db.allDocs({include_docs: true})
    .then(docs => {
      docs.rows.forEach(row => {
        if (row.doc.username == req.body.username) {
          if (row.doc.password == req.body.password) {
            const data = {
              name: row.doc.name,
              username: row.doc.username,
              email: row.doc.email
            };
            res.json({status: 1, 
              data,
              token: jwt.sign({data}, 'secret')
            })
          } else {
            throw new Error('Incorrect password');
          }
        }
      });
      return new Error('User not found');
    })
    .catch(err => {
      res.json({success: false, error: err});
    })
});

router.put('/:id', logger, async function(req, res) {
  await db.get(req.params['id'])
    .then(doc => {
      doc.name = req.body.name;
      doc.email = req.body.email;
      doc.username = req.body.username;
      doc.password = req.body.password;
      return doc;
    })
    .then(doc => {
      db.put(doc)
        .then(result => {
          res.json({
            name: result.name,
            username: result.username,
            email: result.email
          });
        })
        .catch(err => {
          res.json([{success: false, error: err}]);
        })
    })
    .catch(err => {
      res.json([{success: false, error: err}]);
    });
});

router.delete('/:id', async function(req, res) {
  await db.get(req.params['id'])
    .then(doc => {
      db.delete(doc)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.json([{success: false, error: err}]);
        })
    })
    .catch(err => {
      res.json([{success: false, error: err}]);
    });
});

module.exports = router;
