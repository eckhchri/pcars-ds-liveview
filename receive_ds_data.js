// Module for recaive data from ProjectCARS dedicated server
// requirements:    JQUERY  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

//Receive_DS_data("www.eckhchri.de",9000);
// http://www.eckhchri.de:9000/api/session/status?attributes&members&participants

function TestFunc(p1 , p2)
{
	return p1 * p2;
}

function Receive_DS_data (url,port,timeout,receivemode){


	// todo:   Globale variablen füllen ???? oder als Rueckgabewert aus der Function?
	this.url		=	url;
	this.port		=	port;
	this.fullurl		=	'http://' +  url + ':' + port;
	this.timeout		=	timeout;
	this.receivemode	=	receivemode;		// GETDRIVERDATE , GETTRACKLIST

	if (this.receivevariant == undefined)
	{
		this.receivevariant = "GETDRIVERDATE";
	}


	// todo: Mapping HASH fuer receivevariant festlegen
	var aReceiveModes = {
				 "GETDRIVERDATE" : "/api/session/status?attributes&members&participants"
				,"GETDSDATA"	 : "/api/session/status?attributes&members&participants"
				,"GETTRACKLIST"  : "/api/list/tracks"
			};	

	



//todo: Decison Using XMLHTTP class oder   THREE
//      http://api.jquery.com/jquery.getjson/
//	jQuery.getJSON( this.fullurl, 
//    			function(data){
//				console.log( data );
//				document.write ( data );
//		});
//	wait(3);
//	document.write ( data );
	

	var aDrivers          =   new Array();

	// http://www.w3.org/TR/2006/WD-XMLHttpRequest-20060405/
	var xmlhttp = new XMLHttpRequest();


	// make an  xmlhttp request (synchr)
	// todo: Evtl. weniger Parameter bei der API abfragen um die Performance zu erhoehen:  /api/session/status?attributes&participants
	xmlhttp.open(
			"GET",
//			 fullurl + "/api/session/status?attributes&members&participants"
			fullurl + aReceiveModes[this.receivemode]
			// optional parameter for decison: async = true, sync = false
			, false
		    );

	// send request
	try{
		xmlhttp.send();
	}catch(err){
		console.log("Error while sending Request to DS!:" + err );
		return aDrivers;
	}

  	// xmlhttp.timeout = this.timeout;  // could onyl be set in Synchronous mode


		
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{	

		   //document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
		   //document.write ( "HTTP Response received" );
		   //document.write ( xmlhttp.responseText );

		 //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
                 var myArr = JSON.parse( xmlhttp.responseText );
                 var arrayoutput = myArr.toString();

                 console.log("ReceiveDsData complete array" , myArr);

	   switch ( this.receivemode ) {


		//todo: DSData mit beim Abrufen der Fahrendaten integrien, damit man den DS Statisch aktualisieren kann
		case  "GETDSDATA":

			// return common data of the DS Server

			if ( myArr.response.state == "Idle" ){
		
				return { 
					 "joinable":		myArr.response.joinable
					,"lobbyid":		myArr.response.lobbyid
					,"max_member_count":	myArr.response.max_member_count
					,"now":			myArr.response.now
					,"state":		myArr.response.state
					}
			}

			if ( myArr.response.state == "Running" ){

                                return {
                                         "joinable":            myArr.response.joinable
                                        ,"lobbyid":             myArr.response.lobbyid
                                        ,"max_member_count":    myArr.response.max_member_count
                                        ,"now":                 myArr.response.now
                                        ,"state":               myArr.response.state
                                        ,"name":		myArr.response.name
					,"TrackId":		myArr.response.attributes.TrackId
					,"SessionStage":	myArr.response.attributes.SessionStage
					}
                        }
			
			// default
			var empty  = new Array;
			return empty;

		case  "GETDRIVERDATE":
		
			//	for (var i = 0;i<myArr.response.members.length;i++)
			//	{
			//	}

			// if no users joined return example Data
			if ( myArr.response.participants.length == 0 ){
			
				console.log("no Participants found in DS, leave function!");
				aDrivers.push (  new PCARSdriver(
									9234567
									,"NO_PARTICIPANT_TestData"
									,3
									,277
									,278
									,279
									,"StateTest"
									,"Sector1"
									,"123"
									,"123456"
									,"123456"
									,"0"
									,"321"
									,{TrackId: 920145926}
						) );		
				return aDrivers;
			}
		 
			for (var i = 0;i<myArr.response.participants.length;i++)
			{
				//console.log ( "DS Participants:" , myArr.response.participants);
				// read data of all participants and put it in an array of PCARSdriver objects
				aDrivers.push (
					new PCARSdriver(myArr.response.participants[i].attributes.RefId,
						myArr.response.participants[i].attributes.Name,
						myArr.response.participants[i].attributes.GridPosition,
						myArr.response.participants[i].attributes.PositionX,
						myArr.response.participants[i].attributes.PositionY,
						myArr.response.participants[i].attributes.PositionZ,
						myArr.response.participants[i].attributes.State,
						myArr.response.participants[i].attributes.CurrentSector,
						myArr.response.participants[i].attributes.RacePosition,
						myArr.response.participants[i].attributes.FastestLapTime,
					        myArr.response.participants[i].attributes.LastLapTime,
						myArr.response.participants[i].attributes.Orientation,
						myArr.response.participants[i].attributes.Speed,
						{ 	TrackId: myArr.response.attributes.TrackId
							,GridSize : myArr.response.attributes.GridSize
						}
						)
					);
			
			}

			//console.log (  "Array of aDriver Objects: " + aDrivers);
  
			// return information
	                return aDrivers;		

		case "GETTRACKLIST":

			// todo: Auslesen der trackIDs und den dazugehoerigen Namen


			// if no users joined return example Data
                        if ( myArr.response.list.length == 0 ){

                                console.log("no Participants found in DS, leave function!");
                                aDrivers.push (  new PCARSdriver(9234567,"NO_PARTICIPANT_TestData",3,277,278,279) );        
                                return aDrivers;
                        }
			
			//console.log("++++TRACKLIST: " ,  myArr);

			var aTrackList = new Array;

			for (var i = 0;i<myArr.response.list.length;i++)
                        {
				//build array TrackID to TrackName 
				aTrackList[ myArr.response.list[i].id ]	=  myArr.response.list[i].name;
						
			}

			//console.log("+++ aTrackList: " , aTrackList);			

			return aTrackList;

	  } // End SWITCH

    	}
	
	// return empty array: no DS, no Memebers, ...
	aDrivers.push (  new PCARSdriver(9234567,"NO_DS_FOUND_TestData",3,277,278,279) );
	return aDrivers;

}
