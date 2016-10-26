/**
 * @author Piotr Salaciak 2010-11-24
 * @version 1.0
 */

/**
 * @return MGlass class instance
 * @param {String} imageId Small image identififier
 * @param {String} largeImageSrc Large image URL
 * @param {Object} configObject Configuration for this instance
 */
function MGlass(imageId, largeImageSrc, configObject){
	this.smallImage = document.getElementById(imageId);
	this.largeImage = new Image();
	this.largeImage.src = largeImageSrc;

	this.config = (configObject || {});

	this.onMouseMove = function(e){
		if (typeof e === "undefined")
			e = event;
		var wrapper = this;
		var mglassViewer = wrapper.childNodes[0];
		var img = wrapper.childNodes[1];
		var pageOffset = MGlass.getPageOffset();
		var imagePosition = MGlass.getElementPosition(img);
		
		if (imagePosition.x <= (e.clientX + pageOffset.x) && 
			imagePosition.y <= (e.clientY + pageOffset.y) && 
			imagePosition.x + img.clientWidth >= (e.clientX + pageOffset.x) && 
			imagePosition.y + img.clientHeight >= (e.clientY + pageOffset.y)){
			
			mglassViewer.style.visibility = 'visible';
			var x = (e.clientX + pageOffset.x);
			var y = (e.clientY + pageOffset.y);
			
			mglassViewer.style.left = (x - (mglassViewer.clientWidth / 2)) + "px";
			mglassViewer.style.top = (y - (mglassViewer.clientHeight / 2)) + "px";

			var srcX = x - imagePosition.x;
			var srcY = y - imagePosition.y;
			
			var dstX = (srcX * (this.tag.largeImage.width - mglassViewer.clientWidth)) / img.clientWidth;
			var dstY = (srcY * (this.tag.largeImage.height - mglassViewer.clientHeight)) / img.clientHeight;
			mglassViewer.style.backgroundPosition = (-dstX) + "px " + (-dstY) +  "px";
		} else {
			mglassViewer.style.visibility = 'hidden';
		}	
	}
	this.onMouseOut = function(e){
		if (typeof e === "undefined")
			e = event;
		var wrapper = this;
		var mglassViewer = wrapper.childNodes[0];
		var img = wrapper.childNodes[1];
		var pageOffset = MGlass.getPageOffset();
		var imagePosition = MGlass.getElementPosition(img);
		
		if (!(imagePosition.x <= (e.clientX + pageOffset.x) && 
			imagePosition.y <= (e.clientY + pageOffset.y) && 
			imagePosition.x + img.clientWidth >= (e.clientX + pageOffset.x) && 
			imagePosition.y + img.clientHeight >= (e.clientY + pageOffset.y))){
			mglassViewer.style.visibility = 'hidden';
		}
		
	}
	
	var wrapperElement = document.createElement("DIV");
	wrapperElement.className = (this.config.wrapperClassName || "mglass_wrapper");
	wrapperElement.tag = this;
	wrapperElement.name = "mglass_wrapper";
	wrapperElement.style.width = this.smallImage.width + "px";
	wrapperElement.style.height = this.smallImage.height + "px";
	wrapperElement.onmousemove = this.onMouseMove;
	wrapperElement.onmouseout = this.onMouseOut;
	
	var viewerElement = document.createElement("DIV");
	viewerElement.className = (this.config.viewerClassName || "mglass_viewer");
	viewerElement.name = "mglass_viewer";
	viewerElement.style.backgroundImage = "url('"+ this.largeImage.src +"')";
	if (this.config.innerHTML)
		viewerElement.innerHTML = this.config.innerHTML;

	var pictureBoxElement = document.createElement("DIV");
	pictureBoxElement.className = (this.config.pictureBoxClassName || "mglass_picture_box");
	pictureBoxElement.name = "mglass_picture_box";
	pictureBoxElement.style.width = this.smallImage.width + "px";
	pictureBoxElement.style.height = this.smallImage.height + "px";
	
	wrapperElement.appendChild(viewerElement);
	wrapperElement.appendChild(pictureBoxElement);
	
	this.smallImage.parentNode.replaceChild(wrapperElement, this.smallImage);
	pictureBoxElement.appendChild(this.smallImage);
}

/**
 * @return page current offset, that is object with x and y coordinates.
 */
MGlass.getPageOffset = function () {
	var scrOfX = 0, scrOfY = 0;
	if (typeof(window.pageYOffset) == 'number') {
		scrOfX = window.pageXOffset;
		scrOfY = window.pageYOffset;
	} else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
		scrOfX = document.body.scrollLeft;
		scrOfY = document.body.scrollTop;
	} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
		scrOfX = document.documentElement.scrollLeft;
		scrOfY = document.documentElement.scrollTop;
	}
	return {x: scrOfX, y: scrOfY};
}

/**
 * @return element's current offset, regarding all it's parents offset
 * @param {HTMLElement} obj element for which offset is calculated
 */
MGlass.getElementPosition = function(obj){
	var curentLeft = 0, currentTop = 0;
	if (obj.offsetParent) {
		do {
			curentLeft += obj.offsetLeft;
			currentTop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return {x: curentLeft, y: currentTop};
}