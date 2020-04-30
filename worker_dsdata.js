//Worker thread for receiving DS data

self.addEventListener('message', function(e) {

	importScripts('./receive_ds_data.js');
	importScripts('./pcars_driver.js');
	importScripts('./class_reference_points.js');
	importScripts('./config.js');	//for console.log levels needed
	/*//Because of the high performance impact of big demo data, the demo_data.js file is only imported in DEMO mode
        if(e.data.receivemode == "GETDEMODATA"){
                importScripts('./demo_data.js');
        }*/

	//delays this worker to reduce http requests and make application resposive
	//Syntax:  setTimeout(function,milliseconds,param1,param2,...)
	var aDsData = setTimeout(function(){
		
			//console.log("DSdata complete before function call with e: ", e);
			var a 	= Receive_DS_data( e.data.dsurl, e.data.dsport, e.data.dspath , e.data.timeout , e.data.receivemode, e.data.arefpoint, {'originaldatasource': e.data.originaldatasource, 'originalcurgamerunning': e.data.originalcurgamerunning });
			
			//Workaround: needed to have a valid and full RefPoint hash in addEventListener function
			a["arefpoint"] = e.data.arefpoint;
			//if(log >= 3){console.log("DSdata complete array: " , a);}
			
			// return result to main thread after timeout
			self.postMessage(a);
		
		}, e.data.workerdelay , e);
	
}, false);
