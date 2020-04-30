//Worker thread for receiving DS Tracklist

self.addEventListener('message', function(e) {

	importScripts('./receive_ds_data.js');
	importScripts('./pcars_driver.js');
	importScripts('./pcars_track.js');
	importScripts('./class_reference_points.js');
	importScripts('./config.js');	//for console.log levels needed
	/*//Because of the high performance impact of big demo data, the demo_data.js file is only imported in DEMO mode
        if(e.data.receivemode == "GETDEMODATA"){
                importScripts('./demo_data.js');
        }*/

	//delays this worker to reduce http requests and make application resposive
	//Syntax:  setTimeout(function,milliseconds,param1,param2,...)
	var aTrackList = setTimeout(function(){
		
		var a = new Array(); 
		a["aTrack"] = Receive_DS_data( e.data.dsurl, e.data.dsport, e.data.dspath, e.data.timeout , e.data.receivemode, e.data.aRefpoint);
		
		//Workaround: needed to have a valid and full RefPoint hash in w_tracklist.addEventListener
		a["aRefpoint"] = e.data.aRefpoint;
		
		//if(log >= 3){console.log("Worker: DS Tracklist from Receive_DS_data(): " , a);}

		// return result to main thread after timeout
		self.postMessage(a);
		
	}, e.data.workerdelay, e);


}, false);
