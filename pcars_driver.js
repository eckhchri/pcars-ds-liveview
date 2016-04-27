// CLASS of an pCars Driver
function PCARSdriver(RefID,Name,IsPlayer,GridPosition,PosX,PosY,PosZ,State,CurrentSector, RacePosition, FLapTime, LLapTime, Orient, Spd,CurrentLap, VehicleId/*, variousParameters*/)
{

		//CurrentSector has to be mapped
		// API Sector 	- Real Sector
		// 	3 			- 	1
		// 	1 			- 	2
		// 	2 			- 	3
		//	0			-	0
		//this.aSectormapping = {};
		this.aSectormapping = {
					"3": '1',
					"1": '2',
					"2": '3',
					"0": '0'
		};

	
        // vars
        this.RefID			=	RefID;
        this.Name      		=	Name;
        this.IsPlayer  		= 	IsPlayer;
        this.GridPosition   =	GridPosition;
        this.PosX      		=	PosX;
        this.PosY      		=	PosY;
        this.PosZ      		=	PosZ;
        this.State     		=	State;
        this.CurrentSector 	=   this.aSectormapping[ CurrentSector ];
        this.RacePosition  	=   RacePosition;
        this.FastestLapTime	=   FLapTime;
        this.LastLapTime   	=   LLapTime;
        this.Orientation   	=   Orient;
        this.Speed	   		=   Spd;
        this.CurrentLap		=	CurrentLap;
        this.VehicleId		=	VehicleId;		
        //this.variousParameters = variousParameters;

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

/* disabled, because ConvertLaptimeInReadbaleFormat function moved to index.html
function GetFastestLapTime(a){
	
	if (a == undefined){
		// return format 00:00:00
		return _ConvertLaptimeInReadbaleFormat(this.FastestLapTime);
	}else{
		return _ConvertLaptimeInReadbaleFormat(a);
	}
}

function GetLastLapTime(a){
	if (a == undefined){
		//convert in readable time mm:ss::ms
	        return _ConvertLaptimeInReadbaleFormat( this.LastLapTime);
	}else{
                return _ConvertLaptimeInReadbaleFormat(a);
        }

}*/

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
/*function GetVariousParameter(parameter)
{
	//console.log("variousParameters: ", this.variousParameters + " --- parameter: " + parameter);
	return this.variousParameters[parameter];
}*/

function SetExampleData()
{
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
        //this.variousParameters = {TrackId: 9999999999};
        

	return 1;
}

/* disabled, because ConvertLaptimeInReadbaleFormat moved to index.html
/// help function
function _ConvertLaptimeInReadbaleFormat(milliseconds)
{
	//todo: implemet date format with leading zeros for seconds and milliseconds
	//var date = new Date(milliseconds);
	var str = '';
  //    str += date.getUTCDate()-1 + " ";		//days
  //    str += date.getUTCHours() + ":";		//hours
        //str += date.getUTCMinutes() + ":";		//minutes
        //str += date.getUTCSeconds() + ":";		//seconds
        //str += date.getUTCMilliseconds();		//miliseconds
 //     console.log("Time Formated string:" + str);

	var ms = parseInt((milliseconds%1000))
        , s = parseInt((milliseconds/1000)%60)
        , m = parseInt((milliseconds/(1000*60))%60);

        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        ms = (ms < 10) ? "00" + ms : ms;
        ms = (ms > 9 && ms < 100) ? "0" + ms : ms;

        str = m + ":" + s + "." + ms;

	return str;
}*/

function GetCSSTextClass()
{
	var css = "marker markertext";
	
	return css;
}

function GetCSSCircleClass(aVehicleidToClass)
{
	
	//Example: CSS_RacePos_1
	var css = "CSS_RacePos_" + this.RacePosition;
	
	// todo:  add dynamic vehicle Class mapping
	if (aVehicleidToClass){
		css +=	" CSS_Vehicle_" + aVehicleidToClass['' + this.VehicleId];
	}
	
	//decision if real player or ai
	if (this.IsPlayer == 1)
	{
		css += " CSS_IsRealPlayer";
	}else{
		css += " CSS_IsAiPlayer";
	}
	
	//return a string of CSS classes
	return css;
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
//PCARSdriver.prototype.GetFastestLapTime=GetFastestLapTime;
//PCARSdriver.prototype.GetLastLapTime=GetLastLapTime;
PCARSdriver.prototype.GetOrientation=GetOrientation;
PCARSdriver.prototype.GetSpeed=GetSpeed;
PCARSdriver.prototype.GetPosColor=GetPosColor;
//PCARSdriver.prototype.GetVariousParameter=GetVariousParameter;
PCARSdriver.prototype.SetExampleData=SetExampleData;
PCARSdriver.prototype.GetCSSTextClass=GetCSSTextClass;
PCARSdriver.prototype.GetCSSCircleClass=GetCSSCircleClass;

