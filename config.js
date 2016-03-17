//Please your specific settings
var DsServerURL 	= "MY-URL.com";
var DsPort			= 9000;
var CRESTServerURL 	= "localhost";
var CRESTPort		= 8080;

//default API mode
var APIMODE   =   "DS";

//hide or unhide elements
var	SHOWTRACKLIST 	=	true;	// [true|false]
var SHOWCARLIST = true; 	// [true|false]
var	SHOWDSDATA 		=	true;	// [true|false]
var	SHOWDRIVERDATA 	=	true;	// [true|false]
var SHOWSETTINGS	=	true;	// [true|false]

//defines a delay for each worker to reduce CPU load
var WORKERDELAY_TRACKLIST	=	5000; 	// in ms
var WORKERDELAY_DSDATA  	=	100;    // in ms

var DisplayDuration 		  = 500;		// initial duration for displaying marker updates
var DisplayDurationCREST 	= 100;		// initial duration for displaying marker updates

var UpdateRateDS = 500;   //Update rate of DS. Currently used for calculation of the duration. If the calculation result is below 500 ms, it is set to 500 ms.

var StopTransitionDelay_minTimeRun = 500; //milliseconds - A zoom change in Google Maps takes some time. If the worker runs have a short interval you need a minimum time where the transformWithEase function have to be interrupted and the normal transform function is used

// Logging
//Log Levels for console.log commands: 0 = off or special use, 1 = error, 2 = warning, 3 = info, 4 = extended info (output of variables for example)
var log = 3;

// set log to 0 and recording_demo_data to true to record demo data via console.log and paste it to demo_data.js
recording_demo_data = "false";

//playback demo from start position to end position
//demo_start_pos = 25;
//demo_end_pos = 9999;  //if the demo array is smaller, then the array length is used as end position

//troubleshoot position change problem
demo_start_pos = 176;
demo_end_pos = 220;
