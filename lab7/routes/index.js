var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getcity/', function(req, res, next) {
	console.log(req);
	var letters = req.query.q;
	console.log(letters);
	var callback = req.query.callback;
	json = '[{"city": "placeholder"}]';
	var body = callback + '(' + json + ')';
	res.send(body);
	console.log(body);
});

module.exports = router;
