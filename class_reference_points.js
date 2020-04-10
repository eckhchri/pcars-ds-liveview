/// Reference Object
// CLASS of RefPoints
function Refpoint(circuit_id)
{

//	console.log ("RefPoint - Parameter: " , circuit_id);
	this.circuit_id 	= 	circuit_id;
	this.Lat			=	undefined;
	this.Long			=	undefined;
	this.Rot			=	undefined;
	this.cuircit_name	=	undefined;
	this.aRPs			=	undefined;   // object refpoints
    this.gameName		=	'PCARS1&2';    
	var aRefPoints = new Array();

	//static information
	
	//Default
	aRefPoints[9999999999] = new Array();
    aRefPoints[9999999999] =
    	{
       	"refLat":        51.500657			// GPS coords of the zero point, where X=0 and Z=0
    	,"refLong":      -0.071587			
    	,"rotation":     0				// rotation correction angle in degree anticlockwise, negative value means clockwise
    	,"cor_r_Long":   0				// earth radius correction value for east/west calculation in millimeter
		,"cor_r_Lat":    0				// earth radius correction value for north/south calculation in millimeter
		,"cor_PosX_mul": 1				// correction multiplier for PosX on input data before calculation / the multipliers have a similar result as the cor_r_xxx values, but help better for tracks with a rotation error
		,"cor_PosY_mul": 1				// correction multiplier for PosY on input data before calculation
		,"Name":         "Slightly Mad Studios Ltd"	// real name of the circuit in DS API
		//,"Name2":	 ""					// real name of the circuit in Game API, if it differs from DS API Name
		,"AltNames":""					// a csv list of additonal names in several APIs CREST1/CREST2/shared memory ...
        ,"Zoom":         19				// wanted zoom level for initial google map
        ,"MapInitLat":   51.500657		// google map initialization coords
        ,"MapInitLong":  -0.071587	
		,"fictional":	 false
	   	,"Comment": "Default"
	   	,"game_name": 	this.gameName
    	};
        
        //Default for idle DS server
        aRefPoints[0] = CopyObjectWithModifications(aRefPoints[9999999999],{});
        
        //Default for fictional tracks
        aRefPoints[8888888888] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        40.997664
                ,"refLong":      -113.566253
                ,"Name":         "Salt Lake USA"
                ,"Zoom":         15
                ,"MapInitLat":   40.997664
                ,"MapInitLong":  -113.566253
		,"fictional":	 true
                ,"Comment": "Default for fictional tracks"
                });
	
	//Hockenheim GP
        aRefPoints[1695182971] = CopyObjectWithModifications(aRefPoints[9999999999],
        	{
                "refLat":	 49.329747	//49.329738
                ,"refLong":      8.574295
                ,"rotation":     0.3	//0.35
                ,"cor_r_Long":   0	//30000000
		,"cor_r_Lat":	 0
		,"cor_PosX_mul": 0.9965
		,"cor_PosY_mul": 1.001
                ,"Name":         "Hockenheim GP"
                ,"Name2":	 ""	
                ,"AltNames":	 "Hockenheimring Grand Prix"	// a csv list of additonal/alternative names from several APIs CREST1/CREST2/shared memory ...  //"mTrackLocation":"Hockenheimring","mTrackVariation":"Grand Prix"
                ,"Zoom":         16
                ,"MapInitLat":   49.329718
                ,"MapInitLong":  8.574300
                ,"Comment": "finished" 
        	});
	//Hockenheim Short
	aRefPoints[1768660198] = CopyObjectWithModifications(aRefPoints[1695182971],
		{
		"Name":		"Hockenheim Short"
		,"Name2":	""
		,"AltNames": 	"Hockenheimring Short"
		,"MapInitLat":	49.328991
		,"MapInitLong":	8.568469
		});
	//Hockenheim National
	aRefPoints[-1977142985] = CopyObjectWithModifications(aRefPoints[1695182971],
		{
		"Name":		"Hockenheim National"
		,"Name2":	""
		,"AltNames": 	"Hockenheimring National"
		,"MapInitLat":	49.329796
		,"MapInitLong":	8.571180
		});
	//Hockenheim Rallycross
	aRefPoints[761864750] = CopyObjectWithModifications(aRefPoints[1695182971],
		{
		"Name":		"Hockenheim Rallycross"
		,"Name2":	""			
		,"AltNames": 	"Hockenheim Short,Hockenheimring Short"	//"mTrackLocation":"Hockenheim","mTrackVariation":"Short"   - Bug in Shared Memory
		,"Zoom":        17
		,"MapInitLat":	49.327088
		,"MapInitLong":	8.569002
		,"Comment": "initially added"
		});

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
		,"Name2":	 ""
		,"AltNames":	 "Dubai_Autodrome GP,Dubai Autodrome Grand Prix"	//"mTrackLocation":"Dubai Autodrome","mTrackVariation":"Grand Prix"
		,"Zoom":         17
	    ,"MapInitLat":   25.050102
		,"MapInitLong":  55.238634
	    ,"Comment": "live check"
		});

	///Dubai Autodrome International
	aRefPoints[-710712693] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Autodrome International","Name2": "","AltNames":"Dubai_Autodrome International"});
	//Dubai Kartdrome
	aRefPoints[-232513374] = CopyObjectWithModifications(aRefPoints[-661887517],
		{
		"refLat":        25.046665
		,"refLong":      55.231300
		,"rotation":     -0.5
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1.003
		,"cor_PosY_mul": 1.006
		,"Name":         "Dubai Kartdrome"
		,"Name2":        ""
		,"AltNames":	 "Dubai Autodrome Kartdrome,Dubai_Kartdrome International,Dubai Kartdrome International"
		,"Zoom":         18
		,"MapInitLat":   25.044820
		,"MapInitLong":  55.239235
		,"Comment": "finished, small discrepancies"
		});
	//Dubai Autodrome National
	aRefPoints[-31727447] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Autodrome National","Name2": "","AltNames":"Dubai_Autodrome National","MapInitLat": 25.049904,"MapInitLong": 55.236955});
	//Dubai Autodrome Club
	aRefPoints[1735854797] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Autodrome Club","Name2": "","AltNames":"Dubai_Autodrome Club","MapInitLat": 25.049058,"MapInitLong": 55.236882});

	//Nuerburgring GP
    aRefPoints[-945967394] = CopyObjectWithModifications(aRefPoints[9999999999],
        {
        "refLat":        50.332743	//50.332733 
    	,"refLong":      6.943395	//6.943355
        ,"rotation":     -0.35	//-0.9 
        ,"cor_r_Long":   0	//30000000
		,"cor_r_Lat":    0	//-30000000 
		,"cor_PosX_mul": 1.005	//1
		,"cor_PosY_mul": 0.9985	//1
        ,"Name":         "Nürburgring GP"
        ,"Name2":	 ""
		,"AltNames":	 "Nürburgring Grand Prix,Nurburgring GP"	//"mTrackLocation":"Nürburgring","mTrackVariation":"Grand Prix"
        ,"Zoom":         15
    	,"MapInitLat":   50.332154
        ,"MapInitLong":  6.940467
        ,"Comment": "finished, small discrepancies"
    	});
	//Nuerburgring Sprint Short
	aRefPoints[-810715843] = CopyObjectWithModifications(aRefPoints[-945967394],
		{
		"Name":		"Nürburgring Sprint Short"
		,"Name2":	""
		,"AltNames":	"Nurburgring Sprint_Short"
		,"Zoom":	16
		,"MapInitLat":	50.333628
		,"MapInitLong":	6.943330
		});
	//Nuerburgring Sprint
	aRefPoints[-709737101] = CopyObjectWithModifications(aRefPoints[-945967394],
		{
		"Name":		"Nürburgring Sprint"
		,"Name2":	""
		,"AltNames":	"Nurburgring Sprint"
		,"Zoom":	16
		,"MapInitLat":	50.333628
		,"MapInitLong":	6.943330
		});
	//Nuerburgring Muellenbach
	aRefPoints[-246966400] = CopyObjectWithModifications(aRefPoints[-945967394],
		{
		"Name":		"Nürburgring Müllenbach"
		,"Name2":	""
		,"AltNames":	"Nürburgring MuellenBach,Nurburgring MuellenBach"     //"mTrackLocation":"Nürburgring","mTrackVariation":"MuellenBach"
		,"Zoom":	17
		,"MapInitLat":	50.326304
		,"MapInitLong":	6.937391
		});

	//Nürburgring Nordschleife
        aRefPoints[697498609] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        50.332733
                ,"refLong":      6.943385
                ,"rotation":     -0.9
                ,"cor_r_Long":   10000000
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Nürburgring Nordschleife"
                ,"Name2":	 ""
		,"AltNames":	 "Nordschleife Full,Nurburgring Nordschleife"	//"mTrackLocation":"Nordschleife","mTrackVariation":"Full"
                ,"Zoom":         13
                ,"MapInitLat":   50.359101
                ,"MapInitLong":  6.962529
                ,"Comment": "live check, big discrepancies on some parts of track"
                });
	//Nürburgring Nordschleife Stage 3
	aRefPoints[1128950148] = CopyObjectWithModifications(aRefPoints[697498609], {"Name": "Nürburgring Nordschleife Stage 3","Name2": "","AltNames":"Nordschleife Stage 3,Nurburgring Nordschleife_Stage3","Zoom": 14,"MapInitLat": 50.358962,"MapInitLong": 6.980983});
	//Nürburgring Nordschleife Stage 1
	aRefPoints[1459212514] = CopyObjectWithModifications(aRefPoints[697498609], {"Name": "Nürburgring Nordschleife Stage 1","Name2": "","AltNames":"Nordschleife Stage 1,Nurburgring Nordschleife_Stage1","Zoom": 14,"MapInitLat": 50.354770,"MapInitLong": 6.944798});
	//Nürburgring Nordschleife Stage 2
	aRefPoints[-300387291] = CopyObjectWithModifications(aRefPoints[697498609], {"Name": "Nürburgring Nordschleife Stage 2","Name2": "","AltNames":"Nordschleife Stage 2,Nurburgring Nordschleife_Stage2","Zoom": 15,"MapInitLat": 50.372702,"MapInitLong": 6.959640});
	
	//Nürburgring Combined
	aRefPoints[-891514248] = CopyObjectWithModifications(aRefPoints[697498609], {"Name": "Nürburgring Combined","Name2": "","AltNames":"Nurburgring Combined","MapInitLat": 50.355101});
	
	//Sonoma Raceway
        aRefPoints[-1454279631] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
		"refLat":        38.162520	//38.162514
		,"refLong":      -122.457175	//-122.457216
		,"rotation":     141.5	//142
		,"cor_r_Long":   0	//10000000
		,"cor_r_Lat":    0	//-30000000
		,"cor_PosX_mul": 1.004	//1
		,"cor_PosY_mul": 0.99	//0.97
                ,"Name":         "Sonoma Raceway GP"
                ,"Name2":	 ""
		,"AltNames":	 "Sonoma Raceway Grand Prix,Sonoma_Raceway GP"	//"mTrackLocation":"Sonoma Raceway","mTrackVariation":"Grand Prix"
                ,"Zoom":         16
		,"MapInitLat":   38.162600
		,"MapInitLong":  -122.457415
                ,"Comment": "finished, not perfect in Turn 1, but not better possible"
                });
        //Sonoma Raceway National
	aRefPoints[-995202729] = CopyObjectWithModifications(aRefPoints[-1454279631],
		{
		"Name":		 "Sonoma Raceway National"
		,"Name2":	 ""
		,"AltNames":	 "Sonoma_Raceway National"
		,"Zoom":         16
		,"MapInitLat":   38.163366
		,"MapInitLong":  -122.457876
		});
	//Sonoma Sonoma Raceway Short
	aRefPoints[1035110721] = CopyObjectWithModifications(aRefPoints[-1454279631], {"Name": "Sonoma Raceway Short","Name2": "","AltNames":"Sonoma_Raceway Short"});

	//24 Hours of Le Mans Circuit
        aRefPoints[1740968730] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        47.939065
                ,"refLong":      0.218178
                ,"rotation":     1.6
                ,"cor_r_Long":   25000000
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "24 Hours of Le Mans Circuit"
                ,"Name2":	 ""
		,"AltNames":	 "Le Mans Circuit des 24 Heures du Mans,Le_Mans 24_Hours_of_Le_Mans_Circuit,Le Mans 24 Hours of Le Mans Circuit"	//"mTrackLocation":"Le Mans","mTrackVariation":"Circuit des 24 Heures du Mans"
                ,"Zoom":         13
                ,"MapInitLat":   47.936818 
                ,"MapInitLong":  0.223960
                ,"Comment": "live check"
                });
        //Le Mans Bugatti Circuit
	aRefPoints[-1027934689] = CopyObjectWithModifications(aRefPoints[1740968730], {"Name": "Le Mans Bugatti Circuit","Name2": "","AltNames":"Le Mans Le Circuit Bugatti,Le_Mans Le_Mans_Bugatti_Circuit,Le Mans Le Mans Bugatti Circuit","Zoom": 15,"MapInitLat": 47.954335,"MapInitLong": 0.211027});	//"mTrackLocation":"Le Mans","mTrackVariation":"Le Circuit Bugatti"
	//Le Mans International Karting Circuit
	aRefPoints[1457129528] = CopyObjectWithModifications(aRefPoints[1740968730], {"Name": "Le Mans International Karting Circuit","Name2": "","AltNames":"Le_Mans_Kart_Int Le_Mans_International_Karting_Circuit,Le Mans Karting International Le Mans International Karting Circuit","Zoom": 17,"MapInitLat": 47.942512,"MapInitLong": 0.212322,"Comment": "initially added"});	//"mTrackLocation":"Le Mans Karting International","mTrackVariation":"Le Mans International Karting Circuit"
	//Le Mans Vintage Track
	aRefPoints[167552033] = CopyObjectWithModifications(aRefPoints[1740968730], {"Name": "Le Mans Vintage Track","Name2": "","AltNames":"","Comment": "initially added"});	
	
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
                ,"Name2":	 ""
		,"AltNames":	 "Ruapuna Park Grand Prix,Ruapuna_Park GP"	//"mTrackLocation":"Ruapuna Park","mTrackVariation":"Grand Prix"
                ,"Zoom":         17
                ,"MapInitLat":   -43.530723 
                ,"MapInitLong":  172.479408
                ,"Comment": "live check"
                });
        //Ruapuna Park A Circuit
	aRefPoints[619694160] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park A Circuit","Name2": "","AltNames":"Ruapuna Park A_Circuit,Ruapuna_Park A_Circuit","Zoom": 18,"MapInitLat": -43.531735,"MapInitLong": 172.482294});	//"mTrackLocation":"Ruapuna Park","mTrackVariation":"A_Circuit"
        //Ruapuna Park Club
	aRefPoints[1446378877] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park Club","Name2": "","AltNames":"Ruapuna_Park Club"});
	//Ruapuna Park Outer Loop
	aRefPoints[1940584155] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park Outer Loop","Name2": "","AltNames":"Ruapuna Park Outer_Loop,Ruapuna_Park Outer_Loop"});	//"mTrackLocation":"Ruapuna Park","mTrackVariation":"Outer_Loop"
	//Ruapuna Park B Circuit
	aRefPoints[-2046633090] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park B Circuit","Name2": "","AltNames":"Ruapuna Park B_Circuit,Ruapuna_Park B_Circuit","MapInitLat": -43.530846,"MapInitLong": 172.477963});	//"mTrackLocation":"Ruapuna Park","mTrackVariation":"B_Circuit"
        
        //Cadwell Park GP
        aRefPoints[1876749797] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        53.310651
                ,"refLong":      -0.059440
                ,"rotation":     0
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    -30000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Cadwell Park GP"
                ,"Name2":	 ""
		,"AltNames":	 "Cadwell Grand Prix,Cadwell GP,Cadwell Park Grand Prix"	//"mTrackLocation":"Cadwell","mTrackVariation":"Grand Prix"
                ,"Zoom":         16
                ,"MapInitLat":   53.308865 
                ,"MapInitLong":  -0.063534
                ,"Comment": "live check"
                });
        //Cadwell Park Club
	aRefPoints[328972919] = CopyObjectWithModifications(aRefPoints[1876749797], {"Name": "Cadwell Park Club","Name2": "","AltNames":"Cadwell Club Circuit,Cadwell Club","MapInitLat": 53.307580,"MapInitLong": -0.064940});
	//Cadwell Park Woodland
	aRefPoints[-1408189041] = CopyObjectWithModifications(aRefPoints[1876749797], {"Name": "Cadwell Park Woodland","Name2": "","AltNames":"Cadwell Woodland,Cadwell_Park Woodland","MapInitLat": 53.310549,"MapInitLong": -0.059425});
        
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
		,"AltNames":	 "Oulton_Park International"
                ,"Zoom":         15
                ,"MapInitLat":   53.176808 
                ,"MapInitLong":  -2.616589
                ,"Comment": "live check"
                });
        //Oulton Park Fosters
	aRefPoints[-2021024495] = CopyObjectWithModifications(aRefPoints[545979690], {"Name": "Oulton Park Fosters","AltNames":"Oulton_Park Fosters","Zoom": 16,"MapInitLat": 53.179448,"MapInitLong": -2.616137});
	//Oulton Park Island
	aRefPoints[-1877699523] = CopyObjectWithModifications(aRefPoints[545979690], {"Name": "Oulton Park Island","AltNames":"Oulton_Park Island"});
        
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
                ,"Name2":	 ""
		,"AltNames":	 "Snetterton 300 Circuit,Snetterton 300_Circuit"	//"mTrackLocation":"Snetterton","mTrackVariation":"300 Circuit"
                ,"Zoom":         16
                ,"MapInitLat":   52.465021 
                ,"MapInitLong":  0.947079
                ,"Comment": "live check"
                });
        //Snetterton 200
	aRefPoints[1058872832] = CopyObjectWithModifications(aRefPoints[1508903068], {"Name": "Snetterton 200","Name2": "","AltNames":"Snetterton 200 Circuit,Snetterton 200_Circuit"});	//"mTrackLocation":"Snetterton","mTrackVariation":"200 Circuit"
	//Snetterton 100
	aRefPoints[-867340010] = CopyObjectWithModifications(aRefPoints[1508903068], {"Name": "Snetterton 100","Name2": "","AltNames":"Snetterton 100 Circuit,Snetterton 100_Circuit","Zoom": 17,"MapInitLat": 52.464866,"MapInitLong": 0.942489});	//"mTrackLocation":"Snetterton","mTrackVariation":"100 Circuit"
        
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
		,"AltNames":	 "Zhuhai International_Circuit"
                ,"Zoom":         16
                ,"MapInitLat":   22.367588 
                ,"MapInitLong":  113.556162
                ,"Comment": "live check"
                });
                
	//Silverstone GP
	aRefPoints[1641471184] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":	52.078790      //52.078807
		,"refLong":	-1.015293
		,"rotation":	-0.2
		,"cor_r_Long":	20000000
		,"cor_r_Lat":	0
		,"cor_PosX_mul":1
		,"cor_PosY_mul":1
		,"Name":	"Silverstone GP"
		,"Name2":	""
		,"AltNames":	"Silverstone Grand Prix"       //"mTrackLocation":"Silverstone","mTrackVariation":"Grand Prix"
		,"Zoom":	15
		,"MapInitLat":	52.071727
		,"MapInitLong":	-1.015736
		,"Comment":	"finished, small discrepencies"
		});
	//Silverstone International
	aRefPoints[1101719627] = CopyObjectWithModifications(aRefPoints[1641471184],
		{
		"Name":		"Silverstone International"
		,"Name2":	""
		,"AltNames":	"Silverstone Int"
		,"Zoom":         16
		,"MapInitLat":   52.068110
		,"MapInitLong":  -1.016541
		});
	//Silverstone Stowe
	aRefPoints[1600840139] = CopyObjectWithModifications(aRefPoints[1641471184],
		{
		"Name":		"Silverstone Stowe"
		,"Name2":	""
		,"AltNames":	"Silverstone Nat"
		,"Zoom":         17
		,"MapInitLat":   52.068230
		,"MapInitLong":  -1.018023
		});
	//Silverstone National
	aRefPoints[1952936927] = CopyObjectWithModifications(aRefPoints[1641471184],
		{
		"Name":		"Silverstone National"
		,"Name2":	""
		,"AltNames":	""
		,"Zoom":         16
		,"MapInitLat":   52.075955
		,"MapInitLong":  -1.014935
		});
        
        //Brands Hatch GP
        aRefPoints[1988984740] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
		"refLat":        51.357200	//51.357240
		,"refLong":      0.261632	//0.261592
		,"rotation":     -0.5	//0
		,"cor_r_Long":   -10000000
		,"cor_r_Lat":    10000000	//20000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Brands Hatch GP"
                ,"Name2":	 ""
		,"AltNames":	 "Brands Hatch Grand Prix,Brands_Hatch GP"	//"mTrackLocation":"Brands Hatch","mTrackVariation":"Grand Prix"
                ,"Zoom":         16
                ,"MapInitLat":   51.356786 
                ,"MapInitLong":  0.262930
                ,"Comment": "finished"
                });
        //Brands Hatch Indy
	aRefPoints[1300627020] = CopyObjectWithModifications(aRefPoints[1988984740], 
	{
		"Name":         "Brands Hatch Indy"
		,"Name2":       ""
		,"AltNames":	"Brands_Hatch Indy"
		,"Zoom":        17
		,"MapInitLat":   51.359090
		,"MapInitLong":  0.260612
	});
   
	   //Classic Brands Hatch Rallycross
    aRefPoints[-2055158240] = CopyObjectWithModifications(aRefPoints[1988984740], 
	{
		"Name":         "Classic Brands Hatch Rallycross"
		,"Name2":       ""
	    	,"AltNames":	"Brands_Hatch Rallycross,Brands Hatch Rallycross"
		,"Zoom":        17
		,"MapInitLat":   51.359384
		,"MapInitLong":  0.261653
		,"Comment": "live check, new from FUN DLC 12/2017"
	});
	
	
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
		,"AltNames":	 "Laguna_Seca,Laguna Seca"
                ,"Zoom":         16
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
                ,"Name":         "Brno GP"
		,"AltNames":	 "Brno,Brno Grand Prix"
                ,"Zoom":         16
                ,"MapInitLat":   49.205370 
                ,"MapInitLong":  16.452067
                ,"Comment": "live check"
                });
                
        //Road America
        aRefPoints[-660300766] = CopyObjectWithModifications(aRefPoints[9999999999],
                {
                "refLat":        43.798330	//43.798290
                ,"refLong":      -87.995239
                ,"rotation":     0
                ,"cor_r_Long":   30000000
                ,"cor_r_Lat":    0	//10000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 0.99	//1
                ,"Name":         "Road America"
		,"AltNames":	 "Road_America"
                ,"Zoom":         15
                ,"MapInitLat":   43.798710 
                ,"MapInitLong":  -87.995182
                ,"Comment": "finished, but some discrepencies which are not solvable"
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
                ,"Name2":	 ""
		,"AltNames":	 "Zolder Grand Prix,Zolder GP"	//"mTrackLocation":"Zolder","mTrackVariation":"Grand Prix"
                ,"Zoom":         15
                ,"MapInitLat":   50.990644 
                ,"MapInitLong":  5.257656
                ,"Comment": "live check"
                });
        
	//Donington Park GP
	aRefPoints[354022214] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        52.830615
		,"refLong":      -1.374732
		,"rotation":     174
		,"cor_r_Long":   10000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Donington Park GP"
		,"Name2":	 ""
		,"AltNames":	 "Donington Park Grand Prix,Donington_Park GP"	//"mTrackLocation":"Donington Park","mTrackVariation":"Grand Prix"
		,"Zoom":         16
		,"MapInitLat":   52.830756
		,"MapInitLong":  -1.375103
		,"Comment": "live check"
		});
	//Donington Park National
	aRefPoints[-1194019375] = CopyObjectWithModifications(aRefPoints[354022214], {"Name": "Donington Park National","Name2": "","AltNames":"Donington_Park National"});


	//Oschersleben A Course
	aRefPoints[-1194185720] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        52.027834
		,"refLong":      11.280251
		,"rotation":     161.8
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1.003
		,"cor_PosY_mul": 1
		,"Name":         "Oschersleben A Course"
		,"Name2":	 ""
		,"AltNames":	 "Oschersleben Grand Prix,Oschersleben A_Course"	//"mTrackLocation":"Oschersleben","mTrackVariation":"Grand Prix"
		,"Zoom":         16
		,"MapInitLat":   52.028843
		,"MapInitLong":  11.276850
		,"Comment": "live check"
		});
	//Oschersleben B Course
	aRefPoints[816601966] = CopyObjectWithModifications(aRefPoints[-1194185720], {"Name": "Oschersleben B Course","Name2": "","AltNames":"Oschersleben National,Oschersleben B_Course","Zoom": 17,"MapInitLat": 52.028035,"MapInitLong": 11.278875});
	//Oschersleben C Course
	aRefPoints[-1359299594] = CopyObjectWithModifications(aRefPoints[-1194185720], {"Name": "Oschersleben C Course","Name2": "","AltNames":"Oschersleben C Circuit,Oschersleben C_Course","Zoom": 17,"MapInitLat": 52.029260,"MapInitLong": 11.271525});

	//Azure Circuit
	aRefPoints[832629329] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        43.73705
		,"refLong":      7.427395
		,"rotation":     126
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.983
		,"cor_PosY_mul": 0.985
		,"Name":         "Azure Circuit"
		,"Name2":	 ""
		,"AltNames":	 "Azure Circuit Grand Prix,Azure_Circuit GP"	//"mTrackLocation":"Azure Circuit","mTrackVariation":"Grand Prix"
		,"Zoom":         16
		,"MapInitLat":   43.737186
		,"MapInitLong":  7.425732
		,"Comment": "live check"
		});
		
	//Bathurst Mount Panorama
	aRefPoints[921120824] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        -33.439873
		,"refLong":      149.559704
		,"rotation":     -9
		,"cor_r_Long":   15000000
		,"cor_r_Lat":    15000000
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Bathurst Mount Panorama"
		,"AltNames":	 "Bathurst,Bathurst Mount_Panorama"
		,"Zoom":         15
		,"MapInitLat":   -33.448809
		,"MapInitLong":  149.555024
		,"Comment": "live check"
		});
	
	//Circuit de Spa-Francorchamps GP
	aRefPoints[904625875] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        50.430342
		,"refLong":      5.976448
		,"rotation":     -2.45
		,"cor_r_Long":   30000000
		,"cor_r_Lat":    40000000
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Circuit de Spa-Francorchamps GP"
		,"AltNames":	 "Circuit de Spa-Francorchamps,Spa_Francorchamps GP,Spa-Francorchamps Grand Prix"
		,"Zoom":         15
		,"MapInitLat":   50.436800
		,"MapInitLong":  5.970570
		,"Comment": "live check"
		});
	//Greenwood Karting Circuit - Kart track of Spa-Franchorchamps
	aRefPoints[-1160443077] = CopyObjectWithModifications(aRefPoints[904625875],
		{
		"refLat":        50.430342
		,"refLong":      5.976448
		,"rotation":     -2.45
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.99
		,"cor_PosY_mul": 1.01
		,"Name": 	 "Greenwood Karting Circuit"
		,"Name2": 	 ""
		,"AltNames":	 "Greenwood_Karting_Circuit International,Greenwood Karting Circuit International"
		,"Zoom": 	 18
		,"MapInitLat": 	 50.432285
		,"MapInitLong":  5.962968
		,"Comment": "finished, discrepancies"
		});
		
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
		,"Name2":	 ""
		,"AltNames":	 "Circuit de Barcelona-Catalunya Grand Prix,Barcelona_Catalunya GP,Barcelona-Catalunya Grand Prix"	//"mTrackLocation":"Circuit de Barcelona-Catalunya","mTrackVariation":"Grand Prix"
		,"Zoom":         16
		,"MapInitLat":   41.569512
		,"MapInitLong":  2.257745
		,"Comment": "live check"
		});
	//Circuit de Barcelona-Catalunya Club
	aRefPoints[-1042928898] = CopyObjectWithModifications(aRefPoints[521933422], {"Name": "Circuit de Barcelona-Catalunya Club","Name2": "","AltNames":"Barcelona_Catalunya Club,Barcelona-Catalunya Club","Zoom": 17,"MapInitLat": 41.566327,"MapInitLong": 2.254218});
	//Circuit de Barcelona-Catalunya National
	aRefPoints[-998191994] = CopyObjectWithModifications(aRefPoints[521933422], {"Name": "Circuit de Barcelona-Catalunya National","Name2": "","AltNames":"Barcelona_Catalunya National,Barcelona-Catalunya National","MapInitLat": 41.570355,"MapInitLong": 2.259433});	
	//Barcelona Rallycross
	aRefPoints[1828877100] = CopyObjectWithModifications(aRefPoints[521933422], {"Name": "Barcelona Rallycross","Name2": "","AltNames":"Barcelona_Catalunya Rallycross,Barcelona-Catalunya Rallycross","Zoom": 18,"MapInitLat": 41.573692,"MapInitLong": 2.261047,"Comment": "live check, new from FUN DLC 12/2017"}); //"mTrackLocation":"Barcelona-Catalunya","mTrackVariation":"Rallycross"
	

	//Autodromo Internazionale Enzo E Dino Ferrari Imola
	aRefPoints[920145926] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        44.340705
		,"refLong":      11.717190
		,"rotation":     -1.9
		,"cor_r_Long":   -20000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Autodromo Internazionale Enzo E Dino Ferrari Imola"
		,"Name2":	 ""
		,"AltNames":	 "Imola Grand Prix,Imola GP"	//"mTrackLocation":"Imola","mTrackVariation":"Grand Prix"
		,"Zoom":         16
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
		,"AltNames":	 "Willow_Springs International_Raceway,Willow Springs International_Raceway"
		,"Zoom":         16
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
		,"Name": 	 "Willow Springs Horse Thief Mile"
		,"AltNames":	 "Willow_Springs Horse_Thief_Mile"
		,"Zoom":         18
		,"MapInitLat":   34.878337
		,"MapInitLong":  -118.264290
		,"Comment": "live check"
		});

	//Watkins Glen International GP
	aRefPoints[-1785781495] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        42.329767
		,"refLong":      -76.920975
		,"rotation":     -178.4
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1.062
		,"cor_PosY_mul": 1.065
		,"Name":         "Watkins Glen International GP"
		,"Name2":	 ""
		,"AltNames":	 "Watkins Glen International Grand Prix,Watkins_Glen_International GP"	//"mTrackLocation":"Watkins Glen International","mTrackVariation":"Grand Prix"
		,"Zoom":         15
		,"MapInitLat":   42.336564
		,"MapInitLong":  -76.924519
		,"Comment": "live check"
		});
	//Watkins Glen International Short
	aRefPoints[1590386668] = CopyObjectWithModifications(aRefPoints[-1785781495], {"Name": "Watkins Glen International Short","Name2": "","AltNames":"Watkins Glen International Short Circuit,Watkins_Glen_International Short"});	//"mTrackLocation":"Watkins Glen International","mTrackVariation":"Short Circuit"

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
		,"Name2":	 ""
		,"AltNames":	 "Autodromo Nazionale Monza Grand Prix,Monza GP,Monza Grand Prix"	//"mTrackLocation":"Autodromo Nazionale Monza","mTrackVariation":"Grand Prix"
		,"Zoom":         15
		,"MapInitLat":   45.621690
		,"MapInitLong":  9.286990
		,"Comment": "live check"
		});
	
	//Autodromo Nazionale Monza Short
	aRefPoints[368740158] = CopyObjectWithModifications(aRefPoints[-52972612], {"Name": "Autodromo Nazionale Monza Short","Name2": "","AltNames":"Monza Short","Zoom": 16,"MapInitLat": 45.616804,"MapInitLong": 9.282907});
	
	//Autódromo Internacional do Algarve
	aRefPoints[-416617300] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":		37.231240
		,"refLong":		-8.629394
		,"rotation":		-74.3
		,"cor_r_Long":		0
		,"cor_r_Lat":		0
		,"cor_PosX_mul":	1.003
		,"cor_PosY_mul":	1
		,"Name":		"Autódromo Internacional do Algarve"
		,"Name2":		""
		,"AltNames":	 	"Algarve"	//mTrackLocation:"Algarve",mTrackVariation:""
		,"Zoom":		16
		,"MapInitLat":	37.231121
		,"MapInitLong":	-8.628299
		,"Comment":		"last check"
		});
	
	//Circuit of the Americas GP
	aRefPoints[2050315946] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":		30.131935
		,"refLong":		-97.639792
		,"rotation":		-0.7
		,"cor_r_Long":		0
		,"cor_r_Lat":		0
		,"cor_PosX_mul":	0.9983
		,"cor_PosY_mul":	1.0035
		,"Name":		"Circuit of the Americas GP"
		,"Name2":		""	
		,"AltNames":	 	"Circuit_of_the_Americas GP,Circuit of the Americas Grand Prix"	//mTrackLocation:"Circuit_of_the_Americas",mTrackVariation:"Grand Prix"
		,"Zoom":		16
		,"MapInitLat":	30.134614
		,"MapInitLong":	-97.634090
		,"Comment":		"finished"
		});
	//Circuit of the Americas Club
	aRefPoints[802214179] = CopyObjectWithModifications(aRefPoints[2050315946], {"Name": "Circuit of the Americas Club","Name2": "","AltNames":"Circuit_of_the_Americas Club_Circuit,Circuit of the Americas Club Circuit","Zoom": 17,"MapInitLat": 30.137552,"MapInitLong": -97.628475});
	//Circuit of the Americas National
	aRefPoints[1629467388] = CopyObjectWithModifications(aRefPoints[2050315946], {"Name": "Circuit of the Americas National","Name2": "","AltNames":"Circuit_of_the_Americas National_Circuit,Circuit of the Americas National_Circuit","MapInitLat": 30.133822,"MapInitLong": -97.638199});

	//Daytona International Speedway Tri-Oval
	aRefPoints[2054003546] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":		29.185563
		,"refLong":		-81.069434
		,"rotation":		-125.8
		,"cor_r_Long":		0
		,"cor_r_Lat":		0
		,"cor_PosX_mul":	1.001
		,"cor_PosY_mul":	1
		,"Name":		"Daytona International Speedway Tri-Oval"
		,"Name2":		""	
		,"AltNames":	 	"Daytona_International_Speedway Tri_Oval,Daytona International Speedway Tri_Oval"	//mTrackLocation:"Daytona International Speedway",mTrackVariation:"Tri_Oval"
		,"Zoom":		16
		,"MapInitLat":	29.185007
		,"MapInitLong":	-81.069100
		,"Comment":		"last check"
		});			
	//Daytona Road Course
	aRefPoints[467707118] = CopyObjectWithModifications(aRefPoints[2054003546], {"Name": "Daytona Road Course","Name2": "","AltNames":"Daytona_International_Speedway Road_Course,Daytona International Speedway Road_Course"});	//mTrackLocation:"Daytona International Speedway",mTrackVariation:"Road_Course"
	//Daytona International Speedway Rallycross
	aRefPoints[35770107] = CopyObjectWithModifications(aRefPoints[2054003546], {"Name": "Daytona International Speedway Rallycross","Name2": "","AltNames":"Daytona_International_Speedway Rally_Cross","Zoom": 17,"MapInitLat": 29.184475,"MapInitLong": -81.071058});	//mTrackLocation:"Daytona International Speedway",mTrackVariation:"Rallycross"
	
	//DirtFish Pro Rallycross Course
	aRefPoints[-2108341365] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        47.540174
		,"refLong":      -121.815198
		,"rotation":     0
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "DirtFish Pro Rallycross Course"	//error in API, there is the name "Rallyross"
		,"Name2":	 ""
		,"AltNames":	 "DirtFish Stage3, DirtFish Stage 3"	//"mTrackLocation":"DirtFish","mTrackVariation":"Stage 3", error in API, Stage 3 two times included
		,"Zoom":         18
		,"MapInitLat":   47.538534
		,"MapInitLong":  -121.814874
		,"Comment": "last check"
		});
	//DirtFish Boneyard Course
	aRefPoints[980779751] = CopyObjectWithModifications(aRefPoints[-2108341365], {"Name": "DirtFish Boneyard Course","Name2": "","AltNames":"DirtFish Stage2, DirtFish Stage 2","Zoom": 17,"MapInitLat": 47.5379834});	//"mTrackLocation":"DirtFish","mTrackVariation":"Stage 2"
	//DirtFish Mill Run Course
	aRefPoints[-1694936640] = CopyObjectWithModifications(aRefPoints[-2108341365], {"Name": "DirtFish Mill Run Course","Name2": "","AltNames":"DirtFish Stage3, DirtFish Stage 3","MapInitLat": 47.540134});	//"mTrackLocation":"DirtFish","mTrackVariation":"Stage 3"
	
	//Fuji
	aRefPoints[-1695214357] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        35.373892
		,"refLong":      138.929643
		,"rotation":     1.3
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.9985
		,"cor_PosY_mul": 1.0005
		,"Name":         "Fuji GP"
		,"Name2":	 ""	
		,"AltNames":	 "Fuji Grand Prix"	//"mTrackLocation":"Fuji","mTrackVariation":"Grand Prix"
		,"Zoom":         16
		,"MapInitLat":   35.370554
		,"MapInitLong":  138.927871
		,"Comment": "finished"
		});
		
	//Indianapolis Motor Speedway Road Course
	aRefPoints[211444010] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        39.793345
		,"refLong":      -86.238876
		,"rotation":     0
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.9965
		,"cor_PosY_mul": 1.001
		,"Name":         "Indianapolis Motor Speedway Road Course"
		,"Name2":	 ""	
		,"AltNames":	 "Indianapolis_Motor_Speedway Road_Course,Indianapolis Motor Speedway Road_Course"	//"mTrackLocation":"Indianapolis Motor Speedway","mTrackVariation":"Road_Course"
		,"Zoom":         15
		,"MapInitLat":   39.794972
		,"MapInitLong":  -86.234559
		,"Comment": "finished"
		});
	//Indianapolis Motor Speedway Oval
	aRefPoints[62242453] = CopyObjectWithModifications(aRefPoints[211444010], {"Name": "Indianapolis Motor Speedway Oval","Name2": "","AltNames":"Indianapolis_Motor_Speedway Oval"});	//"mTrackLocation":"Indianapolis_Motor_Speedway","mTrackVariation":"Oval"

	//Knockhill International
	aRefPoints[-2126387783] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        56.126987
		,"refLong":      -3.502699
		,"rotation":     0.1
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 0.9997
		,"Name":         "Knockhill International"	//"mTrackLocation":"Knockhill","mTrackVariation":"International"
		,"Name2":	 ""	
		,"Zoom":         17
		,"MapInitLat":   56.129232
		,"MapInitLong":  -3.505984
		,"Comment": "finished, small discrepancies"
		});	
	//Knockhill International Reverse
	aRefPoints[-1088073214] = CopyObjectWithModifications(aRefPoints[-2126387783], {"Name": "Knockhill International Reverse","Name2": "","AltNames":"Knockhill International_Reverse"});	//"mTrackLocation":"Knockhill","mTrackVariation":"International_Reverse"
	//Knockhill National
	aRefPoints[1887425815] = CopyObjectWithModifications(aRefPoints[-2126387783], {"Name": "Knockhill National","Name2": ""});	//"mTrackLocation":"Knockhill","mTrackVariation":"National"
	//Knockhill National Reverse
	aRefPoints[458589160] = CopyObjectWithModifications(aRefPoints[-2126387783], {"Name": "Knockhill National Reverse","Name2": "","AltNames":"Knockhill National_Reverse"});	//"mTrackLocation":"Knockhill","mTrackVariation":"National_Reverse"
	//Knockhill Rallycross
	aRefPoints[977699253] = CopyObjectWithModifications(aRefPoints[-2126387783], {"Name": "Knockhill Rallycross","Name2": "","MapInitLat": 56.130122,"MapInitLong": -3.506652});	//"mTrackLocation":"Knockhill","mTrackVariation":"Rallycross"
	//Knockhill Tri-Oval
	aRefPoints[-941106232] = CopyObjectWithModifications(aRefPoints[-2126387783], {"Name": "Knockhill Tri-Oval","Name2": "","AltNames":"Knockhill Tri_Oval","Zoom": 18,"MapInitLat": 56.130850,"MapInitLong": -3.511185});	//"mTrackLocation":"Knockhill","mTrackVariation":"Tri_Oval"
	
	//Lånkebanen Rallycross
	aRefPoints[2087662703] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        63.405920
		,"refLong":      10.919460
		,"rotation":     0.1
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1.03
		,"cor_PosY_mul": 1.027
		,"Name":         "Lånkebanen Rallycross"
		,"Name2":	 ""
		,"AltNames":	 "Hell Rallycross,Hell RX Rallycross"	//"mTrackLocation":"Hell","mTrackVariation":"Rallycross"	
		,"Zoom":         17
		,"MapInitLat":   63.405890
		,"MapInitLong":  10.919449
		,"Comment": "finished, discrepancy in Turn 2"
		});
		
	//Rallycross of Loheac
	aRefPoints[-598879227] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        47.863952
		,"refLong":      -1.893773
		,"rotation":     -0.1
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1.02
		,"cor_PosY_mul": 1.023
		,"Name":         "Rallycross of Loheac"
		,"Name2":	 ""	
		,"AltNames":	 "Loheac Rallycross_of_Loheac,Loheac Rallycross of Loheac"	//"mTrackLocation":"Loheac","mTrackVariation":"Rallycross of Loheac"
		,"Zoom":         17
		,"MapInitLat":   47.864160
		,"MapInitLong":  -1.894058
		,"Comment": "finished"
		});

	//Long Beach Street Circuit
	aRefPoints[1731699995] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        33.763798
		,"refLong":      -118.191507
		,"rotation":     0.6
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.998
		,"cor_PosY_mul": 1.002
		,"Name":         "Long Beach Street Circuit"
		,"Name2":	 ""	
		,"AltNames":	 "Long_Beach Street_Circuit"	//"mTrackLocation":"Long Beach","mTrackVariation":"Street Circuit"
		,"Zoom":         17
		,"MapInitLat":   33.764020
		,"MapInitLong":  -118.190768
		,"Comment": "finished"
		});

	//Lydden Hill GP
	aRefPoints[953639515] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        51.178506
		,"refLong":      1.199065
		,"rotation":     1.6
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1.003
		,"cor_PosY_mul": 1.005
		,"Name":         "Lydden Hill GP"
		,"Name2":	 ""	
		,"AltNames":	 "Lydden_Hill Circuit,Lydden Hill Circuit"	//"mTrackLocation":"Lydden Hill","mTrackVariation":"Circuit"
		,"Zoom":         17
		,"MapInitLat":   51.178036
		,"MapInitLong":  1.199318
		,"Comment": "finished"
		});
	//Lydden Hill Rallycross
	aRefPoints[673609283] = CopyObjectWithModifications(aRefPoints[953639515], {"Name": "Lydden Hill Rallycross","Name2": "","AltNames":"Lydden_Hill RX,Lydden Hill RX"});	//"mTrackLocation":"Lydden Hill","mTrackVariation":"RX"

	//Porsche Leipzig Full Circuit
	aRefPoints[-158843644] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        51.402149
		,"refLong":      12.296042
		,"rotation":     -0.25
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Porsche Leipzig Full Circuit"
		,"Name2":	 ""	
		,"AltNames":	 "Porsche_Leipzig_on_road_circuit Full_Circuit,Porsche Leipzig On-road Circuit Full Circuit"	//"mTrackLocation":"Porsche_Leipzig_on_road_circuit","mTrackVariation":"Full_Circuit"
		,"Zoom":         15
		,"MapInitLat":   51.405441
		,"MapInitLong":  12.298670
		,"Comment": "finished"
		});
	//Porsche Leipzig Dynamic Circuit
        aRefPoints[-105902772] = CopyObjectWithModifications(aRefPoints[-158843644], {"Name": "Porsche Leipzig Dynamic Circuit","Name2": "","AltNames":"Porsche_Leipzig_on_road_circuit Dynamic_Circuit,Porsche Leipzig On-road Circuit Dynamic Circuit"});
	//Porsche Leipzig Short Circuit
        aRefPoints[169281142] = CopyObjectWithModifications(aRefPoints[-158843644], {"Name": "Porsche Leipzig Short Circuit","Name2": "","AltNames":"Porsche_Leipzig_on_road_circuit Short_Circuit,Porsche Leipzig On-road Circuit Short Circuit"});

	//Red Bull Ring GP
	aRefPoints[-1933253531] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        47.223062
		,"refLong":      14.762440
		,"rotation":     0.07
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.997
		,"cor_PosY_mul": 1
		,"Name":         "Red Bull Ring GP"
		,"Name2":	 ""	
		,"AltNames":	 "Red_Bull_Ring GP,Red Bull Ring Grand Prix"	//"mTrackLocation":"Red_Bull_Ring","mTrackVariation":"GP"
		,"Zoom":         16
		,"MapInitLat":   47.222579
		,"MapInitLong":  14.763244
		,"Comment": "finished"
		});
	//Red Bull Ring Club
	aRefPoints[-73186614] = CopyObjectWithModifications(aRefPoints[-1933253531], {"Name": "Red Bull Ring Club","Name2": "","AltNames":"Red_Bull_Ring Club","Zoom": 17,"MapInitLat": 47.225310,"MapInitLong": 14.759374});	//"mTrackLocation":"Red Bull Ring","mTrackVariation":"Club"
	//Red Bull Ring National
	aRefPoints[-2014223741] = CopyObjectWithModifications(aRefPoints[-1933253531], {"Name": "Red Bull Ring National","Name2": "","AltNames":"Red_Bull_Ring National","Zoom": 17,"MapInitLat": 47.221337,"MapInitLong": 14.764419});	//"mTrackLocation":"Red Bull Ring","mTrackVariation":"National"

	//Sportsland SUGO
	aRefPoints[-1024221192] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        38.140381
		,"refLong":      140.776663
		,"rotation":     0
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.9985
		,"cor_PosY_mul": 1
		,"Name":         "Sportsland SUGO"
		,"Name2":	 ""	
		,"AltNames":	 "SUGO GP,Sugo Grand Prix"	//"mTrackLocation":"Sugo","mTrackVariation":"Grand Prix"
		,"Zoom":         17
		,"MapInitLat":   38.140497
		,"MapInitLong":  140.776549
		,"Comment": "finished"
		});

	//Texas Motor Speedway
	aRefPoints[1185954707] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        33.036309
		,"refLong":      -97.280925
		,"rotation":     -16.3
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.985
		,"cor_PosY_mul": 0.987
		,"Name":         "Texas Motor Speedway"
		,"Name2":	 ""	
		,"AltNames":	 "Texas_Motor_Speedway Tri_Oval,Texas Motor Speedway Tri_Oval"	//"mTrackLocation":"Texas Motor Speedway","mTrackVariation":"Tri_Oval"
		,"Zoom":         16
		,"MapInitLat":   33.036859
		,"MapInitLong":  -97.281377
		,"Comment": "finished"
		});
	//Texas Motor Speedway Infield Course
	aRefPoints[1719717729] = CopyObjectWithModifications(aRefPoints[1185954707], {"Name": "Texas Motor Speedway Infield Course","Name2": "","AltNames":"Texas_Motor_Speedway Infield_RC,Texas Motor Speedway Infield_RC","Zoom": 17,"MapInitLat": 33.036749,"MapInitLong": -97.280247});	//"mTrackLocation":"Texas Motor Speedway","mTrackVariation":"Infield_RC"
	//Texas Motor Speedway Road Course
	aRefPoints[533066470] = CopyObjectWithModifications(aRefPoints[1185954707], {"Name": "Texas Motor Speedway Road Course","Name2": "","AltNames":"Texas_Motor_Speedway RC,Texas Motor Speedway RC"});	//"mTrackLocation":"Texas Motor Speedway","mTrackVariation":"RC"
	
	//Mugello GP
	aRefPoints[1730519219] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        43.997614
		,"refLong":      11.371401
		,"rotation":     -1.595
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 0.9983
		,"cor_PosY_mul": 1
		,"Name":         "Mugello GP"
		,"Name2":	 ""	
		,"AltNames":	 ""	//"mTrackLocation":"","mTrackVariation":""
		,"Zoom":         15
		,"MapInitLat":   43.997633
		,"MapInitLong":  11.371350
		,"Comment": "finished"
		});
	//Mugello  Short
	aRefPoints[-2110554879] = CopyObjectWithModifications(aRefPoints[1730519219], {"Name": "Mugello  Short","Name2": "","AltNames":"","Zoom": 16,"MapInitLat": 43.998674,"MapInitLong": 11.373907});
	
	//Pista di Fiorano
	aRefPoints[1371913179] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        44.534380
		,"refLong":      10.857596
		,"rotation":     -1.2
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Pista di Fiorano"
		,"Name2":	 ""	
		,"AltNames":	 "Pista_di_Fiorano"	//"mTrackLocation":"Pista_di_Fiorano","mTrackVariation":""
		,"Zoom":         16
		,"MapInitLat":   44.534489
		,"MapInitLong":  10.858318
		,"Comment": "finished"
		});	

	//// fictional tracks
	//Azure Coast
	aRefPoints[560711985] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Azure Coast"
		,"Name2":	""
		,"AltNames":	 "Azure Coast Eastbound,Azure_Coast Eastbound"
		,"Zoom":         13
		,"Comment": 	"fictional track"
        });
	//Azure Coast Westbound
	aRefPoints[-1936790504] = CopyObjectWithModifications(aRefPoints[560711985], {"Name": "Azure Coast Westbound","Name2": "","AltNames":"Azure_Coast Westbound"});
	//Azure Coast Stage 1
	aRefPoints[550129415] = CopyObjectWithModifications(aRefPoints[560711985], {"Name": "Azure Coast Stage 1","Name2": "","AltNames":"Azure_Coast Stage_1","Zoom":15,"MapInitLat":40.979});
	//Azure Coast Stage 2
	aRefPoints[-780879576] = CopyObjectWithModifications(aRefPoints[560711985], {"Name": "Azure Coast Stage 2","Name2": "","AltNames":"Azure_Coast Stage_2","Zoom":14,"MapInitLong":-113.56});
	//Azure Coast Stage 3
	aRefPoints[-1737261125] = CopyObjectWithModifications(aRefPoints[560711985], {"Name": "Azure Coast Stage 3","Name2": "","AltNames":"Azure_Coast Stage_3","Zoom":15,"MapInitLat":41.018,"MapInitLong":-113.59});
	
							
	//California Highway Full
	aRefPoints[-1593944167] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "California Highway Full"
		,"AltNames":	"California_Highway Full"
		,"Zoom":	13
		,"MapInitLat": 	41.032
                ,"MapInitLong":	-113.58
		,"Comment": 	"fictional track"
        });
	//California Highway Reverse
	aRefPoints[928006536] = CopyObjectWithModifications(aRefPoints[-1593944167], {"Name": "California Highway Reverse","AltNames":"California_Highway Reverse"});
	//California Highway Stage 1
	aRefPoints[1676943041] = CopyObjectWithModifications(aRefPoints[-1593944167], {"Name": "California Highway Stage 1","AltNames":"California_Highway Stage1","Zoom":15,"MapInitLat":41.005,"MapInitLong":-113.563});
	//California Highway Stage 2
	aRefPoints[940391868] = CopyObjectWithModifications(aRefPoints[-1593944167], {"Name": "California Highway Stage 2","AltNames":"California_Highway Stage2","MapInitLat":41.038,"MapInitLong":-113.55});
	//California Highway Stage 3
	aRefPoints[-331502851] = CopyObjectWithModifications(aRefPoints[-1593944167], {"Name": "California Highway Stage 3","AltNames":"California_Highway Stage3","Zoom":15,"MapInitLat":41.06,"MapInitLong":-113.593});
		
	//Sakitto GP
	aRefPoints[-1759743046] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Sakitto GP"
		,"Name2":	""
		,"AltNames":	"Sakitto Grand Prix"
		,"Comment": 	"fictional track"
        });
	//Sakitto International
	aRefPoints[-1474170192] = CopyObjectWithModifications(aRefPoints[-1759743046], {"Name": "Sakitto International","Name2": "","AltNames":""});
	//Sakitto Sakitto National
	aRefPoints[-1260826266] = CopyObjectWithModifications(aRefPoints[-1759743046], {"Name": "Sakitto National","Name2": "","AltNames":""});
	//Sakitto Sprint
	aRefPoints[-879282119] = CopyObjectWithModifications(aRefPoints[-1759743046], {"Name": "Sakitto Sprint","Name2": "","AltNames":""});
	
	//Mojave Cougar Ridge - TrackID pcars1 [-688586697]
	aRefPoints[31280808] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Mojave Cougar Ridge"
		,"AltNames":	"Mojave Cougar_Ridge"
		,"Zoom":	16
		,"MapInitLat":	40.9966
		,"MapInitLong":	-113.565
		,"Comment": 	"fictional track"
        });
        //Mojave Boa Ascent - TrackID pcars1 [850003838]
	aRefPoints[-984009759] = CopyObjectWithModifications(aRefPoints[31280808], {"Name": "Mojave Boa Ascent","AltNames":"Mojave Boa_Ascent","Zoom":17,"MapInitLat":41.0033,"MapInitLong":-113.569});
	//Mojave Gila Crest - TrackID pcars1 [2089801285]
	aRefPoints[-60500434] = CopyObjectWithModifications(aRefPoints[31280808], {"Name": "Mojave Gila Crest","AltNames":"Mojave Gila_Crest","MapInitLat":40.9955,"MapInitLong":-113.559});
	//Mojave Coyote Noose - TrackID pcars1 [-2125682335]
	aRefPoints[369271528] = CopyObjectWithModifications(aRefPoints[31280808], {"Name": "Mojave Coyote Noose","AltNames":"Mojave Coyote_Noose","MapInitLong":-113.5675});
	//Mojave Sidewinder - TrackID pcars1 [-1463443929]
	aRefPoints[2015693491] = CopyObjectWithModifications(aRefPoints[31280808], {"Name": "Mojave Sidewinder","AltNames":"","Zoom":17,"MapInitLat":40.9968,"MapInitLong":-113.5605});
	//Mojave Test Track - only in Game API available, because you cannot play it in Multiplayer, it has no TrackID -> works only in CREST Mode
	aRefPoints[-1] = CopyObjectWithModifications(aRefPoints[31280808], {"Name": "Mojave Test Track","AltNames":""});
	
	//Bannochbrae Road Circuit 
	aRefPoints[-602684269] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Bannochbrae Road Circuit"
		,"AltNames":	"Bannochbrae Road_Circuit"
		,"MapInitLat":   40.993664
                ,"MapInitLong":  -113.562253
		,"Comment": 	"fictional track"
        });
	
	//Mercedes Ice Training Track: Full Track
	aRefPoints[-3216853] = CopyObjectWithModifications(aRefPoints[9999999999],
		{
		"refLat":        65.549746
		,"refLong":      17.578392
		,"rotation":     0
		,"cor_r_Long":   0
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Mercedes-Benz Ice Track Full"
		,"Name2":	 ""	
		,"AltNames":	 "Mercedes_Benz_Ice_Track Full"		//"mTrackLocation":"Mercedes_Benz_Ice_Track","mTrackVariation":"Full"
		,"Zoom":         15
		,"MapInitLat":   65.549746
		,"MapInitLong":  17.578392
		,"Comment": "initially added"
		});
	//Mercedes Ice Training Track: East Circuit
	aRefPoints[1365171965] = CopyObjectWithModifications(aRefPoints[-3216853], {"Name": "Mercedes-Benz Ice Track 1","Name2": "","AltNames":"Mercedes_Benz_Ice_Track 1"});	//"mTrackLocation":"Mercedes_Benz_Ice_Track","mTrackVariation":"1"
	//Mercedes Ice Training Track: North Circuit
	aRefPoints[480123345] = CopyObjectWithModifications(aRefPoints[-3216853], {"Name": "Mercedes-Benz Ice Track 2","Name2": "","AltNames":"Mercedes_Benz_Ice_Track 2"});	//"mTrackLocation":"Mercedes_Benz_Ice_Track","mTrackVariation":"2"
	//Mercedes Ice Training Track: North East Circuit
	aRefPoints[-2086764920] = CopyObjectWithModifications(aRefPoints[-3216853], {"Name": "Mercedes-Benz Ice Track 3","Name2": "","AltNames":"Mercedes_Benz_Ice_Track 3"});	//"mTrackLocation":"Mercedes_Benz_Ice_Track","mTrackVariation":"3"
	//Mercedes Ice Training Track: South Circuit
	aRefPoints[-907469052] = CopyObjectWithModifications(aRefPoints[-3216853], {"Name": "Mercedes-Benz Ice Track 4","Name2": "","AltNames":"Mercedes_Benz_Ice_Track 4"});	//"mTrackLocation":"Mercedes_Benz_Ice_Track","mTrackVariation":"4"
	//Mercedes Ice Training Track: West Circuit
	aRefPoints[-725608647] = CopyObjectWithModifications(aRefPoints[-3216853], {"Name": "Mercedes-Benz Ice Track 5","Name2": "","AltNames":"Mercedes_Benz_Ice_Track 5"});	//"mTrackLocation":"Mercedes_Benz_Ice_Track","mTrackVariation":"5"

	//Sampala Ice Circuit
	aRefPoints[-823048021] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Sampala Ice Circuit"
		,"Name2":	""	
		,"AltNames":	"Sampala_Ice_Circuit"
		,"Comment": "fictional, initially added"
		});
	
	//Wildcrest Rallycross
	aRefPoints[1892852585] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":          "Wildcrest Rallycross"
		,"Name2":	 ""	
		,"AltNames":	 "Wildcrest_Rallycross"	//"mTrackLocation":"Wildcrest","mTrackVariation":"Rallycross"
		,"Comment": "initially added"
		});
	
	//// fictional Kart tracks	
	//Summerton
	aRefPoints[-44748320] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Summerton International"	//"mTrackLocation":"Summerton","mTrackVariation":"International"
		,"Name2":	""
		,"AltNames":	"Summerton_Karting_Circuit International,Summerton Karting Circuit International"
		,"Comment":	"Kart Track?"
        });
	//Summerton National
	aRefPoints[1408845203] = CopyObjectWithModifications(aRefPoints[-44748320], {"Name": "Summerton National","Name2": "","AltNames":"Summerton_Karting_Circuit National,Summerton Karting Circuit National"});
	//Summerton Sprint
	aRefPoints[-1605913568] = CopyObjectWithModifications(aRefPoints[-44748320], {"Name": "Summerton Sprint","Name2": "","AltNames":"Summerton_Karting_Circuit Sprint,Summerton Karting Circuit Sprint"});
		
	//Chesterfield Karting Circuit
	aRefPoints[-1735912413] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Chesterfield Karting Circuit"
		,"Name2":	""
		,"AltNames":	"Chesterfield Grand Prix,Chesterfield_Karting_Circuit"	//"mTrackLocation":"Chesterfield","mTrackVariation":"Grand Prix"
		,"Comment": 	"Kart Track"
        });
		
	//Glencairn GP
	aRefPoints[-1066742780] = CopyObjectWithModifications(aRefPoints[8888888888],
		{
		"Name":         "Glencairn GP"
		,"Name2":	""
		,"AltNames":	"Glencairn Grand Prix,Glencairn_Karting_Circuit GP,Glencairn Karting Circuit Grand Prix"	//"mTrackLocation":"Glencairn","mTrackVariation":"Grand Prix"
		,"Comment": 	"Kart Track"
        });
	//Glencairn Reverse
	aRefPoints[-1520844580] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn Reverse","Name2": "","AltNames":"Glencairn GP Reverese,Glencairn_Karting_Circuit GP_Reverse,Glencairn Karting Circuit GP Reverese"});	//"mTrackLocation":"Glencairn","mTrackVariation":"GP Reverese"
	//Glencairn East
	aRefPoints[766599953] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn East","Name2": "","AltNames":"Glencairn_Karting_Circuit East,Glencairn Karting Circuit East"});
	//Glencairn East Reverse
	aRefPoints[-446794969] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn East Reverse","Name2": "","AltNames":"Glencairn_Karting_Circuit East_Reverse,Glencairn Karting Circuit East Reverse"});
	//Glencairn West
	aRefPoints[-1408779593] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn West","Name2": "","AltNames":"Glencairn_Karting_Circuit West,Glencairn Karting Circuit West"});
	//Glencairn West Reverse
	aRefPoints[-913625358] = CopyObjectWithModifications(aRefPoints[-1066742780], {"Name": "Glencairn West Reverse","Name2": "","AltNames":"Glencairn_Karting_Circuit West_Reverse,Glencairn Karting Circuit West Reverse"});
	
	
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
		,"AltNames":	 "Rouen"
		,"Zoom":         14
		,"MapInitLat":   49.333581
		,"MapInitLong":  1.004589
		,"Comment": "live check"
		});
	//Rouen Les Essarts Short
	aRefPoints[-1515473908] = CopyObjectWithModifications(aRefPoints[-1031249929], {"Name": "Rouen Les Essarts Short","AltNames":"Rouen Short","Zoom": 15,"MapInitLat": 49.330981});
	
	//Hockenheim Classic GP - copy of Hockenheim GP
	aRefPoints[1552853772] = CopyObjectWithModifications(aRefPoints[1695182971], {"Name": "Hockenheim Classic GP","Name2": "","AltNames":"Hockenheim Classic,Hockenheim_Classic GP,Hockenheim Classic Grand Prix","Zoom": 15,"MapInitLat": 49.332596,"MapInitLong": 8.579739});
	
	//Silverstone Classic GP - copy of Silverstone GP
	aRefPoints[-1194290828] = CopyObjectWithModifications(aRefPoints[1641471184], {"rotation": 0.2,"Name": "Silverstone Classic GP","Name2": "","AltNames":"Silverstone Classic,Silverstone_Classic GP,Silverstone Classic Grand Prix","Comment": "finished"});
	
	//Circuit de Spa-Francorchamps Historic
	aRefPoints[-1804962581] = CopyObjectWithModifications(aRefPoints[904625875], {"Name": "Circuit de Spa-Francorchamps Historic","Name2": "","AltNames":"Spa_Francorchamps_Historic GP,Spa-Francorchamps Historic Grand Prix","Zoom": 13,"MapInitLat": 50.423329,"MapInitLong": 5.970941,"Comment": "initially added"});	//"mTrackLocation":"Spa-Francorchamps","mTrackVariation":"Historic Grand Prix"

	//Autodromo Nazionale Monza GP Historic
	aRefPoints[1184596327] = CopyObjectWithModifications(aRefPoints[-52972612], {"Name": "Autodromo Nazionale Monza GP Historic","Name2": "","AltNames":"Monza_Classic GP,Monza Classic Grand Prix","Comment": "initially added"});	//"mTrackLocation":"Monza Classic","mTrackVariation":"Grand Prix"
	//Autodromo Nazionale Monza Oval Historic
	aRefPoints[-163046637] = CopyObjectWithModifications(aRefPoints[-52972612], {"Name": "Autodromo Nazionale Monza Oval Historic","Name2": "","AltNames":"Monza_Classic Historic_Oval,Monza Classic Historic_Oval","MapInitLat": 45.617946,"MapInitLong": 9.285518,"Comment": "initially added"});	//"mTrackLocation":"Monza Classic","mTrackVariation":"Historic_Oval"
	//Autodromo Nazionale Monza Historic Oval + GP Mix
	aRefPoints[1327182267] = CopyObjectWithModifications(aRefPoints[-52972612], {"Name": "Autodromo Nazionale Monza Historic Oval + GP Mix","Name2": "","AltNames":"Monza_Classic Historic_Mix,Monza Classic Historic_Mix","MapInitLat": 45.620700,"Comment": "initially added"});	//"mTrackLocation":"Monza Classic","mTrackVariation":"Historic_Mix"
	

	if (circuit_id == undefined){
		// no paramter given -> set to an default value to prevent empty return value
		if(log >= 3){console.log ("Circuit_id NOT set, change to default!");}
		this.circuit_id = 9999999999;

	}
	
	//console.log ("+++ RefPoints: " , aRefPoints);
	//console.log ("++ used  CuircitID: " + this.circuit_id );

	// set values for the object	
	this.Lat 	= aRefPoints[this.circuit_id]["refLat"];
	this.Long 	= aRefPoints[this.circuit_id]["refLong"];
	this.Rot 	= aRefPoints[this.circuit_id]["rotation"];


	// copy local object to class variable
	this.aRPs = aRefPoints;  
	
	//return the object
	return this;
}


/*
 * 	@return {hash} returns the complete RefPoint hash	
 */
function GetRefPointHash(){
	console.log("function obsolete: GetRefPointHash()"); // try to find out source
	return this.aRPs;
}


/*
 * 	@param {string}	id of the circuit	
 *	@return {array} array of Lat, Long, Rotation
 */
function GetRefPoint(circuit_id){
	console.log("function obsolete: GetRefPoint()"); // try to find out source
	return ( this.Lat, this.Long, this.Rot );
}


/*	GetCircuitnameByTrackID (circuit_id)
 *		@param {string}	id of the circuit	+{
 *		@return {string} Name of specific track	
 */
function GetCircuitnameByTrackID (circuit_id){
	console.log("function obsolete: GetCircuitnameByTrackID()"); // try to find out source
	if ( aRefPoints[circuit_id] ){
		return aRefPoints[circuit_id]["Name"];
	}else{
		return "not defined";
	}
}


/*	to copy cuircit variantions from one object to another
 *
 *	@param {object} a hash of a specific RefPoint Element	
 *	@param {object} a hash of changes, to overwrite	
 */
function CopyObjectWithModifications(source, changes ){
	//console.log("function obsolete: CopyObjectWithModifications()"); // try to find out source
	var dest = {};
        dest =  JSON.parse( JSON.stringify( source  ) );

	for (var key in changes)
	{
		//console.log("Object Dest: " , dest["Name"]);
		//console.log("key: " + key + "   value: " + changes[key]);
		dest[key] = changes[key];
	}

	return JSON.parse( JSON.stringify( dest ) );	
}


/* GetMappingTrackname2Trackid()
 * 
 * returns an hash for mapping different spellings of a cicuit to a unique ID
 * 
 */
function GetMappingTrackname2Trackid(){
	console.log("function obsolete: GetMappingTrackname2Trackid()"); // try to find out source

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
* register function to class	
*/
Refpoint.prototype.GetRefPointHash=GetRefPointHash;
Refpoint.prototype.GetRefPoint=GetRefPoint;
Refpoint.prototype.GetCircuitnameByTrackID=GetCircuitnameByTrackID;
Refpoint.prototype.CopyObjectWithModifications=CopyObjectWithModifications;
Refpoint.prototype.GetMappingTrackname2Trackid=GetMappingTrackname2Trackid;
