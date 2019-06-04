class pcars_map_raw extends pcars_map {
	
	
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
	 * param {string}
	 * param {string} HTML ID
	 * param {array}
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	constructor(sMaptype, sMapHtmlId, aMapSettings, ) {
		super();	// get functions from basic class
						
		this.aRawData = null;		// array of RAW data
		this.sContentContainerId = "#map";
		this.sContentElementId = "#RawInner";
	}
	
	
	/* overwrites function with google specific call
	 * 
	 * param {object} TrackObj	
	 * return {boolean} true if all is fine, false if something went wrong
	 */		
	init_map( newTrackObj, aSensorDataLOCAL ){
		
		
		var sInnerHTML = '<div id="OutputRaw">Raw Data!</div>';
		sInnerHTML += '<div id="' + this.sContentElementId.replace('#','') + '" </div>';	
		

		HTMLCTRL.ChangeHtmlContentByID( this.sContentContainerId, sInnerHTML);
	}
	
		
	
	/*
	 * destroy/clean/reset
	 * 
	 * {boolean} true if was reset/cleaned, false if something went wrong
	 */
	destroyMap(){
				
		return false;
	}
	
		
	
	/* overwrites function with google specific call
	 * 
	 * param {object} Track
	 * param {object} Map
	 * param {string} id of the current track
	 * return {boolean} true if all is fine, false if something went wrong
	 */		
	changeMapSettings(newTrackObj, mapobj, trackid){
				
		
	}
	
	
	/* overwrites function with raw specific call
	 * 
	 * param {array} array of Markers
	 * return 
	 */			
	updateMarker(aMarkerObject){
		
console.log("SICECKHA updateMarker called with: " , aMarkerObject);


		var sInnerElement = '<div id="RawInner">';
		sInnerElement +=	JSON.stringify(aMarkerObject);
		sInnerElement += '</div>';

		//HTMLCTRL.ChangeHtmlContentByID( this.sContentContainerId, sInnerElement );
		
		$(this.sContentContainerId + ' ' + this.sContentElementId ).append(sInnerElement);
		
		/*
		$(this.sContentContainerId + ' #RawInner' ).each(function(){				
			$( this ).html( innerhtml );			   
		});
		*/
							
	}
	
	
	
	
}