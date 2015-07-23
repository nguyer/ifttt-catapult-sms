ifttt-catapult-sms
====================
Enables sending and receiving SMS through Catapult with IFTTT

Catapult requires an `Authorization` header in order to consume its web API, which unfortunately IFTTT does not support. This is a very simple web server which relays a request, moving the user's credentials from the message body to the `Authorization` header.

This application is available as a public service on Heroku, or you can deploy your own if you want to.

Set Up Catapult Account
--------------------
If you don't have one already, you should create an account on [Catapult](https://catapult.inetwork.com). You will need your user ID, API token, and API secret from your Account page to configure the IFTTT channel.

Catapult IFTTT Action
--------------------
To send SMS via Catapult, use the [IFTTT Maker Channel](https://ifttt.com/maker) to make a web request.

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
Â
That's it! Anytime your recipe runs, your SMS will be sent from Catapult.

Catapult IFTTT trigger
--------------------

### Configuring Catapult

To receive incoming SMS messages from Catapult, you need to configure a Catapult application on your [Catapult dashboard](https://catapult.inetwork.com). Set the application's Messaging Callback URL to the Heroku app.

	https://ifttt-catapult-sms.herokuapp.com/sms/key/{iftttKey}/event/{iftttEvent}

Where `{iftttKey}` is the secret key from your [IFTTT Maker Channel](https://ifttt.com/maker), and `{iftttEvent}` is one or more of `from`, `to`, or `text`, separated by hyphens (`-`).

Example:

	https://ifttt-catapult-sms.herokuapp.com/sms/key/bNPaH85KPqmABCz914G3PT/event/from-to


`from` and `to` will be replaced by the actual `from` and `to` telephone numbers from the incoming SMS. Using these parameters, you can control which events are fired based on who the message is from or to, or even what text the message contained.

### Configuring IFTTT

Now that you have Catapult configured, create your recipe in IFTTT using the the [Maker Channel](https://ifttt.com/maker) to receive a web request.

Set the Event Name to the value that corresponds to the Callback URL that you defined in your Catapult application. For our example we used `from-to`, which will trigger events from a specfic number, to a specific number. For instance, if we want our event to trigger any time our Catapult number `+11234567890` receives a message from `+15678901234`, our Event Name would be `+15678901234-+11234567890`.

You can also use the `text`, `from`, and `to`, fields as ingredients in your recipe. The contents of the text message are `{{Value1}}`, the from number is `{{Value2}}`, and the to number is `{{Value3}}`.

Running Your Own Server
--------------------
If you want to, you can download the code and run the Node.js application yourself.

	$ git clone https://github.com/nguyer/ifttt-catapult-sms.git
	$ npm install
	$ npm start
