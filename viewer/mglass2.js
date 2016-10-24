/**
 * @author Piotr Salaciak 2010-11-24
 * @version 1.0
 * @author Zhaowen Wang 2014-09-21
 * @version 1.1
 * two images side by side
 */

/**
 * @return MGlass class instance
 * @param {String} imageId Small image identififier
 * @param {String} largeImageSrc Large image URL
 * @param {Object} configObject Configuration for this instance
 */
function MGlass2(imageId1, imageId2, largeImageSrc1, largeImageSrc2, configObject) {
    this.smallImage1 = document.getElementById(imageId1);
    this.smallImage2 = document.getElementById(imageId2);
    this.largeImage1 = new Image();
    this.largeImage1.src = largeImageSrc1;
    this.largeImage2 = new Image();
    this.largeImage2.src = largeImageSrc2;

    this.config = (configObject || {});

    this.onMouseMove = function(e) {
        if (typeof e === "undefined")
            e = event;
        var wrapper = this;
        var mglassViewer1 = wrapper.childNodes[0];
        var mglassViewer2 = wrapper.childNodes[1];
        var img = wrapper.childNodes[2];
        var pageOffset = MGlass2.getPageOffset();
        var imagePosition = MGlass2.getElementPosition(img);

        if (imagePosition.x <= (e.clientX + pageOffset.x) &&
            imagePosition.y <= (e.clientY + pageOffset.y) &&
            imagePosition.x + img.clientWidth >= (e.clientX + pageOffset.x) &&
            imagePosition.y + img.clientHeight >= (e.clientY + pageOffset.y)) {
            mglassViewer1.style.visibility = 'visible';
            mglassViewer2.style.visibility = 'visible';
            var x = (e.clientX + pageOffset.x);
            var y = (e.clientY + pageOffset.y);
            if (x - imagePosition.x > this.tag.smallImage1.width) {
                x = x - this.tag.smallImage1.width;
            }

            mglassViewer1.style.left = (x - (mglassViewer1.clientWidth / 2)) + "px";
            mglassViewer1.style.top = (y - (mglassViewer1.clientHeight / 2)) + "px";
            mglassViewer2.style.left = (x + this.tag.smallImage1.width - (mglassViewer2.clientWidth / 2)) + "px";
            mglassViewer2.style.top = (y - (mglassViewer2.clientHeight / 2)) + "px";

            var srcX = x - imagePosition.x;
            var srcY = y - imagePosition.y;
            var dstX = (srcX * (this.tag.largeImage1.width)) / (img.clientWidth / 2) - mglassViewer1.clientWidth / 2;
            var dstY = (srcY * (this.tag.largeImage1.height)) / img.clientHeight - mglassViewer1.clientHeight / 2;
            mglassViewer1.style.backgroundPosition = (-dstX) + "px " + (-dstY) + "px";
            mglassViewer2.style.backgroundPosition = (-dstX) + "px " + (-dstY) + "px";
        } else {
            mglassViewer1.style.visibility = 'hidden';
            mglassViewer2.style.visibility = 'hidden';
        }
    }
    this.onMouseOut = function(e) {
        if (typeof e === "undefined")
            e = event;
        var wrapper = this;
        var mglassViewer1 = wrapper.childNodes[0];
        var mglassViewer2 = wrapper.childNodes[1];
        var img = wrapper.childNodes[2];
        var pageOffset = MGlass2.getPageOffset();
        var imagePosition = MGlass2.getElementPosition(img);

        if (!(imagePosition.x <= (e.clientX + pageOffset.x) &&
                imagePosition.y <= (e.clientY + pageOffset.y) &&
                imagePosition.x + img.clientWidth >= (e.clientX + pageOffset.x) &&
                imagePosition.y + img.clientHeight >= (e.clientY + pageOffset.y))) {
            mglassViewer1.style.visibility = 'hidden';
            mglassViewer2.style.visibility = 'hidden';
        }
    }

    var wrapperElement = document.createElement("DIV");
    wrapperElement.className = (this.config.wrapperClassName || "mglass_wrapper");
    wrapperElement.tag = this;
    wrapperElement.name = "mglass_wrapper";
    wrapperElement.style.width = this.smallImage1.width + this.smallImage2.width + "px";
    wrapperElement.style.height = this.smallImage1.height + "px";
    wrapperElement.onmousemove = this.onMouseMove;
    wrapperElement.onmouseout = this.onMouseOut;

    var viewerElement1 = document.createElement("DIV");
    viewerElement1.className = (this.config.viewerClassName || "mglass_viewer");
    viewerElement1.name = "mglass_viewer1";
    viewerElement1.style.backgroundImage = "url('" + this.largeImage1.src + "')";
    if (this.config.innerHTML)
        viewerElement1.innerHTML = this.config.innerHTML;

    var viewerElement2 = document.createElement("DIV");
    viewerElement2.className = (this.config.viewerClassName || "mglass_viewer");
    viewerElement2.name = "mglass_viewer2";
    viewerElement2.style.backgroundImage = "url('" + this.largeImage2.src + "')";
    if (this.config.innerHTML)
        viewerElement2.innerHTML = this.config.innerHTML;

    var pictureBoxElement = document.createElement("DIV");
    pictureBoxElement.className = (this.config.pictureBoxClassName || "mglass_picture_box");
    pictureBoxElement.name = "mglass_picture_box";
    pictureBoxElement.style.width = this.smallImage1.width + this.smallImage2.width + "px";
    pictureBoxElement.style.height = this.smallImage1.height + "px";

    wrapperElement.appendChild(viewerElement1);
    wrapperElement.appendChild(viewerElement2);
    wrapperElement.appendChild(pictureBoxElement);

    this.smallImage1.parentNode.removeChild(this.smallImage2);
    this.smallImage1.parentNode.replaceChild(wrapperElement, this.smallImage1);
    pictureBoxElement.appendChild(this.smallImage1);
    pictureBoxElement.appendChild(this.smallImage2);
}

/**
 * @return page current offset, that is object with x and y coordinates.
 */
MGlass2.getPageOffset = function() {
    var scrOfX = 0,
        scrOfY = 0;
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
    return {
        x: scrOfX,
        y: scrOfY
    };
}

/**
 * @return element's current offset, regarding all it's parents offset
 * @param {HTMLElement} obj element for which offset is calculated
 */
MGlass2.getElementPosition = function(obj) {
    var curentLeft = 0,
        currentTop = 0;
    if (obj.offsetParent) {
        do {
            curentLeft += obj.offsetLeft;
            currentTop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return {
        x: curentLeft,
        y: currentTop
    };
}
