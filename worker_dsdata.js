//Worker thread for receiving DS data

self.addEventListener('message', function(e) {

	console.log("e: " , e);
	importScripts('./receive_ds_data.js');

	var aDsData 	= Receive_DS_data( e.data.dsurl, e.data.dsport , e.data.timeout , e.data.receivemode);
	console.log("DSdata complete array: " , aDsData);

	self.postMessage(aDsData);
}, false);
