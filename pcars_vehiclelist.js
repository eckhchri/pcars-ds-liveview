// CLASS of an pCars vehicle
function PCARSVEHICLELIST() {
        // vars
        //this.name							=	"";
        this.idToNameMapping				=	{};			//mapping between vehicleid and name
        this.idToClassMapping				=	{};			//mapping between vehicleid and class
        this.idToClassMappingNormalized		=	{};			//mapping between vehicleid and class
        this.NameToClassMappingNormalized	=	{};			//mapping between VehicleName and VehicleNameNormalized
        this.aVehicleList					=	[]; 		//array of pcars_vehicle objects
        this.DataAvaiavle					=	0;			// to check if data was set
                
        this.setVehicleData(aVehicleInfo);					//init static mappings, also without using DS input
        
        return this;
}

//fill the object with data
function setVehicleData(aVL){
	
	l 	= 	aVL.length; 				// length of the vehicle list
	l2	=	this.aVehicleList.length;	// length of the current vehicle list
	
	for (i = 0; i < l; i++) {					
		this.aVehicleList[l2] =  new  PCARSVEHICLE(
										aVL[i].id, 
										aVL[i].name, 
										aVL[i].class); 
		l2++;						
		
		//create mappings for faster access in futher scenarios
		this.idToNameMapping[aVL[i].id] 					=	aVL[i].name;
		this.idToClassMapping[aVL[i].id] 					=	aVL[i].class;
		this.idToClassMappingNormalized[aVL[i].id]			=	_ClassNormalization( aVL[i].class );
		this.NameToClassMappingNormalized[aVL[i].name]		=	_ClassNormalization( aVL[i].class );						
	}	
		
	this.DataAvaiavle = 1;
	
	return 1;
}

function _ClassNormalization(str){
	return str.replace(/ /g, '_');;
}

function getVehicleList(){
	return this.aVehicleList;
}

function compareAPIListwithCSV(){
	
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

/////////////////////////////// static mapping ////////////////////

var aVehicleInfo = [
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




////////////////////
PCARSVEHICLELIST.prototype.setVehicleData=setVehicleData;
PCARSVEHICLELIST.prototype.getVehicleClasses=getVehicleClasses;
PCARSVEHICLELIST.prototype.getVehicleList=getVehicleList;
PCARSVEHICLELIST.prototype.getVehicleClassByName=getVehicleClassByName;




