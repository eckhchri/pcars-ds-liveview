//Worker thread for receiving DS Vehiclelist

self.addEventListener('message', function(e) {

	console.log("e: " , e);

	importScripts('./receive_ds_data.js');
	importScripts('./pcars_driver.js');
	importScripts('./pcars_vehicle.js');
	importScripts('./sleep.js');

	//delays this worker to reduce http requests and make application resposive
	//sleep(e.data.workerdelay);
	

	var aVehicleList = setTimeout(function(e){
		
		var a = Receive_DS_data( e.data.dsurl, e.data.dsport , e.data.timeout , e.data.receivemode);
		//console.log("Worker: DS Vehiclelist from Receive_DS_data(): " , a);
		//	console.log("Worker: DS Vehiclelist from Receive_DS_data() JSON " , JSON.stringify(aTrackList));
		return a;
		
	}, e.data.workerdelay);
	

	self.postMessage(aVehicleList);

}, false);
