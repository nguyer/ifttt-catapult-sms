ifttt-catapult-sms
====================
Enables sending SMS with Catapult from IFTTT.

Catapult requires an `Authorization` header in order to consume its web API, which unfortunately IFTTT does not support. This is a very simple web server which relays a request, moving the user's credentials from the message body to the `Authorization` header.

This application is available as a public service on Heroku, or you can deploy your own if you want to.

Set Up Catapult Account
--------------------
If you don't have one already, you should create an account on [Catapult](https://catapult.inetwork.com). You will need your user ID, API token, and API secret from your Account page to configure the IFTTT channel. 

Configure IFTTT Maker Channel
--------------------
To use Catapult to send SMS, use the [IFTT Maker Channel](https://ifttt.com/maker) to make a web request.

![IFTTT Maker Channel](https://raw.githubusercontent.com/nguyer/ifttt-catapult-sms/master/img/ifttt_r.png)

 - Set URL to **https://ifttt-catapult-sms.herokuapp.com/sms**
 - Set Method to **POST**
 - Set Content Type to **application/json**
 - Set Body to:

```json
{
	"userId": "PUT_YOUR_USER_ID_HERE",
	"apiToken": "PUT_YOUR_API_TOKEN_HERE",
	"apiSecret": "PUT_YOUR_API_SECRET_HERE",
	"to": "+19199999999",
	"from": "+19199999999",
	"text": "Hello world."
}
```

The `from` field must be a Catapult phone number that you own and have configured on an application. The `to` and `text` fields can be variable and can set to an ingredient in the current recipe.

That's it! Anytime your recipe runs, your SMS will be sent from Catapult.

Running Your Own Server
--------------------
If you want to, you can download the code and run the Node.js application yourself.

	$ git clone https://github.com/nguyer/ifttt-catapult-sms.git
	$ npm install
	$ npm start
