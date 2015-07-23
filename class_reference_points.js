/// Reference Object
// CLASS of RefPoints
function Refpoint(cuircit_id)
{

//	console.log ("RefPoint - Parameter: " , cuircit_id);
	this.cuircit_id 	= 	cuircit_id;
	this.Lat		=	undefined;
	this.Long		=	undefined;
	this.Rot		=	undefined;
	this.cuircit_name	=	undefined;
        
	var aRefPoints = new Array();

	//static information
	/////////////////// Hockenheim
	aRefPoints[1695182971] = {};
        aRefPoints[1695182971] ={
                                "refLat":        49.329738	// Komma in Javascript ist ein Punkt
                                ,"refLong":      8.574270	// Komma in Javascript ist ein Punkt
                                ,"rotation":     0.573		// Winkel in GRAD Maß
                                ,"cor_r_Long":   45000000	// Korrektur Radius zur Erdachse fuer Ost/West
				,"cor_r_Lat":	 0		// Korrektur Erdradius fuer  Nord/Sued
				,"cor_PosX_mul": 1		// Korrektur Multiplikator fuer PosX vor der Berechnung
				,"cor_PosY_mul": 1		// Korrektur Multiplikator fuer PosX vor der Berechnung
                                ,"Name":         "Hockenheim"	// real name of the cuircit
                                ,"Zoom":         15		// wanted zoom level for initial map
                                ,"MapInitLat":   49.329718	// Map initialisierungs Koordinaten
                                ,"MapInitLong":  8.574300
                                ,"Comment": "letztes finetuning" 
                                };
	//Hockenheim Short
	aRefPoints[1768660198] = {};
	aRefPoints[1768660198] =  JSON.parse(JSON.stringify( aRefPoints[1695182971] ));
	aRefPoints[1768660198]["Name"] = "Hockenheim Short";

	//Hockenheim National
	aRefPoints[-1977142985] = {};
        aRefPoints[-1977142985] =  JSON.parse(JSON.stringify( aRefPoints[1695182971] ));
        aRefPoints[-1977142985]["Name"] = "Hockenheim National";
	

	////////////////// Dubai todo: name durch track ID ersetzen
	aRefPoints[-661887517] = new Array();
	aRefPoints[-661887517] = 
				{ 
				"refLat":      	 25.046650      
				,"refLong":   	 55.231300
	        		,"rotation":     -0.401
			   	,"cor_r_Long":   45000000
				,"cor_r_Lat":    0
				,"cor_PosX_mul": 1
				,"cor_PosY_mul": 1
	        		,"Name":         "Dubai Autodrome GP"
	        		,"Zoom":         15
	        		,"MapInitLat":   25.050175
	        		,"MapInitLong":  55.237547
	        		,"Comment": "live prüfen"
				};

	///Dubai Autodrome International
	aRefPoints[-710712693] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Autodrome International"});
	//Dubai Kartdrome
	aRefPoints[-232513374] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Kartdrome"});
	//Dubai Autodrome National
	aRefPoints[31727447] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Autodrome National"});
	//Dubai Autodrome Club
	aRefPoints[1735854797] = CopyObjectWithModifications(aRefPoints[-661887517], {"Name": "Dubai Autodrome Club"});

	//Nuerburgring GP
	aRefPoints[-945967394] = new Array();
        aRefPoints[-945967394] =
                {
                "refLat":        50.332733 
                ,"refLong":      6.943355
                ,"rotation":     -0.9 
                ,"cor_r_Long":   30000000
		,"cor_r_Lat":    -30000000 
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Nuerburgring GP"
                ,"Zoom":         15
                ,"MapInitLat":   50.332154
                ,"MapInitLong":  6.940467
                ,"Comment": "live prüfen"
                };

	//Nuerburgring Sprint Short
	aRefPoints[-810715843] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nuerburgring Sprint Short"});
	//Nuerburgring Sprint
	aRefPoints[-709737101] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nuerburgring Sprint"});
	//Nuerburgring Muellenbach
	aRefPoints[-246966400] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nuerburgring Muellenbach"});

	//Nordschleife
	aRefPoints[697498609] = new Array();
        aRefPoints[697498609] =
                {
                "refLat":        50.332733
                ,"refLong":      6.943385
                ,"rotation":     -0.9
                ,"cor_r_Long":   10000000
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Nordschleife"
                ,"Zoom":         13
                ,"MapInitLat":   50.359101
                ,"MapInitLong":  6.962529
                ,"Comment": "live prüfen"
                };
	//Nordschleife Stage 3
	aRefPoints[1128950148] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nordschleife Stage 3"});
	//Nordschleife Stage 1
	aRefPoints[1459212514] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nordschleife Stage 1"});
	//Nordschleife Stage 2
	aRefPoints[-300387291] = CopyObjectWithModifications(aRefPoints[-945967394], {"Name": "Nordschleife Stage 2"});
	
	//Sonoma Raceway
	aRefPoints[-1454279631] = new Array();
        aRefPoints[-1454279631] =
                {
                "refLat":        38.162514
                ,"refLong":      -122.457216
                ,"rotation":     142
                ,"cor_r_Long":   10000000
                ,"cor_r_Lat":    -30000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 0.97
                ,"Name":         "Sonoma Raceway GP"
                ,"Zoom":         15
                ,"MapInitLat":   38.162770 
                ,"MapInitLong":  -122.457449
                ,"Comment": "live prüfen"
                };
        //Sonoma Raceway National
	aRefPoints[-995202729] = CopyObjectWithModifications(aRefPoints[-1454279631], {"Name": "Sonoma Raceway National"});
	//Sonoma Sonoma Raceway Short
	aRefPoints[1035110721] = CopyObjectWithModifications(aRefPoints[-1454279631], {"Name": "Sonoma Raceway Short"});

	//Circuit des 24 Heures du Mans
	aRefPoints[1740968730] = new Array();
        aRefPoints[1740968730] =
                {
                "refLat":        47.939065
                ,"refLong":      0.218178
                ,"rotation":     1.6
                ,"cor_r_Long":   25000000
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Circuit des 24 Heures du Mans"
                ,"Zoom":         13
                ,"MapInitLat":   47.936818 
                ,"MapInitLong":  0.223960
                ,"Comment": "live prüfen"
                };
        //Le Circuit Bugatti
	aRefPoints[-1027934689] = CopyObjectWithModifications(aRefPoints[1740968730], {"Name": "Le Circuit Bugatti","Zoom": 15,"MapInitLat": 47.954335,"MapInitLong": 0.211027});
        
        //Ruapuna Park GP
	aRefPoints[1277693448] = new Array();
        aRefPoints[1277693448] =
                {
                "refLat":        -43.533275
                ,"refLong":      172.478130
                ,"rotation":     0
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Ruapuna Park GP"
                ,"Zoom":         15
                ,"MapInitLat":   -43.531123 
                ,"MapInitLong":  172.479408
                ,"Comment": "live prüfen"
                };
        //Ruapuna Park A Circuit
	aRefPoints[619694160] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park A Circuit"});
        //Ruapuna Park Club
	aRefPoints[1446378877] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park Club"});
	//Ruapuna Park Outer Loop
	aRefPoints[1940584155] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park Outer Loop"});
	//Ruapuna Park B Circuit
	aRefPoints[-2046633090] = CopyObjectWithModifications(aRefPoints[1277693448], {"Name": "Ruapuna Park B Circuit"});
        
        //Cadwell GP
	aRefPoints[1876749797] = new Array();
        aRefPoints[1876749797] =
                {
                "refLat":        53.310651
                ,"refLong":      -0.059440
                ,"rotation":     0
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    -30000000
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Cadwell GP"
                ,"Zoom":         15
                ,"MapInitLat":   53.308465 
                ,"MapInitLong":  -0.063734
                ,"Comment": "live prüfen"
                };
        //Cadwell Club Circuit
	aRefPoints[328972919] = CopyObjectWithModifications(aRefPoints[1876749797], {"Name": "Cadwell Club Circuit"});
	//Cadwell Woodland
	aRefPoints[-1408189041] = CopyObjectWithModifications(aRefPoints[1876749797], {"Name": "Cadwell Woodland"});
        
        //Oulton Park International
	aRefPoints[545979690] = new Array();
        aRefPoints[545979690] =
                {
                "refLat":        53.179844
                ,"refLong":      -2.613997
                ,"rotation":     0
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Oulton Park International"
                ,"Zoom":         15
                ,"MapInitLat":   53.176808 
                ,"MapInitLong":  -2.616589
                ,"Comment": "Abgleich mit Testpunkten"
                };
        //Oulton Park Fosters
	aRefPoints[-2021024495] = CopyObjectWithModifications(aRefPoints[545979690], {"Name": "Oulton Park Fosters"});
	//Oulton Park Island
	aRefPoints[-1877699523] = CopyObjectWithModifications(aRefPoints[545979690], {"Name": "Oulton Park Island"});
        
        //Snetterton 300
	aRefPoints[1508903068] = new Array();
        aRefPoints[1508903068] =
                {
                "refLat":        52.463968
                ,"refLong":      0.945310
                ,"rotation":     0
                ,"cor_r_Long":   0
                ,"cor_r_Lat":    0
                ,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
                ,"Name":         "Snetterton 300"
                ,"Zoom":         15
                ,"MapInitLat":   52.465021 
                ,"MapInitLong":  0.947079
                ,"Comment": "Abgleich mit Testpunkten"
                };
        //Snetterton 200
	aRefPoints[1058872832] = CopyObjectWithModifications(aRefPoints[1508903068], {"Name": "Snetterton 200"});
	//Snetterton 100
	aRefPoints[-867340010] = CopyObjectWithModifications(aRefPoints[1508903068], {"Name": "Snetterton 100"});
        
	//Donington Park GP
	aRefPoints[354022214] = new Array();
	aRefPoints[354022214] =
		{
		"refLat":        52.830643280
		,"refLong":      -1.37492025
		,"rotation":     0
		,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Donington Park GP"
		,"Zoom":         15
		,"MapInitLat":   52.830643
		,"MapInitLong":  -1.374920
		,"Comment": "by colets, prüfen"
		};
	//Donington Park National
	aRefPoints[-1194019375] = CopyObjectWithModifications(aRefPoints[354022214], {"Name": "Donington Park National"});


	//Oschersleben GP
	aRefPoints[-1194185720] = new Array();
	aRefPoints[-1194185720] =
		{
		"refLat":        52.02699
		,"refLong":      11.27995
		,"rotation":     0
		,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Oschersleben GP"
		,"Zoom":         15
		,"MapInitLat":   52.02699
		,"MapInitLong":  11.27995
		,"Comment": "by colets, prüfen"
		};
	//Oschersleben National
	aRefPoints[816601966] = CopyObjectWithModifications(aRefPoints[-1194185720], {"Name": "Oschersleben National"});
	//Oschersleben C Circuit
	aRefPoints[-1359299594] = CopyObjectWithModifications(aRefPoints[-1194185720], {"Name": "Oschersleben C Circuit"});

	//Azure Circuit
	aRefPoints[832629329] = new Array();
	aRefPoints[832629329] =
		{
		"refLat":        43.73777
		,"refLong":      7.42209
		,"rotation":     0
		,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Azure Circuit"
		,"Zoom":         15
		,"MapInitLat":   43.73777
		,"MapInitLong":  7.42209
		,"Comment": "by colets, prüfen"
		};
	//Bathurst
	aRefPoints[921120824] = new Array();
	aRefPoints[921120824] =
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
		,"Comment": "live prüfen"
		};
	
	//Circuit de Spa-Francorchamps
	aRefPoints[904625875] = new Array();
	aRefPoints[904625875] =
		{
		"refLat":        50.43061
		,"refLong":      5.9767
		,"rotation":     0
		,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Circuit de Spa-Francorchamps"
		,"Zoom":         15
		,"MapInitLat":   50.43061
		,"MapInitLong":  5.9767
		,"Comment": "by colets, prüfen"
		};
	//Circuit de Barcelona-Catalunya GP
	aRefPoints[521933422] = new Array();
	aRefPoints[521933422] =
		{
		"refLat":        41.57304
		,"refLong":      2.25925
		,"rotation":     0
		,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Circuit de Barcelona-Catalunya GP"
		,"Zoom":         15
		,"MapInitLat":   41.57304
		,"MapInitLong":  2.25925
		,"Comment": "by colets, prüfen"
		};
	//Circuit de Barcelona-Catalunya Club
	aRefPoints[-1042928898] = CopyObjectWithModifications(aRefPoints[521933422], {"Name": "Circuit de Barcelona-Catalunya Club"});
	//Circuit de Barcelona-Catalunya National
	aRefPoints[-998191994] = CopyObjectWithModifications(aRefPoints[521933422], {"Name": "Circuit de Barcelona-Catalunya National"});

	//Imola
	aRefPoints[920145926] = new Array();
	aRefPoints[920145926] =
		{
		"refLat":        44.34069
		,"refLong":      11.71717
		,"rotation":     0
		,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Imola"
		,"Zoom":         15
		,"MapInitLat":   44.34069
		,"MapInitLong":  11.71717
		,"Comment": "by colets, prüfen"
		};
	
	//Willow Springs International Raceway
	aRefPoints[-103312908] = new Array();
	aRefPoints[-103312908] =
		{
		"refLat":        34.86891
		,"refLong":      -118.26126
		,"rotation":     0
		,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Willow Springs International Raceway"
		,"Zoom":         15
		,"MapInitLat":   34.86891
		,"MapInitLong":  -118.26126
		,"Comment": "by colets, prüfen"
		};
	//Willow Springs Horse Thief Mile
	aRefPoints[-1849531562] = CopyObjectWithModifications(aRefPoints[-103312908], {"Name": "Willow Springs Horse Thief Mile"});

	//Watkins Glen GP
	aRefPoints[-1785781495] = new Array();
	aRefPoints[-1785781495] =
		{
		"refLat":        42.3288
		,"refLong":      -76.9206
		,"rotation":     0
		,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Watkins Glen GP"
		,"Zoom":         15
		,"MapInitLat":   42.3288
		,"MapInitLong":  -76.9206
		,"Comment": "by colets, prüfen"
		};
	//Watkins Glen Short
	aRefPoints[1590386668] = CopyObjectWithModifications(aRefPoints[-1785781495], {"Name": "Watkins Glen Short"});

	//Autodromo Nazionale Monza GP
	aRefPoints[-52972612] = new Array();
	aRefPoints[-52972612] =
		{
		"refLat":        45.61902
		,"refLong":      9.28125
		,"rotation":     0
		,"cor_r_Long":   45000000
		,"cor_r_Lat":    0
		,"cor_PosX_mul": 1
		,"cor_PosY_mul": 1
		,"Name":         "Autodromo Nazionale Monza GP"
		,"Zoom":         15
		,"MapInitLat":   45.61902
		,"MapInitLong":  9.28125
		,"Comment": "by colets, prüfen"
		};
	
	//Autodromo Nazionale Monza Short
	aRefPoints[368740158] = CopyObjectWithModifications(aRefPoints[-52972612], {"Name": "Autodromo Nazionale Monza Short"});

///////////////////////////////////////////////////////////////////////////	
	//console.log("Refpoints: "  , aRefPoints);	
	
	if (cuircit_id == undefined)
	{
		// no paramter given -> set to an default value to prevent empty return value
		console.log ("Cuircit_id NOT set, change to default!");
		this.cuircit_id = 1695182971;

	}
	
	//console.log ("+++ RefPoints: " , aRefPoints);
	//console.log ("++ used  CuircitID: " + this.cuircit_id );

	// set values for the object	
	this.Lat 	= aRefPoints[this.cuircit_id]["refLat"];
	this.Long 	= aRefPoints[this.cuircit_id]["refLong"];
	this.Rot     	= aRefPoints[this.cuircit_id]["rotation"];

	// todo: kann man hier nicht auch die Funktion GetCuircitnameByTrackID aufrufen?
/*
	return {
			 "refLat": 	aRefPoints[this.cuircit_id]["refLat"]
			,"refLong":	aRefPoints[this.cuircit_id]["refLong"]
			,"rotation":    aRefPoints[this.cuircit_id]["rotation"]
			,"cor_r":	aRefPoints[this.cuircit_id]["cor_r"] 
			,"Name":        aRefPoints[this.cuircit_id]["Name"]
			,"Zoom":	aRefPoints[this.cuircit_id]["Zoom"]
			,"MapInitLat":	aRefPoints[this.cuircit_id]["MapInitLat"]
        		,"MapInitLong":	aRefPoints[this.cuircit_id]["MapInitLong"]	
		};
*/

	return aRefPoints;
	/////////////////////// function of this object


}

function GetRefPoint(cuircit_id){

	return ( this.Lat, this.Long, this.Rot );
}

//function GetAllRefPoints()
//{
//
//	console.log("++ call function GetAllRefPoints");
//	return aRefPoints; 
//}

function GetCuircitnameByTrackID (cuircit_id)
{
//	return aRefPoints[cuircit_id]["Name"];
}

// todo: use a function to copy cuircit variantions from on object to another
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
Refpoint.prototype.GetCuircitnameByTrackID=GetCuircitnameByTrackID;
Refpoint.prototype.CopyObjectWithModifications=CopyObjectWithModifications;
///Refpoint.prototype.GetAllRefPoints=GetAllRefPoints;
