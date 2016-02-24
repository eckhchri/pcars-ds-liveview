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
var WORKERDELAY_DSDATA  	=	200;    // in ms

var DisplayDuration 		  = 600;		// duration for displaying marker updates
var DisplayDurationCREST 	= 400;		// duration for displaying marker updates

// Logging
//Log Levels for console.log commands: 0 = off or special use, 1 = error, 2 = warning, 3 = info, 4 = extended info (output of variables for example)
var log = 3;
