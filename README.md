This repository is maintained by Cowboysdude 
[This is the second version of this module for MagicMirror2]

# MMM-Jnews V2.0

**News for your Mirror**


## Examples

![](capture.png) 

*Automatically adjusts languge and all other settings based on your config.js!
[Will ONLY work for these language - ar,de,en,es,fr,zh,it,nl,ru,he,no,pt,se,ud]   

It can automatically adjust to users language OR you can do a language override in the config file [see example config below].

## Your terminal installation instructions

* `git clone https://github.com/cowboysdude/MMM-Jnews` into the `~/MagicMirror/modules` directory.`

## Get your free API key here 

 [https://newsapi.org/)

## Config.js entry and options
       {
        module: 'MMM-Jnews',
        config: {
	apiKey: "YOUR API KEY", 
	image : true,
        rotateInterval: 25 * 1000,
	clang: 'fr' //language override  
	     }
       },
   
   Default on image is set to false because Raspberry Pi's take a lot of time and create too much heat loading them :)
   This is default set to 25 seconds on the rotateInterval, you can change this if you'd like      


## Start your mirror . . . enjoy! 
