var singleImages = function(path, methods) {
    var d1 = $.Deferred();
    var im1 = createsingleimg(path, methods[0]);
    im1.load(d1.resolve);
    var config = {
        wrapperClassName: "mglass_wrapper mglass_wrapper_square",
        viewerClassName: "mglass_viewer mglass_viewer_square"
    };
    $.when(d1).done(function(d1) {
        MGlass(im1.attr('id'), im1.attr('src'), config);
    });
    return [im1];
}

var pairImages = function(path, methods) {
    var d1 = $.Deferred();
    var d2 = $.Deferred();
    var im1 = createimg(path, methods[0]);
    var im2 = createimg(path, methods[1]);
    im1.load(d1.resolve);
    im2.load(d2.resolve);
    var config = {
        wrapperClassName: "mglass_wrapper mglass_wrapper_square",
        viewerClassName: "mglass_viewer mglass_viewer_square"
    };
    $.when(d1, d2).done(function(d1, d2) {
        MGlass2(im1.attr('id'), im2.attr('id'), im1.attr('src'), im2.attr('src'), config);
    });
    return [im1, im2];
}

// loc i
// pos {0, 1}
var createsingleimg = (function() {
    var counter = 0;

    return function(path, img) {
        counter++;
        return $('<img></img>')
            .addClass('pure-u-1-1 img')
            .attr('id', 'simg' + counter)
	    .attr('width', '50%')
	    .attr('height', '50%')
            .attr('src', path + img + '.png');
    };
}());

// loc i
// pos {0, 1}
var createimg = (function() {
    var counter = 0;

    return function(path, img) {
        counter++;
        return $('<img></img>')
            .addClass('pure-u-1-2 img')
            .attr('id', 'img' + counter)
            .attr('src', path + img + '.png');
    };
}());

var createForm = function(url, attrs) {
    var form = $('<form/>', {
        action: url,
	style: 'display: none'
    });
    $('body').append(form);
    form.append($('<input type="submit"/>'));
    for (var attr in attrs) {
        form.append($('<input/>', {
            type: 'text',
            name: attr,
            value: attrs[attr]
        }));
    }
    return form;
};

var getParam = (function() {
    var params = $.url('?');

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    var path_method = params.vid.split(',');
    params.path = path_method[0];
    params.methods = shuffle([path_method[1], path_method[2]]);
    return function(e) {
        return params[e];
    };
})();

var submit = function(e) {
    var assignmentId = getParam('assignmentId');
    var choice;
    var path = getParam('path');
    var methods = getParam('methods');
    if (this.id == 'left-is-better') choice = methods[0];
    if (this.id == 'right-is-better') choice = methods[1];
//  https://www.mturk.com/mturk/externalSubmit
    var form = createForm('https://workersandbox.mturk.com/mturk/externalSubmit', {
        assignmentId: assignmentId,
        choice: choice,
        userchoice: this.id,
        width: $('.img').width(),
        height: $('.img').height(),
        methods: methods,
        path: path
    }).submit();
}

$(document).ready(function() {
    var path = getParam('path');
    var methods = getParam('methods');
    $('#image').append(singleImages(path, ['im']));
    for (var i = 0; i < 4; i++) {
	if (i==0 || i==3) {
        var methods_n = [methods[0]+'_'+i, methods[1]+'_'+i];
        $('#images').append(pairImages(path, methods_n));
    }
    }
    $('.submit-button').click(submit);
});
