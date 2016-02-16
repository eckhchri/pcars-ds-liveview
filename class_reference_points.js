/// Reference Object
// CLASS of RefPoints
function Refpoint(circuit_id)
{

//	console.log ("RefPoint - Parameter: " , circuit_id);
	this.circuit_id 	= 	circuit_id;
	this.Lat		=	undefined;
	this.Long		=	undefined;
	this.Rot		=	undefined;
	this.cuircit_name	=	undefined;
        
	var aRefPoints = new Array();

	//static information
	
	//Default
	aRefPoints[9999999999] = new Array();
        aRefPoints[9999999999] =
                {
                "refLat":        51.500681			// GPS coords of the zero point, where X=0 and Z=0
                ,"refLong":      -0.071795			
                ,"rotation":     0				// rotation correction angle in degree anticlockwise, negative value means clockwise
                ,"cor_r_Long":   0				// earth radius correction value for east/west calculation in millimeter
		,"cor_r_Lat":    0				// earth radius correction value for north/south calculation in millimeter
		,"cor_PosX_mul": 1				// correction multiplier for PosX on input data before calculation / the multipliers have a similar result as the cor_r_xxx values, but help better for tracks with a rotation error
		,"cor_PosY_mul": 1				// correction multiplier for PosY on input data before calculation
                ,"Name":         "Slightly Mad Studios Ltd"	// real name of the circuit in DS API
                ,"Name2":	 ""				// real name of the circuit in Game API, if it differs from DS API Name
                ,"Zoom":         19				// wanted zoom level for initial google map
                ,"MapInitLat":   51.500681			// google map initialization coords
                ,"MapInitLong":  -0.071795
                ,"Comment": "Default"
                };
        
        //Default for idle DS server
        aRefPoints[0] = CopyObjectWithModifications(aRefPoints[9999999999],{});
        
        //Default for fictional tracks
        aRefPoints[8888888888] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        62.552546
                ,"refLong":      -45.678026
                ,"Name":         "Greenland"
                ,"Zoom":         15
                ,"MapInitLat":   41.036357
                ,"MapInitLong":  -113.535295
                ,"Comment": "Default for fictional tracks"
                });
	
	//Hockenheim GP
        aRefPoints[1695182971] = CopyObjectWithModifications(aRefPoints[9999999999],
        	{
                "refLat":        49.329738
                ,"refLong":      8.574270
                ,"rotation":     0.573
                ,"cor_r_Long":   45000000
		,"cor_r_Lat":	 0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Hockenheim GP"
                ,"Name2":	 "Hockenheim Grand Prix"	//"mTrackLocation":"Hockenheim","mTrackVariation":"Grand Prix"
                ,"Zoom":         16
                ,"MapInitLat":   49.329718
                ,"MapInitLong":  8.574300
                ,"Comment": "finetuning" 
        	});
	//Hockenheim Short
	aRefPoints[1768660198] = CopyObjectWithModifications(aRefPoints[1695182971], {"Name": "Hockenheim Short","Name2": ""});
	//Hockenheim National
	aRefPoints[-1977142985] = CopyObjectWithModifications(aRefPoints[1695182971], {"Name": "Hockenheim National","Name2": ""});

	//Dubai Autodrome GP
	aRefPoints[-661887517] = CopyObjectWithModifications(aRefPoints[9999999999],
		{ 
		"refLat":      	 25.046650      
		,"refLong":   	 55.231300
	  	,"rotation":     -0.401
	   	,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
	        ,"Name":         "Dubai Autodrome GP"
	        ,"Name2":	 "Dubai Autodrome Grand Prix"	//"mTrackLocation":"Dubai Autodrome","mTrackVariation":"Grand Prix"
	        ,"Zoom":         17
	        ,"MapInitLat":   25.050102
	        ,"MapInitLong":  55.238634
	        ,"Comment": "live check"
		});

	///Dubai Autodrome International
	aRefPoints[-710712693] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Autodrome International","Name2": ""});
	//Dubai Kartdrome
	aRefPoints[-232513374] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Kartdrome","Name2": ""});
	//Dubai Autodrome National
	aRefPoints[-31727447] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Autodrome National","Name2": ""});
	//Dubai Autodrome Club
	aRefPoints[1735854797] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Autodrome Club","Name2": ""});

	//Nuerburgring GP
        aRefPoints[-945967394] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        50.332733 
                ,"refLong":      6.943355
                ,"rotation":     -0.9 
                ,"cor_r_Long":   30000000
		,"cor_r_Lat":    -30000000 
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Nürburgring GP"
                ,"Name2":	 "Nürburgring Grand Prix"	//"mTrackLocation":"Nürburgring","mTrackVariation":"Grand Prix"
                ,"Zoom":         15
                ,"MapInitLat":   50.332154
                ,"MapInitLong":  6.940467
                ,"Comment": "live check"
                });

	//Nuerburgring Sprint Short
	aRefPoints[-810715843] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nürburgring Sprint Short","Name2": ""});
	//Nuerburgring Sprint
	aRefPoints[-709737101] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nürburgring Sprint","Name2": ""});
	//Nuerburgring Muellenbach
	aRefPoints[-246966400] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nürburgring Müllenbach","Name2": "Nürburgring MuellenBach"});	//"mTrackLocation":"Nürburgring","mTrackVariation":"MuellenBach"

	//Nordschleife
        aRefPoints[697498609] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        50.332733
                ,"refLong":      6.943385
                ,"rotation":     -0.9
                ,"cor_r_Long":   10000000
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Nordschleife"
                ,"Name2":	 "Nordschleife Full"	//"mTrackLocation":"Nordschleife","mTrackVariation":"Full"
                ,"Zoom":         13
                ,"MapInitLat":   50.359101
                ,"MapInitLong":  6.962529
                ,"Comment": "live check, big discrepancies on some parts of track"
                });
	//Nordschleife Stage 3
	aRefPoints[1128950148] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nordschleife Stage 3","Name2": ""});
	//Nordschleife Stage 1
	aRefPoints[1459212514] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nordschleife Stage 1","Name2": ""});
	//Nordschleife Stage 2
	aRefPoints[-300387291] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nordschleife Stage 2","Name2": ""});
	
	//Sonoma Raceway
        aRefPoints[-1454279631] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        38.162514
                ,"refLong":      -122.457216
                ,"rotation":     142
                ,"cor_r_Long":   10000000
                ,"cor_r_Lat":    -30000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 0.97
                ,"Name":         "Sonoma Raceway GP"
                ,"Name2":	 "Sonoma Raceway Grand Prix"	//"mTrackLocation":"Sonoma Raceway","mTrackVariation":"Grand Prix"
                ,"Zoom":         16
                ,"MapInitLat":   38.162770 
                ,"MapInitLong":  -122.457449
                ,"Comment": "live check"
                });
        //Sonoma Raceway National
	aRefPoints[-995202729] = CopyObjectWithModifications(aRefPoints[-1454279631], {"Name": "Sonoma Raceway National","Name2": ""});
	//Sonoma Sonoma Raceway Short
	aRefPoints[1035110721] = CopyObjectWithModifications(aRefPoints[-1454279631], {"Name": "Sonoma Raceway Short","Name2": ""});

	//Circuit des 24 Heures du Mans
        aRefPoints[1740968730] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        47.939065
                ,"refLong":      0.218178
                ,"rotation":     1.6
                ,"cor_r_Long":   25000000
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Circuit des 24 Heures du Mans"
                ,"Name2":	 "Le Mans Circuit des 24 Heures du Mans"	//"mTrackLocation":"Le Mans","mTrackVariation":"Circuit des 24 Heures du Mans"
                ,"Zoom":         13
                ,"MapInitLat":   47.936818 
                ,"MapInitLong":  0.223960
                ,"Comment": "live check"
                });
        //Le Circuit Bugatti
	aRefPoints[-1027934689] = CopyObjectWithModifications(aRefPoints[1740968730], {"Name": "Le Circuit Bugatti","Name2": "Le Mans Le Circuit Bugatti","Zoom": 15,"MapInitLat": 47.954335,"MapInitLong": 0.211027});	//"mTrackLocation":"Le Mans","mTrackVariation":"Le Circuit Bugatti"
        
        //Ruapuna Park GP
        aRefPoints[1277693448] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        -43.533275
                ,"refLong":      172.478130
                ,"rotation":     -0.3
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Ruapuna Park GP"
                ,"Name2":	 "Ruapuna Park Grand Prix"	//"mTrackLocation":"Ruapuna Park","mTrackVariation":"Grand Prix"
                ,"Zoom":         15
                ,"MapInitLat":   -43.531123 
                ,"MapInitLong":  172.479408
                ,"Comment": "live check"
                });
        //Ruapuna Park A Circuit
	aRefPoints[619694160] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park A Circuit","Name2": "Ruapuna Park A_Circuit"});	//"mTrackLocation":"Ruapuna Park","mTrackVariation":"A_Circuit"
        //Ruapuna Park Club
	aRefPoints[1446378877] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park Club","Name2": ""});
	//Ruapuna Park Outer Loop
	aRefPoints[1940584155] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park Outer Loop","Name2": "Ruapuna Park Outer_Loop"});	//"mTrackLocation":"Ruapuna Park","mTrackVariation":"Outer_Loop"
	//Ruapuna Park B Circuit
	aRefPoints[-2046633090] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park B Circuit","Name2": "Ruapuna Park B_Circuit"});	//"mTrackLocation":"Ruapuna Park","mTrackVariation":"B_Circuit"
        
        //Cadwell GP
        aRefPoints[1876749797] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        53.310651
                ,"refLong":      -0.059440
                ,"rotation":     0
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    -30000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Cadwell GP"
                ,"Name2":	 "Cadwell Grand Prix"	//"mTrackLocation":"Cadwell","mTrackVariation":"Grand Prix"
                ,"Zoom":         15
                ,"MapInitLat":   53.308465 
                ,"MapInitLong":  -0.063734
                ,"Comment": "live check"
                });
        //Cadwell Club Circuit
	aRefPoints[328972919] = CopyObjectWithModifications(aRefPoints[1876749797], {"Name": "Cadwell Club Circuit","Name2": ""});
	//Cadwell Woodland
	aRefPoints[-1408189041] = CopyObjectWithModifications(aRefPoints[1876749797], {"Name": "Cadwell Woodland","Name2": ""});
        
        //Oulton Park International
        aRefPoints[545979690] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        53.179864
                ,"refLong":      -2.613992
                ,"rotation":     -0.3
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Oulton Park International"
                ,"Zoom":         15
                ,"MapInitLat":   53.176808 
                ,"MapInitLong":  -2.616589
                ,"Comment": "live check"
                });
        //Oulton Park Fosters
	aRefPoints[-2021024495] = CopyObjectWithModifications(aRefPoints[545979690], {"Name": "Oulton Park Fosters"});
	//Oulton Park Island
	aRefPoints[-1877699523] = CopyObjectWithModifications(aRefPoints[545979690], {"Name": "Oulton Park Island"});
        
        //Snetterton 300
        aRefPoints[1508903068] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        52.463952
                ,"refLong":      0.945230
                ,"rotation":     0.2
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    20000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Snetterton 300"
                ,"Name2":	 "Snetterton 300 Circuit"	//"mTrackLocation":"Snetterton","mTrackVariation":"300 Circuit"
                ,"Zoom":         15
                ,"MapInitLat":   52.465021 
                ,"MapInitLong":  0.947079
                ,"Comment": "live check"
                });
        //Snetterton 200
	aRefPoints[1058872832] = CopyObjectWithModifications(aRefPoints[1508903068], {"Name": "Snetterton 200","Name2": "Snetterton 200 Circuit"});	//"mTrackLocation":"Snetterton","mTrackVariation":"200 Circuit"
	//Snetterton 100
	aRefPoints[-867340010] = CopyObjectWithModifications(aRefPoints[1508903068], {"Name": "Snetterton 100","Name2": "Snetterton 100 Circuit"});	//"mTrackLocation":"Snetterton","mTrackVariation":"100 Circuit"
        
        //Zhuhai International Circuit
        aRefPoints[1836888499] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        22.367585
                ,"refLong":      113.559640
                ,"rotation":     -29.9
                ,"cor_r_Long":   -15000000
                ,"cor_r_Lat":    -25000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Zhuhai International Circuit"
                ,"Zoom":         15
                ,"MapInitLat":   22.367988 
                ,"MapInitLong":  113.556162
                ,"Comment": "live check"
                });
                
        //Silverstone GP
        aRefPoints[1641471184] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        52.078807
                ,"refLong":      -1.015293
                ,"rotation":     -0.2
                ,"cor_r_Long":   20000000
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Silverstone GP"
                ,"Name2":	 "Silverstone Grand Prix"	//"mTrackLocation":"Silverstone","mTrackVariation":"Grand Prix"
                ,"Zoom":         15
                ,"MapInitLat":   52.071727 
                ,"MapInitLong":  -1.015736
                ,"Comment": "track maybe not correct, check again"
                });
        //Silverstone International
	aRefPoints[1101719627] = CopyObjectWithModifications(aRefPoints[1641471184], {"Name": "Silverstone International","Name2": ""});
	//Silverstone Stowe
	aRefPoints[1600840139] = CopyObjectWithModifications(aRefPoints[1641471184], {"Name": "Silverstone Stowe","Name2": ""});
	//Silverstone National
	aRefPoints[1952936927] = CopyObjectWithModifications(aRefPoints[1641471184], {"Name": "Silverstone National","Name2": ""});
        
        //Brands Hatch GP
        aRefPoints[1988984740] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        51.357240
                ,"refLong":      0.261592
                ,"rotation":     0
                ,"cor_r_Long":   -10000000
                ,"cor_r_Lat":    20000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Brands Hatch GP"
                ,"Name2":	 "Brands Hatch Grand Prix"	//"mTrackLocation":"Brands Hatch","mTrackVariation":"Grand Prix"
                ,"Zoom":         15
                ,"MapInitLat":   51.357186 
                ,"MapInitLong":  0.262930
                ,"Comment": "live check, track maybe not correct, small discrepancies"
                });
        //Brands Hatch Indy
	aRefPoints[1300627020] = CopyObjectWithModifications(aRefPoints[1988984740], {"Name": "Brands Hatch Indy","Name2": ""});
        
        //Mazda Raceway Laguna Seca
        aRefPoints[-1612023328] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        36.584300
                ,"refLong":      -121.753357
                ,"rotation":     2
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Mazda Raceway Laguna Seca"
                ,"Zoom":         15
                ,"MapInitLat":   36.584275 
                ,"MapInitLong":  -121.753345
                ,"Comment": "live check"
                });
        
        //Brno
        aRefPoints[-907901266] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        49.203370
                ,"refLong":      16.444172
                ,"rotation":     156.6
                ,"cor_r_Long":   10000000
                ,"cor_r_Lat":    -30000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Brno"
                ,"Zoom":         15
                ,"MapInitLat":   49.205370 
                ,"MapInitLong":  16.452067
                ,"Comment": "live check"
                });
                
        //Road America
        aRefPoints[-660300766] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        43.798290
                ,"refLong":      -87.995239
                ,"rotation":     0
                ,"cor_r_Long":   30000000
                ,"cor_r_Lat":    10000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Road America"
                ,"Zoom":         15
                ,"MapInitLat":   43.798710 
                ,"MapInitLong":  -87.995182
                ,"Comment": "check again, big discrepancies"
                });
                
        //Zolder
        aRefPoints[-360711057] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        50.992257
                ,"refLong":      5.258882
                ,"rotation":     -148.2
                ,"cor_r_Long":   15000000
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 0.955
		,"cor_PosY_mul": 0.96
                ,"Name":         "Zolder"
                ,"Name2":	 "Zolder Grand Prix"	//"mTrackLocation":"Zolder","mTrackVariation":"Grand Prix"
                ,"Zoom":         15
                ,"MapInitLat":   50.990644 
                ,"MapInitLong":  5.257656
                ,"Comment": "live check"
                });
        
	//Donington Park GP
	aRefPoints[354022214] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        52.830575
		,"refLong":      -1.374732
		,"rotation":     174
		,"cor_r_Long":   10000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Donington Park GP"
		,"Name2":	 "Donington Park Grand Prix"	//"mTrackLocation":"Donington Park","mTrackVariation":"Grand Prix"
		,"Zoom":         15
		,"MapInitLat":   52.830756
		,"MapInitLong":  -1.375103
		,"Comment": "live check"
		});
	//Donington Park National
	aRefPoints[-1194019375] = CopyObjectWithModifications(aRefPoints[354022214], {"Name": "Donington Park National","Name2": ""});


	//Oschersleben GP
	aRefPoints[-1194185720] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        52.027834
		,"refLong":      11.280251
		,"rotation":     161.8
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1.003
		,"cor_PosY_mul": 1
		,"Name":         "Oschersleben GP"
		,"Name2":	 "Oschersleben Grand Prix"	//"mTrackLocation":"Oschersleben","mTrackVariation":"Grand Prix"
		,"Zoom":         16
		,"MapInitLat":   52.028843
		,"MapInitLong":  11.276850
		,"Comment": "live check"
		});
	//Oschersleben National
	aRefPoints[816601966] = CopyObjectWithModifications(aRefPoints[-1194185720], {"Name": "Oschersleben National","Name2": ""});
	//Oschersleben C Circuit
	aRefPoints[-1359299594] = CopyObjectWithModifications(aRefPoints[-1194185720], {"Name": "Oschersleben C Circuit","Name2": ""});

	//Azure Circuit
	aRefPoints[832629329] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        43.737030
		,"refLong":      7.427395
		,"rotation":     126
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.983
		,"cor_PosY_mul": 0.985
		,"Name":         "Azure Circuit"
		,"Name2":	 "Azure Circuit Grand Prix"	//"mTrackLocation":"Azure Circuit","mTrackVariation":"Grand Prix"
		,"Zoom":         15
		,"MapInitLat":   43.737186
		,"MapInitLong":  7.425732
		,"Comment": "live check"
		});
		
	//Bathurst
	aRefPoints[921120824] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        -33.439873
		,"refLong":      149.559704
		,"rotation":     -9
		,"cor_r_Long":   15000000
		,"cor_r_Lat":    15000000
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Bathurst"
		,"Zoom":         14
		,"MapInitLat":   -33.448809
		,"MapInitLong":  149.555024
		,"Comment": "live check"
		});
	
	//Circuit de Spa-Francorchamps
	aRefPoints[904625875] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        50.430342
		,"refLong":      5.976448
		,"rotation":     -2.45
		,"cor_r_Long":   30000000
		,"cor_r_Lat":    40000000
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Circuit de Spa-Francorchamps"
		,"Zoom":         15
		,"MapInitLat":   50.437254
		,"MapInitLong":  5.970570
		,"Comment": "live check"
		});
	//Greenwood Karting Circuit - Kart track of Spa-Franchorchamps
	aRefPoints[-1160443077] = CopyObjectWithModifications(aRefPoints[904625875], {"Name": "Greenwood Karting Circuit"});
		
	//Circuit de Barcelona-Catalunya GP
	aRefPoints[521933422] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        41.569355
		,"refLong":      2.258060
		,"rotation":     58.1
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Circuit de Barcelona-Catalunya GP"
		,"Name2":	 "Circuit de Barcelona-Catalunya Grand Prix"	//"mTrackLocation":"Circuit de Barcelona-Catalunya","mTrackVariation":"Grand Prix"
		,"Zoom":         15
		,"MapInitLat":   41.569612
		,"MapInitLong":  2.257745
		,"Comment": "live check"
		});
	//Circuit de Barcelona-Catalunya Club
	aRefPoints[-1042928898] = CopyObjectWithModifications(aRefPoints[521933422], {"Name": "Circuit de Barcelona-Catalunya Club","Name2": ""});
	//Circuit de Barcelona-Catalunya National
	aRefPoints[-998191994] = CopyObjectWithModifications(aRefPoints[521933422], {"Name": "Circuit de Barcelona-Catalunya National","Name2": ""});

	//Imola
	aRefPoints[920145926] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        44.340705
		,"refLong":      11.717190
		,"rotation":     -1.9
		,"cor_r_Long":   -20000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Imola"
		,"Name2":	 "Imola Grand Prix"	//"mTrackLocation":"Imola","mTrackVariation":"Grand Prix"
		,"Zoom":         15
		,"MapInitLat":   44.341112
		,"MapInitLong":  11.712506
		,"Comment": "live check"
		});
	
	//Willow Springs International Raceway
	aRefPoints[-103312908] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        34.871624
		,"refLong":      -118.263848
		,"rotation":     -32.8
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.97
		,"cor_PosY_mul": 0.97
		,"Name":         "Willow Springs International Raceway"
		,"Zoom":         15
		,"MapInitLat":   34.872929
		,"MapInitLong":  -118.264394
		,"Comment": "live check, small discrepancies"
		});
	//Willow Springs Horse Thief Mile
	aRefPoints[-1849531562] = CopyObjectWithModifications(aRefPoints[-103312908], 
		{
		"rotation":     -33.3
		,"cor_PosX_mul": 0.97
		,"cor_PosY_mul": 0.985
		,"Name": "Willow Springs Horse Thief Mile"
		,"MapInitLat":   34.878537
		,"MapInitLong":  -118.264290
		,"Comment": "live check"
		});

	//Watkins Glen GP
	aRefPoints[-1785781495] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        42.329767
		,"refLong":      -76.920975
		,"rotation":     -178.4
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1.062
		,"cor_PosY_mul": 1.065
		,"Name":         "Watkins Glen GP"
		,"Name2":	 "Watkins Glen International Grand Prix"	//"mTrackLocation":"Watkins Glen International","mTrackVariation":"Grand Prix"
		,"Zoom":         15
		,"MapInitLat":   42.336564
		,"MapInitLong":  -76.924519
		,"Comment": "live check"
		});
	//Watkins Glen Short
	aRefPoints[1590386668] = CopyObjectWithModifications(aRefPoints[-1785781495], {"Name": "Watkins Glen Short","Name2": "Watkins Glen International Short Circuit"});	//"mTrackLocation":"Watkins Glen International","mTrackVariation":"Short Circuit"

	//Autodromo Nazionale Monza GP
	aRefPoints[-52972612] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        45.619146
		,"refLong":      9.280608
		,"rotation":     0
		,"cor_r_Long":   25000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Autodromo Nazionale Monza GP"
		,"Name2":	 "Autodromo Nazionale Monza Grand Prix"	//"mTrackLocation":"Autodromo Nazionale Monza","mTrackVariation":"Grand Prix"
		,"Zoom":         15
		,"MapInitLat":   45.621690
		,"MapInitLong":  9.286990
		,"Comment": "live check"
		});
	
	//Autodromo Nazionale Monza Short
	aRefPoints[368740158] = CopyObjectWithModifications(aRefPoints[-52972612], {"Name": "Autodromo Nazionale Monza Short","Name2": ""});
	
	//// fictional tracks
	//Azure Coast
	aRefPoints[560711985] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Azure Coast"
		,"Name2":	"Azure Coast Eastbound"
		,"Comment": 	"fictional track"
        });
	//Azure Coast Westbound
	aRefPoints[-1936790504] = CopyObjectWithModifications(aRefPoints[560711985], {"Name": "Azure Coast Westbound","Name2": ""});
	//Azure Coast Stage 1
	aRefPoints[550129415] = CopyObjectWithModifications(aRefPoints[560711985], {"Name": "Azure Coast Stage 1","Name2": ""});
	//Azure Coast Stage 2
	aRefPoints[-780879576] = CopyObjectWithModifications(aRefPoints[560711985], {"Name": "Azure Coast Stage 2","Name2": ""});
	//Azure Coast Stage 3
	aRefPoints[-1737261125] = CopyObjectWithModifications(aRefPoints[560711985], {"Name": "Azure Coast Stage 3","Name2": ""});
	
							
	//California Highway Full
	aRefPoints[-1593944167] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "California Highway Full"
		,"Comment": 	"fictional track"
        });
	//California Highway Reverse
	aRefPoints[928006536] = CopyObjectWithModifications(aRefPoints[-1593944167], {"Name": "California Highway Reverse"});
	//California Highway Stage 1
	aRefPoints[1676943041] = CopyObjectWithModifications(aRefPoints[-1593944167], {"Name": "California Highway Stage 1"});
	//California Highway Stage 2
	aRefPoints[940391868] = CopyObjectWithModifications(aRefPoints[-1593944167], {"Name": "California Highway Stage 2"});
	//California Highway Stage 3
	aRefPoints[-331502851] = CopyObjectWithModifications(aRefPoints[-1593944167], {"Name": "California Highway Stage 3"});
		
	//Sakitto GP
	aRefPoints[-1759743046] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Sakitto GP"
		,"Name2":	"Sakitto Grand Prix"
		,"Comment": 	"fictional track"
        });
	//Sakitto International
	aRefPoints[-1474170192] = CopyObjectWithModifications(aRefPoints[-1759743046], {"Name": "Sakitto International","Name2": ""});
	//Sakitto Sakitto National
	aRefPoints[-1260826266] = CopyObjectWithModifications(aRefPoints[-1759743046], {"Name": "Sakitto National","Name2": ""});
	//Sakitto Sprint
	aRefPoints[-879282119] = CopyObjectWithModifications(aRefPoints[-1759743046], {"Name": "Sakitto Sprint","Name2": ""});
	
	//Mojave Cougar Ridge 
	aRefPoints[-688586697] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Mojave Cougar Ridge"
		,"Comment": 	"fictional track"
        });
        //Mojave Boa Ascent
	aRefPoints[850003838] = CopyObjectWithModifications(aRefPoints[-688586697], {"Name": "Mojave Boa Ascent"});
	//Mojave Gila Crest
	aRefPoints[2089801285] = CopyObjectWithModifications(aRefPoints[-688586697], {"Name": "Mojave Gila Crest"});
	//Mojave Coyote Noose
	aRefPoints[-2125682335] = CopyObjectWithModifications(aRefPoints[-688586697], {"Name": "Mojave Coyote Noose"});
	//Mojave Sidewinder
	aRefPoints[-1463443929] = CopyObjectWithModifications(aRefPoints[-688586697], {"Name": "Mojave Sidewinder"});
	//Mojave Test Track - only in Game API available, because you cannot play it in Multiplayer, it has no TrackID -> works only in CREST Mode
	aRefPoints[-1] = CopyObjectWithModifications(aRefPoints[-688586697], {"Name": "Mojave Test Track"});
	
	//Bannochbrae Road Circuit 
	aRefPoints[-602684269] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Bannochbrae Road Circuit"
		,"Comment": 	"fictional track"
        });
	
	//// fictional Kart tracks	
	//Summerton
	aRefPoints[-44748320] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Summerton"
		,"Name2":	"Summerton International"	//"mTrackLocation":"Summerton","mTrackVariation":"International"
		,"Comment":	"Kart Track?"
        });
	//Summerton National
	aRefPoints[1408845203] = CopyObjectWithModifications(aRefPoints[-44748320], {"Name": "Summerton National","Name2": ""});
	//Summerton Sprint
	aRefPoints[-1605913568] = CopyObjectWithModifications(aRefPoints[-44748320], {"Name": "Summerton Sprint","Name2": ""});
		
	//Chesterfield
	aRefPoints[-1735912413] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Chesterfield"
		,"Name2":	"Chesterfield Grand Prix"	//"mTrackLocation":"Chesterfield","mTrackVariation":"Grand Prix"
		,"Comment": 	"Kart Track"
        });
		
	//Glencairn
	aRefPoints[-1066742780] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Glencairn"
		,"Name2":	"Glencairn Grand Prix"	//"mTrackLocation":"Glencairn","mTrackVariation":"Grand Prix"
		,"Comment": 	"Kart Track"
        });
	//Glencairn Reverse
	aRefPoints[-1520844580] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn Reverse","Name2": "Glencairn GP Reverese"});	//"mTrackLocation":"Glencairn","mTrackVariation":"GP Reverese"
	//Glencairn East
	aRefPoints[766599953] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn East","Name2": ""});
	//Glencairn East Reverse
	aRefPoints[-446794969] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn East Reverse","Name2": ""});
	//Glencairn West
	aRefPoints[-1408779593] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn West","Name2": ""});
	//Glencairn West Reverse
	aRefPoints[-913625358] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn West Reverse","Name2": ""});
	
	
	//// Historic Tracks
	//Rouen Les Essarts
	aRefPoints[-1031249929] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        49.333052
		,"refLong":      1.010787
		,"rotation":     55.5
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1.04
		,"Name":         "Rouen Les Essarts"
		,"Zoom":         14
		,"MapInitLat":   49.333581
		,"MapInitLong":  1.004589
		,"Comment": "live check"
		});
	//Rouen Les Essarts Short
	aRefPoints[-1515473908] = CopyObjectWithModifications(aRefPoints[-1031249929], {"Name": "Rouen Les Essarts Short"});
	
	//Hockenheim Classic - copy of Hockenheim GP
	aRefPoints[1552853772] = CopyObjectWithModifications(aRefPoints[1695182971], {"Name": "Hockenheim Classic","Name2": ""});
	
	//Silverstone Classic - copy of Silverstone GP
	aRefPoints[-1194290828] = CopyObjectWithModifications(aRefPoints[1641471184], {"Name": "Silverstone Classic","Name2": ""});
	
	

///////////////////////////////////////////////////////////////////////////	
	//console.log("Refpoints: "  , aRefPoints);	
	
	if (circuit_id == undefined)
	{
		// no paramter given -> set to an default value to prevent empty return value
		console.log ("Circuit_id NOT set, change to default!");
		this.circuit_id = 9999999999;

	}
	
	//console.log ("+++ RefPoints: " , aRefPoints);
	//console.log ("++ used  CuircitID: " + this.circuit_id );

	// set values for the object	
	this.Lat 	= aRefPoints[this.circuit_id]["refLat"];
	this.Long 	= aRefPoints[this.circuit_id]["refLong"];
	this.Rot     	= aRefPoints[this.circuit_id]["rotation"];

	// todo: can you not also call the function GetCuircitnameByTrackID here?
/*
	return {
			 "refLat": 	aRefPoints[this.circuit_id]["refLat"]
			,"refLong":	aRefPoints[this.circuit_id]["refLong"]
			,"rotation":    aRefPoints[this.circuit_id]["rotation"]
			,"cor_r":	aRefPoints[this.circuit_id]["cor_r"] 
			,"Name":        aRefPoints[this.circuit_id]["Name"]
			,"Zoom":	aRefPoints[this.circuit_id]["Zoom"]
			,"MapInitLat":	aRefPoints[this.circuit_id]["MapInitLat"]
        		,"MapInitLong":	aRefPoints[this.circuit_id]["MapInitLong"]	
		};
*/

	// todo: normal we have to return "this" as the object, not the array
	return aRefPoints;
	/////////////////////// function of this object


}

function GetRefPoint(circuit_id){

	return ( this.Lat, this.Long, this.Rot );
}

//function GetAllRefPoints()
//{
//
//	console.log("++ call function GetAllRefPoints");
//	return aRefPoints; 
//}

function GetCircuitnameByTrackID (circuit_id)
{
	if ( aRefPoints[circuit_id] ){
		return aRefPoints[circuit_id]["Name"];
	}
	else{
		return "not defined";
	}
}

// todo: use a function to copy cuircit variantions from one object to another
function CopyObjectWithModifications(source, changes )
{
	var dest = {};
        dest =  JSON.parse( JSON.stringify( source  ) );

//	console.log("CopyObject(): ", changes)
	for (var key in changes)
	{
		//console.log("Object Dest: " , dest["Name"]);
		//console.log("key: " + key + "   value: " + changes[key]);
		dest[key] = changes[key];
	}

	return JSON.parse( JSON.stringify( dest ) );	
}

Refpoint.prototype.GetRefPoint=GetRefPoint;
Refpoint.prototype.GetCircuitnameByTrackID=GetCircuitnameByTrackID;
Refpoint.prototype.CopyObjectWithModifications=CopyObjectWithModifications;
///Refpoint.prototype.GetAllRefPoints=GetAllRefPoints;
