
//import PCARSLV_BASIC from './PCARSLV_BASIC.js';

class PCARSLV_SETTINGS extends PCARSLV_BASIC {
	
	
	// example function header
	/*
	 * param {string}
	 * param {object}
	 * param {int}
	 * 
	 * return {string} true if all is fine, false if something went wrong
	 */	
	
		
	/* getAPIMODE()
	 * 
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	constructor() {
		super();	// get functions from basic class
				
		this.initFromConfigFile();
			
	}
	
	
	/* initFromConfigFile()
	 * initialize all relevant variables from config file. 
	 * 
	 * return {boolean} true if all is fine, false if something went wrong
	 */
	initFromConfigFile(){
		
		this.version = SCRIPTVERSION;
		
		this.curAPIMODE = APIMODE;
		this.curDsServerURL = DsServerURL;
		this.curDsPort = DsPort; 		
		
		
		return true;		
	}
	
	
	/* switchAPIMODE()
	 * 
	 * return {boolean} true if all is fine, false if something went wrong
	 */
	switchAPIMODE(apimode){
		
		switch (apimode) {
		
			// validations
			case "DS":
				if (this.curDsServerURL && this.curDsPort !== undefined){					
					if (this._isApiModeValid(apimode)){
						this.curAPIMODE = apimode;	// set new API mode
						this.displayMsg("INFO", "API Mode switched to: " + apimode);
					} else {
						this.displayMsg("WARN", "API Mode NOT switched. \nInvalid APIMODE: " + apimode);
					}										
				}else{
					this.displayErrorMsg("Switch canceled, not all variables defined. \nDSSERVERURL: "+ this.curDsServerURL +"\nDSPORT: "+ this.curDsPort +" !");
				}			
				break;
				
			case "DEMO":
									
				if (this._isApiModeValid(apimode)){
					this.curAPIMODE = apimode;	// set new API mode
					this.displayMsg("INFO", "API Mode switched to: " + apimode);
				} else {
					this.displayMsg("WARN", "API Mode NOT switched. \nInvalid APIMODE: " + apimode);
				}										
					
				break;
			
			default:
				if (this._isApiModeValid(apimode)){
					this.curAPIMODE = apimode;	// set new API mode
					this.displayMsg("INFO", "API Mode switched to: " + apimode);
				} else {
					this.displayMsg("ERROR", "API Mode NOT switched. \nInvalid APIMODE: " + apimode);
				}									
				break;
				
		} 
		
		
		
		if (this.curAPIMODE){
			return this.curAPIMODE;
		}else{
			this.displayErrorMsg("APIMODE not defined");	// used from basic class
			return false;
		}				
	}
	
	
	
	/* getAPIMODE()
	 * 
	 * return {boolean} true if all is fine, false if something went wrong
	 */
	getAPIMODE(){		
		if (this.curAPIMODE){
			return this.curAPIMODE;
		}else{
			this.displayErrorMsg("APIMODE not defined");	// used from basic class
			return false;
		}				
	}
	
	/* getAPIMODE()
	 * 
	 * param {string} string of the APIMODE
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	_isApiModeValid(apimode){
		
		var aVALIDAPIMODES = {				
				"DS" : 		'active',
				"DS2" : 	'active',
				"CREST" : 	'active',
				"CREST2" : 	'active',
				"DEMO" : 	'active'				
		}
		
		if (apimode in aVALIDAPIMODES){
			return true;			
		}else{			
			return false;
		}				
	}
	
	
}