This repository is maintained by Cowboysdude 
[This is the second version of this module for MagicMirror2]

# MMM-YourNews

**News for your Mirror**


## Examples

![](Capture.png) 

## Your terminal installation instructions

* `git clone https://github.com/cowboysdude/MMM-YourNews` into the `~/MagicMirror/modules` directory.` 
  
 Go into your ~/MagicMirror/modules/MMM-YourNews directory and run:
 
 * `npm install`

## Config.js entry and options
       {
	disabled: false,	
    module: 'MMM-YourNews',
	position: 'bottom bar',
    config: {
	rotateInterval: 15 * 1000,  //change when to change to next article
	date_color: 'teal',  //pick date color
	source_color: 'orange' //pick author color
     }
     }, 
## Start your mirror . . . enjoy! 
