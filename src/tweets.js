/*!
*
* Tweetbars 2.0.0
* Copyright 2014, Pedro Rogerio
* Licensed under the WTFPL licenses (http://www.wtfpl.net/).
*
*/
(function (name, context, definition) {
    if (typeof define === 'function' && define.amd) {
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else {
        context[name] = definition();
    }
})('Tweetbars', this, function () {
    "use strict";

    var Tweetbars = function (options) {
        if (!this || !(this instanceof Tweetbars)) {
            return new Tweetbars(options);
        }

        if (typeof options === 'string') {
            options = { key : options };
        }

        this.username  = options.username;
        this.container = options.container;
        this.template  = options.template;
        this.count     = options.count || 10;
        this.endpoint  = './tweets.php?username=' + this.username + '&count=' + this.count;

        this.fetch();
    };

    Tweetbars.init = function (options) {
        return new Tweetbars(options);
    };

    Tweetbars.prototype = {
        attachTemplate: function () {
            var template = Handlebars.compile(this.template);

            this.container.empty().append(template(this.tweets));
        },
        fetch: function () {
            var self = this;

            $.getJSON(this.endpoint, function (data) {
                self.tweets = $.map(data, function (tweet) {
                    if (tweet.user.screen_name) {
                        return {
                            author: tweet.user.screen_name,
                            tweet: tweet.text,
                            thumb: tweet.user.profile_image_url,
                            created: tweet.created_at
                        };
                    }
                });

                self.attachTemplate();
            });
        }
    };

    return Tweetbars;
});