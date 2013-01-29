/*!
*
* Tweetbars 1.0
* Copyright 2012, Pedro Rogerio
* Licensed under the WTFPL licenses (http://www.wtfpl.net/).
*
*/

var K = function () {
	var a = navigator.userAgent;
	return {
		ie: a.match(/MSIE\s([^;]*)/)
	}
}();

Handlebars.registerHelper("tweet", function() {
	return new Handlebars.SafeString(
		Twitter.twitterLinks(this.tweet)
	);
});

Handlebars.registerHelper("created", function() {
	return new Handlebars.SafeString(
		Twitter.prettyDate(this.created)
	);
});

var Twitter = {
    init: function(config) {
        this.url = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=' + config.username + '&count=' + config.count + '&callback=?'
		this.template = config.template;
        this.container = config.container;
        this.fetch();
    },
    attachTemplate: function() {
        var template = Handlebars.compile(this.template);

        this.container.append(template(this.tweets));
    },
    fetch: function() {
        var self = this;
        
        $.getJSON(this.url, function(data) {
            self.tweets = $.map(data, function(tweet) {
				console.dir(tweet)
                return {
                    author: tweet.user.screen_name,
                    tweet: tweet.text,
                    thumb: tweet.user.profile_image_url,
					created: tweet.created_at
                };
            });

            self.attachTemplate();
        });
    },
	prettyDate: function(a){
		var b = new Date();
		var c = new Date(a);
		if (K.ie) {
			c = Date.parse(a.replace(/( \+)/, ' UTC$1'))
		}
		var d = b - c;
		var e = 1000,
			minute = e * 60,
			hour = minute * 60,
			day = hour * 24,
			week = day * 7;
		if (isNaN(d) || d < 0) {
			return ""
		}
		if (d < e * 7) {
			return "just now"
		}
		if (d < minute) {
			return Math.floor(d / e) + " seconds ago"
		}
		if (d < minute * 2) {
			return "1 minute ago"
		}
		if (d < hour) {
			return Math.floor(d / minute) + " minutes ago"
		}
		if (d < hour * 2) {
			return "1 hour ago"
		}
		if (d < day) {
			return Math.floor(d / hour) + " hours ago"
		}
		if (d > day && d < day * 2) {
			return "yesterday"
		}
		if (d < day * 365) {
			return Math.floor(d / day) + " days ago"
		} else {
			return "over a year ago"
		}	
	},
	twitterLinks: function(str){
		str=' '+str;
		str = str.replace(/((ftp|https?):\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?)/gm,'<a href="$1" target="_blank">$1<\/a>');
		str = str.replace(/([^\w])\@([\w\-]+)/gm,'$1<a href="http://twitter.com/$2" target="_blank">@$2<\/a>');
		str = str.replace(/([^\w])\#([\w\-]+)/gm,'$1<a href="http://twitter.com/search?q=%23$2" target="_blank">#$2<\/a>');
		return str;
	}
};

Twitter.init({
    template: $('#tweets-template').html(),
    container: $('#container'),
    username: 'pinceladasdaweb',
    count: 10
});