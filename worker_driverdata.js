//Worker thread for receiving DS DriverData

self.addEventListener('message', function(e) {

	console.log("Driver Data 1 : " , e);

	importScripts('./receive_ds_data.js');
//	importScripts('./class_reference_points.js');
	importScripts('./pcars_driver.js');
	importScripts('./sleep.js');


	//delays this worker to reduce http requests and make application resposive
	sleep(e.data.workerdelay);

	var aDriverList = Receive_DS_data( e.data.dsurl, e.data.dsport , e.data.timeout , e.data.receivemode );
	console.log("DS Driverlist complete array: " , aDriverList);



	// return an arry of hashes with info for each track	
	self.postMessage(aDriverList);

}, false);
