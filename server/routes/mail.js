var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var request = require('request');
var domain = 'sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org';
var key = 'key-e8598fe5ada73e92e6f692b19e43f14f';
var mailgun = require('mailgun-js')({apiKey: key , domain: domain});



//sends an email
router.post('/', function(req, res, next) {
  // Not the movie transporter!
  var sendTo =  req.body.sendTo;
  var message = req.body.message;
  console.log('email', sendTo);

  var transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
          user: 'postmaster@sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org',
          pass: 'cb28882b6b95bc142d8d415e2096204b',

      }
  });

  var mailOptions = {
    from: '"Photo Connect" <postmaster@sandboxdb893f19ba9346f68004491a7dd09e59.mailgun.org>', // sender address
    to: sendTo, // list of receivers
    subject: 'nodemailer!!!', // Subject line
    text: message //, // plaintext body
    //html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    } else {
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
});

//get mailgun emails from api
router.get('/messages', function (req, res) {
  console.log("get mail");

  mailgun.get('/' + domain + '/log', //{ event: ['sent', 'delivered'] }, 

  function (error, body) {
    console.log(error);
    console.log(body);
  });
});

module.exports = router;
