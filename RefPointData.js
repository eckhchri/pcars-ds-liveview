class RefPointData  {
		
		
	/* constructor()
	 * 
	 */	    
	constructor(apiMode) {		
        this.refPoints = {}; // will be defined within the game specific class
    }
    
    /*
    * Default RefPoint of SMS Head Quarter used as default in game specific classes like RefPointDataAMS2
    */
    getDefaultRefpoint(){

        var defaultRefPoint =
            {
                "refLat":        51.500657		// GPS coords of the zero point, where X=0 and Z=0
                ,"refLong":      -0.071587			
                ,"rotation":     0				// rotation correction angle in degree anticlockwise, negative value means clockwise
                ,"cor_r_Long":   0				// earth radius correction value for east/west calculation in millimeter
                ,"cor_r_Lat":    0				// earth radius correction value for north/south calculation in millimeter
                ,"cor_PosX_mul": 1				// correction multiplier for PosX on input data before calculation / the multipliers have a similar result as the cor_r_xxx values, but help better for tracks with a rotation error
                ,"cor_PosY_mul": 1				// correction multiplier for PosY on input data before calculation
                ,"Name":         "Slightly Mad Studios Ltd AMS2"	// real name of the circuit in DS API
                //,"Name2":	 ""					// real name of the circuit in Game API, if it differs from DS API Name
                ,"AltNames":""					// a csv list of additonal names in several APIs CREST1/CREST2/shared memory ... if it differs from DS API Name ("Name")
                ,"Zoom":         19				// wanted zoom level for initial google map
                ,"MapInitLat":   51.500657		// google map initialization coords
                ,"MapInitLong":  -0.071587
                ,"fictional":	 false
                ,"Comment": "Default"
                ,"game_name": 	this.gameName	// info for track table
            };
        
        return defaultRefPoint;
    }    
    
    getDefaultRefpointFictional(){

        //Default for fictional tracks
        var data =                 
        {
        "refLat":        40.997664
        ,"refLong":      -113.566253
        ,"Name":         "Salt Lake USA"
        ,"Zoom":         15
        ,"MapInitLat":   40.997664
        ,"MapInitLong":  -113.566253
        ,"fictional":	 true
        ,"Comment": "Default for fictional tracks"
        };

        return data;
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
        
        if (!source ||! changes){
            return {};
        }
        
    	var dest = {};
        dest =  JSON.parse( JSON.stringify( source  ) );

	    for (var key in changes){
		    dest[key] = changes[key];
	    }

	    return JSON.parse( JSON.stringify( dest ) );	
    }

}
