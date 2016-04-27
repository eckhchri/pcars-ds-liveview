// CLASS of an pCars vehicle
function PCARSVEHICLELIST()
{
        // vars
        //this.name				=	"";
        this.idToNameMapping	=	{};			//mapaping between
        this.aVehicleList		=	[]; 		//array of pcars_vehicle objects
        this.DataAvaiavle		=	0;			// to check if data was set
        
        return this;
}

//fill the object with data
function setVehicleData(aVL)
{
	l 	= 	aVL.length; 				// length of the vehicle list
	l2	=	this.aVehicleList.length;	// length of the current vehicle list
	
	for (i = 0; i < l; i++) {
	
		this.aVehicleList[l2] =  new  PCARSVEHICLE(
										aVL[i].vehicleid, 
										aVL[i].name, 
										aVL[i].cls); 
		l2++;		
	}

	
	if(log >= 3){console.log("--- INFO object setVehicleData: ", this.aVehicleList );}
	
	this.DataAvaiavle = 1;
	
	return 1;
}

function getVehicleList()
{
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


////////////////////
PCARSVEHICLELIST.prototype.setVehicleData=setVehicleData;
PCARSVEHICLELIST.prototype.getVehicleClasses=getVehicleClasses;
PCARSVEHICLELIST.prototype.getVehicleList=getVehicleList;
