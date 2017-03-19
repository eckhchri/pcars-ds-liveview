// CLASS of an pCars vehicle
function PCARSVEHICLE(vehicleid, name, cls, link, gamescope, comment)
{
        // vars
        this.name			=	name;
        this.vehicleid		=	vehicleid;
        this.cls			=	cls;
        this.link			=	link;			//eg. hyperlink to wiki artice of this car 
        this.gamescope		=	gamescope;	//PCARS1 and/or PCARS2
        this.comment		=	'';				//additional info for each car
                    
        return this;
}




//PCARSVEHICLE.prototype.GetNameById=GetNameById;