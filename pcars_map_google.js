
/*
 * Open points:
 * - this.oMapLocal.addListener('zoom_changed', function(e)  ... Zugriff auf zum Bsp this.sensorLayer.interruptTransition(); nicht m�glich, deshlab derzeit deactiviert !!!!!!!!!!
 * 
 * 
 * 
 */

class pcars_map_google extends pcars_map {
	
	
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
	constructor(sMaptype, sMapHtmlId, aMapSettings) {
		super();	// get functions from basic class
						
		this.oMapLocal = null;		// google map object
		this.sensorLayer = null; // init with empty array			
	}
	
	
	/* overwrites function with google specific call
	 * 
	 * param {object} TrackObj	
	 * return {boolean} true if all is fine, false if something went wrong
	 */		
	init_map( newTrackObj, aSensorDataLOCAL  ){
		
		//subclassing					
		this.printConsoleMsg("INFO", "init google map instance.");
		

		if(log >= 4){console.log("TODO pcars_map_google init_map() BEFORE GPSSensor.prototype : " , new google.maps.OverlayView());}
		GPSSensor.prototype = new google.maps.OverlayView();
		if(log >= 4){console.log("TODO pcars_map_google init_map() AFTER GPSSensor.prototype : " , typeof( GPSSensor ));}
		
		
		//this.sensorLayer.prototype = new google.maps.OverlayView();
		this.sensorLayer = new GPSSensor(aSensorDataLOCAL );
	

		this.oMapLocal = new google.maps.Map(d3.select("#map").node(), {        	 
				zoom: newTrackObj["Zoom"],                
			    center: new google.maps.LatLng( newTrackObj["MapInitLat"] , newTrackObj["MapInitLong"] ),
				mapTypeId: google.maps.MapTypeId.SATELLITE,		    
				streetViewControl: false,	//deactivate google streetview
				rotateControl: true,		// control for changing Tilt (0° or 45°) and for map rotation
				scaleControl: true			//shows maps scale in the bottom right
		});
	
		
		//deactivate the automatic 45 Angel Tilt View on closest zoom steps
		this.oMapLocal.setTilt(0);
		
		zoom_level	= newTrackObj["Zoom"];   //get initial zoom for zoom_settings		
//		sensorLayer = new GPSSensor(aSensorData);
//		sensorLayer.setMap(oMapLocal);
		this.sensorLayer.setMap(this.oMapLocal); 
		
		// add map Listener
		var tmp = this.sensorLayer;
		
		this.oMapLocal.addListener('zoom_changed', function() {
			//if(log >= 4){console.log("+++++++++++++++++++++++++++++++++++++++++++ current StopTransitionDelay: " , StopTransitionDelay);}
			StopTransitionDelay = "true";
	        	//StopTransitionDelay_StartTime = Date.now();
		console.log("TODO pcars_map_google oMapLocal.addListener, this.sensorLayer: ", this);
//console.log("TODO pcars_map_google oMapLocal.addListener, e: ", e);
// TODO:  muss wieder aktiviert werden, aber ich weis nicht wie man zugriff auf
/*
			this.sensorLayer.interruptTransition();
			this.sensorLayer.update(aSensorDataLOCAL);
			//if(log >= 4){console.log("+++++++++++++++++++++++++++++++++++++++++++ set StopTransitionDelay to: " + StopTransitionDelay + ", StopTransitionDelay_StartTime:" + StopTransitionDelay_StartTime);}
			
			zoom_level = this.oMapLocal.getZoom();	//get new changed zoom level
			if(log >= 3){console.log("zoom:", zoom_level, " ,lineWeight:", zoom_settings[zoom_level].lineWeight);}
			
			// Polylines on zoom change with changing lineWeight 
			PolyLineMid.setOptions({strokeWeight: zoom_settings[zoom_level].lineWeightMid});
			PolyLineOuter.setOptions({strokeWeight: zoom_settings[zoom_level].lineWeight});
			PolyLineInner.setOptions({strokeWeight: zoom_settings[zoom_level].lineWeight});
			PolyLineSF.setOptions({strokeWeight: zoom_settings[zoom_level].lineWeight});
*/			
	  	});

		

			
		// deactivate because of problems with table height of div blocks
		//this.oMapLocal.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('CarList'));
		//this.oMapLocal.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('TrackList'));
		//this.oMapLocal.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('DSdata'));
		//this.oMapLocal.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('DriverDataArea'));
		//this.oMapLocal.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('Settings'));
		//this.oMapLocal.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('DSRecStatistics'));
		//this.oMapLocal.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('DSstatistic'));       	

		//https://developers.google.com/maps/documentation/javascript/examples/polyline-simple?hl=de		
		//init line PolyLine objects
		PolyLineMid		= new google.maps.Polyline({});
		PolyLineInner	= new google.maps.Polyline({});
		PolyLineOuter	= new google.maps.Polyline({});
		PolyLineSF		= new google.maps.Polyline({});
		
		// init Polygon object for fictional tracks background
		Polygon         = new google.maps.Polygon({});
		
		if ( typeof(this.oMapLocal) == 'object'){
		
			this._isReady = true;
			if(log >= 3){console.log("TODO pcars_map_google; set this._isReady to : ", this._isReady);}
		}
		
		
		return this.oMapLocal;		       				
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
		
		return this.changeMapSettings_with_geojson(newTrackObj, mapobj, trackid);
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	/// change map settings
	changeMapSettings_with_geojson(newTrackObj, mapobj, trackid){

		
		if(log >= 4){console.log("TODO changeMapSettings_with_geojson() called! newTrackObj: " , newTrackObj );}		
		//call if map was not init before	
		if (!this._isReady){
			// use local variable instead of global map		
			mapobj = this.init_map( newTrackObj );		
		}


		//load json file for a specific trackmap	
		d3.json( "./data/trackmaps/trackmap"+ trackid +".json" , function( gjdata ) {
			
			if (typeof gjdata === 'undefined' || !gjdata){								
				if(log >= 3){console.log("changeMapSettings_with_geojson() gjdata is empty or null:  ", gjdata );}
				tmGPS = {};	//clear trackmap data if there is no new trackmap data available
			}else{
				//transform the PosX und PosZ coordinates to GPS Longitude and Latitude
				for (var key in gjdata) {
					tmGPS[key] = [];
					if (key != "comment"){
						//if(log >= 3){console.log("gjdata pre calculation ", key, ": ", JSON.stringify(gjdata[key]));}
						for (var i = 0; i < gjdata[key].length; i++ ){
							gpsCoTmp = calc_coordinates (trackid , gjdata[key][i][0] , gjdata[key][i][1] , aRefPointTMP);

							tmGPS[key][i] = {lat: gpsCoTmp.Lat, lng: gpsCoTmp.Long};
						}
						if(log >= 4){console.log("Google GPS ", key, ": ", tmGPS[key]);}
					}
				}
			}
					
			this.changeMapSettings(newTrackObj, mapobj, tmGPS);  // TODO???
		});         	  
						
		return mapobj;
	}
	

	//////////////////////////////////////////////////////////////////////////
	changeMapSettings(newTrackObj, mapobj, gjdata){
		
		
		//console.log("TODO hangeMapSettings() called! newTrackObj: ", newTrackObj );
		//console.log("TODO hangeMapSettings() called! newTrackObj: ", mapobj);
		//console.log("TODO hangeMapSettings() called! newTrackObj: ", gjdata);

		//use local variable mapobj instead of global var map
		//example: map.setCenter({lat: 50.332733, lng: 6.943355});
		this.oMapLocal.setCenter({lat: newTrackObj["MapInitLat"], lng: newTrackObj["MapInitLong"]});
		this.oMapLocal.setZoom(newTrackObj["Zoom"]);

		StopTransitionDelay = "true";
		StopTransitionDelay_StartTime = Date.now();
			
		//delete old polyline instances each time a map change is triggert, not matter if new ones will created	
		PolyLineMid.setMap(null);	
		PolyLineOuter.setMap(null);
		PolyLineInner.setMap(null);
		PolyLineSF.setMap(null);
		Polygon.setMap(null);
		
		//remove old tm_debug_markers from map
		for (var i = 0; i < tm_debug_markers.length; i++ ){
			tm_debug_markers[i].setMap(null);
		}
		//reset marker array
		tm_debug_markers = [];
		
		//set white background polygon for fictional tracks
		if (newTrackObj["fictional"]){
			Polygon = new google.maps.Polygon({
				paths: PolygonWorldCoords,
				strokeColor: '#FFFFFF',
				strokeOpacity: 1,
				strokeWeight: 2,
				fillColor: '#FFFFFF',
				fillOpacity: 1
			});
			Polygon.setMap(map);
		}
		
		//set trackmap polylines
		if ( gjdata ){				
			//create new instance MidLine if available
			if ( gjdata['line_mid'] ){		
				PolyLineMid = new google.maps.Polyline({
				    path: gjdata['line_mid'],
				    strokeColor: '#E0E0E0',
				    strokeOpacity: 0.5,
				    strokeWeight: zoom_settings[newTrackObj["Zoom"]].lineWeightMid
				  });
				
				PolyLineMid.setMap(map);			
			}
			
			//create new instance innerLine if available
			if ( gjdata['line_inner'] && (newTrackObj["fictional"] || devmode_tm) ){		
				PolyLineInner = new google.maps.Polyline({
				    path: gjdata['line_inner'],
				    strokeColor: '#FF0000',
				    strokeOpacity: 1.0,
				    strokeWeight: zoom_settings[newTrackObj["Zoom"]].lineWeight
				  });
				
				PolyLineInner.setMap(map);
			}
			
			//create new instance OuterLine if available
			if ( gjdata['line_outer'] && (newTrackObj["fictional"] || devmode_tm) ){		
				PolyLineOuter = new google.maps.Polyline({
				    path: gjdata['line_outer'],
				    strokeColor: '#FF0000',
				    strokeOpacity: 1.0,
				    strokeWeight: zoom_settings[newTrackObj["Zoom"]].lineWeight
				  });
				
				PolyLineOuter.setMap(map);
			}
			
			//create new instance Start/Finish Line if available
			if ( gjdata['line_SF'] && (newTrackObj["fictional"] || devmode_tm) ){		
				PolyLineSF = new google.maps.Polyline({
				    path: gjdata['line_SF'],
				    strokeColor: '#FF0000',
				    strokeOpacity: 1.0,
				    strokeWeight: zoom_settings[newTrackObj["Zoom"]].lineWeight
				  });
				
				PolyLineSF.setMap(map);
			}
			
			// create markers from debug array for refPoint tuning
			if ( gjdata['debug'] && devmode_tm ){
				if(log >= 3){console.log("+++++++++ trackmap debug array: ", gjdata['debug']);}
				var title;
				for (var i = 0; i < gjdata['debug'].length; i++ ){
					title = gjdata['debug'][i].lat.toFixed(6) + ", " + gjdata['debug'][i].lng.toFixed(6);
					var marker = new google.maps.Marker({
						position: gjdata['debug'][i],
						map:map,
						title: title
					});
					tm_debug_markers.push(marker);
				}
			}
		
		}// end map track polyline
		
		
		return 1;
	}
	
	
	/* interruptTransition() - place holder function
	 * 
	 * param {array} object with all Marker Settings, to update on map 
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	updateMarker(aMarkerObject){

		if (this.sensorLayer){
			this.sensorLayer.update(aMarkerObject);
		}	
		return true;		
	}	
		
	/* interruptTransition() - place holder function
	 *  
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	interruptTransition(){
		
		this.sensorLayer.interruptTransition();		
		return true;		
	}
	
}

