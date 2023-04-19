# MMM-LC-MAIN
Magic Mirror Module for Little Carrie ,which one you can talk anything with her.

# Installation
`cd modules` -> `git clone https://github.com/rnbinfo/MMM-LC-Main.git`

# replace your OpenAI key
`vi ./utils/chatgpt.mjs` -> apiKey: "your key is here",

## Add to config:
```
		{
			module: 'MMM-LC-Main',
			position: 'top_right',  //any where
			config: {
			}
		},
		{
			module: "MMM-LC-LPCM",
			position: "top",
			config: {
			}
		},
		{
			module: "MMM-LC-Text2Speech",
			position: "top",
			config: {
			}
		},
		{
			module: "MMM-LC-HotWord",
			position: "top",
			config: {
			}
		}
```
