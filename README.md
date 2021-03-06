js-optimistion-workshop
=======================

# Why JavaScript is Important
## Here are some stats&hellip;
* About <a href="http://dev.opera.com/articles/view/mama-scripting-quantities-and-sizes/#qtys" target="_blank">88%</a> of websites use some form of JavaScript
* About <a href="http://trends.builtwith.com/javascript/jQuery" target="_blank">60%</a> of the top 10,000 websites use jQuery and 40% of the top 1,000,000 use it.
## Here are some of the things it can do&hellip;
* <a href="https://developer.mozilla.org/en-US/demos/detail/image-color-up/launch" target="_blank">Cross brower colour Changer</a>
* <a href="https://developer.cdn.mozilla.net/media/uploads/demos/a/z/azakai/3baf4ad7e600cbda06ec46efec5ec3b8/bananabread_1348775105_demo_package/game.html?low,low" target="_blank">First Person Shooters</a>
* <a href="https://developer.mozilla.org/en-US/demos/tag/tech:javascript" target="_blank">If you need inspiration&hellip;</a>
# Why JavaScript optimisation is important.
## Speed
Obviously the faster something is, the better &mdash; optimised JavaScript will download faster and run faster.
* Better User Experience &mdash; Happy Users
* Better Conversion Rates
* Speed Matters In Page Rank<
## Battery
JavaScript is just like any other programming language, each computation requires CPU cycles.
- Bad JavaScript wastes CPU cycles.
- Bad JavaScript wastes battery.
- Bad JavaScript wastes energy.
- Bad JavaScript wastes CO<sub>2</sub>.
- Bad JavaScript is killing our planet.
## Caching
Most browsers cache &mdash; all that do have a limit to what they will cache. 

For smartphones you would want the limit of your JS to be <a href="http://www.yuiblog.com/blog/2010/07/12/mobile-browser-cache-limits-revisited/" target="_blank">under 1MB</a> &mdash; this means that sometimes you may want to split up your concatinated JS (more on this later.)
# How JavaScript Works.
Obviously I don't really have time to go too deep into how all of JS works, but here are two interesting things about JavaScript.
## Garbage Collection
In a normal lifecycle this is roughly what happens:
- Memory is allocated
- Memory is used
- Memory is garbage collected
In code this could look like this:
````
	var a = {'foo' : 5, 'bar' : 10} //Memory Allocated
	alert(a.foo); //Memory Used.
	a = 'baz'; //References to foo and bar no longer needed, Garbage Collected
````
It is important for us to know this because sometimes we can write code that accidentally is impossible to garbage collect. This is bad.
````
	function do_something() {
		var my_object = {};
		var another_object = {};
		my_object.a = another_object; //Property a references another_object
		another_object.b = my_object; //Property b references my_object

		return true;
	}
````
Because both variables refernce each other, even though after the function is called no variables are useful they will never be destroyed.

If that function gets called from a loop, you are fucked &mdash; memory will be leaking all over the place.
## Anonymous Functions
These are pretty rad, if you have used jQuery you have used them before.
````
	function () { alert(1); };
					</pre>
				</code>
				<p>
					Or an example you will have certainly have used:
				</p>
				<code>
					<pre>
	document.ready(function ($) {
		$(#my_id).blah();
	});
````
There is a specific difference between an actual function and an anonymous function. In the following code the first example will work, the second will not. Points to who can guess why.
````
	test1(); 

	function test1(){
	    alert('Hello, World!');
	};

	test2(); 

	var test2 = function() {
	    alert('Hello, World!');
	};
````
If you need a tip, test3 will work&hellip;
````
	var test3 = function() {
	    alert('Hello, World!');
	};

	test3(); 
````
The above isn't an optimisation per say, but be mindful that good code should let the developer have as free a reign as is reasonable.

Were the optimisation comes in is when you get too used to anonymous functions as a nice way to package up functionality and start to use it like so: (This example might look far fetched, but loads of jQuery code includes anonymous functions inside of loops)
````
	for (var i = 0; i < 50; i++) {
		test = function () {
			console.log(i);
		}
		test();
	} 
````
This should be more like:
````
	test = function (x) {
		console.log(x);
	}
	for (var i = 0; i < 50; i++) {
		test(i);
	} 
````
Just because anonymous functions look like they are just variable assignments, doesn't mean that they don't take a whole load of effort to create, and in loops you are just wasting memory that gets allocated each time the loop needs to create a new anonymous function. I ran some <a href="http://jsperf.com/anonymous-functions-in-loops" target="_blank">tests</a> (not in IE because like a spoon I used console.log&hellip;)
# How jQuery Works
## What is jQuery
jQuery is a <em>library</em> &mdash; what this means is that it provides useful functions you can use to suppliment your code.

The issue with this is that have been using it more like a framework, which is a way of writing code on top of a language, indeed many have been using it as a language (totally bypassing JavaScript when they search for solutions). I have been guilty of this.

jQuery certainly has its uses, it is an excellent library with excellent features, but these features come at a cost.

We will take a look at some of the <a href="http://code.jquery.com/jquery-1.8.3.js" target="_blank">jQuery source code</a>, specifically the .hide() functionality (found by searching for `hide: function`) but before we do lets look at how do call these in jQuery and in JavaScript.
````
	//jQuery
	$('#my_id').hide();

	//JavaScript
	document.getElementById("my_id").style.display = "none";
````
Yes, one does look a little ugly, but jea-sus look at the hoops you need to jump through to get the exact same result with jQuery.

Obviously for some things (Ajax calls for one) jQuery is a great solution but you really should think about what you were going to do in jQuery and see how it does it (if nothing else, it is really well written and I always learn alot digging through the code.)
# You don't always need jQuery.
I have just shown how jQuery can be a little bit long winded &mdash; here are some hard stats that can back this up, recently I did a <a href="http://jsperf.com/adding-paragraphs" target="_blank">performance test</a> on adding paragraphs of text using JS and using jQuery.

In many projects jQuery is likely going to be one of your biggest JavaScript includes, if all you are doing is simple stuff that can be done easily in JS think of the savings you could make.

Even if you do need jQuery, do you need it on every page? Even if cached why bother loading it in if you don't need it.

A good test is pick a random internal page on your site, view the source &mdash; is each script element really being used?
#You don't always need JavaScript.
CSS has come on a really long way. Use it. (Animations, things like LESS)

Embrace progressive enhancement. (Just because JS means it will be rounded in IE7 doesn't mean I give a shit.)

Just because you can do something with JS, doesn't mean you should. 

Two good tests see if maybe you should rethink your code:
- Is it something visual? (CSS)
- Are you using document.ready to make sure it happens immediately? (maybe should be in HTML or CSS)
    Every browser has JavaScript disabled until they download your JavaScript
			</section>
			<section>
				<h1>How Browsers Handle JavaScript</h1>
				<p>
					Disclaimer: I am about to oversimplify. You should <a href="http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/" target="_blank">Behind The Scenes of Modern Web Browsers</a>
				</p>
				<h2>Downloading</h2>
				<p>
					Browsers essentially scan the page for elements to download and it downloads them in order, in the case of JavaScript it will also execute them in order.
				</p>
				<p>
					Blocking used to be a big thing, but it isn't so much anymore because most modern browsers don't block.
				</p>
				<p>
					Now the big thing is JavaScript running before it should, or only running on a subset of the DOM. The fix &mdash; move your JavaScript below as much of the DOM as you can and add to the DOM in JavaScript sparingly.
				</p>
				<h2>Running</h2>
				<p>
					As I was saying, things get ran in order. In practice this normally means 4 JavaScript files being loaded in that will eventually get called by one file called `custom.js`
				</p>
				<p>
					JavaScript is handled by the rendering engine of the browser, this same engine is what is used to display CSS and elements on screen, so you can imagine when a page is first hit the battle that goes on for CPU cycles within the browser.
				</p>
				<p>
					JavaScript doesn't edit HTML directly, it edits the DOM which then needs to get redrawn by the browser &mdash; whenever you see something flickering, it is probably because the DOM is being redrawn too much.
				</p>
				<h2>Caching</h2>
				<p>
					The browser will check it's cache before downloading certain things, caching your JavaScript is a very good thing. Here are some tips on how to do it correctly.
				</p>
				<ul>
					<li>Use far reaching expires headers in your apache setup</li>
					<li>Make it as small as you can</li>
					<li>Make it be a resource (and not a script tag)</li>
					<li>Have no dynamic content in it (PHP is a no no)</li>
				</ul>
			</section>
			<section>
				<h1>Concatination</h1>
				<p>
					Boring &mdash; we know what it is but I would feel lazy if I didn't cover it. Contents of File A mixed with Contents of File B.
				</p>
				<p>
					This should be part of a build process, not as part of a final go live push.
				</p>
				<p>
					It is OK to do at runtime so long as the code doing it is semi-sensible (Magento does this well).
				</p>
				<p>
					Watch out for caching limits, like I said earlier - also anything that would make your JS uncachable (dynamic content) shouldn't get contatinated in.
				</p>
			</section>
			<section>
				<h1>Compress, Cmpress, Cmprss.</h1>
				<p>
					Again boring &mdash; This should not be part of a build process, minified code is fucking annoying to debug.
				</p>
				<p>
					It should be part of a go live process, once you are happy it is working you minify that sucker and get it up and out of the way.
				</p>
				<p>
					Look at jQuery 252KB &rarr; 32KB with a bit of minifying.
				</p>
			</section>
			<section>
				<h1>Some Tools</h1>
				<ul>
					<li>
						<a href="http://closure-compiler.appspot.com/home" target="_blank">Closure Compiler</a> &mdash; Fixes performance gotchas. (should not use blindly)
					</li>
					<li>
						<a href="http://jsperf.com/" target="_blank">JS Perf</a> &mdash; Quickly set up a performance test to check if something is better done one way or another.
					</li>
					<li>
						<a href="http://jshint.com/" target="_blank">JSHint</a> &mdash; A nicer JS Linter, helps you write good JavaScript.
					</li>
					<li>
						<a href="http://StackOverflow.com/" target="_blank">Stack Overflow</a> &mdash; Ask Questions!
					</li>
				</ul>
			</section>
			<section>
				<h1>Misc Tips.</h1>
				<p>
					Here are some tips I found whilst doing research that don't really fit anywere else
				</p>
				<ul>
					<li>Always use <code>var</code> to delcare variables or else scope will need to be considered.</li>
					<li>Before adding elements to the DOM make sure you have done everything you need to to them.</li>
					<li>Don't nest loops.</li>
					<li>Cache objects. (var i = $('body');)</li>
				</ul>
			</section>
			<section>
				<h1>Questions?</h1>
				<p>
					Derek wanted me to explain Non-Onload-Blocking Async JS and comment on the following Tweet.
				</p>

				<blockquote>
					Used to be, you created a JavaScript and put it in a script tag. These days you need to wrap it in some kind of baloney. <a href="http://www.twitter.com/markwunsch" target="_blank">@markwunsch</a>
				</blockquote>
				<p>
					Easy one first &mdash; I completely agree with Mark, far too much baloney. There is something to be said for trying to get back to basics.
				</p>
				<p>
					The Non-Onload-Blocking Async JS isn't that bad either really.
				</p>
				<p>
					Async JS basically means it won't start doing something until it is its time to do it (normally JS would try and act syncronously and start as soon as it can), this has uses but has a couple of downsides, one of them being that it blocks <code>window.onload</code>.
				</p>
				<p>
					<code>window.onload</code> is a call to see if the page has been fully loaded, sometimes it is useful to know this (jQuery does this for you with document.ready). Async scripts don't return as done until they have finished loading though, which can cause a bit of a hold up.
				</p>
				<p>
					Let's imagine then we both need to have some JavaScript called at a certain point (async) but want the page to report as fully loaded because we don't need our JavaScript to run before the DOM is used. The solution put out by PHPied is below (comments are mine).
				</p>
				<code>
					<pre>
	(function(url){ //This anonymous function will be called immediately and it's contents are protected.
		var iframe = document.createElement('iframe'); //Lets make an iframe.
		(iframe.frameElement || iframe).style.cssText = "width: 0; height: 0; border: 0"; //Hide the iframe
		var where = document.getElementsByTagName('script'); //Find all script tags
		where = where[where.length - 1]; //Find the last script tag
		where.parentNode.insertBefore(iframe, where); //Put our iframe before the last script tag.
		var doc = iframe.contentWindow.document; //Grab the Window of the iframe
		doc.open().write('&lt;body onload="'+
		'var js = document.createElement(\'script\');'+
		'js.src = \''+ url +'\';'+
		'document.body.appendChild(js);">'); //Edit the window to have this.
		doc.close(); //End of edits
	})('http://www.jspatterns.com/files/meebo/asyncjs1.php'); //This is what is passed into the anonymous function.
					</pre>
				</code>
				<p>
					Why this works &mdash; the script finishes its job really quickly, all it is doing is making an iframe and populating it with some stuff, once it is done it can move on and <code>window.onload</code> will happilly report all is well.
				</p>
				<p>
					Meanwhile the iframe will launch it's own fetch/execute cycle and grab the contents of asyncjs1.php, it doesn't matter to our main page how long this takes, but it will run and finish.
				</p>
				<p>
					The downside is a scoping issue because of the use of an iframe, the article talks about solutions which seem solid, if you want me to talk about scoping I can&hellip; but you should just read <a href="http://robertnyman.com/2008/10/09/explaining-javascript-scope-and-closures/" target="_blank">this article</a>.
				</p>
				<p>
					Derek also asked about the benefit of using <code>var x = 1, y = 2;</code> over <code>var x = 1; var y = 2;</code>
				</p>
				<p>
					It was commonly thought that comma seperating the variables was beneificial, and in some browsers that is the case, but as <a href="http://jsperf.com/comma-seperated-vars" target="_blank">these results show</a> there really isn't that much of a difference.
				</p>
				<p>
					My preference would be to comma seperate, simply because if you fail to do any other minification it is slightly smaller and in my opinion looks slightly nicer.
				</p>
				<p>
					Be wary that if you comma seperate and mess it up, the variables will still get declared but could have global scope, you don't want that!
				</p>
