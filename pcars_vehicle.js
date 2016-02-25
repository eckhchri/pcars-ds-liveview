// CLASS of an pCars vehicle
function PCARSVEHICLE(vehicleid, name, cls)
{
        // vars
        this.name		=	name;
        this.vehicleid	=	vehicleid;
        this.cls		=	cls;
        
        //return the object
        
        
     /* 
        this.GetNameById = function( aVehicleList ){

        	//todo: pichup name from array 
        	
        	for(var i=0;i < aVehicleList.length ;i++){
        		
        		if( aVehicleList[i].vehicleid == this.vehicleid )
        		{
        			
        			return aVehicleList[i].name;
        		}
        		
        	}
        		
        	
        	return "--";
        }
        
      */
        
        return this;
}




//PCARSVEHICLE.prototype.GetNameById=GetNameById;