///////////////////////////////////////////////
//global varibales definitions
///////////////////////////////////////////////
var SCRIPTVERSION	= "0.3.4";

// Defines the default MAP Type
var DEFAULT_MAP_TYPE = "google"; // [google|bing|osm]
//put in your custom google map key or user url parameter api_key=
var GOOGLE_MAP_KEY = "";

//Activate URL parameter interpretation
var AllowUrlParams	= false;		//[true|false]	to igrnore URL parameters for security reasons

//Please your specific settings
var DsServerURL 		= "mydomain.com";
var DsPort				= 9000;
var Ds2ServerURL 		= "mydomain2.com";
var Ds2Port				= 9000;
var CRESTServerURL 		= "localhost";
var CRESTPort			= 8080;
var CREST2ServerURL     = "localhost";
var CREST2Port          = 8180;

/*
var aAPIMODEMAPPING = 
	{
		'DS' : {
			'url'	     		:	'mydomain.com',
			'port'	     		:	80,
			'delay'	     		:	2000,
			'firstdelay' 		:	100,
			'receivemode'		:	'GETDSANDDRIVERDATA',
			'driverdatamode'	:	'GETDRIVERDATE',
			'tracklistmode'		: 	'GETTRACKLIST'
				
	},
		'CREST' : {
			'driverdate' :  'GETCRESTDRIVERDATA'
	}
}
*/


//default API mode, possible values: DS, CREST, CREST2 or DEMO
var APIMODE   		=   "DEMO";	// Default API Mode

//hide or unhide elements
var SHOWTRACKLIST 		=	false;	// [true|false]
var SHOWCARLIST 		=	false 	// [true|false]
var SHOWDSDATA 			=	false;	// [true|false]
var SHOWDRIVERDATA 		=	false;	// [true|false]
var SHOWSETTINGS		=	false;	// [true|false]
var SHOWDSSTATISTIC 	=	false;	// [true|false]
var SHOWDSREPLAY		=	false;	// [true|false]
var SHOWRECSTATISTIC	=	true;	// [true|false]
var SHOWPOPUPLOADDEMO	=	false;	// [true|false]

////////////JQgrid design ///////
var JQGridIsDriversPOSHidden	=	false;   // [true | false] used for PosX,PosY,PosZ
var JQGridDrivertableCollapsed	=	true;   // [true | false] table default collapsed or unfolded
var JQGridTracktableCollapsed	= 	true;   // [true | false] table default collapsed or unfolded
var JQGridCartableCollapsed	=	true;   // [true | false] table default collapsed or unfolded

//defines a delay for each worker to reduce CPU load
var WORKERDELAY_TRACKLIST	=	5000; 	// in ms
var WORKERDELAY_DSDATA  	=	100;    // in ms

var DisplayDuration			=	500;		// initial duration for displaying marker updates
var DisplayDurationCREST 	=	100;		// initial duration for displaying marker updates

var UpdateRateDS 			=	500;   //Update rate of DS. Currently used for calculation of the duration. If the calculation result is below 500 ms, it is set to 500 ms.
var GuiUpdateIntervall		=	3;	 //intervall fo updating GUI element,values etc. in seconds

//StopTransitionDelay_minTimeRun - Time of disabled tranformWithEase function and using the transform function instead on SessionState and SessionStage changes. 
//In this case the markers jump to a new init position on map, but this takes sometimes circa 1 second after the switch. For this jump the normal transform function is needed.
var StopTransitionDelay_minTimeRun = 1100; //milliseconds - 

// Logging
//Log Levels for console.log commands: 0 = off or special use, 1 = error, 2 = warning, 3 = info, 4 = extended info (output of variables for example)
var log = 3;

// Recording
var isRecEnabled			=	false;		//enables recording of data
var aRecConfig				=	[];			//config hash
aRecConfig['maxRecordSize']	=	999999;
aRecConfig['DataVersion']	=	1;			//in the case if data format will changed and recorded csv will loaded from file

//demo initial data, currently that must not be empty
var demo = [
                {//0
                	globals:{sensorLayer_UpdateDelta:886, state:"Running", name:"MyDS", lobbyid:109775242963699993, joinable:"true", max_member_count:3, now:1459966148, "datasource":"CRESTv1", "curgamerunning":"PCARS1", attributes:{TrackId:9999999999, SessionState:"Lobby", SessionStage:"Practice1", GridSize:10, MaxPlayers:3, SessionTimeDuration:0, SessionTimeElapsed:0, RaceLength: 0, TemperatureAmbient: 20, TemperatureTrack: 30}},
                    participants:[
                            {RefId:9234567, Name:"Slightly Mad Studios Ltd", IsPlayer:0, GridPosition:3, VehicleId:"-886212684", RacePosition:0, CurrentLap:99, CurrentSector:0, LastLapTime:9999, FastestLapTime:9000, State:"StateTest", Speed:100, PosX:271, PosY:277, PosZ:288, Orientation:0}
                    ]
            }
           ];

//playback demo from start position to end position
demo_start_pos 		= 0;
demo_end_pos 		= 9999;	//if the demo array is smaller, then the array length is used as end position
replay_step_size	= 1;	//used to simulate a fast forward[1=one step; 2=two steps, ...]

//CSS default
var CSSDEFAULTSET = 'colortop3';  //use the value of the selection Box #DRIVERCOLOR

//CSS definitions
var CSSTOP3VEHICLESstr ='';
CSSTOP3VEHICLESstr += 'circle.CSS_RacePos_1 {fill: gold; stroke-width: 3px }\n';
CSSTOP3VEHICLESstr += 'circle.CSS_RacePos_2 {fill: silver; stroke-width: 3px }\n';
CSSTOP3VEHICLESstr += 'circle.CSS_RacePos_3 {fill: #CD7F32; stroke-width: 3px }\n';
var CSSSAMEVEHICLECLASSESstr ='';
CSSSAMEVEHICLECLASSESstr = '.CSS_GT3 {fill: darkblue;}\n';
'circle.CSS_Vehicle_GT4 {fill: white;}\n';

var CSSCOLORSELECTION = new Array();
CSSCOLORSELECTION[0] = '{ fill: chocolate;\n background: black;} \n';
CSSCOLORSELECTION[1] = '{ fill: blue; } \n';
CSSCOLORSELECTION[2] = '{ fill: red; } \n';
CSSCOLORSELECTION[3] = '{ fill: yellow; } \n';
CSSCOLORSELECTION[4] = '{ fill: green; } \n';
CSSCOLORSELECTION[5] = '{ fill: darkblue; } \n';
CSSCOLORSELECTION[6] = '{ fill: white; } \n';
CSSCOLORSELECTION[7] = '{ fill: brown; } \n';
CSSCOLORSELECTION[8] = '{ fill: cornflowerblue; } \n';
CSSCOLORSELECTION[9] = '{ fill: darkgrey; } \n';
CSSCOLORSELECTION[10] = '{ fill: darkmagenta; } \n';
CSSCOLORSELECTION[11] = '{ fill: darkorange; } \n';
CSSCOLORSELECTION[12] = '{ fill: darkred; } \n';
CSSCOLORSELECTION[13] = '{ fill: darksalmon; } \n';
CSSCOLORSELECTION[14] = '{ fill: darkviolet; } \n';
CSSCOLORSELECTION[15] = '{ fill: deepskyblue; } \n';
CSSCOLORSELECTION[16] = '{ fill: lavender; } \n';
CSSCOLORSELECTION[17] = '{ fill: indigo; } \n';
CSSCOLORSELECTION[18] = '{ fill: khaki; } \n';
CSSCOLORSELECTION[19] = '{ fill: hotpink; } \n';
CSSCOLORSELECTION[20] = '{ fill: lawngreen; } \n';
CSSCOLORSELECTION[21] = '{ fill: lightsalmon; } \n';
CSSCOLORSELECTION[22] = '{ fill: lightseagreen; } \n';
CSSCOLORSELECTION[23] = '{ fill: lightslategrey; } \n';
CSSCOLORSELECTION[24] = '{ fill: lightyellow; } \n';
CSSCOLORSELECTION[25] = '{ fill: limegreen; } \n';
CSSCOLORSELECTION[26] = '{ fill: maroon; } \n';
CSSCOLORSELECTION[27] = '{ fill: purple; } \n';
CSSCOLORSELECTION[28] = '{ fill: navy; } \n';
CSSCOLORSELECTION[29] = '{ fill: orchid; } \n';
	

var CSSDEFINITIONS = {
		CSSTOP3VEHICLES:		CSSTOP3VEHICLESstr,
		CSSSAMEVEHICLECLASSES:  CSSSAMEVEHICLECLASSESstr,
		'CSSCOLORSELECTION': 	CSSCOLORSELECTION
	};



//Automatic CSV/PDF Export of all session results after a race weekend, a download dialog will pop up
//The Export is called if the SessionState changes to "PostRace"
var autoExport = "false";
var ExportType = "PDF"; //[CSV|PDF|BOTH]
var PDFstyles = {
	globalHeader: {
		fontSize: 18,
		bold: true,
		background: '#ffffff',
	},
	header: {
		fontSize: 12,
		bold: true,
		background: '#ffffff',
		margin : [ 0, 20, 0, 10 ]
	},
	table: {
		fontSize: 8,
		bold: false,
		background: '#ffffff'
	},
	tableHeader: {
		fontSize: 8,
		bold: true,
		background: '#ffffff'
	}
}

//settings for trackmap and markers depending on zoom level of Google Maps
// lineWeight = trackmap borders and mabe marker border, lineWeightMid = trackmap mid line, markerRadius = radius of marker point
var zoom_settings = [
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  0
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  1
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  2
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  3
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  4
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  5
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  6
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  7
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  8
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom  9
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom 10
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom 11
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom 12
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom 13
        {"lineWeight": 0.1,	"lineWeightMid": 0.1,     "markerRadius": 4.5},   //zoom 14
        {"lineWeight": 0.3,	"lineWeightMid": 2,	  	  "markerRadius": 4.5},   //zoom 15
        {"lineWeight": 0.5,	"lineWeightMid": 3.5,     "markerRadius": 4.5},   //zoom 16
        {"lineWeight": 0.5,	"lineWeightMid": 5,       "markerRadius": 4.5},   //zoom 17
        {"lineWeight": 1,	"lineWeightMid": 6.5,     "markerRadius": 4.5},   //zoom 18
        {"lineWeight": 2,	"lineWeightMid": 9,       "markerRadius": 4.5},   //zoom 19
        {"lineWeight": 3,	"lineWeightMid": 11.5,    "markerRadius": 4.5},   //zoom 20
        {"lineWeight": 4,	"lineWeightMid": 14,      "markerRadius": 4.5}    //zoom 21
];

var devmode_tm = false;  // [true | false] developer mode for trackmaps