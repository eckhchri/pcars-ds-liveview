// CLASS of an pCars vehicle livery list
function PCARSVEHICLELIVERYLIST() {

	this.aVehicleLiveryInfoExt	=	{};	//extended array of vehicle livery info
	this.oLiveryDataStructured	=	{}; //restructed data array
	this.oLiveryDataStructuredName  =       {}; //restructed data array
	this.sGameMode = 'PCARS2';
	
	//init data
	this.loadVehicleLiveryData();

	// restructure data to oLiveryDataStructured
	this._RestructureLiveryData(this.sGameMode);


	
	if(log >= 3){console.log("INFO: PCARSVEHICLELIVERYLIST. this ", this);}
	return this;
}



/* returns name of a car livery
 * 
 * @param {string} vehicle id 
 * @param {string} livery id
 * @return {string} livery name
 */
function getNameById(sVehicleID, sLiveryId){
	
	var sResult = "LiveryID not found";
	
	if (!sVehicleID || !sLiveryId){
		return sResult;
	}

	if (this.oLiveryDataStructured[this.sGameMode][sVehicleID][sLiveryId]){
		return this.oLiveryDataStructured[this.sGameMode][sVehicleID][sLiveryId];
	}
		
	return sResult;	
}

/* returns vehivle number of a car livery
 *
 * @param {string} vehicle id
 * @param {string} livery id
 * @return {string} vehicle number - can bee 911b for example, what is the cause for string
 */
function getVehicleNumberById(sVehicleID, sLiveryId){

	var sResult;
	var LiveryName = this.getNameById(sVehicleID, sLiveryId);

	//extract the Vehicle Number from Livery Name, the number is always after the "#"
	sResult = LiveryName.slice(LiveryName.indexOf("#")+1);

	//remove blanks from string, because there are some cases where the Livery Name has a blank after the Vehicle Number
	sResult = sResult.replace(/ /g, '');

	if(sResult == "" || sResult == "LiveryID not found"){sResult = "Vehicle Number not found";}

	return sResult;
}

/* returns ID of a car livery
 *
 * @param {string} vehicle id
 * @param {string} livery name
 * @return {string} livery id
 */
function getIdByName(sVehicleID, sLiveryName){

        var sResult = "Livery Name not found";

        if (!sVehicleID || !sLiveryName){
                return sResult;
        }
	if(this.oLiveryDataStructuredName[this.sGameMode][sVehicleID]){
        	if (this.oLiveryDataStructuredName[this.sGameMode][sVehicleID][sLiveryName]){
                	return this.oLiveryDataStructuredName[this.sGameMode][sVehicleID][sLiveryName];
	        }else{
			//return the custom livery ID if no other livery is available, which is mainly used for the CREST modes, because there is never a livery name available
			return 99;
		}
	}

        return sResult;
}

/* returns normalized name of a car livery
 * 
 * @param {string} vehicle id 
 * @param {string} livery id
 * @return {string} normalized livery name
 */
function getNameByIdNormalized(iVehicleID, iLiveryId){
	
	return this._NameNormalization( this.getNameById(iVehicleID, iLiveryId) );	
}


/* (internal funtion) string normalization
 * 
 */
function _NameNormalization (sName){	
	if (sName){ //check if its defined string
		return sName.replace(/ |\.|\(|\)/g, '_');
	}else{
		return "NO_NAME_DEFINED";
	}
}


/* (internal funtion) _RestructureLiveryData
 * 
 */
function _RestructureLiveryData (sGameMode){	
	
		
	if (!this.oLiveryDataStructured[sGameMode]){
		this.oLiveryDataStructured[sGameMode] = {};
	}
	if (!this.oLiveryDataStructuredName[sGameMode]){
                this.oLiveryDataStructuredName[sGameMode] = {};
        }
			
	// travers vehicle ids
	var aVehicles = this.aVehicleLiveryInfoExt[sGameMode];
	for (var i=0; i < aVehicles.length; i++ ){
				
		var oV = aVehicles[i];				
		if(! this.oLiveryDataStructured[sGameMode][oV.id]){
			this.oLiveryDataStructured[sGameMode][oV.id] = {};
		}
		if(! this.oLiveryDataStructuredName[sGameMode][oV.id]){
                        this.oLiveryDataStructuredName[sGameMode][oV.id] = {};
                }
						
		// tranvers different liveries
		var aLiveries = oV['liveries'];		
		for (var j=0; j < aLiveries.length; j++){
			
			var iLivID = aLiveries[j].id;
			var sLivName = aLiveries[j].name;
			
			this.oLiveryDataStructured[sGameMode][oV.id][iLivID] = sLivName;
			this.oLiveryDataStructuredName[sGameMode][oV.id][sLivName] = iLivID;
		}				
		
	}

	////////////////////
	// statically add an "Example" Livery with id 0 for all vehicles where no other liveries are available
	////////////////////

	var aVehiclesWoLiveries = [
		728234598,	//Acura NSX
		-1443190363,	//Agajanian Watson Roadster
		-1303813490,	//Aston Martin DB11
		-91815086,	//Aston Martin DBR1/300
		1268015922,	//Aston Martin Vantage GT12
		2082176226,	//Audi A1 quattro
		1469658023,	//Audi R8 V10 plus 5.2 FSI quattro
		1400443574,	//BAC Mono
		-1226176940,	//BMW 1 Series M Coupé
		143364290,	//BMW 2002 Turbo
		178583869,	//Chevrolet Camaro ZL-1
		1141733552,	//Chevrolet Corvette Z06
		2006190056,	//Ferrari 458 Speciale A
		-505616410,	//Ferrari F12tdf
		-1967832633,	//Ferrari F40
		1639105598,	//Ford Escort RS1600
		-1796949190,	//Ford Escort RS1600 (Rallycross)
		-1548941295,	//Ford F-150 RTR Ultimate Funhaver
		366881611,	//Ford GT
		1397255601,	//Ford Mustang 2+2 Fastback
		1230061845,	//Ford Mustang GT
		373960596,	//Honda Civic Type-R
		1187826685,	//Jaguar F-Type SVR Coupé
		-387045855,	//Jaguar XJ220 S
		1977120176,	//Lamborghini Aventador LP700-4
		1850232477,	//Lamborghini Huracán LP610-4
		1564669712,	//Lamborghini Veneno LP750-4
		980572679,	//McLaren 570S
		1106819298,	//McLaren 720S
		307010432,	//McLaren F1
		-1748676965,	//McLaren P1 ™
		-1522922538,	//Mercedes-AMG A 45 4MATIC
		-78832007,	//Mercedes-AMG C 63 Coupé S
		-2059595338,	//Mercedes-AMG GT R
		-149617068,	//Mitsubishi Lancer Evolution IX FQ360
		460478144,	//Mitsubishi Lancer Evolution VI T.M.E.
		998947753,	//Mitsubishi Lancer Evolution X FQ400
		85063219,	//Nissan GT-R Nismo (R35)
		1356687088,	//Pagani Huayra BC
		-1617916111,	//Pagani Zonda Cinque Roadster
		-2133597590,	//Porsche 911 GT3 RS
		-698401632,	//Porsche 918 Spyder Weissach
		-1048050877,	//Radical RXC Turbo
		-41807622,	//Toyota 86
		-235751604,	//Toyota GT-86
		1278633095,	//Toyota GT-86 Rocket Bunny Street
	]

	// add "Example" livery with id 0
	for (var i = 0; i < aVehiclesWoLiveries.length; i++ ){
		//console.log("key: ",key);
		this.oLiveryDataStructured[sGameMode][aVehiclesWoLiveries[i]][0] = "Example";
		this.oLiveryDataStructuredName[sGameMode][aVehiclesWoLiveries[i]]["Example"] = 0;
	}
			
	return true;	
}


/// FOR DEVELOPER PURPOSES ONLY
/// Checks which Livery files are available and which not, and prints the result to the browser developer console
function checkfiles (sGameMode){
	var aVehicles = this.aVehicleLiveryInfoExt[sGameMode];
	var NumberLiveries = 0;
	var aOutput = [];
	var sOutput= "";

	var oFiles =
	{
		///// Fill in Data here //////
		///// Example:
		/////	"-1001664988":["17.png","78.png","87.png","8.png","id54.png","id63.png"],
		/////	"1083119012":["5.png","6.png"],
		/////	"-1206681923":["7.png","8.png"]
		///// and then check the Browser developer console with filter "Livery:"

	}
	//console.log("oFiles: ",oFiles);


	for (var i=0; i < aVehicles.length; i++ ){

		var oV = aVehicles[i];
		var filenameID = "";
		var filenameNumber = "";
		var oFilesCurVehicle = oFiles[oV.id];
		//if(log >= 3){console.log("oV.name: ",oV.name," / oV.id: ",oV.id," / oFilesCurVehicle: ",oFilesCurVehicle);}


		// go through different liveries
		var aLiveries = oV['liveries'];
		if(oFilesCurVehicle){	// only if there are liveries for a vehicle available
			for (var j=0; j < aLiveries.length; j++){

				var iLivID = aLiveries[j].id;
				var sLivName = aLiveries[j].name;
				var vehicleNumber= this.getVehicleNumberById(oV.id, iLivID);
				var fileAvailable = "NA";
				//filename generated with livery ID
				filenameID = "id" + iLivID + ".png";
				filenameNumber = vehicleNumber + ".png";

				for (var k=0; k < oFilesCurVehicle.length; k++){
					if(oFilesCurVehicle[k] == filenameID){
						fileAvailable = "ID";
					}
					if(oFilesCurVehicle[k] == filenameNumber){
                                                fileAvailable = "Number";
                                        }

				}
				// output all available and not available liveries. If you want to see the not available Liveries only, enable the if statement
				//if(fileAvailable == "NA"){
					sOutput = "Livery: ," + oV.name + "," + oV.class + "," + oV.id + ",id" + iLivID + "," + vehicleNumber + "," + sLivName + "," + fileAvailable;
					aOutput.push(sOutput);
					if(log >= 3){console.log("Livery: ," + oV.name + "," + oV.class + "," + oV.id + ",id" + iLivID + "," + vehicleNumber + "," + sLivName + "," + fileAvailable);}
				//}
			}
		}else{
			// there are no liveries for the current vehicle available
			sOutput = "Livery: ," + oV.name + "," + oV.class + "," + oV.id + ",,,,NA - complete car";
			aOutput.push(sOutput);
			if(log >= 3){console.log("Livery: ," + oV.name + "," + oV.class + "," + oV.id + ",,,,NA - complete car");}
		}
		NumberLiveries += aLiveries.length;
	}
	if(log >= 3){console.log("Total Number of Liveries: ",NumberLiveries);}
	if(log >= 3){console.log("Livery Output Array",aOutput);}

	return true;
}


/* DATA
 *  
 */
function loadVehicleLiveryData(){

this.aVehicleLiveryInfoExt['PCARS2']	=	[];		
this.aVehicleLiveryInfoExt['PCARS2'] = [
      {
        "id" : 9999999999,
        "name" : "Slightly Mad Studios",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Slightly Mad Studios"
          }
	],
	"class" : "SMS"
      },

      ////// Data from DS API - api/list/liveries /////////
      {
        "id" : 9503224,
        "name" : "BMW 320 TC (E90)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Cassius Racing #9"
          },
          {
            "id" : 52,
            "name" : "Cassius Racing #10"
          },
          {
            "id" : 53,
            "name" : "SRT Racing #27"
          },
          {
            "id" : 54,
            "name" : "SRT Racing #28"
          },
          {
            "id" : 55,
            "name" : "Vitt Motorsport #31"
          },
          {
            "id" : 56,
            "name" : "Vitt Motorsport #32"
          },
          {
            "id" : 57,
            "name" : "Wildgersen Racing #49"
          },
          {
            "id" : 58,
            "name" : "Wildgersen Racing #50"
          },
          {
            "id" : 59,
            "name" : "OCH Racing Team #57"
          },
          {
            "id" : 60,
            "name" : "OCH Racing Team #58"
          },
          {
            "id" : 61,
            "name" : "Eibach Racing #67"
          },
          {
            "id" : 62,
            "name" : "Eibach Racing #68"
          },
          {
            "id" : 63,
            "name" : "Mist Engineering #71"
          },
          {
            "id" : 64,
            "name" : "Mist Engineering #72"
          },
          {
            "id" : 65,
            "name" : "Schivelly Performance #75"
          },
          {
            "id" : 66,
            "name" : "Schivelly Performance #76"
          },
          {
            "id" : 67,
            "name" : "Borda Racing #79"
          },
          {
            "id" : 68,
            "name" : "Borda Racing #80"
          },
          {
            "id" : 69,
            "name" : "Besmone Automotive #85"
          },
          {
            "id" : 70,
            "name" : "Besmone Automotive #86"
          },
          {
            "id" : 71,
            "name" : "Umotek Motorsports #94"
          },
          {
            "id" : 72,
            "name" : "Umotek Motorsports #95"
          },
          {
            "id" : 73,
            "name" : "Kmax Motorsports #98"
          },
          {
            "id" : 74,
            "name" : "Kmax Motorsports #99"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Touring Car"
      },
      {
        "id" : 58065064,
        "name" : "Ginetta G40 GT5",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Pais Motorsport #57"
          },
          {
            "id" : 52,
            "name" : "Pais Motorsport #58"
          },
          {
            "id" : 53,
            "name" : "Vane Racing Team #54"
          },
          {
            "id" : 54,
            "name" : "Vane Racing Team #55"
          },
          {
            "id" : 55,
            "name" : "No Regret Sports #24"
          },
          {
            "id" : 56,
            "name" : "No Regret Sports #25"
          },
          {
            "id" : 57,
            "name" : "Team Karsten #2"
          },
          {
            "id" : 58,
            "name" : "Team Karsten #3"
          },
          {
            "id" : 59,
            "name" : "GedK Gloves Racing #49"
          },
          {
            "id" : 60,
            "name" : "GedK Gloves Racing #50"
          },
          {
            "id" : 61,
            "name" : "Barlow's Racing Team #10"
          },
          {
            "id" : 62,
            "name" : "Barlow's Racing Team #11"
          },
          {
            "id" : 63,
            "name" : "Imochi Motorsport #16"
          },
          {
            "id" : 64,
            "name" : "Imochi Motorsport #17"
          },
          {
            "id" : 65,
            "name" : "Machuca Racing #19"
          },
          {
            "id" : 66,
            "name" : "Machuca Racing #20"
          },
          {
            "id" : 67,
            "name" : "Team Shalstrone #29"
          },
          {
            "id" : 68,
            "name" : "Team Shalstrone #30"
          },
          {
            "id" : 69,
            "name" : "Team F.ivoo Racing #14"
          },
          {
            "id" : 70,
            "name" : "Team F.ivoo Racing #15"
          },
          {
            "id" : 71,
            "name" : "Decksbern Motorsport #37"
          },
          {
            "id" : 72,
            "name" : "Decksbern Motorsport #38"
          },
          {
            "id" : 73,
            "name" : "WRB Motorsport #21"
          },
          {
            "id" : 74,
            "name" : "WRB Motorsport #22"
          },
          {
            "id" : 75,
            "name" : "OWL Security Racing #31"
          },
          {
            "id" : 76,
            "name" : "OWL Security Racing #32"
          },
          {
            "id" : 77,
            "name" : "Team AQI Courier #39"
          },
          {
            "id" : 78,
            "name" : "Team AQI Courier #40"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT5"
      },
      {
        "id" : 65306143,
        "name" : "Sauber C9 Mercedes-Benz",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Sauber Mercedes #61"
          },
          {
            "id" : 52,
            "name" : "Sauber Mercedes #62"
          },
          {
            "id" : 53,
            "name" : "Sauber Mercedes #63"
          },
          {
            "id" : 66,
            "name" : "DINO Motorsports #46"
          },
          {
            "id" : 67,
            "name" : "DINO Motorsports #47"
          },
          {
            "id" : 68,
            "name" : "Brahlen Motorsport #28"
          },
          {
            "id" : 69,
            "name" : "Brahlen Motorsport #29"
          },
          {
            "id" : 70,
            "name" : "Wildbreng Racing #33"
          },
          {
            "id" : 71,
            "name" : "Wildbreng Racing #34"
          },
          {
            "id" : 72,
            "name" : "Zipanol Racing Team #76"
          },
          {
            "id" : 73,
            "name" : "Zipanol Racing Team #77"
          },
          {
            "id" : 74,
            "name" : "Avens Auto Sport #88"
          },
          {
            "id" : 75,
            "name" : "Avens Auto Sport #89"
          },
          {
            "id" : 76,
            "name" : "Anila Motorsport #80"
          },
          {
            "id" : 77,
            "name" : "Anila Motorsport #81"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group C1"
      },
      {
        "id" : 85063219,
        "name" : "Nissan GT-R Nismo (R35)",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Brilliant White"
          },
          {
            "id" : 2,
            "name" : "Phantom Black"
          },
          {
            "id" : 3,
            "name" : "Vibrant Red"
          },
          {
            "id" : 4,
            "name" : "Ultimate Silver"
          },
          {
            "id" : 5,
            "name" : "Mat Grey"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : 143364290,
        "name" : "BMW 2002 Turbo",
        "liveries" : [
          {
            "id" : 1,
            "name" : "White"
          },
          {
            "id" : 2,
            "name" : "Silver"
          },
          {
            "id" : 3,
            "name" : "Black"
          },
          {
            "id" : 51,
            "name" : "Yellow / Black"
          },
          {
            "id" : 52,
            "name" : "Silver / Red"
          },
          {
            "id" : 53,
            "name" : "White / Blue Stripes"
          },
          {
            "id" : 54,
            "name" : "Gold"
          },
          {
            "id" : 55,
            "name" : "Red / Black"
          },
          {
            "id" : 56,
            "name" : "White / Red Stripes"
          },
          {
            "id" : 57,
            "name" : "Lemon Yellow"
          },
          {
            "id" : 58,
            "name" : "White / M-Stripes"
          },
          {
            "id" : 59,
            "name" : "Orange"
          },
          {
            "id" : 60,
            "name" : "Green / Yellow Stripes"
          },
          {
            "id" : 61,
            "name" : "White / Black"
          },
          {
            "id" : 62,
            "name" : "Green"
          },
          {
            "id" : 63,
            "name" : "Black / Color Stripes"
          },
          {
            "id" : 64,
            "name" : "White / Red/Blue Stripes"
          },
          {
            "id" : 65,
            "name" : "Light Blue"
          },
          {
            "id" : 66,
            "name" : "Copper / White"
          },
          {
            "id" : 67,
            "name" : "Dark Grey"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road G"
      },
      {
        "id" : 152867459,
        "name" : "Radical SR8-RX",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Dominum Musk #3"
          },
          {
            "id" : 52,
            "name" : "Team Dominum Musk #4"
          },
          {
            "id" : 53,
            "name" : "Acesits Racing #8"
          },
          {
            "id" : 54,
            "name" : "Acesits Racing #9"
          },
          {
            "id" : 55,
            "name" : "DKN Springate Racing #27"
          },
          {
            "id" : 56,
            "name" : "DKN Springate Racing #28"
          },
          {
            "id" : 57,
            "name" : "EXTA Racing Team #30"
          },
          {
            "id" : 58,
            "name" : "EXTA Racing Team #31"
          },
          {
            "id" : 59,
            "name" : "B1ZY Motorsports #5"
          },
          {
            "id" : 60,
            "name" : "B1ZY Motorsports #6"
          },
          {
            "id" : 61,
            "name" : "Ankyamo Motorsport #11"
          },
          {
            "id" : 62,
            "name" : "Ankyamo Motorsport #12"
          },
          {
            "id" : 63,
            "name" : "Hallbot Autosports #15"
          },
          {
            "id" : 64,
            "name" : "Hallbot Autosports #16"
          },
          {
            "id" : 65,
            "name" : "Petroblast Racing #23"
          },
          {
            "id" : 66,
            "name" : "Petroblast Racing #24"
          },
          {
            "id" : 67,
            "name" : "Kerosene Motorsport #829"
          },
          {
            "id" : 68,
            "name" : "Kerosene Motorsport #830"
          },
          {
            "id" : 69,
            "name" : "Bilcker Team #1"
          },
          {
            "id" : 70,
            "name" : "Bilcker Team #2"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day A"
      },
      {
        "id" : 161704608,
        "name" : "Ford Mustang RTR GT4",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team RTR #39"
          },
          {
            "id" : 52,
            "name" : "Team RTR #44"
          },
          {
            "id" : 53,
            "name" : "Team Monster Energy #153"
          },
          {
            "id" : 54,
            "name" : "Team Monster Energy #154"
          },
          {
            "id" : 55,
            "name" : "Nitto Racing Team #66"
          },
          {
            "id" : 56,
            "name" : "Nitto Racing Team #76"
          },
          {
            "id" : 57,
            "name" : "Yellow Lighting Motorsport #91"
          },
          {
            "id" : 58,
            "name" : "Yellow Lighting Motorsport #99"
          },
          {
            "id" : 59,
            "name" : "Team Recaro #135"
          },
          {
            "id" : 60,
            "name" : "Team Recaro #136"
          },
          {
            "id" : 61,
            "name" : "Ringley Motorsports #143"
          },
          {
            "id" : 62,
            "name" : "Ringley Motorsports #144"
          },
          {
            "id" : 63,
            "name" : "Magnaflow Racing #151"
          },
          {
            "id" : 64,
            "name" : "Magnaflow Racing #152"
          },
          {
            "id" : 65,
            "name" : "Morrish Motor Racing #147"
          },
          {
            "id" : 66,
            "name" : "Morrish Motor Racing #148"
          },
          {
            "id" : 67,
            "name" : "Team Bramhall #179"
          },
          {
            "id" : 68,
            "name" : "Team Bramhall #180"
          },
          {
            "id" : 69,
            "name" : "K+N Motorsport #192"
          },
          {
            "id" : 70,
            "name" : "K+N Motorsport #193"
          },
          {
            "id" : 71,
            "name" : "AC Racing Team #159"
          },
          {
            "id" : 72,
            "name" : "AC Racing Team #160"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT4"
      },
      {
        "id" : 178583869,
        "name" : "Chevrolet Camaro ZL-1",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Summit White"
          },
          {
            "id" : 2,
            "name" : "Silver Ice Metallic"
          },
          {
            "id" : 3,
            "name" : "Black"
          },
          {
            "id" : 4,
            "name" : "Nightfall Gray Metallic"
          },
          {
            "id" : 5,
            "name" : "Red Hot"
          },
          {
            "id" : 6,
            "name" : "Blue Velvet Metallic"
          },
          {
            "id" : 7,
            "name" : "Hyper Blue Metallic"
          },
          {
            "id" : 8,
            "name" : "Bright Yellow"
          },
          {
            "id" : 9,
            "name" : "Garnet Red Tintcoat"
          },
          {
            "id" : 10,
            "name" : "Mosaic Black Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road D"
      },
      {
        "id" : 185812116,
        "name" : "Ferrari 488 GT3",
        "liveries" : [
          {
            "id" : 55,
            "name" : "R.Ferri Motorsport #61"
          },
          {
            "id" : 51,
            "name" : "AF Corse Team #53"
          },
          {
            "id" : 52,
            "name" : "AF Corse Team #50"
          },
          {
            "id" : 53,
            "name" : "SMP Racing #72"
          },
          {
            "id" : 56,
            "name" : "Scuderia Corsa Team #63"
          },
          {
            "id" : 57,
            "name" : "F.F. Corse Team #2"
          },
          {
            "id" : 58,
            "name" : "F.F. Corse Team #48"
          },
          {
            "id" : 59,
            "name" : "F.F. Corse Team #0"
          },
          {
            "id" : 60,
            "name" : "TR3 Racing #31"
          },
          {
            "id" : 61,
            "name" : "Kaspersky Motorsport #55"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 220908396,
        "name" : "Ferrari FXX K",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Rosso Corsa #10"
          },
          {
            "id" : 2,
            "name" : "Giallo Modena #15"
          },
          {
            "id" : 3,
            "name" : "Nero Stellato #44"
          },
          {
            "id" : 4,
            "name" : "Bianco Italia #47"
          },
          {
            "id" : 5,
            "name" : "Blu Tour de France Met. #27"
          },
          {
            "id" : 6,
            "name" : "Rosso Corsa #13"
          },
          {
            "id" : 7,
            "name" : "Giallo Modena"
          },
          {
            "id" : 8,
            "name" : "Nero"
          },
          {
            "id" : 9,
            "name" : "Bianco Avus"
          },
          {
            "id" : 10,
            "name" : "Rosso Scuderia"
          },
          {
            "id" : 11,
            "name" : "Blu Pozzi"
          },
          {
            "id" : 12,
            "name" : "Nero Daytona Met."
          },
          {
            "id" : 13,
            "name" : "Rosso Mugello Met."
          },
          {
            "id" : 14,
            "name" : "Argento Nurburgring Met."
          },
          {
            "id" : 15,
            "name" : "Blu Tour de France Met."
          },
          {
            "id" : 16,
            "name" : "Blu Abu Dhabi Met."
          },
          {
            "id" : 17,
            "name" : "Blu Mirabeau Met."
          },
          {
            "id" : 18,
            "name" : "Grigio Alloy Met."
          },
          {
            "id" : 19,
            "name" : "Grigio Titanio Met."
          },
          {
            "id" : 20,
            "name" : "Grigio Ingrid Met."
          },
          {
            "id" : 21,
            "name" : "Grigio Silverstone Met."
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day A"
      },
      {
        "id" : 262982797,
        "name" : "Mercedes-Benz 190E 2.5-16 Evolution 2 DTM",
        "liveries" : [
          {
            "id" : 51,
            "name" : "AMG Mercedes Sonax #3"
          },
          {
            "id" : 52,
            "name" : "AMG Mercedes Sonax #4"
          },
          {
            "id" : 53,
            "name" : "AMG Mercedes Berlin2000 #5"
          },
          {
            "id" : 54,
            "name" : "AMG Mercedes Berlin2000 #6"
          },
          {
            "id" : 55,
            "name" : "Mass-Schons Racing #11"
          },
          {
            "id" : 56,
            "name" : "Mass-Schons Racing #12"
          },
          {
            "id" : 57,
            "name" : "AFdelta Motorsport #16"
          },
          {
            "id" : 58,
            "name" : "AFdelta Motorsport #17"
          },
          {
            "id" : 59,
            "name" : "Piston Racing Team #22"
          },
          {
            "id" : 60,
            "name" : "Piston Racing Team #23"
          },
          {
            "id" : 61,
            "name" : "Mogernig Motorsport #24"
          },
          {
            "id" : 62,
            "name" : "Mogernig Motorsport #25"
          },
          {
            "id" : 63,
            "name" : "Team Protrade #47"
          },
          {
            "id" : 64,
            "name" : "Team Protrade #48"
          },
          {
            "id" : 65,
            "name" : "Meyer Racing #89"
          },
          {
            "id" : 66,
            "name" : "Meyer Racing #90"
          },
          {
            "id" : 67,
            "name" : "Sobrent Motorsport #53"
          },
          {
            "id" : 68,
            "name" : "Sobrent Motorsport #54"
          },
          {
            "id" : 69,
            "name" : "Equipe Sawashier #81"
          },
          {
            "id" : 70,
            "name" : "Equipe Sawashier #82"
          },
          {
            "id" : 71,
            "name" : "Team Hot Wheels #91"
          },
          {
            "id" : 72,
            "name" : "Team Hot Wheels #92"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group A"
      },
      {
        "id" : 266758367,
        "name" : "Lamborghini Sesto Elemento",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Carbon"
          },
          {
            "id" : 2,
            "name" : "Rosso Effesto"
          },
          {
            "id" : 3,
            "name" : "Bianco Canopus"
          },
          {
            "id" : 4,
            "name" : "Grigio Thalasso"
          },
          {
            "id" : 5,
            "name" : "Blu Caelum"
          },
          {
            "id" : 6,
            "name" : "Giallo Horus"
          },
          {
            "id" : 7,
            "name" : "Grigio Titans"
          },
          {
            "id" : 8,
            "name" : "Verde Ithaca"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day B"
      },
      {
        "id" : 274862187,
        "name" : "Mercedes-Benz SLS AMG GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Stargenly Motorsport #17"
          },
          {
            "id" : 52,
            "name" : "Stargenly Motorsport #18"
          },
          {
            "id" : 53,
            "name" : "Hummerich Rennsport #101"
          },
          {
            "id" : 54,
            "name" : "Hummerich Rennsport #106"
          },
          {
            "id" : 55,
            "name" : "Wildgersen Racing Team #125"
          },
          {
            "id" : 56,
            "name" : "Wildgersen Racing Team #126"
          },
          {
            "id" : 57,
            "name" : "Qube Auto Sport #39"
          },
          {
            "id" : 58,
            "name" : "Qube Auto Sport #40"
          },
          {
            "id" : 59,
            "name" : "Asymbon Racing #139"
          },
          {
            "id" : 60,
            "name" : "Asymbon Racing #140"
          },
          {
            "id" : 61,
            "name" : "Garton Motorsport #149"
          },
          {
            "id" : 62,
            "name" : "Garton Motorsport #150"
          },
          {
            "id" : 63,
            "name" : "Team Celticom Network #155"
          },
          {
            "id" : 64,
            "name" : "Team Celticom Network #156"
          },
          {
            "id" : 65,
            "name" : "Roboil Racing Team #171"
          },
          {
            "id" : 66,
            "name" : "Roboil Racing Team #172"
          },
          {
            "id" : 67,
            "name" : "Stopper IT Systems #187"
          },
          {
            "id" : 68,
            "name" : "Stopper IT Systems #188"
          },
          {
            "id" : 69,
            "name" : "Base One Team #197"
          },
          {
            "id" : 70,
            "name" : "Base One Team #198"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 307010432,
        "name" : "McLaren F1",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Magnesium Silver Metallic"
          },
          {
            "id" : 2,
            "name" : "Pearl White"
          },
          {
            "id" : 3,
            "name" : "Bright Yellow"
          },
          {
            "id" : 4,
            "name" : "McLaren Orange"
          },
          {
            "id" : 5,
            "name" : "Grand Prix Red"
          },
          {
            "id" : 6,
            "name" : "Mercury Red Metallic"
          },
          {
            "id" : 7,
            "name" : "Dorchester Grey Metallic"
          },
          {
            "id" : 8,
            "name" : "Creighton Brown Metallic"
          },
          {
            "id" : 9,
            "name" : "Jet Black"
          },
          {
            "id" : 10,
            "name" : "Genesis Blue Metallic"
          },
          {
            "id" : 11,
            "name" : "Electric Blue Metallic"
          },
          {
            "id" : 12,
            "name" : "Pale Blue Metallic"
          },
          {
            "id" : 13,
            "name" : "Grey Green Metallic"
          },
          {
            "id" : 14,
            "name" : "Dark Green Metallic"
          },
          {
            "id" : 15,
            "name" : "Burgundy"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : 310900789,
        "name" : "Ginetta G40 Junior",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Pais Motorsport #57"
          },
          {
            "id" : 52,
            "name" : "Pais Motorsport #58"
          },
          {
            "id" : 53,
            "name" : "Vane Racing Team #54"
          },
          {
            "id" : 54,
            "name" : "Vane Racing Team #55"
          },
          {
            "id" : 55,
            "name" : "No Regret Sports #24"
          },
          {
            "id" : 56,
            "name" : "No Regret Sports #25"
          },
          {
            "id" : 57,
            "name" : "Team Karsten #2"
          },
          {
            "id" : 58,
            "name" : "Team Karsten #3"
          },
          {
            "id" : 59,
            "name" : "GedK Gloves Racing #49"
          },
          {
            "id" : 60,
            "name" : "GedK Gloves Racing #50"
          },
          {
            "id" : 61,
            "name" : "Barlow's Racing Team #10"
          },
          {
            "id" : 62,
            "name" : "Barlow's Racing Team #11"
          },
          {
            "id" : 63,
            "name" : "Imochi Motorsport #16"
          },
          {
            "id" : 64,
            "name" : "Imochi Motorsport #17"
          },
          {
            "id" : 65,
            "name" : "Machuca Racing #19"
          },
          {
            "id" : 66,
            "name" : "Machuca Racing #20"
          },
          {
            "id" : 67,
            "name" : "Team Shalstrone #29"
          },
          {
            "id" : 68,
            "name" : "Team Shalstrone #30"
          },
          {
            "id" : 69,
            "name" : "Team F.ivoo Racing #14"
          },
          {
            "id" : 70,
            "name" : "Team F.ivoo Racing #15"
          },
          {
            "id" : 71,
            "name" : "Decksbern Motorsport #37"
          },
          {
            "id" : 72,
            "name" : "Decksbern Motorsport #38"
          },
          {
            "id" : 73,
            "name" : "WRB Motorsport #21"
          },
          {
            "id" : 74,
            "name" : "WRB Motorsport #22"
          },
          {
            "id" : 75,
            "name" : "OWL Security Racing #31"
          },
          {
            "id" : 76,
            "name" : "OWL Security Racing #32"
          },
          {
            "id" : 77,
            "name" : "Team AQI Courier #39"
          },
          {
            "id" : 78,
            "name" : "Team AQI Courier #40"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "G40 Junior"
      },
      {
        "id" : 345014385,
        "name" : "Ferrari 488 Challenge (NA)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Ferrari of Silicon Valley #7"
          },
          {
            "id" : 52,
            "name" : "Wide World of Cars #11"
          },
          {
            "id" : 53,
            "name" : "Ferrari of Ontario #13"
          },
          {
            "id" : 54,
            "name" : "Ferrari of Long Island #19"
          },
          {
            "id" : 55,
            "name" : "Boardwalk Ferrari #61"
          },
          {
            "id" : 56,
            "name" : "Ferrari of Silicon Valley #70"
          },
          {
            "id" : 57,
            "name" : "Wide World of Cars #72"
          },
          {
            "id" : 58,
            "name" : "Miller Motorcars #77"
          },
          {
            "id" : 59,
            "name" : "Ferrari of Silicon Valley #96"
          },
          {
            "id" : 60,
            "name" : "Ferrari of Vancouver #99"
          },
          {
            "id" : 74,
            "name" : "Lake Forest Sportscars #104"
          },
          {
            "id" : 61,
            "name" : "Ferrari of Beverly Hills #111"
          },
          {
            "id" : 62,
            "name" : "Ferrari of San Francisco #113"
          },
          {
            "id" : 63,
            "name" : "Ferrari of Vancouver #115"
          },
          {
            "id" : 64,
            "name" : "The Collection #117"
          },
          {
            "id" : 65,
            "name" : "Ferrari of Atlanta  #118"
          },
          {
            "id" : 66,
            "name" : "Ferrari of Long Island #124"
          },
          {
            "id" : 67,
            "name" : "Ferrari of Central Florida #126"
          },
          {
            "id" : 68,
            "name" : "Lake Forest Sportscars #127"
          },
          {
            "id" : 69,
            "name" : "Ferrari North America #133"
          },
          {
            "id" : 70,
            "name" : "Miller Motorcars #173"
          },
          {
            "id" : 72,
            "name" : "Miller Motorcars #193"
          },
          {
            "id" : 73,
            "name" : "Ferrari of Ontario #199"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Ferrari Series"
      },
      {
        "id" : 366881611,
        "name" : "Ford GT",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Liquid Blue"
          },
          {
            "id" : 2,
            "name" : "Shadow Black"
          },
          {
            "id" : 3,
            "name" : "Ingot Silver"
          },
          {
            "id" : 4,
            "name" : "Liquid Grey"
          },
          {
            "id" : 5,
            "name" : "Frozen White"
          },
          {
            "id" : 6,
            "name" : "Liquid Red"
          },
          {
            "id" : 7,
            "name" : "Triple Yellow"
          },
          {
            "id" : 8,
            "name" : "Matte Black"
          },
          {
            "id" : 9,
            "name" : "Liquid Blue / White"
          },
          {
            "id" : 10,
            "name" : "Shadow Black / Red"
          },
          {
            "id" : 11,
            "name" : "Ingot Silver / Orange"
          },
          {
            "id" : 12,
            "name" : "Liquid Grey / Black"
          },
          {
            "id" : 13,
            "name" : "Frozen White / Blue"
          },
          {
            "id" : 14,
            "name" : "Liquid Red / White"
          },
          {
            "id" : 15,
            "name" : "Triple Yellow / Black"
          },
          {
            "id" : 16,
            "name" : "Matte Black / Orange"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road B"
      },
      {
        "id" : 373960596,
        "name" : "Honda Civic Type-R",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Milano Solid Red"
          },
          {
            "id" : 2,
            "name" : "Brilliant Sporty Blue Metallic"
          },
          {
            "id" : 3,
            "name" : "Championship White"
          },
          {
            "id" : 4,
            "name" : "Chrystal Black Pearl"
          },
          {
            "id" : 5,
            "name" : "Polished Metal Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road F"
      },
      {
        "id" : 375801487,
        "name" : "Ford RS200 Evolution Group B",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Ford Motorsport #8"
          },
          {
            "id" : 52,
            "name" : "Ford Motorsport #2"
          },
          {
            "id" : 53,
            "name" : "Team Belgium #5"
          },
          {
            "id" : 54,
            "name" : "Team Zipanol #18"
          },
          {
            "id" : 55,
            "name" : "Team Zipanol #19"
          },
          {
            "id" : 56,
            "name" : "Belldo Motorsport #22"
          },
          {
            "id" : 57,
            "name" : "Belldo Motorsport #23"
          },
          {
            "id" : 58,
            "name" : "Pilara Rallye Team #24"
          },
          {
            "id" : 59,
            "name" : "Pilara Rallye Team #28"
          },
          {
            "id" : 60,
            "name" : "Team HXC #41"
          },
          {
            "id" : 61,
            "name" : "Team HXC #42"
          },
          {
            "id" : 62,
            "name" : "Lanova Motors #57"
          },
          {
            "id" : 63,
            "name" : "Lanova Motors #58"
          },
          {
            "id" : 64,
            "name" : "Sawashier Rallye #62"
          },
          {
            "id" : 65,
            "name" : "Sawashier Rallye #63"
          },
          {
            "id" : 66,
            "name" : "West Motorsport #48"
          },
          {
            "id" : 67,
            "name" : "West Motorsport #49"
          },
          {
            "id" : 68,
            "name" : "Shield Rallye Team #72"
          },
          {
            "id" : 69,
            "name" : "Shield Rallye Team #73"
          },
          {
            "id" : 70,
            "name" : "Team Vitesse #36"
          },
          {
            "id" : 71,
            "name" : "Team Vitesse #37"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group B"
      },
      {
        "id" : 405826415,
        "name" : "Ferrari 488 GTE",
        "liveries" : [
          {
            "id" : 51,
            "name" : "SMP Racing #72"
          },
          {
            "id" : 52,
            "name" : "AF Corse Team #71a"
          },
          {
            "id" : 53,
            "name" : "AF Corse Team #51"
          },
          {
            "id" : 54,
            "name" : "AF Corse Team #71"
          },
          {
            "id" : 55,
            "name" : "Scuderia Corsa #68"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTE"
      },
      {
        "id" : 460478144,
        "name" : "Mitsubishi Lancer Evolution VI T.M.E.",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Rally Red"
          },
          {
            "id" : 2,
            "name" : "Wicked White"
          },
          {
            "id" : 3,
            "name" : "Phantom Black"
          },
          {
            "id" : 4,
            "name" : "Apex Silver Metallic"
          },
          {
            "id" : 5,
            "name" : "Octane Blue Pearl"
          },
          {
            "id" : 51,
            "name" : "Tommi Makinen Edition Red"
          },
          {
            "id" : 52,
            "name" : "Tommi Makinen Edition White"
          },
          {
            "id" : 53,
            "name" : "Tommi Makinen Edition Silver"
          },
          {
            "id" : 54,
            "name" : "Tommi Makinen Edition Black"
          },
          {
            "id" : 55,
            "name" : "Project Cars/Crimson"
          },
          {
            "id" : 56,
            "name" : "Project Cars/Green"
          },
          {
            "id" : 57,
            "name" : "Project Cars/Amber"
          },
          {
            "id" : 58,
            "name" : "Project Cars/Cobalt"
          },
          {
            "id" : 59,
            "name" : "Project Cars/Silver"
          },
          {
            "id" : 60,
            "name" : "Ralli Smart White"
          },
          {
            "id" : 61,
            "name" : "Bronze Metallic"
          },
          {
            "id" : 62,
            "name" : "Ralli Smart Silver Metallic"
          },
          {
            "id" : 63,
            "name" : "Bersmann Motorsport"
          },
          {
            "id" : 64,
            "name" : "RST"
          },
          {
            "id" : 65,
            "name" : "Green Met. / Orange Stripes"
          },
          {
            "id" : 66,
            "name" : "Copper Metallic"
          },
          {
            "id" : 67,
            "name" : "Dark Blue Metallic"
          },
          {
            "id" : 68,
            "name" : "Neon Green"
          },
          {
            "id" : 69,
            "name" : "Evotech Motorsports France"
          },
          {
            "id" : 70,
            "name" : "Yonyon Performance"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road F"
      },
      {
        "id" : 556202917,
        "name" : "Renault Mégane R.S. SMS-R Rallycross",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Jancon Mobile #83"
          },
          {
            "id" : 52,
            "name" : "Team Jancon Mobile #84"
          },
          {
            "id" : 53,
            "name" : "HPF Auto Racing Team #18"
          },
          {
            "id" : 54,
            "name" : "HPF Auto Racing Team #19"
          },
          {
            "id" : 55,
            "name" : "Yorri Motorsport #36"
          },
          {
            "id" : 56,
            "name" : "Yorri Motorsport #37"
          },
          {
            "id" : 57,
            "name" : "Team Ovoomi Tweaks #90"
          },
          {
            "id" : 58,
            "name" : "Team Ovoomi Tweaks #91"
          },
          {
            "id" : 59,
            "name" : "Biflex1 Racing #77"
          },
          {
            "id" : 60,
            "name" : "Biflex1 Racing #78"
          },
          {
            "id" : 61,
            "name" : "Stillen Motorsport #98"
          },
          {
            "id" : 62,
            "name" : "Stillen Motorsport #99"
          },
          {
            "id" : 63,
            "name" : "Avielldi Team #53"
          },
          {
            "id" : 64,
            "name" : "Avielldi Team #54"
          },
          {
            "id" : 65,
            "name" : "United Rallycross Partners #21"
          },
          {
            "id" : 66,
            "name" : "United Rallycross Partners #22"
          },
          {
            "id" : 67,
            "name" : "X-Vare Rallye Sports #12"
          },
          {
            "id" : 68,
            "name" : "X-Vare Rallye Sports#13"
          },
          {
            "id" : 69,
            "name" : "Goodmeld Motorsport #23"
          },
          {
            "id" : 70,
            "name" : "Goodmeld Motorsport #24"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "WRX"
      },
      {
        "id" : 574354493,
        "name" : "Mercedes-AMG A 45 SMS-R Rallycross",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Eltissen Motorsport #01"
          },
          {
            "id" : 52,
            "name" : "Eltissen Motorsport #02"
          },
          {
            "id" : 53,
            "name" : "Jameskett Racing #16"
          },
          {
            "id" : 54,
            "name" : "Jameskett Racing #17"
          },
          {
            "id" : 55,
            "name" : "DUKA Motor Racing #36"
          },
          {
            "id" : 56,
            "name" : "DUKA Motor Racing #37"
          },
          {
            "id" : 57,
            "name" : "Jennkins Rallycross #46"
          },
          {
            "id" : 58,
            "name" : "Jennkins Rallycross #47"
          },
          {
            "id" : 59,
            "name" : "Team Britgens RX #33"
          },
          {
            "id" : 60,
            "name" : "Team Britgens RX #34"
          },
          {
            "id" : 61,
            "name" : "Almynec Racing #55"
          },
          {
            "id" : 62,
            "name" : "Almynec Racing #56"
          },
          {
            "id" : 63,
            "name" : "BNS Birdia Team #42"
          },
          {
            "id" : 64,
            "name" : "BNS Birdia Team #43"
          },
          {
            "id" : 65,
            "name" : "ROTMEG Racing Team #71"
          },
          {
            "id" : 66,
            "name" : "ROTMEG Racing Team #72"
          },
          {
            "id" : 67,
            "name" : "Togussi Motorsport #58"
          },
          {
            "id" : 68,
            "name" : "Togussi Motorsport #59"
          },
          {
            "id" : 69,
            "name" : "Nascalett Racing #27"
          },
          {
            "id" : 70,
            "name" : "Nascalett Racing #28"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "WRX"
      },
      {
        "id" : 578969971,
        "name" : "Lotus Type 49 Cosworth",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Lotus #5"
          },
          {
            "id" : 52,
            "name" : "Team Lotus #6"
          },
          {
            "id" : 53,
            "name" : "Pressburg Motors #1"
          },
          {
            "id" : 54,
            "name" : "Pressburg Motors #2"
          },
          {
            "id" : 55,
            "name" : "Team Mixlub #9"
          },
          {
            "id" : 56,
            "name" : "Team Mixlub #10"
          },
          {
            "id" : 57,
            "name" : "Clark Motorsports #15"
          },
          {
            "id" : 58,
            "name" : "Clark Motorsports #16"
          },
          {
            "id" : 59,
            "name" : "Barron Racing #19"
          },
          {
            "id" : 60,
            "name" : "Barron Racing #20"
          },
          {
            "id" : 61,
            "name" : "Bell Motor Racing Inc. #25"
          },
          {
            "id" : 62,
            "name" : "Bell Motor Racing Inc. #26"
          },
          {
            "id" : 63,
            "name" : "Moll Rennsport #21"
          },
          {
            "id" : 64,
            "name" : "Moll Rennsport #22"
          },
          {
            "id" : 65,
            "name" : "British Racing Services #3"
          },
          {
            "id" : 66,
            "name" : "British Racing Services #4"
          },
          {
            "id" : 67,
            "name" : "Viljoen Motor Racing #11"
          },
          {
            "id" : 68,
            "name" : "Viljoen Motor Racing #12"
          },
          {
            "id" : 69,
            "name" : "Equipe Dambreville #23"
          },
          {
            "id" : 70,
            "name" : "Equipe Dambreville #24"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage F1 C"
      },
      {
        "id" : 647968520,
        "name" : "Ford Focus RS RX",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Hoonigan Racing #13"
          },
          {
            "id" : 52,
            "name" : "Sheriftizer RX Team #43"
          },
          {
            "id" : 53,
            "name" : "Sheriftizer RX Team #44"
          },
          {
            "id" : 54,
            "name" : "Sheriftizer RX Team #45"
          },
          {
            "id" : 55,
            "name" : "Team Viljoen Logistics #77"
          },
          {
            "id" : 56,
            "name" : "Team Viljoen Logistics #78"
          },
          {
            "id" : 57,
            "name" : "EDGE Composites Racing #14"
          },
          {
            "id" : 58,
            "name" : "EDGE Composites Racing #15"
          },
          {
            "id" : 59,
            "name" : "Burnsprings Rally Team #66"
          },
          {
            "id" : 60,
            "name" : "Burnsprings Rally Team #67"
          },
          {
            "id" : 61,
            "name" : "Zavima Motorsport #24"
          },
          {
            "id" : 62,
            "name" : "Zavima Motorsport #25"
          },
          {
            "id" : 63,
            "name" : "Copter2 Racing Team #57"
          },
          {
            "id" : 64,
            "name" : "Copter2 Racing Team #58"
          },
          {
            "id" : 65,
            "name" : "Copter2 Racing Team #59"
          },
          {
            "id" : 66,
            "name" : "Equipe JFB #92"
          },
          {
            "id" : 67,
            "name" : "Equipe JFB #93"
          },
          {
            "id" : 68,
            "name" : "Team Convroo #98"
          },
          {
            "id" : 69,
            "name" : "Team Convroo #99"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "WRX"
      },
      {
        "id" : 675194619,
        "name" : "Caterham SP/300.R",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Caterham #12"
          },
          {
            "id" : 52,
            "name" : "Team Caterham #0"
          },
          {
            "id" : 53,
            "name" : "Garton Racing #46"
          },
          {
            "id" : 54,
            "name" : "Garton Racing #47"
          },
          {
            "id" : 55,
            "name" : "Kerozen Racing #35"
          },
          {
            "id" : 56,
            "name" : "Kerozen Racing #36"
          },
          {
            "id" : 57,
            "name" : "Flatout Alliance #19"
          },
          {
            "id" : 58,
            "name" : "Flatout Alliance #18"
          },
          {
            "id" : 59,
            "name" : "Scuderia Rapa Olio #5"
          },
          {
            "id" : 60,
            "name" : "Scuderia Rapa Olio #6"
          },
          {
            "id" : 61,
            "name" : "Team SRT #102"
          },
          {
            "id" : 62,
            "name" : "Team SRT #101"
          },
          {
            "id" : 63,
            "name" : "Blast Competition #60"
          },
          {
            "id" : 64,
            "name" : "Blast Competition #61"
          },
          {
            "id" : 65,
            "name" : "RSTech5 Racing #108"
          },
          {
            "id" : 66,
            "name" : "RSTech5 Racing #109"
          },
          {
            "id" : 67,
            "name" : "Xtravagance Racing #1"
          },
          {
            "id" : 68,
            "name" : "Xtravagance Racing #2"
          },
          {
            "id" : 69,
            "name" : "RST Motorsport #71"
          },
          {
            "id" : 70,
            "name" : "RST Motorsport #72"
          },
          {
            "id" : 71,
            "name" : "Carbon Cast Racing #37"
          },
          {
            "id" : 72,
            "name" : "Carbon Cast Racing #38"
          },
          {
            "id" : 73,
            "name" : "Cobell Motorsport #66"
          },
          {
            "id" : 74,
            "name" : "Cobell Motorsport #67"
          },
          {
            "id" : 75,
            "name" : "Hillgenman Autosport #116"
          },
          {
            "id" : 76,
            "name" : "Hillgenman Autosport #117"
          },
          {
            "id" : 77,
            "name" : "AQI Racing Team #82"
          },
          {
            "id" : 78,
            "name" : "AQI Racing Team #83"
          },
          {
            "id" : 79,
            "name" : "Lumensi Sport #52"
          },
          {
            "id" : 80,
            "name" : "Lumensi Sport #53"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day B"
      },
      {
        "id" : 696555869,
        "name" : "Ferrari 365 GTB4 Competizione",
        "liveries" : [
          {
            "id" : 51,
            "name" : "North American Racing Team #58"
          },
          {
            "id" : 52,
            "name" : "Scuderia Filipinetti #34"
          },
          {
            "id" : 53,
            "name" : "Scuderia Filipinetti #35"
          },
          {
            "id" : 54,
            "name" : "Ecurie Francorchamps #36"
          },
          {
            "id" : 55,
            "name" : "North American Racing Team #38"
          },
          {
            "id" : 56,
            "name" : "North American Racing Team #74"
          },
          {
            "id" : 57,
            "name" : "Maranello Concessionnaires #37"
          },
          {
            "id" : 58,
            "name" : "Charles Pozzi #39"
          },
          {
            "id" : 59,
            "name" : "Charles Pozzi #75"
          },
          {
            "id" : 60,
            "name" : "Ecurie Francorchamps #34"
          },
          {
            "id" : 61,
            "name" : "N.A.R.T. #37"
          },
          {
            "id" : 62,
            "name" : "N.A.R.T. #38"
          },
          {
            "id" : 63,
            "name" : "Automobiles Charles Pozzi #39"
          },
          {
            "id" : 64,
            "name" : "Automobiles Charles Pozzi #40"
          },
          {
            "id" : 65,
            "name" : "North American Racing Team #54"
          },
          {
            "id" : 66,
            "name" : "North American Racing Team #55"
          },
          {
            "id" : 67,
            "name" : "North American Racing Team #56"
          },
          {
            "id" : 68,
            "name" : "Raymond Touroul #71"
          },
          {
            "id" : 69,
            "name" : "Ecurie Francorchamps #47"
          },
          {
            "id" : 70,
            "name" : "Team Castrol GTX #18"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : 728095309,
        "name" : "Chevrolet Camaro Z/28 '69 TransAm",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Penske-Hilton Racing #6"
          },
          {
            "id" : 52,
            "name" : "Penske-Hilton Racing #9"
          },
          {
            "id" : 53,
            "name" : "Klerbei Autosport #43"
          },
          {
            "id" : 54,
            "name" : "Klerbei Autosport #44"
          },
          {
            "id" : 55,
            "name" : "Jack Tirbnos Auto Repairs #11"
          },
          {
            "id" : 56,
            "name" : "Jack Tirbnos Auto Repairs #12"
          },
          {
            "id" : 57,
            "name" : "Falta Racing #62"
          },
          {
            "id" : 58,
            "name" : "Falta Racing #63"
          },
          {
            "id" : 59,
            "name" : "Ringley Motors #22"
          },
          {
            "id" : 60,
            "name" : "Ringley Motors #23"
          },
          {
            "id" : 61,
            "name" : "Lubrace/Zectrol Racing #26"
          },
          {
            "id" : 62,
            "name" : "Lubrace/Zectrol Racing #27"
          },
          {
            "id" : 63,
            "name" : "Arnao Racing Team #92"
          },
          {
            "id" : 64,
            "name" : "Arnao Racing Team #93"
          },
          {
            "id" : 65,
            "name" : "Keaveneys Motor Racing #55"
          },
          {
            "id" : 66,
            "name" : "Keaveneys Motor Racing #56"
          },
          {
            "id" : 67,
            "name" : "All American Motors #31"
          },
          {
            "id" : 68,
            "name" : "All American Motors #32"
          },
          {
            "id" : 69,
            "name" : "CS Motor Racing #74"
          },
          {
            "id" : 70,
            "name" : "CS Motor Racing #75"
          },
          {
            "id" : 71,
            "name" : "Mooneyes Racing #77"
          },
          {
            "id" : 72,
            "name" : "Mooneyes Racing #78"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : 728234598,
        "name" : "Acura NSX",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Valencia Red Pearl"
          },
          {
            "id" : 2,
            "name" : "130R White"
          },
          {
            "id" : 3,
            "name" : "Berlina Black"
          },
          {
            "id" : 4,
            "name" : "Curva Red"
          },
          {
            "id" : 5,
            "name" : "Nouvelle Blue Pearl"
          },
          {
            "id" : 6,
            "name" : "Nord Gray Metallic"
          },
          {
            "id" : 7,
            "name" : "Source Silver Metallic"
          },
          {
            "id" : 8,
            "name" : "Casino White Pearl"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : 754463374,
        "name" : "Ferrari 488 Challenge (APAC)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Ferrari Hong Kong #4"
          },
          {
            "id" : 52,
            "name" : "Rosso Scuderia Tokyo #7"
          },
          {
            "id" : 53,
            "name" : "Autostrada Motore Manila #12"
          },
          {
            "id" : 54,
            "name" : "M Auto Hiroshima #24"
          },
          {
            "id" : 55,
            "name" : "CTF Beijing #39"
          },
          {
            "id" : 56,
            "name" : "Ital Auto Shanghai #48"
          },
          {
            "id" : 57,
            "name" : "CTF Beijing #68"
          },
          {
            "id" : 58,
            "name" : "Naza Italia Malaysia #69"
          },
          {
            "id" : 59,
            "name" : "Modena Motori Taiwan #88"
          },
          {
            "id" : 60,
            "name" : "Denker Guangzhou #100"
          },
          {
            "id" : 61,
            "name" : "Denker Guangzhou #108"
          },
          {
            "id" : 62,
            "name" : "Cornes Nagoya #123"
          },
          {
            "id" : 63,
            "name" : "Continental Cars NZ #149"
          },
          {
            "id" : 64,
            "name" : "Modena Motori Taiwan #158"
          },
          {
            "id" : 65,
            "name" : "CTF Beijing #168"
          },
          {
            "id" : 66,
            "name" : "Ferrari Hong Kong #179"
          },
          {
            "id" : 67,
            "name" : "Ital Auto Singapore #288"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Ferrari Series"
      },
      {
        "id" : 761457895,
        "name" : "KTM X-Bow R",
        "liveries" : [
          {
            "id" : 51,
            "name" : "X-Bow R Design"
          },
          {
            "id" : 65,
            "name" : "Machuca #1"
          },
          {
            "id" : 53,
            "name" : "Classic Livery #30"
          },
          {
            "id" : 54,
            "name" : "Borda Racing #28"
          },
          {
            "id" : 55,
            "name" : "RST #18"
          },
          {
            "id" : 56,
            "name" : "VittR Motorsport #73"
          },
          {
            "id" : 57,
            "name" : "Tribute #13"
          },
          {
            "id" : 58,
            "name" : "Roboil #61"
          },
          {
            "id" : 59,
            "name" : "Bersmann #14"
          },
          {
            "id" : 60,
            "name" : "Great White #14"
          },
          {
            "id" : 61,
            "name" : "Stargenley #6"
          },
          {
            "id" : 62,
            "name" : "Purple #8"
          },
          {
            "id" : 63,
            "name" : "Yellow #8"
          },
          {
            "id" : 64,
            "name" : "Kortex Sport #22"
          },
          {
            "id" : 52,
            "name" : "RST #25"
          },
          {
            "id" : 66,
            "name" : "OCH Racing #7"
          },
          {
            "id" : 67,
            "name" : "Machuca #8"
          },
          {
            "id" : 68,
            "name" : "VittR Motorsport Blue #86"
          },
          {
            "id" : 69,
            "name" : "Roboil #99"
          },
          {
            "id" : 70,
            "name" : "Hallbot #71"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road D"
      },
      {
        "id" : 779111340,
        "name" : "BMW 320 Turbo Group 5",
        "liveries" : [
          {
            "id" : 51,
            "name" : "BMW Junior Team #11"
          },
          {
            "id" : 52,
            "name" : "BMW Junior Team #12"
          },
          {
            "id" : 53,
            "name" : "BMW Junior Team #13"
          },
          {
            "id" : 54,
            "name" : "Equipe Dambreville #3"
          },
          {
            "id" : 55,
            "name" : "Equipe Dambreville #4"
          },
          {
            "id" : 56,
            "name" : "Stetz + Grindner Racing #32"
          },
          {
            "id" : 57,
            "name" : "Stetz + Grindner Racing #33"
          },
          {
            "id" : 58,
            "name" : "Liezenbach Motorport #14"
          },
          {
            "id" : 59,
            "name" : "Liezenbach Motorport #15"
          },
          {
            "id" : 60,
            "name" : "Gerhardt Electronics Team #18"
          },
          {
            "id" : 61,
            "name" : "Gerhardt Electronics Team #19"
          },
          {
            "id" : 62,
            "name" : "Gerstenfelder Rennsport #21"
          },
          {
            "id" : 63,
            "name" : "Gerstenfelder Rennsport #22"
          },
          {
            "id" : 64,
            "name" : "Kolomiets Sport #47"
          },
          {
            "id" : 65,
            "name" : "Kolomiets Sport #48"
          },
          {
            "id" : 66,
            "name" : "Rexxar Team #49"
          },
          {
            "id" : 67,
            "name" : "Rexxar Team #51"
          },
          {
            "id" : 68,
            "name" : "GJL Racing Team #54"
          },
          {
            "id" : 69,
            "name" : "GJL Racing Team #57"
          },
          {
            "id" : 70,
            "name" : "GJL Racing Team #56"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 5"
      },
      {
        "id" : 809291220,
        "name" : "Porsche 911 GT3 R",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche Racing #911"
          },
          {
            "id" : 52,
            "name" : "Porsche Racing #912"
          },
          {
            "id" : 53,
            "name" : "Wright Motorsports #16"
          },
          {
            "id" : 54,
            "name" : "Wright Motorsports #58"
          },
          {
            "id" : 55,
            "name" : "GMG Racing #14"
          },
          {
            "id" : 56,
            "name" : "GMG Racing #17"
          },
          {
            "id" : 57,
            "name" : "Gainsco Bob Stallings #99"
          },
          {
            "id" : 58,
            "name" : "Calvert Dynamics #76"
          },
          {
            "id" : 59,
            "name" : "Calvert Dynamics #77"
          },
          {
            "id" : 60,
            "name" : "Shield Motorsport #61"
          },
          {
            "id" : 61,
            "name" : "Shield Motorsport #62"
          },
          {
            "id" : 62,
            "name" : "Machuca Motorsport #119"
          },
          {
            "id" : 63,
            "name" : "Machuca Motorsport #120"
          },
          {
            "id" : 64,
            "name" : "S+A Racing Team #182"
          },
          {
            "id" : 65,
            "name" : "S+A Racing Team #183"
          },
          {
            "id" : 66,
            "name" : "S+A Racing Team #184"
          },
          {
            "id" : 67,
            "name" : "BAM eSport #90"
          },
          {
            "id" : 68,
            "name" : "BAM eSport #91"
          },
          {
            "id" : 69,
            "name" : "Virtual Drivers by TX3 #85"
          },
          {
            "id" : 70,
            "name" : "Virtual Drivers by TX3 #86"
          },
          {
            "id" : 71,
            "name" : "Japspeed #27"
          },
          {
            "id" : 72,
            "name" : "Japspeed #28"
          },
          {
            "id" : 73,
            "name" : "Euronics Gaming #17"
          },
          {
            "id" : 74,
            "name" : "Euronics Gaming #18"
          },
          {
            "id" : 75,
            "name" : "Team Highlands Racing #713"
          },
          {
            "id" : 76,
            "name" : "Team Highlands Racing #773"
          },
          {
            "id" : 77,
            "name" : "PCCF Community Events Online #19"
          },
          {
            "id" : 78,
            "name" : "PCCF Community Events Online #20"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 820529698,
        "name" : "Ligier JS P2 Nissan",
        "liveries" : [
          {
            "id" : 51,
            "name" : "RGR Sport #43"
          },
          {
            "id" : 52,
            "name" : "OAK Racing #35"
          },
          {
            "id" : 53,
            "name" : "Onroak Automotive #0"
          },
          {
            "id" : 54,
            "name" : "KMAX Motorsports #11"
          },
          {
            "id" : 55,
            "name" : "KMAX Motorsports #12"
          },
          {
            "id" : 56,
            "name" : "NVRR Racing Team #2"
          },
          {
            "id" : 57,
            "name" : "NVRR Racing Team #3"
          },
          {
            "id" : 58,
            "name" : "Cobell Motorsport #50"
          },
          {
            "id" : 59,
            "name" : "Cobell Motorsport #51"
          },
          {
            "id" : 60,
            "name" : "Virtual Drivers by TX3 #42"
          },
          {
            "id" : 61,
            "name" : "Virtual Drivers by TX3 #44"
          },
          {
            "id" : 62,
            "name" : "Team Redline #68"
          },
          {
            "id" : 63,
            "name" : "Team Redline #69"
          },
          {
            "id" : 64,
            "name" : "eSports + Cars #23"
          },
          {
            "id" : 65,
            "name" : "VP-Gaming.de #08"
          },
          {
            "id" : 66,
            "name" : "VP-Gaming.de #09"
          },
          {
            "id" : 67,
            "name" : "F4H Motorsport #16"
          },
          {
            "id" : 68,
            "name" : "F4H Motorsport #17"
          },
          {
            "id" : 69,
            "name" : "Team ACR #8"
          },
          {
            "id" : 70,
            "name" : "Team ACR #9"
          },
          {
            "id" : 71,
            "name" : "PCCF Community Events Online #19"
          },
          {
            "id" : 72,
            "name" : "PCCF Community Events Online #20"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP2"
      },
      {
        "id" : 844159614,
        "name" : "Kart",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Mudino #4"
          },
          {
            "id" : 52,
            "name" : "Luquitas #11"
          },
          {
            "id" : 53,
            "name" : "Project CARS #14"
          },
          {
            "id" : 54,
            "name" : "Tex Racing #10"
          },
          {
            "id" : 55,
            "name" : "RS Motorsport #29"
          },
          {
            "id" : 56,
            "name" : "KOMO Corse #18"
          },
          {
            "id" : 57,
            "name" : "G+Z Motorsport #23"
          },
          {
            "id" : 58,
            "name" : "Bad Sauna #21"
          },
          {
            "id" : 59,
            "name" : "Turbo-Motors #42"
          },
          {
            "id" : 60,
            "name" : "Nitroniumx #83"
          },
          {
            "id" : 61,
            "name" : "Rosso+Bianco #14"
          },
          {
            "id" : 62,
            "name" : "Dibleys #12"
          },
          {
            "id" : 63,
            "name" : "Team Zenon #25"
          },
          {
            "id" : 64,
            "name" : "Harden #8"
          },
          {
            "id" : 65,
            "name" : "Adrenaline #53"
          },
          {
            "id" : 66,
            "name" : "Wester #74"
          },
          {
            "id" : 67,
            "name" : "Bellflex #17"
          },
          {
            "id" : 68,
            "name" : "Demonio #22"
          },
          {
            "id" : 69,
            "name" : "Runner #99"
          },
          {
            "id" : 70,
            "name" : "Viktoria #71"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Kart1"
      },
      {
        "id" : 851491257,
        "name" : "Ford Fusion Stockcar",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Shalstrone Systems #1"
          },
          {
            "id" : 52,
            "name" : "Flynn Motorsports#2"
          },
          {
            "id" : 53,
            "name" : "Elbregsen Suspension #3"
          },
          {
            "id" : 54,
            "name" : "Cash Now #4"
          },
          {
            "id" : 55,
            "name" : "Aotech Green Racing #9"
          },
          {
            "id" : 56,
            "name" : "Garton #10"
          },
          {
            "id" : 57,
            "name" : "Team Sheriftizer #11"
          },
          {
            "id" : 58,
            "name" : "Besmone Motorsport #12"
          },
          {
            "id" : 59,
            "name" : "Bubblifresh #14"
          },
          {
            "id" : 60,
            "name" : "Franic Burgers #15"
          },
          {
            "id" : 61,
            "name" : "Mudino #16"
          },
          {
            "id" : 62,
            "name" : "El Perro Encendido #17"
          },
          {
            "id" : 63,
            "name" : "Cherry Shocks #18"
          },
          {
            "id" : 64,
            "name" : "Horbsner Automotive #19"
          },
          {
            "id" : 65,
            "name" : "Team Rexergie #21"
          },
          {
            "id" : 66,
            "name" : "Archi Jeans #22"
          },
          {
            "id" : 67,
            "name" : "Air Bubbles #24"
          },
          {
            "id" : 68,
            "name" : "Keaveneys #27"
          },
          {
            "id" : 69,
            "name" : "Wester Radiators #29"
          },
          {
            "id" : 70,
            "name" : "Roboil Motorsport #32"
          },
          {
            "id" : 71,
            "name" : "Rexxar Outdoor Store #33"
          },
          {
            "id" : 72,
            "name" : "Casey Cars #38"
          },
          {
            "id" : 73,
            "name" : "Team PAIS Automotive #41"
          },
          {
            "id" : 74,
            "name" : "JonZ Movies #42"
          },
          {
            "id" : 75,
            "name" : "Team Tool Safe #44"
          },
          {
            "id" : 76,
            "name" : "Houba Chips #45"
          },
          {
            "id" : 77,
            "name" : "Vollmer Motor Racing #46"
          },
          {
            "id" : 78,
            "name" : "Team Rapa Olio #47"
          },
          {
            "id" : 79,
            "name" : "Zipanol Racing #50"
          },
          {
            "id" : 80,
            "name" : "Copter2 Motor Oil #51"
          },
          {
            "id" : 81,
            "name" : "Bellflex Motorsport #55"
          },
          {
            "id" : 82,
            "name" : "Nextrako Team #60"
          },
          {
            "id" : 83,
            "name" : "Brewster Computer Systems #63"
          },
          {
            "id" : 84,
            "name" : "Team CardMeg Global #65"
          },
          {
            "id" : 85,
            "name" : "Casino #66"
          },
          {
            "id" : 86,
            "name" : "Dambreville #70"
          },
          {
            "id" : 87,
            "name" : "Curtis Motor Racing #74"
          },
          {
            "id" : 88,
            "name" : "Team Lonzandler #77"
          },
          {
            "id" : 89,
            "name" : "Jerry Motosports #82"
          },
          {
            "id" : 90,
            "name" : "Kings Racing Team #83"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Modern Stockcar"
      },
      {
        "id" : 951815226,
        "name" : "Honda Civic Coupé GRC",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Honda Red Bull OMSE #31"
          },
          {
            "id" : 52,
            "name" : "Honda Red Bull OMSE #93"
          },
          {
            "id" : 53,
            "name" : "Honda Red Bull OMSE #24"
          },
          {
            "id" : 54,
            "name" : "Honda Red Bull OMSE 2017 #24"
          },
          {
            "id" : 55,
            "name" : "Honda Red Bull OMSE 2017 #93"
          },
          {
            "id" : 56,
            "name" : "Honda Red Bull OMSE 2017 #16"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "WRX"
      },
      {
        "id" : 957632269,
        "name" : "Porsche 962C",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche AG Racing #1"
          },
          {
            "id" : 52,
            "name" : "Porsche AG Racing #2"
          },
          {
            "id" : 53,
            "name" : "Porsche AG Blaupunkt #1"
          },
          {
            "id" : 54,
            "name" : "Porsche AG Shell/Dunlop #17"
          },
          {
            "id" : 55,
            "name" : "Dunlop/Porsche PDK #17"
          },
          {
            "id" : 56,
            "name" : "Joest Racing Autoglass #17"
          },
          {
            "id" : 57,
            "name" : "Joest Racing Autoglass #7"
          },
          {
            "id" : 58,
            "name" : "Blaupunkt Joest Racing #7"
          },
          {
            "id" : 59,
            "name" : "Blaupunkt Joest Racing #8"
          },
          {
            "id" : 60,
            "name" : "Joest Racing taka-Q #7"
          },
          {
            "id" : 61,
            "name" : "Joest Racing taka-Q #8"
          },
          {
            "id" : 62,
            "name" : "Joest Racing Gemini #7"
          },
          {
            "id" : 63,
            "name" : "Brun Motorsport #18"
          },
          {
            "id" : 64,
            "name" : "Porsche Kremer Racing #9"
          },
          {
            "id" : 65,
            "name" : "Brun Motorsport #1"
          },
          {
            "id" : 66,
            "name" : "Advan Alpha Nova #1"
          },
          {
            "id" : 67,
            "name" : "Advan Alpha Nova #25"
          },
          {
            "id" : 68,
            "name" : "Trust Racing Team #99"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group C1"
      },
      {
        "id" : 975104023,
        "name" : "BMW V12 LMR",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team BMW Motorsport #15"
          },
          {
            "id" : 52,
            "name" : "Team BMW Motorsport #17"
          },
          {
            "id" : 53,
            "name" : "Horbsner Automotive #11"
          },
          {
            "id" : 54,
            "name" : "Horbsner Automotive #12"
          },
          {
            "id" : 55,
            "name" : "Horbsner Automotive #13"
          },
          {
            "id" : 56,
            "name" : "Cachetto Racing #28"
          },
          {
            "id" : 57,
            "name" : "Cachetto Racing #29"
          },
          {
            "id" : 58,
            "name" : "Keaveneys Motorsport #30"
          },
          {
            "id" : 59,
            "name" : "Keaveneys Motorsport #31"
          },
          {
            "id" : 60,
            "name" : "Volkane Motorsport #35"
          },
          {
            "id" : 61,
            "name" : "Volkane Motorsport #36"
          },
          {
            "id" : 62,
            "name" : "Four C Sport #38"
          },
          {
            "id" : 63,
            "name" : "Four C Sport #39"
          },
          {
            "id" : 64,
            "name" : "Sciflex Team #3"
          },
          {
            "id" : 65,
            "name" : "Sciflex Team #4"
          },
          {
            "id" : 66,
            "name" : "Tashimo Motorsport #20"
          },
          {
            "id" : 67,
            "name" : "Tashimo Motorsport #21"
          },
          {
            "id" : 68,
            "name" : "Mensik Racing #45"
          },
          {
            "id" : 69,
            "name" : "Mensik Racing #46"
          },
          {
            "id" : 70,
            "name" : "Team Imochi #50"
          },
          {
            "id" : 71,
            "name" : "Team Imochi #51"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP900"
      },
      {
        "id" : 980572679,
        "name" : "McLaren 570S",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Ventura Orange"
          },
          {
            "id" : 2,
            "name" : "White"
          },
          {
            "id" : 3,
            "name" : "Blue"
          },
          {
            "id" : 4,
            "name" : "Silver"
          },
          {
            "id" : 5,
            "name" : "Pearl White"
          },
          {
            "id" : 6,
            "name" : "Ice Silver"
          },
          {
            "id" : 7,
            "name" : "Fire Black"
          },
          {
            "id" : 8,
            "name" : "Volcano Orange"
          },
          {
            "id" : 9,
            "name" : "Volcano Yellow"
          },
          {
            "id" : 10,
            "name" : "Vermillion Red"
          },
          {
            "id" : 11,
            "name" : "Bourbon"
          },
          {
            "id" : 12,
            "name" : "McLaren Orange"
          },
          {
            "id" : 13,
            "name" : "Storm Grey"
          },
          {
            "id" : 14,
            "name" : "Mantis Green"
          },
          {
            "id" : 15,
            "name" : "Blade Silver"
          },
          {
            "id" : 16,
            "name" : "Onyx Black"
          },
          {
            "id" : 17,
            "name" : "Pacific"
          },
          {
            "id" : 18,
            "name" : "Cobalt Violet"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : 987814806,
        "name" : "Bentley Continental GT3 (2015)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Bentley Team M-Sport #7"
          },
          {
            "id" : 52,
            "name" : "Bentley Team M-Sport #8"
          },
          {
            "id" : 53,
            "name" : "Dyson Racing Team Bentley #16"
          },
          {
            "id" : 54,
            "name" : "Dyson Racing Team Bentley #20"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 998894988,
        "name" : "Audi R8 LMS Endurance",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Audi Sport Team Phoenix #1"
          },
          {
            "id" : 52,
            "name" : "Audi Sport Team Phoenix #4"
          },
          {
            "id" : 53,
            "name" : "Audi Sport Team WRT #28"
          },
          {
            "id" : 54,
            "name" : "Audi Sport Team WRT #29"
          },
          {
            "id" : 55,
            "name" : "Audi Sport Team WRT #1"
          },
          {
            "id" : 56,
            "name" : "Audi Sport Team WRT #2"
          },
          {
            "id" : 57,
            "name" : "Audi Sport Team Phoenix #6"
          },
          {
            "id" : 58,
            "name" : "Audi Sport Team WRT 2016 #28"
          },
          {
            "id" : 59,
            "name" : "Audi Sport Team Phoenix 16 #6"
          },
          {
            "id" : 60,
            "name" : "McCann Racing #82"
          },
          {
            "id" : 61,
            "name" : "Simplay Racing Team #79"
          },
          {
            "id" : 62,
            "name" : "Simplay Racing Team #80"
          },
          {
            "id" : 63,
            "name" : "S+A Racing Team #59"
          },
          {
            "id" : 64,
            "name" : "S+A Racing Team #60"
          },
          {
            "id" : 65,
            "name" : "Demonio Racing #48"
          },
          {
            "id" : 66,
            "name" : "Demonio Racing #49"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 998947753,
        "name" : "Mitsubishi Lancer Evolution X FQ400",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Octane Blue Pearl"
          },
          {
            "id" : 2,
            "name" : "Apex Silver Metallic"
          },
          {
            "id" : 3,
            "name" : "Graphite Grey Pearl"
          },
          {
            "id" : 4,
            "name" : "Phantom Black Pearl"
          },
          {
            "id" : 5,
            "name" : "Rally Red Metallic"
          },
          {
            "id" : 6,
            "name" : "Wicked White"
          },
          {
            "id" : 51,
            "name" : "Tashimo Motorsport"
          },
          {
            "id" : 52,
            "name" : "Huntclub v1"
          },
          {
            "id" : 53,
            "name" : "Gino Dialasetti"
          },
          {
            "id" : 54,
            "name" : "RST"
          },
          {
            "id" : 55,
            "name" : "Chrome"
          },
          {
            "id" : 56,
            "name" : "Bersmann"
          },
          {
            "id" : 57,
            "name" : "Ralli Smart"
          },
          {
            "id" : 58,
            "name" : "Huntclub v2"
          },
          {
            "id" : 59,
            "name" : "Miky Jhon Special Tuning"
          },
          {
            "id" : 60,
            "name" : "Subtle dark"
          },
          {
            "id" : 61,
            "name" : "Xtremeic"
          },
          {
            "id" : 62,
            "name" : "Ralli Smart Red Edition"
          },
          {
            "id" : 63,
            "name" : "SRT Racing"
          },
          {
            "id" : 64,
            "name" : "Bersmann SMS Tribute"
          },
          {
            "id" : 65,
            "name" : "Yirotires Motorsport #33"
          },
          {
            "id" : 66,
            "name" : "Kerozen Racing"
          },
          {
            "id" : 67,
            "name" : "Street Morgan"
          },
          {
            "id" : 68,
            "name" : "Glerstone"
          },
          {
            "id" : 69,
            "name" : "Runforged"
          },
          {
            "id" : 70,
            "name" : "MIB Racing"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road E"
      },
      {
        "id" : 1015579264,
        "name" : "Ferrari F40 LM",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team France #40"
          },
          {
            "id" : 52,
            "name" : "Team France #60"
          },
          {
            "id" : 53,
            "name" : "Strandell/Obermaier Racing #29"
          },
          {
            "id" : 54,
            "name" : "Club Italia #40"
          },
          {
            "id" : 55,
            "name" : "Club Italia #61"
          },
          {
            "id" : 56,
            "name" : "Pilot Aldix Racing #34"
          },
          {
            "id" : 57,
            "name" : "Pilot Aldix Racing #40"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTO"
      },
      {
        "id" : 1061494025,
        "name" : "Lotus Type 49C Cosworth",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Lotus #2"
          },
          {
            "id" : 52,
            "name" : "Team Lotus #3"
          },
          {
            "id" : 53,
            "name" : "Tate Racing Team #10"
          },
          {
            "id" : 54,
            "name" : "Tate Racing Team #11"
          },
          {
            "id" : 55,
            "name" : "Equipe Dambreville #22"
          },
          {
            "id" : 56,
            "name" : "Equipe Dambreville #23"
          },
          {
            "id" : 57,
            "name" : "Bell Motors #6"
          },
          {
            "id" : 58,
            "name" : "Bell Motors #7"
          },
          {
            "id" : 59,
            "name" : "Morrish Racing #4"
          },
          {
            "id" : 60,
            "name" : "Morrish Racing #5"
          },
          {
            "id" : 61,
            "name" : "Alexandre Auto Sports #15"
          },
          {
            "id" : 62,
            "name" : "Alexandre Auto Sports #19"
          },
          {
            "id" : 63,
            "name" : "Boland Motorsport #24"
          },
          {
            "id" : 64,
            "name" : "Boland Motorsport #25"
          },
          {
            "id" : 65,
            "name" : "Team Curtis Sport #20"
          },
          {
            "id" : 66,
            "name" : "Team Curtis Sport #21"
          },
          {
            "id" : 67,
            "name" : "Arnao Motor Services #30"
          },
          {
            "id" : 68,
            "name" : "Arnao Motor Services #31"
          },
          {
            "id" : 69,
            "name" : "Ringley Racing Team #8"
          },
          {
            "id" : 70,
            "name" : "Ringley Racing Team #9"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage F1 C"
      },
      {
        "id" : 1076438091,
        "name" : "Porsche 911 GT1-98",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche AG #25"
          },
          {
            "id" : 52,
            "name" : "Porsche AG #26"
          },
          {
            "id" : 53,
            "name" : "Porsche AG #7"
          },
          {
            "id" : 54,
            "name" : "Porsche AG #8"
          },
          {
            "id" : 55,
            "name" : "Zakspeed Racing #5"
          },
          {
            "id" : 56,
            "name" : "Zakspeed Racing #6"
          },
          {
            "id" : 57,
            "name" : "Zakspeed Racing White #5"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT1"
      },
      {
        "id" : 1083119012,
        "name" : "Toyota TS050 Hybrid",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Toyota Gazoo Racing #5"
          },
          {
            "id" : 52,
            "name" : "Toyota Gazoo Racing #6"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP1 2016"
      },
      {
        "id" : 1106819298,
        "name" : "McLaren 720S",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Argon"
          },
          {
            "id" : 2,
            "name" : "Pearl White"
          },
          {
            "id" : 3,
            "name" : "Bourbon"
          },
          {
            "id" : 4,
            "name" : "Aurora Blue"
          },
          {
            "id" : 5,
            "name" : "Volcano Yellow"
          },
          {
            "id" : 6,
            "name" : "Solis"
          },
          {
            "id" : 7,
            "name" : "Cosmos"
          },
          {
            "id" : 8,
            "name" : "Saros Grey"
          },
          {
            "id" : 9,
            "name" : "Glacier White"
          },
          {
            "id" : 10,
            "name" : "Silica White"
          },
          {
            "id" : 11,
            "name" : "Blade Silver"
          },
          {
            "id" : 12,
            "name" : "Storm Grey"
          },
          {
            "id" : 13,
            "name" : "Onyx Black"
          },
          {
            "id" : 14,
            "name" : "McLaren Orange"
          },
          {
            "id" : 15,
            "name" : "Memphis Red"
          },
          {
            "id" : 16,
            "name" : "Azores"
          },
          {
            "id" : 17,
            "name" : "Quartz"
          },
          {
            "id" : 18,
            "name" : "Blue"
          },
          {
            "id" : 19,
            "name" : "White"
          },
          {
            "id" : 20,
            "name" : "Silver"
          },
          {
            "id" : 21,
            "name" : "Project CARS Camouflage"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road A"
      },
      {
        "id" : 1111049682,
        "name" : "Ford Mustang Boss 302R",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Kerozen Racing #115"
          },
          {
            "id" : 52,
            "name" : "Kerozen Racing #116"
          },
          {
            "id" : 53,
            "name" : "Team Montgolfier #85"
          },
          {
            "id" : 54,
            "name" : "Team Montgolfier #86"
          },
          {
            "id" : 55,
            "name" : "Stargenley Racing #93"
          },
          {
            "id" : 56,
            "name" : "Stargenley Racing #94"
          },
          {
            "id" : 57,
            "name" : "Adrenaline Motorsport #72"
          },
          {
            "id" : 58,
            "name" : "Adrenaline Motorsport #73"
          },
          {
            "id" : 59,
            "name" : "Kortex Racing #103"
          },
          {
            "id" : 60,
            "name" : "Kortex Racing #104"
          },
          {
            "id" : 61,
            "name" : "KAPP Motorsport #139"
          },
          {
            "id" : 62,
            "name" : "KAPP Motorsport #140"
          },
          {
            "id" : 63,
            "name" : "Substance Racing Team #127"
          },
          {
            "id" : 64,
            "name" : "Substance Racing Team #128"
          },
          {
            "id" : 65,
            "name" : "Tiger Energy Team #42"
          },
          {
            "id" : 66,
            "name" : "Tiger Energy Team #43"
          },
          {
            "id" : 67,
            "name" : "Pinn Electron Racing #121"
          },
          {
            "id" : 68,
            "name" : "Pinn Electron Racing #122"
          },
          {
            "id" : 69,
            "name" : "Mist Engineering #8"
          },
          {
            "id" : 70,
            "name" : "Mist Engineering #9"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT4"
      },
      {
        "id" : 1137321511,
        "name" : "RWD P30 LMP1",
        "liveries" : [
          {
            "id" : 51,
            "name" : "RWD Motorsports #98"
          },
          {
            "id" : 52,
            "name" : "RWD Motorsports #99"
          },
          {
            "id" : 53,
            "name" : "Scuderia Rapa #62"
          },
          {
            "id" : 54,
            "name" : "Scuderia Rapa #63"
          },
          {
            "id" : 55,
            "name" : "Vulcan Racing #5"
          },
          {
            "id" : 56,
            "name" : "Vulcan Racing #6"
          },
          {
            "id" : 57,
            "name" : "Glerstone Motorsport #26"
          },
          {
            "id" : 58,
            "name" : "Glerstone Motorsport #27"
          },
          {
            "id" : 59,
            "name" : "Ya.moto Autosports #25"
          },
          {
            "id" : 60,
            "name" : "Ya.moto Autosports #24"
          },
          {
            "id" : 61,
            "name" : "Jameskett Motorsport #15"
          },
          {
            "id" : 62,
            "name" : "Jameskett Motorsport #16"
          },
          {
            "id" : 63,
            "name" : "Besmone Motorsport #52"
          },
          {
            "id" : 64,
            "name" : "Besmone Motorsport #53"
          },
          {
            "id" : 65,
            "name" : "Marsh Team Racing #41"
          },
          {
            "id" : 66,
            "name" : "Marsh Team Racing #42"
          },
          {
            "id" : 67,
            "name" : "No Regret Racing #72"
          },
          {
            "id" : 68,
            "name" : "No Regret Racing #73"
          },
          {
            "id" : 69,
            "name" : "Hillgenman Auto Services #9"
          },
          {
            "id" : 70,
            "name" : "Hillgenman Auto Services #10"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP1"
      },
      {
        "id" : 1141733552,
        "name" : "Chevrolet Corvette Z06",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Racing Yellow"
          },
          {
            "id" : 2,
            "name" : "Black"
          },
          {
            "id" : 3,
            "name" : "Arctic White"
          },
          {
            "id" : 4,
            "name" : "Torch Red"
          },
          {
            "id" : 5,
            "name" : "Blade Silver Metallic"
          },
          {
            "id" : 6,
            "name" : "Shark Grey Metallic"
          },
          {
            "id" : 7,
            "name" : "Laguna Blue Metallic"
          },
          {
            "id" : 8,
            "name" : "Long Beach Red Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : 1153746660,
        "name" : "McLaren 650S GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "McLaren GT #59"
          },
          {
            "id" : 52,
            "name" : "McLaren GT #60"
          },
          {
            "id" : 53,
            "name" : "K-Pax Racing #6"
          },
          {
            "id" : 54,
            "name" : "K-Pax Racing #9"
          },
          {
            "id" : 55,
            "name" : "K-Pax Racing #13"
          },
          {
            "id" : 56,
            "name" : "Team K-Pax Racing #6"
          },
          {
            "id" : 57,
            "name" : "Team K-Pax Racing #9"
          },
          {
            "id" : 58,
            "name" : "Gainsco Bob Stallings #99"
          },
          {
            "id" : 59,
            "name" : "Garage59 Team #58"
          },
          {
            "id" : 60,
            "name" : "Garage59 Team #59"
          },
          {
            "id" : 61,
            "name" : "Teo Martin Motorsport Team #2"
          },
          {
            "id" : 62,
            "name" : "Teo Martin Motorsport Team #59"
          },
          {
            "id" : 63,
            "name" : "Darrell Lea #37"
          },
          {
            "id" : 64,
            "name" : "Objective Racing #11"
          },
          {
            "id" : 65,
            "name" : "Tekno Autosports #59"
          },
          {
            "id" : 66,
            "name" : "Tekno Autosports #60"
          },
          {
            "id" : 67,
            "name" : "Tekno Autosports #61"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 1161219858,
        "name" : "BMW Z4 GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "BMW Motorsport #19"
          },
          {
            "id" : 52,
            "name" : "BMW Motorsport #20"
          },
          {
            "id" : 53,
            "name" : "Team Russia by Barwell #63"
          },
          {
            "id" : 54,
            "name" : "Team Illocom #131"
          },
          {
            "id" : 55,
            "name" : "Team Illocom #132"
          },
          {
            "id" : 56,
            "name" : "Bilstein Team #72"
          },
          {
            "id" : 57,
            "name" : "Bilstein Team #73"
          },
          {
            "id" : 58,
            "name" : "Aikyo Auto Sport #90"
          },
          {
            "id" : 59,
            "name" : "Aikyo Auto Sport #91"
          },
          {
            "id" : 60,
            "name" : "Xtremeic Racing Team #82"
          },
          {
            "id" : 61,
            "name" : "Xtremeic Racing Team #83"
          },
          {
            "id" : 62,
            "name" : "Team Pirelli #34"
          },
          {
            "id" : 63,
            "name" : "Team Pirelli #35"
          },
          {
            "id" : 64,
            "name" : "Hana Racing #53"
          },
          {
            "id" : 65,
            "name" : "Hana Racing #54"
          },
          {
            "id" : 66,
            "name" : "Keon Motorsport #98"
          },
          {
            "id" : 67,
            "name" : "Keon Motorsport #99"
          },
          {
            "id" : 68,
            "name" : "HR Team #163"
          },
          {
            "id" : 69,
            "name" : "HR Team #164"
          },
          {
            "id" : 70,
            "name" : "KN Team #23"
          },
          {
            "id" : 71,
            "name" : "KN Team #24"
          },
          {
            "id" : 72,
            "name" : "F4H Motorsport #55"
          },
          {
            "id" : 73,
            "name" : "F4H Motorsport #56"
          },
          {
            "id" : 74,
            "name" : "Team ESL #66"
          },
          {
            "id" : 75,
            "name" : "Team ESL #67"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 1162971218,
        "name" : "Lotus Type 38 Ford",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Lotus #82"
          },
          {
            "id" : 52,
            "name" : "Team Lotus #83"
          },
          {
            "id" : 53,
            "name" : "STP Team Lotus #18"
          },
          {
            "id" : 54,
            "name" : "STP Team Lotus #19"
          },
          {
            "id" : 55,
            "name" : "Team Lubrace #4"
          },
          {
            "id" : 56,
            "name" : "Team Lubrace #5"
          },
          {
            "id" : 57,
            "name" : "Zectrol Racing #15"
          },
          {
            "id" : 58,
            "name" : "Zectrol Racing #16"
          },
          {
            "id" : 59,
            "name" : "Team Viljoen Racing #51"
          },
          {
            "id" : 60,
            "name" : "Team Viljoen Racing #52"
          },
          {
            "id" : 61,
            "name" : "Rexxar Team #1"
          },
          {
            "id" : 62,
            "name" : "Rexxar Team #2"
          },
          {
            "id" : 63,
            "name" : "Team Zipanol #8"
          },
          {
            "id" : 64,
            "name" : "Team Zipanol #9"
          },
          {
            "id" : 65,
            "name" : "Hawk Racing Team #44"
          },
          {
            "id" : 66,
            "name" : "Hawk Racing Team #45"
          },
          {
            "id" : 67,
            "name" : "Baretti Racing #6"
          },
          {
            "id" : 68,
            "name" : "Baretti Racing #7"
          },
          {
            "id" : 69,
            "name" : "Parker Enterprises #90"
          },
          {
            "id" : 70,
            "name" : "Parker Enterprises #91"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Indycar"
      },
      {
        "id" : 1187826685,
        "name" : "Jaguar F-Type SVR Coupé",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Ultra Blue"
          },
          {
            "id" : 2,
            "name" : "Caldera Red"
          },
          {
            "id" : 3,
            "name" : "Ammonite Grey"
          },
          {
            "id" : 4,
            "name" : "Glacier White"
          },
          {
            "id" : 5,
            "name" : "Ultimate Black"
          },
          {
            "id" : 6,
            "name" : "Rhodium Silver"
          },
          {
            "id" : 7,
            "name" : "Firesand"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road D"
      },
      {
        "id" : 1213801406,
        "name" : "Porsche 935/80",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Gelo Racing Team #45"
          },
          {
            "id" : 52,
            "name" : "Gelo Racing Team #9"
          },
          {
            "id" : 53,
            "name" : "Vegla Racing Team Joest #63"
          },
          {
            "id" : 54,
            "name" : "Vegla Racing Team Joest #7"
          },
          {
            "id" : 55,
            "name" : "Electrodyne/MOMO #30"
          },
          {
            "id" : 56,
            "name" : "MOMO Racing #30"
          },
          {
            "id" : 57,
            "name" : "MOMO/Kreepy Krauly #30"
          },
          {
            "id" : 58,
            "name" : "MOMO Racing #30 (Daytona)"
          },
          {
            "id" : 59,
            "name" : "Spotoil Racing #67"
          },
          {
            "id" : 60,
            "name" : "Liqui Moly #6"
          },
          {
            "id" : 61,
            "name" : "Liqui Moly #7"
          },
          {
            "id" : 62,
            "name" : "Liqui Moly #2"
          },
          {
            "id" : 63,
            "name" : "DeNarvaez Enterprises #46"
          },
          {
            "id" : 64,
            "name" : "Joest Racing #40"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 5"
      },
      {
        "id" : 1218201782,
        "name" : "Porsche 908/03 Spyder",
        "liveries" : [
          {
            "id" : 51,
            "name" : "J.W. Automotive Gulf Porsche #2"
          },
          {
            "id" : 52,
            "name" : "J.W. Automotive Gulf Porsche #7"
          },
          {
            "id" : 53,
            "name" : "International Porsche Racing Team #4"
          },
          {
            "id" : 54,
            "name" : "International Porsche Racing Team #3"
          },
          {
            "id" : 55,
            "name" : "International Porsche Racing Team #8"
          },
          {
            "id" : 56,
            "name" : "Escuderia Tergal #1"
          },
          {
            "id" : 57,
            "name" : "A.T.E. Team #7"
          },
          {
            "id" : 58,
            "name" : "A.T.E. Team #1"
          },
          {
            "id" : 59,
            "name" : "A.T.E. Team #9"
          },
          {
            "id" : 60,
            "name" : "Reinhold Joest Racing #42"
          },
          {
            "id" : 61,
            "name" : "Reinhold Joest Racing #41"
          },
          {
            "id" : 62,
            "name" : "J.W. Automotive Gulf Porsche #4"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Prototype B"
      },
      {
        "id" : 1219511257,
        "name" : "Audi R18 e-tron quattro (2014)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Audi Sport Team Joest #1"
          },
          {
            "id" : 52,
            "name" : "Audi Sport Team Joest #2"
          },
          {
            "id" : 53,
            "name" : "Audi Sport Team Joest #3"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP1"
      },
      {
        "id" : 1230061845,
        "name" : "Ford Mustang GT",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Race Red"
          },
          {
            "id" : 2,
            "name" : "Competition Orange"
          },
          {
            "id" : 3,
            "name" : "Triple Yellow"
          },
          {
            "id" : 4,
            "name" : "Oxford White"
          },
          {
            "id" : 5,
            "name" : "Black"
          },
          {
            "id" : 6,
            "name" : "Wimbledon White"
          },
          {
            "id" : 7,
            "name" : "Guard Green Metallic"
          },
          {
            "id" : 8,
            "name" : "Deep Impact Blue Metallic"
          },
          {
            "id" : 9,
            "name" : "Magnetic Grey Metallic"
          },
          {
            "id" : 10,
            "name" : "Kona Blue Metallic"
          },
          {
            "id" : 11,
            "name" : "Ruby Red Metallic"
          },
          {
            "id" : 12,
            "name" : "Ingot Silver Metallic"
          },
          {
            "id" : 51,
            "name" : "Black Matte/Yellow Stripes"
          },
          {
            "id" : 52,
            "name" : "Red / Stripes"
          },
          {
            "id" : 53,
            "name" : "Silver Met. / Stripes"
          },
          {
            "id" : 54,
            "name" : "Yellow / Stripes"
          },
          {
            "id" : 55,
            "name" : "White / Stripes"
          },
          {
            "id" : 56,
            "name" : "Blue Met. / Stripes"
          },
          {
            "id" : 57,
            "name" : "Chrome / Stripes"
          },
          {
            "id" : 58,
            "name" : "Green Met./ Stripes"
          },
          {
            "id" : 59,
            "name" : "Yellow Met. / Stripes"
          },
          {
            "id" : 60,
            "name" : "Copper Met."
          },
          {
            "id" : 61,
            "name" : "Black / Stripes"
          },
          {
            "id" : 62,
            "name" : "Orange Met. / Stripes"
          },
          {
            "id" : 63,
            "name" : "Bronze Met. / Stripes"
          },
          {
            "id" : 64,
            "name" : "Emerald Green"
          },
          {
            "id" : 65,
            "name" : "Dark Red / Stripes"
          },
          {
            "id" : 66,
            "name" : "Dark Green Met. / Stripes"
          },
          {
            "id" : 67,
            "name" : "Fluo"
          },
          {
            "id" : 68,
            "name" : "Black / Stripes"
          },
          {
            "id" : 69,
            "name" : "Turquois Met. / Stripes"
          },
          {
            "id" : 70,
            "name" : "Purple Met. / Stripes"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road E"
      },
      {
        "id" : 1231996358,
        "name" : "Radical SR3-RS",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Dominum Musk #3"
          },
          {
            "id" : 52,
            "name" : "Team Dominum Musk #4"
          },
          {
            "id" : 53,
            "name" : "Acesits Racing #8"
          },
          {
            "id" : 54,
            "name" : "Acesits Racing #9"
          },
          {
            "id" : 55,
            "name" : "DKN Springate Racing #27"
          },
          {
            "id" : 56,
            "name" : "DKN Springate Racing #28"
          },
          {
            "id" : 57,
            "name" : "EXTA Racing Team #30"
          },
          {
            "id" : 58,
            "name" : "EXTA Racing Team #31"
          },
          {
            "id" : 59,
            "name" : "B1ZY Motorsports #5"
          },
          {
            "id" : 60,
            "name" : "B1ZY Motorsports #6"
          },
          {
            "id" : 61,
            "name" : "Ankyamo Motorsport #11"
          },
          {
            "id" : 62,
            "name" : "Ankyamo Motorsport #12"
          },
          {
            "id" : 63,
            "name" : "Hallbot Autosports #15"
          },
          {
            "id" : 64,
            "name" : "Hallbot Autosports #16"
          },
          {
            "id" : 65,
            "name" : "Petroblast Racing #23"
          },
          {
            "id" : 66,
            "name" : "Petroblast Racing #24"
          },
          {
            "id" : 67,
            "name" : "Kerosene Motorsport #829"
          },
          {
            "id" : 68,
            "name" : "Kerosene Motorsport #830"
          },
          {
            "id" : 69,
            "name" : "Bilcker Team #1"
          },
          {
            "id" : 70,
            "name" : "Bilcker Team #2"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day B"
      },
      {
        "id" : 1268015922,
        "name" : "Aston Martin Vantage GT12",
        "liveries" : [
          {
            "id" : 51,
            "name" : "White / Orange"
          },
          {
            "id" : 52,
            "name" : "Black / Orange"
          },
          {
            "id" : 53,
            "name" : "Blue Metallic / Orange"
          },
          {
            "id" : 54,
            "name" : "Grey / Yellow"
          },
          {
            "id" : 55,
            "name" : "Green Metallic / Yellow"
          },
          {
            "id" : 56,
            "name" : "Black / Grey"
          },
          {
            "id" : 57,
            "name" : "Orange / White"
          },
          {
            "id" : 58,
            "name" : "Blue / Yellow"
          },
          {
            "id" : 59,
            "name" : "Racing Green / Orange"
          },
          {
            "id" : 60,
            "name" : "Silver Metallic / Yellow"
          },
          {
            "id" : 61,
            "name" : "Lightblue Metallic / Yellow"
          },
          {
            "id" : 62,
            "name" : "Yellow"
          },
          {
            "id" : 63,
            "name" : "Red / White"
          },
          {
            "id" : 64,
            "name" : "Bronze Metallic / Yellow"
          },
          {
            "id" : 65,
            "name" : "Matte Black / Yellow"
          },
          {
            "id" : 66,
            "name" : "White / Yellow"
          },
          {
            "id" : 67,
            "name" : "Matte Grey / Orange"
          },
          {
            "id" : 68,
            "name" : "Brightgreen / Yellow"
          },
          {
            "id" : 69,
            "name" : "Dark Orange Metallic"
          },
          {
            "id" : 70,
            "name" : "Silver Metallic / Orange"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : 1278633095,
        "name" : "Toyota GT-86 Rocket Bunny Street",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Black / Gold"
          },
          {
            "id" : 52,
            "name" : "White / Dark Blue"
          },
          {
            "id" : 53,
            "name" : "Silver Metallic / Black"
          },
          {
            "id" : 54,
            "name" : "Yellow / Black"
          },
          {
            "id" : 55,
            "name" : "Blue Metallic / Orange"
          },
          {
            "id" : 56,
            "name" : "Wine Red Metallic / Gold"
          },
          {
            "id" : 57,
            "name" : "Gold Metallic / Black"
          },
          {
            "id" : 58,
            "name" : "Classic Livery #1"
          },
          {
            "id" : 59,
            "name" : "Classic Livery #2"
          },
          {
            "id" : 60,
            "name" : "Green Metallic / Black"
          },
          {
            "id" : 61,
            "name" : "Blue / Black"
          },
          {
            "id" : 62,
            "name" : "Purple / White"
          },
          {
            "id" : 63,
            "name" : "Classic Livery #3"
          },
          {
            "id" : 64,
            "name" : "Bronze Metallic / Black"
          },
          {
            "id" : 65,
            "name" : "Turquoise / Black"
          },
          {
            "id" : 66,
            "name" : "Dark Orange Metallic / Black"
          },
          {
            "id" : 67,
            "name" : "Night Blue Metallic / Fluo"
          },
          {
            "id" : 68,
            "name" : "Sky Blue Metallic / Blue"
          },
          {
            "id" : 69,
            "name" : "Dark Blue Metallic / Gold"
          },
          {
            "id" : 70,
            "name" : "Yellow Metallic / Black"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : 1317086096,
        "name" : "Ferrari 512 BB LM",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Rennod Racing #46"
          },
          {
            "id" : 52,
            "name" : "Ch. Pozzi Ferrari France #47"
          },
          {
            "id" : 53,
            "name" : "Ch. Pozzi - JMS Racing #75"
          },
          {
            "id" : 54,
            "name" : "Ch. Pozzi - JMS Racing #76"
          },
          {
            "id" : 55,
            "name" : "Ch. Pozzi - JMS Racing #77"
          },
          {
            "id" : 56,
            "name" : "N.A.R.T #64"
          },
          {
            "id" : 57,
            "name" : "Ch. Pozzi Ferrari France #71"
          },
          {
            "id" : 58,
            "name" : "Ch. Pozzi JMS Racing #62"
          },
          {
            "id" : 59,
            "name" : "Ch. Pozzi JMS Racing #63"
          },
          {
            "id" : 60,
            "name" : "EMKA Racing #61"
          },
          {
            "id" : 61,
            "name" : "EMKA Racing #78"
          },
          {
            "id" : 62,
            "name" : "Scuderia Super Car Bellancauto #79"
          },
          {
            "id" : 63,
            "name" : "JMS Racing-Pozzi #66"
          },
          {
            "id" : 64,
            "name" : "JMS Racing-Pozzi #67"
          },
          {
            "id" : 65,
            "name" : "N.A.R.T. #68"
          },
          {
            "id" : 66,
            "name" : "Simmon Phillips #48"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 4"
      },
      {
        "id" : 1319185453,
        "name" : "Porsche 935/77",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche AG #1"
          },
          {
            "id" : 52,
            "name" : "Porsche AG #41"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 5"
      },
      {
        "id" : 1352236476,
        "name" : "RWD P20 LMP2",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Alivstore Motorsports #74"
          },
          {
            "id" : 52,
            "name" : "Alivstore Motorsports #75"
          },
          {
            "id" : 53,
            "name" : "Kratos Auto Racing #67"
          },
          {
            "id" : 54,
            "name" : "Kratos Auto Racing #68"
          },
          {
            "id" : 55,
            "name" : "HFAF Motorsport #29"
          },
          {
            "id" : 56,
            "name" : "HFAF Motorsport #30"
          },
          {
            "id" : 57,
            "name" : "Team Project Cars #40"
          },
          {
            "id" : 58,
            "name" : "Team Project Cars #41"
          },
          {
            "id" : 59,
            "name" : "Petroblast Racing #63"
          },
          {
            "id" : 60,
            "name" : "Petroblast Racing #64"
          },
          {
            "id" : 61,
            "name" : "B1ZY Racing Team #36"
          },
          {
            "id" : 62,
            "name" : "B1ZY Racing Team #37"
          },
          {
            "id" : 63,
            "name" : "Pais Motorsport #52"
          },
          {
            "id" : 64,
            "name" : "Pais Motorsport #53"
          },
          {
            "id" : 65,
            "name" : "BRPS Motor Racing #58"
          },
          {
            "id" : 66,
            "name" : "BRPS Motor Racing #59"
          },
          {
            "id" : 67,
            "name" : "Team Hallbot Racing #86"
          },
          {
            "id" : 68,
            "name" : "Team Hallbot Racing #87"
          },
          {
            "id" : 69,
            "name" : "Egmelt Motorsport #98"
          },
          {
            "id" : 70,
            "name" : "Egmelt Motorsport #99"
          },
          {
            "id" : 71,
            "name" : "Team DKN Springate #92"
          },
          {
            "id" : 72,
            "name" : "Team DKN Springate #93"
          },
          {
            "id" : 73,
            "name" : "Keon Autosports #96"
          },
          {
            "id" : 74,
            "name" : "Keon Autosports #97"
          },
          {
            "id" : 75,
            "name" : "Scuderia Rapa #80"
          },
          {
            "id" : 76,
            "name" : "Scuderia Rapa #81"
          },
          {
            "id" : 77,
            "name" : "Team Redline #88"
          },
          {
            "id" : 78,
            "name" : "Team Redline #89"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP2"
      },
      {
        "id" : 1353949246,
        "name" : "Mercedes-AMG GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Mercedes AMG #1"
          },
          {
            "id" : 52,
            "name" : "Mercedes AMG #16"
          },
          {
            "id" : 53,
            "name" : "Black Falcon Team #4"
          },
          {
            "id" : 54,
            "name" : "Black Falcon Team #9"
          },
          {
            "id" : 55,
            "name" : "HTP Motorsport #84"
          },
          {
            "id" : 56,
            "name" : "HTP Motorsport #85"
          },
          {
            "id" : 57,
            "name" : "HTP Motorsport #86"
          },
          {
            "id" : 58,
            "name" : "Zakspeed Team #75"
          },
          {
            "id" : 59,
            "name" : "Zakspeed Team #1"
          },
          {
            "id" : 60,
            "name" : "Ram Racing Team #30"
          },
          {
            "id" : 61,
            "name" : "Black Swan Racing #54"
          },
          {
            "id" : 62,
            "name" : "CRP Racing #2"
          },
          {
            "id" : 63,
            "name" : "Champ 1 Racing #69"
          },
          {
            "id" : 64,
            "name" : "SPS Performance #24"
          },
          {
            "id" : 65,
            "name" : "SPS Performance #16"
          },
          {
            "id" : 66,
            "name" : "Team Hot Wheels #68"
          },
          {
            "id" : 67,
            "name" : "Team Hot Wheels #71"
          },
          {
            "id" : 68,
            "name" : "Team CashShow #123"
          },
          {
            "id" : 69,
            "name" : "Team CashShow #124"
          },
          {
            "id" : 70,
            "name" : "Velltao Racing Team #141"
          },
          {
            "id" : 71,
            "name" : "Velltao Racing Team #142"
          },
          {
            "id" : 72,
            "name" : "Simmons Motorsport #27"
          },
          {
            "id" : 73,
            "name" : "Simmons Motorsport #36"
          },
          {
            "id" : 74,
            "name" : "Vasmac Racing Team #159"
          },
          {
            "id" : 75,
            "name" : "Vasmac Racing Team #160"
          },
          {
            "id" : 76,
            "name" : "Cerrsoil Motorsports #169"
          },
          {
            "id" : 77,
            "name" : "Cerrsoil Motorsports #170"
          },
          {
            "id" : 78,
            "name" : "Roboil Racing #40"
          },
          {
            "id" : 79,
            "name" : "Roboil Racing #41"
          },
          {
            "id" : 80,
            "name" : "Vensollic Motorsport #189"
          },
          {
            "id" : 81,
            "name" : "Vensollic Motorsport #190"
          },
          {
            "id" : 82,
            "name" : "Project CARS Team #74"
          },
          {
            "id" : 83,
            "name" : "Project CARS Team #75"
          },
          {
            "id" : 84,
            "name" : "Asluco Racing #193"
          },
          {
            "id" : 85,
            "name" : "Asluco Racing #194"
          },
          {
            "id" : 86,
            "name" : "Alpine Eagle Racing #127"
          },
          {
            "id" : 87,
            "name" : "Alpine Eagle Racing #128"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 1356687088,
        "name" : "Pagani Huayra BC",
        "liveries" : [
          {
            "id" : 51,
            "name" : "White / Carbon 1"
          },
          {
            "id" : 52,
            "name" : "Matte Grey Metallic / Carbon"
          },
          {
            "id" : 53,
            "name" : "Carbon / Red"
          },
          {
            "id" : 54,
            "name" : "Blue / Carbon"
          },
          {
            "id" : 55,
            "name" : "Blue Metallic / Carbon"
          },
          {
            "id" : 56,
            "name" : "Purple Metallic / Carbon"
          },
          {
            "id" : 57,
            "name" : "White / Carbon 2"
          },
          {
            "id" : 58,
            "name" : "Blue Carbon"
          },
          {
            "id" : 59,
            "name" : "Silver Metallic / Carbon"
          },
          {
            "id" : 60,
            "name" : "Red Carbon"
          },
          {
            "id" : 61,
            "name" : "Yellow"
          },
          {
            "id" : 62,
            "name" : "Light Blue Metallic"
          },
          {
            "id" : 63,
            "name" : "Supreme Gold"
          },
          {
            "id" : 64,
            "name" : "Dark Grey Carbon"
          },
          {
            "id" : 65,
            "name" : "Bronzo Aymara"
          },
          {
            "id" : 66,
            "name" : "Orange Metallic"
          },
          {
            "id" : 67,
            "name" : "White / Red Carbon"
          },
          {
            "id" : 68,
            "name" : "Red Italia"
          },
          {
            "id" : 69,
            "name" : "DarkGreen Metallic"
          },
          {
            "id" : 70,
            "name" : "Yellow Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road A"
      },
      {
        "id" : 1357515789,
        "name" : "Ford Falcon FG V8 Supercar",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Vasmac Motorsport #1"
          },
          {
            "id" : 52,
            "name" : "Vasmac Motorsport #2"
          },
          {
            "id" : 53,
            "name" : "Team Mondoline #3"
          },
          {
            "id" : 54,
            "name" : "Team Mondoline #4"
          },
          {
            "id" : 55,
            "name" : "Besmone Automotive Team #5"
          },
          {
            "id" : 56,
            "name" : "Besmone Automotive Team #6"
          },
          {
            "id" : 57,
            "name" : "Elbregsen Motorsports #7"
          },
          {
            "id" : 58,
            "name" : "Elbregsen Motorsports #8"
          },
          {
            "id" : 59,
            "name" : "Lumensi Racing #09"
          },
          {
            "id" : 60,
            "name" : "Lumensi Racing #10"
          },
          {
            "id" : 61,
            "name" : "GedK Gloves Team #11"
          },
          {
            "id" : 62,
            "name" : "GedK Gloves Team #12"
          },
          {
            "id" : 63,
            "name" : "Satmel Motor Racing #13"
          },
          {
            "id" : 64,
            "name" : "Satmel Motor Racing #14"
          },
          {
            "id" : 65,
            "name" : "Team Cash Show! #15"
          },
          {
            "id" : 66,
            "name" : "Team Cash Show! #16"
          },
          {
            "id" : 67,
            "name" : "Almynec Racing #77"
          },
          {
            "id" : 68,
            "name" : "Almynec Racing #78"
          },
          {
            "id" : 69,
            "name" : "PAIS Motorsport #51"
          },
          {
            "id" : 70,
            "name" : "PAIS Motorsport #52"
          },
          {
            "id" : 71,
            "name" : "EXTA Racing Inc. #28"
          },
          {
            "id" : 72,
            "name" : "EXTA Racing Inc. #29"
          },
          {
            "id" : 73,
            "name" : "Team Britgens #33"
          },
          {
            "id" : 74,
            "name" : "Team Britgens #34"
          },
          {
            "id" : 75,
            "name" : "Sporddreka Exhaust Systems #47"
          },
          {
            "id" : 76,
            "name" : "Sporddreka Exhaust Systems #48"
          },
          {
            "id" : 77,
            "name" : "Keaveneys Racing #43"
          },
          {
            "id" : 78,
            "name" : "Keaveneys Racing #44"
          },
          {
            "id" : 79,
            "name" : "Sakume Auto Racing #37"
          },
          {
            "id" : 80,
            "name" : "Sakume Auto Racing #38"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "V8 Supercars"
      },
      {
        "id" : 1368036017,
        "name" : "BMW M1 Procar",
        "liveries" : [
          {
            "id" : 51,
            "name" : "BMW Motorsport #1"
          },
          {
            "id" : 52,
            "name" : "BMW Motorsport #6"
          },
          {
            "id" : 53,
            "name" : "Team Project CARS #14"
          },
          {
            "id" : 54,
            "name" : "Team Project CARS #15"
          },
          {
            "id" : 55,
            "name" : "Vittorio Sport #7"
          },
          {
            "id" : 56,
            "name" : "Vittorio Sport #8"
          },
          {
            "id" : 57,
            "name" : "Alban Racing #24"
          },
          {
            "id" : 58,
            "name" : "Alban Racing #25"
          },
          {
            "id" : 59,
            "name" : "DeStijl Team #27"
          },
          {
            "id" : 60,
            "name" : "DeStijl Team #28"
          },
          {
            "id" : 61,
            "name" : "Scuderia Turbolio #81"
          },
          {
            "id" : 62,
            "name" : "Scuderia Turbolio #82"
          },
          {
            "id" : 63,
            "name" : "Gerhardt Motorsport #19"
          },
          {
            "id" : 64,
            "name" : "Gerhardt Motorsport #20"
          },
          {
            "id" : 65,
            "name" : "Garreti Racing #85"
          },
          {
            "id" : 66,
            "name" : "Garreti Racing #86"
          },
          {
            "id" : 67,
            "name" : "Team Forpi #32"
          },
          {
            "id" : 68,
            "name" : "Team Forpi #33"
          },
          {
            "id" : 69,
            "name" : "Fried + Prinz Rennsport #86"
          },
          {
            "id" : 70,
            "name" : "Fried + Prinz Rennsport #87"
          },
          {
            "id" : 71,
            "name" : "Petrolos Racing Team  #17"
          },
          {
            "id" : 72,
            "name" : "Petrolos Racing Team #18"
          },
          {
            "id" : 73,
            "name" : "Saltz Video Cassette #72"
          },
          {
            "id" : 74,
            "name" : "Saltz Video Cassette #73"
          },
          {
            "id" : 75,
            "name" : "Zipanol Racing #76"
          },
          {
            "id" : 76,
            "name" : "Zipanol Racing #77"
          },
          {
            "id" : 77,
            "name" : "Kings Team #35"
          },
          {
            "id" : 78,
            "name" : "Kings Team #36"
          },
          {
            "id" : 79,
            "name" : "Piston Motorsport #42"
          },
          {
            "id" : 80,
            "name" : "Piston Motorsport #43"
          },
          {
            "id" : 81,
            "name" : "Slightly Mad Art Car #79"
          },
          {
            "id" : 82,
            "name" : "Slightly Mad Art Car #80"
          },
          {
            "id" : 83,
            "name" : "Equipe Dambreville #37"
          },
          {
            "id" : 84,
            "name" : "Equipe Dambreville #38"
          },
          {
            "id" : 85,
            "name" : "True North Racing #22"
          },
          {
            "id" : 86,
            "name" : "True North Racing #23"
          },
          {
            "id" : 87,
            "name" : "SUEI Racing Wheels #2"
          },
          {
            "id" : 88,
            "name" : "SUEI Racing Wheels #3"
          },
          {
            "id" : 89,
            "name" : "CPDE Rennsport #4"
          },
          {
            "id" : 90,
            "name" : "CPDE Rennsport #5"
          },
          {
            "id" : 91,
            "name" : "Stichmuller Motorsport #98"
          },
          {
            "id" : 92,
            "name" : "Stichmuller Motorsport #99"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 4"
      },
      {
        "id" : 1368545018,
        "name" : "Sauber C9 LM Mercedes-Benz",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Sauber Mercedes #61"
          },
          {
            "id" : 52,
            "name" : "Sauber Mercedes #62"
          },
          {
            "id" : 53,
            "name" : "Sauber Mercedes #63"
          },
          {
            "id" : 54,
            "name" : "WEST Racing Team #14"
          },
          {
            "id" : 55,
            "name" : "WEST Racing Team #15"
          },
          {
            "id" : 56,
            "name" : "Team HXC Equipment #38"
          },
          {
            "id" : 57,
            "name" : "Team HXC Equipment #39"
          },
          {
            "id" : 58,
            "name" : "Weber Motorsport #35"
          },
          {
            "id" : 59,
            "name" : "Weber Motorsport #36"
          },
          {
            "id" : 60,
            "name" : "Petroblast Racing #70"
          },
          {
            "id" : 61,
            "name" : "Petroblast Racing #71"
          },
          {
            "id" : 62,
            "name" : "Keaveneys Racing Team #42"
          },
          {
            "id" : 63,
            "name" : "Keaveneys Racing Team #43"
          },
          {
            "id" : 64,
            "name" : "Equipe Dambreville #52"
          },
          {
            "id" : 65,
            "name" : "Equipe Dambreville #53"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group C1"
      },
      {
        "id" : 1397255601,
        "name" : "Ford Mustang 2+2 Fastback",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Candy Apple Red"
          },
          {
            "id" : 2,
            "name" : "Springtime Yellow"
          },
          {
            "id" : 3,
            "name" : "Raven Black"
          },
          {
            "id" : 4,
            "name" : "Wimbledon White"
          },
          {
            "id" : 5,
            "name" : "Arcadian Blue"
          },
          {
            "id" : 6,
            "name" : "Sahara Beige"
          },
          {
            "id" : 7,
            "name" : "Signal Flare Red"
          },
          {
            "id" : 8,
            "name" : "Nightmist Blue"
          },
          {
            "id" : 9,
            "name" : "Vintage Burgundy"
          },
          {
            "id" : 10,
            "name" : "Antique Bronze Met."
          },
          {
            "id" : 11,
            "name" : "Ivy Green Met."
          },
          {
            "id" : 12,
            "name" : "Tahoe Turquoise Met."
          },
          {
            "id" : 13,
            "name" : "Emberglo Met."
          },
          {
            "id" : 14,
            "name" : "Silver Blue Met."
          },
          {
            "id" : 15,
            "name" : "Sauterne Gold Met."
          },
          {
            "id" : 16,
            "name" : "Silver Frost Met."
          },
          {
            "id" : 17,
            "name" : "Anniversary Gold Met."
          },
          {
            "id" : 51,
            "name" : "White / Stripes"
          },
          {
            "id" : 52,
            "name" : "Light Blue Met. / Stripes"
          },
          {
            "id" : 53,
            "name" : "Gold Met. / Stripes"
          },
          {
            "id" : 54,
            "name" : "Burgundy / Stripes"
          },
          {
            "id" : 55,
            "name" : "Orange / Stripes"
          },
          {
            "id" : 56,
            "name" : "Black / Stripes"
          },
          {
            "id" : 57,
            "name" : "Green Apple / Stripes"
          },
          {
            "id" : 58,
            "name" : "Yellow / Stripes"
          },
          {
            "id" : 59,
            "name" : "Dark Red Met. / Flames"
          },
          {
            "id" : 60,
            "name" : "Cream / Stripes"
          },
          {
            "id" : 61,
            "name" : "Dark Bronze Met."
          },
          {
            "id" : 62,
            "name" : "Blue Met. / Flames"
          },
          {
            "id" : 63,
            "name" : "Dark Green Met. / Stripes"
          },
          {
            "id" : 64,
            "name" : "Red / Stripes"
          },
          {
            "id" : 65,
            "name" : "Dark Red Met."
          },
          {
            "id" : 66,
            "name" : "Yellow Met. / Stripes"
          },
          {
            "id" : 67,
            "name" : "Green / Stripes"
          },
          {
            "id" : 68,
            "name" : "Night Blue Met."
          },
          {
            "id" : 69,
            "name" : "Purple / Stripes"
          },
          {
            "id" : 70,
            "name" : "Dark Blue / Bronze Met."
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road G"
      },
      {
        "id" : 1400443574,
        "name" : "BAC Mono",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Robot White / Black"
          },
          {
            "id" : 2,
            "name" : "Robot White / Carbon"
          },
          {
            "id" : 3,
            "name" : "Raptor Grey / Black"
          },
          {
            "id" : 4,
            "name" : "Raptor Grey / Carbon"
          },
          {
            "id" : 5,
            "name" : "Seal Grey / Black"
          },
          {
            "id" : 6,
            "name" : "Seal Grey / Carbon"
          },
          {
            "id" : 7,
            "name" : "Tronic Black / Carbon"
          },
          {
            "id" : 8,
            "name" : "Green Pearl Met. / Black"
          },
          {
            "id" : 9,
            "name" : "Green Pearl Met. / Carbon"
          },
          {
            "id" : 10,
            "name" : "Blue Pearl Met. / Black"
          },
          {
            "id" : 11,
            "name" : "Blue Pearl Met. / Carbon"
          },
          {
            "id" : 12,
            "name" : "Red Pearl Met. / Black"
          },
          {
            "id" : 13,
            "name" : "Red Pearl Met. / Carbon"
          },
          {
            "id" : 14,
            "name" : "Yellow Pearl Met. / Black"
          },
          {
            "id" : 15,
            "name" : "Yellow Pearl Met. / Carbon"
          },
          {
            "id" : 16,
            "name" : "White Pearl Met. / Black"
          },
          {
            "id" : 17,
            "name" : "White Pearl Met. / Carbon"
          },
          {
            "id" : 18,
            "name" : "Titanium Met. / Black"
          },
          {
            "id" : 19,
            "name" : "Titanium Met. / Carbon"
          },
          {
            "id" : 20,
            "name" : "Gun Metal Grey Met. / Black"
          },
          {
            "id" : 21,
            "name" : "Gun Metal Grey Met. / Carbon"
          },
          {
            "id" : 22,
            "name" : "Orange Pearl Met. / Black"
          },
          {
            "id" : 23,
            "name" : "Orange Pearl Met. / Carbon"
          },
          {
            "id" : 72,
            "name" : "Deadmau5"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road B"
      },
      {
        "id" : 1401308680,
        "name" : "Mercedes-Benz 300 SL (W194)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Le Mans #20"
          },
          {
            "id" : 52,
            "name" : "Le Mans #21"
          },
          {
            "id" : 53,
            "name" : "Le Mans #22"
          },
          {
            "id" : 54,
            "name" : "Carrera Panamericana #3"
          },
          {
            "id" : 55,
            "name" : "Carrera Panamericana #4"
          },
          {
            "id" : 56,
            "name" : "GP Bern #16"
          },
          {
            "id" : 57,
            "name" : "GP Bern #18"
          },
          {
            "id" : 58,
            "name" : "GP Bern #20"
          },
          {
            "id" : 59,
            "name" : "Mille Miglia #613"
          },
          {
            "id" : 60,
            "name" : "Mille Miglia #623"
          },
          {
            "id" : 61,
            "name" : "Mille Miglia #626"
          },
          {
            "id" : 62,
            "name" : "Rapa Racing Team #8"
          },
          {
            "id" : 63,
            "name" : "Rapa Racing Team #9"
          },
          {
            "id" : 64,
            "name" : "Hummerich Rennsport #11"
          },
          {
            "id" : 65,
            "name" : "Hummerich Rennsport #12"
          },
          {
            "id" : 66,
            "name" : "Equipe Bouchard #13"
          },
          {
            "id" : 67,
            "name" : "Equipe Bouchard #14"
          },
          {
            "id" : 68,
            "name" : "Clark Motor Racing #15"
          },
          {
            "id" : 69,
            "name" : "Clark Motor Racing #16"
          },
          {
            "id" : 70,
            "name" : "Equipe Dambreville #19"
          },
          {
            "id" : 71,
            "name" : "Equipe Dambreville #20"
          },
          {
            "id" : 72,
            "name" : "Arnao America Racing Team #22"
          },
          {
            "id" : 73,
            "name" : "Arnao America Racing Team #23"
          },
          {
            "id" : 74,
            "name" : "Arnao America Racing Team #24"
          },
          {
            "id" : 75,
            "name" : "Morrish Racing #33"
          },
          {
            "id" : 76,
            "name" : "Morrish Racing #34"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT D"
      },
      {
        "id" : 1401532035,
        "name" : "Aston Martin Vantage GTE",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Aston Martin Racing #95"
          },
          {
            "id" : 52,
            "name" : "Aston Martin Racing #97"
          },
          {
            "id" : 53,
            "name" : "Aston Martin Racing #98"
          },
          {
            "id" : 54,
            "name" : "Aston Martin Racing #99"
          },
          {
            "id" : 55,
            "name" : "Robbie Racing #31"
          },
          {
            "id" : 56,
            "name" : "Robbie Racing #32"
          },
          {
            "id" : 57,
            "name" : "HR Team #36"
          },
          {
            "id" : 58,
            "name" : "HR Team #37"
          },
          {
            "id" : 59,
            "name" : "Team SUEI #42"
          },
          {
            "id" : 60,
            "name" : "Team SUEI #43"
          },
          {
            "id" : 61,
            "name" : "Recaro Team #75"
          },
          {
            "id" : 62,
            "name" : "Recaro Team #76"
          },
          {
            "id" : 63,
            "name" : "Besmone Racing #47"
          },
          {
            "id" : 64,
            "name" : "Besmone Racing #48"
          },
          {
            "id" : 65,
            "name" : "Wildgersen Motorsport #83"
          },
          {
            "id" : 66,
            "name" : "Wildgersen Motorsport #84"
          },
          {
            "id" : 67,
            "name" : "Hankook Team #80"
          },
          {
            "id" : 68,
            "name" : "Hankook Team #81"
          },
          {
            "id" : 69,
            "name" : "Team BOON Menswear #54"
          },
          {
            "id" : 70,
            "name" : "Team BOON Menswear #55"
          },
          {
            "id" : 71,
            "name" : "Pirelli Team #22"
          },
          {
            "id" : 72,
            "name" : "Pirelli Team #23"
          },
          {
            "id" : 73,
            "name" : "Falken Team #92"
          },
          {
            "id" : 74,
            "name" : "Falken Team #93"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTE"
      },
      {
        "id" : 1406411897,
        "name" : "Lamborghini Huracán LP620-2 Super Trofeo",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Lamborghini Squadra Corse #63"
          },
          {
            "id" : 52,
            "name" : "Lamborghini Squadra Corse #64"
          },
          {
            "id" : 53,
            "name" : "Henmis Racing Team #19"
          },
          {
            "id" : 54,
            "name" : "Henmis Racing Team #20"
          },
          {
            "id" : 55,
            "name" : "Vasmac Racing #68"
          },
          {
            "id" : 56,
            "name" : "Vasmac Racing #69"
          },
          {
            "id" : 57,
            "name" : "Togussi Sports Inc. #12"
          },
          {
            "id" : 58,
            "name" : "Togussi Sports Inc. #13"
          },
          {
            "id" : 59,
            "name" : "Stargenley Motorsport #75"
          },
          {
            "id" : 60,
            "name" : "Stargenley Motorsport #76"
          },
          {
            "id" : 61,
            "name" : "Apex Racing Team #8"
          },
          {
            "id" : 62,
            "name" : "Apex Racing Team #9"
          },
          {
            "id" : 63,
            "name" : "Team Imochi Racing #26"
          },
          {
            "id" : 64,
            "name" : "Team Imochi Racing #27"
          },
          {
            "id" : 65,
            "name" : "Jancon Mobile Autosports #82"
          },
          {
            "id" : 66,
            "name" : "Jancon Mobile Autosports #83"
          },
          {
            "id" : 67,
            "name" : "Wreeblox Racing #61"
          },
          {
            "id" : 68,
            "name" : "Wreeblox Racing #62"
          },
          {
            "id" : 69,
            "name" : "Yorri Motorsport #48"
          },
          {
            "id" : 70,
            "name" : "Yorri Motorsport #49"
          },
          {
            "id" : 71,
            "name" : "Nahye Motorsport #44"
          },
          {
            "id" : 72,
            "name" : "Nahye Motorsport #45"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Super Trofeo"
      },
      {
        "id" : 1433352906,
        "name" : "Ginetta G57",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Ginetta USA Team #57"
          },
          {
            "id" : 52,
            "name" : "Ryno Racing #57"
          },
          {
            "id" : 53,
            "name" : "CWS Engineering Team #55"
          },
          {
            "id" : 54,
            "name" : "Century Motorsport #51"
          },
          {
            "id" : 55,
            "name" : "Graff Racing #57"
          },
          {
            "id" : 56,
            "name" : "Ankyamo Motorsport #16"
          },
          {
            "id" : 57,
            "name" : "Ankyamo Motorsport #17"
          },
          {
            "id" : 58,
            "name" : "OCH Racing #32"
          },
          {
            "id" : 59,
            "name" : "OCH Racing #33"
          },
          {
            "id" : 60,
            "name" : "WRB Motorsport #82"
          },
          {
            "id" : 61,
            "name" : "WRB Motorsport #83"
          },
          {
            "id" : 62,
            "name" : "SRT Inc. #45"
          },
          {
            "id" : 63,
            "name" : "SRT Inc. #46"
          },
          {
            "id" : 64,
            "name" : "Cobelt Motorsport #20"
          },
          {
            "id" : 65,
            "name" : "Cobelt Motorsport #21"
          },
          {
            "id" : 66,
            "name" : "LenDing Motorsport #53"
          },
          {
            "id" : 67,
            "name" : "LenDing Motorsport #54"
          },
          {
            "id" : 68,
            "name" : "VD Sign Racing #71"
          },
          {
            "id" : 69,
            "name" : "VD Sign Racing #72"
          },
          {
            "id" : 70,
            "name" : "Gruppo Ancoderro #28"
          },
          {
            "id" : 71,
            "name" : "Gruppo Ancoderro #29"
          },
          {
            "id" : 72,
            "name" : "Bersmann Motorsport #8"
          },
          {
            "id" : 73,
            "name" : "Bersmann Motorsport #9"
          },
          {
            "id" : 74,
            "name" : "Four C Motorsport #39"
          },
          {
            "id" : 75,
            "name" : "Four C Motorsport #40"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day A"
      },
      {
        "id" : 1452261378,
        "name" : "Aston Martin Vantage GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Aston Martin Racing #007"
          },
          {
            "id" : 52,
            "name" : "DeLaTorre Racing #04"
          },
          {
            "id" : 53,
            "name" : "TRG-AMR #007"
          },
          {
            "id" : 54,
            "name" : "Barwell Motorsport #180"
          },
          {
            "id" : 55,
            "name" : "HPF Motorsport #107"
          },
          {
            "id" : 56,
            "name" : "HPF Motorsport #108"
          },
          {
            "id" : 57,
            "name" : "JFB Racing Team #104"
          },
          {
            "id" : 58,
            "name" : "JFB Racing Team #105"
          },
          {
            "id" : 59,
            "name" : "Ben And Erton #24"
          },
          {
            "id" : 60,
            "name" : "Ben And Erton #23"
          },
          {
            "id" : 61,
            "name" : "Jameskett Racing Team #102"
          },
          {
            "id" : 62,
            "name" : "Jameskett Racing Team #103"
          },
          {
            "id" : 63,
            "name" : "Nascalett Racing #111"
          },
          {
            "id" : 64,
            "name" : "Nascalett Racing #112"
          },
          {
            "id" : 65,
            "name" : "Cobell Racing #180"
          },
          {
            "id" : 66,
            "name" : "Cobell Racing #181"
          },
          {
            "id" : 67,
            "name" : "Team AQI #173"
          },
          {
            "id" : 68,
            "name" : "Team AQI #174"
          },
          {
            "id" : 69,
            "name" : "Avens Motorsports #56"
          },
          {
            "id" : 70,
            "name" : "Avens Motorsports #57"
          },
          {
            "id" : 71,
            "name" : "HR Team #65"
          },
          {
            "id" : 72,
            "name" : "HR Team #66"
          },
          {
            "id" : 73,
            "name" : "Adrenaline Racing #110"
          },
          {
            "id" : 74,
            "name" : "Adrenaline Racing #109"
          },
          {
            "id" : 75,
            "name" : "Japspeed #26"
          },
          {
            "id" : 76,
            "name" : "Japspeed #27"
          },
          {
            "id" : 77,
            "name" : "Team ESL #99"
          },
          {
            "id" : 78,
            "name" : "Team ESL #100"
          },
          {
            "id" : 79,
            "name" : "eSports + Cars #97"
          },
          {
            "id" : 80,
            "name" : "eSports + Cars #98"
          },
          {
            "id" : 81,
            "name" : "GTA Racing #70"
          },
          {
            "id" : 82,
            "name" : "GTA Racing #71"
          },
          {
            "id" : 83,
            "name" : "HUD Motorsport #12"
          },
          {
            "id" : 84,
            "name" : "HUD Motorsport #14"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 1464988033,
        "name" : "Porsche Cayman GT4 Clubsport MR",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche AG #4"
          },
          {
            "id" : 52,
            "name" : "Porsche AG #5"
          },
          {
            "id" : 74,
            "name" : "Manthey Racing #170"
          },
          {
            "id" : 53,
            "name" : "GetSpeed Performance #940"
          },
          {
            "id" : 54,
            "name" : "GetSpeed Performance #941"
          },
          {
            "id" : 55,
            "name" : "Teichmann Racing #960"
          },
          {
            "id" : 56,
            "name" : "Teichmann Racing #970"
          },
          {
            "id" : 57,
            "name" : "Teichmann Racing #980"
          },
          {
            "id" : 58,
            "name" : "Kappeler Motorsport #959"
          },
          {
            "id" : 59,
            "name" : "Team CSF #181"
          },
          {
            "id" : 60,
            "name" : "Apsolut Racing #973"
          },
          {
            "id" : 61,
            "name" : "CJ Wilson Racing #33"
          },
          {
            "id" : 62,
            "name" : "CJ Wilson Racing #35"
          },
          {
            "id" : 63,
            "name" : "Krugspeed Racing #7"
          },
          {
            "id" : 64,
            "name" : "Team Falken Tires #49"
          },
          {
            "id" : 65,
            "name" : "Team Falken Tires #50"
          },
          {
            "id" : 66,
            "name" : "Rexott Racing Team #87"
          },
          {
            "id" : 67,
            "name" : "Rexott Racing Team #88"
          },
          {
            "id" : 68,
            "name" : "T-Mann Motorsport #97"
          },
          {
            "id" : 69,
            "name" : "T-Mann Motorsport #98"
          },
          {
            "id" : 70,
            "name" : "Rotmeg Racing Team #125"
          },
          {
            "id" : 71,
            "name" : "Rotmeg Racing Team #126"
          },
          {
            "id" : 72,
            "name" : "BNS Birdia Systems #145"
          },
          {
            "id" : 73,
            "name" : "BNS Birdia Systems #146"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT4"
      },
      {
        "id" : 1468371103,
        "name" : "Ligier JS P2 Honda",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Michael Shank Racing #60"
          },
          {
            "id" : 52,
            "name" : "Bolting Motorsports #4"
          },
          {
            "id" : 53,
            "name" : "Bolting Motorsports #5"
          },
          {
            "id" : 54,
            "name" : "Decksbern Motorsport #16"
          },
          {
            "id" : 55,
            "name" : "Decksbern Motorsport #17"
          },
          {
            "id" : 56,
            "name" : "Darkwood Motor Racing #84"
          },
          {
            "id" : 57,
            "name" : "Darkwood Motor Racing #85"
          },
          {
            "id" : 58,
            "name" : "eSports + Cars #25"
          },
          {
            "id" : 59,
            "name" : "Euronics Gaming #66"
          },
          {
            "id" : 60,
            "name" : "Euronics Gaming #67"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP2"
      },
      {
        "id" : 1469658023,
        "name" : "Audi R8 V10 plus 5.2 FSI quattro",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Red"
          },
          {
            "id" : 2,
            "name" : "White"
          },
          {
            "id" : 3,
            "name" : "Yellow"
          },
          {
            "id" : 4,
            "name" : "Darkgreen Metallic"
          },
          {
            "id" : 5,
            "name" : "Silver Metallic"
          },
          {
            "id" : 6,
            "name" : "Black Metallic"
          },
          {
            "id" : 7,
            "name" : "Lightgrey Metallic"
          },
          {
            "id" : 8,
            "name" : "Red Metallic"
          },
          {
            "id" : 9,
            "name" : "Grey Pearl"
          },
          {
            "id" : 10,
            "name" : "Blue Metallic"
          },
          {
            "id" : 11,
            "name" : "Darkgreen Matte"
          },
          {
            "id" : 12,
            "name" : "Pale Yellow"
          },
          {
            "id" : 13,
            "name" : "Orange"
          },
          {
            "id" : 14,
            "name" : "Brown Metallic"
          },
          {
            "id" : 15,
            "name" : "Black Metallic 2"
          },
          {
            "id" : 16,
            "name" : "Darkred Pearl"
          },
          {
            "id" : 17,
            "name" : "Darkblue Pearl"
          },
          {
            "id" : 18,
            "name" : "Darkbrown Pearl"
          },
          {
            "id" : 19,
            "name" : "Beige Pearl"
          },
          {
            "id" : 20,
            "name" : "Darkgrey Pearl"
          },
          {
            "id" : 21,
            "name" : "Blue Pearl"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : 1470929381,
        "name" : "Audi 90 quattro IMSA GTO",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Audi Sport #4"
          },
          {
            "id" : 52,
            "name" : "Audi Sport #5"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTO"
      },
      {
        "id" : 1471547500,
        "name" : "Ferrari 488 Challenge (EU)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "CDP #20"
          },
          {
            "id" : 52,
            "name" : "Rossocorsa #23"
          },
          {
            "id" : 53,
            "name" : "CDP #25"
          },
          {
            "id" : 54,
            "name" : "Rossocorsa - Pellin Racing #27"
          },
          {
            "id" : 55,
            "name" : "Ferrari Budapest  #30"
          },
          {
            "id" : 56,
            "name" : "Kessel Racing #42"
          },
          {
            "id" : 57,
            "name" : "Graypaul Nottingham #80"
          },
          {
            "id" : 58,
            "name" : "Rossocorsa #91"
          },
          {
            "id" : 59,
            "name" : "Stratstone #92"
          },
          {
            "id" : 60,
            "name" : "HR Owen #93"
          },
          {
            "id" : 61,
            "name" : "Rossocorsa #97"
          },
          {
            "id" : 62,
            "name" : "Formula Racing  #100"
          },
          {
            "id" : 63,
            "name" : "Kessel Racing #102"
          },
          {
            "id" : 64,
            "name" : "Kessel Racing #112"
          },
          {
            "id" : 65,
            "name" : "Scuderia Praha #117"
          },
          {
            "id" : 66,
            "name" : "Rossocorsa #118"
          },
          {
            "id" : 67,
            "name" : "Penske Sportwagen Hamburg #127"
          },
          {
            "id" : 68,
            "name" : "Formula Racing #157"
          },
          {
            "id" : 69,
            "name" : "Formula Racing #160"
          },
          {
            "id" : 70,
            "name" : "Team Zenith Sion - Lausanne #162"
          },
          {
            "id" : 71,
            "name" : "Formula Racing #168"
          },
          {
            "id" : 72,
            "name" : "Formula Racing #171"
          },
          {
            "id" : 73,
            "name" : "Rossocorsa #193"
          },
          {
            "id" : 74,
            "name" : "Formula Racing #198"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Ferrari Series"
      },
      {
        "id" : 1481115672,
        "name" : "Nissan Fairlady 240ZG GTS-II",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Nissan Motorsport GTS-II #23"
          },
          {
            "id" : 52,
            "name" : "Nissan Motorsport SCCN #3"
          },
          {
            "id" : 53,
            "name" : "Nissan Motorsport R-2 #2"
          },
          {
            "id" : 54,
            "name" : "Nissan Motorsport R-2 #3"
          },
          {
            "id" : 55,
            "name" : "Nissan Motorsport #8"
          },
          {
            "id" : 56,
            "name" : "Nissan Motorsport #9"
          },
          {
            "id" : 57,
            "name" : "Checkman Sports-Kit #10"
          },
          {
            "id" : 58,
            "name" : "Nippon Speed Car #72"
          },
          {
            "id" : 59,
            "name" : "Maruzen Technica #84"
          },
          {
            "id" : 60,
            "name" : "Yokohama Racing #99"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : 1564669712,
        "name" : "Lamborghini Veneno LP750-4",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Grigio Antares / Red"
          },
          {
            "id" : 52,
            "name" : "Grigio Antares / Green"
          },
          {
            "id" : 53,
            "name" : "Bianco Isis"
          },
          {
            "id" : 54,
            "name" : "Rosso Mars"
          },
          {
            "id" : 55,
            "name" : "Verde Ithaca"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road B"
      },
      {
        "id" : 1574251638,
        "name" : "KTM X-Bow GT4",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Wreeblox Racing #40"
          },
          {
            "id" : 52,
            "name" : "Wreeblox Racing #41"
          },
          {
            "id" : 53,
            "name" : "Machuca Motorsport #10"
          },
          {
            "id" : 54,
            "name" : "Machuca Motorsport #11"
          },
          {
            "id" : 55,
            "name" : "Bruccalieri Motorsport #6"
          },
          {
            "id" : 56,
            "name" : "Bruccalieri Motorsport #7"
          },
          {
            "id" : 57,
            "name" : "Team Start-O-Go #28"
          },
          {
            "id" : 58,
            "name" : "Team Start-O-Go #29"
          },
          {
            "id" : 59,
            "name" : "Cobell Motorsport #47"
          },
          {
            "id" : 60,
            "name" : "Cobell Motorsport #48"
          },
          {
            "id" : 61,
            "name" : "EXTA Racing Team #55"
          },
          {
            "id" : 62,
            "name" : "EXTA Racing Team #56"
          },
          {
            "id" : 63,
            "name" : "Apex Motorsport #133"
          },
          {
            "id" : 64,
            "name" : "Apex Motorsport #134"
          },
          {
            "id" : 65,
            "name" : "Team VilioENS #81"
          },
          {
            "id" : 66,
            "name" : "Team VilioENS #82"
          },
          {
            "id" : 67,
            "name" : "Kertvell Motors #64"
          },
          {
            "id" : 68,
            "name" : "Kertvell Motors #65"
          },
          {
            "id" : 69,
            "name" : "Riddie Powersports #77"
          },
          {
            "id" : 70,
            "name" : "Riddie Powersports #78"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT4"
      },
      {
        "id" : 1626504761,
        "name" : "Formula Renault 3.5",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Renault Sport #1"
          },
          {
            "id" : 52,
            "name" : "Renault Sport #2"
          },
          {
            "id" : 53,
            "name" : "Team Panasonic #3"
          },
          {
            "id" : 54,
            "name" : "Team Panasonic #4"
          },
          {
            "id" : 55,
            "name" : "Team Fanatec #5"
          },
          {
            "id" : 56,
            "name" : "Team Fanatec #6"
          },
          {
            "id" : 57,
            "name" : "Bandai Namco Entertainment #7"
          },
          {
            "id" : 58,
            "name" : "Bandai Namco Entertainment #8"
          },
          {
            "id" : 59,
            "name" : "Team D-Box #9"
          },
          {
            "id" : 60,
            "name" : "Team D-Box #10"
          },
          {
            "id" : 61,
            "name" : "Luigo Motosport #11"
          },
          {
            "id" : 62,
            "name" : "Luigo Motosport #12"
          },
          {
            "id" : 63,
            "name" : "Equipe Dambreville #14"
          },
          {
            "id" : 64,
            "name" : "Equipe Dambreville #15"
          },
          {
            "id" : 65,
            "name" : "Remco Enterprises #16"
          },
          {
            "id" : 66,
            "name" : "Remco Enterprises #17"
          },
          {
            "id" : 67,
            "name" : "T-Rexergie Racing #18"
          },
          {
            "id" : 68,
            "name" : "T-Rexergie Racing #19"
          },
          {
            "id" : 69,
            "name" : "Scuderia Rapa Olio #20"
          },
          {
            "id" : 70,
            "name" : "Scuderia Rapa Olio #21"
          },
          {
            "id" : 71,
            "name" : "Team Sheriftizer #22"
          },
          {
            "id" : 72,
            "name" : "Team Sheriftizer #23"
          },
          {
            "id" : 73,
            "name" : "Besmone Racing Team #24"
          },
          {
            "id" : 74,
            "name" : "Besmone Racing Team #25"
          },
          {
            "id" : 75,
            "name" : "Vasmac Motorsport #26"
          },
          {
            "id" : 76,
            "name" : "Vasmac Motorsport #27"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Formula Renault"
      },
      {
        "id" : 1637772163,
        "name" : "Bentley Continental GT3 Endurance",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Bentley Team ABT #37"
          },
          {
            "id" : 52,
            "name" : "Bentley Team ABT #38"
          },
          {
            "id" : 53,
            "name" : "Bentley Team HTP #84"
          },
          {
            "id" : 54,
            "name" : "Bentley Team HTP #85"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 1639105598,
        "name" : "Ford Escort RS1600",
        "liveries" : [
          {
            "id" : 51,
            "name" : "SRT Team"
          },
          {
            "id" : 52,
            "name" : "Red/Silver"
          },
          {
            "id" : 53,
            "name" : "Four C Motorsport"
          },
          {
            "id" : 54,
            "name" : "Borda Racing"
          },
          {
            "id" : 55,
            "name" : "Yellow/Black 1972"
          },
          {
            "id" : 56,
            "name" : "Blue/White"
          },
          {
            "id" : 57,
            "name" : "Tan"
          },
          {
            "id" : 58,
            "name" : "Black/Red"
          },
          {
            "id" : 59,
            "name" : "Bersmann Motorsport"
          },
          {
            "id" : 60,
            "name" : "Dark Blue/White"
          },
          {
            "id" : 61,
            "name" : "Yellow/Black"
          },
          {
            "id" : 62,
            "name" : "Red/Gun Metal"
          },
          {
            "id" : 63,
            "name" : "White with stripes"
          },
          {
            "id" : 64,
            "name" : "Silver/Black"
          },
          {
            "id" : 65,
            "name" : "Orange/Black"
          },
          {
            "id" : 66,
            "name" : "White/Blue"
          },
          {
            "id" : 67,
            "name" : "Welker Racing"
          },
          {
            "id" : 68,
            "name" : "White/Light Blue"
          },
          {
            "id" : 69,
            "name" : "Green/White"
          },
          {
            "id" : 70,
            "name" : "Blue/White stripes"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road G"
      },
      {
        "id" : 1682144078,
        "name" : "Aston Martin Vulcan",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Appletree Green / Orange"
          },
          {
            "id" : 52,
            "name" : "Hardly Green / Yellow"
          },
          {
            "id" : 53,
            "name" : "Silver Fox / Red"
          },
          {
            "id" : 54,
            "name" : "Magnetic Silver / Blue"
          },
          {
            "id" : 55,
            "name" : "Quantum Silver Matte / Black"
          },
          {
            "id" : 56,
            "name" : "Midnight Blue / Orange"
          },
          {
            "id" : 57,
            "name" : "Cobalt Blue / Yellow"
          },
          {
            "id" : 58,
            "name" : "Skyfall Silver / Black"
          },
          {
            "id" : 59,
            "name" : "Frosted Glass Blue / White"
          },
          {
            "id" : 60,
            "name" : "Volcano Red / Black"
          },
          {
            "id" : 61,
            "name" : "Diavolo Red / White"
          },
          {
            "id" : 62,
            "name" : "Cinnabar Orange / White"
          },
          {
            "id" : 63,
            "name" : "Madagascar Orange / Black"
          },
          {
            "id" : 64,
            "name" : "Yellow Tang / Black"
          },
          {
            "id" : 65,
            "name" : "Morning Frost White / Green"
          },
          {
            "id" : 66,
            "name" : "Dark Green / Black"
          },
          {
            "id" : 67,
            "name" : "Matte Dark Grey / Red"
          },
          {
            "id" : 68,
            "name" : "Jet Black / Yellow"
          },
          {
            "id" : 69,
            "name" : "Sunburst Yellow / Black"
          },
          {
            "id" : 70,
            "name" : "Lunar White / Red"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day A"
      },
      {
        "id" : 1716535504,
        "name" : "Jaguar XJR-9",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Castrol Jaguar Racing #60"
          },
          {
            "id" : 52,
            "name" : "Castrol Jaguar Racing #61"
          },
          {
            "id" : 53,
            "name" : "Castrol Jaguar Racing #66"
          },
          {
            "id" : 54,
            "name" : "Jaguar Racing #21"
          },
          {
            "id" : 55,
            "name" : "Jaguar Racing #22"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group C1"
      },
      {
        "id" : 1747257697,
        "name" : "Nissan 300ZX Turbo LM",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Cunningham Racing #75"
          },
          {
            "id" : 52,
            "name" : "Cunningham Racing #76"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTO"
      },
      {
        "id" : 1764851930,
        "name" : "Toyota GT-86 Rocket Bunny GT4",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Project Cars #92"
          },
          {
            "id" : 52,
            "name" : "Momo Corse #117"
          },
          {
            "id" : 53,
            "name" : "Momo Corse #118"
          },
          {
            "id" : 54,
            "name" : "Team Nitto Tires #5"
          },
          {
            "id" : 55,
            "name" : "Team RS-R Suspensions #15"
          },
          {
            "id" : 56,
            "name" : "Team Rays #61"
          },
          {
            "id" : 57,
            "name" : "Team Cosworth #12"
          },
          {
            "id" : 58,
            "name" : "AMB Racing #105"
          },
          {
            "id" : 59,
            "name" : "AMB Racing #106"
          },
          {
            "id" : 60,
            "name" : "NVRR Motorsport #20"
          },
          {
            "id" : 61,
            "name" : "NVRR Motorsport #21"
          },
          {
            "id" : 62,
            "name" : "Vemenc Automotive #111"
          },
          {
            "id" : 63,
            "name" : "Vemenc Automotive #112"
          },
          {
            "id" : 64,
            "name" : "Vasmac Auto Racing #30"
          },
          {
            "id" : 65,
            "name" : "Vasmac Auto Racing #31"
          },
          {
            "id" : 66,
            "name" : "Moll Motorsport #58"
          },
          {
            "id" : 67,
            "name" : "Moll Motorsport #57"
          },
          {
            "id" : 68,
            "name" : "Leef.tecc Racing #2"
          },
          {
            "id" : 69,
            "name" : "Leef.tecc Racing #3"
          },
          {
            "id" : 70,
            "name" : "BNS Birdia Systems #119"
          },
          {
            "id" : 71,
            "name" : "BNS Birdia Systems #120"
          },
          {
            "id" : 72,
            "name" : "Caspello Technologies #137"
          },
          {
            "id" : 73,
            "name" : "Caspello Technologies #138"
          },
          {
            "id" : 74,
            "name" : "Elbregsen Motorsport #129"
          },
          {
            "id" : 75,
            "name" : "Elbregsen Motorsport #130"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT4"
      },
      {
        "id" : 1810453820,
        "name" : "Toyota TS040 Hybrid",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Toyota Racing #7"
          },
          {
            "id" : 52,
            "name" : "Toyota Racing #8"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP1"
      },
      {
        "id" : 1817703058,
        "name" : "Zakspeed Ford Capri Group 5",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Sachs Zakspeed Racing #1"
          },
          {
            "id" : 52,
            "name" : "Wurth Zakspeed Racing #1"
          },
          {
            "id" : 53,
            "name" : "Wurth Zakspeed Racing #2"
          },
          {
            "id" : 54,
            "name" : "Zakspeed Racing #52"
          },
          {
            "id" : 55,
            "name" : "Zakspeed Racing #53"
          },
          {
            "id" : 56,
            "name" : "Zakspeed Racing #55"
          },
          {
            "id" : 57,
            "name" : "Kolomiets Racing #23"
          },
          {
            "id" : 58,
            "name" : "Kolomiets Racing #24"
          },
          {
            "id" : 59,
            "name" : "Keaveney Motorsports #27"
          },
          {
            "id" : 60,
            "name" : "Keaveney Motorsports #28"
          },
          {
            "id" : 61,
            "name" : "Zectrol Motor Racing #16"
          },
          {
            "id" : 62,
            "name" : "Zectrol Motor Racing #20"
          },
          {
            "id" : 63,
            "name" : "Forpi Racing Team #42"
          },
          {
            "id" : 64,
            "name" : "Forpi Racing Team #43"
          },
          {
            "id" : 65,
            "name" : "Z5 Air Cooling #36"
          },
          {
            "id" : 66,
            "name" : "Z5 Air Cooling #37"
          },
          {
            "id" : 67,
            "name" : "Kaersten Rennsport #38"
          },
          {
            "id" : 68,
            "name" : "Kaersten Rennsport #39"
          },
          {
            "id" : 69,
            "name" : "Equipe Montague #29"
          },
          {
            "id" : 70,
            "name" : "Equipe Montague #31"
          },
          {
            "id" : 71,
            "name" : "Turbolio Racing #81"
          },
          {
            "id" : 72,
            "name" : "Turbolio Racing #82"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 5"
      },
      {
        "id" : 1818067169,
        "name" : "Dallara IR-12 Chevrolet (Speedway)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Penske #2"
          },
          {
            "id" : 52,
            "name" : "Team Penske #3"
          },
          {
            "id" : 53,
            "name" : "Lazier Burns Racing #4"
          },
          {
            "id" : 54,
            "name" : "Ed Carpenter Racing #6"
          },
          {
            "id" : 55,
            "name" : "Chip Ganassi Racing #8"
          },
          {
            "id" : 56,
            "name" : "Chip Ganassi Racing #9"
          },
          {
            "id" : 57,
            "name" : "Chip Ganassi Racing #10"
          },
          {
            "id" : 58,
            "name" : "KVSH Racing #11"
          },
          {
            "id" : 59,
            "name" : "Team Penske #12"
          },
          {
            "id" : 60,
            "name" : "Ed Carpenter Racing #20"
          },
          {
            "id" : 61,
            "name" : "Ed Carpenter Racing #21"
          },
          {
            "id" : 62,
            "name" : "Team Penske #22"
          },
          {
            "id" : 63,
            "name" : "Dreyer and Reinbold Racing #24"
          },
          {
            "id" : 64,
            "name" : "KVSH Racing #25"
          },
          {
            "id" : 65,
            "name" : "Chip Ganassi Racing #83"
          },
          {
            "id" : 66,
            "name" : "Pirtek Team Murray #61"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Indycar"
      },
      {
        "id" : 1830085946,
        "name" : "Ford Bronco Brocky",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team RTR #25"
          },
          {
            "id" : 52,
            "name" : "Rusty Motor Sports #31"
          },
          {
            "id" : 53,
            "name" : "Rusty Motor Sports #32"
          },
          {
            "id" : 54,
            "name" : "Camouflage Customs #10"
          },
          {
            "id" : 55,
            "name" : "Camouflage Customs #11"
          },
          {
            "id" : 56,
            "name" : "Monster Energy Team #2"
          },
          {
            "id" : 57,
            "name" : "Monster Energy Team #3"
          },
          {
            "id" : 58,
            "name" : "Team Pennzoil #22"
          },
          {
            "id" : 59,
            "name" : "Team Pennzoil #23"
          },
          {
            "id" : 60,
            "name" : "Jimmy's Motorsport #45"
          },
          {
            "id" : 61,
            "name" : "Jimmy's Motorsport #46"
          },
          {
            "id" : 62,
            "name" : "New Bright Team #78"
          },
          {
            "id" : 63,
            "name" : "New Bright Team #79"
          },
          {
            "id" : 64,
            "name" : "Team Nitto #23"
          },
          {
            "id" : 65,
            "name" : "Team Nitto #24"
          },
          {
            "id" : 66,
            "name" : "American Racing #11"
          },
          {
            "id" : 67,
            "name" : "American Racing #12"
          },
          {
            "id" : 68,
            "name" : "Ford Performance #80"
          },
          {
            "id" : 69,
            "name" : "Ford Performance #81"
          },
          {
            "id" : 70,
            "name" : "Ford Performance #82"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Trophy Truck"
      },
      {
        "id" : 1850232477,
        "name" : "Lamborghini Huracán LP610-4",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Grigio Admetus"
          },
          {
            "id" : 2,
            "name" : "Bianco Monocerus"
          },
          {
            "id" : 3,
            "name" : "Rosso Mars"
          },
          {
            "id" : 4,
            "name" : "Bianco Icarus"
          },
          {
            "id" : 5,
            "name" : "Grigio Nimbus"
          },
          {
            "id" : 6,
            "name" : "Nero Noctis"
          },
          {
            "id" : 7,
            "name" : "Grigio Lynx"
          },
          {
            "id" : 8,
            "name" : "Blu Achelous"
          },
          {
            "id" : 9,
            "name" : "Blu Caelum"
          },
          {
            "id" : 10,
            "name" : "Verde Mantis"
          },
          {
            "id" : 11,
            "name" : "Giallo Midas"
          },
          {
            "id" : 12,
            "name" : "Arancio Borealis"
          },
          {
            "id" : 13,
            "name" : "Maronne Alkestis"
          },
          {
            "id" : 14,
            "name" : "Nero Pegaso"
          },
          {
            "id" : 15,
            "name" : "Nero Nemesis"
          },
          {
            "id" : 16,
            "name" : "Bianco Canopus"
          },
          {
            "id" : 17,
            "name" : "Grigio Titans"
          },
          {
            "id" : 18,
            "name" : "Giallo Horus"
          },
          {
            "id" : 19,
            "name" : "Maronne Apus"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : 1864701845,
        "name" : "Caterham Seven 620 R",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Blue / Orange Stripes"
          },
          {
            "id" : 52,
            "name" : "Darkred/Yellow Stripes"
          },
          {
            "id" : 53,
            "name" : "Caterham Design Darkgreen"
          },
          {
            "id" : 54,
            "name" : "Red / White Stripes"
          },
          {
            "id" : 55,
            "name" : "Orange / Blue Stripes"
          },
          {
            "id" : 56,
            "name" : "Green Met. / Red Stripes"
          },
          {
            "id" : 57,
            "name" : "Red Met."
          },
          {
            "id" : 58,
            "name" : "Gun Metal / Stripes"
          },
          {
            "id" : 59,
            "name" : "White / Blue Stripes"
          },
          {
            "id" : 60,
            "name" : "Black / Neon Stripes"
          },
          {
            "id" : 61,
            "name" : "Chrome/Orange Stripes"
          },
          {
            "id" : 62,
            "name" : "Green Met. / White Stripes"
          },
          {
            "id" : 63,
            "name" : "Orange Met."
          },
          {
            "id" : 64,
            "name" : "Gold Met. / Black Stripes"
          },
          {
            "id" : 65,
            "name" : "White / Red Stripes"
          },
          {
            "id" : 66,
            "name" : "Yellow / Black Stripe"
          },
          {
            "id" : 67,
            "name" : "Light Green / Black Stripes"
          },
          {
            "id" : 68,
            "name" : "Blue Metallic / Grey Stripes"
          },
          {
            "id" : 69,
            "name" : "Silver Met. / Orange Stripes"
          },
          {
            "id" : 70,
            "name" : "Blue Met. / White Stripes"
          },
          {
            "id" : 71,
            "name" : "Momo Corse"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road D"
      },
      {
        "id" : 1891730007,
        "name" : "Nissan R89C",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Nissan Motorsport #23"
          },
          {
            "id" : 52,
            "name" : "Nissan Motorsport #23b"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group C1"
      },
      {
        "id" : 1898954187,
        "name" : "Marek RP 339H LMP1",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Marek Racing #22"
          },
          {
            "id" : 52,
            "name" : "Marek Racing #23"
          },
          {
            "id" : 53,
            "name" : "Nettleship Systems #30"
          },
          {
            "id" : 54,
            "name" : "Nettleship Systems #31"
          },
          {
            "id" : 55,
            "name" : "Nascalett Racing Team #85"
          },
          {
            "id" : 56,
            "name" : "Nascalett Racing Team #86"
          },
          {
            "id" : 57,
            "name" : "Madness Motorsport #48"
          },
          {
            "id" : 58,
            "name" : "Madness Motorsport #49"
          },
          {
            "id" : 59,
            "name" : "Cachetto Racing #32"
          },
          {
            "id" : 60,
            "name" : "Cachetto Racing #33"
          },
          {
            "id" : 61,
            "name" : "Scuderia Catorcia #88"
          },
          {
            "id" : 62,
            "name" : "Scuderia Catorcia #89"
          },
          {
            "id" : 63,
            "name" : "Clormfold Motorsport #79"
          },
          {
            "id" : 64,
            "name" : "Clormfold Motorsport #80"
          },
          {
            "id" : 65,
            "name" : "Team Ringley Plaza #54"
          },
          {
            "id" : 66,
            "name" : "Team Ringley Plaza #55"
          },
          {
            "id" : 67,
            "name" : "Boccler Autosports #50"
          },
          {
            "id" : 68,
            "name" : "Boccler Autosports #51"
          },
          {
            "id" : 69,
            "name" : "Meleshkin Racing #19"
          },
          {
            "id" : 70,
            "name" : "Meleshkin Racing #20"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP1"
      },
      {
        "id" : 1909945073,
        "name" : "Formula A",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Jancon Mobile #7"
          },
          {
            "id" : 52,
            "name" : "Team Jancon Mobile #8"
          },
          {
            "id" : 53,
            "name" : "AQI Racing #3"
          },
          {
            "id" : 54,
            "name" : "AQI Racing #4"
          },
          {
            "id" : 55,
            "name" : "Mixlub Racing #1"
          },
          {
            "id" : 56,
            "name" : "Mixlub Racing #2"
          },
          {
            "id" : 57,
            "name" : "Decksbern Motorsport #5"
          },
          {
            "id" : 58,
            "name" : "Decksbern Motorsport #6"
          },
          {
            "id" : 59,
            "name" : "WRB Motorsport #9"
          },
          {
            "id" : 60,
            "name" : "WRB Motorsport #10"
          },
          {
            "id" : 61,
            "name" : "ADVAN Team #11"
          },
          {
            "id" : 62,
            "name" : "ADVAN Team #12"
          },
          {
            "id" : 63,
            "name" : "OBX Watches team #14"
          },
          {
            "id" : 64,
            "name" : "OBX Watches team #15"
          },
          {
            "id" : 65,
            "name" : "APEX Team #16"
          },
          {
            "id" : 66,
            "name" : "APEX Team #17"
          },
          {
            "id" : 67,
            "name" : "IMOCHI Team #18"
          },
          {
            "id" : 68,
            "name" : "IMOCHI Team #19"
          },
          {
            "id" : 69,
            "name" : "BNS Birdia Team #20"
          },
          {
            "id" : 70,
            "name" : "BNS Birdia Team #21"
          },
          {
            "id" : 71,
            "name" : "Team VVV Racing #64"
          },
          {
            "id" : 72,
            "name" : "Team VVV Racing #65"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Formula A"
      },
      {
        "id" : 1934199723,
        "name" : "Audi R8 LMS",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Audi Sport #1"
          },
          {
            "id" : 52,
            "name" : "Audi Sport #2"
          },
          {
            "id" : 53,
            "name" : "Stevenson Team #6"
          },
          {
            "id" : 54,
            "name" : "Stevenson Team #9"
          },
          {
            "id" : 55,
            "name" : "Belgian Audi Club Team WRT #1"
          },
          {
            "id" : 56,
            "name" : "Belgian Audi Club Team WRT #2"
          },
          {
            "id" : 57,
            "name" : "Belgian Audi Club Team WRT #3"
          },
          {
            "id" : 58,
            "name" : "Belgian Audi Club Team WRT #4"
          },
          {
            "id" : 59,
            "name" : "Team WRT #28"
          },
          {
            "id" : 60,
            "name" : "Team WRT #33"
          },
          {
            "id" : 61,
            "name" : "Magnus Racing #4"
          },
          {
            "id" : 62,
            "name" : "Magnus Racing #44"
          },
          {
            "id" : 63,
            "name" : "Team Hot Wheels #5"
          },
          {
            "id" : 64,
            "name" : "Team Hot Wheels #10"
          },
          {
            "id" : 65,
            "name" : "Scuderia Rapa Olio #63"
          },
          {
            "id" : 66,
            "name" : "Scuderia Rapa Olio #64"
          },
          {
            "id" : 67,
            "name" : "Gaelsferd Motorsport #42"
          },
          {
            "id" : 68,
            "name" : "Gaelsferd Motorsport #43"
          },
          {
            "id" : 69,
            "name" : "Virtual Drivers by TX3 #12"
          },
          {
            "id" : 70,
            "name" : "Virtual Drivers by TX3 #14"
          },
          {
            "id" : 71,
            "name" : "eSports + Cars #95"
          },
          {
            "id" : 72,
            "name" : "eSports + Cars #96"
          },
          {
            "id" : 73,
            "name" : "VP-Gaming.de #08"
          },
          {
            "id" : 74,
            "name" : "VP-Gaming.de #09"
          },
          {
            "id" : 75,
            "name" : "GTA Racing #38"
          },
          {
            "id" : 76,
            "name" : "GTA Racing #39"
          },
          {
            "id" : 77,
            "name" : "Team ACR #8"
          },
          {
            "id" : 78,
            "name" : "Team ACR #9"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 1959097924,
        "name" : "Lotus Type 98T Renault Turbo",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Lotus #11"
          },
          {
            "id" : 52,
            "name" : "Team Lotus #12"
          },
          {
            "id" : 53,
            "name" : "Karlsson Motor Racing #18"
          },
          {
            "id" : 54,
            "name" : "Karlsson Motor Racing #19"
          },
          {
            "id" : 55,
            "name" : "Gerhardt Motorsport Team #15"
          },
          {
            "id" : 56,
            "name" : "Gerhardt Motorsport Team #16"
          },
          {
            "id" : 57,
            "name" : "Twist Coast Racing #38"
          },
          {
            "id" : 58,
            "name" : "Twist Coast Racing #39"
          },
          {
            "id" : 59,
            "name" : "P-1 Motors #30"
          },
          {
            "id" : 60,
            "name" : "P-1 Motors #31"
          },
          {
            "id" : 61,
            "name" : "Zipanol Racing Team #20"
          },
          {
            "id" : 62,
            "name" : "Zipanol Racing Team #21"
          },
          {
            "id" : 63,
            "name" : "Scuderia Rosso Bianco #1"
          },
          {
            "id" : 64,
            "name" : "Scuderia Rosso Bianco #2"
          },
          {
            "id" : 65,
            "name" : "Cachetto Motorsports #28"
          },
          {
            "id" : 66,
            "name" : "Cachetto Motorsports #29"
          },
          {
            "id" : 67,
            "name" : "Stichmuller Rennsport #5"
          },
          {
            "id" : 68,
            "name" : "Stichmuller Rennsport #6"
          },
          {
            "id" : 69,
            "name" : "Haukeen Racing #3"
          },
          {
            "id" : 70,
            "name" : "Haukeen Racing #4"
          },
          {
            "id" : 71,
            "name" : "Momo Corse #7"
          },
          {
            "id" : 72,
            "name" : "Momo Corse #8"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage F1 A"
      },
      {
        "id" : 1965567405,
        "name" : "Ferrari LaFerrari",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Rosso Corsa"
          },
          {
            "id" : 2,
            "name" : "Giallo Modena"
          },
          {
            "id" : 3,
            "name" : "Nero"
          },
          {
            "id" : 4,
            "name" : "Nero Daytona metallic"
          },
          {
            "id" : 5,
            "name" : "Bianco Avus"
          },
          {
            "id" : 6,
            "name" : "Rosso Mugello"
          },
          {
            "id" : 7,
            "name" : "Rosso Scuderia"
          },
          {
            "id" : 8,
            "name" : "Argento Nurburgring"
          },
          {
            "id" : 9,
            "name" : "Blu Tour de France metallic"
          },
          {
            "id" : 10,
            "name" : "Blu Abu Dhabi metallic"
          },
          {
            "id" : 11,
            "name" : "Blu Mirabeau metallic"
          },
          {
            "id" : 12,
            "name" : "Blu Pozzi"
          },
          {
            "id" : 13,
            "name" : "Grigio Alloy metallic"
          },
          {
            "id" : 14,
            "name" : "Grigio Titanio metallic"
          },
          {
            "id" : 15,
            "name" : "Grigio Ingrid metallic"
          },
          {
            "id" : 16,
            "name" : "Grigio Silverstone metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road A"
      },
      {
        "id" : 1972396515,
        "name" : "Porsche 911 GT3 R Endurance",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche Manthey Racing #911"
          },
          {
            "id" : 52,
            "name" : "Porsche Manthey Racing #912"
          },
          {
            "id" : 53,
            "name" : "Falken Motorsport #3"
          },
          {
            "id" : 54,
            "name" : "Falken Motorsport #44"
          },
          {
            "id" : 55,
            "name" : "Manthey Racing #911a"
          },
          {
            "id" : 56,
            "name" : "Manthey Racing #911b"
          },
          {
            "id" : 57,
            "name" : "Rotmeg Racing Team #30"
          },
          {
            "id" : 58,
            "name" : "Rotmeg Racing Team #31"
          },
          {
            "id" : 59,
            "name" : "Team Jancon Mobile #94"
          },
          {
            "id" : 60,
            "name" : "Team Jancon Mobile #95"
          },
          {
            "id" : 61,
            "name" : "Len Ding Motorsport #143"
          },
          {
            "id" : 62,
            "name" : "Len Ding Motorsport #144"
          },
          {
            "id" : 63,
            "name" : "Oscaro eSports by SDL #27"
          },
          {
            "id" : 64,
            "name" : "Oscaro eSports by SDL #28"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : 1977120176,
        "name" : "Lamborghini Aventador LP700-4",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Arancio Argos"
          },
          {
            "id" : 2,
            "name" : "Arancio Atlas"
          },
          {
            "id" : 3,
            "name" : "Azzuro Thetis"
          },
          {
            "id" : 4,
            "name" : "Bianco Canopus"
          },
          {
            "id" : 5,
            "name" : "Bianco Isis"
          },
          {
            "id" : 6,
            "name" : "Blu Herra"
          },
          {
            "id" : 7,
            "name" : "Celeste"
          },
          {
            "id" : 8,
            "name" : "Celeste Phoebe"
          },
          {
            "id" : 9,
            "name" : "Giallo Evros"
          },
          {
            "id" : 10,
            "name" : "Giallo Orios"
          },
          {
            "id" : 11,
            "name" : "Grigio Estoque"
          },
          {
            "id" : 12,
            "name" : "Grigio Thalasso"
          },
          {
            "id" : 13,
            "name" : "Maronne Eklipsis"
          },
          {
            "id" : 14,
            "name" : "Nero Aldebaran"
          },
          {
            "id" : 15,
            "name" : "Nero Nemesis"
          },
          {
            "id" : 16,
            "name" : "Nero Pegaso"
          },
          {
            "id" : 17,
            "name" : "Oro Elios"
          },
          {
            "id" : 18,
            "name" : "Rosso Mars"
          },
          {
            "id" : 19,
            "name" : "Rosso Effeso"
          },
          {
            "id" : 20,
            "name" : "Verde Faunus"
          },
          {
            "id" : 21,
            "name" : "Verde Ithaca"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road B"
      },
      {
        "id" : 1979398129,
        "name" : "Mercedes-Benz CLK-LM",
        "liveries" : [
          {
            "id" : 51,
            "name" : "AMG Mercedes #35"
          },
          {
            "id" : 52,
            "name" : "AMG Mercedes #36"
          },
          {
            "id" : 53,
            "name" : "Sobrent Motorsport #5"
          },
          {
            "id" : 54,
            "name" : "Sobrent Motorsport #6"
          },
          {
            "id" : 55,
            "name" : "Mogernig Rennsport #8"
          },
          {
            "id" : 56,
            "name" : "Mogernig Rennsport #7"
          },
          {
            "id" : 57,
            "name" : "Scuderia AFdelta SpA #19"
          },
          {
            "id" : 58,
            "name" : "Scuderia Afdelta SpA #20"
          },
          {
            "id" : 59,
            "name" : "Curling Motorsport #25"
          },
          {
            "id" : 60,
            "name" : "Curling Motorsport #26"
          },
          {
            "id" : 61,
            "name" : "Team Gerhardt Electronics #28"
          },
          {
            "id" : 62,
            "name" : "Team Gerhardt Electronics #29"
          },
          {
            "id" : 63,
            "name" : "Gersten Felder Racing #45"
          },
          {
            "id" : 64,
            "name" : "Gersten Felder Racing #46"
          },
          {
            "id" : 65,
            "name" : "Zipanol Racing Team #49"
          },
          {
            "id" : 66,
            "name" : "Zipanol Racing Team #50"
          },
          {
            "id" : 67,
            "name" : "Lanova Motor Racing #60"
          },
          {
            "id" : 68,
            "name" : "Lanova Motor Racing #61"
          },
          {
            "id" : 69,
            "name" : "Team Aikyo Racing #66"
          },
          {
            "id" : 70,
            "name" : "Team Aikyo Racing #67"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT1"
      },
      {
        "id" : 2006190056,
        "name" : "Ferrari 458 Speciale A",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Giallo Modena"
          },
          {
            "id" : 2,
            "name" : "Rosso Corsa"
          },
          {
            "id" : 3,
            "name" : "Nero"
          },
          {
            "id" : 4,
            "name" : "Bianco Avus"
          },
          {
            "id" : 5,
            "name" : "Rosso Scuderia"
          },
          {
            "id" : 6,
            "name" : "Blu Pozzi"
          },
          {
            "id" : 7,
            "name" : "Nero Daytona Met."
          },
          {
            "id" : 8,
            "name" : "Rosso Mugello Met."
          },
          {
            "id" : 9,
            "name" : "Argento Nurburgring Met."
          },
          {
            "id" : 10,
            "name" : "Blu Tour de France Met."
          },
          {
            "id" : 11,
            "name" : "Blu Abu Dhabi Met."
          },
          {
            "id" : 12,
            "name" : "Blu Mirabeau Met."
          },
          {
            "id" : 13,
            "name" : "Grigio Alloy Met."
          },
          {
            "id" : 14,
            "name" : "Grigio Titanio Met."
          },
          {
            "id" : 15,
            "name" : "Grigio Ingrid Met."
          },
          {
            "id" : 16,
            "name" : "Grigio Silverstone Met."
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road B"
      },
      {
        "id" : 2037619631,
        "name" : "Volkswagen Polo RX Supercar",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Volkswagen Team Sweden #3"
          },
          {
            "id" : 52,
            "name" : "Volkswagen Team Sweden #92"
          },
          {
            "id" : 53,
            "name" : "BolandKev Rallye Sports #50 "
          },
          {
            "id" : 54,
            "name" : "BolandKev Rallye Sports #62"
          },
          {
            "id" : 55,
            "name" : "Sciflex Group #8"
          },
          {
            "id" : 56,
            "name" : "Sciflex Group #9"
          },
          {
            "id" : 57,
            "name" : "Incredible Cars Racing #63"
          },
          {
            "id" : 58,
            "name" : "Incredible Cars Racing #64"
          },
          {
            "id" : 59,
            "name" : "Team Klarc Tools #51"
          },
          {
            "id" : 60,
            "name" : "Team Klarc Tools #52"
          },
          {
            "id" : 61,
            "name" : "Hutchin GS Systems #44"
          },
          {
            "id" : 62,
            "name" : "Hutchin GS Systems #45"
          },
          {
            "id" : 63,
            "name" : "Soltseem Motorsport #60"
          },
          {
            "id" : 64,
            "name" : "Soltseem Motorsport #61"
          },
          {
            "id" : 65,
            "name" : "Alivstore Racing Team #48"
          },
          {
            "id" : 66,
            "name" : "Alivstore Racing Team #49"
          },
          {
            "id" : 67,
            "name" : "Demonio Racing #22"
          },
          {
            "id" : 68,
            "name" : "Demonio Racing #23"
          },
          {
            "id" : 69,
            "name" : "Mondoline Motorsport #10"
          },
          {
            "id" : 70,
            "name" : "Mondoline Motorsport #11"
          },
          {
            "id" : 71,
            "name" : "Lintje Racing #78"
          },
          {
            "id" : 72,
            "name" : "Lintje Racing #82"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "WRX"
      },
      {
        "id" : 2082176226,
        "name" : "Audi A1 quattro",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Glacier White Metallic"
          },
          {
            "id" : 2,
            "name" : "Brilliant Black"
          },
          {
            "id" : 3,
            "name" : "Cortina White"
          },
          {
            "id" : 4,
            "name" : "Vegas Yellow"
          },
          {
            "id" : 5,
            "name" : "Floret Silver Metallic"
          },
          {
            "id" : 6,
            "name" : "Mythos Black Metallic"
          },
          {
            "id" : 7,
            "name" : "Nano Grey Metallic"
          },
          {
            "id" : 8,
            "name" : "Scuba Blue Metallic"
          },
          {
            "id" : 9,
            "name" : "Daytona Grey Pearl"
          },
          {
            "id" : 10,
            "name" : "Misano Red Pearl"
          },
          {
            "id" : 11,
            "name" : "Sepang Blue Pearl"
          },
          {
            "id" : 53,
            "name" : "Bersmann Motorsport"
          },
          {
            "id" : 55,
            "name" : "Black Matte"
          },
          {
            "id" : 56,
            "name" : "RST"
          },
          {
            "id" : 57,
            "name" : "Gold Metallic"
          },
          {
            "id" : 58,
            "name" : "Red/White Stripes"
          },
          {
            "id" : 59,
            "name" : "Yellow Metallic"
          },
          {
            "id" : 60,
            "name" : "Black/Silver Metallic"
          },
          {
            "id" : 61,
            "name" : "Blue Metallic"
          },
          {
            "id" : 62,
            "name" : "Green Metallic"
          },
          {
            "id" : 63,
            "name" : "Dark Bronze Metallic"
          },
          {
            "id" : 64,
            "name" : "Dark Orange Metallic"
          },
          {
            "id" : 65,
            "name" : "Drigsmann Motorsport"
          },
          {
            "id" : 66,
            "name" : "Bright Green"
          },
          {
            "id" : 67,
            "name" : "Light Blue Metallic"
          },
          {
            "id" : 68,
            "name" : "Dark Blue"
          },
          {
            "id" : 69,
            "name" : "Game X Motorsports"
          },
          {
            "id" : 70,
            "name" : "Purple Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road F"
      },
      {
        "id" : 2086246081,
        "name" : "Aston Martin Vantage GT4",
        "liveries" : [
          {
            "id" : 53,
            "name" : "Holinger Engineering Team #16"
          },
          {
            "id" : 54,
            "name" : "Holinger Engineering Team #17"
          },
          {
            "id" : 55,
            "name" : "Team GedK Gloves #109"
          },
          {
            "id" : 56,
            "name" : "Team GedK Gloves #110"
          },
          {
            "id" : 57,
            "name" : "Recaro Team #62"
          },
          {
            "id" : 58,
            "name" : "Recaro Team #63"
          },
          {
            "id" : 59,
            "name" : "Jennkins Motorsport #45"
          },
          {
            "id" : 60,
            "name" : "Jennkins Motorsport #46"
          },
          {
            "id" : 61,
            "name" : "Horbsner Automotive #68"
          },
          {
            "id" : 62,
            "name" : "Horbsner Automotive #69"
          },
          {
            "id" : 63,
            "name" : "BNS Birdia #53"
          },
          {
            "id" : 64,
            "name" : "BNS Birdia #54"
          },
          {
            "id" : 65,
            "name" : "Zavima Racing Team #101"
          },
          {
            "id" : 66,
            "name" : "Zavima Racing Team #102"
          },
          {
            "id" : 67,
            "name" : "Pirelli Team #74"
          },
          {
            "id" : 68,
            "name" : "Pirelli Team #75"
          },
          {
            "id" : 69,
            "name" : "HR Team #123"
          },
          {
            "id" : 70,
            "name" : "HR Team #124"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT4"
      },
      {
        "id" : 2091910841,
        "name" : "Ginetta G55 GT4",
        "liveries" : [
          {
            "id" : 52,
            "name" : "NX Oil Racing #79"
          },
          {
            "id" : 53,
            "name" : "NX Oil Racing #80"
          },
          {
            "id" : 54,
            "name" : "ZeroDF Racing #13"
          },
          {
            "id" : 55,
            "name" : "ZeroDF Racing #14"
          },
          {
            "id" : 56,
            "name" : "Keaveneys Motorsport #18"
          },
          {
            "id" : 57,
            "name" : "Keaveneys Motorsport #19"
          },
          {
            "id" : 58,
            "name" : "Harden Racing Team #26"
          },
          {
            "id" : 59,
            "name" : "Harden Racing Team #27"
          },
          {
            "id" : 60,
            "name" : "Optimalin Motor Racing #113"
          },
          {
            "id" : 61,
            "name" : "Optimalin Motor Racing #114"
          },
          {
            "id" : 62,
            "name" : "Team CRCP #59"
          },
          {
            "id" : 63,
            "name" : "Team CRCP #60"
          },
          {
            "id" : 64,
            "name" : "Ilpo Fly Team #67"
          },
          {
            "id" : 65,
            "name" : "Ilpo Fly Team #71"
          },
          {
            "id" : 66,
            "name" : "Anderson Motorsport #89"
          },
          {
            "id" : 67,
            "name" : "Anderson Motorsport #90"
          },
          {
            "id" : 68,
            "name" : "Miko Motors #83"
          },
          {
            "id" : 69,
            "name" : "Miko Motors #84"
          },
          {
            "id" : 70,
            "name" : "Otto Motor Oil #95"
          },
          {
            "id" : 71,
            "name" : "Otto Motor Oil #96"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT4"
      },
      {
        "id" : 2136103830,
        "name" : "Nissan Skyline GT-R (BNR32) Group A",
        "liveries" : [
          {
            "id" : 51,
            "name" : "HKS Racing #87"
          },
          {
            "id" : 52,
            "name" : "HKS Racing #87b"
          },
          {
            "id" : 53,
            "name" : "Team Taisan #2"
          },
          {
            "id" : 54,
            "name" : "Team Taisan #2b"
          },
          {
            "id" : 55,
            "name" : "Hoshino Impul Racing #1"
          },
          {
            "id" : 56,
            "name" : "Hoshino Impul Racing #1b"
          },
          {
            "id" : 57,
            "name" : "Nissan Team Zexel #25"
          },
          {
            "id" : 58,
            "name" : "Nissan Team Zexel #25b"
          },
          {
            "id" : 59,
            "name" : "Team Kyoseki GP1 Plus #55"
          },
          {
            "id" : 60,
            "name" : "Team Kyoseki GP1 Plus #55b"
          },
          {
            "id" : 61,
            "name" : "Napolex Racing Team #12"
          },
          {
            "id" : 62,
            "name" : "Napolex Racing Team #12b"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group A"
      },
      {
        "id" : -2139807191,
        "name" : "Audi S1 EKS RX quattro",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Audi Team EKS #1"
          },
          {
            "id" : 52,
            "name" : "Audi Team EKS #57"
          },
          {
            "id" : 53,
            "name" : "Audi Team EKS #15 "
          },
          {
            "id" : 54,
            "name" : "Audi Team EKS #51"
          },
          {
            "id" : 55,
            "name" : "Team Mestron #41"
          },
          {
            "id" : 56,
            "name" : "Team Mestron #42"
          },
          {
            "id" : 57,
            "name" : "Benefit Pro Racing Team #73"
          },
          {
            "id" : 58,
            "name" : "Benefit Pro Racing Team #74"
          },
          {
            "id" : 59,
            "name" : "Dessil Motorsport #4"
          },
          {
            "id" : 60,
            "name" : "Dessil Motorsport #5"
          },
          {
            "id" : 61,
            "name" : "Curtis Racing Team #6"
          },
          {
            "id" : 62,
            "name" : "Curtis Racing Team #7"
          },
          {
            "id" : 63,
            "name" : "Team S+A #68"
          },
          {
            "id" : 64,
            "name" : "Team S+A #69"
          },
          {
            "id" : 65,
            "name" : "Twist Coast Racing #50"
          },
          {
            "id" : 66,
            "name" : "Twist Coast Racing #51"
          },
          {
            "id" : 67,
            "name" : "Kamiko Motorsport #79"
          },
          {
            "id" : 68,
            "name" : "Kamiko Motorsport #80"
          },
          {
            "id" : 69,
            "name" : "Samurai Rallycross Team #81"
          },
          {
            "id" : 70,
            "name" : "Samurai Rallycross Team #82"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "WRX"
      },
      {
        "id" : -2133597590,
        "name" : "Porsche 911 GT3 RS",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Lavaorange"
          },
          {
            "id" : 2,
            "name" : "Weiss"
          },
          {
            "id" : 3,
            "name" : "GT Silber Metallic"
          },
          {
            "id" : 4,
            "name" : "Ultraviolett"
          },
          {
            "id" : 5,
            "name" : "Hellgruen"
          },
          {
            "id" : 6,
            "name" : "Tiffanyblau"
          },
          {
            "id" : 7,
            "name" : "Signalorange"
          },
          {
            "id" : 8,
            "name" : "Voodooblau"
          },
          {
            "id" : 9,
            "name" : "Schwarz"
          },
          {
            "id" : 10,
            "name" : "Birkengruen"
          },
          {
            "id" : 11,
            "name" : "Speedgelb"
          },
          {
            "id" : 12,
            "name" : "RS Gruen"
          },
          {
            "id" : 13,
            "name" : "Mexicoblau"
          },
          {
            "id" : 14,
            "name" : "Sternrubin"
          },
          {
            "id" : 15,
            "name" : "Saphirblau Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road B"
      },
      {
        "id" : -2075284877,
        "name" : "Formula Rookie",
        "liveries" : [
          {
            "id" : 51,
            "name" : "RST Motorsports #61"
          },
          {
            "id" : 52,
            "name" : "RST Motorsports #62"
          },
          {
            "id" : 53,
            "name" : "Borda Racing #17"
          },
          {
            "id" : 54,
            "name" : "Borda Racing #18"
          },
          {
            "id" : 55,
            "name" : "Team Southern Cars #36"
          },
          {
            "id" : 56,
            "name" : "Team Southern Cars #37"
          },
          {
            "id" : 57,
            "name" : "Drag and Drop Racing Team #98"
          },
          {
            "id" : 58,
            "name" : "Drag and Drop Racing Team #99"
          },
          {
            "id" : 59,
            "name" : "Flatout Alliance #74"
          },
          {
            "id" : 60,
            "name" : "Flatout Alliance #75"
          },
          {
            "id" : 61,
            "name" : "Sheriftizer Motorsport #35"
          },
          {
            "id" : 62,
            "name" : "Sheriftizer Motorsport #39"
          },
          {
            "id" : 63,
            "name" : "Fnix Racing Team #3"
          },
          {
            "id" : 64,
            "name" : "Fnix Racing Team #4"
          },
          {
            "id" : 65,
            "name" : "Avens Auto Racing #9"
          },
          {
            "id" : 66,
            "name" : "Avens Auto Racing #10"
          },
          {
            "id" : 67,
            "name" : "Equipe Montgolfier #40"
          },
          {
            "id" : 68,
            "name" : "Equipe Montgolfier #41"
          },
          {
            "id" : 69,
            "name" : "Team Bolton Touristic #11"
          },
          {
            "id" : 70,
            "name" : "Team Bolton Touristic #12"
          },
          {
            "id" : 71,
            "name" : "Cassius Racing #1"
          },
          {
            "id" : 72,
            "name" : "Cassius Racing #2"
          },
          {
            "id" : 73,
            "name" : "Tiger Energy Motorsports #5"
          },
          {
            "id" : 74,
            "name" : "Tiger Energy Motorsports #6"
          },
          {
            "id" : 75,
            "name" : "Scuderia AFdelta SpA #7"
          },
          {
            "id" : 76,
            "name" : "Scuderia AFdelta SpA #8"
          },
          {
            "id" : 77,
            "name" : "Domutech Racing #46"
          },
          {
            "id" : 78,
            "name" : "Domutech Racing #47"
          },
          {
            "id" : 79,
            "name" : "Jiffy Trans Racing Team #13"
          },
          {
            "id" : 80,
            "name" : "Jiffy Trans Racing Team #14"
          },
          {
            "id" : 81,
            "name" : "Kerozen Racing #20"
          },
          {
            "id" : 82,
            "name" : "Kerozen Racing #21"
          },
          {
            "id" : 83,
            "name" : "JAMeskett Motorsports #101"
          },
          {
            "id" : 84,
            "name" : "JAMeskett Motorsports #102"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "F5"
      },
      {
        "id" : -2064669470,
        "name" : "Dallara IR-12 Honda (Speedway)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Schmidt Peterson #5"
          },
          {
            "id" : 52,
            "name" : "Schmidt Peterson #7"
          },
          {
            "id" : 53,
            "name" : "A.J. Foyt Enterprises #14"
          },
          {
            "id" : 54,
            "name" : "RLL Racing #15"
          },
          {
            "id" : 55,
            "name" : "RLL Racing #16"
          },
          {
            "id" : 56,
            "name" : "Dale Coyne Racing #18"
          },
          {
            "id" : 57,
            "name" : "Dale Coyne Racing #19"
          },
          {
            "id" : 58,
            "name" : "Andretti Autosport #26"
          },
          {
            "id" : 59,
            "name" : "Andretti Autosport #27"
          },
          {
            "id" : 60,
            "name" : "Andretti Autosport #28"
          },
          {
            "id" : 61,
            "name" : "Andretti Autosport #29"
          },
          {
            "id" : 62,
            "name" : "A.J. Foyt Enterprises #35"
          },
          {
            "id" : 63,
            "name" : "A.J. Foyt Enterprises #41"
          },
          {
            "id" : 64,
            "name" : "Dale Coyne Racing #63"
          },
          {
            "id" : 65,
            "name" : "Schmidt Peterson #77"
          },
          {
            "id" : 66,
            "name" : "Johnathan Byrd's Racing #88"
          },
          {
            "id" : 67,
            "name" : "Andretti Herta Autosport #98"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Indycar"
      },
      {
        "id" : -2059595338,
        "name" : "Mercedes-AMG GT R",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Green Hell Magno"
          },
          {
            "id" : 2,
            "name" : "Schwarz"
          },
          {
            "id" : 3,
            "name" : "Feueropal"
          },
          {
            "id" : 4,
            "name" : "Brilliantblau Metallic"
          },
          {
            "id" : 5,
            "name" : "AMG Solarbeam"
          },
          {
            "id" : 6,
            "name" : "Iridiumsilber Metallic"
          },
          {
            "id" : 7,
            "name" : "Magnetitschwarz Metallic"
          },
          {
            "id" : 8,
            "name" : "Selenitgrau Metallic"
          },
          {
            "id" : 9,
            "name" : "Disegno Hyazinthrot Metallic"
          },
          {
            "id" : 10,
            "name" : "Disegno Diamantweiss"
          },
          {
            "id" : 11,
            "name" : "Disegno Iridiumsilber Magno"
          },
          {
            "id" : 12,
            "name" : "Disegno Selenitgrau Magno"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : -2025231366,
        "name" : "Cadillac ATS-V.R GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Cadillac Racing #3"
          },
          {
            "id" : 52,
            "name" : "Cadillac Racing #8"
          },
          {
            "id" : 53,
            "name" : "Cadillac Racing 2017 #3"
          },
          {
            "id" : 54,
            "name" : "Cadillac Racing 2017 #8"
          },
          {
            "id" : 55,
            "name" : "Henmis Racing Team #115"
          },
          {
            "id" : 56,
            "name" : "Henmis Racing Team #116"
          },
          {
            "id" : 57,
            "name" : "Zipanol Racing #121"
          },
          {
            "id" : 58,
            "name" : "Zipanol Racing #122"
          },
          {
            "id" : 59,
            "name" : "Decksbern Motorsport #129"
          },
          {
            "id" : 60,
            "name" : "Decksbern Motorsport #130"
          },
          {
            "id" : 61,
            "name" : "Team Meleshkin #84"
          },
          {
            "id" : 62,
            "name" : "Team Meleshkin #85"
          },
          {
            "id" : 63,
            "name" : "Brps Autosport #46"
          },
          {
            "id" : 64,
            "name" : "Brps Autosport #47"
          },
          {
            "id" : 65,
            "name" : "WRB Motorsport #185"
          },
          {
            "id" : 66,
            "name" : "WRB Motorsport #186"
          },
          {
            "id" : 67,
            "name" : "Equipe Dambreville #50"
          },
          {
            "id" : 68,
            "name" : "Equipe Dambreville #51"
          },
          {
            "id" : 69,
            "name" : "Velltao Team #199"
          },
          {
            "id" : 70,
            "name" : "Velltao Team #200"
          },
          {
            "id" : 71,
            "name" : "Mann Performance Parts #80"
          },
          {
            "id" : 72,
            "name" : "Mann Performance Parts #81"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : -1967832633,
        "name" : "Ferrari F40",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Rosso Corsa"
          },
          {
            "id" : 2,
            "name" : "Giallo"
          },
          {
            "id" : 3,
            "name" : "Bianco"
          },
          {
            "id" : 4,
            "name" : "Nero"
          },
          {
            "id" : 5,
            "name" : "Argento"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road D"
      },
      {
        "id" : -1966060946,
        "name" : "Mazda MX-5 Radbul",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Mad Mike Radbul"
          },
          {
            "id" : 52,
            "name" : "Mad Mike Radbul Digital Camo"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Drift"
      },
      {
        "id" : -1951461577,
        "name" : "Ligier JS P3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Graff Racing #9"
          },
          {
            "id" : 52,
            "name" : "Graff Racing #10"
          },
          {
            "id" : 53,
            "name" : "JDC Motorsports #10"
          },
          {
            "id" : 54,
            "name" : "JDC Motorsports #55"
          },
          {
            "id" : 55,
            "name" : "JDC Motorsports #25"
          },
          {
            "id" : 56,
            "name" : "JDC Motorsports 2 #25"
          },
          {
            "id" : 57,
            "name" : "OAK Racing #24"
          },
          {
            "id" : 58,
            "name" : "Onroak Automotive #0"
          },
          {
            "id" : 59,
            "name" : "United Autosports Team #22"
          },
          {
            "id" : 60,
            "name" : "United Autosports Team #2"
          },
          {
            "id" : 61,
            "name" : "United Autosports Team #3"
          },
          {
            "id" : 62,
            "name" : "Serious Racing Team #22"
          },
          {
            "id" : 63,
            "name" : "Serious Racing Team #23"
          },
          {
            "id" : 64,
            "name" : "OCH Racing #74"
          },
          {
            "id" : 65,
            "name" : "OCH Racing #75"
          },
          {
            "id" : 66,
            "name" : "WRB Motorsport #45"
          },
          {
            "id" : 67,
            "name" : "WRB Motorsport #46"
          },
          {
            "id" : 68,
            "name" : "Gruppo Ancoderro Racing #82"
          },
          {
            "id" : 69,
            "name" : "Gruppo Ancoderro Racing #83"
          },
          {
            "id" : 70,
            "name" : "Borda Racing #14"
          },
          {
            "id" : 71,
            "name" : "Borda Racing #15"
          },
          {
            "id" : 72,
            "name" : "VittR Motorsport #18"
          },
          {
            "id" : 73,
            "name" : "VittR Motorsport #19"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP3"
      },
      {
        "id" : -1902340407,
        "name" : "Ferrari 288 GTO",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Rosso Corsa"
          },
          {
            "id" : 2,
            "name" : "Giallo Modena"
          },
          {
            "id" : 3,
            "name" : "Bianco Avus"
          },
          {
            "id" : 4,
            "name" : "Nero Daytona"
          },
          {
            "id" : 5,
            "name" : "Argento Nurburgring"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road E"
      },
      {
        "id" : -1860886593,
        "name" : "Renault Sport R.S. 01 GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Renault Sport #01"
          },
          {
            "id" : 52,
            "name" : "Renault Sport #02"
          },
          {
            "id" : 53,
            "name" : "Team Playseat #08"
          },
          {
            "id" : 54,
            "name" : "Team Playseat #09"
          },
          {
            "id" : 55,
            "name" : "Team Sim Racer Magazine #03"
          },
          {
            "id" : 56,
            "name" : "Team Sim Racer Magazine #04"
          },
          {
            "id" : 57,
            "name" : "Team Thrustmaster #10"
          },
          {
            "id" : 58,
            "name" : "Team Thrustmaster #11"
          },
          {
            "id" : 59,
            "name" : "Team Oculus #16"
          },
          {
            "id" : 60,
            "name" : "Team Oculus #17"
          },
          {
            "id" : 61,
            "name" : "Team Nvidia #14"
          },
          {
            "id" : 62,
            "name" : "Team Nvidia #15"
          },
          {
            "id" : 63,
            "name" : "Petroblast Racing Team #39"
          },
          {
            "id" : 64,
            "name" : "Petroblast Racing Team #40"
          },
          {
            "id" : 65,
            "name" : "Team Crettphone #18"
          },
          {
            "id" : 66,
            "name" : "Team Crettphone #19"
          },
          {
            "id" : 67,
            "name" : "StartN.Go Racing #42"
          },
          {
            "id" : 68,
            "name" : "StartN.Go Racing #43"
          },
          {
            "id" : 69,
            "name" : "Panzer Race Tuning #23"
          },
          {
            "id" : 70,
            "name" : "Panzer Race Tuning #24"
          },
          {
            "id" : 71,
            "name" : "Vasmac Motorsport #32"
          },
          {
            "id" : 72,
            "name" : "Vasmac Motorsport #33"
          },
          {
            "id" : 73,
            "name" : "Equipe Bleu de France #21"
          },
          {
            "id" : 74,
            "name" : "Equipe Bleu de France #22"
          },
          {
            "id" : 75,
            "name" : "Argot Racing #37"
          },
          {
            "id" : 76,
            "name" : "Argot Racing #38"
          },
          {
            "id" : 77,
            "name" : "FUB Motorsport #06"
          },
          {
            "id" : 78,
            "name" : "FUB Motorsport #07"
          },
          {
            "id" : 79,
            "name" : "Kuebler Racing #25"
          },
          {
            "id" : 80,
            "name" : "Kuebler Racing #26"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : -1856998124,
        "name" : "Renault Sport R.S. 01",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Renault Sport #01"
          },
          {
            "id" : 52,
            "name" : "Renault Sport #02"
          },
          {
            "id" : 53,
            "name" : "Team Playseat #08"
          },
          {
            "id" : 54,
            "name" : "Team Playseat #09"
          },
          {
            "id" : 55,
            "name" : "Team Sim Racer Magazine #03"
          },
          {
            "id" : 56,
            "name" : "Team Sim Racer Magazine #04"
          },
          {
            "id" : 57,
            "name" : "Team Thrustmaster #10"
          },
          {
            "id" : 58,
            "name" : "Team Thrustmaster #11"
          },
          {
            "id" : 59,
            "name" : "Team Oculus #16"
          },
          {
            "id" : 60,
            "name" : "Team Oculus #17"
          },
          {
            "id" : 61,
            "name" : "Team Nvidia #14"
          },
          {
            "id" : 62,
            "name" : "Team Nvidia #15"
          },
          {
            "id" : 63,
            "name" : "Petroblast Racing Team #39"
          },
          {
            "id" : 64,
            "name" : "Petroblast Racing Team #40"
          },
          {
            "id" : 65,
            "name" : "Team Crettphone #18"
          },
          {
            "id" : 66,
            "name" : "Team Crettphone #19"
          },
          {
            "id" : 67,
            "name" : "StartN.Go Racing #42"
          },
          {
            "id" : 68,
            "name" : "StartN.Go Racing #43"
          },
          {
            "id" : 69,
            "name" : "Panzer Race Tuning #23"
          },
          {
            "id" : 70,
            "name" : "Panzer Race Tuning #24"
          },
          {
            "id" : 71,
            "name" : "Vasmac Motorsport #32"
          },
          {
            "id" : 72,
            "name" : "Vasmac Motorsport #33"
          },
          {
            "id" : 73,
            "name" : "Equipe Bleu de France #21"
          },
          {
            "id" : 74,
            "name" : "Equipe Bleu de France #22"
          },
          {
            "id" : 75,
            "name" : "Argot Racing #37"
          },
          {
            "id" : 76,
            "name" : "Argot Racing #38"
          },
          {
            "id" : 77,
            "name" : "FUB Motorsport #06"
          },
          {
            "id" : 78,
            "name" : "FUB Motorsport #07"
          },
          {
            "id" : 79,
            "name" : "Kuebler Racing #25"
          },
          {
            "id" : 80,
            "name" : "Kuebler Racing #26"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "RS01 Trophy"
      },
      {
        "id" : -1856752594,
        "name" : "Ford GT LM GTE",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Ford Ganassi Racing #66"
          },
          {
            "id" : 52,
            "name" : "Ford Ganassi Racing #67"
          },
          {
            "id" : 53,
            "name" : "Ford Ganassi Racing #68"
          },
          {
            "id" : 54,
            "name" : "Ford Ganassi Racing #69"
          },
          {
            "id" : 55,
            "name" : "Ford Ganassi Racing IMSA #66"
          },
          {
            "id" : 56,
            "name" : "Ford Ganassi Racing IMSA #67"
          },
          {
            "id" : 57,
            "name" : "Team F.ivoo Racing #15"
          },
          {
            "id" : 58,
            "name" : "Team F.ivoo Racing #16"
          },
          {
            "id" : 59,
            "name" : "Avilgio Motorsports #52"
          },
          {
            "id" : 60,
            "name" : "Avilgio Motorsports #53"
          },
          {
            "id" : 61,
            "name" : "Team Populus Bank #58"
          },
          {
            "id" : 62,
            "name" : "Team Populus Bank #59"
          },
          {
            "id" : 63,
            "name" : "Pinn Electron Motor Racing #40"
          },
          {
            "id" : 64,
            "name" : "Pinn Electron Motor Racing #41"
          },
          {
            "id" : 65,
            "name" : "Adrenaline Motorsport #33"
          },
          {
            "id" : 66,
            "name" : "Adrenaline Motorsport #34"
          },
          {
            "id" : 67,
            "name" : "Ford Heritage Racing #2"
          },
          {
            "id" : 68,
            "name" : "Ford Heritage Racing #7"
          },
          {
            "id" : 69,
            "name" : "Classic Racing #8"
          },
          {
            "id" : 70,
            "name" : "Classic Racing #9"
          },
          {
            "id" : 71,
            "name" : "PCCF Community Events Online #19"
          },
          {
            "id" : 72,
            "name" : "PCCF Community Events Online #20"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTE"
      },
      {
        "id" : -1835861548,
        "name" : "Lotus Type 78 Cosworth",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Lotus #5"
          },
          {
            "id" : 52,
            "name" : "Team Lotus #6"
          },
          {
            "id" : 53,
            "name" : "Zipanol Racing Team #8"
          },
          {
            "id" : 54,
            "name" : "Zipanol Racing Team #9"
          },
          {
            "id" : 55,
            "name" : "Flynn Motor Racing #3"
          },
          {
            "id" : 56,
            "name" : "Flynn Motor Racing #4"
          },
          {
            "id" : 57,
            "name" : "Dominum Musk Racing #10"
          },
          {
            "id" : 58,
            "name" : "Dominum Musk Racing #11"
          },
          {
            "id" : 59,
            "name" : "Imochi Racing Team #1"
          },
          {
            "id" : 60,
            "name" : "Imochi Racing Team #2"
          },
          {
            "id" : 61,
            "name" : "P-1 Motors #16"
          },
          {
            "id" : 62,
            "name" : "P-1 Motors #17"
          },
          {
            "id" : 63,
            "name" : "Stichmuller Rennsport #24"
          },
          {
            "id" : 64,
            "name" : "Stichmuller Rennsport #25"
          },
          {
            "id" : 65,
            "name" : "Team Moll Brothers #14"
          },
          {
            "id" : 66,
            "name" : "Team Moll Brothers #15"
          },
          {
            "id" : 67,
            "name" : "Team Flash Speed #18"
          },
          {
            "id" : 68,
            "name" : "Team Flash Speed #19"
          },
          {
            "id" : 69,
            "name" : "Acesits Motorsports #20"
          },
          {
            "id" : 70,
            "name" : "Acesits Motorsports #21"
          },
          {
            "id" : 71,
            "name" : "Momo Corse #27"
          },
          {
            "id" : 72,
            "name" : "Momo Corse #28"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage F1 B"
      },
      {
        "id" : -1835136516,
        "name" : "Porsche 917K",
        "liveries" : [
          {
            "id" : 51,
            "name" : "J.W. Automotive Engineering #1"
          },
          {
            "id" : 52,
            "name" : "J.W. Automotive Engineering #2"
          },
          {
            "id" : 53,
            "name" : "J.W. Automotive Engineering #9"
          },
          {
            "id" : 54,
            "name" : "J.W. Automotive Engineering #10"
          },
          {
            "id" : 55,
            "name" : "Porsche Konstruktionen K.G #3"
          },
          {
            "id" : 56,
            "name" : "Porsche Konstruktionen K.G #23"
          },
          {
            "id" : 57,
            "name" : "Porsche Audi #16"
          },
          {
            "id" : 58,
            "name" : "Porsche Audi #17"
          },
          {
            "id" : 59,
            "name" : "Porsche Salzburg #28"
          },
          {
            "id" : 60,
            "name" : "Porsche Racing Team #3"
          },
          {
            "id" : 61,
            "name" : "Porsche Racing Team #8"
          },
          {
            "id" : 62,
            "name" : "Porsche Racing Team #9"
          },
          {
            "id" : 63,
            "name" : "Porsche Racing Team #36"
          },
          {
            "id" : 64,
            "name" : "Porsche Racing Team #38"
          },
          {
            "id" : 65,
            "name" : "International Racing Team #35"
          },
          {
            "id" : 66,
            "name" : "International Racing Team #2"
          },
          {
            "id" : 67,
            "name" : "Gesipa Racing Team #3"
          },
          {
            "id" : 68,
            "name" : "Gesipa Racing Team #54"
          },
          {
            "id" : 69,
            "name" : "Team A.A.W #18"
          },
          {
            "id" : 70,
            "name" : "Team A.A.W #8"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Prototype A"
      },
      {
        "id" : -1831147854,
        "name" : "Ferrari 512 M",
        "liveries" : [
          {
            "id" : 51,
            "name" : "S.E.F.A.C. Ferrari #4"
          },
          {
            "id" : 52,
            "name" : "S.E.F.A.C. Ferrari #22"
          },
          {
            "id" : 53,
            "name" : "North American Racing Team #22"
          },
          {
            "id" : 54,
            "name" : "North American Racing Team #12"
          },
          {
            "id" : 63,
            "name" : "Escuderia Montjuich #3"
          },
          {
            "id" : 55,
            "name" : "Escuderia Montjuich #15"
          },
          {
            "id" : 56,
            "name" : "Escuderia Montjuich #142"
          },
          {
            "id" : 57,
            "name" : "Penske/White Racing #6"
          },
          {
            "id" : 58,
            "name" : "Penske/White Racing #11"
          },
          {
            "id" : 59,
            "name" : "Scuderia Filipinetti #6"
          },
          {
            "id" : 60,
            "name" : "Scuderia Filipinetti #7"
          },
          {
            "id" : 66,
            "name" : "Gelo Racing Team #7"
          },
          {
            "id" : 61,
            "name" : "Gelo Racing Team #10"
          },
          {
            "id" : 62,
            "name" : "Herbert Muller Racing #60"
          },
          {
            "id" : 64,
            "name" : "Ecurie Francorchamps #9"
          },
          {
            "id" : 65,
            "name" : "David Piper #16"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Prototype A"
      },
      {
        "id" : -1796949190,
        "name" : "Ford Escort RS1600 (Rallycross)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Ringley Rally Group #48"
          },
          {
            "id" : 52,
            "name" : "Ringley Rally Group #49"
          },
          {
            "id" : 53,
            "name" : "Decksbern Motorsport #12"
          },
          {
            "id" : 54,
            "name" : "Decksbern Motorsport #13"
          },
          {
            "id" : 55,
            "name" : "Fonderie Sports #38"
          },
          {
            "id" : 56,
            "name" : "Fonderie Sports #39"
          },
          {
            "id" : 57,
            "name" : "Welker Racing #118"
          },
          {
            "id" : 58,
            "name" : "Welker Racing #119"
          },
          {
            "id" : 59,
            "name" : "Keaveneys #42"
          },
          {
            "id" : 60,
            "name" : "Keaveneys #43"
          },
          {
            "id" : 61,
            "name" : "Lolom Rallye #55"
          },
          {
            "id" : 62,
            "name" : "Lolom Ralley #56"
          },
          {
            "id" : 63,
            "name" : "Barata Engneering #79"
          },
          {
            "id" : 64,
            "name" : "Barata Engneering #80"
          },
          {
            "id" : 65,
            "name" : "Andy Clark Inc. #60"
          },
          {
            "id" : 66,
            "name" : "Andy Clark Inc. #61"
          },
          {
            "id" : 67,
            "name" : "Boland and Tudor Rallye #466"
          },
          {
            "id" : 68,
            "name" : "Boland and Tudor Rallye #467"
          },
          {
            "id" : 69,
            "name" : "Noxi Rallye Team #26"
          },
          {
            "id" : 70,
            "name" : "Noxi Rallye Team #27"
          },
          {
            "id" : 71,
            "name" : "Hummerich Rennsport #18"
          },
          {
            "id" : 72,
            "name" : "Hummerich Rennsport #19"
          },
          {
            "id" : 73,
            "name" : "Borda Racing #64"
          },
          {
            "id" : 74,
            "name" : "Borda Racing #65"
          },
          {
            "id" : 75,
            "name" : "Curtis Racing Team #183"
          },
          {
            "id" : 76,
            "name" : "Curtis Racing Team #184"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage RX"
      },
      {
        "id" : -1796028503,
        "name" : "Dallara IR-12 Honda (Road Course)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Schmidt Peterson #5"
          },
          {
            "id" : 52,
            "name" : "Schmidt Peterson #7"
          },
          {
            "id" : 53,
            "name" : "A.J. Foyt Enterprises #14"
          },
          {
            "id" : 54,
            "name" : "RLL Racing #15"
          },
          {
            "id" : 56,
            "name" : "Dale Coyne Racing #18"
          },
          {
            "id" : 57,
            "name" : "Dale Coyne Racing #19"
          },
          {
            "id" : 58,
            "name" : "Andretti Autosport #26"
          },
          {
            "id" : 59,
            "name" : "Andretti Autosport #27"
          },
          {
            "id" : 60,
            "name" : "Andretti Autosport #28"
          },
          {
            "id" : 62,
            "name" : "A.J. Foyt Enterprises #35"
          },
          {
            "id" : 63,
            "name" : "A.J. Foyt Enterprises #41"
          },
          {
            "id" : 67,
            "name" : "Andretti Herta Autosport #98"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Indycar"
      },
      {
        "id" : -1774335742,
        "name" : "Ford MkIV",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Shelby American Inc. #1"
          },
          {
            "id" : 52,
            "name" : "Shelby American Inc. #2"
          },
          {
            "id" : 53,
            "name" : "Holman and Moody #3"
          },
          {
            "id" : 54,
            "name" : "Holman and Moody #4"
          },
          {
            "id" : 55,
            "name" : "Team V8 Regular #8"
          },
          {
            "id" : 56,
            "name" : "Team V8 Regular #9"
          },
          {
            "id" : 57,
            "name" : "Oilzanol Racing #37"
          },
          {
            "id" : 58,
            "name" : "Oilzanol Racing #38"
          },
          {
            "id" : 59,
            "name" : "Flak Motorsports #19"
          },
          {
            "id" : 60,
            "name" : "Flak Motorsports #20"
          },
          {
            "id" : 61,
            "name" : "Mixlub Racing Team #21"
          },
          {
            "id" : 62,
            "name" : "Mixlub Racing Team #22"
          },
          {
            "id" : 63,
            "name" : "Team Pedace #5"
          },
          {
            "id" : 64,
            "name" : "Team Pedace #6"
          },
          {
            "id" : 65,
            "name" : "Team Pedace #17"
          },
          {
            "id" : 66,
            "name" : "Team Pedace #18"
          },
          {
            "id" : 67,
            "name" : "Arbet Motor Racing #29"
          },
          {
            "id" : 68,
            "name" : "Arbet Motot Racing #30"
          },
          {
            "id" : 69,
            "name" : "Shield Racing Team #23"
          },
          {
            "id" : 70,
            "name" : "Shield Racing Team #24"
          },
          {
            "id" : 71,
            "name" : "Nillors Team #33"
          },
          {
            "id" : 72,
            "name" : "Nillors Team #34"
          },
          {
            "id" : 73,
            "name" : "HXC Motors #73"
          },
          {
            "id" : 74,
            "name" : "HXC Motors #74"
          },
          {
            "id" : 75,
            "name" : "Equipe Bouchard #25"
          },
          {
            "id" : 76,
            "name" : "Equipe Bouchard #26"
          },
          {
            "id" : 77,
            "name" : "Wakeman Racing #71"
          },
          {
            "id" : 78,
            "name" : "Wakeman Racing #72"
          },
          {
            "id" : 79,
            "name" : "Arnao Racing #50"
          },
          {
            "id" : 80,
            "name" : "Arnao Racing #51"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Prototype B"
      },
      {
        "id" : -1761671051,
        "name" : "Audi R8 (LMP900)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Audi Sport Team Joest #1"
          },
          {
            "id" : 52,
            "name" : "Audi Sport Team Joest #2"
          },
          {
            "id" : 53,
            "name" : "Audi Sport Team Joest #3"
          },
          {
            "id" : 54,
            "name" : "Audi Team Oreca #4"
          },
          {
            "id" : 55,
            "name" : "Champion Racing #38"
          },
          {
            "id" : 56,
            "name" : "Champion Racing #6"
          },
          {
            "id" : 57,
            "name" : "Champion Racing #1"
          },
          {
            "id" : 58,
            "name" : "Champion Racing #3"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP900"
      },
      {
        "id" : -1761080088,
        "name" : "Nissan R89C LM",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Nissan Motorsport #23"
          },
          {
            "id" : 52,
            "name" : "Nissan Motorsport #24"
          },
          {
            "id" : 53,
            "name" : "Nissan Motorsport #25"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group C1"
      },
      {
        "id" : -1748676965,
        "name" : "McLaren P1 ™",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Volcano Yellow Metallic"
          },
          {
            "id" : 2,
            "name" : "Volcano Orange Metallic"
          },
          {
            "id" : 3,
            "name" : "Volcano Red Metallic"
          },
          {
            "id" : 4,
            "name" : "Pearl White"
          },
          {
            "id" : 5,
            "name" : "Carbon Black Metallic"
          },
          {
            "id" : 6,
            "name" : "Jet Black"
          },
          {
            "id" : 7,
            "name" : "McLaren Orange"
          },
          {
            "id" : 8,
            "name" : "Mercury Red Metallic"
          },
          {
            "id" : 9,
            "name" : "Standard Silver Metallic"
          },
          {
            "id" : 10,
            "name" : "Supernova Silver Metallic"
          },
          {
            "id" : 11,
            "name" : "Titanium Silver Metallic"
          },
          {
            "id" : 12,
            "name" : "Graphite Grey Metallic"
          },
          {
            "id" : 13,
            "name" : "Azure Blue Metallic"
          },
          {
            "id" : 14,
            "name" : "Dark Blue Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road A"
      },
      {
        "id" : -1728824001,
        "name" : "Ferrari F50 GT",
        "liveries" : [
          {
            "id" : 50,
            "name" : "Scuderia Ferrari #50"
          },
          {
            "id" : 51,
            "name" : "Scuderia Galbrotti #14"
          },
          {
            "id" : 52,
            "name" : "Scuderia Galbrotti #15"
          },
          {
            "id" : 53,
            "name" : "Avielldi Racing #30"
          },
          {
            "id" : 54,
            "name" : "Avielldi Racing #31"
          },
          {
            "id" : 55,
            "name" : "GXB Racing Team #47"
          },
          {
            "id" : 56,
            "name" : "GXB Racing Team #48"
          },
          {
            "id" : 57,
            "name" : "Team HXC Equipment #62"
          },
          {
            "id" : 58,
            "name" : "Team HXC Equipment #63"
          },
          {
            "id" : 59,
            "name" : "Lanova Motorsports #55"
          },
          {
            "id" : 60,
            "name" : "Lanova Motorsports #56"
          },
          {
            "id" : 61,
            "name" : "Welker Racing #3"
          },
          {
            "id" : 62,
            "name" : "Welker Racing #4"
          },
          {
            "id" : 63,
            "name" : "Besmone Automotive #21"
          },
          {
            "id" : 64,
            "name" : "Besmone Automotive #22"
          },
          {
            "id" : 65,
            "name" : "Stargenley Auto Racing #51"
          },
          {
            "id" : 66,
            "name" : "Stargenley Auto Racing #52"
          },
          {
            "id" : 67,
            "name" : "Scuderia Rapa #33"
          },
          {
            "id" : 68,
            "name" : "Scuderia Rapa #34"
          },
          {
            "id" : 69,
            "name" : "Britgens Italia #12"
          },
          {
            "id" : 70,
            "name" : "Britgens Italia #13"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT1"
      },
      {
        "id" : -1720596633,
        "name" : "Ferrari F355 Challenge",
        "liveries" : [
          {
            "id" : 67,
            "name" : "Rosso #110"
          },
          {
            "id" : 68,
            "name" : "Rosso #111"
          },
          {
            "id" : 51,
            "name" : "Giallo Blu #18 "
          },
          {
            "id" : 52,
            "name" : "Giallo Blu #19"
          },
          {
            "id" : 53,
            "name" : "Rosso Blu #22 "
          },
          {
            "id" : 54,
            "name" : "Rosso Blu #23"
          },
          {
            "id" : 55,
            "name" : "Giallo #37"
          },
          {
            "id" : 56,
            "name" : "Giallo #38"
          },
          {
            "id" : 57,
            "name" : "Rosso Bianco #2"
          },
          {
            "id" : 58,
            "name" : "Rosso Bianco #3"
          },
          {
            "id" : 59,
            "name" : "Rosso Azzurro #10"
          },
          {
            "id" : 60,
            "name" : "Rosso Azzurro #11"
          },
          {
            "id" : 61,
            "name" : "Bianco Blu #161"
          },
          {
            "id" : 62,
            "name" : "Bianco Blu #162"
          },
          {
            "id" : 63,
            "name" : "Argento #107"
          },
          {
            "id" : 64,
            "name" : "Argento #108"
          },
          {
            "id" : 65,
            "name" : "Nero Verde #8"
          },
          {
            "id" : 66,
            "name" : "Nero Verde #9"
          },
          {
            "id" : 69,
            "name" : "Bianco Rosso #66"
          },
          {
            "id" : 70,
            "name" : "Bianco Rosso #67"
          },
          {
            "id" : 71,
            "name" : "Bianco Verde #152"
          },
          {
            "id" : 72,
            "name" : "Bianco Verde #153"
          },
          {
            "id" : 73,
            "name" : "Rosso Giallo #86"
          },
          {
            "id" : 74,
            "name" : "Rosso Giallo #87"
          },
          {
            "id" : 75,
            "name" : "Verde Nero #25"
          },
          {
            "id" : 76,
            "name" : "Verde Nero #26"
          },
          {
            "id" : 77,
            "name" : "Azzurro #177"
          },
          {
            "id" : 78,
            "name" : "Azzurro #178"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Ferrari F355 Series"
      },
      {
        "id" : -1695434771,
        "name" : "Toyota GT-One (1998)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Toyota Motorsport #27"
          },
          {
            "id" : 52,
            "name" : "Toyota Motorsport #28"
          },
          {
            "id" : 53,
            "name" : "Toyota Motorsport #29"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT1"
      },
      {
        "id" : -1617916111,
        "name" : "Pagani Zonda Cinque Roadster",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Chassis 1"
          },
          {
            "id" : 2,
            "name" : "Chassis 2"
          },
          {
            "id" : 3,
            "name" : "Chassis 3"
          },
          {
            "id" : 4,
            "name" : "Chassis 4"
          },
          {
            "id" : 5,
            "name" : "Chassis 5"
          },
          {
            "id" : 51,
            "name" : "Purple carbon"
          },
          {
            "id" : 52,
            "name" : "Black"
          },
          {
            "id" : 53,
            "name" : "Blue Pearl"
          },
          {
            "id" : 54,
            "name" : "Red stripes"
          },
          {
            "id" : 55,
            "name" : "Yellow/Italia stripes"
          },
          {
            "id" : 56,
            "name" : "Yellow stripes Clubsport"
          },
          {
            "id" : 57,
            "name" : "Orange Metallic"
          },
          {
            "id" : 58,
            "name" : "Light Blue Metallic"
          },
          {
            "id" : 59,
            "name" : "Green Carbon/Stripes"
          },
          {
            "id" : 60,
            "name" : "Red/White Stripes"
          },
          {
            "id" : 61,
            "name" : "Chrome"
          },
          {
            "id" : 62,
            "name" : "Carbon"
          },
          {
            "id" : 63,
            "name" : "Blue Carbon"
          },
          {
            "id" : 64,
            "name" : "Orange/Silver stripes"
          },
          {
            "id" : 65,
            "name" : "Purple/Gold stripes"
          },
          {
            "id" : 66,
            "name" : "Bronze matte"
          },
          {
            "id" : 67,
            "name" : "Turquois Metallic"
          },
          {
            "id" : 68,
            "name" : "Fluo"
          },
          {
            "id" : 69,
            "name" : "Skyblue"
          },
          {
            "id" : 70,
            "name" : "Red/Italia stripes"
          },
          {
            "id" : 71,
            "name" : "Aron Racing"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road B"
      },
      {
        "id" : -1592901367,
        "name" : "Audi Sport quattro S1",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Audi Team #2"
          },
          {
            "id" : 52,
            "name" : "Audi Team #6"
          },
          {
            "id" : 53,
            "name" : "Audi Team #5"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group B"
      },
      {
        "id" : -1548941295,
        "name" : "Ford F-150 RTR Ultimate Funhaver",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Silver Metallic"
          },
          {
            "id" : 52,
            "name" : "Team RTR 1"
          },
          {
            "id" : 53,
            "name" : "Team RTR 2"
          },
          {
            "id" : 54,
            "name" : "Team RTR 3"
          },
          {
            "id" : 55,
            "name" : "Team RTR 4"
          },
          {
            "id" : 56,
            "name" : "Team RTR 5"
          },
          {
            "id" : 57,
            "name" : "Team Monster Energy 1"
          },
          {
            "id" : 58,
            "name" : "Team Monster Energy 2"
          },
          {
            "id" : 59,
            "name" : "Team Monster Energy 3"
          },
          {
            "id" : 60,
            "name" : "American Patriot"
          },
          {
            "id" : 61,
            "name" : "Red/Yellow Stripes"
          },
          {
            "id" : 62,
            "name" : "Green Metallic"
          },
          {
            "id" : 63,
            "name" : "Yellow/Black"
          },
          {
            "id" : 64,
            "name" : "Green/White"
          },
          {
            "id" : 65,
            "name" : "Retro Flames"
          },
          {
            "id" : 66,
            "name" : "Light Blue Metallic"
          },
          {
            "id" : 67,
            "name" : "Green/Black"
          },
          {
            "id" : 68,
            "name" : "SMS Team 1"
          },
          {
            "id" : 69,
            "name" : "SMS Team 2"
          },
          {
            "id" : 70,
            "name" : "Bright Red"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road G"
      },
      {
        "id" : -1545450182,
        "name" : "BMW M3 GT4 (E92)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "BMW Motorsport #1"
          },
          {
            "id" : 52,
            "name" : "BMW Motorsport #25"
          },
          {
            "id" : 53,
            "name" : "Team Project CARS #131"
          },
          {
            "id" : 54,
            "name" : "Team Project CARS #132"
          },
          {
            "id" : 55,
            "name" : "Semtler Systems #107"
          },
          {
            "id" : 56,
            "name" : "Semtler Systems #108"
          },
          {
            "id" : 57,
            "name" : "Pantera Motorsport #22"
          },
          {
            "id" : 58,
            "name" : "Pantera Motorsport #23"
          },
          {
            "id" : 59,
            "name" : "Kuebler Racing Team #51"
          },
          {
            "id" : 60,
            "name" : "Kuebler Racing Team #52"
          },
          {
            "id" : 61,
            "name" : "Team Illocom #24"
          },
          {
            "id" : 62,
            "name" : "Team Illocom #34"
          },
          {
            "id" : 63,
            "name" : "Bersmann Auto Sport #32"
          },
          {
            "id" : 64,
            "name" : "Bersmann Auto Sport #33"
          },
          {
            "id" : 65,
            "name" : "Team WW Comics #35"
          },
          {
            "id" : 66,
            "name" : "Team WW Comics #36"
          },
          {
            "id" : 67,
            "name" : "1M Pixel Photo Racing #37"
          },
          {
            "id" : 68,
            "name" : "1M Pixel Photo Racing #38"
          },
          {
            "id" : 69,
            "name" : "Bilstein #141"
          },
          {
            "id" : 70,
            "name" : "Bilstein #142"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT4"
      },
      {
        "id" : -1529264129,
        "name" : "Porsche 917 LH",
        "liveries" : [
          {
            "id" : 51,
            "name" : "J.W. Automotive Engineering #17"
          },
          {
            "id" : 52,
            "name" : "J.W. Automotive Engineering #18"
          },
          {
            "id" : 53,
            "name" : "International Racing Team #21"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Prototype A"
      },
      {
        "id" : -1523189681,
        "name" : "Porsche 917/10",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Roger Penske Enterprises #6"
          },
          {
            "id" : 52,
            "name" : "Roger Penske Enterprises #7"
          },
          {
            "id" : 53,
            "name" : "Brumos Racing #59 "
          },
          {
            "id" : 54,
            "name" : "Rinzler Motorracing Inc. #16"
          },
          {
            "id" : 55,
            "name" : "Rinzler Motorracing Inc. #23"
          },
          {
            "id" : 56,
            "name" : "Willi Kauhsen Racing Team #2"
          },
          {
            "id" : 57,
            "name" : "Willi Kauhsen Racing Team #11"
          },
          {
            "id" : 58,
            "name" : "GELO Racing Team #6"
          },
          {
            "id" : 59,
            "name" : "Willi Kauhsen Racing Team 1974 #1"
          },
          {
            "id" : 60,
            "name" : "Willi Kauhsen Racing Team 1974 #2"
          },
          {
            "id" : 61,
            "name" : "Motorsport-Club Stuttgart #1"
          },
          {
            "id" : 62,
            "name" : "Vasek Polak Racing Inc. #0"
          },
          {
            "id" : 63,
            "name" : "Vasek Polak Racing Inc. #3"
          },
          {
            "id" : 64,
            "name" : "Vaillant Team #0"
          },
          {
            "id" : 65,
            "name" : "Willi Kauhsen Team #0"
          },
          {
            "id" : 66,
            "name" : "Gulf Racing Team #2"
          },
          {
            "id" : 67,
            "name" : "Hans Wiedmer Team #4"
          },
          {
            "id" : 68,
            "name" : "Porsche Racing Team #0"
          },
          {
            "id" : 69,
            "name" : "Porsche Racing Team #3"
          },
          {
            "id" : 70,
            "name" : "Racing Team AAW #1"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "CanAm"
      },
      {
        "id" : -1522922538,
        "name" : "Mercedes-AMG A 45 4MATIC",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Mountaingrau Metallic"
          },
          {
            "id" : 2,
            "name" : "Nachtschwarz"
          },
          {
            "id" : 3,
            "name" : "Jupiterrot"
          },
          {
            "id" : 4,
            "name" : "Zirrusweiss"
          },
          {
            "id" : 5,
            "name" : "Kosmosschwarz Metallic"
          },
          {
            "id" : 6,
            "name" : "Elbaitgruen Metallic"
          },
          {
            "id" : 7,
            "name" : "Orientbraun Metallic"
          },
          {
            "id" : 8,
            "name" : "Polarsilber Metallic"
          },
          {
            "id" : 9,
            "name" : "Suedseeblau Metallic"
          },
          {
            "id" : 10,
            "name" : "Cavansitblau Metallic"
          },
          {
            "id" : 11,
            "name" : "Designo Magno Mountaingrau"
          },
          {
            "id" : 51,
            "name" : "Bersmann Motorsport"
          },
          {
            "id" : 55,
            "name" : "white/Red"
          },
          {
            "id" : 56,
            "name" : "Bronze"
          },
          {
            "id" : 57,
            "name" : "Blue"
          },
          {
            "id" : 58,
            "name" : "Green"
          },
          {
            "id" : 61,
            "name" : "Tudor Valves"
          },
          {
            "id" : 62,
            "name" : "Silver/Red"
          },
          {
            "id" : 63,
            "name" : "Cobell Motorsport"
          },
          {
            "id" : 64,
            "name" : "Weber Tire Construction"
          },
          {
            "id" : 66,
            "name" : "Xtremeic"
          },
          {
            "id" : 67,
            "name" : "Black/Silver"
          },
          {
            "id" : 68,
            "name" : "ARW/Red"
          },
          {
            "id" : 70,
            "name" : "Green Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road E"
      },
      {
        "id" : -1488131398,
        "name" : "Jaguar XJR-9 LM",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Jaguar Racing #1"
          },
          {
            "id" : 52,
            "name" : "Jaguar Racing #2"
          },
          {
            "id" : 53,
            "name" : "Jaguar Racing #3"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group C1"
      },
      {
        "id" : -1470867259,
        "name" : "Porsche Carrera GT",
        "liveries" : [
          {
            "id" : 1,
            "name" : "GT Silber Metallic"
          },
          {
            "id" : 2,
            "name" : "Sealgrau Metallic"
          },
          {
            "id" : 3,
            "name" : "Schwarz"
          },
          {
            "id" : 4,
            "name" : "Fayencegelb"
          },
          {
            "id" : 5,
            "name" : "Indischrot"
          },
          {
            "id" : 6,
            "name" : "Basaltschwarz Metallic"
          },
          {
            "id" : 7,
            "name" : "Weiss"
          },
          {
            "id" : 8,
            "name" : "Kobaltblau Metallic"
          },
          {
            "id" : 9,
            "name" : "Lapisblau Metallic"
          },
          {
            "id" : 10,
            "name" : "Azzuro California Metallic"
          },
          {
            "id" : 11,
            "name" : "Gulfblau"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road C"
      },
      {
        "id" : -1459535564,
        "name" : "Ferrari Enzo",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Rosso Corsa"
          },
          {
            "id" : 2,
            "name" : "Giallo Modena"
          },
          {
            "id" : 3,
            "name" : "Nero Daytona"
          },
          {
            "id" : 4,
            "name" : "Bianco Avus"
          },
          {
            "id" : 5,
            "name" : "Rosso Scuderia"
          },
          {
            "id" : 6,
            "name" : "Rosso Dino"
          },
          {
            "id" : 7,
            "name" : "Rosso Barchetta"
          },
          {
            "id" : 8,
            "name" : "Argento Nurburgring"
          },
          {
            "id" : 9,
            "name" : "Bianco Fuji"
          },
          {
            "id" : 10,
            "name" : "Blu TdF"
          },
          {
            "id" : 11,
            "name" : "Blu Pozzi"
          },
          {
            "id" : 12,
            "name" : "Grigio Alloy"
          },
          {
            "id" : 13,
            "name" : "Grigio Titanio"
          },
          {
            "id" : 14,
            "name" : "Grigio Scuro"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road B"
      },
      {
        "id" : -1444632268,
        "name" : "Renault Mégane R.S. SMS-R Touring",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Momo Corse #1"
          },
          {
            "id" : 52,
            "name" : "Momo Corse #2"
          },
          {
            "id" : 53,
            "name" : "Monster Energy #86"
          },
          {
            "id" : 54,
            "name" : "Monster Energy #87"
          },
          {
            "id" : 55,
            "name" : "Horbsner Automotive #61"
          },
          {
            "id" : 56,
            "name" : "Horbsner Automotive #62"
          },
          {
            "id" : 57,
            "name" : "IMOCHI Racing Team #55"
          },
          {
            "id" : 58,
            "name" : "IMOCHI Racing Team #56"
          },
          {
            "id" : 59,
            "name" : "EXTA Motorsport #42"
          },
          {
            "id" : 60,
            "name" : "EXTA Motorsport #43"
          },
          {
            "id" : 61,
            "name" : "ZAVIMA Racing Team #4"
          },
          {
            "id" : 62,
            "name" : "ZAVIMA Racing Team #5"
          },
          {
            "id" : 63,
            "name" : "FourC Motorsport #16"
          },
          {
            "id" : 64,
            "name" : "FourC Motorsport #17"
          },
          {
            "id" : 65,
            "name" : "Haukeen Racing #25"
          },
          {
            "id" : 66,
            "name" : "Haukeen Racing #26"
          },
          {
            "id" : 67,
            "name" : "Team Air Bubbles #11"
          },
          {
            "id" : 68,
            "name" : "Team Air Bubbles #12"
          },
          {
            "id" : 69,
            "name" : "CAVOOL Motorsports #53"
          },
          {
            "id" : 70,
            "name" : "CAVOOL Motorsports #54"
          },
          {
            "id" : 71,
            "name" : "SRT Motorsport #65"
          },
          {
            "id" : 72,
            "name" : "SRT Motorsport #66"
          },
          {
            "id" : 73,
            "name" : "PCCF Community Events Online #19"
          },
          {
            "id" : 74,
            "name" : "PCCF Community Events Online #20"
          },
          {
            "id" : 75,
            "name" : "Team ACR Renault #7"
          },
          {
            "id" : 76,
            "name" : "Team ACR Renault #8"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Touring Car"
      },
      {
        "id" : -1443190363,
        "name" : "Agajanian Watson Roadster",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Agajanian Willard Battery #98"
          },
          {
            "id" : 52,
            "name" : "Welker Racing #32"
          },
          {
            "id" : 53,
            "name" : "Welker Racing #35"
          },
          {
            "id" : 54,
            "name" : "Detonator Spark Plugs #78"
          },
          {
            "id" : 55,
            "name" : "Detonator Spark Plugs #79"
          },
          {
            "id" : 56,
            "name" : "Karlsson Air Conditioning #64"
          },
          {
            "id" : 57,
            "name" : "Karlsson Air Conditioning #65"
          },
          {
            "id" : 58,
            "name" : "Klerbei Speed Line #55"
          },
          {
            "id" : 59,
            "name" : "Klerbei Speed Line #56"
          },
          {
            "id" : 60,
            "name" : "Keaveney #46"
          },
          {
            "id" : 61,
            "name" : "Keaveney #47"
          },
          {
            "id" : 62,
            "name" : "Kolomiets Engineering #30"
          },
          {
            "id" : 63,
            "name" : "Kolomiets Engineering #31"
          },
          {
            "id" : 64,
            "name" : "Beran Exhaust Special #28"
          },
          {
            "id" : 65,
            "name" : "Beran Exhaust Special #29"
          },
          {
            "id" : 66,
            "name" : "Brumla Aluminium #84"
          },
          {
            "id" : 67,
            "name" : "Brumla Aluminium #85"
          },
          {
            "id" : 68,
            "name" : "Baysted Spl. #11"
          },
          {
            "id" : 69,
            "name" : "Baysted Spl. #12"
          },
          {
            "id" : 70,
            "name" : "Sobrent Performance #22"
          },
          {
            "id" : 71,
            "name" : "Sobrent Performance #23"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Indycar"
      },
      {
        "id" : -1435057179,
        "name" : "Lotus Type 51",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Clark #1"
          },
          {
            "id" : 52,
            "name" : "Team Clark #2"
          },
          {
            "id" : 53,
            "name" : "Neil Motor Racing #44"
          },
          {
            "id" : 54,
            "name" : "Neil Motor Racing #45"
          },
          {
            "id" : 55,
            "name" : "Gerhat Motorsport #30"
          },
          {
            "id" : 56,
            "name" : "Gerhat Motorsport #31"
          },
          {
            "id" : 57,
            "name" : "Barron Motor Services #6"
          },
          {
            "id" : 58,
            "name" : "Barron Motor Services #7"
          },
          {
            "id" : 59,
            "name" : "American Racing Team #42"
          },
          {
            "id" : 60,
            "name" : "American Racing Team #43"
          },
          {
            "id" : 61,
            "name" : "Bell Racing Inc. #74"
          },
          {
            "id" : 62,
            "name" : "Bell Racing Inc. #75"
          },
          {
            "id" : 63,
            "name" : "Pressburg Racing #8"
          },
          {
            "id" : 64,
            "name" : "Pressburg Racing #9"
          },
          {
            "id" : 65,
            "name" : "White Performance #10"
          },
          {
            "id" : 66,
            "name" : "White Performance #11"
          },
          {
            "id" : 67,
            "name" : "Karlsson Autosport #4"
          },
          {
            "id" : 68,
            "name" : "Karlsson Autosport #5"
          },
          {
            "id" : 69,
            "name" : "Olivera Motor Racing #16"
          },
          {
            "id" : 70,
            "name" : "Olivera Motor Racing #17"
          },
          {
            "id" : 71,
            "name" : "Mensik Motorsport #14"
          },
          {
            "id" : 72,
            "name" : "Mensik Motorsport #15"
          },
          {
            "id" : 73,
            "name" : "Cherry Racing #33"
          },
          {
            "id" : 74,
            "name" : "Cherry Racing #34"
          },
          {
            "id" : 75,
            "name" : "Fischer Rennsport #22"
          },
          {
            "id" : 76,
            "name" : "Fischer Rennsport #23"
          },
          {
            "id" : 77,
            "name" : "Equipe Dambreville #35"
          },
          {
            "id" : 78,
            "name" : "Equipe Dambreville #36"
          },
          {
            "id" : 79,
            "name" : "Team Baystead #67"
          },
          {
            "id" : 80,
            "name" : "Team Baystead #68"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage F3 A"
      },
      {
        "id" : -1416203489,
        "name" : "Nissan GT-R Nismo GT3 (R35)",
        "liveries" : [
          {
            "id" : 53,
            "name" : "Nissan GT Academy Team RJN #22"
          },
          {
            "id" : 54,
            "name" : "Nissan GT Academy Team RJN #23"
          },
          {
            "id" : 55,
            "name" : "Nissan GT Academy Team RJN #35"
          },
          {
            "id" : 56,
            "name" : "Team Zakspeed #24"
          },
          {
            "id" : 57,
            "name" : "Nissan Team RJN Retro #22"
          },
          {
            "id" : 58,
            "name" : "Nissan Motorsport Team RJN #22"
          },
          {
            "id" : 59,
            "name" : "Nissan Motorsport Team RJN #35"
          },
          {
            "id" : 60,
            "name" : "Always Evolving #75"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : -1411323812,
        "name" : "BMW 1 Series M Coupé StanceWorks Edition",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Project CARS"
          },
          {
            "id" : 52,
            "name" : "H and R Suspension"
          },
          {
            "id" : 53,
            "name" : "Fifteen52 White"
          },
          {
            "id" : 54,
            "name" : "Fifteen52 Black"
          },
          {
            "id" : 55,
            "name" : "White / Retro Stripes"
          },
          {
            "id" : 56,
            "name" : "Momo Corse Red"
          },
          {
            "id" : 57,
            "name" : "Momo Corse Black"
          },
          {
            "id" : 58,
            "name" : "Nitto Tires"
          },
          {
            "id" : 59,
            "name" : "Wine Red Met. / Gold Stripes"
          },
          {
            "id" : 60,
            "name" : "Blue Met. / Orange Stripes"
          },
          {
            "id" : 61,
            "name" : "Yellow Met. / Black Stripes"
          },
          {
            "id" : 62,
            "name" : "Bronze Met. / Black Stripes"
          },
          {
            "id" : 63,
            "name" : "White / Gold Stripes"
          },
          {
            "id" : 64,
            "name" : "Purple / White Stripes"
          },
          {
            "id" : 65,
            "name" : "White / M Stripes"
          },
          {
            "id" : 66,
            "name" : "Black / M Stripes"
          },
          {
            "id" : 67,
            "name" : "Sky Blue Met. / Blue Stripes"
          },
          {
            "id" : 68,
            "name" : "Green Met. / Blue Stripes"
          },
          {
            "id" : 69,
            "name" : "Orange Met. / Black Stripes"
          },
          {
            "id" : 70,
            "name" : "Night Blue Met. / Fluo Stripes"
          },
          {
            "id" : 71,
            "name" : "Xistance Multicolor"
          },
          {
            "id" : 72,
            "name" : "Xistance Purple"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road D"
      },
      {
        "id" : -1339322144,
        "name" : "McLaren P1 ™ GTR",
        "liveries" : [
          {
            "id" : 51,
            "name" : "McLaren Design Concept #01"
          },
          {
            "id" : 52,
            "name" : "Yellow/Green #51"
          },
          {
            "id" : 53,
            "name" : "Darkgrey/Red #14"
          },
          {
            "id" : 54,
            "name" : "Red/Stripes #40"
          },
          {
            "id" : 55,
            "name" : "White/Stripes #36"
          },
          {
            "id" : 56,
            "name" : "Black/Red #18"
          },
          {
            "id" : 57,
            "name" : "Black/Silver #15"
          },
          {
            "id" : 58,
            "name" : "Orange/Black #17"
          },
          {
            "id" : 59,
            "name" : "Blue/Orange #19"
          },
          {
            "id" : 60,
            "name" : "White/Stripes #20"
          },
          {
            "id" : 61,
            "name" : "Yellow/Blue #61"
          },
          {
            "id" : 62,
            "name" : "Blue/Yellow #66"
          },
          {
            "id" : 63,
            "name" : "Purple/Yellow #33"
          },
          {
            "id" : 64,
            "name" : "White/Orange #96"
          },
          {
            "id" : 65,
            "name" : "Lightblue/Orange #91"
          },
          {
            "id" : 66,
            "name" : "Chrome/Orange #71"
          },
          {
            "id" : 67,
            "name" : "White/Blue #16"
          },
          {
            "id" : 68,
            "name" : "Lightblue/Black #81"
          },
          {
            "id" : 69,
            "name" : "Bronze/Black #111"
          },
          {
            "id" : 70,
            "name" : "Orange/Black #50"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day A"
      },
      {
        "id" : -1320616846,
        "name" : "Lotus Type 72D Cosworth",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Lotus #1"
          },
          {
            "id" : 52,
            "name" : "Team Lotus #2"
          },
          {
            "id" : 53,
            "name" : "Coopman Batteries Racing #7"
          },
          {
            "id" : 54,
            "name" : "Coopman Batteries Racing #8"
          },
          {
            "id" : 55,
            "name" : "Dino Racing Team #9"
          },
          {
            "id" : 56,
            "name" : "DINO Racing Team #10"
          },
          {
            "id" : 57,
            "name" : "Boland Racing #11"
          },
          {
            "id" : 58,
            "name" : "Boland Racing  #12"
          },
          {
            "id" : 59,
            "name" : "Arbet Motorsports #14"
          },
          {
            "id" : 60,
            "name" : "Arbet Motorsports #15"
          },
          {
            "id" : 61,
            "name" : "ER Racing Team #16"
          },
          {
            "id" : 62,
            "name" : "ER Racing Team #17"
          },
          {
            "id" : 63,
            "name" : "Team Frieg Oil #20"
          },
          {
            "id" : 64,
            "name" : "Team Frieg Oil #21"
          },
          {
            "id" : 65,
            "name" : "Nillors Racing #22"
          },
          {
            "id" : 66,
            "name" : "Nillors Racing #23"
          },
          {
            "id" : 67,
            "name" : "Decskbern Motorsport #30"
          },
          {
            "id" : 68,
            "name" : "Decskbern Motorsport #31"
          },
          {
            "id" : 69,
            "name" : "Zectrol Motor Services #32"
          },
          {
            "id" : 70,
            "name" : "Zectrol Motor Services #33"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage F1 C"
      },
      {
        "id" : -1303813490,
        "name" : "Aston Martin DB11",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Appletree Green"
          },
          {
            "id" : 2,
            "name" : "Hardly Green"
          },
          {
            "id" : 3,
            "name" : "Arden Green"
          },
          {
            "id" : 4,
            "name" : "Sea Storm"
          },
          {
            "id" : 5,
            "name" : "Ocellus Teal"
          },
          {
            "id" : 6,
            "name" : "Silver Fox"
          },
          {
            "id" : 7,
            "name" : "Hammerhead Silver"
          },
          {
            "id" : 8,
            "name" : "Magnetic Silver"
          },
          {
            "id" : 9,
            "name" : "Quantum Silver"
          },
          {
            "id" : 10,
            "name" : "Onyx Black"
          },
          {
            "id" : 11,
            "name" : "China Grey"
          },
          {
            "id" : 12,
            "name" : "Jet Black"
          },
          {
            "id" : 13,
            "name" : "Ultramarine Black"
          },
          {
            "id" : 14,
            "name" : "Midnight Blue"
          },
          {
            "id" : 15,
            "name" : "Cobalt Blue"
          },
          {
            "id" : 16,
            "name" : "Lightning Silver"
          },
          {
            "id" : 17,
            "name" : "Skyfall Silver"
          },
          {
            "id" : 18,
            "name" : "Frosted Glass Blue"
          },
          {
            "id" : 19,
            "name" : "Concours Blue"
          },
          {
            "id" : 20,
            "name" : "Mariana Blue"
          },
          {
            "id" : 21,
            "name" : "Volcano Red"
          },
          {
            "id" : 22,
            "name" : "Diavolo Red"
          },
          {
            "id" : 23,
            "name" : "Divine Red"
          },
          {
            "id" : 24,
            "name" : "Kopi Bronze"
          },
          {
            "id" : 25,
            "name" : "Marron Black"
          },
          {
            "id" : 26,
            "name" : "Cinnabar Orange"
          },
          {
            "id" : 27,
            "name" : "Madagascar Orange"
          },
          {
            "id" : 28,
            "name" : "Sunburst Yellow"
          },
          {
            "id" : 29,
            "name" : "Yellow Tang"
          },
          {
            "id" : 30,
            "name" : "Silver Blonde"
          },
          {
            "id" : 31,
            "name" : "Lunar White"
          },
          {
            "id" : 32,
            "name" : "Stratus White"
          },
          {
            "id" : 33,
            "name" : "Morning Frost White"
          },
          {
            "id" : 34,
            "name" : "Selene Bronze"
          },
          {
            "id" : 35,
            "name" : "Arizona Bronze"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road D"
      },
      {
        "id" : -1295853198,
        "name" : "Porsche 911 RSR",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche Racing #91"
          },
          {
            "id" : 52,
            "name" : "Porsche Racing #92"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTE"
      },
      {
        "id" : -1275144817,
        "name" : "Mercedes-AMG A 45 SMS-R Touring",
        "liveries" : [
          {
            "id" : 51,
            "name" : "NVRR Motorsports #14"
          },
          {
            "id" : 52,
            "name" : "NVRR Motorsports #15"
          },
          {
            "id" : 53,
            "name" : "GedK Gloves Team #40"
          },
          {
            "id" : 54,
            "name" : "GedK Gloves Team #41"
          },
          {
            "id" : 55,
            "name" : "Decksbern Motorsport #29"
          },
          {
            "id" : 56,
            "name" : "Decksbern Motorsport #30"
          },
          {
            "id" : 57,
            "name" : "Luigo Racing Team #63"
          },
          {
            "id" : 58,
            "name" : "Luigo Racing Team #64"
          },
          {
            "id" : 59,
            "name" : "Zipanol Racing Team #38"
          },
          {
            "id" : 60,
            "name" : "Zipanol Racing Team #39"
          },
          {
            "id" : 61,
            "name" : "Wakeman Motorsport #51"
          },
          {
            "id" : 62,
            "name" : "Wakeman Motorsport #52"
          },
          {
            "id" : 63,
            "name" : "AQI Auto Racing Team #21"
          },
          {
            "id" : 64,
            "name" : "AQI Auto Racing Team #22"
          },
          {
            "id" : 65,
            "name" : "Team Dominium Musk #7"
          },
          {
            "id" : 66,
            "name" : "Team Dominium Musk #8"
          },
          {
            "id" : 67,
            "name" : "Ben and Erton #47"
          },
          {
            "id" : 68,
            "name" : "Ben and Erton #48"
          },
          {
            "id" : 69,
            "name" : "Team ViljoENS Racing #19"
          },
          {
            "id" : 70,
            "name" : "Team ViljoENS Racing #20"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Touring Car"
      },
      {
        "id" : -1273964900,
        "name" : "Ferrari 333 SP",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Momo Corse #30"
          },
          {
            "id" : 52,
            "name" : "Doyle-Risi Racing #71"
          },
          {
            "id" : 53,
            "name" : "Doyle-Risi Racing #12"
          },
          {
            "id" : 54,
            "name" : "Euromotorsport Racing #50 "
          },
          {
            "id" : 55,
            "name" : "JB Giesse Racing #5"
          },
          {
            "id" : 56,
            "name" : "Doyle-Risi Olive Garden #11"
          },
          {
            "id" : 57,
            "name" : "Doyle-Risi Olive Garden #12"
          },
          {
            "id" : 58,
            "name" : "Horag-Lista Team #27"
          },
          {
            "id" : 59,
            "name" : "Doyle-Risi Racing #7"
          },
          {
            "id" : 60,
            "name" : "Auto Sport Racing SRL #4"
          },
          {
            "id" : 61,
            "name" : "Auto Sport Racing SRL #6"
          },
          {
            "id" : 62,
            "name" : "Dollahite Racing #18"
          },
          {
            "id" : 63,
            "name" : "Dollahite Racing #88"
          },
          {
            "id" : 64,
            "name" : "Landshark Racing #66"
          },
          {
            "id" : 65,
            "name" : "BMS Scuderia Italia #22"
          },
          {
            "id" : 66,
            "name" : "BMS Scuderia Italia #2"
          },
          {
            "id" : 67,
            "name" : "JB Giesse Racing #1"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP900"
      },
      {
        "id" : -1270234648,
        "name" : "Porsche 935/78",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche System #1"
          },
          {
            "id" : 52,
            "name" : "Porsche System #43"
          },
          {
            "id" : 53,
            "name" : "Porsche System #40"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 5"
      },
      {
        "id" : -1268030897,
        "name" : "Porsche 959 S",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Silber Metallic"
          },
          {
            "id" : 2,
            "name" : "Alpinweiss"
          },
          {
            "id" : 3,
            "name" : "Schwarz"
          },
          {
            "id" : 4,
            "name" : "Dunkelgrau Metallic"
          },
          {
            "id" : 5,
            "name" : "Perlweiss"
          },
          {
            "id" : 6,
            "name" : "Indischrot"
          },
          {
            "id" : 7,
            "name" : "Rubinrot Metallic"
          },
          {
            "id" : 8,
            "name" : "Dunkelblau"
          },
          {
            "id" : 9,
            "name" : "Nautic Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road E"
      },
      {
        "id" : -1253474718,
        "name" : "Ford Sierra Cosworth RS500 Group A",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Mixlub Racing Team #61"
          },
          {
            "id" : 52,
            "name" : "Mixlub Racing Team #62"
          },
          {
            "id" : 53,
            "name" : "Zipanol Motor Racing #86"
          },
          {
            "id" : 54,
            "name" : "Zipanol Motor Racing #87"
          },
          {
            "id" : 55,
            "name" : "Team Beldo #51"
          },
          {
            "id" : 56,
            "name" : "Team Beldo #52"
          },
          {
            "id" : 57,
            "name" : "Luigo Racing #66"
          },
          {
            "id" : 58,
            "name" : "Luigo Racing #67"
          },
          {
            "id" : 59,
            "name" : "Millgo Motorsport #91"
          },
          {
            "id" : 60,
            "name" : "Millgo Motorsport #92"
          },
          {
            "id" : 61,
            "name" : "Team Vanolinol #31"
          },
          {
            "id" : 62,
            "name" : "Team Vanolinol #32"
          },
          {
            "id" : 63,
            "name" : "Keaveneys Racing Team #40"
          },
          {
            "id" : 64,
            "name" : "Keaveneys Racing Team #41"
          },
          {
            "id" : 65,
            "name" : "Domino Motorsports #95"
          },
          {
            "id" : 66,
            "name" : "Domino Motorsports #96"
          },
          {
            "id" : 67,
            "name" : "Gersten Felder Rennsport #35"
          },
          {
            "id" : 68,
            "name" : "Gersten Felder Rennsport #36"
          },
          {
            "id" : 69,
            "name" : "Edwardo Racing #71"
          },
          {
            "id" : 70,
            "name" : "Edwardo Racing #72"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group A"
      },
      {
        "id" : -1226176940,
        "name" : "BMW 1 Series M Coupé",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Valencia Orange Metallic"
          },
          {
            "id" : 2,
            "name" : "Jet Black"
          },
          {
            "id" : 3,
            "name" : "Alpine White"
          },
          {
            "id" : 51,
            "name" : "M Stripes"
          },
          {
            "id" : 52,
            "name" : "RST"
          },
          {
            "id" : 53,
            "name" : "Galileo"
          },
          {
            "id" : 54,
            "name" : "Pican Tuning"
          },
          {
            "id" : 55,
            "name" : "Bersmann"
          },
          {
            "id" : 56,
            "name" : "Uracan"
          },
          {
            "id" : 57,
            "name" : "Kortex Sport"
          },
          {
            "id" : 58,
            "name" : "XPS Suspension"
          },
          {
            "id" : 59,
            "name" : "Cassius Racing"
          },
          {
            "id" : 60,
            "name" : "Vane"
          },
          {
            "id" : 61,
            "name" : "Panzer Race Tuning"
          },
          {
            "id" : 62,
            "name" : "M Stripes/Silver metallic"
          },
          {
            "id" : 63,
            "name" : "MoTweak"
          },
          {
            "id" : 64,
            "name" : "Yellow Metallic"
          },
          {
            "id" : 65,
            "name" : "OCH Racing"
          },
          {
            "id" : 66,
            "name" : "Dark Bronze Metallic"
          },
          {
            "id" : 67,
            "name" : "Base One"
          },
          {
            "id" : 68,
            "name" : "Yellow"
          },
          {
            "id" : 69,
            "name" : "Black"
          },
          {
            "id" : 70,
            "name" : "Ringley Engineering"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road E"
      },
      {
        "id" : -1218483247,
        "name" : "Porsche 919 Hybrid",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche Team #1"
          },
          {
            "id" : 52,
            "name" : "Porsche Team #2"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP1 2016"
      },
      {
        "id" : -1206681923,
        "name" : "Audi R18 (Fuji 2016)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Audi Sport Team Joest #7"
          },
          {
            "id" : 52,
            "name" : "Audi Sport Team Joest #8"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP1 2016"
      },
      {
        "id" : -1204688299,
        "name" : "Lotus Type 40 Ford",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Lotus #1"
          },
          {
            "id" : 52,
            "name" : "Team Lotus #30"
          },
          {
            "id" : 53,
            "name" : "Andy Clark Inc. #16"
          },
          {
            "id" : 54,
            "name" : "Andy Clark Inc. #17"
          },
          {
            "id" : 55,
            "name" : "S+A Motorsport #3"
          },
          {
            "id" : 56,
            "name" : "S+A Motorsport #4"
          },
          {
            "id" : 57,
            "name" : "Dino Sports #9"
          },
          {
            "id" : 58,
            "name" : "Dino Sports #10"
          },
          {
            "id" : 59,
            "name" : "Arnao Racing Inc. #5"
          },
          {
            "id" : 60,
            "name" : "Arnao Racing Inc. #6"
          },
          {
            "id" : 61,
            "name" : "Bouchard Motorsport #11"
          },
          {
            "id" : 62,
            "name" : "Bouchard Motorsport #12"
          },
          {
            "id" : 63,
            "name" : "Ringley Racing #22"
          },
          {
            "id" : 64,
            "name" : "Ringley Racing #23"
          },
          {
            "id" : 65,
            "name" : "Moll Brothers #32"
          },
          {
            "id" : 66,
            "name" : "Moll Brothers #33"
          },
          {
            "id" : 67,
            "name" : "Karlsson Team #14"
          },
          {
            "id" : 68,
            "name" : "Karlsson Team #15"
          },
          {
            "id" : 69,
            "name" : "Fujiwara Auto Racing #42"
          },
          {
            "id" : 70,
            "name" : "Fujiwara Auto Racing #43"
          },
          {
            "id" : 71,
            "name" : "Team Boosman #37"
          },
          {
            "id" : 72,
            "name" : "Team Boosman #38"
          },
          {
            "id" : 73,
            "name" : "Hummerich Rennsport Team #20"
          },
          {
            "id" : 74,
            "name" : "Hummerich Rennsport Team #21"
          },
          {
            "id" : 75,
            "name" : "Equipe Dambreville #7"
          },
          {
            "id" : 76,
            "name" : "Equipe Dambreville #8"
          },
          {
            "id" : 77,
            "name" : "Bell Motor Services #35"
          },
          {
            "id" : 78,
            "name" : "Bell Motor Services #36"
          },
          {
            "id" : 79,
            "name" : "Morrish Racing #40"
          },
          {
            "id" : 80,
            "name" : "Morrish Racing #41"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Prototype B"
      },
      {
        "id" : -1197419789,
        "name" : "Lamborghini Diablo GTR",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Turbolio Racing #81"
          },
          {
            "id" : 52,
            "name" : "Turbolio Racing #82"
          },
          {
            "id" : 53,
            "name" : "Britgens Motorsport #79"
          },
          {
            "id" : 54,
            "name" : "Britgens Motorsport #80"
          },
          {
            "id" : 55,
            "name" : "Scuderia Galbrotti #156"
          },
          {
            "id" : 56,
            "name" : "Scuderia Galbrotti #157"
          },
          {
            "id" : 57,
            "name" : "Dominium Racing Team #52"
          },
          {
            "id" : 58,
            "name" : "Dominium Racing Team #53"
          },
          {
            "id" : 59,
            "name" : "Griventec Autosport #44"
          },
          {
            "id" : 60,
            "name" : "Griventec Autosport #45"
          },
          {
            "id" : 61,
            "name" : "Sattomi Racing Team #70"
          },
          {
            "id" : 62,
            "name" : "Sattomi Racing Team #71"
          },
          {
            "id" : 63,
            "name" : "Team Italy Racing #123"
          },
          {
            "id" : 64,
            "name" : "Team Italy Racing #124"
          },
          {
            "id" : 65,
            "name" : "BOON Motorsport #76"
          },
          {
            "id" : 66,
            "name" : "BOON Motorsport #77"
          },
          {
            "id" : 67,
            "name" : "Decksbern Motorsport #66"
          },
          {
            "id" : 68,
            "name" : "Decksbern Motorsport #67"
          },
          {
            "id" : 69,
            "name" : "Karlsson Racing #113"
          },
          {
            "id" : 70,
            "name" : "Karlsson Racing #114"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTO"
      },
      {
        "id" : -1187748261,
        "name" : "BMW 2002 StanceWorks Edition",
        "liveries" : [
          {
            "id" : 51,
            "name" : "StanceWorks #53"
          },
          {
            "id" : 52,
            "name" : "StanceWorks #7"
          },
          {
            "id" : 53,
            "name" : "StanceWorks #67"
          },
          {
            "id" : 54,
            "name" : "Momo Corse #29"
          },
          {
            "id" : 55,
            "name" : "Welker Racing #5"
          },
          {
            "id" : 56,
            "name" : "Welker Racing #6"
          },
          {
            "id" : 57,
            "name" : "Wallington Team #09"
          },
          {
            "id" : 58,
            "name" : "Wallington Team #10"
          },
          {
            "id" : 59,
            "name" : "Arnao Sports #16"
          },
          {
            "id" : 60,
            "name" : "Arnao Sports #17"
          },
          {
            "id" : 61,
            "name" : "Klark Engineering #80"
          },
          {
            "id" : 62,
            "name" : "Klark Engineering #81"
          },
          {
            "id" : 63,
            "name" : "Hummerich Rennsport #45"
          },
          {
            "id" : 64,
            "name" : "Hummerich Rennsport #70"
          },
          {
            "id" : 65,
            "name" : "Frischkorn Motorsport #58"
          },
          {
            "id" : 66,
            "name" : "Frischkorn Motorsport #59"
          },
          {
            "id" : 67,
            "name" : "Kleiber Motors #88"
          },
          {
            "id" : 68,
            "name" : "Kleiber Motors #89"
          },
          {
            "id" : 69,
            "name" : "Dino Racing Team #90"
          },
          {
            "id" : 70,
            "name" : "Dino Racing Team #91"
          },
          {
            "id" : 71,
            "name" : "Zectrol Motorsport #72"
          },
          {
            "id" : 72,
            "name" : "Zectrol Motorsport #73"
          },
          {
            "id" : 73,
            "name" : "Team Ringley #83"
          },
          {
            "id" : 74,
            "name" : "Team Ringley #84"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT B"
      },
      {
        "id" : -1170674276,
        "name" : "Ginetta G55 GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team LNT #16"
          },
          {
            "id" : 52,
            "name" : "Brestin Motorsport #175"
          },
          {
            "id" : 53,
            "name" : "Brestin Motorsport #178"
          },
          {
            "id" : 54,
            "name" : "Brestin Motorsport #179"
          },
          {
            "id" : 55,
            "name" : "Selmtler Systems #55"
          },
          {
            "id" : 56,
            "name" : "Selmtler Systems #56"
          },
          {
            "id" : 57,
            "name" : "Makuma Racing Team #133"
          },
          {
            "id" : 58,
            "name" : "Makuma Racing Team #134"
          },
          {
            "id" : 59,
            "name" : "Wallington Racing #145"
          },
          {
            "id" : 60,
            "name" : "Wallington Racing #146"
          },
          {
            "id" : 61,
            "name" : "Schivelly Auto Sports #51"
          },
          {
            "id" : 62,
            "name" : "Schivelly Auto Sports #52"
          },
          {
            "id" : 63,
            "name" : "Substance Racing #153"
          },
          {
            "id" : 64,
            "name" : "Substance Racing #154"
          },
          {
            "id" : 65,
            "name" : "Team Populus Bank #165"
          },
          {
            "id" : 66,
            "name" : "Team Populus Bank #166"
          },
          {
            "id" : 67,
            "name" : "EXTA Motorsports #195"
          },
          {
            "id" : 68,
            "name" : "EXTA Motorsports #196"
          },
          {
            "id" : 69,
            "name" : "DoRight Racing Inc. #96"
          },
          {
            "id" : 70,
            "name" : "DoRight Racing Inc. #97"
          },
          {
            "id" : 71,
            "name" : "Team Highlands Racing #35"
          },
          {
            "id" : 72,
            "name" : "Team Highlands Racing #45"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : -1159965983,
        "name" : "Mitsubishi Lancer Evolution VI SVA",
        "liveries" : [
          {
            "id" : 51,
            "name" : "SVA Imports #10"
          },
          {
            "id" : 52,
            "name" : "Pirelli #22"
          },
          {
            "id" : 53,
            "name" : "WRB Motorsport #182"
          },
          {
            "id" : 54,
            "name" : "WRB Motorsport #183"
          },
          {
            "id" : 55,
            "name" : "Decksbern Motorsport #24"
          },
          {
            "id" : 56,
            "name" : "Decksbern Motorsport #25"
          },
          {
            "id" : 57,
            "name" : "Cobell Motorsport #151"
          },
          {
            "id" : 58,
            "name" : "Cobell Motorsport #152"
          },
          {
            "id" : 59,
            "name" : "LenDing Motorsport #97"
          },
          {
            "id" : 60,
            "name" : "LenDing Motorsport #98"
          },
          {
            "id" : 61,
            "name" : "Ankyamo Motorsport #75"
          },
          {
            "id" : 62,
            "name" : "Ankyamo Motorsport #76"
          },
          {
            "id" : 63,
            "name" : "Four C Motorsport #18"
          },
          {
            "id" : 64,
            "name" : "Four C Motorsport #19"
          },
          {
            "id" : 65,
            "name" : "Riddie Powersports #146"
          },
          {
            "id" : 66,
            "name" : "Riddie Powersports #147"
          },
          {
            "id" : 67,
            "name" : "Bersmann Motorsports #192"
          },
          {
            "id" : 68,
            "name" : "Bersmann Motorsports #193"
          },
          {
            "id" : 69,
            "name" : "NVRR Motorsports #90"
          },
          {
            "id" : 70,
            "name" : "NVRR Motorsports #91"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day A"
      },
      {
        "id" : -1068716209,
        "name" : "Ligier JS P2 Judd",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team WRT #47"
          },
          {
            "id" : 52,
            "name" : "IDEC Sport Racing #28"
          },
          {
            "id" : 53,
            "name" : "FourC Motorsport #24"
          },
          {
            "id" : 54,
            "name" : "FourC Motorsport #25"
          },
          {
            "id" : 55,
            "name" : "Motorezac Team #56"
          },
          {
            "id" : 56,
            "name" : "Motorezac Team #57"
          },
          {
            "id" : 57,
            "name" : "RST Racing Team #76"
          },
          {
            "id" : 58,
            "name" : "RST Racing Team #77"
          },
          {
            "id" : 59,
            "name" : "BAM eSport #90"
          },
          {
            "id" : 60,
            "name" : "BAM eSport #91"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP2"
      },
      {
        "id" : -1048050877,
        "name" : "Radical RXC Turbo",
        "liveries" : [
          {
            "id" : 51,
            "name" : "RXC Blue"
          },
          {
            "id" : 52,
            "name" : "Rosso Red"
          },
          {
            "id" : 53,
            "name" : "Team Green"
          },
          {
            "id" : 54,
            "name" : "French Blue"
          },
          {
            "id" : 55,
            "name" : "Tangerine"
          },
          {
            "id" : 56,
            "name" : "Spice Yellow"
          },
          {
            "id" : 57,
            "name" : "Merlin Blue"
          },
          {
            "id" : 58,
            "name" : "Team Grey"
          },
          {
            "id" : 59,
            "name" : "Brilliant White"
          },
          {
            "id" : 60,
            "name" : "Stealth Black"
          },
          {
            "id" : 61,
            "name" : "Gulf Blue"
          },
          {
            "id" : 62,
            "name" : "Cobra Blue"
          },
          {
            "id" : 63,
            "name" : "Speed Green"
          },
          {
            "id" : 64,
            "name" : "Flame Red"
          },
          {
            "id" : 65,
            "name" : "Stealth Black / Gold"
          },
          {
            "id" : 66,
            "name" : "Rosso Red / Yellow"
          },
          {
            "id" : 67,
            "name" : "Gold Metallic"
          },
          {
            "id" : 68,
            "name" : "Silver Metallic"
          },
          {
            "id" : 69,
            "name" : "Brilliant White / Red"
          },
          {
            "id" : 70,
            "name" : "Carbon / Red"
          },
          {
            "id" : 71,
            "name" : "Bersmann Motorsport"
          },
          {
            "id" : 72,
            "name" : "Decksbern Motorsport"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road A"
      },
      {
        "id" : -1041674971,
        "name" : "Formula C",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Horbsner Automotive #21"
          },
          {
            "id" : 52,
            "name" : "Horbsner Automotive #22"
          },
          {
            "id" : 53,
            "name" : "Togussi Racing #58"
          },
          {
            "id" : 54,
            "name" : "Togussi Racing #59"
          },
          {
            "id" : 55,
            "name" : "Team AQI Motors #64"
          },
          {
            "id" : 56,
            "name" : "Team AQI Motors #65"
          },
          {
            "id" : 57,
            "name" : "JFB Racing Team #33"
          },
          {
            "id" : 58,
            "name" : "JFB Racing Team #34"
          },
          {
            "id" : 59,
            "name" : "Rotmeg Motorsport #18"
          },
          {
            "id" : 60,
            "name" : "Rotmeg Motorsport #19"
          },
          {
            "id" : 61,
            "name" : "iReatek Racing #29"
          },
          {
            "id" : 62,
            "name" : "iReatek Racing #30"
          },
          {
            "id" : 63,
            "name" : "Team Jancon Mobile #42"
          },
          {
            "id" : 64,
            "name" : "Team Jancon Mobile #43"
          },
          {
            "id" : 65,
            "name" : "BNS Birdia Systems #67"
          },
          {
            "id" : 66,
            "name" : "BNS Birdia Systems #68"
          },
          {
            "id" : 67,
            "name" : "OBX Watches Racing #9"
          },
          {
            "id" : 68,
            "name" : "OBX Watches Racing #10"
          },
          {
            "id" : 69,
            "name" : "Stargenley Motorsport #2"
          },
          {
            "id" : 70,
            "name" : "Stargenley Motorsport #3"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Formula C"
      },
      {
        "id" : -1005942571,
        "name" : "Jaguar E-Type V12 Group44",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Group 44 Racing #44"
          },
          {
            "id" : 52,
            "name" : "Clark Inc Team #58"
          },
          {
            "id" : 53,
            "name" : "Clark Inc Team #59"
          },
          {
            "id" : 54,
            "name" : "Team Bouchard #52"
          },
          {
            "id" : 55,
            "name" : "Team Bouchard #53"
          },
          {
            "id" : 56,
            "name" : "Flashspeed Motorsport #109"
          },
          {
            "id" : 57,
            "name" : "Flashspeed Motorsport #110"
          },
          {
            "id" : 58,
            "name" : "Welker Racing #67"
          },
          {
            "id" : 59,
            "name" : "Welker Racing #68"
          },
          {
            "id" : 60,
            "name" : "Fast Stop Team #85"
          },
          {
            "id" : 61,
            "name" : "Fast Stop Team #86"
          },
          {
            "id" : 62,
            "name" : "Team Curling #81"
          },
          {
            "id" : 63,
            "name" : "Team Curling #82"
          },
          {
            "id" : 64,
            "name" : "Detonator Racing Team #23"
          },
          {
            "id" : 65,
            "name" : "Detonator Racing Team #24"
          },
          {
            "id" : 66,
            "name" : "Arbet Racing #76"
          },
          {
            "id" : 67,
            "name" : "Arbet Racing #79"
          },
          {
            "id" : 68,
            "name" : "Dino Team #90"
          },
          {
            "id" : 69,
            "name" : "Dino Team #91"
          },
          {
            "id" : 70,
            "name" : "SoperO Racing Team #50"
          },
          {
            "id" : 71,
            "name" : "SoperO Racing Team #51"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : -1001664988,
        "name" : "Bentley Continental GT3 (2016)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Bentley Team #8"
          },
          {
            "id" : 52,
            "name" : "Bentley Team #17"
          },
          {
            "id" : 53,
            "name" : "Absolute Racing #87"
          },
          {
            "id" : 54,
            "name" : "Absolute Racing #88"
          },
          {
            "id" : 62,
            "name" : "Absolute Racing Team #78"
          },
          {
            "id" : 63,
            "name" : "Absolute Racing Team #88"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : -1001569309,
        "name" : "McLaren F1 GTR Long Tail",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Gulf Team DayOff #1"
          },
          {
            "id" : 52,
            "name" : "Gulf Team DayOff #2"
          },
          {
            "id" : 53,
            "name" : "Gulf Team DayOff #3"
          },
          {
            "id" : 54,
            "name" : "BMW Motorsport / Schnitzer #42"
          },
          {
            "id" : 55,
            "name" : "BMW Motorsport / Schnitzer #43"
          },
          {
            "id" : 56,
            "name" : "Parabolica Motorsport #27"
          },
          {
            "id" : 57,
            "name" : "DayOff Classic #11"
          },
          {
            "id" : 58,
            "name" : "Team Lark McLaren #44"
          },
          {
            "id" : 59,
            "name" : "Team DayOff #40"
          },
          {
            "id" : 60,
            "name" : "Team DayOff #41"
          },
          {
            "id" : 61,
            "name" : "EMKA Racing #1"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT1"
      },
      {
        "id" : -983006067,
        "name" : "Citroen DS3 RX Supercar",
        "liveries" : [
          {
            "id" : 51,
            "name" : "2016 PSRX Team #1"
          },
          {
            "id" : 52,
            "name" : "2015 PSRX Team #1"
          },
          {
            "id" : 53,
            "name" : "2014 PSRX Team #11"
          },
          {
            "id" : 54,
            "name" : "2013 PSRX Team #11"
          },
          {
            "id" : 55,
            "name" : "2016 PSRX Team #1b"
          },
          {
            "id" : 56,
            "name" : "2015 PSRX Team #1b"
          },
          {
            "id" : 57,
            "name" : "2014 PSRX Team #11b"
          },
          {
            "id" : 58,
            "name" : "2013 PSRX Team #11b"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "WRX"
      },
      {
        "id" : -980019072,
        "name" : "Marek RP 219D LMP2",
        "liveries" : [
          {
            "id" : 51,
            "name" : "RFH Motorsport #7"
          },
          {
            "id" : 52,
            "name" : "RFH Motorsport #8"
          },
          {
            "id" : 53,
            "name" : "F-Max Corse #26"
          },
          {
            "id" : 54,
            "name" : "F-Max Corse #27"
          },
          {
            "id" : 55,
            "name" : "Koseki Racing #20"
          },
          {
            "id" : 56,
            "name" : "Koseki Racing #21"
          },
          {
            "id" : 57,
            "name" : "HFAF Motorsport #9"
          },
          {
            "id" : 58,
            "name" : "HFAF Motorsport #10"
          },
          {
            "id" : 59,
            "name" : "JFB Auto Racing #68"
          },
          {
            "id" : 60,
            "name" : "JFB Auto Racing #69"
          },
          {
            "id" : 61,
            "name" : "Team OBX Watches #22"
          },
          {
            "id" : 62,
            "name" : "Team OBX Watches #23"
          },
          {
            "id" : 63,
            "name" : "Equipe Paullard #54"
          },
          {
            "id" : 64,
            "name" : "Equipe Paullard #55"
          },
          {
            "id" : 65,
            "name" : "Jennkins Motorsport #71"
          },
          {
            "id" : 66,
            "name" : "Jennkins Motorsport #72"
          },
          {
            "id" : 67,
            "name" : "Hutchin Systems #94"
          },
          {
            "id" : 68,
            "name" : "Hutchin Systems #95"
          },
          {
            "id" : 69,
            "name" : "Exta Racing Team #78"
          },
          {
            "id" : 70,
            "name" : "Exta Racing Team #79"
          },
          {
            "id" : 71,
            "name" : "F4H Motorsport #98"
          },
          {
            "id" : 72,
            "name" : "F4H Motorsport #99"
          },
          {
            "id" : 73,
            "name" : "eSports + Cars #24"
          },
          {
            "id" : 74,
            "name" : "eSports + Cars #31"
          },
          {
            "id" : 75,
            "name" : "Team ACR Marek #1"
          },
          {
            "id" : 76,
            "name" : "Team ACR Marek #2"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP2"
      },
      {
        "id" : -956881226,
        "name" : "Renault Mégane R.S. 275 Trophy-R",
        "liveries" : [
          {
            "id" : 51,
            "name" : "White/Red"
          },
          {
            "id" : 52,
            "name" : "Yellow/Red"
          },
          {
            "id" : 53,
            "name" : "Black/Red"
          },
          {
            "id" : 54,
            "name" : "Grey Metallic/Red"
          },
          {
            "id" : 57,
            "name" : "Kortex Sport/Silver Metallic"
          },
          {
            "id" : 58,
            "name" : "Kortex Sport/Blue Metallic"
          },
          {
            "id" : 59,
            "name" : "Kortex Sport/Yellow"
          },
          {
            "id" : 61,
            "name" : "Red/Black"
          },
          {
            "id" : 62,
            "name" : "Bronze Metallic"
          },
          {
            "id" : 66,
            "name" : "Bolting Motorsports"
          },
          {
            "id" : 67,
            "name" : "Edge Composites"
          },
          {
            "id" : 68,
            "name" : "SRT"
          },
          {
            "id" : 69,
            "name" : "Vail"
          },
          {
            "id" : 70,
            "name" : "Zoomm Sport"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road F"
      },
      {
        "id" : -934098507,
        "name" : "BMW M3 Sport Evo Group A",
        "liveries" : [
          {
            "id" : 51,
            "name" : "BMW Motorsport #1"
          },
          {
            "id" : 52,
            "name" : "BMW Motorsport #2"
          },
          {
            "id" : 53,
            "name" : "Stichmuller Rennsport #8"
          },
          {
            "id" : 54,
            "name" : "Stichmuller Rennsport #9"
          },
          {
            "id" : 55,
            "name" : "Team SUEI Racing #26"
          },
          {
            "id" : 56,
            "name" : "Team SUEI Racing #27"
          },
          {
            "id" : 57,
            "name" : "Mingelo Racing #29"
          },
          {
            "id" : 58,
            "name" : "Mingelo Racing #30"
          },
          {
            "id" : 59,
            "name" : "Team Jeschke #14"
          },
          {
            "id" : 60,
            "name" : "Team Jeschke #15"
          },
          {
            "id" : 61,
            "name" : "Wild Antonio #20"
          },
          {
            "id" : 62,
            "name" : "Wild Antonio #21"
          },
          {
            "id" : 63,
            "name" : "Gerhardt Motorsport #33"
          },
          {
            "id" : 64,
            "name" : "Gerhardt Motorsport #34"
          },
          {
            "id" : 65,
            "name" : "Team Z5 Air Cooling #38"
          },
          {
            "id" : 66,
            "name" : "Team Z5 Air Cooling #39"
          },
          {
            "id" : 67,
            "name" : "S+A Auto Sport #59"
          },
          {
            "id" : 68,
            "name" : "S+A Auto Sport #60"
          },
          {
            "id" : 69,
            "name" : "Team 10 Strikes #44"
          },
          {
            "id" : 70,
            "name" : "Team 10 Strikes #45"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group A"
      },
      {
        "id" : -931590477,
        "name" : "Renault Mégane Trophy V6",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Renault Sport #01"
          },
          {
            "id" : 52,
            "name" : "Renault Sport #02"
          },
          {
            "id" : 53,
            "name" : "Team Logitech #05"
          },
          {
            "id" : 54,
            "name" : "Team Logitech #06"
          },
          {
            "id" : 55,
            "name" : "Team AMD #07"
          },
          {
            "id" : 56,
            "name" : "Team AMD #08"
          },
          {
            "id" : 57,
            "name" : "Team Vesaro #09"
          },
          {
            "id" : 58,
            "name" : "Team Vesaro #10"
          },
          {
            "id" : 59,
            "name" : "Team Aperture #11"
          },
          {
            "id" : 60,
            "name" : "Team Aperture #12"
          },
          {
            "id" : 61,
            "name" : "Team Overclockers #14"
          },
          {
            "id" : 62,
            "name" : "Team Overclockers #15"
          },
          {
            "id" : 63,
            "name" : "Team Jancon Mobile #36"
          },
          {
            "id" : 64,
            "name" : "Team Jancon Mobile #37"
          },
          {
            "id" : 65,
            "name" : "Kuebler Racing #14"
          },
          {
            "id" : 66,
            "name" : "Kuebler Racing #15"
          },
          {
            "id" : 67,
            "name" : "Dominum Musk Team #42"
          },
          {
            "id" : 68,
            "name" : "Dominum Musk Team #43"
          },
          {
            "id" : 69,
            "name" : "Team PINN Electron #40"
          },
          {
            "id" : 70,
            "name" : "Team PINN Electron #41"
          },
          {
            "id" : 71,
            "name" : "Besmone Motorsport #33"
          },
          {
            "id" : 72,
            "name" : "Besmone Motorsport #34"
          },
          {
            "id" : 73,
            "name" : "HoldMyKeys Racing Team #45"
          },
          {
            "id" : 74,
            "name" : "HoldMyKeys Racing Team #46"
          },
          {
            "id" : 75,
            "name" : "Sporddreka Exhausts #38"
          },
          {
            "id" : 76,
            "name" : "Sporddreka Exhausts #39"
          },
          {
            "id" : 77,
            "name" : "Horbsner Automotive #18"
          },
          {
            "id" : 78,
            "name" : "Horbsner Automotive #19"
          },
          {
            "id" : 79,
            "name" : "Mephisto Ignition Racing #20"
          },
          {
            "id" : 80,
            "name" : "Mephisto Ignition Racing #21"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Megane Trophy"
      },
      {
        "id" : -888134359,
        "name" : "Datsun 280ZX IMSA GTX",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Bob Sharp Racing #33"
          },
          {
            "id" : 52,
            "name" : "Bob Sharp Racing #33b"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 5"
      },
      {
        "id" : -878083866,
        "name" : "Acura NSX GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Acura Racing #0"
          },
          {
            "id" : 52,
            "name" : "RealTime Racing #43"
          },
          {
            "id" : 53,
            "name" : "RealTime Racing #93"
          },
          {
            "id" : 54,
            "name" : "Michael Shank Racing #86"
          },
          {
            "id" : 55,
            "name" : "Michael Shank Racing #93"
          },
          {
            "id" : 69,
            "name" : "Greddy Racing Team #135"
          },
          {
            "id" : 70,
            "name" : "Greddy Racing Team #136"
          },
          {
            "id" : 58,
            "name" : "Advan Racing Team #75"
          },
          {
            "id" : 59,
            "name" : "Advan Racing Team #76"
          },
          {
            "id" : 56,
            "name" : "Team AXI Autosport #88"
          },
          {
            "id" : 57,
            "name" : "Team AXI Autosport #89"
          },
          {
            "id" : 60,
            "name" : "F-MAX Corse #25"
          },
          {
            "id" : 61,
            "name" : "F-MAX Corse #26"
          },
          {
            "id" : 62,
            "name" : "Black Thumb Team #69"
          },
          {
            "id" : 63,
            "name" : "Black Thumb Team #70"
          },
          {
            "id" : 64,
            "name" : "Team Function 1122 #33"
          },
          {
            "id" : 65,
            "name" : "Team Function 1122 #34"
          },
          {
            "id" : 66,
            "name" : "Team Function 1122 #35"
          },
          {
            "id" : 67,
            "name" : "Slightly Mad Racing #147"
          },
          {
            "id" : 68,
            "name" : "Slightly Mad Racing #148"
          },
          {
            "id" : 71,
            "name" : "Bisimoto Racing #151"
          },
          {
            "id" : 72,
            "name" : "Bisimoto Racing #152"
          },
          {
            "id" : 73,
            "name" : "Team RS R #167"
          },
          {
            "id" : 74,
            "name" : "Team RS R #168"
          },
          {
            "id" : 75,
            "name" : "HKS Motorsport #191"
          },
          {
            "id" : 76,
            "name" : "HKS Motorsport #192"
          },
          {
            "id" : 77,
            "name" : "Bisimoto Team #161"
          },
          {
            "id" : 78,
            "name" : "Bisimoto Team #162"
          },
          {
            "id" : 79,
            "name" : "Team ESL #28"
          },
          {
            "id" : 80,
            "name" : "Team ESL #29"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : -871253931,
        "name" : "Panoz Esperante GTR1",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Panoz Motor Sports #44"
          },
          {
            "id" : 52,
            "name" : "Panoz Motor Sports #45"
          },
          {
            "id" : 53,
            "name" : "Panoz Motor Sports #4"
          },
          {
            "id" : 54,
            "name" : "Panoz Motor Sports #5"
          },
          {
            "id" : 55,
            "name" : "DAMS #52"
          },
          {
            "id" : 56,
            "name" : "David Price Racing #54"
          },
          {
            "id" : 57,
            "name" : "David Price Racing #55"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT1"
      },
      {
        "id" : -807187208,
        "name" : "Porsche 911 Carrera RSR 2.8",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche Racing Team #8"
          },
          {
            "id" : 52,
            "name" : "Porsche Racing Team #8b"
          },
          {
            "id" : 53,
            "name" : "Porsche Racing Team #9"
          },
          {
            "id" : 54,
            "name" : "Porsche Racing Team #62"
          },
          {
            "id" : 55,
            "name" : "Penske Racing #6"
          },
          {
            "id" : 56,
            "name" : "Brumos Porsche #58"
          },
          {
            "id" : 57,
            "name" : "Brumos Porsche #59"
          },
          {
            "id" : 58,
            "name" : "Helmick Racing #59"
          },
          {
            "id" : 59,
            "name" : "Porsche Kremer Racing Team #45"
          },
          {
            "id" : 60,
            "name" : "Porsche Kremer Racing Team #110"
          },
          {
            "id" : 61,
            "name" : "Porsche Kremer Racing Team #46"
          },
          {
            "id" : 62,
            "name" : "Rene Mazzia Team #42"
          },
          {
            "id" : 63,
            "name" : "Max Moritz GmbH #43"
          },
          {
            "id" : 64,
            "name" : "Porsche System Engineering #48"
          },
          {
            "id" : 65,
            "name" : "Jean Egreteaud Team #49"
          },
          {
            "id" : 66,
            "name" : "GELO Racing Team #63"
          },
          {
            "id" : 67,
            "name" : "Jean Sage Team #78"
          },
          {
            "id" : 68,
            "name" : "Ballot-Lena #7"
          },
          {
            "id" : 69,
            "name" : "Ballot-Lena #108"
          },
          {
            "id" : 70,
            "name" : "Louis Meznarie Team #84"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : -782532739,
        "name" : "BMW M6 GTLM",
        "liveries" : [
          {
            "id" : 51,
            "name" : "BMW Team RLL #25"
          },
          {
            "id" : 52,
            "name" : "BMW Team RLL #100"
          },
          {
            "id" : 53,
            "name" : "BMW Team RLL Retro #25"
          },
          {
            "id" : 54,
            "name" : "BMW Team RLL Black #25"
          },
          {
            "id" : 55,
            "name" : "BMW Team RLL Black #100"
          },
          {
            "id" : 56,
            "name" : "B1ZY Team #73"
          },
          {
            "id" : 57,
            "name" : "B1ZY Team #74"
          },
          {
            "id" : 58,
            "name" : "SRT Team #12"
          },
          {
            "id" : 59,
            "name" : "SRT Team #14"
          },
          {
            "id" : 60,
            "name" : "WRB Motorsport #44"
          },
          {
            "id" : 61,
            "name" : "WRB Motorsport #45"
          },
          {
            "id" : 62,
            "name" : "ACT Team #17"
          },
          {
            "id" : 63,
            "name" : "ACT Team #18"
          },
          {
            "id" : 64,
            "name" : "Bilstein Team #56"
          },
          {
            "id" : 65,
            "name" : "Bilstein Team #57"
          },
          {
            "id" : 66,
            "name" : "Hankook Team #77"
          },
          {
            "id" : 67,
            "name" : "Hankook Team #78"
          },
          {
            "id" : 68,
            "name" : "Pirelli Team #88"
          },
          {
            "id" : 69,
            "name" : "Pirelli Team #89"
          },
          {
            "id" : 70,
            "name" : "Pirelli Team #90"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTE"
      },
      {
        "id" : -752781428,
        "name" : "Ferrari 250 Testa Rossa",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Rosso #6"
          },
          {
            "id" : 2,
            "name" : "Rosso #9"
          },
          {
            "id" : 3,
            "name" : "Rosso #14"
          },
          {
            "id" : 4,
            "name" : "Giallo #57"
          },
          {
            "id" : 5,
            "name" : "Nero #124"
          },
          {
            "id" : 6,
            "name" : "Bianco #22"
          },
          {
            "id" : 7,
            "name" : "Rosso #18"
          },
          {
            "id" : 8,
            "name" : "Giallo #58"
          },
          {
            "id" : 9,
            "name" : "Giallo #17"
          },
          {
            "id" : 10,
            "name" : "Giallo #21"
          },
          {
            "id" : 11,
            "name" : "Rosso #7"
          },
          {
            "id" : 12,
            "name" : "Rosso #46"
          },
          {
            "id" : 13,
            "name" : "Argento #39"
          },
          {
            "id" : 14,
            "name" : "Argento #211"
          },
          {
            "id" : 15,
            "name" : "Bianco #19"
          },
          {
            "id" : 16,
            "name" : "Blu #12"
          },
          {
            "id" : 17,
            "name" : "Rosso #102"
          },
          {
            "id" : 18,
            "name" : "Rosso #88"
          },
          {
            "id" : 19,
            "name" : "Nero #110"
          },
          {
            "id" : 20,
            "name" : "Rosso #41"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT C"
      },
      {
        "id" : -713284494,
        "name" : "Lotus Type 25 Climax",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Lotus #4"
          },
          {
            "id" : 52,
            "name" : "Team Lotus #8"
          },
          {
            "id" : 53,
            "name" : "Team Ringley Inc. #22"
          },
          {
            "id" : 54,
            "name" : "Team Ringley Inc. #23"
          },
          {
            "id" : 55,
            "name" : "Bramhall Racing #6"
          },
          {
            "id" : 56,
            "name" : "Bramhall Racing #7"
          },
          {
            "id" : 57,
            "name" : "ACX Racing Service #12"
          },
          {
            "id" : 58,
            "name" : "ACX Racing Service #13"
          },
          {
            "id" : 59,
            "name" : "Hummerich Rennsport #25"
          },
          {
            "id" : 60,
            "name" : "Hummerich Rennsport #26"
          },
          {
            "id" : 61,
            "name" : "Equipe Dambreville #09"
          },
          {
            "id" : 62,
            "name" : "Equipe Dambreville #10"
          },
          {
            "id" : 63,
            "name" : "Clark Motorsport #27"
          },
          {
            "id" : 64,
            "name" : "Clark Motorsport #28"
          },
          {
            "id" : 65,
            "name" : "Falcon Racing Team #2"
          },
          {
            "id" : 66,
            "name" : "Falcon Racing Team #3"
          },
          {
            "id" : 67,
            "name" : "Bouchard Auto Sports #15"
          },
          {
            "id" : 68,
            "name" : "Bouchard Auto Sports #16"
          },
          {
            "id" : 69,
            "name" : "Morrish Enterprises #38"
          },
          {
            "id" : 70,
            "name" : "Morrish Enterprises #39"
          },
          {
            "id" : 71,
            "name" : "Bell Motorsport #1"
          },
          {
            "id" : 72,
            "name" : "Bell Motorsport #21"
          },
          {
            "id" : 73,
            "name" : "Viljoen Racing #29"
          },
          {
            "id" : 74,
            "name" : "Viljoen Racing #30"
          },
          {
            "id" : 75,
            "name" : "Adams Racing Services #20"
          },
          {
            "id" : 76,
            "name" : "Adams Racing Services #24"
          },
          {
            "id" : 77,
            "name" : "Team Dibley #11"
          },
          {
            "id" : 78,
            "name" : "Team Dibley #19"
          },
          {
            "id" : 79,
            "name" : "Kleiber Motors #17"
          },
          {
            "id" : 80,
            "name" : "Kleiber Motors #32"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage F1 D"
      },
      {
        "id" : -704151830,
        "name" : "Nissan 300ZX Turbo IMSA GTS",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Cunningham Racing #75"
          },
          {
            "id" : 52,
            "name" : "Cunningham Racing #76"
          },
          {
            "id" : 53,
            "name" : "Cunningham Racing Stillen #75"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTO"
      },
      {
        "id" : -699643670,
        "name" : "Renault Alpine A442B",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Renault Elf Sport #1"
          },
          {
            "id" : 52,
            "name" : "Renault Elf Sport #2"
          },
          {
            "id" : 53,
            "name" : "Renault Elf Sport #3"
          },
          {
            "id" : 54,
            "name" : "Renault Sport Calberson #4"
          },
          {
            "id" : 55,
            "name" : "Momo Corse #30"
          },
          {
            "id" : 56,
            "name" : "Momo Corse #31"
          },
          {
            "id" : 57,
            "name" : "Equipe Fonderie #67"
          },
          {
            "id" : 58,
            "name" : "Equipe Fonderie #68"
          },
          {
            "id" : 59,
            "name" : "Rexxar Racing Team #15"
          },
          {
            "id" : 60,
            "name" : "Rexxar Racing Team #16"
          },
          {
            "id" : 61,
            "name" : "HVS Filters Racing Team #6"
          },
          {
            "id" : 62,
            "name" : "HVS Filters Racing Team #7"
          },
          {
            "id" : 63,
            "name" : "Team Ferrario #18"
          },
          {
            "id" : 64,
            "name" : "Team Ferrario #19"
          },
          {
            "id" : 65,
            "name" : "Equipe Vitesse #28"
          },
          {
            "id" : 66,
            "name" : "Equipe Vitesse #29"
          },
          {
            "id" : 67,
            "name" : "Beran Motor Racing #47"
          },
          {
            "id" : 68,
            "name" : "Beran Motor Racing #48"
          },
          {
            "id" : 69,
            "name" : "Lubrace Motorsport #11"
          },
          {
            "id" : 70,
            "name" : "Lubrace Motorsport #12"
          },
          {
            "id" : 71,
            "name" : "HXC Racing Equipment #25"
          },
          {
            "id" : 72,
            "name" : "HXC Racing Equipment #26"
          },
          {
            "id" : 73,
            "name" : "Jack Tirbnos Racing #33"
          },
          {
            "id" : 74,
            "name" : "Jack Tirbnos Racing #34"
          },
          {
            "id" : 75,
            "name" : "Nillors Motorsport #35"
          },
          {
            "id" : 76,
            "name" : "Nillors Motorsport #36"
          },
          {
            "id" : 77,
            "name" : "Luigo Racing Team #55"
          },
          {
            "id" : 78,
            "name" : "Luigo Racing Team #56"
          },
          {
            "id" : 79,
            "name" : "DINO Motorsport #78"
          },
          {
            "id" : 80,
            "name" : "DINO Motorsport #79"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 6"
      },
      {
        "id" : -698401632,
        "name" : "Porsche 918 Spyder Weissach",
        "liveries" : [
          {
            "id" : 1,
            "name" : "GT Silber Metallic"
          },
          {
            "id" : 2,
            "name" : "Basaltschwarz Metallic"
          },
          {
            "id" : 3,
            "name" : "Dunkelblau Metallic"
          },
          {
            "id" : 4,
            "name" : "Indischrot"
          },
          {
            "id" : 5,
            "name" : "Liquid Metal Silber"
          },
          {
            "id" : 6,
            "name" : "Liquid Metal Chromblau"
          },
          {
            "id" : 7,
            "name" : "Mattschwarz"
          },
          {
            "id" : 8,
            "name" : "Meteorgrau Metallic"
          },
          {
            "id" : 9,
            "name" : "Schwarz"
          },
          {
            "id" : 10,
            "name" : "Rhodiumsilber Metallic"
          },
          {
            "id" : 11,
            "name" : "Saphirblau Metallic"
          },
          {
            "id" : 12,
            "name" : "Speedgelb"
          },
          {
            "id" : 13,
            "name" : "Weiss"
          },
          {
            "id" : 14,
            "name" : "Salzburg Weiss/Rot"
          },
          {
            "id" : 15,
            "name" : "Salzburg Indischrot/Weiss"
          },
          {
            "id" : 16,
            "name" : "Weiss/Schwarz"
          },
          {
            "id" : 17,
            "name" : "Orange/Silber"
          },
          {
            "id" : 18,
            "name" : "Blau/Silber"
          },
          {
            "id" : 19,
            "name" : "Weiss/Neongelb"
          },
          {
            "id" : 20,
            "name" : "Mattschwarz/Orange"
          },
          {
            "id" : 21,
            "name" : "Schwarz/Weiss"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road A"
      },
      {
        "id" : -667842301,
        "name" : "Renault 5 Maxi Turbo",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Renault Sport #3"
          },
          {
            "id" : 52,
            "name" : "Team Renault Chartres #27"
          },
          {
            "id" : 53,
            "name" : "Societe Diac #11"
          },
          {
            "id" : 54,
            "name" : "Societe Diac #12"
          },
          {
            "id" : 55,
            "name" : "Team Renault Sport #4"
          },
          {
            "id" : 56,
            "name" : "Team Mixlub #6"
          },
          {
            "id" : 57,
            "name" : "Team Mixlub #7"
          },
          {
            "id" : 58,
            "name" : "Dambreville Rallye #25"
          },
          {
            "id" : 59,
            "name" : "Dambreville Rallye #26"
          },
          {
            "id" : 60,
            "name" : "Beran Motorsport #43"
          },
          {
            "id" : 61,
            "name" : "Beran Motorsport #44"
          },
          {
            "id" : 62,
            "name" : "Acesits Rallye Team #14"
          },
          {
            "id" : 63,
            "name" : "Acesits Rallye Team #15"
          },
          {
            "id" : 64,
            "name" : "Pilara Motorsports #51"
          },
          {
            "id" : 65,
            "name" : "Pilara Motorsports #52"
          },
          {
            "id" : 66,
            "name" : "NOXI Team #9"
          },
          {
            "id" : 67,
            "name" : "NOXI Team #10"
          },
          {
            "id" : 68,
            "name" : "Petroblast Motors #16"
          },
          {
            "id" : 69,
            "name" : "Petroblast Motors #17"
          },
          {
            "id" : 70,
            "name" : "Frischkorn Rallye Team #20"
          },
          {
            "id" : 71,
            "name" : "Frischkorn Rallye Team #21"
          },
          {
            "id" : 72,
            "name" : "PCCF Community Events Online #18"
          },
          {
            "id" : 73,
            "name" : "PCCF Community Events Online #19"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group B"
      },
      {
        "id" : -648709823,
        "name" : "Renault Clio Cup",
        "liveries" : [
          {
            "id" : 51,
            "name" : "WDE Motorsport #82"
          },
          {
            "id" : 52,
            "name" : "Team JAE Brakes #4"
          },
          {
            "id" : 53,
            "name" : "Team JAE Brakes #5"
          },
          {
            "id" : 54,
            "name" : "Zavima Motorsport #16"
          },
          {
            "id" : 55,
            "name" : "Zavima Motorsport #17"
          },
          {
            "id" : 56,
            "name" : "XtremeIC Motorsport #24"
          },
          {
            "id" : 57,
            "name" : "XtremeIC Motorsport #25"
          },
          {
            "id" : 58,
            "name" : "Team Base One #10"
          },
          {
            "id" : 59,
            "name" : "Team Base One #11"
          },
          {
            "id" : 60,
            "name" : "BNS Birdia Racing #163"
          },
          {
            "id" : 61,
            "name" : "BNS Birdia Racing #164"
          },
          {
            "id" : 62,
            "name" : "MIST Racing Team #129"
          },
          {
            "id" : 63,
            "name" : "MIST Racing Team #130"
          },
          {
            "id" : 64,
            "name" : "Vane Cooling Systems #39"
          },
          {
            "id" : 65,
            "name" : "Vane Cooling Systems #40"
          },
          {
            "id" : 66,
            "name" : "Team Nettleship Exports #145"
          },
          {
            "id" : 67,
            "name" : "Team Nettleship Exports #146"
          },
          {
            "id" : 68,
            "name" : "Team Project CARS #62"
          },
          {
            "id" : 69,
            "name" : "Team Project CARS #63"
          },
          {
            "id" : 70,
            "name" : "Team Dominium Musk #52"
          },
          {
            "id" : 71,
            "name" : "Team Dominium Musk #53"
          },
          {
            "id" : 72,
            "name" : "Vollmer Motor Racing #87"
          },
          {
            "id" : 73,
            "name" : "Vollmer Motor Racing #88"
          },
          {
            "id" : 74,
            "name" : "Sobrent Motorsport #192"
          },
          {
            "id" : 75,
            "name" : "Sobrent Motorsport #193"
          },
          {
            "id" : 76,
            "name" : "Almynec Racing #58"
          },
          {
            "id" : 77,
            "name" : "Almynec Racing #59"
          },
          {
            "id" : 78,
            "name" : "Team GedK Gloves #28"
          },
          {
            "id" : 79,
            "name" : "Team GedK Gloves #29"
          },
          {
            "id" : 80,
            "name" : "CRCP Racing Team #31"
          },
          {
            "id" : 81,
            "name" : "CRCP Racing Team #32"
          },
          {
            "id" : 82,
            "name" : "JFB Motorsport #19"
          },
          {
            "id" : 83,
            "name" : "JFB Motorsport #20"
          },
          {
            "id" : 84,
            "name" : "Shalstrone Systems #176"
          },
          {
            "id" : 85,
            "name" : "Shalstrone Systems #177"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "TC1"
      },
      {
        "id" : -640190447,
        "name" : "Ferrari 512 S",
        "liveries" : [
          {
            "id" : 51,
            "name" : "S.E.F.A.C. Ferrari  #5"
          },
          {
            "id" : 52,
            "name" : "S.E.F.A.C. Ferrari  #6"
          },
          {
            "id" : 53,
            "name" : "S.E.F.A.C. Ferrari  #7"
          },
          {
            "id" : 54,
            "name" : "S.E.F.A.C. Ferrari  #8"
          },
          {
            "id" : 55,
            "name" : "North American Racing Team  #11"
          },
          {
            "id" : 56,
            "name" : "Ecurie Francorchamps #12"
          },
          {
            "id" : 57,
            "name" : "Scuderia Filipinetti #14"
          },
          {
            "id" : 58,
            "name" : "Scuderia Filipinetti #15"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Prototype A"
      },
      {
        "id" : -623946728,
        "name" : "Ginetta LMP3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Monster Energy Team #11"
          },
          {
            "id" : 52,
            "name" : "Monster Energy Team #12"
          },
          {
            "id" : 53,
            "name" : "Petrolonic Racing #85"
          },
          {
            "id" : 54,
            "name" : "Petrolonic Racing #86"
          },
          {
            "id" : 55,
            "name" : "Team iReatek #97"
          },
          {
            "id" : 56,
            "name" : "Team iReatek #98"
          },
          {
            "id" : 57,
            "name" : "AQI Motor Racing #72"
          },
          {
            "id" : 58,
            "name" : "AQI Motor Racing #73"
          },
          {
            "id" : 59,
            "name" : "HPF Motorsports #27"
          },
          {
            "id" : 60,
            "name" : "HPF Motorsports #28"
          },
          {
            "id" : 61,
            "name" : "Egmelt Racing Team #66"
          },
          {
            "id" : 62,
            "name" : "Egmelt Racing Team #67"
          },
          {
            "id" : 63,
            "name" : "Ovoomi Tweaks Racing #80"
          },
          {
            "id" : 64,
            "name" : "Ovoomi Tweaks Racing #81"
          },
          {
            "id" : 65,
            "name" : "Nakibaya Auto Sports #62"
          },
          {
            "id" : 66,
            "name" : "Nakibaya Auto Sports #63"
          },
          {
            "id" : 67,
            "name" : "Vetvic Motors #40"
          },
          {
            "id" : 68,
            "name" : "Vetvic Motors #41"
          },
          {
            "id" : 69,
            "name" : "Team ViloENS #58"
          },
          {
            "id" : 70,
            "name" : "Team ViloENS #59"
          },
          {
            "id" : 71,
            "name" : "Petrolos Motorsport #7"
          },
          {
            "id" : 72,
            "name" : "Petrolos Motorsport #8"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP3"
      },
      {
        "id" : -615186701,
        "name" : "Ford Escort RS1600 (Racing)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Hummerich Rennsport #14"
          },
          {
            "id" : 52,
            "name" : "Hummerich Rennsport #15"
          },
          {
            "id" : 53,
            "name" : "White Racing #10"
          },
          {
            "id" : 54,
            "name" : "White Racing #11"
          },
          {
            "id" : 55,
            "name" : "AJ Motorsport #22"
          },
          {
            "id" : 56,
            "name" : "AJ Motorsport #23"
          },
          {
            "id" : 57,
            "name" : "Mixlub Racing Team #28"
          },
          {
            "id" : 58,
            "name" : "Mixlub Racing Team #29"
          },
          {
            "id" : 59,
            "name" : "Binfield Motorsports #77"
          },
          {
            "id" : 60,
            "name" : "Binfield Motorsports #78"
          },
          {
            "id" : 61,
            "name" : "Equipe La Brute #93"
          },
          {
            "id" : 62,
            "name" : "Equipe La Brute #94"
          },
          {
            "id" : 63,
            "name" : "American Racing Team #19"
          },
          {
            "id" : 64,
            "name" : "American Racing Team #20"
          },
          {
            "id" : 65,
            "name" : "Morrish Motors #74"
          },
          {
            "id" : 66,
            "name" : "Morrish Motors #75"
          },
          {
            "id" : 67,
            "name" : "The Racers Club #52"
          },
          {
            "id" : 68,
            "name" : "The Racers Club #53"
          },
          {
            "id" : 69,
            "name" : "Bramhall Racing Team #48"
          },
          {
            "id" : 70,
            "name" : "Bramhall Racing Team #49"
          },
          {
            "id" : 71,
            "name" : "Team Cobalt #44"
          },
          {
            "id" : 72,
            "name" : "Team Cobalt #45"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT B"
      },
      {
        "id" : -579256927,
        "name" : "Olsbergs MSE RX Supercar Lite",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Olsbergs MSE X Forces #16"
          },
          {
            "id" : 52,
            "name" : "Olsbergs MSE X Forces #45"
          },
          {
            "id" : 53,
            "name" : "Olsbergs MSE X Forces #53"
          },
          {
            "id" : 54,
            "name" : "DirtFish Motorsports #21"
          },
          {
            "id" : 55,
            "name" : "DirtFish Motorsports #25"
          },
          {
            "id" : 58,
            "name" : "AF Racing #126"
          },
          {
            "id" : 59,
            "name" : "Inquiring Owl Team #32"
          },
          {
            "id" : 60,
            "name" : "Inquiring Owl Team #33"
          },
          {
            "id" : 61,
            "name" : "Sheriftizer Motorsports #44"
          },
          {
            "id" : 62,
            "name" : "Sheriftizer Motorsports #45"
          },
          {
            "id" : 63,
            "name" : "CRCP Racing Team #49"
          },
          {
            "id" : 64,
            "name" : "CRCP Racing Team #50"
          },
          {
            "id" : 65,
            "name" : "RFH Rallysport #62"
          },
          {
            "id" : 66,
            "name" : "RFH Rallysport #63"
          },
          {
            "id" : 67,
            "name" : "RFH Rallysport #64"
          },
          {
            "id" : 68,
            "name" : "RFH Rallysport #65"
          },
          {
            "id" : 69,
            "name" : "Team Heviloc International #75"
          },
          {
            "id" : 70,
            "name" : "Team Heviloc International #76"
          },
          {
            "id" : 71,
            "name" : "Burrien Energy Team #79"
          },
          {
            "id" : 72,
            "name" : "Burrien Energy Team #80"
          },
          {
            "id" : 73,
            "name" : "StepaNavi Racing #82"
          },
          {
            "id" : 74,
            "name" : "StepaNavi Racing #83"
          },
          {
            "id" : 75,
            "name" : "S+A Racing Services #54"
          },
          {
            "id" : 76,
            "name" : "S+A Racing Services #55"
          },
          {
            "id" : 77,
            "name" : "Team EDGE Composites #36"
          },
          {
            "id" : 78,
            "name" : "Team EDGE Composites #37"
          },
          {
            "id" : 79,
            "name" : "Molla Rallycross Team #21"
          },
          {
            "id" : 80,
            "name" : "Molla Rallycross Team #22"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "RXLites"
      },
      {
        "id" : -506272602,
        "name" : "Porsche 936 Spyder",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche System #3"
          },
          {
            "id" : 52,
            "name" : "Porsche System #4"
          },
          {
            "id" : 53,
            "name" : "Reinhold Joest Racing #5"
          },
          {
            "id" : 54,
            "name" : "Vegla Racing Team Joest #2"
          },
          {
            "id" : 55,
            "name" : "Vegla Racing Team Joest #1"
          },
          {
            "id" : 56,
            "name" : "Joest Racing #3"
          },
          {
            "id" : 57,
            "name" : "Joest Racing Technocar #14"
          },
          {
            "id" : 58,
            "name" : "Lindsay Saker Joest Racing #1"
          },
          {
            "id" : 59,
            "name" : "Joest Racing #1"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 6"
      },
      {
        "id" : -505616410,
        "name" : "Ferrari F12tdf",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Rosso Corsa 1"
          },
          {
            "id" : 2,
            "name" : "Rosso Corsa 2"
          },
          {
            "id" : 3,
            "name" : "Giallo Modena 1"
          },
          {
            "id" : 4,
            "name" : "Giallo Modena 2"
          },
          {
            "id" : 5,
            "name" : "Nero"
          },
          {
            "id" : 6,
            "name" : "Bianco Avus 1"
          },
          {
            "id" : 7,
            "name" : "Bianco Avus 2"
          },
          {
            "id" : 8,
            "name" : "Rosso Scuderia"
          },
          {
            "id" : 9,
            "name" : "Blu Pozzi"
          },
          {
            "id" : 10,
            "name" : "Nero Daytona Met."
          },
          {
            "id" : 11,
            "name" : "Rosso Mugello Met. 1"
          },
          {
            "id" : 12,
            "name" : "Rosso Mugello Met. 2"
          },
          {
            "id" : 13,
            "name" : "Argento Nurburgring Met. 1"
          },
          {
            "id" : 14,
            "name" : "Argento Nurburgring Met. 2"
          },
          {
            "id" : 15,
            "name" : "Blu Tour de France Met. 1"
          },
          {
            "id" : 16,
            "name" : "Blu Tour de France Met. 2"
          },
          {
            "id" : 17,
            "name" : "Blu Abu Dhabi Met."
          },
          {
            "id" : 18,
            "name" : "Blu Mirabeau Met."
          },
          {
            "id" : 19,
            "name" : "Grigio Alloy Met."
          },
          {
            "id" : 20,
            "name" : "Grigio Titanio Met."
          },
          {
            "id" : 21,
            "name" : "Grigio Ingrid Met. 1"
          },
          {
            "id" : 22,
            "name" : "Grigio Ingrid Met. 2"
          },
          {
            "id" : 23,
            "name" : "Grigio Silverstone Met. 1"
          },
          {
            "id" : 24,
            "name" : "Grigio Silverstone Met. 2"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road A"
      },
      {
        "id" : -494100071,
        "name" : "Bentley Speed 8",
        "liveries" : [
          {
            "id" : 50,
            "name" : "Team Bentley #7"
          },
          {
            "id" : 51,
            "name" : "Team Bentley #8"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP900"
      },
      {
        "id" : -486674040,
        "name" : "Pagani Zonda Revolución",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Zonda Revolucion #1"
          },
          {
            "id" : 52,
            "name" : "Zonda Revolucion #2"
          },
          {
            "id" : 53,
            "name" : "Carbon Racing #1"
          },
          {
            "id" : 54,
            "name" : "Carbon Racing #2"
          },
          {
            "id" : 55,
            "name" : "Team Pirelli #1"
          },
          {
            "id" : 56,
            "name" : "Team Pirelli #2"
          },
          {
            "id" : 57,
            "name" : "Incredible Cars Racing #58"
          },
          {
            "id" : 58,
            "name" : "Incredible Cars Racing #59"
          },
          {
            "id" : 59,
            "name" : "Sheriftizer Motorsport #8"
          },
          {
            "id" : 60,
            "name" : "Sheriftizer Motorsport #9"
          },
          {
            "id" : 61,
            "name" : "Team Project Cars #5"
          },
          {
            "id" : 62,
            "name" : "Team Project Cars #6"
          },
          {
            "id" : 63,
            "name" : "Besmone Automotive #65"
          },
          {
            "id" : 64,
            "name" : "Besmone Automotive #66"
          },
          {
            "id" : 65,
            "name" : "Elbregsen Racing #24"
          },
          {
            "id" : 66,
            "name" : "Elbregsen Racing #25"
          },
          {
            "id" : 67,
            "name" : "Vollmer Racing Team #38"
          },
          {
            "id" : 68,
            "name" : "Vollmer Racing Team #39"
          },
          {
            "id" : 69,
            "name" : "Adrenaline Racing #20"
          },
          {
            "id" : 70,
            "name" : "Adrenaline Racing #21"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day A"
      },
      {
        "id" : -448429240,
        "name" : "Honda 2&4 Concept",
        "liveries" : [
          {
            "id" : 51,
            "name" : "White / Red"
          },
          {
            "id" : 52,
            "name" : "Black / Red"
          },
          {
            "id" : 53,
            "name" : "Silver Metallic / Red"
          },
          {
            "id" : 54,
            "name" : "Yellow / Black"
          },
          {
            "id" : 55,
            "name" : "Blue Metallic / White"
          },
          {
            "id" : 56,
            "name" : "Red / White"
          },
          {
            "id" : 57,
            "name" : "Lightblue / Black"
          },
          {
            "id" : 58,
            "name" : "Black / Yellow"
          },
          {
            "id" : 59,
            "name" : "Orange / Black"
          },
          {
            "id" : 60,
            "name" : "Limegreen / Black"
          },
          {
            "id" : 61,
            "name" : "Green Metallic / White"
          },
          {
            "id" : 62,
            "name" : "White / Blue"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day B"
      },
      {
        "id" : -439539835,
        "name" : "Formula X",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Monster Energy Team #23"
          },
          {
            "id" : 52,
            "name" : "Monster Energy Team #24"
          },
          {
            "id" : 53,
            "name" : "Yokohama Advan Racing #3"
          },
          {
            "id" : 54,
            "name" : "Yokohama Advan Racing #4"
          },
          {
            "id" : 55,
            "name" : "Ebblix Racing Team #1"
          },
          {
            "id" : 56,
            "name" : "Ebblix Racing Team #2"
          },
          {
            "id" : 57,
            "name" : "Rotmeg Performance #5"
          },
          {
            "id" : 58,
            "name" : "Rotmeg Performance #6"
          },
          {
            "id" : 59,
            "name" : "A-PEX Autosports #7"
          },
          {
            "id" : 60,
            "name" : "A-PEX Autosports #8"
          },
          {
            "id" : 61,
            "name" : "Machuca Motorsport #9"
          },
          {
            "id" : 62,
            "name" : "Machuca Motorsport #10"
          },
          {
            "id" : 63,
            "name" : "Petroblast Racing Team #11"
          },
          {
            "id" : 64,
            "name" : "Petroblast Racing Team #12"
          },
          {
            "id" : 65,
            "name" : "Hiramashi Motorsport #26"
          },
          {
            "id" : 66,
            "name" : "Hiramashi Motorsport #27"
          },
          {
            "id" : 67,
            "name" : "Molla Racing Team #16"
          },
          {
            "id" : 68,
            "name" : "Molla Racing Team #17"
          },
          {
            "id" : 69,
            "name" : "Britgens Racing #33"
          },
          {
            "id" : 70,
            "name" : "Britgens Racing #34"
          },
          {
            "id" : 71,
            "name" : "Demonio Energy Team #73"
          },
          {
            "id" : 72,
            "name" : "Demonio Energy Team #74"
          },
          {
            "id" : 73,
            "name" : "Beran Racing Team #14"
          },
          {
            "id" : 74,
            "name" : "Beran Racing Team #15"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Formula X"
      },
      {
        "id" : -424432241,
        "name" : "Porsche 935/78-81",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Momo Corse #30"
          },
          {
            "id" : 52,
            "name" : "Momo Corse #70"
          },
          {
            "id" : 53,
            "name" : "Momo Racing Team #78"
          },
          {
            "id" : 54,
            "name" : "Momo Racing Team #16"
          },
          {
            "id" : 55,
            "name" : "DeNarvaez Enterprises #30"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 5"
      },
      {
        "id" : -405013350,
        "name" : "Ferrari 250 GT Berlinetta",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Rosso #11"
          },
          {
            "id" : 2,
            "name" : "Giallo #60"
          },
          {
            "id" : 3,
            "name" : "Argento #61"
          },
          {
            "id" : 4,
            "name" : "Blu #7"
          },
          {
            "id" : 5,
            "name" : "Argento #14"
          },
          {
            "id" : 6,
            "name" : "Rosso #3"
          },
          {
            "id" : 7,
            "name" : "Azzurro #4"
          },
          {
            "id" : 8,
            "name" : "Bianco #5"
          },
          {
            "id" : 9,
            "name" : "Azzurro #9"
          },
          {
            "id" : 10,
            "name" : "Argento #16"
          },
          {
            "id" : 11,
            "name" : "Rosso #19"
          },
          {
            "id" : 12,
            "name" : "Rosso #74"
          },
          {
            "id" : 13,
            "name" : "Bianco #15"
          },
          {
            "id" : 14,
            "name" : "Argento #164"
          },
          {
            "id" : 15,
            "name" : "Rosso #18"
          },
          {
            "id" : 16,
            "name" : "Argento #15"
          },
          {
            "id" : 17,
            "name" : "Giallo #11"
          },
          {
            "id" : 18,
            "name" : "Rosso #6"
          },
          {
            "id" : 19,
            "name" : "Rosso #21"
          },
          {
            "id" : 20,
            "name" : "Bianco #54"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT C"
      },
      {
        "id" : -387045855,
        "name" : "Jaguar XJ220 S",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Yellow"
          },
          {
            "id" : 2,
            "name" : "Lightblue"
          },
          {
            "id" : 3,
            "name" : "Red"
          },
          {
            "id" : 4,
            "name" : "Green"
          },
          {
            "id" : 5,
            "name" : "Orange"
          },
          {
            "id" : 6,
            "name" : "White"
          },
          {
            "id" : 7,
            "name" : "Black"
          },
          {
            "id" : 8,
            "name" : "Silver Metallic"
          },
          {
            "id" : 9,
            "name" : "Matte Grey"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road B"
      },
      {
        "id" : -384044277,
        "name" : "Chevrolet Corvette C7.R",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Corvette Racing #3"
          },
          {
            "id" : 52,
            "name" : "Corvette Racing #4"
          },
          {
            "id" : 53,
            "name" : "Corvette Racing #63"
          },
          {
            "id" : 54,
            "name" : "Corvette Racing #64"
          },
          {
            "id" : 55,
            "name" : "Serious Racing Team #5"
          },
          {
            "id" : 56,
            "name" : "Serious Racing Team #6"
          },
          {
            "id" : 57,
            "name" : "Mist Engineering #29"
          },
          {
            "id" : 58,
            "name" : "Mist Engineering #30"
          },
          {
            "id" : 59,
            "name" : "Caporal #26"
          },
          {
            "id" : 60,
            "name" : "Caporal #27"
          },
          {
            "id" : 61,
            "name" : "Keaveneys #10"
          },
          {
            "id" : 62,
            "name" : "Keaveneys #11"
          },
          {
            "id" : 63,
            "name" : "Ben Anderton #20"
          },
          {
            "id" : 64,
            "name" : "Ben Anderton #21"
          },
          {
            "id" : 65,
            "name" : "RFH #60"
          },
          {
            "id" : 66,
            "name" : "RFH #61"
          },
          {
            "id" : 67,
            "name" : "Alivstore #38"
          },
          {
            "id" : 68,
            "name" : "Alivstore #39"
          },
          {
            "id" : 69,
            "name" : "Mc Cool #49"
          },
          {
            "id" : 70,
            "name" : "Mc Cool #50"
          },
          {
            "id" : 71,
            "name" : "Team pArispherique #28"
          },
          {
            "id" : 72,
            "name" : "Team pArispherique #82"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTE"
      },
      {
        "id" : -382513194,
        "name" : "Dallara IR-12 Chevrolet (Road Course)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Penske #2"
          },
          {
            "id" : 52,
            "name" : "Team Penske #3"
          },
          {
            "id" : 54,
            "name" : "Ed Carpenter Racing #6"
          },
          {
            "id" : 55,
            "name" : "Chip Ganassi Racing #8"
          },
          {
            "id" : 56,
            "name" : "Chip Ganassi Racing #9"
          },
          {
            "id" : 57,
            "name" : "Chip Ganassi Racing #10"
          },
          {
            "id" : 58,
            "name" : "KVSH Racing #11"
          },
          {
            "id" : 59,
            "name" : "Team Penske #12"
          },
          {
            "id" : 60,
            "name" : "Ed Carpenter Racing #20"
          },
          {
            "id" : 61,
            "name" : "Ed Carpenter Racing #21"
          },
          {
            "id" : 62,
            "name" : "Team Penske #22"
          },
          {
            "id" : 65,
            "name" : "Chip Ganassi Racing #83"
          },
          {
            "id" : 66,
            "name" : "Pirtek Team Murray #61"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Indycar"
      },
      {
        "id" : -373393516,
        "name" : "Ford Mustang '66 RTR TransAm",
        "liveries" : [
          {
            "id" : 51,
            "name" : "RTR Motorsport #66"
          },
          {
            "id" : 52,
            "name" : "RTR Motorsport #99"
          },
          {
            "id" : 53,
            "name" : "Team Barata #64"
          },
          {
            "id" : 54,
            "name" : "Team Barata #65"
          },
          {
            "id" : 55,
            "name" : "Magnaflow Team #52"
          },
          {
            "id" : 56,
            "name" : "Magnaflow Team #53"
          },
          {
            "id" : 57,
            "name" : "Ringley Motors #4"
          },
          {
            "id" : 58,
            "name" : "Ringley Motors #5"
          },
          {
            "id" : 59,
            "name" : "Hummerich Racing #2"
          },
          {
            "id" : 60,
            "name" : "Hummerich Racing #3"
          },
          {
            "id" : 61,
            "name" : "Gerhat Racing Team #69"
          },
          {
            "id" : 62,
            "name" : "Gerhat Racing Team #76"
          },
          {
            "id" : 63,
            "name" : "Truran Motorsport #72"
          },
          {
            "id" : 64,
            "name" : "Truran Motorsport #73"
          },
          {
            "id" : 65,
            "name" : "Jeschke Racing Team #90"
          },
          {
            "id" : 66,
            "name" : "Jeschke Racing Team #91"
          },
          {
            "id" : 67,
            "name" : "Team Wakeman #83"
          },
          {
            "id" : 68,
            "name" : "Team Wakeman #84"
          },
          {
            "id" : 69,
            "name" : "Karlsson Motors #35"
          },
          {
            "id" : 70,
            "name" : "Karlsson Motors #36"
          },
          {
            "id" : 71,
            "name" : "Arbet Motorsport #95"
          },
          {
            "id" : 72,
            "name" : "Arbet Motorsport #96"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : -370668051,
        "name" : "Toyota GT-One (1999)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Toyota Motorsport #1"
          },
          {
            "id" : 52,
            "name" : "Toyota Motorsport #2"
          },
          {
            "id" : 53,
            "name" : "Toyota Motorsport #3"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP900"
      },
      {
        "id" : -353748333,
        "name" : "Ford Mustang RTR Spec - 5D",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team RTR 2017 #25"
          },
          {
            "id" : 52,
            "name" : "Team RTR 2016 #25"
          },
          {
            "id" : 53,
            "name" : "Team RTR 2017 #88"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Drift"
      },
      {
        "id" : -344750627,
        "name" : "Opel Astra TCR",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Opel Motorsport #01"
          },
          {
            "id" : 52,
            "name" : "Opel Motorsport #326"
          },
          {
            "id" : 53,
            "name" : "DG Sport Competition #23"
          },
          {
            "id" : 54,
            "name" : "DG Sport Competition #24"
          },
          {
            "id" : 55,
            "name" : "Noregret Racing #3"
          },
          {
            "id" : 56,
            "name" : "Noregret Racing #6"
          },
          {
            "id" : 57,
            "name" : "WRB Motorsport #13"
          },
          {
            "id" : 58,
            "name" : "WRB Motorsport #18"
          },
          {
            "id" : 59,
            "name" : "Jancon Mobile Team #33"
          },
          {
            "id" : 60,
            "name" : "Jancon Mobile Team #34"
          },
          {
            "id" : 61,
            "name" : "Team Griventec #35"
          },
          {
            "id" : 62,
            "name" : "Team Griventec #36"
          },
          {
            "id" : 63,
            "name" : "BCRacing Team #44"
          },
          {
            "id" : 64,
            "name" : "BCRacing Team #45"
          },
          {
            "id" : 65,
            "name" : "SuperPro Motorsport #59"
          },
          {
            "id" : 66,
            "name" : "SuperPro Motorsport #60"
          },
          {
            "id" : 67,
            "name" : "Yorri Motorsport #37"
          },
          {
            "id" : 68,
            "name" : "Yorri Motorsport #46"
          },
          {
            "id" : 69,
            "name" : "Wakeman Racing Team #69"
          },
          {
            "id" : 70,
            "name" : "Wakeman Racing Team #70"
          },
          {
            "id" : 71,
            "name" : "Maximum Motorsport #95"
          },
          {
            "id" : 72,
            "name" : "Maximum Motorsport #96"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Touring Car"
      },
      {
        "id" : -343023508,
        "name" : "Nissan R390 GT1",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Nissan Motorsport #30"
          },
          {
            "id" : 52,
            "name" : "Nissan Motorsport #31"
          },
          {
            "id" : 53,
            "name" : "Nissan Motorsport #32"
          },
          {
            "id" : 54,
            "name" : "Nissan Motorsport #33"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT1"
      },
      {
        "id" : -340376700,
        "name" : "Audi V8 quattro DTM",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Schmidt Motorsport Technik #1"
          },
          {
            "id" : 52,
            "name" : "Schmidt Motorsport Technik #2"
          },
          {
            "id" : 53,
            "name" : "Audi Zentrum Reutlingen #44"
          },
          {
            "id" : 54,
            "name" : "Audi Zentrum Reutlingen #45"
          },
          {
            "id" : 55,
            "name" : "Schmidt Motorsport Technik #46"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group A"
      },
      {
        "id" : -335104961,
        "name" : "Ferrari 330 P4",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Ferrari S.p.A. #3"
          },
          {
            "id" : 52,
            "name" : "Ferrari S.p.A. #4"
          },
          {
            "id" : 53,
            "name" : "Ferrari S.p.A. #21"
          },
          {
            "id" : 54,
            "name" : "Scuderia Filipinetti #22"
          },
          {
            "id" : 55,
            "name" : "Ferrari S.p.A. #23"
          },
          {
            "id" : 56,
            "name" : "Ferrari S.p.A. #24"
          },
          {
            "id" : 57,
            "name" : "Piper Attwood #7"
          },
          {
            "id" : 58,
            "name" : "Equipe Nationale Belge #11"
          },
          {
            "id" : 59,
            "name" : "North American Racing Team #25"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Prototype B"
      },
      {
        "id" : -327947155,
        "name" : "Porsche 961",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche AG #203"
          },
          {
            "id" : 52,
            "name" : "Porsche AG #203b"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTO"
      },
      {
        "id" : -303591806,
        "name" : "Nissan Skyline GT-R (R34) SMS-R",
        "liveries" : [
          {
            "id" : 51,
            "name" : "ADVAN #1"
          },
          {
            "id" : 52,
            "name" : "ADVAN #2"
          },
          {
            "id" : 53,
            "name" : "TAKATA"
          },
          {
            "id" : 54,
            "name" : "HKS #1"
          },
          {
            "id" : 55,
            "name" : "HKS #2"
          },
          {
            "id" : 56,
            "name" : "HKS #3"
          },
          {
            "id" : 57,
            "name" : "RS R Sport Service"
          },
          {
            "id" : 58,
            "name" : "Nismo"
          },
          {
            "id" : 59,
            "name" : "MOMO #1"
          },
          {
            "id" : 60,
            "name" : "MOMO #2"
          },
          {
            "id" : 61,
            "name" : "Project Cars #1"
          },
          {
            "id" : 62,
            "name" : "Project Cars #2"
          },
          {
            "id" : 63,
            "name" : "Yellow"
          },
          {
            "id" : 64,
            "name" : "White"
          },
          {
            "id" : 65,
            "name" : "Silver"
          },
          {
            "id" : 66,
            "name" : "Gold"
          },
          {
            "id" : 67,
            "name" : "Blue #1"
          },
          {
            "id" : 68,
            "name" : "Blue #2"
          },
          {
            "id" : 69,
            "name" : "Blue/Silver"
          },
          {
            "id" : 70,
            "name" : "Blue/Carbon"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Track Day B"
      },
      {
        "id" : -294770034,
        "name" : "Lotus Type 56",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Team Lotus #60"
          },
          {
            "id" : 52,
            "name" : "Team Lotus #70"
          },
          {
            "id" : 53,
            "name" : "Curling Motorsport #6"
          },
          {
            "id" : 54,
            "name" : "Curling Motorsport #7"
          },
          {
            "id" : 55,
            "name" : "Dino Racing Team #24"
          },
          {
            "id" : 56,
            "name" : "Dino Racing Team #25"
          },
          {
            "id" : 57,
            "name" : "Bramhall Racing #2"
          },
          {
            "id" : 58,
            "name" : "Bramhall Racing #3"
          },
          {
            "id" : 59,
            "name" : "Morrish Enterprises #20"
          },
          {
            "id" : 60,
            "name" : "Morrish Enterprises #21"
          },
          {
            "id" : 61,
            "name" : "Andy Clark Inc. #43"
          },
          {
            "id" : 62,
            "name" : "Andy Clark Inc. #44"
          },
          {
            "id" : 63,
            "name" : "Team Bouchard #33"
          },
          {
            "id" : 64,
            "name" : "Team Bouchard #34"
          },
          {
            "id" : 65,
            "name" : "Olivera Racing Team #18"
          },
          {
            "id" : 66,
            "name" : "Olivera racing Team #19"
          },
          {
            "id" : 67,
            "name" : "Team Barata Sports #26"
          },
          {
            "id" : 68,
            "name" : "Team Barata Sports #27"
          },
          {
            "id" : 69,
            "name" : "Decksbern Motorsport #62"
          },
          {
            "id" : 70,
            "name" : "Decksbern Motorsport #63"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Indycar"
      },
      {
        "id" : -278306106,
        "name" : "Nissan Skyline Super Silhouette",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Hasemi Motorsport #11"
          },
          {
            "id" : 52,
            "name" : "Hasemi Motorsport #11b"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 5"
      },
      {
        "id" : -241187148,
        "name" : "BMW M6 GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "BMW Motorsport #1"
          },
          {
            "id" : 52,
            "name" : "Schubert Motorsport #100"
          },
          {
            "id" : 53,
            "name" : "Schubert Motorsport #18"
          },
          {
            "id" : 54,
            "name" : "Schubert Motorsport #20"
          },
          {
            "id" : 55,
            "name" : "Falken Motorsport #33"
          },
          {
            "id" : 56,
            "name" : "Falken Motorsport #1"
          },
          {
            "id" : 57,
            "name" : "Turner Motorsport #97"
          },
          {
            "id" : 58,
            "name" : "Turner Motorsport #96"
          },
          {
            "id" : 60,
            "name" : "OCH Racing #137"
          },
          {
            "id" : 61,
            "name" : "OCH Racing #138"
          },
          {
            "id" : 62,
            "name" : "Schroth Racing #176"
          },
          {
            "id" : 63,
            "name" : "Schroth Racing #177"
          },
          {
            "id" : 64,
            "name" : "Zipanol Motorsports #27"
          },
          {
            "id" : 65,
            "name" : "Zipanol Motorsports #28"
          },
          {
            "id" : 66,
            "name" : "Team T-MANN Racing #44"
          },
          {
            "id" : 67,
            "name" : "Team T-MANN Racing #45"
          },
          {
            "id" : 68,
            "name" : "Mudino Motor Racing #113"
          },
          {
            "id" : 69,
            "name" : "Mudino Motor Racing #114"
          },
          {
            "id" : 70,
            "name" : "Decksbern Motorsport #72"
          },
          {
            "id" : 71,
            "name" : "Decksbern Motorsport #73"
          },
          {
            "id" : 72,
            "name" : "Japspeed #74"
          },
          {
            "id" : 73,
            "name" : "Japspeed #75"
          },
          {
            "id" : 74,
            "name" : "VP-Gaming.de #08"
          },
          {
            "id" : 75,
            "name" : "VP-Gaming.de #09"
          },
          {
            "id" : 76,
            "name" : "Team Highlands Racing #7"
          },
          {
            "id" : 77,
            "name" : "Team Highlands Racing #927"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : -240743205,
        "name" : "Audi R18 (Le Mans 2016)",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Audi Sport Team Joest #7"
          },
          {
            "id" : 52,
            "name" : "Audi Sport Team Joest #8"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP1 2016"
      },
      {
        "id" : -235751604,
        "name" : "Toyota GT-86",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Inferno Orange Metallic"
          },
          {
            "id" : 2,
            "name" : "Racing Red"
          },
          {
            "id" : 3,
            "name" : "Furious Black Mica"
          },
          {
            "id" : 4,
            "name" : "Speed Silver Metallic"
          },
          {
            "id" : 5,
            "name" : "Rapid Blue Mica"
          },
          {
            "id" : 6,
            "name" : "Dynamic White Pearl"
          },
          {
            "id" : 7,
            "name" : "Asphalt Grey Metallic"
          },
          {
            "id" : 51,
            "name" : "Classic livery #36"
          },
          {
            "id" : 52,
            "name" : "Classic livery #6"
          },
          {
            "id" : 53,
            "name" : "Classic livery #99"
          },
          {
            "id" : 54,
            "name" : "Classic livery Yellow"
          },
          {
            "id" : 55,
            "name" : "Classic livery #33"
          },
          {
            "id" : 56,
            "name" : "Gigabyte Aorus"
          },
          {
            "id" : 57,
            "name" : "Red Metallic/Black Stripes"
          },
          {
            "id" : 58,
            "name" : "Silver Metallic/Yellow Stripes"
          },
          {
            "id" : 59,
            "name" : "Spicy Orange/Black Stripes"
          },
          {
            "id" : 60,
            "name" : "Blue Metallic/Green Stripes"
          },
          {
            "id" : 61,
            "name" : "White/Black Stripes"
          },
          {
            "id" : 62,
            "name" : "Black/Fluo Stripes"
          },
          {
            "id" : 63,
            "name" : "Yellow Metallic"
          },
          {
            "id" : 64,
            "name" : "Light Blue Metallic"
          },
          {
            "id" : 65,
            "name" : "Green Metallic/Black Stripes"
          },
          {
            "id" : 66,
            "name" : "Bronze Metallic/Black Stripes"
          },
          {
            "id" : 67,
            "name" : "Purple Metallic/Yellow Stripes"
          },
          {
            "id" : 68,
            "name" : "Street Racing Edition"
          },
          {
            "id" : 69,
            "name" : "Chrome/Orange Stripes"
          },
          {
            "id" : 70,
            "name" : "Neon/Black Stripes"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road G"
      },
      {
        "id" : -211582477,
        "name" : "Porsche 924 Carrera GTP",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Porsche System #2"
          },
          {
            "id" : 52,
            "name" : "Porsche System #3"
          },
          {
            "id" : 53,
            "name" : "Porsche System #4"
          },
          {
            "id" : 54,
            "name" : "Holbert Racing #11"
          },
          {
            "id" : 55,
            "name" : "Holbert Racing #12"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group 4"
      },
      {
        "id" : -149617068,
        "name" : "Mitsubishi Lancer Evolution IX FQ360",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Octane Blue Pearl"
          },
          {
            "id" : 2,
            "name" : "Apex Silver Metallic"
          },
          {
            "id" : 3,
            "name" : "Graphite Grey Pearl"
          },
          {
            "id" : 4,
            "name" : "Phantom Black Pearl"
          },
          {
            "id" : 5,
            "name" : "Rally Red Metallic"
          },
          {
            "id" : 6,
            "name" : "Wicked White"
          },
          {
            "id" : 51,
            "name" : "Blue Pearl Livery"
          },
          {
            "id" : 52,
            "name" : "Soultire Racing Black"
          },
          {
            "id" : 53,
            "name" : "Soultire Racing Red"
          },
          {
            "id" : 54,
            "name" : "Soultire Racing White"
          },
          {
            "id" : 55,
            "name" : "RST"
          },
          {
            "id" : 56,
            "name" : "Tashimo Motorsport"
          },
          {
            "id" : 57,
            "name" : "STE Power"
          },
          {
            "id" : 58,
            "name" : "Harden"
          },
          {
            "id" : 59,
            "name" : "VittR Motorsport"
          },
          {
            "id" : 60,
            "name" : "Speed Stripes"
          },
          {
            "id" : 61,
            "name" : "Bronze Metallic Livery"
          },
          {
            "id" : 62,
            "name" : "Bersmann / Orange"
          },
          {
            "id" : 63,
            "name" : "Bersmann / Green Met."
          },
          {
            "id" : 64,
            "name" : "White / Orange Stripes"
          },
          {
            "id" : 65,
            "name" : "GT Fusion"
          },
          {
            "id" : 66,
            "name" : "Yellow / Black Stripes"
          },
          {
            "id" : 67,
            "name" : "Copper Metallic Livery"
          },
          {
            "id" : 68,
            "name" : "Ivo Competition"
          },
          {
            "id" : 69,
            "name" : "Neon Green"
          },
          {
            "id" : 70,
            "name" : "Dark Blue Metallic"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road E"
      },
      {
        "id" : -98064499,
        "name" : "Oreca 03 Nissan",
        "liveries" : [
          {
            "id" : 50,
            "name" : "Thiriet TDS Racing Team #1"
          },
          {
            "id" : 51,
            "name" : "Oreca factory #0"
          },
          {
            "id" : 52,
            "name" : "Fluknek Group #20"
          },
          {
            "id" : 53,
            "name" : "Fluknek Group #21"
          },
          {
            "id" : 54,
            "name" : "Edge Racing Team #38"
          },
          {
            "id" : 55,
            "name" : "Edge Racing Team #39"
          },
          {
            "id" : 56,
            "name" : "Racing Wellt #45"
          },
          {
            "id" : 57,
            "name" : "Racing Wellt #46"
          },
          {
            "id" : 58,
            "name" : "X-Fisher Pro Team #82"
          },
          {
            "id" : 59,
            "name" : "X-Fisher Pro Team #83"
          },
          {
            "id" : 60,
            "name" : "Beneen Motorsport #48"
          },
          {
            "id" : 61,
            "name" : "Beneen Motorsport #49"
          },
          {
            "id" : 62,
            "name" : "Exta Racing Team #32"
          },
          {
            "id" : 63,
            "name" : "Exta Racing Team #33"
          },
          {
            "id" : 64,
            "name" : "Holinger Motorsport #65"
          },
          {
            "id" : 65,
            "name" : "Holinger Motorsport #66"
          },
          {
            "id" : 66,
            "name" : "Storp Hill Racing #88"
          },
          {
            "id" : 67,
            "name" : "Storp Hill Racing #89"
          },
          {
            "id" : 68,
            "name" : "Egmelt Auto Sport #13"
          },
          {
            "id" : 69,
            "name" : "Egmelt Auto Sport #14"
          },
          {
            "id" : 70,
            "name" : "Team XtremeIC #61"
          },
          {
            "id" : 71,
            "name" : "Team XtremeIC #62"
          },
          {
            "id" : 72,
            "name" : "BAM eSport #6"
          },
          {
            "id" : 73,
            "name" : "BAM eSport #15"
          },
          {
            "id" : 74,
            "name" : "Team Redline #08"
          },
          {
            "id" : 75,
            "name" : "Team Redline #09"
          },
          {
            "id" : 76,
            "name" : "GTA Racing #34"
          },
          {
            "id" : 77,
            "name" : "GTA Racing #35"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "LMP2"
      },
      {
        "id" : -93033971,
        "name" : "Lamborghini Huracán GT3",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Grasser Racing #63"
          },
          {
            "id" : 52,
            "name" : "Barwell Motorsport #6"
          },
          {
            "id" : 53,
            "name" : "Barwell Motorsport #33"
          },
          {
            "id" : 54,
            "name" : "Barwell Motorsport #78"
          },
          {
            "id" : 55,
            "name" : "Barwell Motorsport #666"
          },
          {
            "id" : 56,
            "name" : "Team Barwell Motorsport #77"
          },
          {
            "id" : 57,
            "name" : "Team Barwell Motorsport #78"
          },
          {
            "id" : 58,
            "name" : "Team Barwell Motorsport #6"
          },
          {
            "id" : 59,
            "name" : "Team ARC Bratislava #69"
          },
          {
            "id" : 60,
            "name" : "Antonelli Motorsport #25"
          },
          {
            "id" : 61,
            "name" : "Antonelli Motorsport #63"
          },
          {
            "id" : 64,
            "name" : "Dime Racing #111"
          },
          {
            "id" : 65,
            "name" : "InnerShed Racing #117"
          },
          {
            "id" : 66,
            "name" : "InnerShed Racing #118"
          },
          {
            "id" : 67,
            "name" : "Avilgio Racing Team #66"
          },
          {
            "id" : 68,
            "name" : "Avilgio Racing Team #67"
          },
          {
            "id" : 69,
            "name" : "Koseki Motorsports #92"
          },
          {
            "id" : 70,
            "name" : "Koseki Motorsports #93"
          },
          {
            "id" : 71,
            "name" : "ATA Racing Team #157"
          },
          {
            "id" : 72,
            "name" : "ATA Racing Team #158"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GT3"
      },
      {
        "id" : -91815086,
        "name" : "Aston Martin DBR1/300",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Aston Martin Racing #2"
          },
          {
            "id" : 52,
            "name" : "Aston Martin Racing #3"
          },
          {
            "id" : 53,
            "name" : "Aston Martin Racing #4"
          },
          {
            "id" : 54,
            "name" : "Aston Martin Racing #5"
          },
          {
            "id" : 55,
            "name" : "Aston Martin Racing #6"
          },
          {
            "id" : 56,
            "name" : "Aston Martin Racing #7"
          },
          {
            "id" : 57,
            "name" : "Aston Martin Racing #8"
          },
          {
            "id" : 58,
            "name" : "Aston Martin Racing #9"
          },
          {
            "id" : 59,
            "name" : "Aston Martin Racing #19"
          },
          {
            "id" : 60,
            "name" : "Aston Martin Racing #20"
          },
          {
            "id" : 61,
            "name" : "Aston Martin Racing Moss #14"
          },
          {
            "id" : 62,
            "name" : "Clark Racing #17"
          },
          {
            "id" : 63,
            "name" : "Clark Racing #18"
          },
          {
            "id" : 64,
            "name" : "Rapa Motors #22"
          },
          {
            "id" : 65,
            "name" : "Rapa Motors #23"
          },
          {
            "id" : 66,
            "name" : "Equipe Bouchard #24"
          },
          {
            "id" : 67,
            "name" : "Equipe Bouchard #25"
          },
          {
            "id" : 68,
            "name" : "Moll Autosport #28"
          },
          {
            "id" : 69,
            "name" : "Moll Autosport #29"
          },
          {
            "id" : 70,
            "name" : "Team Bell Racing #30"
          },
          {
            "id" : 71,
            "name" : "Team Bell Racing #31"
          },
          {
            "id" : 72,
            "name" : "Motor Racing Services #32"
          },
          {
            "id" : 73,
            "name" : "Motor Racing Services #33"
          },
          {
            "id" : 74,
            "name" : "Hummerich Rennsport #44"
          },
          {
            "id" : 75,
            "name" : "Hummerich Rennsport #45"
          },
          {
            "id" : 76,
            "name" : "Karlsson Racing Team #46"
          },
          {
            "id" : 77,
            "name" : "Karlsson Racing Team #47"
          },
          {
            "id" : 78,
            "name" : "Baystead Automotive #50"
          },
          {
            "id" : 79,
            "name" : "Baystead Automotive #51"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT C"
      },
      {
        "id" : -85660500,
        "name" : "Mercedes-Benz 300 SEL 6.8 AMG",
        "liveries" : [
          {
            "id" : 51,
            "name" : "AMG Motorsport #35"
          },
          {
            "id" : 52,
            "name" : "AMG Motorsport #38"
          },
          {
            "id" : 53,
            "name" : "Team AMG Motorsport #35"
          },
          {
            "id" : 54,
            "name" : "Team AMG Motorsport #11"
          },
          {
            "id" : 55,
            "name" : "Forpi Racing Team #24"
          },
          {
            "id" : 56,
            "name" : "Forpi Racing Team #25"
          },
          {
            "id" : 57,
            "name" : "Rollins Motorsport #26"
          },
          {
            "id" : 58,
            "name" : "Rollins Motorsport #27"
          },
          {
            "id" : 59,
            "name" : "Clark Motor Services #18"
          },
          {
            "id" : 60,
            "name" : "Clark Motor Services #19"
          },
          {
            "id" : 61,
            "name" : "Biffs Racing #15"
          },
          {
            "id" : 62,
            "name" : "Biffs Racing #16"
          },
          {
            "id" : 63,
            "name" : "Kings Motor Racing Team #32"
          },
          {
            "id" : 64,
            "name" : "Kings Motor Racing Team #33"
          },
          {
            "id" : 65,
            "name" : "Jeschke Motorsport #8"
          },
          {
            "id" : 66,
            "name" : "Jeschke Motorsport #9"
          },
          {
            "id" : 67,
            "name" : "Zectrol Racing Team #36"
          },
          {
            "id" : 68,
            "name" : "Zectrol racing Team #37"
          },
          {
            "id" : 69,
            "name" : "Karsten Rennsport #12"
          },
          {
            "id" : 70,
            "name" : "Karsten Rennsport #13"
          },
          {
            "id" : 71,
            "name" : "Team Millgo #53"
          },
          {
            "id" : 72,
            "name" : "Team Millgo #54"
          },
          {
            "id" : 73,
            "name" : "Jack Tirbnos Team #78"
          },
          {
            "id" : 74,
            "name" : "Jack Tirbnos Team #79"
          },
          {
            "id" : 75,
            "name" : "Gerstenfelder Motorsport #30"
          },
          {
            "id" : 76,
            "name" : "Gerstenfelder Motorsport #31"
          },
          {
            "id" : 77,
            "name" : "Zipanol Racing Team #50"
          },
          {
            "id" : 78,
            "name" : "Zipanol Racing Team #51"
          },
          {
            "id" : 79,
            "name" : "Team Mixlub Racing #82"
          },
          {
            "id" : 80,
            "name" : "Team Mixlub Racing #83"
          },
          {
            "id" : 81,
            "name" : "Hartberg Rennsport #1"
          },
          {
            "id" : 82,
            "name" : "Hartberg Rennsport #2"
          },
          {
            "id" : 83,
            "name" : "Blattgold Motorsport #21"
          },
          {
            "id" : 84,
            "name" : "Blattgold Motorsport #22"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Vintage Touring-GT B"
      },
      {
        "id" : -78832007,
        "name" : "Mercedes-AMG C 63 Coupé S",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Polarweiss"
          },
          {
            "id" : 2,
            "name" : "Iridiumsilber Metallic"
          },
          {
            "id" : 3,
            "name" : "Selenitgrau Metallic"
          },
          {
            "id" : 4,
            "name" : "Brilliantblau Metallic"
          },
          {
            "id" : 5,
            "name" : "Obsidianschwarz Metallic"
          },
          {
            "id" : 6,
            "name" : "Disegno Diamantweiss"
          },
          {
            "id" : 7,
            "name" : "Disegno Iridiumsilber Magno"
          },
          {
            "id" : 8,
            "name" : "Disegno Selenitgrau Magno"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road E"
      },
      {
        "id" : -69155277,
        "name" : "Mini Countryman RX",
        "liveries" : [
          {
            "id" : 52,
            "name" : "JRM Racing #39"
          },
          {
            "id" : 53,
            "name" : "JRM Racing #40"
          },
          {
            "id" : 55,
            "name" : "Goodmeld Rallycross #20"
          },
          {
            "id" : 56,
            "name" : "Goodmeld Rallycross #21"
          },
          {
            "id" : 57,
            "name" : "Wreeblox System Team #32"
          },
          {
            "id" : 58,
            "name" : "Wreeblox System Team #33"
          },
          {
            "id" : 59,
            "name" : "Elbregsen Motorsport #53"
          },
          {
            "id" : 60,
            "name" : "Elbregsen Motorsport #54"
          },
          {
            "id" : 61,
            "name" : "Team RezaCalipers #40"
          },
          {
            "id" : 62,
            "name" : "Team RezaCalipers #41"
          },
          {
            "id" : 63,
            "name" : "X-Vare Rallye Team #12"
          },
          {
            "id" : 64,
            "name" : "X-Vare Rallye Team #13"
          },
          {
            "id" : 65,
            "name" : "Riddie Powersports #25"
          },
          {
            "id" : 66,
            "name" : "Riddie Powersports #26"
          },
          {
            "id" : 67,
            "name" : "WRB Motorsport #66"
          },
          {
            "id" : 68,
            "name" : "WRB Motorsport #67"
          },
          {
            "id" : 69,
            "name" : "Cobell Motorsport #14"
          },
          {
            "id" : 70,
            "name" : "Cobell Motorsport #15"
          },
          {
            "id" : 71,
            "name" : "XITE #21"
          },
          {
            "id" : 72,
            "name" : "XITE #22"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "WRX"
      },
      {
        "id" : -48442135,
        "name" : "Porsche 962C Langheck",
        "liveries" : [
          {
            "id" : 54,
            "name" : "Porsche AG Shell #17"
          },
          {
            "id" : 55,
            "name" : "Porsche AG Shell #18"
          },
          {
            "id" : 56,
            "name" : "Porsche AG Shell #19"
          },
          {
            "id" : 57,
            "name" : "Joest Racing #7"
          },
          {
            "id" : 58,
            "name" : "Joest Racing #8"
          },
          {
            "id" : 59,
            "name" : "Joest Racing Italya #7"
          },
          {
            "id" : 60,
            "name" : "Joest Racing Italya #8"
          },
          {
            "id" : 61,
            "name" : "Joest Racing Italya #9"
          },
          {
            "id" : 62,
            "name" : "Brun Motorsport FromA #5"
          },
          {
            "id" : 63,
            "name" : "Brun Motorsport Alpha #6"
          },
          {
            "id" : 64,
            "name" : "Kremer Racing #11"
          },
          {
            "id" : 65,
            "name" : "Team Schuppan #33"
          },
          {
            "id" : 66,
            "name" : "Brun Motorsport Hydro #16"
          },
          {
            "id" : 67,
            "name" : "Brun Motorsport Repsol #17"
          },
          {
            "id" : 68,
            "name" : "Brun Motorsport Repsol #27"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group C1"
      },
      {
        "id" : -41807622,
        "name" : "Toyota 86",
        "liveries" : [
          {
            "id" : 1,
            "name" : "Inferno Orange Metallic"
          },
          {
            "id" : 2,
            "name" : "Racing Red"
          },
          {
            "id" : 3,
            "name" : "Furious Black Mica"
          },
          {
            "id" : 4,
            "name" : "Speed Silver Metallic"
          },
          {
            "id" : 5,
            "name" : "Rapid Blue Mica"
          },
          {
            "id" : 6,
            "name" : "Dynamic White Pearl"
          },
          {
            "id" : 7,
            "name" : "Asphalt Grey Metallic"
          },
          {
            "id" : 51,
            "name" : "Classic livery #36"
          },
          {
            "id" : 52,
            "name" : "Classic livery #6"
          },
          {
            "id" : 53,
            "name" : "Classic livery #99"
          },
          {
            "id" : 54,
            "name" : "Classic livery Yellow"
          },
          {
            "id" : 55,
            "name" : "Classic livery #33"
          },
          {
            "id" : 56,
            "name" : "Gigabyte Aorus"
          },
          {
            "id" : 57,
            "name" : "Red Metallic/Black Stripes"
          },
          {
            "id" : 58,
            "name" : "Silver Metallic/Yellow Stripes"
          },
          {
            "id" : 59,
            "name" : "Spicy Orange/Black Stripes"
          },
          {
            "id" : 60,
            "name" : "Blue Metallic/Green Stripes"
          },
          {
            "id" : 61,
            "name" : "White/Black Stripes"
          },
          {
            "id" : 62,
            "name" : "Black/Fluo Stripes"
          },
          {
            "id" : 63,
            "name" : "Yellow Metallic"
          },
          {
            "id" : 64,
            "name" : "Light Blue Metallic"
          },
          {
            "id" : 65,
            "name" : "Green Metallic/Black Stripes"
          },
          {
            "id" : 66,
            "name" : "Bronze Metallic/Black Stripes"
          },
          {
            "id" : 67,
            "name" : "Purple Metallic/Yellow Stripes"
          },
          {
            "id" : 68,
            "name" : "Street Racing Edition"
          },
          {
            "id" : 69,
            "name" : "Chrome/Orange Stripes"
          },
          {
            "id" : 70,
            "name" : "Neon/Black Stripes"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Road G"
      },
      {
        "id" : -19222976,
        "name" : "Nissan GTP ZX-Turbo",
        "liveries" : [
          {
            "id" : 51,
            "name" : "Electramotive Engineering #83"
          },
          {
            "id" : 52,
            "name" : "Electramotive Engineering #84"
          },
          {
            "id" : 53,
            "name" : "Busby Racing #67"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "Group C1"
      },
      {
        "id" : -11335215,
        "name" : "Ford Mustang Cobra TransAm",
        "liveries" : [
          {
            "id" : 51,
            "name" : "HXC Equipment Team #8"
          },
          {
            "id" : 52,
            "name" : "HXC Equipment Team #9"
          },
          {
            "id" : 53,
            "name" : "Flak Motor Racing #10"
          },
          {
            "id" : 54,
            "name" : "Flak Motor Racing #11"
          },
          {
            "id" : 55,
            "name" : "Team Arbet Racing #21"
          },
          {
            "id" : 56,
            "name" : "Team Arbet Racing #22"
          },
          {
            "id" : 57,
            "name" : "Flynn Air Filters #23"
          },
          {
            "id" : 58,
            "name" : "Flynn Air Filters #24"
          },
          {
            "id" : 59,
            "name" : "Equipe Dambreville #26"
          },
          {
            "id" : 60,
            "name" : "Equipe Dambreville #27"
          },
          {
            "id" : 61,
            "name" : "Zipanol Motor Racing #31"
          },
          {
            "id" : 62,
            "name" : "Zipanol Motor Racing #32"
          },
          {
            "id" : 63,
            "name" : "Team Baysted Accoustics #33"
          },
          {
            "id" : 64,
            "name" : "Team Baysted Accoustics #34"
          },
          {
            "id" : 65,
            "name" : "Exta Auto Sports #45"
          },
          {
            "id" : 66,
            "name" : "Exta Auto Sports #46"
          },
          {
            "id" : 67,
            "name" : "Piston Motorsports #79"
          },
          {
            "id" : 68,
            "name" : "Piston Motorsports #78"
          },
          {
            "id" : 69,
            "name" : "Nalan Automatics #98"
          },
          {
            "id" : 70,
            "name" : "Nalan Automatics #99"
          },
          {
            "id" : 99,
            "name" : "Custom Livery"
          }
        ],
        "class" : "GTO"
      }
      ////// End Data from DS API
];
}


PCARSVEHICLELIVERYLIST.prototype.getNameById=getNameById;
PCARSVEHICLELIVERYLIST.prototype.getVehicleNumberById=getVehicleNumberById;
PCARSVEHICLELIVERYLIST.prototype.getIdByName=getIdByName;
PCARSVEHICLELIVERYLIST.prototype.getNameByIdNormalized=getNameByIdNormalized;
PCARSVEHICLELIVERYLIST.prototype._NameNormalization=_NameNormalization;
PCARSVEHICLELIVERYLIST.prototype._RestructureLiveryData=_RestructureLiveryData;
PCARSVEHICLELIVERYLIST.prototype.loadVehicleLiveryData=loadVehicleLiveryData;
PCARSVEHICLELIVERYLIST.prototype.checkfiles=checkfiles;
