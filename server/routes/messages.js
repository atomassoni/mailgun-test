var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var request = require('request');
var domain = process.env.MAILGUN_DOMAIN || 'sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org';
var key = process.env.MAILGUN_API_KEY || 'key-e8598fe5ada73e92e6f692b19e43f14f';
var mailgun = require('mailgun-js')({apiKey: key , domain: domain});

//sends an email
router.post('/', function(req, res, next) {

  app.post('/webhooks/mailgun/*', function (req, res, next) {
      var body = req.body;

      if (!mailgun.validateWebhook(body.timestamp, body.token, body.signature)) {
        console.error('Request came, but not from Mailgun');
        res.send({ error: { message: 'Invalid signature. Are you even Mailgun?' } });
        return;
      }

      next();
    });

    app.post('/webhooks/mailgun/catchall', function (req, res) {
      // actually handle request here
      console.log(req);
    });
  });


module.exports = router;
