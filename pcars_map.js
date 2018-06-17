/* basic calss object for different map type to define main function
 * an provide a standard api for controller object
 *
 */
class pcars_map extends PCARSLV_BASIC {
	
	
	// example function header
	/*
	 * param {string}
	 * param {object}
	 * param {int}
	 * 
	 * return {string} true if all is fine, false if something went wrong
	 */	
	
		
	/* constructor()
	 * 
	 * param {string} sMaptype defines the type of map:   GOOGLE | BING | OSM | ...
	 * param {string} sMapHtmlId defines the HTML object ID whre map should be displayed
	 * param {array} aMapSettings includes all relevant map settings in a key-value pair
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	constructor(sMaptype, sMapHtmlId, aMapSettings) {
		super();	// get functions from basic class
		
		this._sMapType = sMaptype;
		this._sMapHtmlID = sMaptype;
		this.oCurMap = undefined;
		
		this._isImplemented = false;	// flag if this map type is implemented and available for use
		this._isReady = false;   		// flag if map/modules etc. were loaded and can be used [true|false]
		
		this.printConsoleMsg("WARNING", "Function updateMarker() should be overwritten by specific map class like pcars_map_google");
			
	}
	
	
	/* returns status of implementation 
	 *  
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	isImplemented(){		
		return this._isImplemented;		
	}
	
	
	/* returns info if map can be used
	 * 
	 * return {boolean} true if map can be used, false if not
	 */		
	isReady(){		
		return  this._isReady;
	}
	
	
	/* -> should be overwritten by child class
	 * initialize map object, load modules etc 
	 *  
	 * return {boolean} always false in parent class
	 */	
	init_map( newTrackObj ){
		this.printConsoleMsg("WARNING", "Function init_map() should be overwritten by specific map class like pcars_map_google");
		return false;  
	}
	
	
	/* -> should be overwritten by child class
	 * destroy map object 
	 *  
	 * return {boolean} 
	 */	
	destroyMap( ){
		this.printConsoleMsg("WARNING", "Function destroyMap() should be overwritten by specific map class like pcars_map_google");
		return false;  
	}
	
	
	/* -> should be overwritten by child class
	 * change map object settings
	 * 
	 * return {boolean} always false in parent class
	 */
	changeMapSettings(newTrackObj, mapobj, trackid){
		this.printConsoleMsg("WARNING", "Function changeMapSettings() should be overwritten by specific map class like pcars_map_google");
		return false;
	}
		
	
	/* updateMarker() - place holder function
	 * 
	 * param {array} 
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	updateMarker(aMarkerObject){
		
		this.printConsoleMsg("WARNING", "Function updateMarker() should be overwritten by specific map class like pcars_map_google");
		
		return false;		
	}
	
	
	/* interruptTransition() - place holder function
	 * 
	 * param {array} 
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	interruptTransition(){
		this.printConsoleMsg("WARNING", "Function interruptTransition() should be overwritten by specific map class like pcars_map_google");
		
		return false;	
	}
	
	
};