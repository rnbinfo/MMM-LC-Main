Module.register("MMM-LC-Main",{
	// Default module config.
	defaults: {
		updateInterval: 30000,
		retryDelay: 5000
	},

	requiresVersion: "2.1.0",

	start: function() {
		var self = this;
		var dataNotification = null;

		// Schedule update timer.
		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	getScripts: function() {
	},

	getStyles: function() {
	},

	getData: function() {
	},

	scheduleUpdate: function(delay) {
		let nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	socketNotificationReceived: function (notification, payload) {
		var self = this;
		if(notification === "stop-speech2text") {
			self.sendNotification("littleCarrie",payload);
		}

		if (notification === "stop-chatgpt") {
			self.sendNotification("littleCarrie",payload);
			self.sendNotification("start-text2speech",payload);
		}

		if(notification === "stop-text2speech") {
			self.sendNotification("start-record",null);
		}
	},

	// Override dom generator.
	getDom: function() {
	},

	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		if( notification === "stop-record") {
			this.sendSocketNotification("start-speech2text", null);
		}

	},
});
