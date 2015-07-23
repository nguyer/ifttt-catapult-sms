"use strict";

var catapult = require("node-bandwidth");
var express = require("express");
var request = require("request");
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
				res.status(200).end();
			}
		});
	}
	catch (err) {
		res.status(500).send(err.message);
	}
});

app.post("/sms/key/:key/event/:event", function (req, res) {
	if (req.body.eventType === "sms" && req.body.direction === "in") {
		var key = req.params.key;
		var event = req.params.event.split("-");
		var to = req.body.to;
		var from = req.body.from;
		var text = req.body.text;

		for (var i = 0; i < event.length; i++) {
			switch (event[i].toLowerCase()) {
				case "to" : {
					event[i] = to;
					break;
				}
				case "from" : {
					event[i] = from;
					break;
				}
				case "text" : {
					event[i] = text;
					break;
				}
			}
		}

		event = event.join("-");

		try {
			request({
				method : "POST",
				url    : "https://maker.ifttt.com/trigger/" + event + "/with/key/" + key,
				json   : true,
				body   : {
					value1 : text,
					value2 : from,
					value3 : to
				}
			},
			function (err) {
				if (err) {
					res.status(500).send(err.message);
				}
				else {
					res.status(200).end();
				}
			});
		}
		catch (err) {
			res.status(500).send(err.message);
		}
	}
});

var server = app.listen(process.env.PORT || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("App listening at http://%s:%s", host, port);
});
