/*!
*
* Tweetbars 1.2.0
* Copyright 2014, Pedro Rogerio
* Licensed under the WTFPL licenses (http://www.wtfpl.net/).
*
*/

var Browser = (function () {
    var agent = navigator.userAgent;
    return {
        ie: agent.match(/MSIE\s([^;]*)/)
    };
}());

Handlebars.registerHelper("tweet", function () {
    return new Handlebars.SafeString(
        Twitter.twitterLinks(this.tweet)
    );
});

Handlebars.registerHelper("created", function () {
    return new Handlebars.SafeString(
        Twitter.prettyDate(this.created)
    );
});

var Twitter = {
    init: function (config) {
        this.url       = './tweets.php?username=' + config.username + '&count=' + config.count;
        this.template  = config.template;
        this.container = config.container;
        this.fetch();
    },
    attachTemplate: function () {
        var template = Handlebars.compile(this.template);

        this.container.empty().append(template(this.tweets));
    },
    fetch: function() {
        var self = this;

        $.getJSON(this.url, function (data) {
            self.tweets = $.map(data, function (tweet) {
                try {
                    if (tweet.user.screen_name) {
                        return {
                            author: tweet.user.screen_name,
                            tweet: tweet.text,
                            thumb: tweet.user.profile_image_url,
                            created: tweet.created_at
                        }
                    }
                } catch (e) {
                    //no tweets
                }
            });

            self.attachTemplate();
        });
    },
    prettyDate: function (a) {
        var b = new Date();
        var c = new Date(a);
        if (Browser.ie) {
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
    twitterLinks: function (text) {
        text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
        .replace(/(^|\W)@(\w+)/g, '$1<a href="https://twitter.com/$2">@$2</a>')
        .replace(/(^|\W)#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2">#$2</a>');
        return text
    }
};