var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , moment = require('moment');

// Twilio library for node.
var client = require('twilio')('Your Twilio Account SID',
  	'Your Twilio Auth Token');

// Running the node server.
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Listening on " + port);
});

// Server configuration.
app.set('views', __dirname + '/views');
app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.bodyParser());
app.engine('html', require('ejs').renderFile);

// routing
app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/test', function (req, res) {
	// Start the multi threading call test.
	// Epoch time stamp when the test begins.
	console.log("Test starts: " + moment().format("dddd, MMMM Do YYYY, h:mm:ss:SSS a"));

	for(var i = 0; i < 100; i++) {
		client.makeCall({
	    to: '+1415xxxxxx', // Any number Twilio can call
	    from: 'Your Twilio Phone number', // A number you bought from Twilio and can use for outbound communication
	    url: 'http://twimlbin.com/xxxxxx' // A URL that produces an XML document (TwiML) which contains instructions for the call
		});
	}

	// Epoch time stamp when the test ends.
	console.log("Test ends: " + moment().format("dddd, MMMM Do YYYY, h:mm:ss:SSS a"));
	res.render('index.html');
});