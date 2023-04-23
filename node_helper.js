/* Magic Mirror
 * Node Helper: MMM-MWWordOfTheDay
 *
 * By bittiez
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

const chatgpt = require("./chatgpt.js");
const speech2text = require('./speech2text');

const Log = require("logger");

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: async function (notification, payload) {
		let self = this;
		if (notification === "start-speech2text") {

			let payload = await speech2text.actions.transcript();
			// let payload = "你好";
			this.sendSocketNotification("stop-speech2text",payload);
			await chatgpt.actions.init();
			let reply = await chatgpt.actions.getReply(payload);
			Log.info("chatgpt response: " + reply);
			this.sendSocketNotification("stop-chatgpt",reply);

		}
	}

});
