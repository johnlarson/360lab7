var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getcity/', function(req, res, next) {
	var letters = req.query.q;
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
	});
});

router.get('/sum/', function(req, res, next) {
	var str_list = req.query.nums.split(',');
	var num_list = str_list.map(function(str) {
		return parseInt(str);
	});
	var sum = num_list.reduce(function(first, second) {
		return first + second;
	});
	var sum_obj = {sum: sum};
	var sum_json = JSON.stringify(sum_obj);
	var callback = req.query.callback;
	var sendable = callback  + '(' + sum_json + ')';
	res.send(sendable);
});

module.exports = router;
