# Tweetbars
> Display your latest tweets with jQuery and Handlebars.js

## Demo

Access [the url](http://www.pinceladasdaweb.com.br/blog/uploads/tweetbars/) and view in action.

## How to use?
1 - Paste right before your page's closing `</body>` tag

```html
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.min.js"></script>
<script type="text/javascript" src="src/tweets.min.js"></script>
```

2 - From within a script tag or a JS file
```javascript
    Tweetbars.init({
        template: $('#tweets-template').html(),     // The ID of your template
        container: $('#container'),                 // domNode to attach to
        username: 'pinceladasdaweb',                // Twitter username
        count: 10                                   // Number of tweets to display
    });
```

3 -  In the [`tweets.php`](tweets.php) file, complete the [Twitter OAuth settings](https://dev.twitter.com/docs/auth/oauth/faq)

```php
$CONSUMER_KEY = '';
$CONSUMER_SECRET = '';
$ACCESS_TOKEN = '';
$ACCESS_TOKEN_SECRET = '';
```

## Customize Template

1 - To customize the template open the [`index.html`](index.html) file and look for the following block of code:

```javascript
<script id="tweets-template" type="text/x-handlebars-template">
    {{#each this}}
    <div class="item clearfix">
        <img src="{{thumb}}" alt="{{author}}">
        <p>{{linkify tweet}}</p>
        <p>{{prettyDate created}}</p>
        <cite>@{{author}}</cite>
    </div>
    {{/each}}
</script>
```

## Important Note

It is mandatory to file [`cacert.pem`](cacert.pem) be on the same level/directory that codebird.php file because Twitter requires [secure connections in their API](https://twittercommunity.com/t/restricting-api-twitter-com-to-ssl-tls-traffic/12331).

##License
[WTFPL](http://www.wtfpl.net/)