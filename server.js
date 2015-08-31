/// When the app starts


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('lodash');

var dbConfig = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'sqltest',
    database: 'rrapp',
    charset: 'utf8'
  }
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.set('bookshelf', bookshelf);

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// elsewhere, to use the bookshelf client:
var bookshelf = app.get('bookshelf');

// {our model definition code goes here}
var Race = bookshelf.Model.extend({
  tableName: 'races'
})

var router = express.Router();

var Races = bookshelf.Collection.extend({
  model: Race
});

router.route('/races')
  // fetch all users
  .get(function (req, res) {
    Races.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // create a user
  .post(function (req, res) {
    Race.forge({
      racer: req.body.racer,
      raceid: req.body.raceid,
      track: req.body.track
    })
    .save()
    .then(function (user) {
      res.json({error: false, data: {id: user.get('id')}});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    }); 
  });

  router.route('/races/:raceid')
  // fetch user
  .get(function (req, res) {
    Race.forge({raceid: req.params.raceid})
    .fetch()
    .then(function (race) {
      if (!race) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: race.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Race.forge({raceid: req.params.raceid})
    .fetch({require: true})
    .then(function (race) {
      race.save({
        raceid: req.body.raceid || race.get('raceid'),
        racer: req.body.race || race.get('racer'),
        track: req.body.track || race.get('track')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Race details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })


app.use('/api', router);

app.listen(8888, function() {
  console.log('Express started at port 8888');
});