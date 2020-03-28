class RefPointDataAMS2 extends RefPointData {
		
		
	/* constructor()
	 * 
	 */	
	constructor(mode) {
		super(mode);	// get functions from basic class        
		//this.refPoints = {};
	
		this.initData();
	}	
	
    initData(){
		
		//Default
		this.refPoints[9999999999] = new Array();
		this.refPoints[9999999999] =
		{
			"refLat":        51.500657			// GPS coords of the zero point, where X=0 and Z=0
			,"refLong":      -0.071587			
			,"rotation":     0				// rotation correction angle in degree anticlockwise, negative value means clockwise
			,"cor_r_Long":   0				// earth radius correction value for east/west calculation in millimeter
			,"cor_r_Lat":    0				// earth radius correction value for north/south calculation in millimeter
			,"cor_PosX_mul": 1				// correction multiplier for PosX on input data before calculation / the multipliers have a similar result as the cor_r_xxx values, but help better for tracks with a rotation error
			,"cor_PosY_mul": 1				// correction multiplier for PosY on input data before calculation
			,"Name":         "Slightly Mad Studios Ltd"	// real name of the circuit in DS API
			,"Name2":	 ""				// real name of the circuit in Game API, if it differs from DS API Name
			,"AltNames":""	// a csv list of additonal names in several APIs CREST1/CREST2/shared memory ...
			,"Zoom":         19				// wanted zoom level for initial google map
			,"MapInitLat":   51.500657			// google map initialization coords
			,"MapInitLong":  -0.071587
			,"fictional":	 false
			,"Comment": "Default"
		};
		
		this.refPoints[100] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":        36.56708
			,"refLong":      -79.209072
			,"rotation":     -1.075
			,"cor_r_Long":   0
			,"cor_r_Lat":    0
			,"cor_PosX_mul": 0.999
			,"cor_PosY_mul": 1.002
			,"Name":         "VIRginia International Raceway Full"
			,"AltNames":	 "Virginia Virginia_Full"
			,"Zoom":         15
			,"MapInitLat":   36.561228
			,"MapInitLong":  -79.206432
			,"Comment": "finished"
		});
		
    }

}