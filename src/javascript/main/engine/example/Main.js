/** target frames per second  
    @type Number
*/
var FPS = 30;
/** time between frames 
    @type Number
*/
var SECONDS_BETWEEN_FRAMES = 1 / FPS;
/** A global reference to the GameObjectManager instance  
    @type GameObjectManager
*/
var g_GameObjectManager = null;
/** An image to be used by the application  
    @type Image
*/
var g_back0 = new Image();
g_back0.src = "../bin/img/parallax/jsplatformer4_b0.png";
/** An image to be used by the application  
    @type Image
*/
var g_back1 = new Image();
g_back1.src = "../bin/img/parallax/jsplatformer4_b1.png";
/** An image to be used by the application  
    @type Image
*/
var g_back2 = new Image();
g_back2.src = "../bin/img/parallax/jsplatformer4_b2.png";

// The entry point of the application is set to the init function
//window.onload = init;

/**
    Application entry point
*/
function init()
{
    new GameObjectManager().startupGameObjectManager();
}
