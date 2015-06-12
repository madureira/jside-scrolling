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
        this.videosLoaded = 0;
        this.imageList = [];
        this.soundList = [];
        this.videoList = [];

        for (var index in itens) {
            var resource = itens[index];

            if (resource.image !== undefined) {
                var type = _getExtension(resource.image);

                if (IMG_TYPES.indexOf(type) >= 0) {
                    this.imageList.push(Game.settings.path.assets.image + resource.image);
                }
            } else if (resource.audio !== undefined) {
                this.soundList.push(Game.settings.path.assets.sound + resource.audio + '.mp3');
                this.soundList.push(Game.settings.path.assets.sound + resource.audio + '.ogg');
            } else if (resource.video !== undefined) {
                this.videoList.push(Game.settings.path.assets.video + resource.video + '.mp4');
            }
        }

        _loadVideos(this);
    };

    function _loadVideos(self) {
        var videos = [];

        for(var index in self.videoList) {
            videos[index].src = self.videoList[index];
        }

        console.log('Load all videos');

        _loadSounds(self);
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

    function _getExtension(filename) {
        return filename.substr((~-filename.lastIndexOf(".") >>> 0) + 2);
    }

    function _callback(self) {
        self.callback();
    }

    return fn;

}));
