///////////////////////////////////////////////
//global varibales definitions
///////////////////////////////////////////////

//Please your specific settings
var DsServerURL 	= "MY-URL.com";
var DsPort			= 9000;
var CRESTServerURL 	= "localhost";
var CRESTPort		= 8080;

//default API mode, possible values: DS, CREST or DEMO
var APIMODE   =   "DS";		// Default API Mode

//hide or unhide elements
var	SHOWTRACKLIST 	=	false;	// [true|false]
var SHOWCARLIST 	=	true; 	// [true|false]
var	SHOWDSDATA 		=	true;	// [true|false]
var	SHOWDRIVERDATA 	=	true;	// [true|false]
var SHOWSETTINGS	=	true;	// [true|false]
var SHOWDSSTATISTIC =	false;	// [true|false]
var SHOWDSRELAY		=	false;	// [true|false]

//defines a delay for each worker to reduce CPU load
var WORKERDELAY_TRACKLIST	=	5000; 	// in ms
var WORKERDELAY_DSDATA  	=	100;    // in ms

var DisplayDuration 		  = 500;		// initial duration for displaying marker updates
var DisplayDurationCREST 	= 100;		// initial duration for displaying marker updates

var UpdateRateDS = 500;   //Update rate of DS. Currently used for calculation of the duration. If the calculation result is below 500 ms, it is set to 500 ms.

//StopTransitionDelay_minTimeRun - Time of disabled tranformWithEase function and using the transform function instead on SessionState and SessionStage changes. 
//In this case the markers jump to a new init position on map, but this takes sometimes circa 1 second after the switch. For this jump the normal transform function is needed.
var StopTransitionDelay_minTimeRun = 1100; //milliseconds - 

// Logging
//Log Levels for console.log commands: 0 = off or special use, 1 = error, 2 = warning, 3 = info, 4 = extended info (output of variables for example)
var log = 3;

// set log to 0 and recording_demo_data to true to record demo data via console.log and paste it to demo_data.js
recording_demo_data = "false";

//playback demo from start position to end position
demo_start_pos = 0;
demo_end_pos = 9999;  //if the demo array is smaller, then the array length is used as end position

//CSS default
var CSSDEFAULTSET = 'colortop3';  //use the value of the selection Box #DRIVERCOLOR

//CSS definitions
var CSSTOP3VEHICLESstr ='';
CSSTOP3VEHICLESstr += 'circle.CSS_RacePos_1 {fill: gold; stroke-width: 3px }\n';
CSSTOP3VEHICLESstr += 'circle.CSS_RacePos_2 {fill: silver; stroke-width: 3px }\n';
CSSTOP3VEHICLESstr += 'circle.CSS_RacePos_3 {fill: #CD7F32; stroke-width: 3px }\n';
var CSSSAMEVEHICLECLASSESstr ='';
CSSSAMEVEHICLECLASSESstr = 'CSS_GT3 {fill: darkblue;}\n';

var CSSDEFINITIONS = {
		CSSTOP3VEHICLES:		CSSTOP3VEHICLESstr,
		CSSSAMEVEHICLECLASSES:  CSSSAMEVEHICLECLASSESstr
	};

//Automatic CSV Export of all session results after a race weekend, a download dialog will pop up
//The Export is called if the SessionState changes to "PostRace"
var autoExport = "false";
