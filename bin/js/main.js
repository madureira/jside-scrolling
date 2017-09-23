/**
 * This is the game configuration file.
 * Here you can change the behaviour of the features of the entire game.
 * Be careful when change the default settings.
 *
 * @author madureira
 */
var Game = Game || {};
Game.ready = Game.ready || {};
Game.start = Game.start || {};
Game.templates = Game.templates || {};
Game.stylesheet = Game.stylesheet || {};
Game.settings = Game.settings || {};
Game.settings.viewport = Game.settings.viewport || {};
Game.settings.path = Game.settings.path || {};
Game.settings.path.assets = Game.settings.path.assets || {};



// Game settings
Game.settings.viewport.width =  640;
Game.settings.viewport.height = 480;
Game.settings.isLoggerEnabled = true;
Game.settings.FPS = 30;



// Game assets paths
Game.settings.path.assets.image = 'bin/images/';
Game.settings.path.assets.sound = 'bin/sounds/';
Game.settings.path.assets.video = 'bin/videos/';



// This section is reserved to stylesheet variables of congiguration.
Game.stylesheet.viewport_width = Game.settings.viewport.width;
Game.stylesheet.viewport_height = Game.settings.viewport.height;




//######################################################################################
//### WARNING - Don't change or remove this line, this need to be exactly like this: ###
//######################################################################################

//######################################################################################
//######################################################################################

/**
 * This object contains several useful methods.
 *
 * @author madureira
 *
 */
Game.Helpful = {

    isNull: function(value) {
        return (value === undefined || value === null);
    },

    isNumber: function(number) {
        return (typeof number === 'number');
    },

    hasOnlyNumbers: function(list) {
        var isNumber = true;
        for (var i=0; i < list.length; i++) {
            if (!App.Helpful.isNumber(list[i])) {
                isNumber = false;
                break;
            }
        }

        return isNumber;
    },

    isArray: function(array) {
        return (array instanceof Array);
    },

    mergeObjects: function(source, target) {
        if (source === undefined) {
            return target;
        }

        for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                target[property] = target[property] || {};
                arguments.callee(source[property], target[property]);
            } else {
                target[property] = source[property];
            }
        }

        return target;
    },

    isNodeWebkit: function() {
        return (typeof process === "object");
    },

    isObject: function(value) {
        return (value !== undefined && value !== null && (typeof value === 'object'));
    },

    isFunction: function(value) {
        return (typeof value === 'function');
    }

};

/**
 * The system log.
 *
 * @author madureira
 *
 */
var Logger = {

    info: function(message) {
        if (Game.settings.isLoggerEnabled) {
            console.log(message);
        }
    },

    debug: function(emitter, message) {
        if (Game.settings.isLoggerEnabled) {
            console.debug('DEBUG: ' + emitter + ' >\t', message);
        }
    }

};

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

/**
 * This function is responsible to generate the namespace dynamically.
 *
 * @author madureira
 *
 * @param string object name
 * @param string namespace
 * @param object the object function
 *
 * @return void
 */
Game.define = Game.define || function(clazz, namespace, object) {

    /**
     * Generates an object based on array.
     * # Example
     *      Given: array([0] => 'a', [1] => 'b')
     *      Return: Object({ a: { b: {} } });
     *
     * @param list Array
     *
     * @return object
     */
    function generatesObjectByArray(list) {
        var namespaceTree = {};
        var rootPackage = list[0];

        list.reverse();

        for (var i=0; list.length > i; i++) {
            var tmp = {};

            if (i === 0) {
                var implementation = {};

                implementation = object(function(){});

                tmp[list[i]] = implementation;
            } else {
                tmp[list[i]] = namespaceTree;
            }

            namespaceTree = tmp;
        }

        return namespaceTree;
    }

    /**
     * Creates a namespace or merge if it exist on namespace container tree.
     *
     * @param namespace object
     * @param context object
     *
     * @return object
     */
    function createNamespace(namespace, context) {
        return Game.Helpful.mergeObjects(namespace, context);
    }

    var namespaceList = namespace.split('/');
    namespaceList.push(clazz);

    var newNamespaceObject = generatesObjectByArray(namespaceList);

    Game = createNamespace(newNamespaceObject, Game);

};

/**
 * Responsible to boot the game.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Boot', 'engine/boot', (function(fn, undefined) {
    'use strict';

    var Stage;

    // constructor
    fn = function() {
        // importing Stage
        Stage = Game.engine.ui.stage.Stage;
    };

    fn.prototype.init = function() {
        Logger.info('Booting...');

        var stage = new Stage();
        stage.init();
        stage.buildScene();
    };

    return fn;

}));

/**
 * Responsible to create an image.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('GameImage', 'engine/components', (function(fn, undefined) {
    'use strict';

    var STAGE_WIDTH = Game.settings.viewport.width,
        STAGE_HEIGHT = Game.settings.viewport.height;

    fn = function(context, options) {

        var defaultSettings = {
            imgSrc: '',
            posX: 0,
            posY: 0,
            width: 0,
            height: 0,
            limitUp: 0,
            limitDown: 0,
            limitLeft: 0,
            limitRight: 0
        };

        var settings = Game.Helpful.mergeObjects(options, defaultSettings);

        this.context    = context;
        this.x          = settings.posX;
        this.y          = settings.posY;
        this.w          = settings.width;
        this.h          = settings.height;
        this.lmtU       = settings.limitUp;
        this.lmtD       = settings.limitDown;
        this.lmtL       = settings.limitLeft;
        this.lmtR       = settings.limitRight;

        var img = new Image();
        img.src = Game.settings.path.assets.image + settings.imgSrc;

        this.image = img;
    };

    fn.prototype.draw = function() {
        this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    };

    fn.prototype.clearStage = function() {
        this.context.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    };

    return fn;

}));

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

        _addLoader(this);

        _loadVideos(this);
    };

    function _addLoader(self) {
        var LoaderUI = Game.engine.ui.loader.Loader;
        self.loader = new LoaderUI();
        self.loader.on();
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
                var readyToLoad = setInterval(function() {
                    if (video._videoControl.duration) {
                        clearInterval(readyToLoad);
                        percent = (video._videoControl.buffered.end(0) / video._videoControl.duration) * 100;
                        Logger.info('Video '+ i +', progress: ' + Math.round(percent) + '%');
                        if (parseInt(percent) >= 100) {
                            Logger.info('Video' + i + ', completely loaded!');
                            video._videoControl.currentTime = 1;
                            if (++self.videosLoaded === self.videoList.length) {
                                Logger.info('All videos loaded');
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
                    Logger.info('Load all sounds');
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
                    Logger.info('Load all images');
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
        self.loader.off();
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

/**
 * This prototype is responsible to the entire control of the game.
 *
 * @author madureira
 *
 */
Game.define('Controller', 'engine/input', (function(fn, undefined) {
    'use strict';

    var Keyboard,
        Gamepad,
        gamepadIsConnected = false;


    fn = function() {
        Logger.info('Initing controller');

        this.controller = null;
        this.currentController = 'KEYBOARD';

        Keyboard = Game.engine.input.Keyboard;
        Gamepad = Game.engine.input.Gamepad;

        _initController(this);
        _updateConnectedGamepad(this);
    };

    function _updateConnectedGamepad(self) {
        setInterval(function() {
            if (!_getGamepad()) {
                gamepadIsConnected = false;

                if (self.currentController !== 'KEYBOARD') {
                    self.currentController = 'KEYBOARD';
                    _initController(self);
                }
            } else {
                gamepadIsConnected = true;

                if (self.currentController !== 'GAMEPAD') {
                    self.currentController = 'GAMEPAD';
                    _initController(self);
                }
            }
        }, 1000);
    }

    function _initController(self) {
        if (_hasGamepadSupport() && gamepadIsConnected) {
            Logger.info('Selecting gamepad as default controller');
            self.controller = new Gamepad();
        } else {
            Logger.info('Selecting keyboard as default controller');
            self.controller = new Keyboard();
        }

        self.controller.init();
    };

    function _getGamepad() {
        return navigator.getGamepads()[0];
    }

    function _hasGamepadSupport() {
        return "getGamepads" in navigator;
    }


    return fn;

}));

/**
 * This prototype is responsible to configure gamepad and register the triggers.
 *
 * @author madureira
 *
 */
Game.define('Gamepad', 'engine/input', (function(fn, undefined) {
    'use strict';


    var AXES = {
        UP: -1,
        DOWN: 1,
        RIGHT: 1,
        LEFT: -1,
        NEUTRAL: 0
    };


    fn = function() {
        Logger.info('Configuring gamepad controller');

        // move to up
        this.up = false;

        // move to down
        this.down = false;

        // move to right
        this.right = false;

        // move to left
        this.left = false;

    };

    fn.prototype.init = function() {
        _mappingButtons(this);
    };

    fn.prototype.check = function() {
        _mappingButtons(this);
    };

    function _mappingButtons(self) {
        var gp = _getGamepad();

        if (gp !== undefined) {
            for(var i=0; i <= 1; i++) {
                if (gp.axes[0] === AXES.RIGHT) {
                    self.right = true;
                    self.left = false;
                } else if (gp.axes[0] === AXES.LEFT) {
                    self.left = true;
                    self.right = false;
                }

                if (gp.axes[1] === AXES.UP) {
                    self.up = true;
                    self.down = false;
                } else if (gp.axes[1] === AXES.DOWN) {
                    self.down = true;
                    self.up = false;
                }

                if (gp.axes[0] === AXES.NEUTRAL) {
                    self.right = false;
                    self.left = false;
                }

                if (gp.axes[1] === AXES.NEUTRAL) {
                    self.up = false;
                    self.down = false;
                }
            }
        }
    }

    function _getGamepad() {
        return navigator.getGamepads()[0];
    }


    return fn;

}));

/**
 * This prototype is responsible to configure keyboard and register the triggers.
 *
 * @author madureira
 *
 */
Game.define('Keyboard', 'engine/input', (function(fn, undefined) {
    'use strict';

    var KEYBOARD = {
        UP: [38, 87],
        DOWN: [40, 83],
        RIGHT: [39, 68],
        LEFT: [37, 65]
    };

    // Default contructor
    fn = function() {
        Logger.info('Configuring keyboard controller');

        // move to up
        this.up = false;

        // move to down
        this.down = false;

        // move to right
        this.right = false;

        // move to left
        this.left = false;
    };

    /**
     * Create the listener to keyboard input.
     *
     * @return void
     *
     */
    fn.prototype.init = function() {
        var self = this;

        document.onkeydown = function(e) {
            e = e || window.event;

            switch (e.keyCode) {
                case KEYBOARD.UP[0]:
                case KEYBOARD.UP[1]:
                    self.up = true;
                    break;

                case KEYBOARD.DOWN[0]:
                case KEYBOARD.DOWN[1]:
                    self.down = true;
                    break;

                case KEYBOARD.RIGHT[0]:
                case KEYBOARD.RIGHT[1]:
                    self.right = true;
                    break;

                case KEYBOARD.LEFT[0]:
                case KEYBOARD.LEFT[1]:
                    self.left = true;
                    break;
            };
        };


        document.onkeyup = function(e) {
            e = e || window.event;

            switch (e.keyCode) {
                case KEYBOARD.UP[0]:
                case KEYBOARD.UP[1]:
                    self.up = false;
                    break;

                case KEYBOARD.DOWN[0]:
                case KEYBOARD.DOWN[1]:
                    self.down = false;
                    break;

                case KEYBOARD.RIGHT[0]:
                case KEYBOARD.RIGHT[1]:
                    self.right = false;
                    break;

                case KEYBOARD.LEFT[0]:
                case KEYBOARD.LEFT[1]:
                    self.left = false;
                    break;
            };
        };
    };

    fn.prototype.check = function() {};


    return fn;

}));

Game.define('SceneManager', 'engine/scene', (function(fn, undefined) {
    'use strict';

    var GameImage,
        Controller,
        Sound,
        Video,
        SoundManager,
        ResourceLoader;


    var TIME_TO_START = 3000, // miliseconds
        HORIZON_SPEED = 5,
        BACKGROUND_SPEED = 8,
        LEVEL_SPEED = 12,
        SCREEN_SCALE = 1.9;

    fn = function() {
        GameImage = Game.engine.components.GameImage;
        Controller = Game.engine.input.Controller;
        Sound = Game.engine.sound.Sound;
        Video = Game.engine.video.Video;
        SoundManager = Game.engine.sound.SoundManager;
        ResourceLoader = Game.engine.components.ResourceLoader;
    };

    /**
     * Responsible to init scene and load all resources.
     *
     * @param {Canvas} stage
     *
     * @return void
     *
     */
    fn.prototype.init = function(stage) {
        Logger.info('Init scene');

        var controller = new Controller();

        var ctx = stage.context2D;
        ctx.scale(SCREEN_SCALE, SCREEN_SCALE);

        var resourceLoader = new ResourceLoader();
        resourceLoader.load([
            {video: 'intro'},
            {audio: 'theme2_1_1'},
            {audio: 'theme_1_1'},
            {image: 'parallax/horizon_parallax.png'},
            {image: 'parallax/tree_parallax.png'},
            {image: 'level/1_1.png'}
        ], function() {
            _firstLevelStart(ctx, controller);
        });
    };

    function _firstLevelStart(ctx, controller) {
        var horizonParallax = new GameImage(ctx, {
            imgSrc: 'parallax/horizon_parallax.png',
            width: 10240,
            height: 512,
            posY: -80,
            limitUp: -80,
            limitDown: -100,
            limitLeft: 0,
            limitRight: -2080
        });

        var backgroundParallax = new GameImage(ctx, {
            imgSrc: 'parallax/tree_parallax.png',
            width: 10240,
            height: 512,
            posY: -100,
            limitUp: -100,
            limitDown: -180,
            limitLeft: 0,
            limitRight: -3325
        });

        var levelImage = new GameImage(ctx, {
            imgSrc: 'level/1_1.png',
            width: 5376,
            height: 512,
            limitUp: 0,
            limitDown: -230,
            limitLeft: 0,
            limitRight: -5000
        });

        var soundTheme2 = new Sound({
            id: 'theme2_1_1',
            autoplay: false,
            repeat: false
        });

        var soundTheme = new Sound({
            id: 'theme_1_1',
            autoplay: false,
            repeat: true,
            whenFinish: soundTheme2
        });

        var soundManager = new SoundManager();
        soundManager.add(soundTheme2);
        soundManager.add(soundTheme);

        var video = new Video({
            id: 'intro',
            autoplay: true,
            repeat: false,
            whenFinish: function() {
                soundTheme.play();
            }
        });

        // Init the level
        _gameLoop(video, soundManager, horizonParallax, backgroundParallax, levelImage, controller);
    }

    function _gameLoop(video, soundManager, horizonParallax, backgroundParallax, levelImage, controller) {
        setTimeout(function() {
            video.play();
            soundManager.play();

            setInterval(function() {
                _clearStage(horizonParallax);

                _moveImage(horizonParallax, controller, HORIZON_SPEED);
                _moveImage(backgroundParallax, controller, BACKGROUND_SPEED);
                _moveImage(levelImage, controller, LEVEL_SPEED);

            }, 1000 / Game.settings.FPS);

        }, TIME_TO_START);
    }

    function _moveImage(image, controller, speed) {
        image.draw();

        controller = controller.controller;

        controller.check();

        if (controller.right) {
            image.x -= speed;
        } else if (controller.left) {
            image.x += speed;
        }

        if (controller.up) {
            image.y += speed;
        } else if (controller.down) {
            image.y -= speed;
        }

        if (image.lmtU <= image.y) {
            image.y = image.lmtU;
        } else if (image.lmtD >= image.y) {
            image.y = image.lmtD;
        }

        if (image.x >= image.lmtL) {
            image.x = image.lmtL;
        } else if (image.x <= image.lmtR) {
            image.x = image.lmtR;
        }
    }

    function _clearStage(imageRef) {
        imageRef.clearStage();
    }


    return fn;

}));

/**
 * This prototype is responsible to create a sound.
 *
 * @author madureira
 *
 * @param {Function} fn
 * @param {undefined} undefined
 *
 */
Game.define('Sound', 'engine/sound', (function(fn, undefined) {
    'use strict';

    var SOUND_PATH = Game.settings.path.assets.sound;
    var SoundUI;


    // Default contructor
    fn  = function(options) {
        SoundUI = Game.engine.ui.sound.Sound;

        var defaultSettings = {
            id: '',
            autoplay: false,
            repeat: false,
            whenFinish: null
        };

        var settings = Game.Helpful.mergeObjects(options, defaultSettings);

        this.id         = settings.id;
        this.mp3        = SOUND_PATH + this.id + '.mp3';
        this.ogg        = SOUND_PATH + this.id + '.ogg';
        this.autoplay   = settings.autoplay;
        this.repeat     = settings.repeat;
        this.whenFinish = settings.whenFinish;

        var soundUi = new SoundUI({
            id: this.id,
            mp3: this.mp3,
            ogg: this.ogg,
            autoplay: this.autoplay
        });

        this._soundControl = soundUi;

        return this;
    };

    fn.prototype.play = function() {
        this._soundControl.play();
    };

    fn.prototype.stop = function() {
        this._soundControl.stop();
    };


    return fn;

}));

/**
 * This prototype is responsible to manager the sound of the game.
 *
 * @author madureira
 *
 * @param {Function} fn
 * @param {undefined} undefined
 *
 */
Game.define('SoundManager', 'engine/sound', (function(fn, undefined) {
    'use strict';

    // Default contructor
    fn = function() {
        Logger.info('Initing the sound...');

        this.sounds = [];
    }

    fn.prototype.add = function(sound) {
        this.sounds.push(sound);

        var event = new Event('ended');

        // play next sound
        if (Game.Helpful.isObject(sound.whenFinish)) {
            var nextSound = sound.whenFinish;

            var element = Game.$.byId('sound-' + sound.id);

            element.addEventListener('ended', function (e) {
                nextSound.play();
            });

            if (sound.repeat) {
                var el = Game.$.byId('sound-' + nextSound.id);

                el.addEventListener('ended', function(e) {
                    setTimeout(function() {
                        sound.play();
                    }, 3000);
                });
            }
        }
    };

    fn.prototype.play = function() {
        for (var sound in this.sounds) {
            sound = this.sounds[sound];
            if (sound.autoplay) {
                sound.play();
            }
        }
    };

    return fn;

}));

/**
 * This prototype is responsible to create a video.
 *
 * @author madureira
 *
 * @param {Function} fn
 * @param {undefined} undefined
 *
 */
Game.define('Video', 'engine/video', (function(fn, undefined) {
    'use strict';

    var VIDEO_PATH = Game.settings.path.assets.video;
    var VideoUI;

    fn = function(options) {
        VideoUI = Game.engine.ui.video.Video;

        var defaultSettings = {
            id: '',
            autoplay: false,
            repeat: false,
            whenFinish: null
        };

        var settings = Game.Helpful.mergeObjects(options, defaultSettings);

        this.id         = settings.id;
        this.videoPath  = VIDEO_PATH + this.id;
        this.autoplay   = settings.autoplay;
        this.repeat     = settings.repeat;
        this.whenFinish = settings.whenFinish;

        this._videoControl = Game.$.byId('video-' + this.id);

        _manageCallback(this);

        return this;
    };

    function _manageCallback(self) {
        if (Game.Helpful.isFunction(self.whenFinish)) {
            self._videoControl.addEventListener('ended', function (e) {
                self.whenFinish();
                self.hide();
            });
        }
    }

    fn.prototype.play = function() {
        Logger.info('Play video...');
        this._videoControl.removeClass('hide');
        this._videoControl.play();
    };

    fn.prototype.stop = function() {
        Logger.info('Pause video...');
        this._videoControl.addClass('hide');
        this._videoControl.pause();
    };

    fn.prototype.hide = function() {
        this._videoControl.addClass('hide');
        Game.$.byId('videos').addClass('hide');
    };

    return fn;

}));

/**
 * Responsible to build the markup to loader.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Loader', 'engine/ui/loader', (function(fn, undefined) {
    'use strict';

    /**
     * Put the loader on the HTML.
     *
     * @return void
     *
     */
    fn  = function() {
        this.$loader = Game.$.byId('loader');
        return this;
    };

    fn.prototype.on = function() {
        this.$loader.addClass('on');
    };

    fn.prototype.off = function() {
        this.$loader.removeClass('on');
    };

    return fn;

}));

/**
 * Responsible to build the markup to sound.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Sound', 'engine/ui/sound', (function(fn, undefined) {
    'use strict';

    /**
     * Put the sound on the HTML.
     *
     * @param {JSON} sound
     *
     * @return void
     *
     */
    fn  = function(sound) {
        var soundTemplate = Game.templates.sound_markup(sound);
        var autoplay = sound.autoPlay;
        var $sounds = Game.$.byId('sounds');

        $sounds.insertAdjacentHTML('beforeend', soundTemplate);
        this._soundControl = Game.$.byId('sound-' + sound.id);

        return this;
    };

    fn.prototype.play = function() {
        this._soundControl.play();
    };

    fn.prototype.stop = function() {
        this._soundControl.stop();
    };

    return fn;

}));

/**
 * Responsible to build and render the stage.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Stage', 'engine/ui/stage', (function(fn, undefined) {
    'use strict';

    var Scene;

    // constructor
    fn = function() {
        this.canvas = null;
        this.context2D = null;

        // import scene manager
        Scene = Game.engine.scene.SceneManager;
    };

    fn.prototype.init = function() {
        Logger.info('Building stage...');

        var viewport = Game.templates.stage_viewport({
            width: Game.settings.viewport.width,
            height: Game.settings.viewport.height
        });

        var mainStage = Game.templates.stage_main({ "viewport": viewport } );

        var $stage = Game.$.byId('stage');
        $stage.insertAdjacentHTML('beforeend', mainStage);

        this.canvas = Game.$.byId('board');
        this.context2D = this.canvas.getContext('2d');
    };

    fn.prototype.buildScene = function() {
        var scene = new Scene();
        scene.init(this);
    };

    return fn;

}));

/**
 * Responsible to build the markup to video.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Video', 'engine/ui/video', (function(fn, undefined) {
    'use strict';

    var VIDEO_WIDTH = Game.settings.viewport.width,
        VIDEO_HIGHT = Game.settings.viewport.height;

    /**
     * Put the video on the HTML.
     *
     * @param {JSON} video
     *
     * @return void
     *
     */
    fn  = function(options) {
        options.width = VIDEO_WIDTH;
        options.height = VIDEO_HIGHT;

        var videoTemplate = Game.templates.video_markup(options);
        var $videos = Game.$.byId('videos');

        $videos.insertAdjacentHTML('beforeend', videoTemplate);

        this._videoControl = Game.$.byId('video-' + options.id);
        //this._videoControl.load();

        var evt = document.createEvent('Event');
        evt.initEvent('onload', true, true);

        var self = this;
        this.observer = setTimeout(function() {
            if (self._videoControl.readyState === 4) {
                self._videoControl.dispatchEvent(evt);
                clearTimeout(self.observer);
            }
        }, 500);

        return this;
    };

    fn.prototype.play = function() {
        this._videoControl.play();
    };

    fn.prototype.stop = function() {
        this._videoControl.stop();
    };

    return fn;

}));

// Verify if all game contents are loaded
Game.ready = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(Game.ready);
        Logger.info('Content loaded');
        Game.start();
    }
}, 10);

// Init the game
Game.start = function() {
    Logger.info('Starting...');

    var Boot = Game.engine.boot.Boot,
    boot = new Boot();
    boot.init();
};
