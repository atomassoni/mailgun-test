var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/messages', function(req, res) {
  res.send("good");
});

module.exports = router;
