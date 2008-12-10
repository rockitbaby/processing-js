/*
 * This code searches for all the <script type="application/processing" target="canvasid">
 * in your page and loads each script in the target canvas with the proper id.
 * It is useful to smooth the process of adding Processing code in your page and starting
 * the Processing.js engine.
 *
 * this is hacked
 * to view all examples in iphone, without modifying the html and processing sources
 * - which only processes the first <script type="application/processing" tag.
 * - sets iphone specific meta tags
 * - sets the canvas size to 320 * 460
 * - set margins to zero
 */

if ( window.addEventListener ) {
	window.addEventListener("load", function() {
	
		var allCanvas = new Array();
		var scripts = document.getElementsByTagName("script");
		
		for ( var i = 0; i < scripts.length; i++ ) {
			if ( scripts[i].type == "application/processing" ) {
				var src = scripts[i].src, canvas = scripts[i].nextSibling;
	
				if ( src && src.indexOf("#") ) {
					canvas = document.getElementById( src.substr( src.indexOf("#") + 1 ) );
				} else {
					while ( canvas && canvas.nodeName.toUpperCase() != "CANVAS" )
						canvas = canvas.nextSibling;
				}

				if ( canvas ) {
					p = Processing(canvas, scripts[i].text);
					//break only process the first script tag in a page
					break;
				}
			}
		}
		if (canvas) {
			var body = document.getElementsByTagName('body')[0];
			body.innerHTML = '';
			body.appendChild(canvas);
			body.style.margin = '0';
			canvas.style.margin = '0';
			
			var head = document.getElementsByTagName('head')[0];
			var metaViewport = document.createElement('meta');
			metaViewport.setAttribute("name", "viewport");
			metaViewport.setAttribute("content", "width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;");
	
			var metaCapable = document.createElement('meta');
			metaCapable.setAttribute("name", "apple-mobile-web-app-capable");
			metaCapable.setAttribute("content", "yes");
			
			head.appendChild(metaViewport);
			head.appendChild(metaCapable);
			
			p.size(320, 460);
		}
		
	}, false);
}
