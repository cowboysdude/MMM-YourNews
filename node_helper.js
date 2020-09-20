
  /* Magic Mirror
   * Module: MMM-YourNews
   *
   * By Cowboysdude
   * MIT Licensed.
   */
   
const NodeHelper = require('node_helper');
const request = require('request');
const parser = require('xml2js').parseString;
 
 module.exports = NodeHelper.create({

start: function() {
    	console.log("Starting module: " + this.name); 
    },
    
     getNews: function(url) {
        request({ 
    	          url:  "https://www.badisches-tagblatt.de/LokalesBadenBaden.rss",
    	          method: 'GET' 
    	        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                parser(body, (err, result)=> {
                     if(result.hasOwnProperty('rss')){
                        var result = JSON.parse(JSON.stringify(result.rss.channel[0].item));
                        this.sendSocketNotification("NEWS_RESULT", result);
                     }
                });
            }
       });
    },
 
     socketNotificationReceived: function(notification, payload) {
         if (notification === 'GET_NEWS') {
             this.getNews(payload);
         }
		 if(notification === 'CONFIG'){
			this.config = payload;
		}	
     }
 });
 
