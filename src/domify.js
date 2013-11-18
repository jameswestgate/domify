
/* jQuery plugin to add responsive image handling to jQuery websites */
/* https://github.com/jameswestgate/domify
/* Copyright James Westgate 2013 */
/* Dual licensed under the MIT and GPL licenses */


//Polyfill to get textContent of noscript tags from unsupported browsers
//Based on https://github.com/jameswestgate/noscript-textcontent
(function() {

	var div = document.createElement("div");
	div.innerHTML = "<noscript><span></span></noscript>";
	
	var elements = div.getElementsByTagName("noscript");
	if (elements.length && elements[0].textContent) return; //No polyfill required

	//Re-request the page via ajax, the page is already in cache
	//Patch XMLHttpRequest if required
	var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); //For IE6 and below only, good enough for our purposes
	xmlhttp.open("GET", window.location, false); //syncronous call since we need to block
	xmlhttp.send();

	//Process the response
	var tags = document.getElementsByTagName("noscript");
	var regex = /<noscript>(.*?)<\/noscript>/igm; 
	var results, response = xmlhttp.responseText;
	var i=0, len=tags.length;

	while (i < len) {
		results = regex.exec(response);
		if (results) tags[i].textContent = results[1];
		i++;
	}
})();



/* jQuery plugin */
(function($){

	//Reads into noscript nodes and replaces them with selected content either straight away, 
	//or when  scrolled into view,  or after page load
		
                $.fn.domify = function(options, callback) {

                	//Parameter validation
                	if (arguments.length === 0) {
                		options = {};
                		callback = null;
                	} 

	                if (arguments.length === 1) {
                		callback = options;
                		options = {};
                	}

                              options.viewport = options.viewport || 'none';  // none/false, scroll, load'
                              options.viewport =  options.viewport.toLowerCase();

                	var noscripts = [];

	               //Now loop through each noscript tag
                	this.each(function() {

                		//Get text content of noscript tag
                		var elements = $(this.textContent);

                		//Loop through each element in the fragment
                		if (callback) elements.each(callback);
                			
                		noscripts.push([this, elements]);
               	});

               	//Add results to dom
		for (var i=0, len=noscripts.length; i<len; i++) {
			var noscript = noscripts[i];

			if (options.viewport === 'none')  $(noscript[0]).replaceWith(noscript[1]);
		}

		return this;
	};
	
})(jQuery);