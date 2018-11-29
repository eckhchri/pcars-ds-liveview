class PCARSLV_BASIC{
	
	/* Basic class for Project Cars live View (PCARSLV) 
	 * 
	 * Implements some basic functionality that all PCARSLV objects need. For Example Display Messages to GUI.
	 * Validation routines and so on.
	 */

	
	/*
	 * param {string}
	 * param {object}
	 * param {int}
	 * 
	 * return {string} true if all is fine, false if something went wrong
	 */
	
	
	/*	 
	 * return {boolean} true if all is fine, false if something went wrong
	 */
	
	constructor(){
        this.testvar = 100;
	}
	
	
	/* displayMsg()
	 * param {string} prefix - prefix of a message. for example INFO, WARN, ERROR
	 * param {string} msg - string to display as error
	 */	
	displayMsg(title , msg, style ){
		var myNotice = new jBox('Notice', {			
			 fade: 500,
			 autoClose: 7000,
			 stack: true,
			 stackSpacing: 10,			 
			 close: 'flip',
			 color: 'black',
			 //addClass: 'JBOXPCARSLV',
			 target: '#map',
			 title: title,
			 content: msg,			 
			 attributes: {
			      x: 'right',
			      y: 'top'
			    },
			 position: {
				 x: 20,
				 y: 50
			 	}
			});
		
		//myNotice.open();
						
	}
			
	/* displayErrorMsg()
	 * param {string} msg - string to display as error
	 * return {string} true if all is fine, false if something went wrong
	 */
	displayErrorMsg(msg){		
		if (msg == ''){
			return false;
		}		
		alert("ERROR: "+ msg);			
		return true;
	}
	
	/* displayInfoMsg()
	 * param {string} msg - string to display as error
	 * return {string} true if all is fine, false if something went wrong
	 */
	displayInfoMsg(msg){		
		if (msg == ''){
			return false;
		}		
		alert("INFO: "+ msg);			
		return true;
	}
	
	/* printConsoleMsg()
	 * param {string} sType - prefix/type of Message: WARNING, ERROR, INFO
	 * param {string} sMsg - string of message
	 * return {string} true if all is fine, false if something went wrong
	 */
	printConsoleMsg(sType , sMsg){
		
		if(log >= 3){console.log(sType + " : " + sMsg);}
		
	}
	
	
}

//export default PCARSLV_BASIC;
