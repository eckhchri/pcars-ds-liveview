// CLASS of an pCars vehicle
function PCARSVEHICLELIST() {

        this.name							=	"";
        this.idToNameMappingExt				=	[];			//extended mapping between vehicleid and name
        this.idToClassMappingExt			=	[];			//extended mapping between vehicleid and class
        this.idToClassMappingExtNormalized	=	[];			//extended mapping between vehicleid and class normalized
        this.NameToClassMappingExt			=	[];			//extended mapping between VehicleName and VehicleName
        this.NameToClassMappingExtNormalized=	[];			//extended mapping between VehicleName and VehicleNameNormalized
        this.NametoIDExt					=	[];			//extended mapping between VehicleName and VehilceID depending on game
        this.aVehicleList					=	[]; 		//merged array of pcars_vehicle objects from all game versions        
        this.aVehicleInfoExt				=	{};			//extended array of vehicle info which includes game name membership (PCARS2,PCARS2)
        
        //init data
        this.loadVehicleData();     												//get varaibale   this.aVehicleInfo
        this._validateVehicleData(this.aVehicleInfoExt);							//validate data
        this._generateVehicleData(_convertExtVehicleList(this.aVehicleInfoExt)); 	//init array of this object	        
        this._generateDataMapping(this.aVehicleInfoExt);							//generate Mappings
        
        
        if(log >= 3){console.log("INFO: PCARSVEHICLELIST. this ", this);}
        
        return this;
}

//fill the object with data
function _generateVehicleData(aVL){
				
	//build up PCARSVEHICLE objects
	for (i = 0; i < aVL.length; i++) {				
		this.aVehicleList[i] =  new  PCARSVEHICLE(
										aVL[i].id, 
										aVL[i].name, 
										aVL[i].class,
										'',
										aVL[i].gamescope,
										'-'
										); 																
	}
				
	return 1;
}

function _generateDataMapping(aVL){
		
	for (var gn in aVL){	//gn=GameName	
		
		for (var i = 0;i < aVL[gn].length;i++){
			
			//build up mapping hashes
			//first run initialisation
			if (! this.idToNameMappingExt[gn] ) {  this.idToNameMappingExt[gn] = []; }
			if (! this.NameToClassMappingExtNormalized[gn] ) {  this.NameToClassMappingExtNormalized[gn] = []; }
			if (! this.NameToClassMappingExt[gn] ) {  this.NameToClassMappingExt[gn] = []; }
			if (! this.NametoIDExt[gn] ){ this.NametoIDExt[gn] = []; }
			if (! this.idToClassMappingExtNormalized[gn] ) {  this.idToClassMappingExtNormalized[gn] = []; }
			if (! this.idToClassMappingExt[gn] ) {  this.idToClassMappingExt[gn] = []; }
			
			this.idToNameMappingExt[gn][aVL[gn][i].id] 					=	aVL[gn][i].name;			
			this.idToClassMappingExt[gn][aVL[gn][i].id]					=	aVL[gn][i].class;			
			this.idToClassMappingExtNormalized[gn][aVL[gn][i].id]		=	_ClassNormalization( aVL[gn][i].class );
			this.NameToClassMappingExt[gn][aVL[gn][i].name]				=	aVL[gn][i].class;			
			this.NameToClassMappingExtNormalized[gn][aVL[gn][i].name]	=	_ClassNormalization( aVL[gn][i].class );
			this.NametoIDExt[gn][aVL[gn][i].name]						=	aVL[gn][i].id;
			
			this.NametoIDExt
																	
		}
	}
}

function _ClassNormalization(str){	
	if (str){ //check if its defined string
		return str.replace(/ |\.|\(|\)/g, '_');
	}else{
		return "NO_CLASS_DEFINED";
	}
}

function _convertExtVehicleList(aVL, aVIE){
	//return an array of PCARSVehicle objects
	//task: merge PCARS1 and PCARS2 vehicle lists to displaying in the GUI jqgrid only uniqure entires
	//conditions:
	//		If all vehicle attributes are the same => GameName = "PCARS1 | PCARS2"
	//		if not: split into two lines		
	var aMergedVL	= 	{};						//merged vehicle list
	var aNewVL		=	[];	
	
	for (var gn in aVL){	//gn=GameName	
	
		for (var i = 0;i < aVL[gn].length;i++){
			
			//build a compare string with relevant attributes
			var cmpstr	= '||'+ aVL[gn][i].id +'||'+ aVL[gn][i].name +'||'+ aVL[gn][i].class +'||';
						
			if (aMergedVL[cmpstr]){ 
				//if exists comparestring allready exists, add new gamescope				
				aVL[gn][i]['gamescope'] = aMergedVL[cmpstr]['gamescope'] +'+'+ gn;
			}else{ 
				//first occurence of this comparestring
				aVL[gn][i]['gamescope'] = gn;
			}
			//in both cases add the original data
			aMergedVL[cmpstr]	= aVL[gn][i];	
															
		}				
	}			
	
	//after merging via comparestring bring it back to a normal flat array for each unique entry
	for (var data in aMergedVL ){		
		aNewVL.push(aMergedVL[data]);
	}
					
	return aNewVL;
}

function _validateVehicleData(aVL){
	
	//validate for
	// duplicate vehicleids
	var aVehilceIDs		=	[];
	// missing attribtes like class
		
	for (var gn in aVL){	//gn=GameName like PCARS1|PCARS2|...			
		for (var i = 0;i < aVL[gn].length;i++){
			// A) check if attribute is available
			if (!aVL[gn][i]['class']){
				if(log >= 3){console.log("WARNING: Vehicle attribute missing (class). Class in object: ", aVL[gn][i] );}
			}
			// B) check if attribute is available
			if (aVL[gn][i]['name'] == ""){
				if(log >= 3){console.log("WARNING: Vehicle attribute missing (name). Class in object: ", aVL[gn][i] );}
			}			
			// C) dupplicate IDs
			if ( aVL[gn][i]['id'] ){				
				//dupplicate IDs
				if( aVehilceIDs[ aVL[gn]['id'] ] ){
					if(log >= 3){console.log("WARNING: Vehicle id exists multiple times. ID: ", aVL[gn][i]['id'] );}					
				}else{
					aVehilceIDs[ aVL[gn]['id'] ] = "exists";				
				}				
			}									
		}
	}
	
}


//return a hash of vehicle classes with CSS Formatstrings
function getVehicleClasses(){
	
	for(var i=0;i < this.aVehicleList.length; i++){	
		aVehicleList[i].cls		
	}
}

function getVehicleClassByName(){
	
	for(var i=0;i < this.aVehicleList.length; i++){	
		aVehicleList[i].cls		
	}
 
}

function getVehicleList(){
	
	return this.aVehicleList;
}

function getClassNormalizedByString(VId, gn){	
	//gn=gamename   PCARS1|PCARS2
	//decision if mapping via VehicleID or Name	
	if (this.NameToClassMappingExtNormalized[gn][VId]){
			
		return this.NameToClassMappingExtNormalized[gn][VId];
	}else{
		
		//if name does not match, tray IDtoClass mapping
		return this.idToClassMappingExtNormalized[gn][VId]
	}
}

function getNameToClassMapping(gn){
	//gn=gamename   PCARS1|PCARS2	
	return this.NameToClassMappingExt[gn];
}
function getIdToNameMapping(gn){
	//gn=gamename   PCARS1|PCARS2
	return this.idToNameMappingExt[gn];
}

function getIdToClassMapping(gn){
	//gn=gamename   PCARS1|PCARS2
	return this.idToClassMappingExt[gn];
}


function VehicleIdToName(id, gn){
		
	if (this.idToNameMappingExt[gn][id]){
		return this.idToNameMappingExt[gn][id];	
	} else {
		// in the case vehilce IDs not in hash		
	}
	//if ID not found return id
	return id;
}

/////////////////////////////// static mapping ////////////////////

function loadVehicleData(){

/////////////// pcars1 dataset
this.aVehicleInfoExt['PCARS1']	=	[];		
this.aVehicleInfoExt['PCARS1'] = [
 {
   "id" : 9503224,
   "name" : "BMW 320 TC",
   "class" : "TC2"
 },
 {
   "id" : 65306143,
   "name" : "Sauber C9 Mercedes-Benz",
   "class" : "Group C1"
 },
 {
   "id" : 143364290,
   "name" : "BMW 2002 Turbo",
   "class" : "Historic Touring 2"
 },
 {
   "id" : 146414985,
   "name" : "RWD P20 LMP2",
   "class" : "LMP2"
 },
 {
   "id" : 152867459,
   "name" : "Radical SR8-RX",
   "class" : "LMP3"
 },
 {
   "id" : 262982797,
   "name" : "Mercedes-Benz 190E 2.5-16 Evolution2 DTM",
   "class" : "Group A"
 },
 {
   "id" : 274862187,
   "name" : "Mercedes-Benz SLS AMG GT3",
   "class" : "GT3"
 },
 {
   "id" : 307010432,
   "name" : "McLaren F1",
   "class" : "Road B"
 },
 {
   "id" : 310900789,
   "name" : "Ginetta G40 Junior",
   "class" : "GT5"
 },
 {
   "id" : 460478144,
   "name" : "Mitsubishi Lancer Evolution VI TME",
   "class" : "Road C2"
 },
 {
   "id" : 462547146,
   "name" : "Ruf RGT-8",
   "class" : "Road B"
 },
 {
   "id" : 526708607,
   "name" : "Ariel Atom Mugen",
   "class" : "Road B"
 },
 {
   "id" : 558051123,
   "name" : "Ruf CTR3",
   "class" : "Road A"
 },
 {
   "id" : 578910088,
   "name" : "Caper Monterey Stockcar",
   "class" : "Vintage Stockcar"
 },
 {
   "id" : 578969971,
   "name" : "Lotus Type 49 Cosworth",
   "class" : "Vintage F1 A"
 },
 {
   "id" : 607772150,
   "name" : "Ariel Atom 500 V8",
   "class" : "Road A"
 },
 {
   "id" : 675194619,
   "name" : "Caterham SP/300.R",
   "class" : "LMP3"
 },
 {
   "id" : 704998514,
   "name" : "Ruf Rt 12 R",
   "class" : "Road A"
 },
 {
   "id" : 738755746,
   "name" : "Aston Martin DBR1-2",
   "class" : "LMP1"
 },
 {
   "id" : 761457895,
   "name" : "KTM X-Bow R",
   "class" : "Road B"
 },
 {
   "id" : 779111340,
   "name" : "BMW 320 Turbo Group 5",
   "class" : "Group 5"
 },
 {
   "id" : 844159614,
   "name" : "125cc Shifter Kart",
   "class" : "Kart1"
 },
 {
   "id" : 851491257,
   "name" : "Ford Fusion Stockcar",
   "class" : "Modern Stockcar"
 },
 {
   "id" : 975104023,
   "name" : "BMW V12 LMR",
   "class" : "LMP900"
 },
 {
   "id" : 987814806,
   "name" : "Bentley Continental GT3",
   "class" : "GT3"
 },
 {
   "id" : 998947753,
   "name" : "Mitsubishi Lancer Evolution X FQ400",
   "class" : "Road C1"
 },
 {
   "id" : 1023089804,
   "name" : "RWD P30 LMP1",
   "class" : "LMP1"
 },
 {
   "id" : 1061494025,
   "name" : "Lotus Type 49C Cosworth",
   "class" : "Vintage F1 A"
 },
 {
   "id" : 1111049682,
   "name" : "Ford Mustang Boss 302R1",
   "class" : "GT4"
 },
 {
   "id" : 1161219858,
   "name" : "BMW Z4 GT3",
   "class" : "GT3"
 },
 {
   "id" : 1162971218,
   "name" : "Lotus Type 38 Ford",
   "class" : "Vintage Indy 65"
 },
 {
   "id" : 1219511257,
   "name" : "Audi R18 e-tron quattro",
   "class" : "LMP1"
 },
 {
   "id" : 1230061845,
   "name" : "Ford Mustang GT",
   "class" : "Road B"
 },
 {
   "id" : 1231996358,
   "name" : "Radical SR3-RS",
   "class" : "LMP3"
 },
 {
   "id" : 1268015922,
   "name" : "Aston Martin Vantage GT12",
   "class" : "Road B"
 },
 {
   "id" : 1353949246,
   "name" : "Mercedes-AMG GT3",
   "class" : "GT3"
 },
 {
   "id" : 1355771595,
   "name" : "Marek RP 219D LMP2",
   "class" : "LMP2"
 },
 {
   "id" : 1356687088,
   "name" : "Pagani Huayra BC",
   "class" : "Road A"
 },
 {
   "id" : 1357515789,
   "name" : "Ford Falcon FG V8 Supercar",
   "class" : "V8 Supercars"
 },
 {
   "id" : 1368036017,
   "name" : "BMW M1 Procar",
   "class" : "Group 4"
 },
 {
   "id" : 1397255601,
   "name" : "Ford Mustang 2+2 Fastback",
   "class" : "Historic Touring 2"
 },
 {
   "id" : 1400443574,
   "name" : "BAC Mono",
   "class" : "Road B"
 },
 {
   "id" : 1401308680,
   "name" : "Mercedes-Benz 300SL (W194)",
   "class" : "Vintage GT3"
 },
 {
   "id" : 1401532035,
   "name" : "Aston Martin V8 Vantage GTE",
   "class" : "GT3"
 },
 {
   "id" : 1452261378,
   "name" : "Aston Martin V12 Vantage GT3",
   "class" : "GT3"
 },
 {
   "id" : 1469658023,
   "name" : "Audi R8 V10 plus",
   "class" : "Road B"
 },
 {
   "id" : 1470929381,
   "name" : "Audi 90 quattro IMSA GTO",
   "class" : "Trans-Am"
 },
 {
   "id" : 1626504761,
   "name" : "Formula Renault 3.5",
   "class" : "Formula Renault"
 },
 {
   "id" : 1639105598,
   "name" : "Ford Escort Mk1 RS1600",
   "class" : "Historic Touring 2"
 },
 {
   "id" : 1694837381,
   "name" : "Renault Megane R.S. 265",
   "class" : "Road C2"
 },
 {
   "id" : 1764851930,
   "name" : "Toyota GT-86 Rocket Bunny GT Edition",
   "class" : "GT4"
 },
 {
   "id" : 1810453820,
   "name" : "Toyota TS040 Hybrid",
   "class" : "LMP1"
 },
 {
   "id" : 1817703058,
   "name" : "Ford Zakspeed Capri Group 5",
   "class" : "Group 5"
 },
 {
   "id" : 1884411907,
   "name" : "Audi R8 LMS Ultra",
   "class" : "GT3"
 },
 {
   "id" : 1901402958,
   "name" : "Dallara DW12 Indycar (Road Course)",
   "class" : "Indycar"
 },
 {
   "id" : 1909945073,
   "name" : "Formula A",
   "class" : "FA"
 },
 {
   "id" : 1959097924,
   "name" : "Lotus Type 98T Renault Turbo",
   "class" : "Vintage F1 C"
 },
 {
   "id" : 1979398129,
   "name" : "Mercedes-Benz CLK-LM",
   "class" : "GT1"
 },
 {
   "id" : 2017392050,
   "name" : "Ruf CTR",
   "class" : "Road B"
 },
 {
   "id" : 2022787216,
   "name" : "Alpine A450",
   "class" : "LMP2"
 },
 {
   "id" : 2082176226,
   "name" : "Audi A1 quattro",
   "class" : "Road C2"
 },
 {
   "id" : 2086246081,
   "name" : "Aston Martin V8 Vantage GT4",
   "class" : "GT4"
 },
 {
   "id" : 2091910841,
   "name" : "Ginetta G55 GT4",
   "class" : "GT4"
 },
 {
   "id" : -2075284877,
   "name" : "Formula Rookie",
   "class" : "F5"
 },
 {
   "id" : -2066888471,
   "name" : "Pagani Zonda R",
   "class" : "GT1X"
 },
 {
   "id" : -2062679088,
   "name" : "Pagani Huayra",
   "class" : "Road A"
 },
 {
   "id" : -2046825312,
   "name" : "Ruf CTR3 SMS-R",
   "class" : "GT1X"
 },
 {
   "id" : -2030487367,
   "name" : "Marek RP 339H LMP1",
   "class" : "LMP1"
 },
 {
   "id" : -2025231366,
   "name" : "Cadillac ATS-V.R GT3",
   "class" : "GT3"
 },
 {
   "id" : -2020758805,
   "name" : "Ruf RGT-8 GT3",
   "class" : "GT3"
 },
 {
   "id" : -1966060946,
   "name" : "Mazda MX-5 Radbul",
   "class" : "Road A"
 },
 {
   "id" : -1921505310,
   "name" : "Palmer Jaguar JP-LM",
   "class" : "LMP3"
 },
 {
   "id" : -1856998124,
   "name" : "Renault Sport R.S. 01",
   "class" : "RS01 Trophy"
 },
 {
   "id" : -1835861548,
   "name" : "Lotus Type 78 Cosworth",
   "class" : "Vintage F1 B"
 },
 {
   "id" : -1774335742,
   "name" : "Ford MkIV",
   "class" : "Vintage GT"
 },
 {
   "id" : -1770401008,
   "name" : "Ariel Atom 300 Supercharged",
   "class" : "Road B"
 },
 {
   "id" : -1761671051,
   "name" : "Audi R8 (LMP900)",
   "class" : "LMP900"
 },
 {
   "id" : -1748676965,
   "name" : "McLaren P1™",
   "class" : "Road A"
 },
 {
   "id" : -1738120892,
   "name" : "Ford Focus RS",
   "class" : "Road C2"
 },
 {
   "id" : -1729266457,
   "name" : "Mercedes-Benz SLS AMG",
   "class" : "Road B"
 },
 {
   "id" : -1706259671,
   "name" : "Formula Gulf 1000",
   "class" : "F4"
 },
 {
   "id" : -1617916111,
   "name" : "Pagani Zonda Cinque Roadster",
   "class" : "Road A"
 },
 {
   "id" : -1545450182,
   "name" : "BMW M3 GT4",
   "class" : "GT4"
 },
 {
   "id" : -1522922538,
   "name" : "Mercedes-Benz A45 AMG",
   "class" : "Road C1"
 },
 {
   "id" : -1435057179,
   "name" : "Lotus Type 51",
   "class" : "Vintage F3 A"
 },
 {
   "id" : -1411323812,
   "name" : "BMW 1-Series M Coupe StanceWorks Edition",
   "class" : "Road B"
 },
 {
   "id" : -1365918055,
   "name" : "BMW M3 GT",
   "class" : "GT3"
 },
 {
   "id" : -1320616846,
   "name" : "Lotus Type 72D Cosworth",
   "class" : "Vintage F1 B"
 },
 {
   "id" : -1318848040,
   "name" : "Formula B",
   "class" : "FB"
 },
 {
   "id" : -1253474718,
   "name" : "Ford Sierra RS500 Cosworth Group A",
   "class" : "Group A"
 },
 {
   "id" : -1226176940,
   "name" : "BMW 1-Series M Coupe",
   "class" : "Road C1"
 },
 {
   "id" : -1204688299,
   "name" : "Lotus Type 40 Ford",
   "class" : "Vintage GT"
 },
 {
   "id" : -1187748261,
   "name" : "BMW 2002 StanceWorks Edition",
   "class" : "Historic Touring 2"
 },
 {
   "id" : -1170674276,
   "name" : "Ginetta G55 GT3",
   "class" : "GT3"
 },
 {
   "id" : -1166911988,
   "name" : "McLaren 12C GT3",
   "class" : "GT3"
 },
 {
   "id" : -1127314200,
   "name" : "Scion FR-S Rocket Bunny Edition",
   "class" : "Road B"
 },
 {
   "id" : -1067902110,
   "name" : "Audi R18 TDI",
   "class" : "LMP1"
 },
 {
   "id" : -1048050877,
   "name" : "Radical RXC Turbo",
   "class" : "Road A"
 },
 {
   "id" : -1041674971,
   "name" : "Formula C",
   "class" : "FC"
 },
 {
   "id" : -1001569309,
   "name" : "McLaren F1 GTR Long Tail",
   "class" : "GT1"
 },
 {
   "id" : -956881226,
   "name" : "Renault Megane R.S. 275 Trophy-R",
   "class" : "Road C1"
 },
 {
   "id" : -937933849,
   "name" : "250cc Superkart",
   "class" : "Kart3"
 },
 {
   "id" : -934098507,
   "name" : "BMW M3 E30 Group A",
   "class" : "Group A"
 },
 {
   "id" : -931590477,
   "name" : "Renault Megane Trophy V6",
   "class" : "Megane Trophy"
 },
 {
   "id" : -886212684,
   "name" : "Caterham Seven Classic",
   "class" : "Road D"
 },
 {
   "id" : -713284494,
   "name" : "Lotus Type 25 Climax",
   "class" : "Vintage F1 A1"
 },
 {
   "id" : -699643670,
   "name" : "Renault Alpine A442B",
   "class" : "Group 6"
 },
 {
   "id" : -674255528,
   "name" : "GUMPERT apollo S",
   "class" : "Road A"
 },
 {
   "id" : -648709823,
   "name" : "Renault Clio Cup",
   "class" : "TC1"
 },
 {
   "id" : -525060572,
   "name" : "Mercedes-Benz AMG C-Coupe DTM",
   "class" : "TC3"
 },
 {
   "id" : -494100071,
   "name" : "Bentley Speed 8",
   "class" : "LMP900"
 },
 {
   "id" : -486674040,
   "name" : "Pagani Zonda Revolucion",
   "class" : "GT1X"
 },
 {
   "id" : -444124510,
   "name" : "McLaren 12C",
   "class" : "Road A"
 },
 {
   "id" : -384044277,
   "name" : "Chevrolet Corvette C7.R",
   "class" : "GT3"
 },
 {
   "id" : -356101373,
   "name" : "Scion FR-S",
   "class" : "Road D"
 },
 {
   "id" : -324240456,
   "name" : "Aston Martin Rapide S Hydrogen Hybrid",
   "class" : "GT4"
 },
 {
   "id" : -235751604,
   "name" : "Toyota GT-86",
   "class" : "Road D"
 },
 {
   "id" : -180129877,
   "name" : "W Motors Lykan HyperSport",
   "class" : "Road A"
 },
 {
   "id" : -162683612,
   "name" : "Caterham Superlight R500",
   "class" : "Road B"
 },
 {
   "id" : -149617068,
   "name" : "Mitsubishi Lancer Evolution IX FQ360",
   "class" : "Road C1"
 },
 {
   "id" : -98064499,
   "name" : "Oreca 03 Nissan",
   "class" : "LMP2"
 },
 {
   "id" : -91815086,
   "name" : "Aston Martin DBR1/300",
   "class" : "Vintage GT2"
 },
 {
   "id" : -85660500,
   "name" : "Mercedes-Benz 300SEL 6.8 AMG",
   "class" : "Historic Touring 2"
 },
 {
   "id" : -41807622,
   "name" : "Toyota 86",
   "class" : "Road D"
 },
 {
   "id" : -11335215,
   "name" : "Ford Mustang Cobra TransAm",
   "class" : "Trans-Am"
 }
];
	
/////////////// pcars2 dataset
this.aVehicleInfoExt['PCARS2']	=	[];
this.aVehicleInfoExt['PCARS2']	= 	[
      {
	"id" : 9999999999,
	"name" : "Slightly Mad Studios Ltd",
	"class" : "NA"
      },
//////pcars2 data begins here
      {
        "id" : 9503224,
        "name" : "BMW 320 TC (E90)",
        "class" : "Touring Car"
      },
      {
        "id" : 58065064,
        "name" : "Ginetta G40 GT5",
        "class" : "GT5"
      },
      {
        "id" : 65306143,
        "name" : "Sauber C9 Mercedes-Benz",
        "class" : "Group C1"
      },
      {
        "id" : 85063219,
        "name" : "Nissan GT-R Nismo (R35)",
        "class" : "Road C"
      },
      {
        "id" : 143364290,
        "name" : "BMW 2002 Turbo",
        "class" : "Road G"
      },
      {
        "id" : 152867459,
        "name" : "Radical SR8-RX",
        "class" : "Track Day A"
      },
      {
        "id" : 161704608,
        "name" : "Ford Mustang RTR GT4",
        "class" : "GT4"
      },
      {
        "id" : 178583869,
        "name" : "Chevrolet Camaro ZL-1",
        "class" : "Road D"
      },
      {
        "id" : 185812116,
        "name" : "Ferrari 488 GT3",
        "class" : "GT3"
      },
      {
        "id" : 262982797,
        "name" : "Mercedes-Benz 190E 2.5-16 Evolution 2 DTM",
        "class" : "Group A"
      },
      {
        "id" : 266758367,
        "name" : "Lamborghini Sesto Elemento",
        "class" : "Track Day B"
      },
      {
        "id" : 274862187,
        "name" : "Mercedes-Benz SLS AMG GT3",
        "class" : "GT3"
      },
      {
        "id" : 307010432,
        "name" : "McLaren F1",
        "class" : "Road C"
      },
      {
        "id" : 310900789,
        "name" : "Ginetta G40 Junior",
        "class" : "G40 Junior"
      },
      {
        "id" : 366881611,
        "name" : "Ford GT",
        "class" : "Road B"
      },
      {
        "id" : 405826415,
        "name" : "Ferrari 488 GTE",
        "class" : "GTE"
      },
      {
        "id" : 460478144,
        "name" : "Mitsubishi Lancer Evolution VI T.M.E.",
        "class" : "Road F"
      },
      {
        "id" : 556202917,
        "name" : "Renault Mégane R.S. SMS-R Rallycross",
        "class" : "WRX"
      },
      {
        "id" : 574354493,
        "name" : "Mercedes-AMG A 45 SMS-R Rallycross",
        "class" : "WRX"
      },
      {
        "id" : 578969971,
        "name" : "Lotus Type 49 Cosworth",
        "class" : "Vintage F1 C"
      },
      {
        "id" : 647968520,
        "name" : "Ford Focus RS RX",
        "class" : "WRX"
      },
      {
        "id" : 675194619,
        "name" : "Caterham SP/300.R",
        "class" : "Track Day B"
      },
      {
        "id" : 696555869,
        "name" : "Ferrari 365 GTB4 Competizione",
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : 728095309,
        "name" : "Chevrolet Camaro Z/28 '69 TransAm",
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : 728234598,
        "name" : "Acura NSX",
        "class" : "Road C"
      },
      {
        "id" : 761457895,
        "name" : "KTM X-Bow R",
        "class" : "Road D"
      },
      {
        "id" : 779111340,
        "name" : "BMW 320 Turbo Group 5",
        "class" : "Group 5"
      },
      {
        "id" : 809291220,
        "name" : "Porsche 911 GT3 R",
        "class" : "GT3"
      },
      {
        "id" : 820529698,
        "name" : "Ligier JS P2 Nissan",
        "class" : "LMP2"
      },
      {
        "id" : 844159614,
        "name" : "Kart",
        "class" : "Kart1"
      },
      {
        "id" : 851491257,
        "name" : "Ford Fusion Stockcar",
        "class" : "Modern Stockcar"
      },
      {
        "id" : 951815226,
        "name" : "Honda Civic Coupé GRC",
        "class" : "WRX"
      },
      {
        "id" : 957632269,
        "name" : "Porsche 962C",
        "class" : "Group C1"
      },
      {
        "id" : 975104023,
        "name" : "BMW V12 LMR",
        "class" : "LMP900"
      },
      {
        "id" : 980572679,
        "name" : "McLaren 570S",
        "class" : "Road C"
      },
      {
        "id" : 987814806,
        "name" : "Bentley Continental GT3 (2015)",
        "class" : "GT3"
      },
      {
        "id" : 998894988,
        "name" : "Audi R8 LMS Endurance",
        "class" : "GT3"
      },
      {
        "id" : 998947753,
        "name" : "Mitsubishi Lancer Evolution X FQ400",
        "class" : "Road E"
      },
      {
        "id" : 1015579264,
        "name" : "Ferrari F40 LM",
        "class" : "GTO"
      },
      {
        "id" : 1061494025,
        "name" : "Lotus Type 49C Cosworth",
        "class" : "Vintage F1 C"
      },
      {
        "id" : 1076438091,
        "name" : "Porsche 911 GT1-98",
        "class" : "GT1"
      },
      {
        "id" : 1106819298,
        "name" : "McLaren 720S",
        "class" : "Road A"
      },
      {
        "id" : 1111049682,
        "name" : "Ford Mustang Boss 302R",
        "class" : "GT4"
      },
      {
        "id" : 1137321511,
        "name" : "RWD P30 LMP1",
        "class" : "LMP1"
      },
      {
        "id" : 1141733552,
        "name" : "Chevrolet Corvette Z06",
        "class" : "Road C"
      },
      {
        "id" : 1153746660,
        "name" : "McLaren 650S GT3",
        "class" : "GT3"
      },
      {
        "id" : 1161219858,
        "name" : "BMW Z4 GT3",
        "class" : "GT3"
      },
      {
        "id" : 1162971218,
        "name" : "Lotus Type 38 Ford",
        "class" : "Vintage Indycar"
      },
      {
        "id" : 1187826685,
        "name" : "Jaguar F-Type SVR Coupé",
        "class" : "Road D"
      },
      {
        "id" : 1213801406,
        "name" : "Porsche 935/80",
        "class" : "Group 5"
      },
      {
        "id" : 1219511257,
        "name" : "Audi R18 e-tron quattro (2014)",
        "class" : "LMP1"
      },
      {
        "id" : 1230061845,
        "name" : "Ford Mustang GT",
        "class" : "Road E"
      },
      {
        "id" : 1231996358,
        "name" : "Radical SR3-RS",
        "class" : "Track Day B"
      },
      {
        "id" : 1268015922,
        "name" : "Aston Martin Vantage GT12",
        "class" : "Road C"
      },
      {
        "id" : 1278633095,
        "name" : "Toyota GT-86 Rocket Bunny Street",
        "class" : "Road C"
      },
      {
        "id" : 1319185453,
        "name" : "Porsche 935/77",
        "class" : "Group 5"
      },
      {
        "id" : 1352236476,
        "name" : "RWD P20 LMP2",
        "class" : "LMP2"
      },
      {
        "id" : 1353949246,
        "name" : "Mercedes-AMG GT3",
        "class" : "GT3"
      },
      {
        "id" : 1356687088,
        "name" : "Pagani Huayra BC",
        "class" : "Road A"
      },
      {
        "id" : 1357515789,
        "name" : "Ford Falcon FG V8 Supercar",
        "class" : "V8 Supercars"
      },
      {
        "id" : 1368036017,
        "name" : "BMW M1 Procar",
        "class" : "Group 4"
      },
      {
        "id" : 1368545018,
        "name" : "Sauber C9 LM Mercedes-Benz",
        "class" : "Group C1"
      },
      {
        "id" : 1397255601,
        "name" : "Ford Mustang 2+2 Fastback",
        "class" : "Road G"
      },
      {
        "id" : 1400443574,
        "name" : "BAC Mono",
        "class" : "Road B"
      },
      {
        "id" : 1401308680,
        "name" : "Mercedes-Benz 300 SL (W194)",
        "class" : "Vintage Touring-GT D"
      },
      {
        "id" : 1401532035,
        "name" : "Aston Martin Vantage GTE",
        "class" : "GTE"
      },
      {
        "id" : 1406411897,
        "name" : "Lamborghini Huracán LP620-2 Super Trofeo",
        "class" : "Super Trofeo"
      },
      {
        "id" : 1433352906,
        "name" : "Ginetta G57",
        "class" : "Track Day A"
      },
      {
        "id" : 1452261378,
        "name" : "Aston Martin Vantage GT3",
        "class" : "GT3"
      },
      {
        "id" : 1464988033,
        "name" : "Porsche Cayman GT4 Clubsport MR",
        "class" : "GT4"
      },
      {
        "id" : 1468371103,
        "name" : "Ligier JS P2 Honda",
        "class" : "LMP2"
      },
      {
        "id" : 1469658023,
        "name" : "Audi R8 V10 plus 5.2 FSI quattro",
        "class" : "Road C"
      },
      {
        "id" : 1470929381,
        "name" : "Audi 90 quattro IMSA GTO",
        "class" : "GTO"
      },
      {
        "id" : 1481115672,
        "name" : "Nissan Fairlady 240ZG GTS-II",
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : 1564669712,
        "name" : "Lamborghini Veneno LP750-4",
        "class" : "Road B"
      },
      {
        "id" : 1574251638,
        "name" : "KTM X-Bow GT4",
        "class" : "GT4"
      },
      {
        "id" : 1626504761,
        "name" : "Formula Renault 3.5",
        "class" : "Formula Renault"
      },
      {
        "id" : 1637772163,
        "name" : "Bentley Continental GT3 Endurance",
        "class" : "GT3"
      },
      {
        "id" : 1639105598,
        "name" : "Ford Escort RS1600",
        "class" : "Road G"
      },
      {
        "id" : 1682144078,
        "name" : "Aston Martin Vulcan",
        "class" : "Track Day A"
      },
      {
        "id" : 1716535504,
        "name" : "Jaguar XJR-9",
        "class" : "Group C1"
      },
      {
        "id" : 1747257697,
        "name" : "Nissan 300ZX Turbo LM",
        "class" : "GTO"
      },
      {
        "id" : 1764851930,
        "name" : "Toyota GT-86 Rocket Bunny GT4",
        "class" : "GT4"
      },
      {
        "id" : 1810453820,
        "name" : "Toyota TS040 Hybrid",
        "class" : "LMP1"
      },
      {
        "id" : 1817703058,
        "name" : "Zakspeed Ford Capri Group 5",
        "class" : "Group 5"
      },
      {
        "id" : 1818067169,
        "name" : "Dallara IR-12 Chevrolet (Speedway)",
        "class" : "Indycar"
      },
      {
        "id" : 1850232477,
        "name" : "Lamborghini Huracán LP610-4",
        "class" : "Road C"
      },
      {
        "id" : 1864701845,
        "name" : "Caterham Seven 620 R",
        "class" : "Road D"
      },
      {
        "id" : 1891730007,
        "name" : "Nissan R89C",
        "class" : "Group C1"
      },
      {
        "id" : 1898954187,
        "name" : "Marek RP 339H LMP1",
        "class" : "LMP1"
      },
      {
        "id" : 1909945073,
        "name" : "Formula A",
        "class" : "Formula A"
      },
      {
        "id" : 1934199723,
        "name" : "Audi R8 LMS",
        "class" : "GT3"
      },
      {
        "id" : 1959097924,
        "name" : "Lotus Type 98T Renault Turbo",
        "class" : "Vintage F1 A"
      },
      {
        "id" : 1965567405,
        "name" : "Ferrari LaFerrari",
        "class" : "Road A"
      },
      {
        "id" : 1972396515,
        "name" : "Porsche 911 GT3 R Endurance",
        "class" : "GT3"
      },
      {
        "id" : 1977120176,
        "name" : "Lamborghini Aventador LP700-4",
        "class" : "Road B"
      },
      {
        "id" : 1979398129,
        "name" : "Mercedes-Benz CLK-LM",
        "class" : "GT1"
      },
      {
        "id" : 2037619631,
        "name" : "Volkswagen Polo RX Supercar",
        "class" : "WRX"
      },
      {
        "id" : 2082176226,
        "name" : "Audi A1 quattro",
        "class" : "Road F"
      },
      {
        "id" : 2086246081,
        "name" : "Aston Martin Vantage GT4",
        "class" : "GT4"
      },
      {
        "id" : 2091910841,
        "name" : "Ginetta G55 GT4",
        "class" : "GT4"
      },
      {
        "id" : -2133597590,
        "name" : "Porsche 911 GT3 RS",
        "class" : "Road B"
      },
      {
        "id" : -2075284877,
        "name" : "Formula Rookie",
        "class" : "F5"
      },
      {
        "id" : -2064669470,
        "name" : "Dallara IR-12 Honda (Speedway)",
        "class" : "Indycar"
      },
      {
        "id" : -2059595338,
        "name" : "Mercedes-AMG GT R",
        "class" : "Road C"
      },
      {
        "id" : -2025231366,
        "name" : "Cadillac ATS-V.R GT3",
        "class" : "GT3"
      },
      {
        "id" : -1966060946,
        "name" : "Mazda MX-5 Radbul",
        "class" : "Drift"
      },
      {
        "id" : -1951461577,
        "name" : "Ligier JS P3",
        "class" : "LMP3"
      },
      {
        "id" : -1902340407,
        "name" : "Ferrari 288 GTO",
        "class" : "Road E"
      },
      {
        "id" : -1860886593,
        "name" : "Renault Sport R.S. 01 GT3",
        "class" : "GT3"
      },
      {
        "id" : -1856998124,
        "name" : "Renault Sport R.S. 01",
        "class" : "RS01 Trophy"
      },
      {
        "id" : -1856752594,
        "name" : "Ford GT LM GTE",
        "class" : "GTE"
      },
      {
        "id" : -1835861548,
        "name" : "Lotus Type 78 Cosworth",
        "class" : "Vintage F1 B"
      },
      {
        "id" : -1796949190,
        "name" : "Ford Escort RS1600 (Rallycross)",
        "class" : "Vintage RX"
      },
      {
        "id" : -1796028503,
        "name" : "Dallara IR-12 Honda (Road Course)",
        "class" : "Indycar"
      },
      {
        "id" : -1774335742,
        "name" : "Ford MkIV",
        "class" : "Vintage Prototype B"
      },
      {
        "id" : -1761671051,
        "name" : "Audi R8 (LMP900)",
        "class" : "LMP900"
      },
      {
        "id" : -1761080088,
        "name" : "Nissan R89C LM",
        "class" : "Group C1"
      },
      {
        "id" : -1748676965,
        "name" : "McLaren P1 ™",
        "class" : "Road A"
      },
      {
        "id" : -1728824001,
        "name" : "Ferrari F50 GT",
        "class" : "GT1"
      },
      {
        "id" : -1695434771,
        "name" : "Toyota GT-One (1998)",
        "class" : "GT1"
      },
      {
        "id" : -1617916111,
        "name" : "Pagani Zonda Cinque Roadster",
        "class" : "Road B"
      },
      {
        "id" : -1548941295,
        "name" : "Ford F-150 RTR Ultimate Funhaver",
        "class" : "Road G"
      },
      {
        "id" : -1545450182,
        "name" : "BMW M3 GT4 (E92)",
        "class" : "GT4"
      },
      {
        "id" : -1522922538,
        "name" : "Mercedes-AMG A 45 4MATIC",
        "class" : "Road E"
      },
      {
        "id" : -1488131398,
        "name" : "Jaguar XJR-9 LM",
        "class" : "Group C1"
      },
      {
        "id" : -1459535564,
        "name" : "Ferrari Enzo",
        "class" : "Road B"
      },
      {
        "id" : -1444632268,
        "name" : "Renault Mégane R.S. SMS-R Touring",
        "class" : "Touring Car"
      },
      {
        "id" : -1443190363,
        "name" : "Agajanian Watson Roadster",
        "class" : "Vintage Indycar"
      },
      {
        "id" : -1435057179,
        "name" : "Lotus Type 51",
        "class" : "Vintage F3 A"
      },
      {
        "id" : -1416203489,
        "name" : "Nissan GT-R Nismo GT3 (R35)",
        "class" : "GT3"
      },
      {
        "id" : -1411323812,
        "name" : "BMW 1 Series M Coupé StanceWorks Edition",
        "class" : "Road D"
      },
      {
        "id" : -1339322144,
        "name" : "McLaren P1 ™ GTR",
        "class" : "Track Day A"
      },
      {
        "id" : -1320616846,
        "name" : "Lotus Type 72D Cosworth",
        "class" : "Vintage F1 C"
      },
      {
        "id" : -1303813490,
        "name" : "Aston Martin DB11",
        "class" : "Road D"
      },
      {
        "id" : -1275144817,
        "name" : "Mercedes-AMG A 45 SMS-R Touring",
        "class" : "Touring Car"
      },
      {
        "id" : -1273964900,
        "name" : "Ferrari 333 SP",
        "class" : "LMP900"
      },
      {
        "id" : -1253474718,
        "name" : "Ford Sierra Cosworth RS500 Group A",
        "class" : "Group A"
      },
      {
        "id" : -1226176940,
        "name" : "BMW 1 Series M Coupé",
        "class" : "Road E"
      },
      {
        "id" : -1204688299,
        "name" : "Lotus Type 40 Ford",
        "class" : "Vintage Prototype B"
      },
      {
        "id" : -1197419789,
        "name" : "Lamborghini Diablo GTR",
        "class" : "GTO"
      },
      {
        "id" : -1187748261,
        "name" : "BMW 2002 StanceWorks Edition",
        "class" : "Vintage Touring-GT B"
      },
      {
        "id" : -1170674276,
        "name" : "Ginetta G55 GT3",
        "class" : "GT3"
      },
      {
        "id" : -1159965983,
        "name" : "Mitsubishi Lancer Evolution VI SVA",
        "class" : "Track Day A"
      },
      {
        "id" : -1068716209,
        "name" : "Ligier JS P2 Judd",
        "class" : "LMP2"
      },
      {
        "id" : -1048050877,
        "name" : "Radical RXC Turbo",
        "class" : "Road A"
      },
      {
        "id" : -1041674971,
        "name" : "Formula C",
        "class" : "Formula C"
      },
      {
        "id" : -1001664988,
        "name" : "Bentley Continental GT3 (2016)",
        "class" : "GT3"
      },
      {
        "id" : -1001569309,
        "name" : "McLaren F1 GTR Long Tail",
        "class" : "GT1"
      },
      {
        "id" : -980019072,
        "name" : "Marek RP 219D LMP2",
        "class" : "LMP2"
      },
      {
        "id" : -956881226,
        "name" : "Renault Mégane R.S. 275 Trophy-R",
        "class" : "Road F"
      },
      {
        "id" : -934098507,
        "name" : "BMW M3 Sport Evo Group A",
        "class" : "Group A"
      },
      {
        "id" : -931590477,
        "name" : "Renault Mégane Trophy V6",
        "class" : "Megane Trophy"
      },
      {
        "id" : -878083866,
        "name" : "Acura NSX GT3",
        "class" : "GT3"
      },
      {
        "id" : -782532739,
        "name" : "BMW M6 GTLM",
        "class" : "GTE"
      },
      {
        "id" : -713284494,
        "name" : "Lotus Type 25 Climax",
        "class" : "Vintage F1 D"
      },
      {
        "id" : -704151830,
        "name" : "Nissan 300ZX Turbo IMSA GTS",
        "class" : "GTO"
      },
      {
        "id" : -699643670,
        "name" : "Renault Alpine A442B",
        "class" : "Group 6"
      },
      {
        "id" : -698401632,
        "name" : "Porsche 918 Spyder Weissach",
        "class" : "Road A"
      },
      {
        "id" : -648709823,
        "name" : "Renault Clio Cup",
        "class" : "TC1"
      },
      {
        "id" : -623946728,
        "name" : "Ginetta LMP3",
        "class" : "LMP3"
      },
      {
        "id" : -615186701,
        "name" : "Ford Escort RS1600 (Racing)",
        "class" : "Vintage Touring-GT B"
      },
      {
        "id" : -579256927,
        "name" : "Olsbergs MSE RX Supercar Lite",
        "class" : "RXLites"
      },
      {
        "id" : -506272602,
        "name" : "Porsche 936 Spyder",
        "class" : "Group 6"
      },
      {
        "id" : -494100071,
        "name" : "Bentley Speed 8",
        "class" : "LMP900"
      },
      {
        "id" : -486674040,
        "name" : "Pagani Zonda Revolución",
        "class" : "Track Day A"
      },
      {
        "id" : -439539835,
        "name" : "Formula X",
        "class" : "Formula X"
      },
      {
        "id" : -387045855,
        "name" : "Jaguar XJ220 S",
        "class" : "Road B"
      },
      {
        "id" : -384044277,
        "name" : "Chevrolet Corvette C7.R",
        "class" : "GTE"
      },
      {
        "id" : -382513194,
        "name" : "Dallara IR-12 Chevrolet (Road Course)",
        "class" : "Indycar"
      },
      {
        "id" : -370668051,
        "name" : "Toyota GT-One (1999)",
        "class" : "LMP900"
      },
      {
        "id" : -343023508,
        "name" : "Nissan R390 GT1",
        "class" : "GT1"
      },
      {
        "id" : -335104961,
        "name" : "Ferrari 330 P4",
        "class" : "Vintage Prototype B"
      },
      {
        "id" : -303591806,
        "name" : "Nissan Skyline GT-R (R34) SMS-R",
        "class" : "Track Day B"
      },
      {
        "id" : -294770034,
        "name" : "Lotus Type 56",
        "class" : "Vintage Indycar"
      },
      {
        "id" : -278306106,
        "name" : "Nissan Skyline Super Silhouette",
        "class" : "Group 5"
      },
      {
        "id" : -241187148,
        "name" : "BMW M6 GT3",
        "class" : "GT3"
      },
      {
        "id" : -235751604,
        "name" : "Toyota GT-86",
        "class" : "Road G"
      },
      {
        "id" : -149617068,
        "name" : "Mitsubishi Lancer Evolution IX FQ360",
        "class" : "Road E"
      },
      {
        "id" : -98064499,
        "name" : "Oreca 03 Nissan",
        "class" : "LMP2"
      },
      {
        "id" : -93033971,
        "name" : "Lamborghini Huracán GT3",
        "class" : "GT3"
      },
      {
        "id" : -91815086,
        "name" : "Aston Martin DBR1/300",
        "class" : "Vintage Touring-GT C"
      },
      {
        "id" : -85660500,
        "name" : "Mercedes-Benz 300 SEL 6.8 AMG",
        "class" : "Vintage Touring-GT B"
      },
      {
        "id" : -78832007,
        "name" : "Mercedes-AMG C 63 Coupé S",
        "class" : "Road E"
      },
      {
        "id" : -69155277,
        "name" : "Mini Countryman RX",
        "class" : "WRX"
      },
      {
        "id" : -48442135,
        "name" : "Porsche 962C Langheck",
        "class" : "Group C1"
      },
      {
        "id" : -41807622,
        "name" : "Toyota 86",
        "class" : "Road G"
      },
      {
        "id" : -19222976,
        "name" : "Nissan GTP ZX-Turbo",
        "class" : "Group C1"
      },
      {
        "id" : -11335215,
        "name" : "Ford Mustang Cobra TransAm",
        "class" : "GTO"
      },
	
      // Added Missing Cars - Issue #118
      //////////// Motorsport Car Pack ////////////
      {
        "id" : -344750627,
        "name" : "Opel Astra TCR",
        "class" : "Touring Car"
      },
      {
        "id" : -340376700,
        "name" : "Audi V8 quattro DTM",
        "class" : "Group A"
      },
      {
        "id" : -1005942571,
        "name" : "Jaguar E-Type V12 Group44",
        "class" : "Vintage Touring-GT A"
      },
      {
        "id" : -871253931,
        "name" : "Panoz Esperante GTR1",
        "class" : "GT1"
      },

      ///////////// Japanese Cars Bonus Pack ////////////
      {
        "id" : -888134359,
        "name" : "Datsun 280ZX IMSA GTX",
        "class" : "Group 5"
      },
      {
        "id" : -448429240,
        "name" : "Honda 2&4 Concept",
        "class" : "Track Day B"
      },
      {
        "id" : 373960596,
        "name" : "Honda Civic Type-R",
        "class" : "Road F"
      },
      {
        "id" : 2136103830,
        "name" : "Nissan Skyline GT-R (BNR32) Group A",
        "class" : "Group A"
      },
      
      //////// Fun Pack DLC cars  12/2017 /////////////////////////////
      {
         "id" : 375801487,
         "name" : "Ford RS200 Evolution Group B",
         "class" : "Group B"
      },
      {
         "id" : -667842301,
         "name" : "Renault 5 Maxi Turbo",
         "class" : "Group B"
      },      
      {
         "id" : -1592901367,
         "name" : "Audi Sport quattro S1",
         "class" : "Group B"
      },
      {
         "id" : -2139807191,
         "name" : "Audi S1 EKS RX quattro",
         "class" : "WRX"
      },
      {
         "id" : -983006067,
         "name" : "Citroen DS3 RX Supercar",
         "class" : "WRX"
      },
      {
          "id" : 1830085946,
          "name" : "Ford Bronco Brocky",
          "class" : "Trophy Truck"
      },
      {
         "id" : -353748333,
         "name" : "Ford Mustang RTR Spec - 5D",
         "class" : "Drift"
      },
      {
         "id" : -373393516,
         "name" : "Ford Mustang '66 RTR TransAm",
         "class" : "Vintage Touring-GT A"
      },
	
      //////// Porsche Legends Pack DLC cars  03/2018 ////////////////////////
      {
         "id" : 1218201782,
         "name" : "Porsche 908/03 Spyder",
         "class" : "Vintage Prototype B"
      },
      {
         "id" : -1835136516,
         "name" : "Porsche 917K",
         "class" : "Vintage Prototype A"
      },
      {
         "id" : -1523189681,
         "name" : "Porsche 917/10",
         "class" : "CanAm"
      },
      {
         "id" : -807187208,
         "name" : "Porsche 911 Carrera RSR 2.8",
         "class" : "Vintage Touring-GT A"
      },
      {
         "id" : -1270234648,
         "name" : "Porsche 935/78",
         "class" : "Group 5"
      },
      {
         "id" : -424432241,
         "name" : "Porsche 935/78-81",
         "class" : "Group 5"
      },
      {
         "id" : -1268030897,
         "name" : "Porsche 959 S",
         "class" : "Road E"
      },
      {
         "id" : -1470867259,
         "name" : "Porsche Carrera GT",
         "class" : "Road C"
      },
      {
         "id" : -1295853198,
         "name" : "Porsche 911 RSR",
         "class" : "GTE"
      },
	
      //////// Patch 5 - Ferrari Challenge ////////////////////////
      {
        "id" : 1471547500,
        "name" : "Ferrari 488 Challenge (EU)",
        "class" : "Ferrari Series"
      },
      {
        "id" : 345014385,
        "name" : "Ferrari 488 Challenge (NA)",
        "class" : "Ferrari Series"
      },
      {
        "id" : 754463374,
        "name" : "Ferrari 488 Challenge (APAC)",
        "class" : "Ferrari Series"
      },
      ////////Patch 6 - Spirit of Le Mans ////////////////////////
      {
        "id" : -1218483247,
        "name" : "Porsche 919 Hybrid",
        "class" : "LMP1 2016"
      },
      {
          "id" : 1083119012,
          "name" : "Toyota TS050 Hybrid",
          "class" : "LMP1 2016"
      },
      {
          "id" : -1206681923,
          "name" : "Audi R18 (Fuji 2016)",
          "class" : "LMP1 2016"
      },
      {
          "id" : -240743205,
          "name" : "Audi R18 (Le Mans 2016)",
          "class" : "LMP1 2016"
      },
      {
          "id" : -640190447,
          "name" : "Ferrari 512 S",
          "class" : "Vintage Prototype A"
      },
      {
          "id" : -1831147854,
          "name" : "Ferrari 512 M",
          "class" : "Vintage Prototype A"
      },
      {
          "id" : -1529264129,
          "name" : "Porsche 917 LH",
          "class" : "Vintage Prototype A"
      },
      {
          "id" : -211582477,
          "name" : "Porsche 924 Carrera GTP",
          "class" : "Group 4"
      },
      {
          "id" : -327947155,
          "name" : "Porsche 961",
          "class" : "GTO"
      },
      ////////Patch 7 - Ferrari Essentials Pack ///////////
      {
        "id" : -405013350,
        "name" : "Ferrari 250 GT Berlinetta",
        "class" : "Vintage Touring-GT C"
      },
      {
        "id" : -752781428,
        "name" : "Ferrari 250 Testa Rossa",
        "class" : "Vintage Touring-GT C"
      },
	        {
        "id" : 2006190056,
        "name" : "Ferrari 458 Speciale A",
        "class" : "Road B"
      },
      {
        "id" : 1317086096,
        "name" : "Ferrari 512 BB LM",
        "class" : "Group 4"
      },
      {
        "id" : -505616410,
        "name" : "Ferrari F12tdf",
        "class" : "Road A"
      },
      {
        "id" : -1720596633,
        "name" : "Ferrari F355 Challenge",
        "class" : "Ferrari F355 Series"
      },
      {
        "id" : -1967832633,
        "name" : "Ferrari F40",
        "class" : "Road D"
      },
      {
        "id" : 220908396,
        "name" : "Ferrari FXX K",
        "class" : "Track Day A"
      }, 
];

this.aVehicleInfoExt['AMS2']  =       [];
this.aVehicleInfoExt['AMS2']  =       [
	{
		"id" : -950775810,
		"name" : "Caterham Academy",
		"class" : "Cat_Academy"
	},
	{
		"id" : 1864701845,
		"name" : "Caterham 620R",
		"class" : "Cat620R"
	},
	{
		"id" : -1660644383,
		"name" : "Caterham Superlight",
		"class" : "Cat_Superlight"
	},
	{
		"id" : 851522805,
		"name" : "Caterham Supersport",
		"class" : "Cat_Supersport"
	},
	{
		"id" : 428770333,
		"name" : "F301",
		"class" : "F-3"
	},
	{
		"id" : 302183120,
		"name" : "F309",
		"class" : "F-3"
	},
	{
		"id" : 697161929,
		"name" : "Formula Classic Gen1 Model 1",
		"class" : "F-Classic_Gen1"
	},
	{
		"id" : -1819510420,
		"name" : "Formula Classic Gen1 Model 2",
		"class" : "F-Classic_Gen1"
	},
	{
		"id" : -1667467124,
		"name" : "Formula Classic Gen2 Model 1",
		"class" : "F-Classic_Gen2"
	},
	{
		"id" : -1004811218,
		"name" : "Formula Classic Gen2 Model 2",
		"class" : "F-Classic_Gen2"
	},
	{
		"id" : -494068343,
		"name" : "Formula Classic Gen2 Model 3",
		"class" : "F-Classic_Gen2"
	},
	{
		"id" : -1700189536,
		"name" : "Formula Classic Gen3 Model 1",
		"class" : "F-Classic_Gen3"
	},
	{
		"id" : -1662617552,
		"name" : "Formula Classic Gen3 Model 2",
		"class" : "F-Classic_Gen3"
	},
	{
		"id" : -1828044943,
		"name" : "Formula Classic Gen3 Model 3",
		"class" : "F-Classic_Gen3"
	},
	{
		"id" : -1261768631,
		"name" : "Formula Vintage G1M1",
		"class" : "F-Vintage_Gen1"
	},
	{
		"id" : 318400650,
		"name" : "Formula Vintage G1M2",
		"class" : "F-Vintage_Gen1"
	},
	{
		"id" : -1988395354,
		"name" : "Formula Vintage G2M1",
		"class" : "F-Vintage_Gen2"
	},
	{
		"id" : 617290135,
		"name" : "Formula Vintage G2M2",
		"class" : "F-Vintage_Gen2"
	},
	{
		"id" : -2140090167,
		"name" : "Formula Vee",
		"class" : "F-Vee"
	},
	{
		"id" : -186413128,
		"name" : "Formula Vee Fin",
		"class" : "F-Vee"
	},
	{
		"id" : 575788923,
		"name" : "Formula Trainer",
		"class" : "F-Trainer"
	},
	{
		"id" : 1982976051,
		"name" : "Formula Trainer Advanced",
		"class" : "F-Trainer_A"
	},
	{
		"id" : 1948072701,
		"name" : "Formula Reiza",
		"class" : "F-Reiza"
	},
	{
		"id" : -1142039519,
		"name" : "Formula Ultimate 2019",
		"class" : "F-Ultimate"
	},
	{
		"id" : 523915852,
		"name" : "Formula V10",
		"class" : "F-V10_Gen2"
	},
	{
		"id" : -2053858829,
		"name" : "Formula V12",
		"class" : "F-V12"
	},
	{
		"id" : -487937394,
		"name" : "Iveco Stralis",
		"class" : "CopaTruck"
	},
	{
		"id" : -819133010,
		"name" : "MAN",
		"class" : "CopaTruck"
	},
	{
		"id" : 1647822272,
		"name" : "Mercedes-Benz",
		"class" : "CopaTruck"
	},
	{
		"id" : -2086797102,
		"name" : "VW",
		"class" : "CopaTruck"
	},
	{
		"id" : 844159614,
		"name" : "Kart 125cc 2STROKE",
		"class" : "Kart125cc"
	},
	{
		"id" : -2116593279,
		"name" : "Kart GX390 Rental",
		"class" : "KartRental"
	},
	{
		"id" : 374810616,
		"name" : "Kart GX390 Race",
		"class" : "KartGX390"
	},
	{
		"id" : -739789710,
		"name" : "Kart 125cc Shifter",
		"class" : "KartShifter"
	},
	{
		"id" : 95104745,
		"name" : "MCR S2000",
		"class" : "P4"
	},
	{
		"id" : 1932261404,
		"name" : "MetalMoro AJR Chevy V8",
		"class" : "P1"
	},
	{
		"id" : -1236687924,
		"name" : "MetalMoro AJR Honda",
		"class" : "P1"
	},
	{
		"id" : -1745773963,
		"name" : "MetalMoro AJR Judd",
		"class" : "P1"
	},
	{
		"id" : 1618401665,
		"name" : "MetalMoro AJR V6 Turbo",
		"class" : "P1"
	},
	{
		"id" : -50694644,
		"name" : "Mitsubishi Lancer R",
		"class" : "LancerCup"
	},
	{
		"id" : 213908738,
		"name" : "Mitsubishi Lancer RS",
		"class" : "LancerCup"
	},
	{
		"id" : -1404228714,
		"name" : "Sprint Race",
		"class" : "SprintRace"
	},
	{
		"id" : 253111186,
		"name" : "Super V8",
		"class" : "SuperV8"
	},
	{
		"id" : 1323381033,
		"name" : "Stock Car Brasil",
		"class" : "StockCarV8"
	},
	{
		"id" : 306371028,
		"name" : "Superkart 250cc (PF=Yes)",
		"class" : "SuperKart"
	},
	{
		"id" : 1560162507,
		"name" : "Ultima GTR",
		"class" : "Street"
	},
	{
		"id" : 306785397,
		"name" : "Ultima GTR Race",
		"class" : "GTOpen"
	},
	{
		"id" : 703591920,
		"name" : "MetalMoro MRX Duratec Turbo P2",
		"class" : "P2"
	},
	{
		"id" : 65202613,
		"name" : "MetalMoro MRX Honda P3",
		"class" : "P3"
	},
	{
		"id" : -181636428,
		"name" : "MetalMoro MRX Duratec P4",
		"class" : "P4"
	},
	{
		"id" : -1834081784,
		"name" : "MetalMoro MRX Duratec Turbo P3",
		"class" : "P3"
	},
	{
		"id" : 802736208,
		"name" : "Roco 001",
		"class" : "P3"
	},
	{
		"id" : -1870819346,
		"name" : "Sigma P1",
		"class" : "P2"
	},
	{
		"id" : 245459304,
		"name" : "Opala Stock Cars 1986",
		"class" : "Opala86"
	},
	{
		"id" : -62148492,
		"name" : "Opala OldStock",
		"class" : "OldStock"
	},
	{
		"id" : -609305506,
		"name" : "Puma GTB",
		"class" : "CopaClassicFL"
	},
	{
		"id" : 1031807465,
		"name" : "Puma GTE",
		"class" : "CopaClassicB"
	},
	{
		"id" : -93205368,
		"name" : "Puma P052",
		"class" : "GT5"
	},
	{
		"id" : -1155860123,
		"name" : "Chevette",
		"class" : "CopaClassicB"
	},
	{
		"id" : 1775576087,
		"name" : "Copa Fusca",
		"class" : "CopaFusca"
	},
	{
		"id" : -815324367,
		"name" : "Fusca CA",
		"class" : "CopaClassicFL"
	},
	{
		"id" : -844211966,
		"name" : "Copa Uno",
		"class" : "CopaUno"
	},
	{
		"id" : 311092313,
		"name" : "Uno Classic B",
		"class" : "CopaClassicB"
	},
	{
		"id" : -45848101,
		"name" : "Copa Classic A",
		"class" : "CopaClassicFL"
	},
	{
		"id" : -333355648,
		"name" : "Copa Classic B",
		"class" : "CopaClassicB"
	},
	{
		"id" : 1661024873,
		"name" : "Pas Classic A",
		"class" : "CopaClassicFL"
	},
	{
		"id" : 1700425966,
		"name" : "Pas Classic B",
		"class" : "CopaClassicB"
	},
	{
		"id" : -1086802614,
		"name" : "Fusca HC1",
		"class" : "Hot Cars"
	},
	{
		"id" : 150641251,
		"name" : "Fusca HC2",
		"class" : "Hot Cars"
	},
	{
		"id" : 390318757,
		"name" : "Pas HotCars",
		"class" : "Hot Cars"
	},
	{
		"id" : 1653755268,
		"name" : "Col HC",
		"class" : "Hot Cars"
	},
	{
		"id" : 1785300635,
		"name" : "ARC Camaro",
		"class" : "ARC_Cam"
	},
	{
		"id" : -1201567586,
		"name" : "Opala 79",
		"class" : "Opala79"
	},
	{
		"id" : 979672157,
		"name" : "Copa Montana",
		"class" : "Montana"
	},
	{
		"id" : -2123166417,
		"name" : "Camaro SS",
		"class" : "Street"
	},
	{
		"id" : -1025098540,
		"name" : "Brabham BT44",
		"class" : "F-Retro"
	},
	{
		"id" : -532210519,
		"name" : "Formula Retro V12",
		"class" : "F-Retro"
	},
	{
		"id" : 1437730287,
		"name" : "Formula Retro V8",
		"class" : "F-Retro"
	},
	{
		"id" : 435621847,
		"name" : "Lotus Type 72E",
		"class" : "F-Retro"
	},
	{
		"id" : 553963368,
		"name" : "McLaren M23",
		"class" : "F-Retro"
	},
	{
		"id" : 2091910841,
		"name" : "Ginetta G55 GT4 Supercup",
		"class" : "G55Supercup"
	},
	{
		"id" : 1433352906,
		"name" : "Ginetta G58",
		"class" : "P1"
	},
	{
		"id" : 1836524676,
		"name" : "Stock Car 2020",
		"class" : "StockCarV8_2020"
	},
	{
		"id" : 619110280,
		"name" : "Stock Car Corolla",
		"class" : "StockCarV8_2020"
	},
	{
		"id" : 884102371,
		"name" : "Formula V10 G1",
		"class" : "F-V10_Gen1"
	}
];

}// end load vehicle data

////////////////////
PCARSVEHICLELIST.prototype._generateVehicleData=_generateVehicleData;
PCARSVEHICLELIST.prototype._generateDataMapping=_generateDataMapping;
PCARSVEHICLELIST.prototype._validateVehicleData=_validateVehicleData;
PCARSVEHICLELIST.prototype.getVehicleClasses=getVehicleClasses;
PCARSVEHICLELIST.prototype.getVehicleList=getVehicleList;
PCARSVEHICLELIST.prototype.getVehicleClassByName=getVehicleClassByName;
PCARSVEHICLELIST.prototype.getClassNormalizedByString=getClassNormalizedByString;
PCARSVEHICLELIST.prototype.getVehicleList=getVehicleList;
PCARSVEHICLELIST.prototype.loadVehicleData=loadVehicleData;
PCARSVEHICLELIST.prototype.getNameToClassMapping=getNameToClassMapping;
PCARSVEHICLELIST.prototype.getIdToNameMapping=getIdToNameMapping;
PCARSVEHICLELIST.prototype.VehicleIdToName=VehicleIdToName;
PCARSVEHICLELIST.prototype.getIdToClassMapping=getIdToClassMapping;





