
// Verify if all game contents are loaded
Game.ready = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(Game.ready);
        console.log("Content loaded");
        Game.start();
    }
}, 10);

// Init the game
Game.start = function() {
    console.log("Starting...");

    var Boot = Game.engine.boot.Boot,
    boot = new Boot();
    boot.init();
};

