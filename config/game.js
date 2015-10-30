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
module.exports=function(){return Game;}();
//######################################################################################
//######################################################################################
