//Worker thread for receiving DS Vehiclelist

self.addEventListener('message', function(e) {
	
	importScripts('./receive_ds_data.js');
	importScripts('./pcars_driver.js');
	importScripts('./pcars_vehicle.js');
	importScripts('./config.js');	//for console.log levels needed
	/*//Because of the high performance impact of big demo data, the demo_data.js file is only imported in DEMO mode
        if(e.data.receivemode == "GETDEMODATA"){
                importScripts('./demo_data.js');
        }*/
	
	if(log >= 3){console.log("GETVEHICLELIST e: " , e);}

	//delays this worker to reduce http requests and make application resposive
	//sleep(e.data.workerdelay);
	

	var aVehicleList = setTimeout(function(){
		
		var a = new Array();
		a["avehiclelist"]= Receive_DS_data( e.data.dsurl, e.data.dsport , e.data.timeout , e.data.receivemode , e.data.arefpoint);
		
		//Workaround: needed to have a valid and full RefPoint hash in addEventListener function
		a["arefpoint"] = e.data.arefpoint;
		
		//if(log >= 3){console.log("Worker: GETVEHICLELIST DS Vehiclelist from Receive_DS_data(): " , a);}
		
		// return result to main thread after timeout
		self.postMessage(a);
		
	}, e.data.workerdelay , e);

}, false);
