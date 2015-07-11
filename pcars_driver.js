// CLASS of an pCars Driver
function PCARSdriver(RefID,Name,RacePos,PosX,PosY,PosZ,State,CurrentSector, RacePosition, FLapTime, LLapTime, Orient, Spd)
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

function GetFastestLapTime(){
	//todo convert in readable time mm:ss
	return this.FastestLapTime;
}

function GetLastLapTime(){
	//todo: convert in readable time mm:ss
        return this.LastLapTime;
}

function GetOrientation(){
        return this.Orientation;
}

function GetSpeed(){
	//todo: convert in km/h
	return this.Speed;
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


