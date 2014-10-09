Handlebars.registerHelper('linkify', function(text) {
    text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
        .replace(/(^|\W)@(\w+)/g, '$1<a href="https://twitter.com/$2">@$2</a>')
        .replace(/(^|\W)#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2">#$2</a>');

    return new Handlebars.SafeString(text);
});

Handlebars.registerHelper('prettyDate', function(dateString) {
    var rightNow = new Date(),
        then     = new Date(dateString);

    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
    }

    var diff   = rightNow - then,
        second = 1000,
        minute = second * 60,
        hour   = minute * 60,
        day    = hour * 24,
        week   = day * 7;

    if (isNaN(diff) || diff < 0) {
        return "";
    }
    if (diff < second * 2) {
        return "just now"
    }
    if (diff < minute) {
        return Math.floor(diff / second) + " seconds ago";
    }
    if (diff < minute * 2) {
        return "1 minute ago"
    }
    if (diff < hour) {
        return Math.floor(diff / minute) + " minutes ago";
    }
    if (diff < hour * 2) {
        return "1 hour ago";
    }
    if (diff < day) {
        return Math.floor(diff / hour) + " hours ago";
    }
    if (diff > day && diff < day * 2) {
        return "yesterday";
    }
    if (diff < day * 365) {
        return Math.floor(diff / day) + " days ago";
    } else {
        return "over a year ago";
    }

    return dateString;
});