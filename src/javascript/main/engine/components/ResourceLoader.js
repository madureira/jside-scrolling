Game.define('ResourceLoader', 'engine/components', (function(fn, undefined) {

    var IMG_TYPES = [
        'png',
        'jpg',
        'gif',
        'jpeg'
    ];


    fn.prototype.load = function(itens, callback) {
        this.callback = callback;

        this.imagesLoaded = 0;
        this.soundsLoaded = 0;
        this.imageList = [];
        this.soundList = [];

        for (var index in itens) {
            var resource = itens[index];
            var type = resource.substr((~-resource.lastIndexOf(".") >>> 0) + 2);

            if (IMG_TYPES.indexOf(type) >= 0) {
                this.imageList.push(Game.settings.path.assets.image + resource);
            } else {
                this.soundList.push(Game.settings.path.assets.sound + resource + '.mp3');
                this.soundList.push(Game.settings.path.assets.sound + resource + '.ogg');
            }
        }

        _loadSounds(this);
    };

    function _loadImages(self) {
        var images = [];

        for (var index in self.imageList) {
            images[index] = new Image();
            images[index].onload = function() {
                if (++self.imagesLoaded === self.imageList.length) {
                    console.log('Load all images');
                    _callback(self);
                }
            }
            images[index].src = self.imageList[index];
        }
    }

    function _loadSounds(self) {
        var sounds = [];

        for(var index in self.soundList) {
            sounds[index] = new Audio();
            sounds[index].addEventListener('canplaythrough', function() {
                if (++self.soundsLoaded === self.soundList.length) {
                    console.log('Load all sounds');
                    _loadImages(self);
                }
            }, false);
            sounds[index].src = self.soundList[index];
        }
    }

    function _callback(self) {
        self.callback();
    }

    return fn;

}));
