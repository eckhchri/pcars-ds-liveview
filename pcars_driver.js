// CLASS of an pCars Driver
function PCARSdriver(RefID,Name,RacePos,PosX,PosY,PosZ,State,CurrentSector, RacePosition)
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



PCARSdriver.CalcGPSCoordinates=CalcGPSCoordinates;
PCARSdriver.prototype.GetRefID=GetRefID;
PCARSdriver.prototype.GetName=GetName;
PCARSdriver.prototype.GetPosX=GetPosX;
PCARSdriver.prototype.GetPosY=GetPosY;
PCARSdriver.prototype.GetPosZ=GetPosZ;
PCARSdriver.prototype.GetState=GetState;
PCARSdriver.prototype.GetCurrentSector=GetCurrentSector;
PCARSdriver.prototype.GetRacePosition=GetRacePosition;


