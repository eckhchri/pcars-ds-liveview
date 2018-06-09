/* the class pcars_map_controller should be a generic wrapper for different map types: google, bing, osm, ...
 * and provides a standard set of function to
 * - init an new map incl. loading required modules
 * - set basic settings
 * - switch between map types 
 * - clean deletion of map objects
 * - error handling, API Key handling, ...
 */
class pcars_map_controller extends PCARSLV_BASIC {
	
	
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
		
		switch (sMaptype) {
			//
			case "GOOGLE":
				
				this.oCurMap = new pcars_map_google(sMaptype, sMapHtmlId, aMapSettings);
				break;
				
			//
			case "BING":
				
				break;
				
			//
			case "BING":
				
				break;
				
			// returns the initialized object
			return this.oCurMap;
			
		}
	}	
		
	/* Implementation todos
	* changeMapType()
	* */	
	getMapTypes(){
		 
		var aMapTaypes = 
			{  'google':
			                 {
			                        'value': 'google',
			                        'display_value': 'Google Maps',
			                 },
			   'bing':
			                 {
			                         'value': 'bing',
			                         'display_value': 'Bing Maps (placebo)'
			                  },
			 
			   'osm1': 
			                  {
			                            'value': 'osm_bikemap',
			                            'display_value': 'OSM Bike Map (placebo)'
			                   }
			};
	
		return aMapTaypes;
	}
	
	/* Implementation todos
	* changeMapType()
	* updateMarker()
	* deleteAllMarker()
	* pauseMarker()
	* changeMapSettings()
	* 
	* 
	* _destroyCurrentMap()
	* 
	*/
	
	/* changeMapType()
	 * 
	 * param {string}
	 * param {array}
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	changeMapType( sNewMapType, aMapSettings){
		
		return true;
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