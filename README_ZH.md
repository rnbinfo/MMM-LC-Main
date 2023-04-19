# 中文说明

# 背景
该项目是由另一个无显示纯语音对答机器项目转变而来，所以代码在移植过程中可能有些冗余，当然也是我第一次接触MagicMirror,日后对这个项目框架有更深入了解后再改进吧。

项目主要通过使用snowboy热词唤醒，进行触发录音控制，并使用google/text2speech,google/speech2text，进行文本和语音转换，最后通过magicmirror默认模块compliments输出文字以及硬件播放声音。

硬件麦克风使用的是 ReSpeaker 2-Mics Pi HAT，具体用法请参考官方文档：https://wiki.seeedstudio.com/ReSpeaker_2_Mics_Pi_HAT_Raspberry/#driver-installation-and-configuration

本项目是由四个基础模块共同组成，缺一不可，如果需要安装则需要把
`MMM-LC-Main,MMM-LC-LPCM,MMM-LC-HotWord,MMM-LC-Text2Speech`四个项目一起安装在MagicMirror的modules目录下面。

LC是我们人工智能小助理Little Carrie简称

## 模块说明

| modules          | Description
|----------------- |-----------
| `MMM-LC-Main`        | 主控模块，流程控制
| `MMM-LC-LPCM`        | 录音模块
| `MMM-LC-HotWord`     | 唤醒词模块
| `MMM-LC-Text2Speech` | 文本变语音模块


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

