//Worker thread for receiving DS Tracklist

self.addEventListener('message', function(e) {

	console.log("e: " , e);

	importScripts('./receive_ds_data.js');
	importScripts('./pcars_driver.js');
	importScripts('./pcars_track.js');
	importScripts('./class_reference_points.js');
	importScripts('./sleep.js');

	//delays this worker to reduce http requests and make application resposive
	sleep(e.data.workerdelay);

	var aTrackList 	= Receive_DS_data( e.data.dsurl, e.data.dsport , e.data.timeout , e.data.receivemode);
	console.log("Worker: DS Tracklist from Receive_DS_data(): " , aTrackList);
//	console.log("Worker: DS Tracklist from Receive_DS_data() JSON " , JSON.stringify(aTrackList));


	// use JSON.stringify() to prevent problem with empty arrays in Firefox
//	self.postMessage(JSON.stringify(aTrackList));
	self.postMessage(aTrackList);

}, false);
