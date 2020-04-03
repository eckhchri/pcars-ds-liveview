class RefPointDataAMS2 extends RefPointData {
		
		
	/* constructor()
	 * 
	 */	
	constructor(mode) {
		super(mode);	// get functions from basic class        
		//this.refPoints = {};
		this.gameName = 'AMS2';
		this.initData();
	}	
	
    initData(){
		
		//Default
		this.refPoints[9999999999] = new Array();
		this.refPoints[9999999999] = this.getDefaultRefpoint(); // defined in class RefPointData

		// fictional tracks
		this.refPoints[8888888888] = new Array();
		this.refPoints[8888888888] = this.getDefaultRefpointFictional();
		
		// Default for idle DS server
		this.refPoints[0] = new Array();
		this.refPoints[0] = this.getDefaultRefpoint();


		////AMS2 Tracks
		//Adelaide Modern
		this.refPoints[100] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-34.928456
			,"refLong":	138.618758
			,"rotation":	-1.55
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Adelaide Modern"
			,"AltNames":	""
			,"Zoom":	16
			,"MapInitLat":	-34.699531
			,"MapInitLong":	138.565149
			,"Comment":	"WIP"
		});
		//Adelaide Historic
		this.refPoints[101] = this.CopyObjectWithModifications(this.refPoints[100], {"Name": "Adelaide Historic","AltNames":""});

		//Azure Circuit
		this.refPoints[102] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Azure Circuit"
			,"AltNames":	"Azure_Circuit Azure_Circuit"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});

		//Brands Hatch Grand Prix
		this.refPoints[103] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Brands Hatch Grand Prix"
			,"AltNames":	"BrandsHatch GrandPrix"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Brands Hatch Indy
		this.refPoints[104] = this.CopyObjectWithModifications(this.refPoints[103], {"Name": "Brands Hatch Indy","AltNames":"BrandsHatch Indy"});

		//Cadwell Park
		this.refPoints[105] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	53.310311
			,"refLong":	-0.05949
			,"rotation":	-2.3
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1
			,"Name":	"Cadwell Park"
			,"AltNames":	"CadwellPark CadwellPark"
			,"Zoom":	16
			,"MapInitLat":	53.308865
			,"MapInitLong":	-0.063534
			,"Comment":	"WIP"
		});

		//Campo Grande
		this.refPoints[106] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Campo Grande"
			,"AltNames":	"CampoGrande CampoGrande"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});

		//Cascavel
		this.refPoints[107] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Cascavel"
			,"AltNames":	"Cascavel4 Cascavel5"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});

		//Curitiba
		this.refPoints[108] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Curitiba"
			,"AltNames":	"Curitiba CuritibaInternacional"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Curitiba Outer
		this.refPoints[109] = this.CopyObjectWithModifications(this.refPoints[108], {"Name": "Curitiba Outer","AltNames":"Curitiba Curitiba_outer"});

		//Curvelo Long
		this.refPoints[110] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Curvelo Long"
			,"AltNames":	"Curvelo CurveloLong"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Curvelo Short
		this.refPoints[111] = this.CopyObjectWithModifications(this.refPoints[110], {"Name": "Curvelo Short","AltNames":"Curvelo CurveloShort"});

		//Donington GP
		this.refPoints[112] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Donington GP"
			,"AltNames":	"Donington Donington_GP"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Donington National
		this.refPoints[113] = this.CopyObjectWithModifications(this.refPoints[112], {"Name": "Donington National","AltNames":"Donington Donington_Nat"});

		//Goiânia
		this.refPoints[114] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Goiânia"
			,"AltNames":	"Goiania GoianiaMixed"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Goiânia External
		this.refPoints[115] = this.CopyObjectWithModifications(this.refPoints[114], {"Name": "Goiânia External","AltNames":"Goiania GoianiaOuter"});
		//Goiânia Short
		this.refPoints[116] = this.CopyObjectWithModifications(this.refPoints[114], {"Name": "Goiânia Short","AltNames":"Goiania GoianiaShort"});

		//Guapore
		this.refPoints[117] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Guapore"
			,"AltNames":	"Guapore Guapore"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});

		//Ibarra
		this.refPoints[118] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Ibarra"
			,"AltNames":	"Ibarra4 Ibarra5"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});

		//Imola
		this.refPoints[119] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Imola"
			,"AltNames":	"ImolaAMS2 Imola_GP_2018"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Imola Historic 1972
		this.refPoints[120] = this.CopyObjectWithModifications(this.refPoints[119], {"Name": "Imola Historic 1972","AltNames":"ImolaAMS2 Imola_GP_1988"});	//AltName ist duplicate of 1988 variation, but comes from Shared Memory
		//Imola Historic 1988
		this.refPoints[121] = this.CopyObjectWithModifications(this.refPoints[119], {"Name": "Imola Historic 1988","AltNames":"ImolaAMS2 Imola_GP_1988"});
		//Imola Historic 2001
		this.refPoints[122] = this.CopyObjectWithModifications(this.refPoints[119], {"Name": "Imola Historic 2001","AltNames":"ImolaAMS2 Imola_GP_2001"});

		//Interlagos Grand Prix
		this.refPoints[123] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Interlagos Grand Prix"
			,"AltNames":	"Interlagos GP"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Interlagos Historic
		this.refPoints[124] = this.CopyObjectWithModifications(this.refPoints[123], {"Name": "Interlagos Historic","AltNames":""});

		//Jacarepaguá Historic 1988
		this.refPoints[125] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Jacarepaguá Historic 1988"
			,"AltNames":	"Jacarepagua Jacarepagua_Historic"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});

		//Jerez Grand Prix
		this.refPoints[126] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Jerez Grand Prix"
			,"AltNames":	"Jerez GP"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});

		//Kansai GP
		this.refPoints[127] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Kansai GP"
			,"AltNames":	"Kansai Kansai_GP"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Kansai East
		this.refPoints[128] = this.CopyObjectWithModifications(this.refPoints[127], {"Name": "Kansai East","AltNames":"Kansai Kansai_East"});
		//Kansai West
		this.refPoints[129] = this.CopyObjectWithModifications(this.refPoints[127], {"Name": "Kansai West","AltNames":"Kansai Kansai_West"});
		//Kansai Classic
		this.refPoints[130] = this.CopyObjectWithModifications(this.refPoints[127], {"Name": "Kansai Classic","AltNames":"Kansai Kansai_Classic"});

		//Kyalami Historic
		this.refPoints[131] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Kyalami Historic"
			,"AltNames":	""
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});

		//Londrina Long
		this.refPoints[132] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Londrina Long"
			,"AltNames":	"Londrina Londrina_long"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Londrina Short
		this.refPoints[133] = this.CopyObjectWithModifications(this.refPoints[132], {"Name": "Londrina Short","AltNames":"Londrina Londrina_short"});
		//Londrina Kart One
		this.refPoints[134] = this.CopyObjectWithModifications(this.refPoints[132], {"Name": "Londrina Kart One","AltNames":"Londrina LondrinaKart1"});
		//Londrina Kart Two
		this.refPoints[135] = this.CopyObjectWithModifications(this.refPoints[132], {"Name": "Londrina Kart Two","AltNames":"Londrina LondrinaKart2"});

		//Montreal Modern
		this.refPoints[136] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Montreal Modern"
			,"AltNames":	""
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Montreal Historic
		this.refPoints[137] = this.CopyObjectWithModifications(this.refPoints[136], {"Name": "Montreal Historic","AltNames":""});

		//Ortona Kart One
		this.refPoints[138] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Ortona Kart One"
			,"AltNames":	"Ortona Ortona1"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Ortona Kart Two
		this.refPoints[139] = this.CopyObjectWithModifications(this.refPoints[138], {"Name": "Ortona Kart Two","AltNames":"Ortona Ortona_2"});
		//Ortona Kart Three
		this.refPoints[140] = this.CopyObjectWithModifications(this.refPoints[138], {"Name": "Ortona Kart Three","AltNames":"Ortona Ortona_3"});
		//Ortona Kart Four
		this.refPoints[141] = this.CopyObjectWithModifications(this.refPoints[138], {"Name": "Ortona Kart Four","AltNames":"Ortona Ortona4"});

		//Oulton Park International
		this.refPoints[142] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Oulton Park International"
			,"AltNames":	""
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Oulton Park Fosters
		this.refPoints[143] = this.CopyObjectWithModifications(this.refPoints[142], {"Name": "Oulton Park Fosters","AltNames":"OultonPark OultonPark_Fosters"});
		//Oulton Park Island
		this.refPoints[144] = this.CopyObjectWithModifications(this.refPoints[142], {"Name": "Oulton Park Island","AltNames":"OultonPark OultonPark_Island"});
		//Oulton Park Classic
		this.refPoints[145] = this.CopyObjectWithModifications(this.refPoints[142], {"Name": "Oulton Park Classic","AltNames":"OultonPark OultonPark_Classic"});

		//Santa Cruz
		this.refPoints[146] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Santa Cruz"
			,"AltNames":	"SantaCruz SantaCruz"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});

		//Snetterton 300
		this.refPoints[147] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Snetterton 300"
			,"AltNames":	""
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Snetterton 200
		this.refPoints[148] = this.CopyObjectWithModifications(this.refPoints[147], {"Name": "Snetterton 200","AltNames":""});

		//Spielberg Modern
		this.refPoints[149] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Spielberg Modern"
			,"AltNames":	""
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Spielberg Short
		this.refPoints[150] = this.CopyObjectWithModifications(this.refPoints[149], {"Name": "Spielberg Short","AltNames":""});
		//Spielberg Vintage
		this.refPoints[151] = this.CopyObjectWithModifications(this.refPoints[149], {"Name": "Spielberg Vintage","AltNames":""});
		//Spielberg Historic
		this.refPoints[152] = this.CopyObjectWithModifications(this.refPoints[149], {"Name": "Spielberg Historic","AltNames":""});

		//Tarumã Internacional
		this.refPoints[153] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Tarumã Internacional"
			,"AltNames":	"Taruma Internacional"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Tarumã Chicane
		this.refPoints[154] = this.CopyObjectWithModifications(this.refPoints[153], {"Name": "Tarumã Chicane","AltNames":"Taruma Chicane"});

		//Velo Città
		this.refPoints[155] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Velo Città"
			,"AltNames":	"VeloCitta VeloCitta1"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Velo Città TrackDay
		this.refPoints[156] = this.CopyObjectWithModifications(this.refPoints[155], {"Name": "Velo Città TrackDay","AltNames":"VeloCitta TrackDay"});

		//Velopark 2017
		this.refPoints[157] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	40.997664
			,"refLong":	-113.566253
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Velopark 2017"
			,"AltNames":	"Velopark Velopark_2017"
			,"Zoom":	15
			,"MapInitLat":	40.997664
			,"MapInitLong":	-113.566253
			,"fictional":	 true	//remove after refpoint has been determined
			,"Comment":	"initially added"
		});
		//Velopark 2010
		this.refPoints[158] = this.CopyObjectWithModifications(this.refPoints[157], {"Name": "Velopark 2010","AltNames":"Velopark Velopark_2010"});

		//Virginia Full
		this.refPoints[159] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	36.56708
			,"refLong":	-79.209072
			,"rotation":	-1.075
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.999
			,"cor_PosY_mul":1.002
			,"Name":	"VIRginia International Raceway Full"
			,"AltNames":	"Virginia Virginia_Full"
			,"Zoom":	15
			,"MapInitLat":	36.561228
			,"MapInitLong":	-79.206432
			,"Comment":	"finished"
		});		
		//Virgina Grand
		this.refPoints[160] = this.CopyObjectWithModifications(this.refPoints[159], {"Name": "VIRginia International Raceway Grand","AltNames":"Virginia Virginia_Grand"});
		//Virgina North
		this.refPoints[161] = this.CopyObjectWithModifications(this.refPoints[159], {"Name": "VIRginia International Raceway North","AltNames":"Virginia Virginia_North","Zoom":16,"MapInitLat":36.564636});
		//Virgina South
		this.refPoints[162] = this.CopyObjectWithModifications(this.refPoints[159], {"Name": "VIRginia International Raceway South","AltNames":"Virginia Virginia_South","Zoom":16,"MapInitLat":36.556187,"MapInitLong":-79.206856});
		//Virgina Patriot
		this.refPoints[163] = this.CopyObjectWithModifications(this.refPoints[159], {"Name": "VIRginia International Raceway Patriot","AltNames":"Virginia Virginia_Patriot","Zoom":17,"MapInitLat":36.558623,"MapInitLong":-79.207231});
		
	}
	
}
