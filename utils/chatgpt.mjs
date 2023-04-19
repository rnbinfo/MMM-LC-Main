import {ChatGPTAPI} from 'chatgpt';
import {retryRequest} from './utils.js';
import config from 'config';
import proxy from "https-proxy-agent";
import nodeFetch from "node-fetch";

let chatGPT = {};
let chatOption = {};
export function initChatGPT() {
  chatGPT = new ChatGPTAPI({
    apiKey: "your key is here",
    completionParams: {
      model: 'gpt-3.5-turbo',
    },
    fetch: (url, options = {}) => {
      // if you have any proxy
      // const defaultOptions = {
      //   agent: proxy('http://xx.xx.xx.xx:xxx')
      // };

      const mergedOptions = {
        ...defaultOptions,
        ...options
      };

      return nodeFetch(url, mergedOptions);
    }
  })


}

async function getChatGPTReply(content, contactId) {
  const { conversationId, text, id } = await chatGPT.sendMessage(
    content,
    chatOption[contactId]
  );
  chatOption = {
    [contactId]: {
      conversationId,
      parentMessageId: id,
    },
  };
  //console.log('response: ', contactId,conversationId,text);
  // response is a markdown-formatted string
  return text;
}

export async function replyMessage(contactId, content) {
  try {

    return await retryRequest(
        () => getChatGPTReply(content, contactId),
        5,
        1000
    ).catch(e => {
          if (e.statusCode === 429) {
            return "too many request,try again later"
          }
        }
    );
  } catch (e) {
    console.error(e);
    if (e.message.includes('timed out')) {
      return "too many request,try again later";
    }
  }
}
