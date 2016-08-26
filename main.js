
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
								
//////////// scope of varibale to clarify ( differences between config.js and main.js scope -> put all to config.js?) 	
	if(log >= 3){console.log ("++++++++++++++++++++++++++++++ SHOWSETTINGS: " , SHOWSETTINGS );}
	if(log >= 3){console.log ("++++++++++++++++++++++++++++++ window.DisplayDurationCorrector: " , window.DisplayDurationCorrector );}
	if(log >= 3){console.log ("++++++++++++++++++++++++++++++ SHOWSETTINGS: " , DisplayDurationCorrector );}
	
	
	// set Default Values
	SetDefaultHTMLValues(HTMLCTRL);
	
	// get requested url parameters
	GetReqParameters();
	
	
	// create Event Handler
	initEventHandler();
	
	
	// JQ Grid 
	createJqGrid();
	if(log >= 3){console.log("-+-+- after calling createJqGrid().");}
	
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// create worker to get vehicle list
	var workerVEHICLELIST      =       new Worker('./worker_vehiclelist.js');
	
	workerVEHICLELIST.addEventListener('message', function(e) {
		
		if(log >= 3){console.log('+++++++++++ GETVEHICLELIST Worker returned: e ', e );}
		if ( e.data.avehiclelist.length > 0 ){
			
			aVehicleList	=	e.data.avehiclelist;	//copy the array of vehicle objects to global var
			
			aVehicleIdToName = transformVehicleObjectToHash(aVehicleList);
		
			//display vehicle data in table 
			PCARSVehicleList.setVehicleData(aVehicleList);
			refreshVehicleList(PCARSVehicleList);
			
			// no additional worker call needed, because needed data available			
			if(log >= 3){console.log('+++++++++++ GETVEHICLELIST Worker stopped and copy data to aVehicleList', aVehicleList );}
						
			
		}else{
			
			// no return value from DS, start another run
			if(log >= 3){console.log('+++++++++++ GETVEHICLELIST start new Worker run.' );}
			workerVEHICLELIST.postMessage({workerdelay: 100, dsurl: DsServerURL, dsport: DsPort, timeout: XMLHTTPTimeout, receivemode: "GETVEHICLELIST", arefpoint: aRefPointTMP});
		}
		
	}, false);
	workerVEHICLELIST.postMessage({workerdelay: 100, dsurl: DsServerURL, dsport: DsPort, timeout: XMLHTTPTimeout, receivemode: "GETVEHICLELIST", arefpoint: aRefPointTMP});
	
	/*	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// create DS data object
	var workerDSDATA      =       new Worker('./worker_dsdata.js');
	sensorLayer_UpdateTime_old = Date.now();	//initialize a value for first time
	//event handler of the worker
	workerDSDATA.addEventListener('message', function(e) {
		
		if(log >= 3){console.log('+++++++++++ GETDSANDDRIVERDATA Worker returned: ', e);}
                
        SessionState = e.data.globals.attributes.SessionState;
		SessionStage = e.data.globals.attributes.SessionStage;
                
		// write in HTML page for DS status
		document.getElementsByTagName('p0')[0].innerHTML = 'DS URL:   		' + DsServerURL + " : " +  DsPort; 
		document.getElementsByTagName('p1')[0].innerHTML = 'DS Status:   	' + e.data.globals.state;
		document.getElementsByTagName('p2')[0].innerHTML = 'DS Joinable: 	' + e.data.globals.joinable;
		document.getElementsByTagName('p3')[0].innerHTML = 'DS Lobby ID: 	' + e.data.globals.lobbyid;
		document.getElementsByTagName('p4')[0].innerHTML = 'DS now:      	' + e.data.globals.now; 
		document.getElementsByTagName('p5')[0].innerHTML = 'used API type:	' + APIMODE;
		document.getElementsByTagName('p6')[0].innerHTML = 'Display Duration:      ' + DisplayDuration;
		document.getElementsByTagName('p7')[0].innerHTML = 'TrackName:     	' + e.data.arefpoint[e.data.globals.attributes.TrackId]["Name"];		
		document.getElementsByTagName('p8')[0].innerHTML = 'SessionStage:   ' + SessionStage;
		document.getElementsByTagName('p9')[0].innerHTML = 'SessionState:   ' + SessionState;
		
		if(StopRefreshDriverlist == "false"){
			var resttime = ConvertLaptimeInReadbaleFormat((e.data.globals.attributes.SessionTimeDuration-e.data.globals.attributes.SessionTimeElapsed)*1000);       //Times in seconds, but function need it in milliseconds, multiplied by 1000
			if(resttime != "-"){
				resttime = '  Time: ' + resttime;
			}
			if (SessionState == "Race"){
				document.getElementById("txtSessionStage").value = ' Session: ' + e.data.globals.attributes.SessionStage + resttime.slice(0,-4);     //slice for deleting the milliseconds part of the time
			}else{
				document.getElementById("txtSessionStage").value = '';
			}
		}
		
		//todo:  replace document.get... by Jquery functionality
		//$('#DSdataInformation').append( 
		//				$("<p0>").text("DS URL2: " + DsServerURL + " : " +  DsPort)
		//);
		
		//Reset CSVs on a new Race Weekend
		if (SessionState_old != "Loading" && SessionState == "Loading"){
			for (var key in CSVExport) {
				CSVExport[key] = "";
			}
		}

		// Build CSVs - must be done before refreshDriverList updates the table, because we need the data of the last worker run of a SessionStage and the if statements match on the first worker run of the following SessionStage
		//TODO: search for better implementation
		//after Practice1
		if (SessionState_old != "Lobby" && SessionState_old != "Loading" && SessionStage_old == "Practice1" && SessionStage != "Practice1"){     //During SessionState Lobby the SessionStage is Practice1
			jQuery("#DriverDataTable").jqGrid('sortGrid',"driverposition",false,"asc");	//sort grid for the case that the user changed the sorting
			CSVExport.Practice1 = JSONToCSVConvertor(jQuery("#DriverDataTable").jqGrid("getRowData"), "Practice 1 Results",true,jQuery("#DriverDataTable").jqGrid("getGridParam", "colNames"),["refid","id","driverstate","driversector","lastlap","posx","posy","posz",]);
		}
		//after Practice2
		if (SessionStage_old == "Practice2" && SessionStage != "Practice2"){
			jQuery("#DriverDataTable").jqGrid('sortGrid',"driverposition",false,"asc");
			CSVExport.Practice2 = JSONToCSVConvertor(jQuery("#DriverDataTable").jqGrid("getRowData"), "Practice 2 Results",true,jQuery("#DriverDataTable").jqGrid("getGridParam", "colNames"),["refid","id","driverstate","driversector","lastlap","posx","posy","posz",]);
		}
		//after Qualifying
		if (SessionStage_old == "Qualifying" && SessionStage != "Qualifying"){
			jQuery("#DriverDataTable").jqGrid('sortGrid',"driverposition",false,"asc");
			CSVExport.Qualifying = JSONToCSVConvertor(jQuery("#DriverDataTable").jqGrid("getRowData"), "Qualifying Results",true,jQuery("#DriverDataTable").jqGrid("getGridParam", "colNames"),["refid","id","driverstate","driversector","lastlap","posx","posy","posz",]);
		}
		//after Warmup
		if (SessionStage_old == "Warmup" && SessionStage != "Warmup"){
			jQuery("#DriverDataTable").jqGrid('sortGrid',"driverposition",false,"asc");
			CSVExport.Warmup = JSONToCSVConvertor(jQuery("#DriverDataTable").jqGrid("getRowData"), "Warmup Results",true,jQuery("#DriverDataTable").jqGrid("getGridParam", "colNames"),["refid","id","driverstate","driversector","lastlap","posx","posy","posz",]);
		}
		//after Race1 if there is a Race2
		if (SessionStage_old == "Race1" && SessionStage != "Race1" && SessionState == "Race"){
			jQuery("#DriverDataTable").jqGrid('sortGrid',"driverposition",false,"asc");
			CSVExport.Race1 = JSONToCSVConvertor(jQuery("#DriverDataTable").jqGrid("getRowData"), "Race 1 Results",true,jQuery("#DriverDataTable").jqGrid("getGridParam", "colNames"),["refid","id","driverstate","driversector","lastlap","gap2ahead","gap2first","posx","posy","posz",]);
		}
		//after Race Weekend finished
		if (SessionState_old == "Race" && SessionState == "PostRace"){
			jQuery("#DriverDataTable").jqGrid('sortGrid',"driverposition",false,"asc");
			if (SessionStage_old == "Race1"){       //matches if Race1 is the only race
				CSVExport.Race1 = JSONToCSVConvertor(jQuery("#DriverDataTable").jqGrid("getRowData"), "Race Results",true,jQuery("#DriverDataTable").jqGrid("getGridParam", "colNames"),["refid","id","driverstate","driversector","lastlap","gap2ahead","gap2first","posx","posy","posz",]);
			}
			if (SessionStage_old == "Race2"){
				CSVExport.Race2 = JSONToCSVConvertor(jQuery("#DriverDataTable").jqGrid("getRowData"), "Race 2 Results",true,jQuery("#DriverDataTable").jqGrid("getGridParam", "colNames"),["refid","id","driverstate","driversector","lastlap","gap2ahead","gap2first","posx","posy","posz",]);
			}
			//Auto Export
			if (autoExport == "true"){
				var CSVall = "";
				for (var key in CSVExport) {
					if(CSVExport[key] != ""){
						CSVall += CSVExport[key] + '\r\n\n';
					}
				}
				ExportCSV(CSVall,"Results");
			}
		}

		if(log >= 3){console.log("SessionState: ", SessionState, " , CSV Oject", CSVExport)};
		
		/////////////////////////////////////////// update driver data /////////////////////
		// refresh table of Driver data
        refreshDriverList(e.data.driverlist);
		
		//todo var declaration needed within loop ???
		var tmpcuircitID;
		tmpcuircitID = e.data.globals.attributes.TrackId;
		if(log >= 3){console.log("tmpcuircitID worker: ", tmpcuircitID);}

		if (SessionState_old != "Loading" && SessionState == "Loading"){CSSClsChg.HideAllSvg();}  //Hide markers on Loading / before calculation, unhide is after calculation.
                //if (SessionState_old == "Lobby" && SessionState == "Loading"){CSSClsChg.HideAllSvg();}    //Hide markers before calculation, unhide is after calculation.
                //if (SessionState_old == "" && SessionState == "Loading"){CSSClsChg.HideAllSvg();}         //Hide if you open the website during "Loading"
		//if (SessionState_old == "NA" && SessionState == "Loading"){CSSClsChg.HideAllSvg();}       //Hide if you switch receivemodes, because the default SessionState = "NA"
		
		if ((SessionStage_old != SessionStage && SessionStage_old != "") || (SessionState_old != SessionState && SessionState_old != "")){	//SessionStage_old != "" for startup, because the init value is "" - SessionState check, because SessionStage stays from SessionState "Loading" to "Race" for example, but the markers are reset at SessionState change for this case
			StopTransitionDelay = "true";
			StopTransitionDelay_StartTime = Date.now();
			sensorLayer.interruptTransition();
		}
		
		//update map
		for (var i = 0; i < e.data.driverlist.length; i++ ){

				//calculate GPS coordinates
				gpsCoTmp =  calc_coordinates (cuircitID , e.data.driverlist[i].PosX , e.data.driverlist[i].PosZ , e.data.arefpoint);

				if(log >= 3){console.log('+++++++++++ DriverData Array  ', e.data.driverlist);}
				
				//cast object type because losing while webworker transfer
				e.data.driverlist[i].__proto__ = PCARSdriver.prototype;
				
				//fill data array
				aSensorData[i] = {
						"Key": 				e.data.driverlist[i].Name
						,"MarkerLabel" :	e.data.driverlist[i].RacePosition + "-" + e.data.driverlist[i].Name
						,"DateTime":		"2013-09-04T09:41:09+10:00"
						,"Lat": 			gpsCoTmp["Lat"]
						,"Long": 			gpsCoTmp["Long"]
						,"Heading":			286.0
						,"Speed":			e.data.driverlist[i].Speed
						,"CSSTextClasses":	e.data.driverlist[i].GetCSSTextClass()
						,"CSSCircleClasses":	e.data.driverlist[i].GetCSSCircleClass(PCARSVehicleList.idToClassMappingNormalized)
				}
				
				//gatthering all vehicle classes of the current race
				aCurrentVehicleClasses[i] = e.data.driverlist[i].Name;
				
        		//tmpcuircitID = e.data.driverlist[i].variousParameters.TrackId;	//TrackId is available in globals, not necessary reading it from variousParameters
        		//if(log >= 2){console.log('+++++++++++ GETDSANDDRIVERDATA Worker returned: PosX:' + e.data.driverlist[i].PosX + ", Speed:" + e.data.driverlist[i].Speed);}	//analyzing problem with asynchronous marker updates
		}
		
		
		//todo: dynamically fill up selection box with vehicle classes
		if(log >= 3){console.log('+++++++++ aCurrentVehicleClasses:', aCurrentVehicleClasses)};
		var lcvc 	= aCurrentVehicleClasses.length;
		var tmpcvc	= "";		
		for(var i = 0; i < lcvc; i++){
			
			tmpcvc	=	aCurrentVehicleClasses[i];
			HTMLCTRL.DRIVERCOLOR_AddSelElement(tmpcvc , tmpcvc);
		}
	
		
			
        sensorLayer_UpdateTime = Date.now();
		sensorLayer_UpdateDelta = sensorLayer_UpdateTime - sensorLayer_UpdateTime_old;	//Determine time duration between recent and currrent worker run
		sensorLayer_UpdateTime_old = sensorLayer_UpdateTime;
		if(log >= 2){console.log("+++++++++Sensor Update Delta:",sensorLayer_UpdateDelta);}
                
		//Calculation of dynamic DisplayDuration
		if ((APIMODE == "DS" || APIMODE == "DEMO") && sensorLayer_UpdateDelta < UpdateRateDS) {
				DisplayDuration = UpdateRateDS + DisplayDurationCorrector       //If the worker runs more often than the data is updated in the DS API, then the duration is set to the DS update rate
		}else{
				DisplayDuration = sensorLayer_UpdateDelta  + DisplayDurationCorrector;
		}
		if (DisplayDuration < 0) { DisplayDuration = 0 }        //catch a negative value
		if (DisplayDuration > 2000) { DisplayDuration = 2000 }	// set a max DisplayDuration
		if(log >= 2){console.log("+++++++++DisplayDuration:    ",DisplayDuration);}
                
		if(log >= 3){console.log("++++++++ aSensorData_NEW" , aSensorData);}
		sensorLayer.update(aSensorData);

		// in case track changes on DS adjust the map settings for new possition
        if ( cuircitID != tmpcuircitID ){
		//if(log >= 3){console.log("----------- TrackID SHOULDbe changed: ", aRefPointTMP);}
		if (typeof tmpcuircitID == 'undefined'){tmpcuircitID = 9999999999;}	//tmpcuircitID is undefined if you switch to an APIMODE where the data source is not available, for example the pcars DS is not running
		//map.setCenter({lat: 50.332733, lng: 6.943355});
		changeMapSettings(e.data.arefpoint[tmpcuircitID] , map);

            cuircitID = tmpcuircitID;  // give the global var the new TrackId
            if(log >= 3){console.log("----------- TrackID changed. Call map.SetCenter(),  cuircitID / tmpcuircitID " + cuircitID + " / " + tmpcuircitID);}
		}
		
		if (SessionState_old != "Race" && SessionState == "Race"){   //Unhide markers after calculation, with a delay of 1000 ms
                        UnHide = "true";
                }
                if (UnHide == "true"){
                        UnHide_Timer = UnHide_Timer + sensorLayer_UpdateDelta;
                        if (UnHide_Timer > 1000){
                        	StopTransitionDelay = "true";
                                sensorLayer.interruptTransition();
                                sensorLayer.update(aSensorData);
                                CSSClsChg.UnHideAllSvg();
                                UnHide_Timer = 0;
                                UnHide = "false";
                                if(log >= 2){console.log("+++++++++UnHide StopTransitionDelay:    ",StopTransitionDelay);}
                        }
                }
                SessionState_old = SessionState;
                SessionStage_old = SessionStage;

		if (recording_demo_data == "true"){
                        console.log("           {//" + recording_count);
                        console.log("                globals:{sensorLayer_UpdateDelta:"+sensorLayer_UpdateDelta+", state:\""+e.data.globals.state+"\", name:\""+e.data.globals.name+"\", lobbyid:"+e.data.globals.lobbyid+", joinable:\""+e.data.globals.joinable+"\", max_member_count:"+e.data.globals.max_member_count+", now:"+e.data.globals.now+", attributes:{TrackId:"+e.data.globals.attributes.TrackId+", SessionState:\""+e.data.globals.attributes.SessionState+"\", SessionStage:\""+e.data.globals.attributes.SessionStage+"\", GridSize:"+e.data.globals.attributes.GridSize+", MaxPlayers:"+e.data.globals.attributes.MaxPlayers+", SessionTimeDuration:"+e.data.globals.attributes.SessionTimeDuration+", SessionTimeElapsed:"+e.data.globals.attributes.SessionTimeElapsed+"}},");
                        console.log("                participants:[");
                        for (var i = 0; i < e.data.driverlist.length; i++ ){
                                if ((i+1) == e.data.driverlist.length){
                                        console.log("                        {RefId:"+e.data.driverlist[i].RefID+", Name:\""+e.data.driverlist[i].Name+"\", IsPlayer:"+e.data.driverlist[i].IsPlayer+", GridPosition:"+e.data.driverlist[i].GridPosition+", VehicleId:\""+VehicleIdToName(e.data.driverlist[i].VehicleId , aVehicleIdToName)+"\", RacePosition:"+e.data.driverlist[i].RacePosition+", CurrentLap:"+e.data.driverlist[i].CurrentLap+", CurrentSector:"+e.data.driverlist[i].CurrentSector+", LastLapTime:"+e.data.driverlist[i].LastLapTime+", FastestLapTime:"+e.data.driverlist[i].FastestLapTime+", State:\""+e.data.driverlist[i].State+"\", Speed:"+e.data.driverlist[i].Speed+", PositionX:"+e.data.driverlist[i].PosX+", PositionY:"+e.data.driverlist[i].PosY+", PositionZ:"+e.data.driverlist[i].PosZ+", Orientation:"+e.data.driverlist[i].Orientation+"}");
                                }else{
                                        console.log("                        {RefId:"+e.data.driverlist[i].RefID+", Name:\""+e.data.driverlist[i].Name+"\", IsPlayer:"+e.data.driverlist[i].IsPlayer+", GridPosition:"+e.data.driverlist[i].GridPosition+", VehicleId:\""+VehicleIdToName(e.data.driverlist[i].VehicleId , aVehicleIdToName)+"\", RacePosition:"+e.data.driverlist[i].RacePosition+", CurrentLap:"+e.data.driverlist[i].CurrentLap+", CurrentSector:"+e.data.driverlist[i].CurrentSector+", LastLapTime:"+e.data.driverlist[i].LastLapTime+", FastestLapTime:"+e.data.driverlist[i].FastestLapTime+", State:\""+e.data.driverlist[i].State+"\", Speed:"+e.data.driverlist[i].Speed+", PositionX:"+e.data.driverlist[i].PosX+", PositionY:"+e.data.driverlist[i].PosY+", PositionZ:"+e.data.driverlist[i].PosZ+", Orientation:"+e.data.driverlist[i].Orientation+"},");
                                }
                        }
                        console.log("                ]");
                        console.log("        },");
                        recording_count = recording_count + 1;
                }
		
		//call worker again for next itteration -> currently endless loop
		switch(APIMODE) {
                        case "DS":
                                //DS receive mode
                                workerDSDATA.postMessage({
                                        workerdelay:            WORKERDELAY_DSDATA
                                        ,dsurl:                 DsServerURL
                                        ,dsport:                DsPort
                                        ,timeout:               XMLHTTPTimeout
                                        ,receivemode:   "GETDSANDDRIVERDATA"
                                        ,arefpoint:             e.data.arefpoint});
                                break;
                        case "CREST":                   //CREST receive mode
                                workerDSDATA.postMessage({
                                        workerdelay:            WORKERDELAY_DSDATA
                                        ,dsurl:                 CRESTServerURL
                                        ,dsport:                CRESTPort
                                        ,timeout:               XMLHTTPTimeout
                                        ,receivemode:   "GETCRESTDRIVERDATA"
                                        ,arefpoint:             e.data.arefpoint});
                                break;
                        case "DEMO":
                                //DEMO receive mode

	                        //Calculation of WORKERDELAY_DEMODATA to adapt the playback speed to the recording speed
	                        //The record_pos is the array element of the recorded data and correlates to one worker run. Each element includes the sensorLayer_UpdateDelta. This is the time between the last and the current worker run. Now we calculate the WORKERDELAY_DEMODATA, which is the delay to the next worker run. Because of that we need the sensorLayer_UpdateDelta of the next array element and not of the current.
	                        record_pos_helper = record_pos + 1;
	                        if(record_pos_helper > demo.length-1){record_pos_helper = 0;}	//if last array element with record_pos is reached, record_pos_helper exceeds the upper array boundary. In this case the helper jumps to the first array element
	                        
	                        sensorLayer_UpdateDelta_DEMOdiff = demo[record_pos_helper].globals.sensorLayer_UpdateDelta - sensorLayer_UpdateDelta;	//diff time between recorded data and playback sensorLayer_UpdateDelta
	                        WORKERDELAY_DEMODATA = WORKERDELAY_DEMODATA + sensorLayer_UpdateDelta_DEMOdiff;		//adapt playback speed to recorded data with the worker delay
	                        if(WORKERDELAY_DEMODATA < 0){WORKERDELAY_DEMODATA = 0;} //catch negative values. If the playback machine is to slow and is not able to hold the playback speed of the recording machine, then the delay is calculated negative, but the delay must be positive
	                        if(log >= 2){console.log("Record Pos: ", record_pos, ", Demo Delta: ",demo[record_pos].globals.sensorLayer_UpdateDelta,", cur Delta: ",sensorLayer_UpdateDelta, "diff: ", sensorLayer_UpdateDelta_DEMOdiff, "Delay: ", WORKERDELAY_DEMODATA);}
	
	                        workerDSDATA.postMessage({
	                                workerdelay:            WORKERDELAY_DEMODATA
	                                ,dsurl:                 ""
	                                ,dsport:                0
	                                ,timeout:               demo[record_pos]	//timeout parameter used for transerring demo_data array element to the worker
	                                ,receivemode:   "GETDEMODATA"
	                                ,arefpoint:             e.data.arefpoint});
	                        record_pos = record_pos + 1;
	                        if(record_pos > demo.length-1 || record_pos > demo_end_pos-1){          //jump to beginning if end of array or demo_end_pos is reached/ -1, because the array begins with 0
	                                record_pos = demo_start_pos;
	                                StopTransitionDelay = "true";
	                                StopTransitionDelay_StartTime = Date.now();
	                        }
	                        break;
                        default:
                                //DS receive mode
                                workerDSDATA.postMessage({
                                        workerdelay:            WORKERDELAY_DSDATA
                                        ,dsurl:                 DsServerURL
                                        ,dsport:                DsPort
                                        ,timeout:               XMLHTTPTimeout
                                        ,receivemode:   "GETDSANDDRIVERDATA"
                                        ,arefpoint:             e.data.arefpoint});
                }
	}, false);
	
	
	
	
	if(log >= 3){console.log("-+-+- APIMODE: ", APIMODE);}
	//if(log >= 3){console.log("-+-+- workerDSDATA: ", workerDSDATA);}
	//if(log >= 3){console.log("-+-+- cuircitID: ", cuircitID);}
	//if(log >= 3){console.log("-+-+- aRefPointTMP: ", aRefPointTMP);}
	//if(log >= 3){console.log("-+-+- Receive_DS_data(): ", Receive_DS_data);}	
	//if(log >= 3){console.log("-+-+- aSensorData: ", aSensorData);}
	
	workerDSDATA.postMessage({workerdelay: 100, dsurl: DsServerURL, dsport: DsPort, timeout: XMLHTTPTimeout, receivemode: "GETDSANDDRIVERDATA", arefpoint: aRefPointTMP});

	

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// receive data from pcars dedicated server (DS) and returns an array of PCARSdriver objects
	//         Receive_DS_data(url,port,timeout,RetrivelMode)
	// initial call of the worker
	// initial call for map initialization

	switch(APIMODE) {
		case "DS":
			workerDSDATA.postMessage({workerdelay: 100, dsurl: DsServerURL, dsport: DsPort, timeout: XMLHTTPTimeout, receivemode: "GETDSANDDRIVERDATA", arefpoint: aRefPointTMP});
			aDrivers = Receive_DS_data(DsServerURL, DsPort, 2000, "GETDSANDDRIVERDATA", aRefPointTMP);
			break;
		case "CREST":
			workerDSDATA.postMessage({workerdelay: 100, dsurl: CRESTServerURL, dsport: CRESTPort, timeout: XMLHTTPTimeout, receivemode: "GETCRESTDRIVERDATA", arefpoint: aRefPointTMP});
			aDrivers = Receive_DS_data(CRESTServerURL, CRESTPort, 2000, "GETCRESTDRIVERDATA", aRefPointTMP);
			break;
		case "DEMO":
			//timeout parameter used for transerring demo_data array element to the worker
			workerDSDATA.postMessage({workerdelay: 100, dsurl: "", dsport: 0, timeout: demo[record_pos], receivemode: "GETDEMODATA", arefpoint: aRefPointTMP});
			aDrivers = Receive_DS_data("", 0, demo[record_pos], "GETDEMODATA", aRefPointTMP);
			cuircitID = aDrivers.globals.attributes.TrackId;
			break;
		default:
			workerDSDATA.postMessage({workerdelay: 100, dsurl: DsServerURL, dsport: DsPort, timeout: XMLHTTPTimeout, receivemode: "GETDSANDDRIVERDATA", arefpoint: aRefPointTMP});
			aDrivers = Receive_DS_data(DsServerURL, DsPort, 2000, "GETDSANDDRIVERDATA", aRefPointTMP);
	}
	
        
	for (var i = 0; i < aDrivers.driverlist.length; i++ ){

                // calculate GPS coordinates
                gpsCoTmp =  calc_coordinates (cuircitID , aDrivers.driverlist[i].GetPosX() , aDrivers.driverlist[i].GetPosZ() , aRefPointTMP );

                // fill data array
                aSensorData[i] = {
                                "Key":                          aDrivers.driverlist[i].GetName()
                                ,"MarkerLabel" :        buildDriverName ( aDrivers.driverlist[i].GetRacePosition(), aDrivers.driverlist[i].GetName() )
                                ,"DateTime":            "2013-09-04T09:41:09+10:00"
                                ,"Lat":                         gpsCoTmp["Lat"]
                                ,"Long":                        gpsCoTmp["Long"]
                                ,"Heading":                     286.0
                                ,"Speed":                       aDrivers.driverlist[i].Speed
                                ,"CSSTextClasses":      aDrivers.driverlist[i].GetCSSTextClass()
                                ,"CSSCircleClasses":    aDrivers.driverlist[i].GetCSSCircleClass()
                }
                // bookmark current TrackID to detect track changes and adjust Map
                //tmpcuircitID = aDrivers.driverlist[i].GetVariousParameter("TrackId");	//tmpcuircitID never used after here
	}

*/

	
	///// init W2UI elements
	initW2UI();
		
	
	// init google map
	init_map(cuircitID , aRefPointTMP);
	//initMapTMP(); //tempoary test for migration

};

//////////////////////////////////////////////////////////////
///////////////////////  init Google Map
//////////////////////////////////////////////////////////////
function init_map(_TrackID , aRefPoint)
{
		//subclassing
		GPSSensor.prototype = new google.maps.OverlayView();
		
		
		// Create the Google Map
		map = new google.maps.Map(d3.select("#map").node(), {
			zoom: aRefPoint[_TrackID]["Zoom"],
			
			// use cuircit RefPoint for center google map
			center: new google.maps.LatLng( aRefPoint[_TrackID]["MapInitLat"] , aRefPoint[_TrackID]["MapInitLong"] ),
			mapTypeId: google.maps.MapTypeId.SATELLITE,
			//deactivate google streetview
			streetViewControl: false
		});

		if(log >= 3){console.log("-+-+- aSensorData-Array: ", aSensorData);}
		sensorLayer = new GPSSensor(aSensorData);
		sensorLayer.setMap(map);
		
		// bind tables to google Map as a kind of overlay
    	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('CarList'));
    	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('TrackList'));
		
}

function initMapTMP(){
	
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
    	
    	
    	// bind tables to google Map
    	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('CarList'));
    	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('TrackList'));
    	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('DSdata'));
    	
	
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
       		
    
	}); // end of function top toolbar	
	
};

//W2UI function
function showStatus(){
	$('#item7').w2tag('Short Message');
	//alert("test");
}    


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

//////////////////////////////////////////////////////////////////////////
function initEventHandler(){
	
	
	$("#APIMODE").change(function() {
		$("#APIMODE option:selected").each(function() {
				APIMODE = $( this ).text();
		});			
	}); // end #APIMODE change event
	
	////////////
	$( "#DRIVERCOLOR" ).change(function() {
	    $("#DRIVERCOLOR option:selected").each(function() {
	    	var str1 = $( this ).val();
	        switch ( str1 ) {
	        
	        	case "hidedrivers":
	        		CSSClsChg.HideAllSvg();
	        		break;
	        		
	        	case "unhidedrivers":
		        	CSSClsChg.UnHideAllSvg();
	        		break;
	        	
	        	case "colortop3":
	        		CSSClsChg.ColorTop3vehicles();
		    		break;
		    		
	        	case "deletecssclasses":
	        		CSSClsChg.ClearAllCssClases();
	        		break;
	        		
	    	    default:
	        		CSSClsChg.ClearAllCssClases();
	    			break;
	        }
	    });            
	}); // end #DRIVERCOLOR change Venet
	
	
	//////////// Event handler for Slider
	$(function() {
		$( "#slider-range-max" ).slider({
			range: "max",
			min: -1000,
			max: 1000,
      			value: window.DisplayDurationCorrector, 
			step: 25,
      			slide: function( event, ui ) {
        			$( "#amount" ).val( ui.value );
				//set new value
				DisplayDurationCorrector = ui.value;
      			}
    		});
    		$( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
  	});
	
	////////////
	$(function() {
		$( "#slider-workerdelay_dsdata" ).slider({
			range: "max",
			min:	0,
			max:	1500,
      		value:	WORKERDELAY_DSDATA, 
			step:	50,
			slide:	function( event, ui ) {
						$( "#workerdelay_dsdata" ).val( ui.value );
						//set new value
						WORKERDELAY_DSDATA = ui.value;
      			}
    		});
    		$( "#workerdelay_dsdata" ).val( $( "#slider-workerdelay_dsdata" ).slider( "value" ) );
  	});
	
}

function createJqGrid(){
	
	// initiate jqGrid for DriverData
	// todo: make table searchable   and  add new Theme
	// todo: add subgrid information like: Long,Lat,RefPoint,...
	jQuery("#tracklisttable").jqGrid({	
	        datatype: "local",
	        height: 'auto',
	        width:	790,
	        hiddengrid: true,
	        colNames:['ID','TrackID','TrackName','Max Gridsize', 'RefPoints exists?','Comment'],
	        colModel:[
					{name:'id', index:'id', formatter: 'integer', width:45, sorttype:"int"},
					{name:'trackid', index:'trackid', width:80, sorttype:"int"},
					{name:'trackname', index: 'trackname', width:240, sorttype:"text"},
					{name:'gridsize', width:50, align:"center", sorttype:"text"},
					{name:'refpoint', width:70, align:"center", sorttype:"text"},
					{name:'comment', width:250, align:"left", sorttype:"text"},
	        ],
		caption: "List of available Tracks",
		rowNum: 200,
		//rowList:[10,20,30],
		//pager: 'pager_tracklisttable',
	});
			
	// add filter option bar
	jQuery("#tracklisttable").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	
	// add StopRefresh Table button in jqgrid header
	//Method with checkbox
	//$('#TrackList span.ui-jqgrid-title').after(' | Stop refresh table:<input type="checkbox" id="cbTracklistRefresh"/>');
	//Method with Button
	jQuery('#tracklisttable').setCaption('List of available Tracks&nbsp;&nbsp;&nbsp;' + '<input type="button" title="Stop automatic refresh of table" id="cbTracklistRefresh" value="Stop" style="background-color:#dddddd; width:50px" disabled></input>');
	
	
	
	// car lis overview
	jQuery("#carlisttable").jqGrid({	
	        datatype: "local",
	        height: 'auto',
	        hiddengrid: true,
	        colNames:['ID','CarName','class','Set1', 'Set2','Comment'],
	        colModel:[
					{name:'vehicleid', 	width:100, 	sorttype:"float",align:"left", index:'id', formatter: 'float'},
					{name:'name', 		width:100, 	sorttype:"text"},
					{name:'cls',  		width:200, 	sorttype:"text"},
					{name:'set1', 		width:40, 	sorttype:"text", align:"right"},
					{name:'set2', 		width:90, 	sorttype:"text", align:"center"},
					{name:'comment', 	width:160, 	sorttype:"text", align:"left"},
	        ],
	        caption: "List of available Cars with properties.",
		rowNum: 200,
	});
	// add filter option bar
	jQuery("#carlisttable").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	
	
	
	
	//TODO: really needed?
	$('#tracklisttable').css('z-index', 9999);
	$('#map').css('z-index', 9998);
		
}