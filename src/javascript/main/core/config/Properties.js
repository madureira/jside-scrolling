// The main object
var Game = Game || {};

Game.domain = 'http://jside-scrolling.madureira.me';

Game.ready = Game.ready || {};
Game.start = Game.start || {};
Game.templates = Game.templates || {};
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
Game.settings.path.assets.image = Game.domain + '/bin/images/';
Game.settings.path.assets.sound = Game.domain + '/bin/sounds/';
Game.settings.path.assets.video = Game.domain + '/bin/videos/';
