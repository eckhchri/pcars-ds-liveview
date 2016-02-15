//Worker thread for receiving DS Tracklist

self.addEventListener('message', function(e) {

	importScripts('./receive_ds_data.js');
	importScripts('./pcars_driver.js');
	importScripts('./pcars_track.js');
	importScripts('./class_reference_points.js');

	//delays this worker to reduce http requests and make application resposive
	//Syntax:  setTimeout(function,milliseconds,param1,param2,...)
	var aTrackList = setTimeout(function(){
		
		var a = Receive_DS_data( e.data.dsurl, e.data.dsport , e.data.timeout , e.data.receivemode);
		//console.log("Worker: DS Tracklist from Receive_DS_data(): " , a);
		return a;
		
	}, e.data.workerdelay, e);


	// use JSON.stringify() to prevent problem with empty arrays in Firefox
	//	self.postMessage(JSON.stringify(aTrackList));
	self.postMessage(aTrackList);

}, false);
