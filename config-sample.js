///////////////////////////////////////////////
//global varibales definitions
///////////////////////////////////////////////
var SCRIPTVERSION	= "0.5.3";

// Defines the default MAP Type
var DEFAULT_MAP_TYPE = "google"; // [google|bing|osm|raw]
//put in your custom google map key or user url parameter api_key=
var GOOGLE_MAP_KEY = "";

//Activate URL parameter interpretation
var AllowUrlParams	= false;		//[true|false]	to igrnore URL parameters for security reasons

//Please your specific settings
//Project CARS Dedicated Server
var DsServerURL 		= "mydomain.com";
var DsPort				= 9000;
var DsPath				= "/api/session/status?attributes&members&participants";
//Project CARS 2 Dedicated Server
var Ds2ServerURL 		= "mydomain2.com";
var Ds2Port				= 9000;
var Ds2Path				= "/api/session/status?attributes&members&participants";
//Automobilista 2 Dedicated Server
var DsAMS2ServerURL 	= "mydomainAMS2.com";
var DsAMS2Port			= 9000;
var DsAMS2Path			= "/api/session/status?attributes&members&participants";
//Project CARS 1, 2 and AMS2 Dedicated Server track and vehicle path
var DsTracksPath		= "/api/list/tracks";
var DsVehiclesPath		= "/api/list/vehicles";
//Project CARS CREST
var CRESTServerURL 		= "localhost";
var CRESTPort			= 8080;
var CRESTPath			= "/crest/v1/api?gameStates=true&participants=true&eventInformation=true&timings=true&weather=true";
//Project CARS 2 CREST2
var CREST2ServerURL     = "localhost";
var CREST2Port          = 8180;
var CREST2Path			= "/crest2/v1/api?gameStates=true&participants=true&eventInformation=true&timings=true&weather=true";
//Automobilista 2 CREST2
var CREST2AMS2ServerURL = "localhost";
var CREST2AMS2Port      = 8180;
var CREST2AMS2Path		= "/crest2/v1/api?gameStates=true&participants=true&eventInformation=true&timings=true&weather=true";

// nodejs Proxy liveview-node
var use_node			= false;	// if set to true all settings above except Tracks and Vehicles Paths are overwritten with the node settings
var nodeServerURL		= "nodeServer";
var nodePort			= 8080;
var nodePath			= "";

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


//default API mode, possible values: DS, CREST, DS2, CREST2, DS-AMS2, CREST2-AMS2 or DEMO
var APIMODE   		=   "DEMO";	// Default API Mode

//hide or unhide elements
var SHOWTRACKLIST 		=	false;	// [true|false]
var SHOWCARLIST 		=	false 	// [true|false]
var SHOWDSDATA 			=	false;	// [true|false]
var SHOWDRIVERDATA 		=	false;	// [true|false]
var SHOWSETTINGS		=	false;	// [true|false]
//var SHOWDSSTATISTIC 		=	false;	// [true|false]
//var SHOWDSREPLAY		=	false;	// [true|false]
var SHOWRECSTATISTIC	=	true;	// [true|false]
var SHOWPOPUPLOADDEMO	=	false;	// [true|false]
var SHOWREFPOINTFIDDLING=	false;	// [true|false]
var SHOWLIVERYNAMES     =       true;   // [true|false] Show Livery/Team Name below Livery Image if a row in the driver table is selected. The names are ever shown as mousover title, independant from this setting.

////////////JQgrid design ///////
var JQGridIsDriversPOSHidden	=	true;   // [true | false] used for PosX,PosY,PosZ
var JQGridDrivertableCollapsed	=	true;   // [true | false] table default collapsed or unfolded
var JQGridTracktableCollapsed	= 	true;   // [true | false] table default collapsed or unfolded
var JQGridCartableCollapsed	=	true;   // [true | false] table default collapsed or unfolded

//defines a delay for each worker to reduce CPU load
var WORKERDELAY_TRACKLIST	=	5000; 	// in ms
var WORKERDELAY_DSDATA  	=	100;    // in ms - The lower the value the smoother the marker moving, but the higher the CPU load and network traffic.

var DisplayDuration			=	500;		// initial duration for displaying marker updates
var DisplayDurationCREST 	=	100;		// initial duration for displaying marker updates

var UpdateRateDS 			=	500;   //Update rate of DS. Currently used for calculation of the duration. If the calculation result is below 500 ms, it is set to 500 ms.
var GuiUpdateIntervall		=	3;	 //intervall fo updating GUI element,values etc. in seconds
var UpdateRateDriverTableMin	=	1000;	//The minimum interval between a reload of the driver table grid. The reload happens normally every polling/worker run, 
						// but if interval between this pollings is low the table interaction is bad. The minimun interval prevents this.

//StopTransitionDelay_minTimeRun - Time of disabled tranformWithEase function and using the transform function instead (markers jumping instead of smooth moving) on SessionState and SessionStage changes, and on zooming and dragging the map. 
//To understand this you first have to know that the marker positions are in relation to your display in pixel coordinates and not in relation to the map. 
//If the map is now dragged or zoomed for example and this happens during a smooth move of a marker from the old to the new position, then the marker will finish the move first in relation to your display, but it has to jump directly and follow the map to another position.
//In this case the smooth move is interrupted and the marker jumps to the new position.
//lower value means a higher chance that markers will hang on wrong positions on dragging ands zooming the map
//higher value means that markers longer jumping instead of smooth moving as needed
var StopTransitionDelay_minTimeRun = 1100; //milliseconds - 

// Logging
//Log Levels for console.log commands: 0 = off or special use, 1 = error, 2 = warning, 3 = info, 4 = extended info (output of variables for example)
var log = 1;

// Recording
var isRecEnabled			=	false;		//enables recording of data
var aRecConfig				=	[];			//config hash
aRecConfig['maxRecordSize']	=	999999;
aRecConfig['DataVersion']	=	1;			//in the case if data format will changed and recorded csv will loaded from file

//demo initial data, currently that must not be empty
var demo = [
                {//0
                	globals:{sensorLayer_UpdateDelta:886, state:"Running", name:"MyDS", lobbyid:109775242963699993, joinable:"true", max_member_count:3, now:1459966148, "datasource":"CRESTv2", "curgamerunning":"PCARS2", attributes:{TrackId:9999999999, SessionState:"Lobby", SessionStage:"Practice1", GridSize:10, MaxPlayers:3, SessionTimeDuration:0, SessionTimeElapsed:0, RaceLength: 0, TemperatureAmbient: 20, TemperatureTrack: 30}},
                    participants:[
			    {RefId:9234567, Name:"Slightly Mad Studios Ltd", IsPlayer:0, GridPosition:3, VehicleId:"9999999999", LiveryId: 1, RacePosition:0, CurrentLap:99, CurrentSector:0, LastLapTime:9999, FastestLapTime:9000, S1Time: 0, S2Time: 0, S3Time: 0, State:"StateTest", Speed:100, PosX:0, PosY:0, PosZ:0, Orientation:0, NumPits: "-", Gap2Ahead: "-", Gap2First: "-"}
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
CSSDRIVERSELECTION = '{ fill: black; stroke: yellow; stroke-width: 4px; } \n';
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

var trackmap_opacity = 0.7;	//only needed for middle line
var trackmap_color_LineMid = '#E0E0E0';
var trackmap_color_LineBorders = '#FF0000';	//only used for fictional tracks and in dev mode


var devmode_tm = false;  // [true | false] developer mode for trackmaps
