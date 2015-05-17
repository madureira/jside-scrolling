/**
    The ApplicationManager is used to manage the application itself.
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function ApplicationManager()
{
    /**
        Initialises this object
        @return A reference to the initialised object
    */
    this.startupApplicationManager = function()
    {
        this.startupGameObject();
		this.background3 = new RepeatingGameObject().startupRepeatingGameObject(g_back2, 0, 100, 3, 600, 320, 1);
        this.background2 = new RepeatingGameObject().startupRepeatingGameObject(g_back1, 0, 100, 2, 600, 320, 0.75);        
        this.background = new RepeatingGameObject().startupRepeatingGameObject(g_back0, 0, 0, 1, 600, 320, 0.5);
        return this;
    }
	
	/**
        Updates the object
        @param dt The time since the last frame in seconds
        @param context The drawing context 
        @param xScroll The global scrolling value of the x axis  
        @param yScroll The global scrolling value of the y axis 
    */
    this.update = function(/**Number*/ dt, /**CanvasRenderingContext2D*/ context, /**Number*/ xScroll, /**Number*/ yScroll)
    {
		g_GameObjectManager.xScroll += 50 * dt;
	}
}
ApplicationManager.prototype = new GameObject