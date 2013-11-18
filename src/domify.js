
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

	//Reads into noscript nodes and creates dom fragments
	//Replaces, appends or prepends the selected content either straight away, 
	//or when  scrolled into view,  or after page load
		
                $.fn.domify = function(options, callback) {

                              //Ensure options are valid
                              options.method = options.method || 'append';  //append, prepend or replace
                              options.viewport = options.viewport || 'none';  // none/false, scroll, load'

                             //Add outer loop for comma seperated selectors
                	
                	//Split selector into noscript selections and validate
                	var split = this.selector.split(' ');
                	var left, right, flag = true;

                	for (var i=0, len=split.length;i<len) {
                		
                		token = split[i];

                		if (flag) {
                			left += token + ' ';
                			flag = token.substring(0,8).toLowerCase() === 'noscript';
                		}
                		else {
                			right += token + ' ';
                		}
                	}


                	var results = this;
                	var noscripts = [];

	               //Now loop through each noscript tag
                	$(left).each(function() {

                		//Get text content of noscript tag
                		var elements = $(this.textContent).find(right);

                		//Loop through each element in the fragment
                		elements.each(callback);
                			
                		//Add to results for chaining
                		results.add(elements);

                		noscripts.push({parent: $(this), elements: elements});
               	}

               	//Add results to dom
            		if (options.viewport.toLowerCase() === 'none') addToDom();

		return results;


		function addToDom() {

			for (var i=0, len=noscripts.length; i<len; i++) {
				var noscript = noscripts[i];

				
			}
		}
	};
	
})(jQuery);