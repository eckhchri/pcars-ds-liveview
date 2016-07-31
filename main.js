
function onload_main(){
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////// initialize vars
	var map;						// google map object
	var aDrivers 					=	new Array();		// array for PCARSdriver objects
	var aSensorData 				=	new Array();		// array of Hashes, each hash includes parameters of a driver
	var XMLHTTPTimeout				=	2000;
	var StopTransitionDelay 		=	"true";	// if set to true, DisplayDuration set to 0 ( cases: zoom, mapchange )
	var StopTransitionDelay_StartTime =	Date.now();	//timestamp for StopTransitionDelay is set to "true"
	var global_i					= 0;
	var sensorLayer;
	var sensorLayer_UpdateTime;		//time, when marker are updated
	var sensorLayer_UpdateTime_old;		//time of the recent dsdata-worker run, when the marker were updated
	var sensorLayer_UpdateDelta;		//time between recent and current dsdata-worker run, when the marker were updated
	var UnHide					= "false";	//UnHide markers
	var UnHide_Timer			= 0;		//Timer for UnHide markers
	var DisplayDurationCorrector =	0;
	var aRefPointTMP			= 	new Refpoint("-1");		// hash of all RefPoints for available tracks
	var aVehicleList			=	new Array();			// array of pcars_vehicle.js objects
	var aVehicleIdToName		=	new Array();			// hash to translate vehicleID to VehicleName
	var StopRefreshTracklist	=	"false";
	var StopRefreshDriverlist	=	"false";
	var SessionState			=	"";
	var SessionState_old		=	"";
	var SessionStage			=	"";
	var SessionStage_old		=	"";
	var HTMLCTRL				=	new HTMLCONTROL(); 	//provide help functions
	var	PCARSVehicleList		=	new PCARSVEHICLELIST(); // creates an empty object
	var	aCurrentVehicleClasses	=	new Array();		//array of all vehicle classes within the current race
	var PCARSd					=	new PCARSdriver(); 	// only use the object to get functions of it
	PCARSd.SetExampleData();							// setDefaultValues
	
	var CSSClsChg				=	new CSSClassChanger(CSSDEFINITIONS);	// CSS defined in config.js	
	var recording_count			=	0;	//used as array index comment during recording demo data
	var record_pos;						//used for playback of data during DEMO mode
	var record_pos_helper;          	//for WORKERDELAY_DEMODATA calculation needed
	
	var sensorLayer_UpdateDelta_DEMOdiff;	//Difference between sensorLayer_UpdateDelta of the recorded data and the playback
	var WORKERDELAY_DEMODATA = WORKERDELAY_DSDATA;	//Worker delay for DEMO mode to adapt the playback speed to the recording

	// set to global var, to modify in future stage for periodical updates via ajax
	var DsName			=	"-+-"; // aDsData.name;
	var DsState			=	"-+-"; //aDsData.state;		//idle/running
	var DsTrackName		=	"Slightly Mad Studios Ltd";		//aTrackList[aDsData.TrackId];
	var DsMaxMemberCnt	=	"-+-"; //aDsData.max_member_count;
	var cuircitID		=	9999999999;		//aDsData.TrackId;
	
	var CSVExport = {	//CSV Export Data
		Practice1:	"",
		Practice2:	"",
		Qualifying:	"",
		Warmup:		"",
		Race1:		"",
		Race2:		""
	}

	// catch demo array boundary breaks
	if(demo_start_pos > demo.length-1 || demo_start_pos < 0){
		demo_start_pos = 0;
	}
	record_pos = demo_start_pos;
	if(demo_end_pos < 0){
		demo_end_pos = 0;
	}
								
	
	
	
	// set Default Values
	SetDefaultHTMLValues(HTMLCTRL);
	
	// get requested url parameters
	GetReqParameters();
	
	
	///// init W2UI elements
	initW2UI();
	initMap();


};

//////////////////////////////////////////////////////////////
///////////////////////  init Google Map
//////////////////////////////////////////////////////////////
function initMap(){
	
		//////////////// Google Maps //////////////////////

    	//subclassing
    	GPSSensor.prototype = new google.maps.OverlayView();


    	// Create the Google Map
    	map = new google.maps.Map(d3.select("#LIVEVIEW").node(), {
        zoom: 5,

         // use cuircit RefPoint for center google map
         center: new google.maps.LatLng( '41.036357' , '-113.535295' ),
         mapTypeId: google.maps.MapTypeId.SATELLITE,
         //deactivate google streetview
         streetViewControl: false
		});
	
};


//////////////////////////////////////////////////////////////
///////////////////////  init W2UI elements
//////////////////////////////////////////////////////////////
function initW2UI(){
	
	//// tab elements
	var config = {
		tabs: {
			name: 'tabs',
			active: 'LIVEVIEW',
			tabs: [
				{ id: 'LIVEVIEW', 	caption: 'Live View' },
				{ id: 'SETTINGS', 	caption: 'Settings' },
				{ id: 'STATISTICS', caption: 'Statistics' },
				{ id: 'REPLAY', 	caption: 'Replay' },
			],
			onClick: function (event) {
				$('#tab-example .tab').hide();
				$('#tab-example #' + event.target).show();
			}
		}
	}

	/////////////////////////////////////////////////////////
	// start top toolbar
	$(function () {
		
		$('#tabs').w2tabs(config.tabs);
		$('#LIVEVIEW').show();
   
    
		//////////////// Toolbar ///////////////////////////////
		$('#toolbar').w2toolbar({
            name: 'toolbar',
            items: [
                { type: 'check',  id: 'item1', caption: 'stop', icon: 'fa-check', checked: true },
                { type: 'break',  id: 'break0' },
                { type: 'menu',   id: 'item2', caption: 'Menu', icon: 'fa-table', count: 17, items: [
                    { text: 'Item 1', icon: 'fa-camera', count: 5 }, 
                    { text: 'Item 2', icon: 'fa-picture', disabled: true }, 
                    { text: 'Item 3', icon: 'fa-glass', count: 12 }
                ]},
                { type: 'break', id: 'break1' },
                { type: 'radio',  id: 'item3',  group: '1', caption: 'Radio 1', icon: 'fa-star', checked: true },
                { type: 'radio',  id: 'item4',  group: '1', caption: 'Radio 2', icon: 'fa-heart' },
                { type: 'break', id: 'break2' },
                { type: 'drop',  id: 'item5', caption: 'Drop Down', icon: 'fa-plus', html: '<div style="padding: 10px">Drop down</div>' },
                { type: 'break', id: 'break3' },
                { type: 'html',  id: 'item6',
                    html: '<div style="padding: 3px 10px;">'+
                          ' Input:'+
                          '    <input size="10" style="padding: 3px; border-radius: 2px; border: 1px solid silver"/>'+
                          '</div>' 
                },
                { type: 'spacer' },                
                { type: 'html', id: 'item7',
                	html:	'<button class="btn" onclick="showStatus()" >Show  Status</button>' 	
                }
            ]
        });
   
    	function showStatus(){
    		$('#item7').w2tag('Short Message');    		
    	}    	
    
	}); // end of function top toolbar	
	
};

function GPSSensor(initData) {
    //state information
    var _div = null;
    var _data = initData;
    var _projection = null;

    function transform(d) {
        var padding = 10;                   
        d = new google.maps.LatLng(d.Lat, d.Long);
        d = _projection.fromLatLngToDivPixel(d);
        return d3.select(this) 
            .style("left", (d.x - padding) + "px")
            .style("top", (d.y - padding) + "px");
    }
    
    function transformWithEase(d) {
        var padding = 10;
        d = new google.maps.LatLng(d.Lat, d.Long);
        d = _projection.fromLatLngToDivPixel(d);
        return d3.select(this)
            .transition().duration(DisplayDuration)
            .style("left", (d.x - padding) + "px")
            .style("top", (d.y - padding) + "px");
    }

    //superclass methods for google maps
    this.onAdd = function() {
        _div = d3.select(this.getPanes().overlayLayer)
                 .append("div")
                 .attr("class", "stations");
    };               
                   
    this.draw = function () {                   
        var padding = 10;
        _projection = this.getProjection();

			// complete block moved to update function
/*
        var marker = _div.selectAll("svg")
            .data(_data, function (d) { return d.Key; })
            .each(transform) // update existing markers
             .enter().append("svg:svg")
            .each(transform)
            //.attr("class", "marker");
        		.attr("class", function (d){ return d.CSSTextClasses });

        
		   //if(log >= 3){console.log("++ Marker" , marker);}

        // Add a circle.
        marker.append("svg:circle") 
            .attr("r", 4.5)
            .attr("cx", padding)
            .attr("cy", padding)
            .attr("class", function (d){ return d.CSSCircleClasses } );
    		   //.style("fill", "red");

			//todo experimental method call	
			//marker.text("test123456");	
			if(log >= 3){console.log("Marker: " , marker);}


        // Add a label.
			if(log >= 3){console.log ("++++ in function draw() ->  aSensorData: " , aSensorData);}
        marker.append("svg:text")
            .attr("x", padding + 7)
            .attr("y", padding)
            .attr("dy", ".31em")
	//todo !!!!!!!!!!!!!!!!!!!!   very uggly implementation !!! only temporary workaround
	//      it seem that the function within .text(...) will called only once at the beginning 
	//      question: is it possible to call _div.selectAll("svg") and set text style direct in loop() ??
    .text(function (d) {
				//if(log >= 4){console.log("+++++ d: " , d );}
				//if(log >= 4){console.log("+++++ this: " , this );}

				for (var i = 0; i < aSensorData.length; i++){
				
					//if(log >= 4){console.log(" for Update MarkerLabel:" , aSensorData);}
					if (aSensorData[i].Key == d.Key){
						if(log >= 3){console.log("Match found ---- Update MarkerLabel: " , aSensorData[i].MarkerLabel);}
						return  aSensorData[i].MarkerLabel;
					}
				}
				
				//todo: during update d is not an array its an individual hash
				//if(log >= 3){console.log("++++not array:");}
				return d.MarkerLabel;
				
			})
    //       .text(function (d) { return d.Key; });                                      
	*/
    };

    this.onRemove = function () {
        _div.remove();
    };


    // todo: known issue: Beim Wechsel der Position, bleibt eine "Leiche" auf der Karte uebrig, weil Key "Pos - Name" zusammensetzt
    // easyt solution:  deleting leading position number 
    this.update = function (data) {     
	
		var marker;
		var padding = 10;
			
		//update internal data which drive redrawing on zoom_changed
		_data = data.slice();
	   
	   //Detect time between StopTransitionDelay set to "true" and now
	   var CurrentTime = Date.now();
	   var StopTransitionDelay_TimeRun = CurrentTime - StopTransitionDelay_StartTime;

	   if( StopTransitionDelay == "true" )
	   {
			if(log >= 3){console.log ("++++++++++++++++++++++++++++++ stopped StopTransitionDelay: " + StopTransitionDelay + " , TimeRun:" + StopTransitionDelay_TimeRun);}
			//this.draw();
			marker = _div.selectAll("svg")
				.data(_data, function (d) { return d.Key; })
				.each(transform) // update existing markers
				.enter().append("svg:svg")
				.each(transform)
				.attr("class", function (d){ return d.CSSTextClasses });

			// reset to default after zoom event finished. 
			//A zoom change in Google Maps takes some time. If the worker runs have a short interval you need a minimum time where the transformWithEase have to be interrupted
			if (StopTransitionDelay_TimeRun > StopTransitionDelay_minTimeRun) {StopTransitionDelay = "false";}
	
	   }else{

			if(log >= 3){console.log ("++++++++++++++++++++++++++++++ normal StopTransitionDelay: " , StopTransitionDelay );}
			//this.draw();

			marker = _div.selectAll("svg")
				.data(_data, function (d) { return d.Key; })
				.each(transformWithEase) // update existing markers
				.enter().append("svg:svg")
				.each(transform)
				.attr("class", function (d){ return d.CSSTextClasses });

			// reset to default after zoom event finished
			//StopTransitionDelay = "false";
	  }
	
	// Add a circle.
	marker.append("svg:circle")
		.attr("r", 4.5)
		.attr("cx", padding)
		.attr("cy", padding)
		.attr("class", function (d){ return d.CSSCircleClasses } );

	// Add a label.
	marker.append("svg:text")
		.attr("x", padding + 7)
		.attr("y", padding)
		.attr("dy", ".31em")
		//todo !!!!!!!!!!!!!!!!!!!!   very uggly implementation !!! only temporary workaround
		//      it seem that the function within .text(...) will called only once at the beginning
		//      question: is it possible to call _div.selectAll("svg") and set text style direct in loop() ??
		.text(function (d) {
			if(log >= 4){console.log("+++++ d: " , d );}

			for (var i = 0; i < aSensorData.length; i++){
				if (aSensorData[i].Key == d.Key){
				if(log >= 3){console.log("Match found ---- Update MarkerLabel: " , aSensorData[i].MarkerLabel);}
				return  aSensorData[i].MarkerLabel;
				}
			}
			return d.MarkerLabel;

		})
		
	// Update CSS classes new
	var svgs = _div.selectAll("circle")
				.data(_data, function (d){ return d.Key; })
				.attr("class" ,(function(d){ return d.CSSCircleClasses; }));
	
	// Update labels new
	var svgs = _div.selectAll("text")
				.data(_data, function (d){ return d.Key; })
				.text(function(d){ return d.MarkerLabel; });

	// delete unneeded svg objects from dom tree
	this.CleanupDriverObjects(_data);			
	
	}; //end update()
 
	this.CleanupDriverObjects = function(data) {
		// remapping of array of drivers to array of key
		var aTmp = {};
		for ( i = 0; i < data.length; i++) {
			aTmp[data[i].Key] = "";
		}
			
		var svgs = 	d3.selectAll("svg")
					.each(function( d ) {
							if ( aTmp[d.Key] == undefined ) {		  								
								//if(log >= 4){console.log("---- CleanupDriverObjects() - Ghost car deleted from map d.Key: " , d.Key);}
								this.remove(); 	// delete svg object
							}	
					});
	}; // end CleanupDriverObjects()

	this.interruptTransition = function (){
		// interrupt transition while zoom event
		if(_div != null){
			_div.selectAll("svg")
				.interrupt();
		}
 }; // end interruptTransition()
 
}

///////////////////////////////////////////////////////////////////////
function SetDefaultHTMLValues(HTMLCTRL){ 
	
	// hide or unhide objects defined within config.js
	if ( SHOWTRACKLIST 	== false ) { 	$( "#TrackList" ).hide();		}
	if ( SHOWDSDATA 	== false ) { 	$( "#DSdata" ).hide();			}						
	if ( SHOWDRIVERDATA	== false ) { 	$( "#DriverDataArea" ).hide();	}
	if ( SHOWSETTINGS	== false ) { 	$( "#Settings" ).hide();		}
	if ( SHOWCARLIST	== false ) { 	$( "#CarList" ).hide();			}
	
	// BLOCK to set Default settings
	$( document ).ready(function() {
		
		//set default value for CSS coloration
		HTMLCTRL.DRIVERCOLOR_SetActiveElement( CSSDEFAULTSET );
		
		//set dropdown menu APIMODE	
		HTMLCTRL.APIMODE_SetSelection( APIMODE );		
		
	});
}

///////////////////////////////////////////////////////////////////////
function GetReqParameters(){
	
	// check if url params overwrite the default ds info
	if (get_url_param('dsurl') && get_url_param('dsport'))	{
			DsServerURL     =       get_url_param('dsurl');
			DsPort          =       get_url_param('dsport');
			APIMODE         =       "DS";
			//overwrite dropdown menu selection
			HTMLCTRL.APIMODE_SetSelection( APIMODE );
	}

	// check if url params overwrite the default CREST info
	if (get_url_param('cresturl') && get_url_param('crestport'))	{
		CRESTServerURL		=	get_url_param('cresturl');
		CRESTPort			=	get_url_param('crestport');
		APIMODE				=	"CREST";
		DisplayDuration		=	DisplayDurationCREST;
		//overwrite dropdown menu selection
		HTMLCTRL.APIMODE_SetSelection( APIMODE );
	}

	// check if url params overwrite the default autoExport option
	if (get_url_param('autoexport')){
		autoExport = get_url_param('autoexport');
	}
}