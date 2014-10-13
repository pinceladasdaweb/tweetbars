/*jslint browser: true*/
/*global define, module, exports*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.Tweetbars = factory(root);
    }
})(this, function () {
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