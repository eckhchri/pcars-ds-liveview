// CLASS of an pCars Driver
function PCARSdriver(RefID,Name,IsPlayer,GridPosition,PosX,PosY,PosZ,State,CurrentSector, RacePosition, FLapTime, LLapTime, Orient, Spd,CurrentLap, VehicleId/*, variousParameters*/)
{
        // vars
        this.RefID				=	RefID;
        this.Name      			=	Name;
        this.IsPlayer  			= 	IsPlayer;
        this.GridPosition   	=	GridPosition;
        this.PosX      			=	PosX;
        this.PosY      			=	PosY;
        this.PosZ      			=	PosZ;
        this.State     			=	State;
        this.CurrentSector 		=   CurrentSector;
        this.RacePosition  		=   RacePosition;
        this.FastestLapTime		=   FLapTime;
        this.LastLapTime   		=   LLapTime;
        this.Orientation   		=   Orient;
        this.Speed	   			=   Spd;
        this.CurrentLap			=	CurrentLap;
        this.VehicleId			=	VehicleId;	
        this.VehicleClassName 	=   'undefined';  // will be set in index.html because this information is not available within all API modes

        //private vars
        var privateLat;
        var privateLong;      
}

function CalcGPSCoordinates(){
                //do some magic from Manu
                //this.privateLat       =
                //this.privatLong       =
}

function GetName(){
	return this.Name;
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

function GetOrientation(){
        return this.Orientation;
}

function GetSpeed(){
	//todo: convert in km/h
	return this.Speed;
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
        this.Name			=	"NO_PARTICIPANT_TestData";
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
        this.Orientation	=   0;
        this.Speed			=   100;
        this.VehicleId		=	-886212684;
        this.CurrentLap		=	99;
        this.VehicleClassName 	=   'undefined';
        //this.variousParameters = {TrackId: 9999999999};
        
	return 1;
}

function setVehicleClassNameByMapping(mapping){
	
	//set VehicleClass by mapping information; if no math it is undefined
	if (mapping){
		this.VehicleClassName = mapping['' + this.VehicleId];
	}
		
	return this.VehicleClassName;
}

function GetCSSTextClass() {
	//TODO:  var css = "marker markertext"; -> marker needed for hiding text
	var css = "driverlabel";
	
	return css;
}

function GetCSSCircleClass(){
	
	//Example: CSS_RacePos_1
	var css = "CSS_RacePos_" + this.RacePosition;
	
	//add css name of vehicle class
	css +=	" CSS_VehicleClass_" + this.VehicleClassName;	
	
	//color same vehicle names
	css +=	" CSS_VehicleName_" + this.getVehicleNameNormalized();
	
	//decision if real player or ai
	if (this.IsPlayer == 1) {
		css += " CSS_IsRealPlayer";
	}else{
		css += " CSS_IsAiPlayer";
	}
		
	//return a string of CSS classes
	return css;
}

//
function getVehicleNameNormalized(){
	
	//TODO: If this.VehicleId is an negativeID it should be also converted	
	return this.VehicleId.replace(/ /g, '_');
}

PCARSdriver.CalcGPSCoordinates=CalcGPSCoordinates;
PCARSdriver.prototype.GetRefID=GetRefID;
PCARSdriver.prototype.GetName=GetName;
PCARSdriver.prototype.GetIsPlayer=GetIsPlayer;
PCARSdriver.prototype.GetPosX=GetPosX;
PCARSdriver.prototype.GetPosY=GetPosY;
PCARSdriver.prototype.GetPosZ=GetPosZ;
PCARSdriver.prototype.GetState=GetState;
PCARSdriver.prototype.GetCurrentSector=GetCurrentSector;
PCARSdriver.prototype.GetRacePosition=GetRacePosition;
PCARSdriver.prototype.GetOrientation=GetOrientation;
PCARSdriver.prototype.GetSpeed=GetSpeed;
PCARSdriver.prototype.GetPosColor=GetPosColor;
PCARSdriver.prototype.SetExampleData=SetExampleData;
PCARSdriver.prototype.setVehicleClassNameByMapping=setVehicleClassNameByMapping;
PCARSdriver.prototype.GetCSSTextClass=GetCSSTextClass;
PCARSdriver.prototype.GetCSSCircleClass=GetCSSCircleClass;
PCARSdriver.prototype.getVehicleNameNormalized=getVehicleNameNormalized;


