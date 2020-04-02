
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
		this.printConsoleMsg("INFO", "init google map instance.", aSensorDataLOCAL );		
		GPSSensor.prototype = new google.maps.OverlayView();		
				
		// initialise GPSSensor
		this.sensorLayer = new GPSSensor(aSensorDataLOCAL );
	
		// create map object
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
		this.sensorLayer.setMap(this.oMapLocal); 
		
		// add map Listener
		var tmp = this.sensorLayer;
		
		// add listener to cover zoom side effects
		this.oMapLocal.addListener('zoom_changed', function() {
			//if(log >= 4){console.log("+++++++++++++++++++++++++++++++++++++++++++ current StopTransitionDelay: " , StopTransitionDelay);}
			StopTransitionDelay = "true";
			StopTransitionDelay_StartTime = Date.now();
							
			// interrupt and update markers		
			oPcarsMapCtrl.interruptTransition();
			//oPcarsMapCtrl.updateMarker(aSensorDataLOCAL);  // not needed anymore, because the draw funktion is automatically triggered and in the draw function the update function is executed
			zoom_level = oPcarsMapCtrl.oCurMapObj.oMapLocal.getZoom(); //get new changed zoom level					
					
			// Polylines on zoom change with changing lineWeight
			PolyLineMid.setOptions({strokeWeight: zoom_settings[zoom_level].lineWeightMid});
			PolyLineOuter.setOptions({strokeWeight: zoom_settings[zoom_level].lineWeight});
			PolyLineInner.setOptions({strokeWeight: zoom_settings[zoom_level].lineWeight});
			PolyLineSF.setOptions({strokeWeight: zoom_settings[zoom_level].lineWeight});			
			
	  	});

		// add listener to cover drag effects
                this.oMapLocal.addListener('dragend', function() {
                        //if(log >= 4){console.log("+++++++++++++++++++++++++++++++++++++++++++ current StopTransitionDelay: " , StopTransitionDelay);}
                        StopTransitionDelay = "true";
                        StopTransitionDelay_StartTime = Date.now();

                        // interrupt and update markers
                        oPcarsMapCtrl.interruptTransition();

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
		PolyLineXneg	= new google.maps.Polyline({});
		PolyLineXpos	= new google.maps.Polyline({});
		PolyLineYneg	= new google.maps.Polyline({});
		PolyLineYpos	= new google.maps.Polyline({});
		
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
				
		//call if map was not init before	
		if (!this._isReady){
			// use local variable instead of global map		
			mapobj = this.init_map( newTrackObj );			
		}

		// show coordinate system
		if(devmode_tm == true){
			//calculate GPS coodinates for CoordSystem
			var LineEnd = calc_coordinates (trackid , 0, 0, aRefPointTMP);
			for (var key in CoordSystem) {
				var LineStart = calc_coordinates (trackid , CoordSystem[key][0], CoordSystem[key][1], aRefPointTMP);
				CoordSystemGPS[key] = [{lat: LineStart.Lat, lng: LineStart.Long},{lat: LineEnd.Lat, lng: LineEnd.Long}];
			}
		}

		// don't read trackmap file for default refpoints
		if(trackid != 9999999999 && trackid != 8888888888 && trackid != 0){
			var Game = newTrackObj.game_name;

			// Trackmaps for PCARS1 and 2 combined to PCARS
			if(newTrackObj.game_name == "PCARS1&2"){Game = "PCARS1a2";}

			var file = "./data/trackmaps/tm_"+ Game + "_" + trackid +".json";
			if(log >= 3){console.log("Trackmap File: ",file, "/ newTrackObj: ", newTrackObj);}
			
			//load json file for a specific trackmap	
			d3.json( file , function( gjdata ) {	//activate after renaming files
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
								var gpsCoTmp = calc_coordinates (trackid , gjdata[key][i][0] , gjdata[key][i][1] , aRefPointTMP);

								tmGPS[key][i] = {lat: gpsCoTmp.Lat, lng: gpsCoTmp.Long};
							}
						}
					}
				}

				// Use explicit global Variable oPcarsMapCtrl 
				oPcarsMapCtrl.oCurMapObj.changeMapSettingsGJ(newTrackObj, mapobj, tmGPS);  

			});
		}else{
			//reset trackmap / without it would use the trackmap of the before chosen track
			tmGPS = {};
			oPcarsMapCtrl.oCurMapObj.changeMapSettingsGJ(newTrackObj, mapobj, tmGPS);
		}

		//oPcarsMapCtrl.oCurMapObj.changeMapSettingsGJ(newTrackObj, mapobj, tmGPS);
		// we have to use this call in both cases (if/else) for default refpoints and all other tracks separately
		// because the trackmap loading function d3.json() waits till the file loading is finished before it executes the code in it
		// if we would use the changeMapSettings call here only, then in the if-case (when a trackmap is loaded), the call here happens earlier then the file is completely loaded
		// and then the tmGPS data from the previous chosen map is used

		return mapobj;
	}
	

	//////////////////////////////////////////////////////////////////////////
	// change map seeting inlcuding geojson data
	changeMapSettingsGJ(newTrackObj, mapobj, gjdata){

		//   this.oMapLocal.data.loadGeoJson(
	    //'https://storage.googleapis.com/mapsdevsite/json/google.json');
				
		//console.log("TODO ChangeMapSettings() called! newTrackObj: ", newTrackObj );
		//console.log("TODO ChangeMapSettings() called! newTrackObj: ", mapobj);
		//console.log("TODO ChangeMapSettings() called! newTrackObj: ", gjdata);
		
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
		PolyLineXneg.setMap(null);
		PolyLineXpos.setMap(null);
		PolyLineYneg.setMap(null);
		PolyLineYpos.setMap(null);
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
			Polygon.setMap(this.oMapLocal);
		}
		
		//set trackmap polylines
		if ( gjdata ){
			
			//create new instance MidLine if available
			if ( gjdata['line_mid'] ){		
				PolyLineMid = new google.maps.Polyline({
				    path: gjdata['line_mid'],
				    strokeColor: '#E0E0E0',
				    strokeOpacity: 1,
				    strokeWeight: zoom_settings[newTrackObj["Zoom"]].lineWeightMid
				  });
				
				PolyLineMid.setMap(this.oMapLocal);
			}
			
			//create new instance innerLine if available
			if ( gjdata['line_inner'] && (newTrackObj["fictional"] || devmode_tm) ){		
				PolyLineInner = new google.maps.Polyline({
				    path: gjdata['line_inner'],
				    strokeColor: '#FF0000',
				    strokeOpacity: 1.0,
				    strokeWeight: zoom_settings[newTrackObj["Zoom"]].lineWeight
				  });
				
								
				PolyLineInner.setMap(this.oMapLocal);											
			}
			
			//create new instance OuterLine if available
			if ( gjdata['line_outer'] && (newTrackObj["fictional"] || devmode_tm) ){		
				PolyLineOuter = new google.maps.Polyline({
				    path: gjdata['line_outer'],
				    strokeColor: '#FF0000',
				    strokeOpacity: 1.0,
				    strokeWeight: zoom_settings[newTrackObj["Zoom"]].lineWeight
				  });
				
				PolyLineOuter.setMap(this.oMapLocal);
			}
			
			//create new instance Start/Finish Line if available
			if ( gjdata['line_SF'] && (newTrackObj["fictional"] || devmode_tm) ){		
				PolyLineSF = new google.maps.Polyline({
				    path: gjdata['line_SF'],
				    strokeColor: '#FF0000',
				    strokeOpacity: 1.0,
				    strokeWeight: zoom_settings[newTrackObj["Zoom"]].lineWeight
				  });
				
				PolyLineSF.setMap(this.oMapLocal);
			}
			
			// create markers from debug array for refPoint tuning
			if ( gjdata['debug'] && devmode_tm ){
				if(log >= 3){console.log("+++++++++ trackmap debug array: ", gjdata['debug']);}
				var title;
				for (var i = 0; i < gjdata['debug'].length; i++ ){
					title = gjdata['debug'][i].lat.toFixed(6) + ", " + gjdata['debug'][i].lng.toFixed(6);
					var marker = new google.maps.Marker({
						position: gjdata['debug'][i],
						map:this.oMapLocal,
						title: title
					});
					tm_debug_markers.push(marker);
				}
			}
		
		}// end map track polyline

		if(devmode_tm == true && SHOWREFPOINTFIDDLING == true){			
			// set current values to HTML inpout fields
			$("#fiddling_refpoint").val("1");
			$("#fiddling_reflat").val(newTrackObj["refLat"]);
			$("#fiddling_reflong").val(newTrackObj["refLong"]);
			$("#fiddling_rotation").val(newTrackObj["rotation"]);
			$("#fiddling_cor_r_long").val(newTrackObj["cor_r_Long"]);
			$("#fiddling_cor_r_lat").val(newTrackObj["cor_r_Lat"]);
			$("#fiddling_cor_posx_mul").val(newTrackObj["cor_PosX_mul"]);
			$("#fiddling_cor_posy_mul").val(newTrackObj["cor_PosY_mul"]);
			$("#fiddling_zoom").val(newTrackObj["Zoom"]);
			$("#fiddling_mapinitlat").val(newTrackObj["MapInitLat"]);
			$("#fiddling_mapinitlong").val(newTrackObj["MapInitLong"]);
			
		}

		// show coordinate system
		if(devmode_tm == true){
			PolyLineXneg = new google.maps.Polyline({
				path: CoordSystemGPS["Xneg"],
				strokeColor: '#dbff87',
				strokeOpacity: 1.0,
				strokeWeight: 2.5 
			});
			PolyLineXneg.setMap(this.oMapLocal);

			PolyLineXpos = new google.maps.Polyline({
                                path: CoordSystemGPS["Xpos"],
                                strokeColor: '#66ff72',
                                strokeOpacity: 1.0,
                                strokeWeight: 2.5
                        });
                        PolyLineXpos.setMap(this.oMapLocal);

			PolyLineYneg = new google.maps.Polyline({
                                path: CoordSystemGPS["Yneg"],
                                strokeColor: '#66f7ff',
                                strokeOpacity: 1.0,
                                strokeWeight: 2.5
                        });
                        PolyLineYneg.setMap(this.oMapLocal);

                        PolyLineYpos = new google.maps.Polyline({
                                path: CoordSystemGPS["Ypos"],
                                strokeColor: '#0f7fff',
                                strokeOpacity: 1.0,
                                strokeWeight: 2.5
                        });
                        PolyLineYpos.setMap(this.oMapLocal);
		}

		return 1;
	}
	
	
	/* interruptTransition() - place holder function
	 * 
	 * param {array} object with all Marker Settings, to update on map 
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	updateMarker(aMarkerObject){
				
		if (this.sensorLayer && aMarkerObject != undefined){
			this.sensorLayer.update(aMarkerObject);
		}	
		return true;		
	}	
		
	/* interruptTransition() - place holder function
	 *  
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	interruptTransition(){
		
		if (this.sensorLayer ){
			this.sensorLayer.interruptTransition();	
		}				
		return true;		
	}
	
}

