// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');
const Log = require("logger");
let path = require('path');

// Creates a client
const client = new speech.SpeechClient();

// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'BCP-47 language code, e.g. en-US';

const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 48000,
  languageCode: 'cmn-Hans-CN'
};


module.exports = {
  name: "speech2text",
  actions: {
    async transcript(ctx) {
		Log.info("Start speech2text...");



        let filename = path.resolve(__dirname, '..') +'/MMM-LC-LPCM/sound/question.wav';

        /**
         * Note that transcription is limited to 60 seconds audio.
         * Use a GCS file for audio longer than 1 minute.
         */
        let audio = {
          content: fs.readFileSync(filename).toString('base64'),
        };

        let request = {
          config: config,
          audio: audio,
        };

// Detects speech in the audio file. This creates a recognition job that you
// can wait for now, or get its result later.
        let [operation] = await client.longRunningRecognize(request);

// Get a Promise representation of the final result of the job
        let [response] = await operation.promise();
        let transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
		Log.info(`Transcription: ${transcription}`);
        return transcription;

    }
  }



};
