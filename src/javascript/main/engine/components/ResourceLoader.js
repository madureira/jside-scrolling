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
                this.videoList.push(resource.video + '.mp4');
            }
        }

        _loadVideos(this);
    };

    function _loadVideos(self) {
        var videos = [];
        var VideoUI = Game.engine.ui.video.Video;

        for(var index in self.videoList) {
            var id = _getIdFromVideoPathName(self.videoList[index]);
            var videoPath = _getPathFromVideoPathName(self.videoList[index]);

            videos[index] = { id: id, videoPath: Game.settings.path.assets.video + videoPath };
        }

        for (var i=0; i < videos.length; i++) {
            var video = new VideoUI(videos[i]);
            var percent = 0;
            video._videoControl.addEventListener('progress', function() {
                console.log('Video '+ i +', loading...');

                var verifyDuration = setInterval(function() {
                    if (video._videoControl.duration) {
                        clearInterval(verifyDuration);
                        percent = (video._videoControl.buffered.end(0) / video._videoControl.duration) * 100;
                        console.log('Video '+ i +', progress: ' + Math.round(percent) + '%');
                        if (parseInt(percent) >= 100) {
                            console.log('Video' + i + ', completely loaded!');
                            video._videoControl.currentTime = 1;
                            if (++self.videosLoaded === self.videoList.length) {
                                console.log('All videos loaded');
                                _loadSounds(self);
                            }
                        }
                        video._videoControl.currentTime++;
                    }
                }, 500);

            });
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

    function _getIdFromVideoPathName(pathname) {
        var fragments = pathname.split('/'),
        length = fragments.length,
        fullname = fragments[length-1];

        fullname = fullname.split('.');
        delete fullname[fullname.length-1];

        return fullname.join('');
    }

    function _getPathFromVideoPathName(pathname) {
        pathname = pathname.split('.');
        delete pathname[pathname.length-1];

        pathname = pathname.join('');

        return pathname;
    }

    return fn;

}));
