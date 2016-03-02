var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getcity/', function(req, res, next) {
	console.log(req);
	var letters = req.query.q;
	console.log(letters);
	var callback = req.query.callback;
	fs.readFile('files/cities.dat.txt', function(err, data) {
		if(err) throw err;
		var cities = data.toString().split('\n');
		var re = new RegExp('^' + letters);
		var filtered = [];
		for(var i = 0; i < cities.length; i++) {
			if(re.test(cities[i])) {
				filtered.push({city: cities[i]});
			}
		}
		json = JSON.stringify(filtered);
		var body = callback + '(' + json + ')';
		res.send(body);
		console.log(body);
	});
});

module.exports = router;
