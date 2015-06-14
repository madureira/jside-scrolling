/**
 * Query selector to element dom.
 *
 * @author madureira
 *
 */
Game.$ = {
    byId: function(id) {
        return document.getElementById(id);
    }
};



/**
 * Custom functions
 */



Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

Element.prototype.addClass = function(className) {
    var classes = this.className.trim().split(' ');

    if (classes.indexOf(className) === -1) {
        classes.push(className)
        this.className = classes.join(' ');;
    }
}

Element.prototype.removeClass = function(className) {
    var classes = this.className.trim().split(' '),
        index = classes.indexOf(className);

    if (index !== -1) {
        delete classes[index];
        this.className = classes.join(' ');
    }
}
