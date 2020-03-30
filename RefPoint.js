class RefPoint  {
		
		
	/* 
	 * init class
	 */	
	constructor(gameId) {
		//super();	// get functions from basic class        
        this.gameId = gameId;
        this.legacyObject = new Refpoint("-1");

        this.refPointDefault = {};
        this.refPoints = {};
        this.refPoints['PCARS1'] = new Refpoint("-1").GetRefPointHash();
        this.refPoints['PCARS2'] = new Refpoint("-1").GetRefPointHash(); 
        this.refPoints['AMS2'] = new RefPointDataAMS2(gameId).getData();

        this.refPointsAll = this._mergeDataObjects(); // all refpoints in one merged object
    }
    
    /*
    * set new game id
    */
    setGameId(gameId){

        if (this.refPoints.hasOwnProperty(gameId)){
            this.gameId = gameId;
            return true;
        }

        return false;
    }

    /*
    * return all refpoints of all configured games
    */
    getRefPointsAll(){
        return this.refPointsAll;
    }

    /*
	 * 	@param {string}	id of the circuit
	 */	
    getRefPointsByGame(gameId){ 

        var id = this.gameId+'';

        if (gameId){
            id = gameId;
        }

        if ( this.refPoints[id+''] !== undefined){
            return this.refPoints[id+''];
        }else{
            return this.refPointDefault;
        }
        
        return true;
    }

    /*
    * 	@param {string}	id of the circuit	
    *	@return {array} array of Lat, Long, Rotation
    */
 
    GetRefPoint(circuit_id){
        //return ( this.Lat, this.Long, this.Rot );
        if (this.refPointsAll.hasOwnProperty(circuit_id)){
            var data = this.refPointsAll[circuit_id];
            return (data['refLat'], data['refLong'], data['rotation']);
        }
    }

    /*	GetCircuitnameByTrackID (circuit_id)
    *		@param {string}	id of the circuit	+{
    *		@return {string} Name of specific track	
    */
    GetCircuitnameByTrackID (circuit_id){        

        if ( this.refPointsAll.hasOwnProperty(circuit_id) ){
            return this.refPointsAll[circuit_id]["Name"];
        }else{
            return "not defined";
        }
    }
    

    GetMappingTrackname2Trackid(){
       
        var aTrackname2ID	= new Array();
        var sAltNames		= '';   // tmp alternative name string
        var aNamesTmp		= new Array();
            
        // travers trough all Refpoints
        for (var key in this.refPointsAll){
                    
            // add 'Name' and 'Name2' to mapping if the attribute is NOT empty
            if (this.refPointsAll[key+'']['Name'] != '') { aTrackname2ID[this.refPointsAll[key+'']['Name']] = key+''; }
            if (this.refPointsAll[key+'']['Name2']!= '') { aTrackname2ID[this.refPointsAll[key+'']['Name2']] = key+''; }
                    
            // add 'AltNames' to mapping
            if (this.refPointsAll[key]['AltNames'] && this.refPointsAll[key]['AltNames'] != '' ){			
                // split into array and add each name to mapping
                aNamesTmp = this.refPointsAll[key]['AltNames'].split(',');			
                for (i = 0; i < aNamesTmp.length; i++) {				
                    aTrackname2ID[aNamesTmp[i]+''] = key;
                }			            
            }
            
            // reset values
            sAltNames = "";	
            aNamesTmp = new Array();			
        }
        
        //Crest Mode provide empty string in Lobby
        aTrackname2ID[''] = "9999999999";
                
        return aTrackname2ID;

    }

    /* GetMappingTrackname2Trackid()
    * 
    * returns an hash for mapping different spellings of a cicuit to a unique ID
    * 
    */
    GetMappingTrackname2Trackid(){

        var aTrackname2ID	= new Array();
        var sAltNames		= '';   // tmp alternative name string
        var aNamesTmp		= new Array();
            
        // travers trough all Refpoints
        for (var key in this.aRPs){
                    
            // add 'Name' and 'Name2' to mapping if the attribute is NOT empty
            if (this.aRPs[key+'']['Name'] != '') { aTrackname2ID[this.aRPs[key+'']['Name']] = key+''; }
            if (this.aRPs[key+'']['Name2']!= '') { aTrackname2ID[this.aRPs[key+'']['Name2']] = key+''; }
                    
            // add 'AltNames' to mapping
            if (this.aRPs[key]['AltNames'] && this.aRPs[key]['AltNames'] != '' ){			
                // split into array and add each name to mapping
                aNamesTmp = this.aRPs[key]['AltNames'].split(',');			
                for (i = 0; i < aNamesTmp.length; i++) {				
                    aTrackname2ID[aNamesTmp[i]+''] = key;
                }			            
            }
            
            // reset values
            sAltNames = "";	
            aNamesTmp = new Array();			
        }
        
        //Crest Mode provide empty string in Lobby
        aTrackname2ID[''] = "9999999999";
                
        return aTrackname2ID;
    }

    /*
    * merge all refpoint objects to on list
    */
   _mergeDataObjects(){
        return Object.assign({}, this.refPoints['AMS2'] , this.refPoints['PCARS1']);
    }
}
