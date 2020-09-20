/* Magic Mirror
 * Module: MMM-PNews
 *
 * By Cowboysdude
 * MIT Licensed.
 */
Module.register("MMM-YourNews", {

    // Module config defaults.
    defaults: {
        updateInterval: 60 * 60 * 1000, // every 10 minutes
        animationSpeed: 2500,
        initialLoadDelay: 5, // 0 seconds delay
        retryDelay: 2500,
        rotateInterval: 15 * 1000, 
		image: true,
		source_color: 'teal',
		date_color: 'white',
		timevor_color: 'red'
    },

    getScripts: function() {
        return ["moment.js"];
    },

    getStyles: function() {
        return ["MMM-YourNews.css"];
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.config.lang = this.config.lang || config.language;
        this.sendSocketNotification("CONFIG", this.config); 
        this.news = {};
        this.activeItem = 0;
        this.rotateInterval = null;
        this.scheduleUpdate();
		this.getNews();
    }, 
	 

    scheduleCarousel: function() {
        console.log("Scheduling YourNews items");
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },

    getDom: function() {
		
		var date_color = this.config.date_color;
		
 
        var wrapper = document.createElement("div");
        wrapper.classList.add("container");


        var keys = Object.keys(this.news);
        if (keys.length > 0) {
            if (this.activeItem >= keys.length) {
                this.activeItem = 0;
            }
            var news = this.news[keys[this.activeItem]];
		  
			var newStr = news.description[0]; 
			var Imgmatch = newStr.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/); 
			var totalImg = "http://www.badisches-tagblatt.de"+Imgmatch[1]; 
		    var title = news.title[0];
			var authorSearch = newStr.match(/\<span.+class\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/); 
			var htmlTagRegex =/\s*(<[^>]*>)/g;			 
			var myArray = authorSearch[0].split(htmlTagRegex);
			var author = myArray[2]; 
			var FixDesc = newStr.split(/(<p>)/);
			var action = FixDesc[2];
			var totalDesc = action.split('.')[0]; 
			
			var publishedAt = news['a10:updated'][0];
		    date = moment(publishedAt).format("DD-MM-YYYY");
            time = moment(publishedAt).valueOf(); 
			
		 	var shownet = document.createElement("div");
			shownet.classList.add("fixed");
            var NetIcon = document.createElement("img");
            NetIcon.classList.add("image");
            NetIcon.src = totalImg;
            shownet.appendChild(NetIcon);
            wrapper.appendChild(shownet);  

		 if (this.config.image === true){	
			if ( typeof news.urlToImage == "string" && news.urlToImage !== null){
            var ully = document.createElement("div");
            ully.classList.add("fixed");
            var Icon = document.createElement("img"); 
            Icon.classList.add("image");
            Icon.src = news.urlToImage;
            ully.appendChild(Icon);
            wrapper.appendChild(ully); 
		    } 
		 }
		 
            function timevor(date) {
                var seconds = Math.floor((new Date() - time) / 1000);
                if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2) return "<font color=#CC0033>"+Math.round(seconds / (60 * 60 * 24 * 365.25)) + " Jahre vor</font>";
                else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1) return "<font color=#FF0033>1 Jahr vor</font>";
                else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2) return "<font color=#99FF99>"+Math.round(seconds / (60 * 60 * 24 * 30.4)) + " Monate vor</font>";
                else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1) return "<font color=#CCFF99>1 Monat vor</font>";
                else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2) return "<font color=#99FF33>"+Math.round(seconds / (60 * 60 * 24 * 7)) + " Wochen vor</font>";
                else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) return "<font color=#66CC00>1 Woche vor</font>";
                else if (Math.round(seconds / (60 * 60 * 24)) >= 2) return "<font color=#66FFFF>"+Math.round(seconds / (60 * 60 * 24)) + " Tage vor</font>";
                else if (Math.round(seconds / (60 * 60 * 24)) >= 1) return "<font color=#33CCFF>1 Tag vor</font>";
                else if (Math.round(seconds / (60 * 60)) >= 2) return "<font color=#FFFF33>"+Math.round(seconds / (60 * 60)) + " Std vor</font>";
                else if (Math.round(seconds / (60 * 60)) >= 1) return "<font color=#FFFF99>1 Stunde vor</font>";
                else if (Math.round(seconds / 60) >= 2) return "<font color=#FF3333>"+ Math.round(seconds / 60) + " Protokoll vor</font>";
                else if (Math.round(seconds / 60) >= 1) return "<font color=#FF6666>1 Minute vor</font>";
                else if (seconds >= 2) return this.translate("<font color=#FFF>seconds vor</font>");
                else return  "seconds vor";
            } 
			
			var sourceName = "Badisches Tagblatt";
            var dcontain = document.createElement("div");
            dcontain.classList.add("flex-item","dateColor");
            dcontain.innerHTML = "<font color = "+date_color+">" + date + "</font><br> <font color = " + this.config.source_color+ ">" + author + "<br>" + timevor(date);
            wrapper.appendChild(dcontain);
			
 

            var nextThis = document.createElement("div");
            nextThis.classList.add("flex-item");
			if ( typeof totalDesc == "string" && totalDesc !== null){
            nextThis.innerHTML = "<font color=white>"+title + "</font><br>" + totalDesc;
			} else {
			nextThis.innerHTML = title;
			}
            wrapper.appendChild(nextThis);

        }
        return wrapper;
    },
	
    processNews: function(data) {
        this.today = data.Today;
        this.news = data; 
		//console.log(this.news);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getNews();
        }, this.config.updateInterval);

        this.getNews(this.config.initialLoadDelay);
    },

    getNews: function() {
        this.sendSocketNotification('GET_NEWS');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "NEWS_RESULT") {
            this.processNews(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);
        }
    }

});
