class RefPoint  {
		
		
	/* constructor()
	 * 
	 */	
	constructor(mode) {
		//super();	// get functions from basic class        
        this.apiMode = mode;
        this.legacyObject = new Refpoint("-1");

        this.refPointDefault = {};
        this.refPoints = {};
        this.refPoints['PCARS1'] = new Refpoint("-1").GetRefPointHash();
        this.refPoints['PCARS2'] = new Refpoint("-1").GetRefPointHash();
        this.refPoints['AMS2'] = new RefPointDataAMS2(mode).getData();
        
    }
    
    /*
	 * 
	 */	
    GetRefPointsGameCurGame(){ 
        if ( this.refPoints[this.apiMode+''] !== undefined){
            return this.refPoints[this.apiMode+''];
        }else{
            return this.refPointDefault;
        }
        
    }

    GetMappingTrackname2Trackid(){
        return this.legacyObject.GetMappingTrackname2Trackid();
    }

}
