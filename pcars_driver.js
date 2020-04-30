// CLASS of an pCars Driver
function PCARSdriver(RefID,Name,IsPlayer,GridPosition,PosX,PosY,PosZ,State,CurrentSector, RacePosition, FLapTime, LLapTime, S1Time, S2Time, S3Time, Orient, Spd,CurrentLap, VehicleId, LiveryId, NumPits, Gap2Ahead, Gap2First,VehicleName, VehicleClassName, oIdx){
	
        // vars
		this.RefID				=	RefID;
		this.Name      			=	Name;
        this.IsPlayer  			= 	IsPlayer;
        this.GridPosition   	=	GridPosition;
        this.PosX      			=	PosX;
        this.PosY      			=	PosY;
        this.PosZ      			=	PosZ;
        this.State     			=	State;
        this.CurrentSector 		=	CurrentSector;
        this.RacePosition  		=	RacePosition;
        this.FastestLapTime		=	FLapTime;
        this.LastLapTime   		=	LLapTime;
		this.S1Time				=	S1Time;
		this.S2Time				=	S2Time;
		this.S3Time				=	S3Time;
        this.Orientation		=	Orient;
        this.Speed	   			=	Spd;
        this.CurrentLap			=	CurrentLap;
        this.VehicleId			=	VehicleId;
		this.LiveryId			=	LiveryId;
        this.NumPits			=	(typeof(NumPits) !== 'undefined') ? NumPits : undefined;	//number of the current pits, only used within demo mode to keep consitency while a fast forward etc
		this.Gap2Ahead			=	(typeof(Gap2Ahead) !== 'undefined') ? Gap2Ahead : undefined;
		this.Gap2First			=	(typeof(Gap2First) !== 'undefined') ? Gap2First : undefined;
        
        //this.VehicleName		=	"";				// will filled by IDtoName mapping
        //this.VehicleClassName 	=   'undefined';  // will be set in index.html because this information is not available within all API modes

		this.VehicleName		=	(typeof(VehicleName) !== 'undefined') ? VehicleName : "";
		this.VehicleClassName	=	(typeof(VehicleClassName) !== 'undefined') ? VehicleClassName : 'undefined';

		this.oIdx				=	(typeof(oIdx) !== 'undefined') ? oIdx : 0;	// original index within game API

        //private vars
        var privateLat;
        var privateLong;
//TODO: extend Regex for each special character that could accour in driver/vehicle names        
        this._normalizeRegEx	=	"/\s|\.|\(|\)/g";
}

function CalcGPSCoordinates(){
                //do some magic from Manu
                //this.privateLat       =
                //this.privatLong       =
}

function GetName(){
	return this.Name;
}

function GetUniqueId(oIdx, Name){
	oIdx = (typeof(oIdx) !== 'undefined') ? oIdx : this.oIdx;
	Name = (typeof(Name) !== 'undefined') ? Name : this.Name;
	//old recordings still working, because the receive function has no problem if the value is missing in the recorded data and interprets it as undefined which is converted to 0 by the PCARSDriver class.
	//if (this.oIdx){	// this check is not working, because this.oIdx can have the value 0 and then it is interpreted as false. 0 is the default for undefined oIdx, but also the first element index of a valid array.
		return oIdx + Name;
	//}
	//return "" + this.Name;
}

function buildDriverLabel(drivername , raceposition){
	// Diego Xavier on race position 5 => "5-Diego Xavier"
	//return raceposition + " - " + drivername;
	return this.GetRacePosition() + " - " + this.GetName();
}

function GetIsPlayer(){
	return this.IsPlayer;
}

function GetRefID(){
	return this.RefID;
}

function GetPosX(){
        return this.PosX;
}

function GetPosY(){
        return this.PosY;
}

function GetPosZ(){
        return this.PosZ;
}

function GetState(){
        return this.State;
}

function GetCurrentSector(){
        return this.CurrentSector;
}

function GetRacePosition(){
        return this.RacePosition;
}

function GetFastestLapTime(){
        return this.FastestLapTime;
}

function GetLastLapTime(){
        return this.LastLapTime;
}

function GetS1Time(){
        return this.S1Time;
}

function GetS2Time(){
        return this.S2Time;
}

function GetS3Time(){
        return this.S3Time;
}

function GetOrientation(){
        return this.Orientation;
}

function GetSpeed(){
	//todo: convert in km/h
	return this.Speed;
}

function GetLiveryId(){
        return this.LiveryId;
}

function GetPosColor(){
	
	if (this.RacePosition == 1){
		return green;
	}else{
		return red;
	}
}

function SetExampleData() {
		// set default parameter for a dummy object
		this.RefID			=	9234567;
        this.Name			=	"NO_PARTICIPANT";
        this.IsPlayer		=	0;
        this.GridPosition	=	3;
        this.PosX			=	271;
        this.PosY			=	277;
        this.PosZ			=	288;
        this.State			=	"StateTest";
        this.CurrentSector	=   0;
        this.RacePosition	=   0;
        this.FastestLapTime	=   9000;
        this.LastLapTime	=   9999;
	this.S1Time		=   10;
	this.S2Time             =   20;
	this.S3Time             =   30;
        this.Orientation	=   0;
        this.Speed			=   100;
        this.VehicleId		=	9999999999;
	this.LiveryId		=	0;
        this.CurrentLap		=	99;
        this.VehicleClassName 	=   'undefined';
        this.NumPits		=	undefined;
	this.Gap2Ahead		=	undefined;
	this.Gap2First          =       undefined;
        
	return 1;
}


// obj.UpdateObjectData({Name: "NewName", GridPosition: "4", ...})
function UpdateObjectData( options ){
	
	for ( var elem in options ){
		//if(log >= 3){console.log('------- TEST PCARSd: insert element: ', elem  );}
		this[elem] = options[elem];		
	}
	
	return 1;
}

function setVehicleClassNameByMapping(mappingID, mappingName){
	
	//if(log >= 3){console.log("+++++++++ setVehicleClassNameByMapping()  this ", this);}	
	//if(log >= 3){console.log("+++++++++ setVehicleClassNameByMapping()  mappingID: ", mappingID);}
	//if(log >= 3){console.log("+++++++++ setVehicleClassNameByMapping()   mappingName: ",  mappingName);}
	
	// in CREST modes the vehicle class comes from the SharedMemory and a mapping to our own data is not needed
	// use the mapping only if the vehicle class is still undefined
	if(this.VehicleClassName == 'undefined'){
		//set VehicleClass by mapping information; if no match it is undefined
		if (mappingID['' + this.VehicleId]){
			this.VehicleClassName = mappingID['' + this.VehicleId];
		}else if (mappingName['' + this.VehicleName]){
			this.VehicleClassName = mappingName['' + this.VehicleName];
		}else{
			//if this.VehicleId was not converted to VehicleName
			this.VehicleClassName = "not defined";
		}
	}
}

function GetCSSTextClass() {
	var css = "driverlabel";
	
	return css;
}


function GetCSSGridClass(){	
	return	" CSS_VehicleClass_" + this.getVehicleClassNormalized() + " CSS_VehicleName_" + this.getVehicleNameNormalized();
}

function GetCSSCircleClass(){
	
	//Example: CSS_RacePos_1
	var css = "CSS_RacePos_" + this.RacePosition;
	
	//add css name of vehicle class
	css +=	" CSS_VehicleClass_" + this.getVehicleClassNormalized();	
	
	//color same vehicle names
	css +=	" CSS_VehicleName_" + this.getVehicleNameNormalized();
	
	//color same vehicle names
	css +=	" CSS_DriverName_" + this.getDriverNameNormalized();
	
	//decision if real player or ai
	if (this.IsPlayer == 1) {
		css += " CSS_IsHumanPlayer";
	}else{
		css += " CSS_IsAiPlayer";
	}
		
	//return a string of CSS classes
	return css;
}

function _normalizeString( str ){
	
	return str.replace( /\s|\.|\(|\)/g, "_" );
}

function getDriverNameNormalized(){	
	return _normalizeString(this.Name);
}

function getVehicleNameNormalized(){	
	//TODO: If this.VehicleId is an negativeID it should be also converted to a valid string
	if (typeof this.VehicleName === 'string'){
		return _normalizeString(this.VehicleName);
	}	
	return this.VehicleId;	
}

function getVehicleClassNormalized(){		
	return _normalizeString(this.VehicleClassName);
}

function getVehicleClassName(){	
	return this.VehicleClassName;
}

/*
 * @param {number} optional, 
 * @return {number} returns current number of pitstops
 */
function getNumPits(numberpitstops){
	
	//in each case return the current value
	//if parameter is given, it works as a set-function
	if(numberpitstops){
		//set new value
		this.NumPits	=	numberpitstops;	
	}
	
	return this.NumPits;
}

function getGap2Ahead(){
        return this.Gap2Ahead;
}

function getGap2First(){
        return this.Gap2First;
}


PCARSdriver.CalcGPSCoordinates=CalcGPSCoordinates;
PCARSdriver.prototype.GetRefID=GetRefID;
PCARSdriver.prototype.GetName=GetName;
PCARSdriver.prototype.GetUniqueId=GetUniqueId;
PCARSdriver.prototype.buildDriverLabel=buildDriverLabel;
PCARSdriver.prototype.GetIsPlayer=GetIsPlayer;
PCARSdriver.prototype.GetPosX=GetPosX;
PCARSdriver.prototype.GetPosY=GetPosY;
PCARSdriver.prototype.GetPosZ=GetPosZ;
PCARSdriver.prototype.GetState=GetState;
PCARSdriver.prototype.GetCurrentSector=GetCurrentSector;
PCARSdriver.prototype.GetRacePosition=GetRacePosition;
PCARSdriver.prototype.GetFastestLapTime=GetFastestLapTime;
PCARSdriver.prototype.GetLastLapTime=GetLastLapTime;
PCARSdriver.prototype.GetS1Time=GetS1Time;
PCARSdriver.prototype.GetS2Time=GetS2Time;
PCARSdriver.prototype.GetS3Time=GetS3Time;
PCARSdriver.prototype.GetOrientation=GetOrientation;
PCARSdriver.prototype.GetSpeed=GetSpeed;
PCARSdriver.prototype.GetPosColor=GetPosColor;
PCARSdriver.prototype.SetExampleData=SetExampleData;
PCARSdriver.prototype.setVehicleClassNameByMapping=setVehicleClassNameByMapping;
PCARSdriver.prototype.GetCSSTextClass=GetCSSTextClass;
PCARSdriver.prototype.GetCSSGridClass=GetCSSGridClass;
PCARSdriver.prototype.GetCSSCircleClass=GetCSSCircleClass;
PCARSdriver.prototype.getDriverNameNormalized=getDriverNameNormalized;
PCARSdriver.prototype.getVehicleNameNormalized=getVehicleNameNormalized;
PCARSdriver.prototype.getVehicleClassNormalized=getVehicleClassNormalized;
PCARSdriver.prototype.getVehicleClassName=getVehicleClassName;
PCARSdriver.prototype.getNumPits=getNumPits;
PCARSdriver.prototype._normalizeString=_normalizeString;
PCARSdriver.prototype.UpdateObjectData=UpdateObjectData;
PCARSdriver.prototype.GetLiveryId=GetLiveryId;
PCARSdriver.prototype.getGap2Ahead=getGap2Ahead;
PCARSdriver.prototype.getGap2First=getGap2First;
