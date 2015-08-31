var http = require('http');

var key = 'VaeqiShEf3nbUnawWkEw';

var options = {
	host: 'aisbaltimore.clubspeedtiming.com',
	path: '/api/index.php/racers/1000002?key=' + key
}

http.get(options, function(res) {
	var finalResponse;
	res.on('data', function(chunk) {
		finalResponse += chunk;
		console.log(finalResponse);
	});
}).on('error', function(e) {
	console.log('Got error:' + e.message);
})