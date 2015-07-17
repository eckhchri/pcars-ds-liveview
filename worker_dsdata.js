//Worker thread for receiving DS data

self.addEventListener('message', function(e) {


	importScripts('./receive_ds_data.js');

	var aDsData 	= Receive_DS_data( "www.eckhchri.de" , 9000 , 2000 , "GETDSDATA");
	console.log("DSdata complete array: " , aDsData);

	self.postMessage(aDsData);
}, false);
