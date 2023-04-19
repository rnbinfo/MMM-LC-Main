const Log = require("logger");

module.exports = {
	name: "chatgpt",
	actions: {

		async getReply(content) {
			let contactId = "1";
			const {replyMessage} = await import('./utils/chatgpt.mjs');
			return await replyMessage(contactId, content);
		},
		async init() {
			Log.info(">>> Chatgpt Service started!");
			const {initChatGPT} = await import('./utils/chatgpt.mjs');
			await initChatGPT();
		}
	}

};



