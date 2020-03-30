class RefPointData  {
		
		
	/* constructor()
	 * 
	 */	
    
	constructor(apiMode) {
		//super();	// get functions from basic class        
        this.refPoints = {}; // will be defined within the game specific class
    }
    
    

    /*
	 * 
	 */	
    getData(){        
        return this.refPoints;
    }

    /*	to copy cuircit variantions from one object to another
    *
    *	@param {object} a hash of a specific RefPoint Element	
    *	@param {object} a hash of changes, to overwrite	
    */
    CopyObjectWithModifications(source, changes ){
    	var dest = {};
        dest =  JSON.parse( JSON.stringify( source  ) );

	    for (var key in changes){
		    dest[key] = changes[key];
	    }

	    return JSON.parse( JSON.stringify( dest ) );	
    }

}
