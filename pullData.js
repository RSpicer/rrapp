var http = require('http');

var key = 'VaeqiShEf3nbUnawWkEw';

var dbConfig = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'sqltest',
    database: 'rrapp',
    charset: 'utf8',
    debug: true
  }
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);



var csRacer = bookshelf.Model.extend({
	tableName: 'csracers'
})

var csRacers = bookshelf.Collection.extend({
	model: csRacer
})

var options = {
	host: 'aisbaltimore.clubspeedtiming.com',
	path: '/api/index.php/racers/1000002?key=' + key
}

http.get(options, function(res) {
	var finalResponse = '';
	res.on('data', function(chunk) {
		finalResponse += chunk;
		console.log(finalResponse);
		var parsed = JSON.parse(finalResponse);
		console.log(parsed);
		console.log(parsed.racer.id);
		csRacer.forge({
			racerid: parsed.racer.id,
			name: parsed.racer.name.nickname,
			rpm: parsed.racer.rpm,
			// created_at: parsed.racer.created_at,
			visits: parsed.racer.visits,
			races: parsed.racer.races		
		}).save()
		// // knex('csracers').insert({
		// 	id: parsed.racer.id,
		// 	name: parsed.racer.name.nickname,
		// 	rpm: parsed.racer.rpm,
		// 	// created_at: parsed.racer.created_at,
		// 	visits: parsed.racer.visits,
		// 	races: parsed.racer.races
		// })
	});
}).on('error', function(e) {
	console.log('Got error:' + e.message);
}).on('end', function() {
	console.log('Done!');
})