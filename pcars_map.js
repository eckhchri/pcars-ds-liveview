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
		
		this._isImplemented = false;
		
		this.printConsoleMsg("WARNING", "Function updateMarker() should be overwritten by specific map class like pcars_map_google");
			
	}
	
	/*  place holder function
	 * 
	 * param {array} 
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	isImplemented(){
		return this._isImplemented;		
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
	
	
	
};