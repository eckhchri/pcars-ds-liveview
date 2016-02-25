//Please your specific settings
var DsServerURL 	= "MY-URL.com";
var DsPort			= 9000;
var CRESTServerURL 	= "localhost";
var CRESTPort		= 8080;

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

var UpdateRateDS = 500;   //Update rate of DS. Currently sed for calculation of the duration. If the calculation result is below 500 ms, it is set to 500 ms.

// Logging
//Log Levels for console.log commands: 0 = off or special use, 1 = error, 2 = warning, 3 = info, 4 = extended info (output of variables for example)
var log = 3;
