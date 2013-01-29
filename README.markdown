[Tweetbars](http://www.pinceladasdaweb.com.br/blog/uploads/tweetbars/)
=================

Display your latest tweets with jQuery + Handlebars.js Template.

##Usage
1. Paste right before your page's closing `</body>` tag
```console
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.rc.1/handlebars.min.js"></script>
<script type="text/javascript" src="src/tweets.js"></script>
```

2. From within a script tag or a JS file
```javascript	
	Twitter.init({
    	template: $('#tweets-template').html(),		// The ID of your template
    	container: $('#container'),					// domNode to attach to
    	username: 'pinceladasdaweb',				// Twitter username
    	count: 10									// Number of tweets to display
	});
```

##License
[WTFPL](http://www.wtfpl.net/)