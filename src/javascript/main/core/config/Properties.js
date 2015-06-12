// The main object
var Game = Game || {};

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
Game.settings.path.assets.image = '../bin/images/';
Game.settings.path.assets.sound = '../bin/sounds/';
Game.settings.path.assets.video = '../bin/videos/';

