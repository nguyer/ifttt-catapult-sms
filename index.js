"use strict";

var catapult = require("node-bandwidth");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

app.post("/sms", function (req, res) {
	var userId = req.body.userId;
	var apiToken = req.body.apiToken;
	var apiSecret = req.body.apiSecret;
	var to = req.body.to;
	var from = req.body.from;
	var text = req.body.text;

	try {
		var client = new catapult.Client(userId, apiToken, apiSecret);
		catapult.Message.create(client, {
			to   : to,
			from : from,
			text : text
		},
		function (err) {
			if (err) {
				res.status(500).send(err.message);
			}
			else {
				res.status(201).end();
			}
		});
	}
	catch (err) {
		res.status(500).send(err.message);
	}
});

var server = app.listen(process.env.PORT || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("App listening at http://%s:%s", host, port);
});
