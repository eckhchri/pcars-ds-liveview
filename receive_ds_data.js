// Module for recaive data from ProjectCARS dedicated server
// requirements:    JQUERY  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

//Receive_DS_data("[DS URL]]",9000);
// http://[DS URL]:9000/api/session/status?attributes&members&participants
function Receive_DS_data (url,port,path,timeout,receivemode, aRefPointTMP, confParam){

	this.url				=	url;
	this.port				=	port;
	this.fullurl			=	'http://' +  url + ':' + port + path;
	this.timeout			=	timeout;
	this.receivemode		=	receivemode;		// GETDRIVERDATE , GETTRACKLIST
	this.aRefPointName2ID	=	aRefPointTMP;		// mapping off all available Tracknames to track ID	
	this.confParam			=	confParam;	
	
	
	
	//CurrentSector has to be mapped
	// API Sector 	- Real Sector
	// 	3 			- 	1
	// 	1 			- 	2
	// 	2 			- 	3
	//	0			-	0
	this.aSectormappingDS = {
				"3": '1',
				"1": '2',
				"2": '3',
				"0": '0'
	};

	this.aSectormappingCREST = {
				"0": '1',
				"1": '2',
				"2": '3'
	};
	
	this.aMappingGameStateCREST = {
		"0": "Exited",
		"1": "Front End",
		"2": "InGame Playing",
		"3": "InGame Paused",
		"4": "InGame InMenu Time_Ticking",
		"5": "InGame Restarting",
		"6": "InGame Replay",
		"7": "Front End Replay",
		//-------------
		"8": "Max"
	};

	this.aMappingSessionStateCREST = {
		"0": "Invalid",
		"1": "Practice1",
		"2": "Test",
		"3": "Qualifying1",
		"4": "Formation Lap",
		"5": "Race1",
		"6": "Time Attack",
		//-------------
		"7": "Max"
	};

	this.aMappingRaceStateCREST = {
		"0": "Invalid",
		"1": "Not Started",
		"2": "Racing",
		"3": "Finished",
		"4": "Disqualified",
		"5": "Retired",
		"6": "DNF",
		//-------------
		"7": "Max"
	};

	this.aMappingPitModeCREST = {
		"0": "None",
		"1": "EnteringPits",
		"2": "InPits",
		"3": "ExitingPits",
		"4": "InGarage",
		"5": "ExitingGarage",
                //-------------
                "6": "Max"
	}

	//if(log >= 3){console.log("Receive_DS_data() --- receivemode this: " , this);}

	if (this.receivevariant == undefined){
		this.receivevariant = "GETDSANDDRIVERDATA";
	}

	// todo: Mapping HASH fuer receivevariant festlegen
	// not needed anymore, the paths are now set in the config file
	/*var aReceiveModes = {
				"GETDSANDDRIVERDATA"	: "/api/session/status?attributes&members&participants",
				"GETDS2ANDDRIVERDATA"	: "/api/session/status?attributes&members&participants",
				"GETTRACKLIST"  		: "/api/list/tracks",
				"GETVEHICLELIST"  		: "/api/list/vehicles",
				"GETCRESTDRIVERDATA"	: "/crest/v1/api?gameStates=true&participants=true&eventInformation=true&timings=true&weather=true",
				"GETCREST2DRIVERDATA"	: "/crest2/v1/api?gameStates=true&participants=true&eventInformation=true&timings=true&weather=true",
				"GETCREST2AMS2DRIVERDATA"	: "/crest2/v1/api?gameStates=true&participants=true&eventInformation=true&timings=true&weather=true",
				//"GETCREST2AMS2DRIVERDATA"	: "",	// Test with liveview-node
				"GETDEMODATA"    		: ""
	};	*/

////////    nested functions     //////////////
// put into a function because of issue #141
function returnDataSendError(rMode){

	switch ( rMode ){
		
		case	"GETDSANDDRIVERDATA":	return aDrivers;

		case	"GETDS2ANDDRIVERDATA":	return aDrivers;

		case	"GETDSAMS2ANDDRIVERDATA":	return aDrivers;

		case	"GETTRACKLIST":		return aEmptyArray;
		
		case	"GETVEHICLELIST":	return aEmptyArray;
		
		case	"GETCRESTDRIVERDATA":	return aDrivers;
			
		case	"GETCREST2DRIVERDATA":	return aDrivers;

		case	"GETCREST2AMS2DRIVERDATA":	return aDrivers;
		
		default: return aDrivers;
	} // end switch	
}

//todo: Decison Using XMLHTTP class oder   THREE
//      http://api.jquery.com/jquery.getjson/
//	jQuery.getJSON( this.fullurl, 
//    			function(data){
//				if(log >= 3){console.log( data );}
//				document.write ( data );
//		});
//	wait(3);
//	document.write ( data );
	
	var aDrivers		=	new Array();
	aDrivers.globals = {
		"joinable":		"default parameters"
		,"lobbyid":		"default parameters"
		,"max_member_count":	"default parameters"
		,"now":			"default parameters"
		,"state":		"default parameters"
		,"datasource":	"default parameters"
		//,"curgamerunning": "default parameters"
		,"curgamerunning": demo[0]['globals']['curgamerunning']	// for generating the refpoint array for the current running game we need always a valid game, "default parameters" is not working
		,"attributes":{
			"TrackId":      9999999999
			,"GridSize":            0
			,"MaxPlayers":          0
			,"SessionStage":	""
			,"SessionState":	""
			,"RaceLength":          0
			,"TemperatureAmbient":	20
			,"TemperatureTrack":	30
		}
	}
	aDrivers.driverlist	=	new Array();

	// DriverDummy object for API error, if the API don't returns the data for all drivers
	//PosX = 100km, in result you don't see the marker on the map
	var DriverDummyAPIerror = new PCARSdriver();
	DriverDummyAPIerror.SetExampleData();
	DriverDummyAPIerror.UpdateObjectData({Name: "API Error", State: "Error", FastestLapTime: 0, LastLapTime: 0, CurrentLap: 0, PosX: 100000000});

	var aEmptyArray		=	new Array();
	var TrackName;
	var TrackID;
	var PosX;
	var PosY;
	var PosZ;
	var index;			// index of driver objects
	var loopcnt = 0;	// use as index if RacePosition is 0 during several session states
	var IsPlayer = 0;
	var FastestLapTime;
	var LastLapTime;
	var S1Time;
	var S2Time;
	var S3Time;
	var RaceState;

	var strConsoleLog = ""; // Debugging Issue #131

	if(this.receivemode == "GETDEMODATA"){
		/*var recording_position = timeout;
		var demo_el = demo[recording_position];*/
		var demo_el = timeout;		
		aDrivers.globals = {
			"joinable":				demo_el.globals.joinable
			,"lobbyid":				demo_el.globals.lobbyid
			,"max_member_count":	demo_el.globals.max_member_count
			,"now":					demo_el.globals.now
			,"state":				demo_el.globals.state
			,"name":				demo_el.globals.name
			,"datasource":			confParam['originaldatasource']
			,"curgamerunning":		confParam['originalcurgamerunning']
			,"attributes":{
				"TrackId":			demo_el.globals.attributes.TrackId
				,"GridSize":		demo_el.globals.attributes.GridSize
				,"MaxPlayers":		demo_el.globals.attributes.MaxPlayers
				,"SessionStage":	demo_el.globals.attributes.SessionStage
				,"SessionState":	demo_el.globals.attributes.SessionState
				,"SessionTimeDuration":	demo_el.globals.attributes.SessionTimeDuration
				,"SessionTimeElapsed":	demo_el.globals.attributes.SessionTimeElapsed
				,"RaceLength":          demo_el.globals.attributes.RaceLength
				,"TemperatureAmbient":  demo_el.globals.attributes.TemperatureAmbient
				,"TemperatureTrack":    demo_el.globals.attributes.TemperatureTrack
			}
		}
		for (var i = 0;i<demo_el.participants.length;i++){
                	
			//read data of all participants and put it in an array of PCARSdriver objects                	
			index = CalculateIndexDriverArray (demo_el.participants[i].RacePosition, loopcnt);
			loopcnt++;
			aDrivers.driverlist[index] =
							new PCARSdriver(
								demo_el.participants[i].RefId,
								demo_el.participants[i].Name,
								demo_el.participants[i].IsPlayer,
								demo_el.participants[i].GridPosition,
								demo_el.participants[i].PosX,
								demo_el.participants[i].PosY,
								demo_el.participants[i].PosZ,
								demo_el.participants[i].State,
								//no mappaing of the sector needed, because within Export correct values included
								demo_el.participants[i].CurrentSector,
								demo_el.participants[i].RacePosition,
								demo_el.participants[i].FastestLapTime,
								demo_el.participants[i].LastLapTime,
								demo_el.participants[i].S1Time,
								demo_el.participants[i].S2Time,
								demo_el.participants[i].S3Time,
								demo_el.participants[i].Orientation,
								demo_el.participants[i].Speed,
								demo_el.participants[i].CurrentLap,
								demo_el.participants[i].VehicleId,
								demo_el.participants[i].LiveryId,
								demo_el.participants[i].NumPits,
								demo_el.participants[i].Gap2Ahead,
								demo_el.participants[i].Gap2First,
								demo_el.participants[i].VehicleName,
								demo_el.participants[i].VehicleClassName,
								demo_el.participants[i].oIdx
							);
		}
		// check complete driverlist for missing objects. Sometimes the API do not returns all drivers and then there is an array element missing which throws an error during access
		for (var i = 0;i<aDrivers.driverlist.length;i++){
			if(!aDrivers.driverlist[i]){
				DriverDummyAPIerror.UpdateObjectData({RacePosition: i+1});
				aDrivers.driverlist[i] = DriverDummyAPIerror;
				if(log >= 2){console.log ( "Receive API ERROR, replaced missing driver array object. Array element: ", i, "  driver array: " , aDrivers.driverlist);}
			}
		}
		return aDrivers;
                
	}else{

		// http://www.w3.org/TR/2006/WD-XMLHttpRequest-20060405/
		var xmlhttp = new XMLHttpRequest();
		
		// make an  xmlhttp request (synchr)
		xmlhttp.open(
				"GET",				
				//fullurl + aReceiveModes[this.receivemode]
				fullurl
				// optional parameter for decison: async = true, sync = false
				, false
			    );
		//xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
		//xmlhttp.setRequestHeader("Authorization", "Basic " + btoa("user" + ":" + "password"));

		//force UTF8 encoding for issue #79
		xmlhttp.overrideMimeType("application/xml; charset=UTF-8");
		
		// send request
		try{
			xmlhttp.send();
		}catch(err){
			
			if(log >= 3){console.log("Error while sending Request to DS!:" + err );}
			return returnDataSendError(this.receivemode);		
		}

		//sucessfull request
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {

			//https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
			// TODO: JSON.parse and UTF Strings:  http://stackoverflow.com/questions/18264519/javascript-json-parse-utf-8-problems?rq=1

			var myArr = {};

			// sometimes the HTTP response data is incomplete if the providing tool like CREST2 or node proxy is started or stopped while liveview is running.
			// JSON.parse throws an error in this case.
			//if(log >= 3){console.log("xmlhttp.responseText: ", xmlhttp.responseText);}
			try {
				myArr = JSON.parse( xmlhttp.responseText );
			} catch(e) {
				console.log("Error on parsing JSON response: ",e);
				return returnDataSendError(this.receivemode);
			}
			var arrayoutput 	= myArr.toString();
			var DriverDummy		= new PCARSdriver();
			DriverDummy.SetExampleData();
			
			//Issue #79 UTF8 Encoding within Driver Names
			//if(log >= 3){console.log("xmlhttp.responseType" , xmlhttp.responseType );}
			//if(log >= 3){console.log("xmlhttp.getAllResponseHeaders()" , xmlhttp.getAllResponseHeaders() );}
			//if(log >= 3){console.log("xmlhttp: " , xmlhttp);}
			//if(log >= 3){console.log("xmlhttp.responseText WITHOUT JSON.parse(): " , xmlhttp.responseText);}
			//if(log >= 3){console.log("ReceiveDsData complete array. Converted with JSON.parse(): " , myArr);}
	
		   switch ( this.receivemode ) {
	
			case  "GETDSANDDRIVERDATA":
	
				// collect DS common data
				if ( myArr.response.state == "Idle" ){
	
						//	Todo: put all values into Array?
						aDrivers.globals = {
	                                         	"joinable":				myArr.response.joinable
		                                        ,"lobbyid":             myArr.response.lobbyid
		                                        ,"max_member_count":    myArr.response.max_member_count
		                                        ,"now":                 myArr.response.now
		                                        ,"state":               myArr.response.state
		                                        ,"datasource":			"DSPCARS1"
	                                        	,"curgamerunning":		"PCARS1"			//used for correct data mapping of Vehiclelist and tracklist. Do not change because its used to access an hash directly
		                                        ,"attributes":		{
								"TrackId":		9999999999
								,"GridSize":		0
								,"MaxPlayers":		0
								,"SessionStage":	""
								,"SessionState":	""
								,"SessionTimeDuration":	0
								,"SessionTimeElapsed":	0
								,"RaceLength":		0
								,"TemperatureAmbient":	20
								,"TemperatureTrack":	30
								}
						}
				}else if ( myArr.response.state == "Running" ){
	
						aDrivers.globals = {
		                                         "joinable":            myArr.response.joinable
		                                        ,"lobbyid":             myArr.response.lobbyid
		                                        ,"max_member_count":    myArr.response.max_member_count
		                                        ,"now":                 myArr.response.now
		                                        ,"state":               myArr.response.state
		                                        ,"datasource":			"DSPCARS1"
	                                        	,"curgamerunning":		"PCARS1"
		                                        ,"name":                myArr.response.name
		                                        ,"attributes":		{
								"TrackId":		myArr.response.attributes.TrackId
								,"GridSize":		myArr.response.attributes.GridSize
								,"MaxPlayers":		myArr.response.attributes.MaxPlayers
								,"SessionStage":	myArr.response.attributes.SessionStage
								,"SessionState":	myArr.response.attributes.SessionState
								,"SessionTimeDuration":	myArr.response.attributes.SessionTimeDuration
								,"SessionTimeElapsed":	myArr.response.attributes.SessionTimeElapsed
								,"RaceLength":		myArr.response.attributes.Race1Length
								,"TemperatureAmbient":	myArr.response.attributes.TemperatureAmbient/1000
								,"TemperatureTrack":	myArr.response.attributes.TemperatureTrack/1000
								}
	        	                                }
				}else{
					// in case of othe stati return a defined value
						aDrivers.globals = {
							"joinable":            "unknown mode"
	                       ,"lobbyid":             "unknown mode"
	                       ,"max_member_count":    "unknown mode"
	                       ,"now":                 "unknown mode"
	                       ,"state":               "unknown mode"
	                       ,"datasource":		   "DSPCARS1"
	                       ,"curgamerunning":		"PCARS1"
	                       ,"name":                "unknown mode"
	                       ,"attributes":		{
					"TrackId":		9999999999
					,"GridSize":		0
					,"MaxPlayers":		0
					,"SessionStage":	""
					,"SessionState":	""
					,"SessionTimeDuration":	0
					,"SessionTimeElapsed":	0
					,"RaceLength":		0
					,"TemperatureAmbient":	20
					,"TemperatureTrack":	30
					}
	              }
				}
				
				/* attributes now single mapped above in the "Running" state, because there are 63 attributes and they need a lot of space during recording
				//cath all attributes
				for (var key in myArr.response.attributes) {
					aDrivers.globals.attributes[key] =  myArr.response.attributes[key];
				}*/
									
				// collect Driverdata
				if ( myArr.response.participants.length == 0 ){
	
					if(log >= 3){console.log("no Participants found in DS, leave function and use Test data array!");}
					// put empty dummy object into array
					aDrivers.driverlist.push( DriverDummy );
	
				}else{
	
					for (var i = 0;i<myArr.response.participants.length;i++){
						
							//if(log >= 3){console.log ( "DS Participants:" , myArr.response.participants);}
							// read data of all participants and put it in an array of PCARSdriver objects						
							index = CalculateIndexDriverArray (myArr.response.participants[i].attributes.RacePosition, loopcnt);
							loopcnt++;

							aDrivers.driverlist[index] =
		                                        new PCARSdriver(
		                                                myArr.response.participants[i].attributes.RefId,
		                                                myArr.response.participants[i].attributes.Name,
		                                                myArr.response.participants[i].attributes.IsPlayer,
		                                                myArr.response.participants[i].attributes.GridPosition,
		                                                myArr.response.participants[i].attributes.PositionX,
		                                                myArr.response.participants[i].attributes.PositionY,
		                                                myArr.response.participants[i].attributes.PositionZ,
		                                                myArr.response.participants[i].attributes.State,
		                                                this.aSectormappingDS[ myArr.response.participants[i].attributes.CurrentSector ],		                                                
		                                                myArr.response.participants[i].attributes.RacePosition,
		                                                myArr.response.participants[i].attributes.FastestLapTime,
		                                                myArr.response.participants[i].attributes.LastLapTime,
								myArr.response.participants[i].attributes.Sector1Time,
								myArr.response.participants[i].attributes.Sector2Time,
								myArr.response.participants[i].attributes.Sector3Time,
		                                                myArr.response.participants[i].attributes.Orientation,
		                                                myArr.response.participants[i].attributes.Speed,
		                                                myArr.response.participants[i].attributes.CurrentLap,
		                                                myArr.response.participants[i].attributes.VehicleId,
								myArr.response.participants[i].attributes.LiveryId,
														undefined,	//NumPits
														undefined,	//Gap2Ahead
														undefined,	//Gap2First
														undefined,	//VehicleName - NA
														undefined,	//VehicleClassName - NA
														i			//oIdx API index
		                                         	);
					}
	
					// check complete driverlist for missing objects. Sometimes the API do not returns all drivers and then there is an array element missing which throws an error during access
					for (var i = 0;i<aDrivers.driverlist.length;i++){
						if(!aDrivers.driverlist[i]){
							DriverDummyAPIerror.UpdateObjectData({RacePosition: i+1});
							aDrivers.driverlist[i] = DriverDummyAPIerror;
							if(log >= 2){console.log ( "Receive API ERROR, replaced missing driver array object. Array element: ", i, "  driver array: " , aDrivers.driverlist);}
						}
					}
					
					//if(log >= 3){console.log ( "DS Mode Full Return:" , aDrivers);}
					// return information
					return aDrivers;
				}
				
				return aDrivers;
		
				

			case "GETDS2ANDDRIVERDATA":
				
				// collect DS2 common data
				//Todo: adjust to DS2 values
				if ( myArr.response.state == "Idle" ){
	
						//	Todo: put all values into Array?
						aDrivers.globals = {
	                                         	"joinable":				myArr.response.joinable
		                                        ,"lobbyid":             0
		                                        ,"max_member_count":    myArr.response.max_member_count
		                                        ,"now":                 myArr.response.now
		                                        ,"state":               myArr.response.state
		                                        ,"datasource":			"DSPCARS2"
	                                        	,"curgamerunning":		"PCARS2"			//used for correct data mapping of Vehiclelist and tracklist. Do not change because its used to access an hash directly
		                                        ,"attributes":		{
								"TrackId":		9999999999
								,"GridSize":		0
								,"MaxPlayers":		0
								,"SessionStage":	""
								,"SessionState":	""
								,"SessionTimeDuration":	0
								,"SessionTimeElapsed":	0
								,"RaceLength":		0
								,"TemperatureAmbient":	20
								,"TemperatureTrack":	30
								}
						}
				}else if ( myArr.response.state == "Running" ){
	
						aDrivers.globals = {
		                                         "joinable":            myArr.response.joinable
		                                        ,"lobbyid":             0
		                                        ,"max_member_count":    myArr.response.max_member_count
		                                        ,"now":                 myArr.response.now
		                                        ,"state":               myArr.response.state
		                                        ,"datasource":			"DSPCARS2"
	                                        	,"curgamerunning":		"PCARS2"
		                                        ,"name":                myArr.response.name
		                                        ,"attributes":		{
								"TrackId":		myArr.response.attributes.TrackId
								,"GridSize":		myArr.response.attributes.GridSize
								,"MaxPlayers":		myArr.response.attributes.MaxPlayers
								,"SessionStage":	myArr.response.attributes.SessionStage
								,"SessionState":	myArr.response.attributes.SessionState
								,"SessionTimeDuration":	myArr.response.attributes.SessionTimeDuration
								,"SessionTimeElapsed":	myArr.response.attributes.SessionTimeElapsed	
								,"RaceLength":		myArr.response.attributes.RaceLength
								,"TemperatureAmbient":	myArr.response.attributes.TemperatureAmbient/1000
								,"TemperatureTrack":	myArr.response.attributes.TemperatureTrack/1000
								}
	        	                                }
				}else{
					// in case of othe stati return a defined value
						aDrivers.globals = {
							"joinable":            "unknown mode"
	                       ,"lobbyid":             "unknown mode"
	                       ,"max_member_count":    "unknown mode"
	                       ,"now":                 "unknown mode"
	                       ,"state":               "unknown mode"
	                       ,"datasource":		   "DSPCARS2"
	                       ,"curgamerunning":		"PCARS2"
	                       ,"name":                "unknown mode"
	                       ,"attributes":		{
					"TrackId":		9999999999
					,"GridSize":		0
					,"MaxPlayers":		0
					,"SessionStage":	""
					,"SessionState":	""
					,"SessionTimeDuration":	0
					,"SessionTimeElapsed":	0
					,"RaceLength":		0
					,"TemperatureAmbient":	20
					,"TemperatureTrack":	30
					}
	              }
				}
				
				/* attributes now single mapped above in the "Running" state, because there are 63 attributes and they need a lot of space during recording
				//cath all attributes
				for (var key in myArr.response.attributes) {
					aDrivers.globals.attributes[key] =  myArr.response.attributes[key];
				}*/
									
				// collect Driverdata
				if ( myArr.response.participants.length == 0 ){
	
					if(log >= 3){console.log("no Participants found in DS, leave function and use Test data array!");}
					// put empty dummy object into array
					aDrivers.driverlist.push( DriverDummy );
	
				}else{

					strConsoleLog = "Debugging Issue #131 - Index/Driver: \n"; // Debugging Issue #131

					for (var i = 0;i<myArr.response.participants.length;i++){
						
							//if(log >= 3){console.log ( "DS Participants:" , myArr.response.participants);}
							// read data of all participants and put it in an array of PCARSdriver objects						
							index = CalculateIndexDriverArray (myArr.response.participants[i].attributes.RacePosition, loopcnt);
							loopcnt++;

							aDrivers.driverlist[index] =
		                                        new PCARSdriver(
		                                                myArr.response.participants[i].attributes.RefId,
		                                                myArr.response.participants[i].attributes.Name,
		                                                myArr.response.participants[i].attributes.IsPlayer,
		                                                myArr.response.participants[i].attributes.GridPosition,
		                                                myArr.response.participants[i].attributes.PositionX,
		                                                myArr.response.participants[i].attributes.PositionY,
		                                                myArr.response.participants[i].attributes.PositionZ,
		                                                myArr.response.participants[i].attributes.State,
		                                                this.aSectormappingDS[ myArr.response.participants[i].attributes.CurrentSector ],		                                                
		                                                myArr.response.participants[i].attributes.RacePosition,
		                                                myArr.response.participants[i].attributes.FastestLapTime,
		                                                myArr.response.participants[i].attributes.LastLapTime,
								myArr.response.participants[i].attributes.Sector1Time,
                                                                myArr.response.participants[i].attributes.Sector2Time,
                                                                myArr.response.participants[i].attributes.Sector3Time,
		                                                myArr.response.participants[i].attributes.Orientation,
		                                                myArr.response.participants[i].attributes.Speed,
		                                                myArr.response.participants[i].attributes.CurrentLap,
		                                                myArr.response.participants[i].attributes.VehicleId,
								myArr.response.participants[i].attributes.LiveryId,
														undefined,	//NumPits
														undefined,	//Gap2Ahead
														undefined,	//Gap2First
														undefined,	//VehicleName - NA
														undefined,	//VehicleClassName - NA
														i			//oIdx API index
		                                         	);
							strConsoleLog = strConsoleLog + i + "/" + myArr.response.participants[i].attributes.Name + "\n"; // Debugging Issue #131
					}

					//if(log >= 3){console.log (strConsoleLog);} // Debugging Issue #131
	
					// check complete driverlist for missing objects. Sometimes the API do not returns all drivers and then there is an array element missing which throws an error during access
					for (var i = 0;i<aDrivers.driverlist.length;i++){
						if(!aDrivers.driverlist[i]){
							DriverDummyAPIerror.UpdateObjectData({RacePosition: i+1});
							aDrivers.driverlist[i] = DriverDummyAPIerror;
							if(log >= 2){console.log ( "Receive API ERROR, replaced missing driver array object. Array element: ", i, "  driver array: " , aDrivers.driverlist);}
						}
					}
					
					//if(log >= 3){console.log ( "DS Mode Full Return:" , aDrivers);}
					// return information
					return aDrivers;
				}
				
				return aDrivers;
				
				case "GETDSAMS2ANDDRIVERDATA":

					// collect DS2 common data
					//Todo: adjust to DS2 values
					if ( myArr.response.state == "Idle" ){
						//	Todo: put all values into Array?
						aDrivers.globals = {
							"joinable":				myArr.response.joinable
							,"lobbyid":             0
							,"max_member_count":    myArr.response.max_member_count
							,"now":                 myArr.response.now
							,"state":               myArr.response.state
							,"datasource":			"DSAMS2"
							,"curgamerunning":		"AMS2"			//used for correct data mapping of Vehiclelist and tracklist. Do not change because its used to access an hash directly
							,"attributes":		{
								"TrackId":		9999999999
								,"GridSize":		0
								,"MaxPlayers":		0
								,"SessionStage":	""
								,"SessionState":	""
								,"SessionTimeDuration":	0
								,"SessionTimeElapsed":	0
								,"RaceLength":		0
								,"TemperatureAmbient":	20
								,"TemperatureTrack":	30
							}
						}
					}else if ( myArr.response.state == "Running" ){
						aDrivers.globals = {
							"joinable":            myArr.response.joinable
							,"lobbyid":             0
							,"max_member_count":    myArr.response.max_member_count
							,"now":                 myArr.response.now
							,"state":               myArr.response.state
							,"datasource":			"DSAMS2"
							,"curgamerunning":		"AMS2"
							,"name":                myArr.response.name
							,"attributes":		{
								"TrackId":		myArr.response.attributes.TrackId
								,"GridSize":		myArr.response.attributes.GridSize
								,"MaxPlayers":		myArr.response.attributes.MaxPlayers
								,"SessionStage":	myArr.response.attributes.SessionStage
								,"SessionState":	myArr.response.attributes.SessionState
								,"SessionTimeDuration":	myArr.response.attributes.SessionTimeDuration
								,"SessionTimeElapsed":	myArr.response.attributes.SessionTimeElapsed	
								,"RaceLength":		myArr.response.attributes.RaceLength
								,"TemperatureAmbient":	myArr.response.attributes.TemperatureAmbient/1000
								,"TemperatureTrack":	myArr.response.attributes.TemperatureTrack/1000
							}
						}
					}else{
						// in case of othe stati return a defined value
						aDrivers.globals = {
							"joinable":            "unknown mode"
							,"lobbyid":             "unknown mode"
							,"max_member_count":    "unknown mode"
							,"now":                 "unknown mode"
							,"state":               "unknown mode"
							,"datasource":		   "DSAMS2"
							,"curgamerunning":		"AMS2"
							,"name":                "unknown mode"
							,"attributes":		{
								"TrackId":		9999999999
								,"GridSize":		0
								,"MaxPlayers":		0
								,"SessionStage":	""
								,"SessionState":	""
								,"SessionTimeDuration":	0
								,"SessionTimeElapsed":	0
								,"RaceLength":		0
								,"TemperatureAmbient":	20
								,"TemperatureTrack":	30
							}
						}
					}

					/* attributes now single mapped above in the "Running" state, because there are 63 attributes and they need a lot of space during recording
					//cath all attributes
					for (var key in myArr.response.attributes) {
						aDrivers.globals.attributes[key] =  myArr.response.attributes[key];
					}*/

					// collect Driverdata
					if ( myArr.response.participants.length == 0 ){

						if(log >= 3){console.log("no Participants found in DS, leave function and use Test data array!");}
						// put empty dummy object into array
						aDrivers.driverlist.push( DriverDummy );

					}else{

						strConsoleLog = "Debugging Issue #131 - Index/Driver: \n"; // Debugging Issue #131

						for (var i = 0;i<myArr.response.participants.length;i++){

							//if(log >= 3){console.log ( "DS Participants:" , myArr.response.participants);}
							// read data of all participants and put it in an array of PCARSdriver objects
							index = CalculateIndexDriverArray (myArr.response.participants[i].attributes.RacePosition, loopcnt);
							loopcnt++;

							aDrivers.driverlist[index] =
								new PCARSdriver(
									myArr.response.participants[i].attributes.RefId,
									myArr.response.participants[i].attributes.Name,
									myArr.response.participants[i].attributes.IsPlayer,
									myArr.response.participants[i].attributes.GridPosition,
									myArr.response.participants[i].attributes.PositionX,
									myArr.response.participants[i].attributes.PositionY,
									myArr.response.participants[i].attributes.PositionZ,
									myArr.response.participants[i].attributes.State,
									this.aSectormappingDS[ myArr.response.participants[i].attributes.CurrentSector ],
									myArr.response.participants[i].attributes.RacePosition,
									myArr.response.participants[i].attributes.FastestLapTime,
									myArr.response.participants[i].attributes.LastLapTime,
									myArr.response.participants[i].attributes.Sector1Time,
									myArr.response.participants[i].attributes.Sector2Time,
									myArr.response.participants[i].attributes.Sector3Time,
									myArr.response.participants[i].attributes.Orientation,
									myArr.response.participants[i].attributes.Speed,
									myArr.response.participants[i].attributes.CurrentLap,
									myArr.response.participants[i].attributes.VehicleId,
									myArr.response.participants[i].attributes.LiveryId,
									undefined,	//NumPits
									undefined,	//Gap2Ahead
									undefined,	//Gap2First
									undefined,	//VehicleName - NA
									undefined,	//VehicleClassName - NA
									i			//oIdx API index
								);
							strConsoleLog = strConsoleLog + i + "/" + myArr.response.participants[i].attributes.Name + "\n"; // Debugging Issue #131
						}

						//if(log >= 3){console.log (strConsoleLog);} // Debugging Issue #131

						// check complete driverlist for missing objects. Sometimes the API do not returns all drivers and then there is an array element missing which throws an error during access
						for (var i = 0;i<aDrivers.driverlist.length;i++){
							if(!aDrivers.driverlist[i]){
								DriverDummyAPIerror.UpdateObjectData({RacePosition: i+1});
								aDrivers.driverlist[i] = DriverDummyAPIerror;
								if(log >= 2){console.log ( "Receive API ERROR, replaced missing driver array object. Array element: ", i, "  driver array: " , aDrivers.driverlist);}
							}
						}

						//if(log >= 3){console.log ( "DS Mode Full Return:" , aDrivers);}
						// return information
						return aDrivers;
					}

					return aDrivers;

				
			case "GETTRACKLIST":

				// if no users joined return example Data
				if(log >= 3){console.log("++++++++++++++++ GETTRACKLIST / received data" , myArr );}

				if ( myArr.response.list.length == 0 ){
					
						if(log >= 3){console.log("no Participants found in DS, leave function!");}
						aDrivers.push ( DriverDummy );        
						return aDrivers;
				}
				
				var aTrackList = new Array;
	
				//build array of PCARSTRACK objects
				for (var i = 0;i<myArr.response.list.length;i++) {					 
					aTrackList.push (  
								new PCARSTRACK (
									myArr.response.list[i].id,
									myArr.response.list[i].name,
									myArr.response.list[i].gridsize
								)
							);
				}							
			
				//if(log >= 3){console.log("++++ aTrackList: " ,  aTrackList);}
				return aTrackList;
				
			case "GETVEHICLELIST":
	
				// if no vehicle data returned return empty data			
				if ( myArr.response.list.length == 0 ){
					if(log >= 3){console.log("++++++++++++++++ GETVEHICLELIST  array length=0 .");}					        
					return aEmptyArray;
				}
					
				var aVehicleList = new Array;
	
				for (var i = 0;i<myArr.response.list.length;i++) {					
					//build array of PCARSVEHICLE objects 
					aVehicleList.push (  
								new PCARSVEHICLE (
									myArr.response.list[i].id,
									myArr.response.list[i].name,
									myArr.response.list[i].class
								)
							);
				}							
	
				//if(log >= 3){console.log("+++++++++++++++ aTrackList: " , aTrackList);}				
				return aVehicleList;
				
				
			case  "GETCRESTDRIVERDATA":
			
				TrackName = BuildTrackNameFromGameAPI(myArr.eventInformation.mTrackLocation,myArr.eventInformation.mTrackVariation);
				TrackID = GetTrackIDbyName(TrackName , this.aRefPointName2ID);
				if(log >= 2){console.log("---CREST1 Trackname: ", TrackName, " / TrackID: ", TrackID);}
				
				//overwrite default values with CRESt specific ones
				aDrivers.globals = {
					"joinable":				"CREST Mode"
					,"lobbyid":				"CREST Mode"
					,"max_member_count":	"CREST Mode"
					,"now":					"CREST Mode"
					,"state":				"CREST Mode"
					,"datasource":			"CRESTv1"
					,"curgamerunning":		"PCARS1"
					,"attributes":{
						"TrackId":			TrackID
						,"SessionStage":	this.aMappingSessionStateCREST[ myArr.gameStates.mSessionState ]
						,"SessionState":	myArr.gameStates.mGameState
						,"SessionTimeDuration":	myArr.timings.mEventTimeRemaining	//CREST has directly the resttime, SessionTimeDuration - SessionTimeElapsed = resttime
						,"SessionTimeElapsed":	0
						,"RaceLength":          myArr.eventInformation.mLapsInEvent
						,"TemperatureAmbient":	myArr.weather.mAmbientTemperature
						,"TemperatureTrack":	myArr.weather.mTrackTemperature
					}
				}
				
				// if no users joined return example Data
				if ( myArr.participants.mNumParticipants == 0 ){				
					if(log >= 3){console.log("no Participants found in DS, leave function and use Test data array!");}	
					aDrivers.push( DriverDummy );						
					return aDrivers;
				}
					
				if(log >= 3){console.log("+-+-+-+-+-+-+-+-+-CREST Globals definition", aDrivers);}
	
				for (var i = 0;i<myArr.participants.mNumParticipants;i++) {
										
					// read data of all participants and put it in an array of PCARSdriver objects
					PosX = myArr.participants.mParticipantInfo[i].mWorldPosition[0] * 1000;
					PosY = myArr.participants.mParticipantInfo[i].mWorldPosition[1] * 1000;		
					PosZ = myArr.participants.mParticipantInfo[i].mWorldPosition[2] * 1000;
					
					index = CalculateIndexDriverArray (myArr.participants.mParticipantInfo[i].mRacePosition, loopcnt);
					loopcnt++;

					aDrivers.driverlist[index] =
						new PCARSdriver(
								0,								//RefId - NA
								myArr.participants.mParticipantInfo[i].mName,			//Name
								1,								//NA
								0,								//GridPosition - NA
								PosX,								//PositionX in meters
								PosY,								//PositionY in meters
								PosZ,								//PositionZ in meters
								"NA",								//State - NA
								this.aSectormappingCREST[ myArr.participants.mParticipantInfo[i].mCurrentSector ], //CurrentSector
								myArr.participants.mParticipantInfo[i].mRacePosition,		//RacePosition
								0,								//FastestLapTime - NA
								0,								//LastLapTime - NA
								0,								//S1Time - NA
								0,								//S2Time - NA
								0,								//S3Time - NA
								0,								//Orientation - NA
								0,								//Speed - NA
								myArr.participants.mParticipantInfo[i].mCurrentLap,		//CurrentLap
								2091910841,							//VehicleId
								0,								//LiveryId - NA
								undefined,						//numPits
								undefined,						//Gap2Ahead
								undefined,						//Gap2First
								undefined,						//VehicleName - NA
								undefined,						//VehicleClassName - NA
								i								//oIdx API Index
							);
				}
				
				// check complete driverlist for missing objects. Sometimes the API do not returns all drivers and then there is an array element missing which throws an error during access
				for (var i = 0;i<aDrivers.driverlist.length;i++){
					if(!aDrivers.driverlist[i]){
						DriverDummyAPIerror.UpdateObjectData({RacePosition: i+1});
						aDrivers.driverlist[i] = DriverDummyAPIerror;
						if(log >= 2){console.log ( "Receive API ERROR, replaced missing driver array object. Array element: ", i, "  driver array: " , aDrivers.driverlist);}
					}
				}
				   
				//if(log >= 3){console.log (  "Array of aDriver Objects: " + aDrivers);}
				return aDrivers;
				   
			case  "GETCREST2DRIVERDATA":
			
				TrackName = BuildTrackNameFromGameAPI(myArr.eventInformation.mTrackLocation,myArr.eventInformation.mTrackVariation);
				TrackID = GetTrackIDbyName(TrackName , this.aRefPointName2ID);
				if(log >= 2){console.log("---CREST2 Trackname: ", TrackName, " / TrackID: ", TrackID);}
			
				//overwrite default values with CRESt specific ones
				aDrivers.globals = {
					"joinable":				"CREST Mode"
					,"lobbyid":				"CREST Mode"
					,"max_member_count":	"CREST Mode"
					,"now":					"CREST Mode"
					,"state":				"CREST Mode"
					,"datasource":			"CRESTv2"
					,"curgamerunning":		"PCARS2"
					,"attributes":{
						"TrackId":			TrackID
						,"SessionStage":	this.aMappingSessionStateCREST[ myArr.gameStates.mSessionState ]
						,"SessionState":	myArr.gameStates.mGameState
						,"SessionTimeDuration":	myArr.timings.mEventTimeRemaining	//CREST has directly the resttime, SessionTimeDuration - SessionTimeElapsed = resttime
						,"SessionTimeElapsed":	0
						,"RaceLength":          myArr.eventInformation.mLapsInEvent
						,"TemperatureAmbient":	myArr.weather.mAmbientTemperature
						,"TemperatureTrack":	myArr.weather.mTrackTemperature
					}
				}

				// if no users joined return example Data
				if ( myArr.participants.mNumParticipants == 0 ){				
					if(log >= 3){console.log("no Participants found in DS, leave function and use Test data array!");}	
					aDrivers.push( DriverDummy );						
					return aDrivers;
				}	

				if(log >= 3){console.log("+-+-+-+-+-+-+-+-+-CREST Globals definition", aDrivers);}

				strConsoleLog = "Debugging Issue #131 - Index/Driver: \n"; // Debugging Issue #131

				for (var i = 0;i<myArr.participants.mNumParticipants;i++) {
					// read data of all participants and put it in an array of PCARSdriver objects
					PosX = myArr.participants.mParticipantInfo[i].mWorldPosition[0] * 1000;
					PosY = myArr.participants.mParticipantInfo[i].mWorldPosition[1] * 1000;
					PosZ = myArr.participants.mParticipantInfo[i].mWorldPosition[2] * 1000;

					//Convert times from seconds to milliseconds, because SharedMemory returns the laptimes in seconds with 4 places after decimal point
					//After conversation you still have 1 place after the decimal point (0.7 milliseconds for example) and the drivertable cuts it and then 0.7 milliseconds = 0, but should be 1.
					//The round functions fixes the problem. On the other hand rounding is a problem for the race gap calculation, because you sum up all lap times. With every added lap time to the sum, the chance of an error inreases (example: 0.49+0.49=0.98 but with rounded values 0+0=0)
					//Moved the Math.round calls to the function ConvertLaptimeInReadbaleFormat in the index.html - Issue #137
					FastestLapTime = Math.round(myArr.participants.mParticipantInfo[i].mFastestLapTimes * 1000);	// Issue #157
					LastLapTime = myArr.participants.mParticipantInfo[i].mLastLapTimes * 1000;
					S1Time = myArr.participants.mParticipantInfo[i].mCurrentSector1Times * 1000;
					S2Time = myArr.participants.mParticipantInfo[i].mCurrentSector2Times * 1000;
					S3Time = myArr.participants.mParticipantInfo[i].mCurrentSector3Times * 1000;
					//if(log >= 3){console.log("+++++++++ Math.round called 5 times for Last, Fastest and 3 sector times");}

					// The first participant in the array should be always the human player - check again
					if (i == 0){
						IsPlayer = 1;
						//if(log >= 3){console.log("Stage: ", this.aMappingSessionStateCREST[ myArr.gameStates.mSessionState ], " / RaceState: ",this.aMappingRaceStateCREST[ myArr.participants.mParticipantInfo[i].mRaceStates ], " / PitMode: " , this.aMappingPitModeCREST[ myArr.participants.mParticipantInfo[i].mPitModes ]);}
					}else{
						IsPlayer = 0;
					}

					//The pit counter in DS modes is triggered by the RaceState EnteringPits, which is in CREST2 mode not directly available. Shared Memory of pcars2 provides the additional value mPitModes.
					//If the Pit Mode is "EnteringPits" or "InPits" or "ExitingPits" and mRaceStates not "Finished" (to prevent pit counting if the driver enters the pit after the race is finished) writing the PitMode into the RaceState, which then match with the RaceState of the DS modes
					if (myArr.participants.mParticipantInfo[i].mPitModes > 0 && myArr.participants.mParticipantInfo[i].mPitModes < 4 && myArr.participants.mParticipantInfo[i].mRaceStates != 3){
						RaceState = this.aMappingPitModeCREST[ myArr.participants.mParticipantInfo[i].mPitModes ];
					}else{
						RaceState = this.aMappingRaceStateCREST[ myArr.participants.mParticipantInfo[i].mRaceStates ];
					}

					index = CalculateIndexDriverArray (myArr.participants.mParticipantInfo[i].mRacePosition, loopcnt);
					loopcnt++;

					aDrivers.driverlist[index] =
						new PCARSdriver(
							0,								//RefId - NA
							myArr.participants.mParticipantInfo[i].mName,			//Name
							IsPlayer,							//IsPlayer
							0,								//GridPosition - NA
							PosX,								//PositionX in meters
							PosY,								//PositionY in meters
							PosZ,								//PositionZ in meters
							RaceState, 							//RaceState
							this.aSectormappingCREST[ myArr.participants.mParticipantInfo[i].mCurrentSector ], //CurrentSector
							myArr.participants.mParticipantInfo[i].mRacePosition,		//RacePosition
							FastestLapTime,							//FastestLapTime
							LastLapTime,							//LastLapTime
							S1Time,								//S1Time
							S2Time,								//S2Time
							S3Time,								//S3Time
							myArr.participants.mParticipantInfo[i].mOrientations,		//Orientation - Array of 3 Euler Angles
							myArr.participants.mParticipantInfo[i].mSpeeds,			//Speed
							myArr.participants.mParticipantInfo[i].mCurrentLap,		//CurrentLap
							0,								//VehicleID - NA
							0,								//LiveryId - NA
							undefined,						//numPits must not be filled
							undefined,						//Gap2Ahead
							undefined,						//Gap2First
							myArr.participants.mParticipantInfo[i].mCarNames,		//VehicleName
							myArr.participants.mParticipantInfo[i].mCarClassNames,	//VehicleClassName
							i														//oIdx API Index
						);
					strConsoleLog = strConsoleLog + i + "/" + myArr.participants.mParticipantInfo[i].mName + "\n"; // Debugging Issue #131
				}

				//if(log >= 3){console.log (strConsoleLog);} // Debugging Issue #131
	
				// check complete driverlist for missing objects. Sometimes the API do not returns all drivers and then there is an array element missing which throws an error during access
				for (var i = 0;i<aDrivers.driverlist.length;i++){
					if(!aDrivers.driverlist[i]){
						DriverDummyAPIerror.UpdateObjectData({RacePosition: i+1});
						aDrivers.driverlist[i] = DriverDummyAPIerror;
						if(log >= 2){console.log ( "Receive API ERROR, replaced missing driver array object. Array element: ", i, "  driver array: " , aDrivers.driverlist);}
					}
				}
				   
				//if(log >= 3){console.log (  "Array of aDriver Objects: " + aDrivers);}
				return aDrivers;

			case "GETCREST2AMS2DRIVERDATA":

				TrackName = BuildTrackNameFromGameAPI(myArr.eventInformation.mTrackLocation,myArr.eventInformation.mTrackVariation);
				TrackID = GetTrackIDbyName(TrackName , this.aRefPointName2ID);
				if(log >= 2){console.log("---CREST2-AMS2 Trackname: ", TrackName, " / TrackID: ", TrackID, " / this.aRefPointName2ID: ", this.aRefPointName2ID);}

				//overwrite default values with CRESt specific ones
				aDrivers.globals = {
					"joinable":				"CREST Mode"
					,"lobbyid":				"CREST Mode"
					,"max_member_count":	"CREST Mode"
					,"now":					"CREST Mode"
					,"state":				"CREST Mode"
					,"datasource":			"CRESTv2"
					,"curgamerunning":		"AMS2"
					,"attributes":{
						"TrackId":			TrackID
						,"SessionStage":	this.aMappingSessionStateCREST[ myArr.gameStates.mSessionState ]
						,"SessionState":	myArr.gameStates.mGameState
						,"SessionTimeDuration":	myArr.timings.mEventTimeRemaining	//CREST has directly the resttime, SessionTimeDuration - SessionTimeElapsed = resttime
						,"SessionTimeElapsed":	0
						,"RaceLength":          myArr.eventInformation.mLapsInEvent
						,"TemperatureAmbient":	myArr.weather.mAmbientTemperature
						,"TemperatureTrack":	myArr.weather.mTrackTemperature
					}
				}

				// if no users joined return example Data
				if ( myArr.participants.mNumParticipants == 0 ){
					if(log >= 3){console.log("no Participants found in DS, leave function and use Test data array!");}
					aDrivers.push( DriverDummy );
					return aDrivers;
				}

				if(log >= 3){console.log("+-+-+-+-+-+-+-+-+-CREST Globals definition", aDrivers);}

				strConsoleLog = "Debugging Issue #131 - Index/Driver: \n"; // Debugging Issue #131

				for (var i = 0;i<myArr.participants.mNumParticipants;i++) {
					// read data of all participants and put it in an array of PCARSdriver objects
					PosX = myArr.participants.mParticipantInfo[i].mWorldPosition[0] * 1000;
					PosY = myArr.participants.mParticipantInfo[i].mWorldPosition[1] * 1000;
					PosZ = myArr.participants.mParticipantInfo[i].mWorldPosition[2] * 1000;

					//Convert times from seconds to milliseconds, because SharedMemory returns the laptimes in seconds with 4 places after decimal point
					//After conversation you still have 1 place after the decimal point (0.7 milliseconds for example) and the drivertable cuts it and then 0.7 milliseconds = 0, but should be 1.
					//The round functions fixes the problem. On the other hand rounding is a problem for the race gap calculation, because you sum up all lap times. With every added lap time to the sum, the chance of an error inreases (example: 0.49+0.49=0.98 but with rounded values 0+0=0)
					//Moved the Math.round calls to the function ConvertLaptimeInReadbaleFormat in the index.html - Issue #137
					FastestLapTime = Math.round(myArr.participants.mParticipantInfo[i].mFastestLapTimes * 1000);	// Issue #157
					LastLapTime = myArr.participants.mParticipantInfo[i].mLastLapTimes * 1000;
					S1Time = myArr.participants.mParticipantInfo[i].mCurrentSector1Times * 1000;
					S2Time = myArr.participants.mParticipantInfo[i].mCurrentSector2Times * 1000;
					S3Time = myArr.participants.mParticipantInfo[i].mCurrentSector3Times * 1000;
					//if(log >= 3){console.log("+++++++++ Math.round called 5 times for Last, Fastest and 3 sector times");}

					// The first participant in the array should be always the human player - check again
					if (i == 0){
						IsPlayer = 1;
						//if(log >= 3){console.log("Stage: ", this.aMappingSessionStateCREST[ myArr.gameStates.mSessionState ], " / RaceState: ",this.aMappingRaceStateCREST[ myArr.participants.mParticipantInfo[i].mRaceStates ], " / PitMode: " , this.aMappingPitModeCREST[ myArr.participants.mParticipantInfo[i].mPitModes ]);}
					}else{
						IsPlayer = 0;
					}

					//The pit counter in DS modes is triggered by the RaceState EnteringPits, which is in CREST2 mode not directly available. Shared Memory of pcars2 provides the additional value mPitModes.
					//If the Pit Mode is "EnteringPits" or "InPits" or "ExitingPits" and mRaceStates not "Finished" (to prevent pit counting if the driver enters the pit after the race is finished) writing the PitMode into the RaceState, which then match with the RaceState of the DS modes
					if (myArr.participants.mParticipantInfo[i].mPitModes > 0 && myArr.participants.mParticipantInfo[i].mPitModes < 4 && myArr.participants.mParticipantInfo[i].mRaceStates != 3){
						RaceState = this.aMappingPitModeCREST[ myArr.participants.mParticipantInfo[i].mPitModes ];
					}else{
						RaceState = this.aMappingRaceStateCREST[ myArr.participants.mParticipantInfo[i].mRaceStates ];
					}

					index = CalculateIndexDriverArray (myArr.participants.mParticipantInfo[i].mRacePosition, loopcnt);
					loopcnt++;

					aDrivers.driverlist[index] =
						new PCARSdriver(
							0,								//RefId - NA
							myArr.participants.mParticipantInfo[i].mName,			//Name
							IsPlayer,							//IsPlayer
							0,								//GridPosition - NA
							PosX,								//PositionX in meters
							PosY,								//PositionY in meters
							PosZ,								//PositionZ in meters
							RaceState, 							//RaceState
							this.aSectormappingCREST[ myArr.participants.mParticipantInfo[i].mCurrentSector ], //CurrentSector
							myArr.participants.mParticipantInfo[i].mRacePosition,		//RacePosition
							FastestLapTime,							//FastestLapTime
							LastLapTime,							//LastLapTime
							S1Time,								//S1Time
							S2Time,								//S2Time
							S3Time,								//S3Time
							myArr.participants.mParticipantInfo[i].mOrientations,		//Orientation - Array of 3 Euler Angles
							myArr.participants.mParticipantInfo[i].mSpeeds,			//Speed
							myArr.participants.mParticipantInfo[i].mCurrentLap,		//CurrentLap
							//myArr.participants.mParticipantInfo[i].mCarNames,		//VehicleID is not available, use the VehicleName instead
							0,								//VehicleID - NA
							0,								//LiveryId - NA
							undefined,							//numPits must not be filled
							undefined,						//Gap2Ahead
							undefined,						//Gap2First
							myArr.participants.mParticipantInfo[i].mCarNames,			//VehicleName
							myArr.participants.mParticipantInfo[i].mCarClassNames,		//VehicleClassName 
							i															//oIdx API index
						);
					strConsoleLog = strConsoleLog + i + "/" + myArr.participants.mParticipantInfo[i].mName + "\n"; // Debugging Issue #131
				}

				//if(log >= 3){console.log (strConsoleLog);} // Debugging Issue #131

				// check complete driverlist for missing objects. Sometimes the API do not returns all drivers and then there is an array element missing which throws an error during access
				for (var i = 0;i<aDrivers.driverlist.length;i++){
					if(!aDrivers.driverlist[i]){
						DriverDummyAPIerror.UpdateObjectData({RacePosition: i+1});
						aDrivers.driverlist[i] = DriverDummyAPIerror;
						if(log >= 2){console.log ( "Receive API ERROR, replaced missing driver array object. Array element: ", i, "  driver array: " , aDrivers.driverlist);}
					}
				}

				//if(log >= 3){console.log (  "Array of aDriver Objects: " + aDrivers);}
				return aDrivers;
	
		  } // End SWITCH
	
	    }else{
			// added because of issue #141
			return returnDataSendError(this.receivemode);	
		}
		
		// return empty array: no DS, no Memebers, ...
	
		aDrivers.push ( DriverDummy );
		return aDrivers;
        }  // end else
}


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
function BuildTrackNameFromGameAPI(TrackLocation,TrackVariation){
        //combines the TrackName and TrackVariation from the Game API to one Name
        var TrackName;
        if (TrackVariation == ""){
                TrackName = TrackLocation; 
        }else{
                TrackName = TrackLocation + " " + TrackVariation;
        }
        
        return TrackName;
}



function GetTrackIDbyName(TrackName , aRefPointMapping){
	
	if (aRefPointMapping[TrackName]){		
		return aRefPointMapping[TrackName];	
	}else{
		
		return "Trackname2ID Mapping missing for: " + TrackName;
	}
			
}
/* old version, obsolete by new mapping TrackNames to TrackID
function GetTrackIDbyName(TrackName , TMP_RefPoint){
       //returns the TrackID for the Game API Name
        var TMP_TrackID = 9999999999;   //Default TrackID
        //var TMP_RefPoint = new Refpoint();
        var TMP_Name;
        
        for (var key in TMP_RefPoint){
                if(TMP_RefPoint[key]["Name2"] == ""){
                        TMP_Name = TMP_RefPoint[key]["Name"];
                }else{
                        TMP_Name = TMP_RefPoint[key]["Name2"];
                }
                if (TMP_Name == TrackName){
                        TMP_TrackID = key;
                }
        }
        return TMP_TrackID;
}*/

function CalculateIndexDriverArray (RacePostion, LoopCnt){	
	//decide if Racepsotion or Gridpostion is used as index for drivers array
	if (RacePostion != 0){
		 index = RacePostion -1; // -1 because RacePost starts with 1
	}else{                		 
		 index = LoopCnt; // because already starts with 0
	}
		
	return index;	
}


