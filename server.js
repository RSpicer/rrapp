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
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
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

app.use('/api', router);

app.listen(8888, function() {
  console.log('Express started at port 8888');
});