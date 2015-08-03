// CLASS of an pCars Driver
function PCARSdriver(RefID,Name,RacePos,PosX,PosY,PosZ,State,CurrentSector, RacePosition, FLapTime, LLapTime, Orient, Spd, variousParameters)
{
        // vars
        this.RefID     =       RefID;
        this.Name      =       Name;
        this.RacePos   =       RacePos;
        this.PosX      =       PosX;
        this.PosY      =       PosY;
        this.PosZ      =       PosZ;
	this.State     =       State;
	this.CurrentSector =   CurrentSector;
	this.RacePosition  =   RacePosition;
	this.FastestLapTime=   FLapTime;
        this.LastLapTime   =   LLapTime;
        this.Orientation   =   Orient;
        this.Speed	   =   Spd;
	this.variousParameters = variousParameters;


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

}

function GetOrientation(){
        return this.Orientation;
}

function GetSpeed(){
	//todo: convert in km/h
	return this.Speed;
}

function GetPosColor(){
	
	if (this.RacePos == 1){
		return green;
	}else{
		return red;
	}
}
function GetVariousParameter(parameter)
{
	//console.log("variousParameters: ", this.variousParameters + " --- parameter: " + parameter);
	return this.variousParameters[parameter];
}

function SetExampleData()
{

	// set default parameter for a dummy object
	this.RefID     =       9234567;
        this.Name      =       "NO_PARTICIPANT_TestData";
        this.RacePos   =       3;
        this.PosX      =       271;
        this.PosY      =       277;
        this.PosZ      =       288;
        this.State     =       "StateTest";
        this.CurrentSector =   0;
        this.RacePosition  =   0;
        this.FastestLapTime=   9000;
        this.LastLapTime   =   9999;
        this.Orientation   =   orientation;
        this.Speed         =   100;
        this.variousParameters = {TrackId: 920145926};

	return 1;
}


/// help function
function _ConvertLaptimeInReadbaleFormat(milliseconds)
{
	//todo: implemet date format with leading zeros for seconds and milliseconds
	var date = new Date(milliseconds);
	var str = '';
  //    str += date.getUTCDate()-1 + " ";		//days
  //    str += date.getUTCHours() + ":";		//hours
        str += date.getUTCMinutes() + ":";		//minutes
        str += date.getUTCSeconds() + ":";		//seconds
        str += date.getUTCMilliseconds();		//miliseconds
 //     console.log("Time Formated string:" + str);

	return str;
}


PCARSdriver.CalcGPSCoordinates=CalcGPSCoordinates;
PCARSdriver.prototype.GetRefID=GetRefID;
PCARSdriver.prototype.GetName=GetName;
PCARSdriver.prototype.GetPosX=GetPosX;
PCARSdriver.prototype.GetPosY=GetPosY;
PCARSdriver.prototype.GetPosZ=GetPosZ;
PCARSdriver.prototype.GetState=GetState;
PCARSdriver.prototype.GetCurrentSector=GetCurrentSector;
PCARSdriver.prototype.GetRacePosition=GetRacePosition;
PCARSdriver.prototype.GetFastestLapTime=GetFastestLapTime;
PCARSdriver.prototype.GetLastLapTime=GetLastLapTime;
PCARSdriver.prototype.GetOrientation=GetOrientation;
PCARSdriver.prototype.GetSpeed=GetSpeed;
PCARSdriver.prototype.GetPosColor=GetPosColor;
PCARSdriver.prototype.GetVariousParameter=GetVariousParameter;
PCARSdriver.prototype.SetExampleData=SetExampleData;

