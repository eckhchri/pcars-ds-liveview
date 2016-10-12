//Worker thread for updating GUI elements/value

self.addEventListener('message', function(e) {
	
		
	var aGUIUPDATE = setTimeout(function(){
			
		// return result to main thread after timeout
		self.postMessage("true");
		
	}, e.data.delay , e);

}, false);
