// The main object
var Game = Game || {};

Game.ready = Game.ready || {};
Game.start = Game.start || {};
Game.templates = Game.templates || {};


// Game settings
Game.settings = {};
Game.settings.viewport = {};

Game.settings.isLoggerEnabled = true;
Game.settings.FPS = 30;
Game.settings.SECONDS_BETWEEN_FRAMES = 1 / Game.settings.FPS;

Game.settings.viewport.width =  600;
Game.settings.viewport.height = 420;
