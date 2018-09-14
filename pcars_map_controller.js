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
		this.oCurMapObj = undefined;		
		
		switch (sMaptype) {
			// GOOGLE
			case "google":
							
				this.oCurMapObj = new pcars_map_google(sMaptype, sMapHtmlId, aMapSettings);
				console.log("TODO pcars_map_controller.constructor() call for google!" , this);
				if (typeof this.oCurMapObj == 'object'){
					
				}			
				break;
				
			//Text
			case "text":				
				break;
				
				
			//BING
			case "bing":				
				break;
				
			//OSM
			case "osm":				
				break;
								
			// returns the initialized object
			//return this.oCurMap;
			return this.oCurMapObj;
		}
	}	
		
		
	/* returns all available map types
	 * 
	 * return {array} array of map types
	 */		
	getMapTypes(){
		 
		var aMapTaypes = 
			{  'google':
			                 {
			                        'value': 'google',
			                        'display_value': 'Google Maps',
			                 },
			   'text':
			                 {
			                        'value': 'text',
			                        'display_value': 'Text (placebo)',
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
	 * param {object} newTrackObj  with map settings
	 * return {boolean} true if all is fine, false if something went wrong
	 */
	init_map(newTrackObj ){
		
		return this.oCurMapObj.init_map(newTrackObj);
	}
	
	/* TODO
	 * changeMapType()
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
		
		return this.oCurMapObj.updateMarker(aMarkerObject);				
	}
	
		
	/* TODO
	 * changeMapSettings() - 
	 * 
	 * param {array} 
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	changeMapSettings(newTrackObj, mapobj, trackid){
		
		console.log("TODO pcars_map_controller.changeMapSettings() called", this);		
	//	if (this.oCurMapObj && this.oCurMapObj.isReady()){		
			return this.oCurMapObj.changeMapSettings(newTrackObj, mapobj, trackid);
	//	}
						
	}
	
	/* TODO
	 * changeMapSettings() - 
	 * 
	 * param {array} 
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	interruptTransition(){	
		this.oCurMapObj.interruptTransition();
		return true;
	}
	
	
};