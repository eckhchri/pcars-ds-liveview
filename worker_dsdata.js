//Worker thread for receiving DS data

self.addEventListener('message', function(e) {

	importScripts('./receive_ds_data.js');
	importScripts('./pcars_driver.js');
	importScripts('./class_reference_points.js');

	//delays this worker to reduce http requests and make application resposive
	//Syntax:  setTimeout(function,milliseconds,param1,param2,...)
	var aDsData = setTimeout(function(e){
		
			console.log("DSdata complete before function call with e: ", e);
			var a 	= Receive_DS_data( e.data.dsurl, e.data.dsport , e.data.timeout , e.data.receivemode);
			console.log("DSdata complete array: " , a);
			return a;
		
		}, e.data.workerdelay, e);
	
	// return result to main thread
	self.postMessage(aDsData);
	
}, false);
