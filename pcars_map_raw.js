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
		this.sContentContainerId = "map";
		this.sContentElementId = "RawInner";
		this.iCurNumberElements = 0;
		this.iMaxInnerElements = 10;
		
		
		// set Raw Data CSS styles
		CSSClsChg.setStyle(
			    '.RawDataBox {\n' + 								    			    
				'border: none; \n' +
				'padding: 5px; \n' +
				'font: 10px/12px sans-serif; \n' +
				'width: 99%; \n' +
				'height: 95%; \n'	+
				'overflow: scroll; \n' +
			'}\n');	
		
		CSSClsChg.setStyle(
			    '::-webkit-scrollbar {\n' + 								    			    
				'width: 12px; \n' +
				'height: 12px; \n' +				
			'}\n');	
		
		CSSClsChg.setStyle(
			    '::-webkit-scrollbar-track {\n' + 								    			    
				'box-shadow: inset 0 0 10px #c2d5ed; \n' +
				'border-radius: 10px; \n' +				
			'}\n');	
		
		CSSClsChg.setStyle(
			    '::-webkit-scrollbar-thumb  {\n' + 								    			    
				'background: #666;  \n' +
				'box-shadow: inset 0 0 6px rgba(0,0,0,0.5);  \n' +				
			'}\n');	
		
		CSSClsChg.setStyle(
			    '::-webkit-scrollbar-thumb:hover {\n' + 								    			    
				'background: #7bac10; \n' +							
			'}\n');	
		
		
		
	}
	
	
	/* overwrites function with google specific call
	 * 
	 * param {object} TrackObj	
	 * return {boolean} true if all is fine, false if something went wrong
	 */		
	init_map( newTrackObj, aSensorDataLOCAL ){
															   		
		
		var sInnerHTML = '<h1>Raw Data ( max entries:' + this.iMaxInnerElements + ' ) </h1>' ;			
		sInnerHTML += '<div id="OutputRaw" class="RawDataBox">';
		sInnerHTML += '</div>';
		
		HTMLCTRL.ChangeHtmlContentByID( '#'+this.sContentContainerId, sInnerHTML);
		
		// Pause button
		$( '#OutputRaw' ).html( '<div><input type="button" title="Pause appending data to RAW output" id="cbRawDataAppending" value="Pause" style="background-color:#dddddd; width:50px"></input></div>' );
				
		$('#cbRawDataAppending').click(function () {
					
			//Method with Button
			var data = this;
			 						
			if(data.value === "Pause"){
                		StopRawDataAppending   = true;
                        data.value = "Start";
                        data.title = "Append new RAW data";            
                        data.style.borderStyle = 'inset';
            }else{
                		StopRawDataAppending  	= false;
                        data.value = "Pause";
                        data.title = "Pause appending RAW data";                       
                        data.style.borderStyle = 'outset';
            }
           
		});
											
		
	}
	
		
	
	/*
	 * destroy/clean/reset
	 * 
	 * {boolean} true if was reset/cleaned, false if something went wrong
	 */
	destroyMap(){
		
		$('#'+this.sContentContainerId).remove();
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
	 * param {array} array of Markers informations
	 * return  {boolean} true if everything went fine, false in case of ignore update etc.
	 */			
	updateMarker(aMarkerObject){
				
		if (StopRawDataAppending == true){			
			return false
		}
											
		if ( this.iCurNumberElements > this.iMaxInnerElements){			
			//clear inner elements						
			$('#'+this.sContentContainerId).empty();			
			
			// re-init structure
			this.init_map();
			
			// reset counter
			this.iCurNumberElements = 0;											
		}
		
		//append
		$('#OutputRaw').append(this._getFormatInnerRawData(aMarkerObject));			
		
		//increas counter for elements
		this.iCurNumberElements++;					
		
	}
	
	
	/* internal function to format Marker data for output in textbox
	 * 
	 */
	_getFormatInnerRawData(aMarkerObject){
				
		var sInnerElement = '<div id="' + this.sContentElementId + '">';
		sInnerElement +=	JSON.stringify(aMarkerObject);
		sInnerElement += '</div>';
				
		return sInnerElement;
	}
	
	
}