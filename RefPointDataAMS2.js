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
			,"Zoom":	16
			,"MapInitLat":	-34.928456
			,"MapInitLong":	138.618758
			,"Comment":	"finished"
		});
		//Adelaide Historic
		this.refPoints[101] = this.CopyObjectWithModifications(this.refPoints[100], {"Name": "Adelaide Historic"});

		//Azure Circuit
		this.refPoints[102] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	43.73705
			,"refLong":	7.427395
			,"rotation":	126
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.983
			,"cor_PosY_mul":0.985
			,"Name":	"Azure Circuit"
			,"AltNames":	"Azure_Circuit Azure_Circuit"
			,"Zoom":	16
			,"MapInitLat":	43.737186
			,"MapInitLong":	7.425732
			,"Comment":	"finished, discrepancies"
		});

		//Brands Hatch Grand Prix
		this.refPoints[103] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	51.36051
			,"refLong":	0.261179
			,"rotation":	2.1
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":0.998
			,"Name":	"Brands Hatch Grand Prix"
			,"AltNames":	"BrandsHatch GrandPrix"
			,"Zoom":	16
			,"MapInitLat":	51.356786
			,"MapInitLong":	0.262930
			,"Comment":	"finished"
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
			,"Comment":	"finished, small discrepancies"
		});

		//Campo Grande
		this.refPoints[106] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-20.475932
			,"refLong":	-54.466071
			,"rotation":	0.2
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.992
			,"cor_PosY_mul":1.003
			,"Name":	"Campo Grande"
			,"AltNames":	"CampoGrande CampoGrande"
			,"Zoom":	16
			,"MapInitLat":	-20.476112
			,"MapInitLong":	-54.465827
			,"Comment":	"finished"
		});

		//Cascavel
		this.refPoints[107] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-24.981055
			,"refLong":	-53.386346
			,"rotation":	-1
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.999
			,"cor_PosY_mul":1.003
			,"Name":	"Cascavel"
			,"AltNames":	"Cascavel4 Cascavel5"
			,"Zoom":	17
			,"MapInitLat":	-24.982412
			,"MapInitLong":	-53.384565
			,"Comment":	"finished"
		});

		//Curitiba
		this.refPoints[108] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-25.447680
			,"refLong":	-49.195833
			,"rotation":	-1.5
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1.005
			,"cor_PosY_mul":1.01
			,"Name":	"Curitiba"
			,"AltNames":	"Curitiba CuritibaInternacional"
			,"Zoom":	16
			,"MapInitLat":	-25.449937
			,"MapInitLong":	-49.195733
			,"Comment":	"finished"
		});
		//Curitiba Outer
		this.refPoints[109] = this.CopyObjectWithModifications(this.refPoints[108], {"Name": "Curitiba Outer","AltNames":"Curitiba Curitiba_outer"});

		//Curvelo Long
		this.refPoints[110] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-18.807352
			,"refLong":	-44.409001
			,"rotation":	0.1
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1.005
			,"Name":	"Curvelo Long"
			,"AltNames":	"Curvelo CurveloLong"
			,"Zoom":	16
			,"MapInitLat":	-18.805342
			,"MapInitLong":	-44.408201
			,"Comment":	"finished"
		});
		//Curvelo Short
		this.refPoints[111] = this.CopyObjectWithModifications(this.refPoints[110], {"Name": "Curvelo Short","AltNames":"Curvelo CurveloShort"});

		//Donington GP
		this.refPoints[112] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	52.829917
			,"refLong":	-1.381361
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.999
			,"cor_PosY_mul":0.9975
			,"Name":	"Donington GP"
			,"AltNames":	"Donington Donington_GP"
			,"Zoom":	16
			,"MapInitLat":	52.830756
			,"MapInitLong":	-1.375103
			,"Comment":	"finished"
		});
		//Donington National
		this.refPoints[113] = this.CopyObjectWithModifications(this.refPoints[112], {"Name": "Donington National","AltNames":"Donington Donington_Nat"});

		//Goiânia
		this.refPoints[114] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-16.718458
			,"refLong":	-49.193975
			,"rotation":	0.3
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":0.992
			,"Name":	"Goiânia"
			,"AltNames":	"Goiania GoianiaMixed"
			,"Zoom":	16
			,"MapInitLat":	-16.717864
			,"MapInitLong":	-49.192500
			,"Comment":	"finished"
		});
		//Goiânia External
		this.refPoints[115] = this.CopyObjectWithModifications(this.refPoints[114], {"Name": "Goiânia External","AltNames":"Goiania GoianiaOuter"});
		//Goiânia Short
		this.refPoints[116] = this.CopyObjectWithModifications(this.refPoints[114], {"Name": "Goiânia Short","AltNames":"Goiania GoianiaShort"});

		//Guapore
		this.refPoints[117] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-28.844471
			,"refLong":	-51.852602
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1.014
			,"cor_PosY_mul":0.995
			,"Name":	"Guapore"
			,"AltNames":	"Guapore Guapore"
			,"Zoom":	16
			,"MapInitLat":	-28.846355
			,"MapInitLong":	-51.852850
			,"Comment":	"finished"
		});

		//Ibarra
		this.refPoints[118] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	0.380338
			,"refLong":	-78.098315
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.007
			,"Name":	"Ibarra"
			,"AltNames":	"Ibarra4 Ibarra5"
			,"Zoom":	17
			,"MapInitLat":	0.380725
			,"MapInitLong":	-78.094564
			,"Comment":	"finished, small discrepancies"
		});

		//Imola
		this.refPoints[119] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	44.344389
			,"refLong":	11.714520
			,"rotation":	-0.05
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":0.999
			,"Name":	"Imola"
			,"AltNames":	"ImolaAMS2 Imola_GP_2018"
			,"Zoom":	16
			,"MapInitLat":	44.341112
			,"MapInitLong":	11.712506
			,"Comment":	"finished"
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
			"refLat":	-23.702013
			,"refLong":	-46.695844
			,"rotation":	0.2
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.004
			,"Name":	"Interlagos Grand Prix"
			,"AltNames":	"Interlagos GP"
			,"Zoom":	16
			,"MapInitLat":	-23.701256
			,"MapInitLong":	-46.696486
			,"Comment":	"finished"
		});
		//Interlagos Historic
		this.refPoints[124] = this.CopyObjectWithModifications(this.refPoints[123], {"Name": "Interlagos Historic","AltNames":""});
		//Interlagos Historic External Ring
		this.refPoints[164] = this.CopyObjectWithModifications(this.refPoints[123], {"Name": "Interlagos Historic External Ring","AltNames":"Interlagos Historic_Outer"});

		//Jacarepaguá Historic 1988 - not existing anymore - added coordinates where it was in the past
		this.refPoints[125] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-22.976979
			,"refLong":	-43.394669
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Jacarepaguá Historic 1988"
			,"AltNames":	"Jacarepagua Jacarepagua_Historic"
			,"Zoom":	15
			,"MapInitLat":	-22.976979
			,"MapInitLong":	-43.394669
			,"fictional":	 true
			,"Comment":	"finished"
		});

		//Jerez
		this.refPoints[126] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	36.708457
			,"refLong":	-6.032549
			,"rotation":	-1.75
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.9975
			,"cor_PosY_mul":1.002
			,"Name":	"Jerez"
			,"AltNames":	"Jerez Chicane"
			,"Zoom":	16
			,"MapInitLat":	36.708665
			,"MapInitLong":	-6.033030
			,"Comment":	"finished"
		});
		//Jerez Standard
		this.refPoints[167] = this.CopyObjectWithModifications(this.refPoints[126], {"Name": "Jerez Standard","AltNames":""});

		//Kansai GP
		this.refPoints[127] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	34.844384
			,"refLong":	136.532731
			,"rotation":	-1.0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.999
			,"cor_PosY_mul":0.998
			,"Name":	"Kansai GP"
			,"AltNames":	"Kansai Kansai_GP"
			,"Zoom":	16
			,"MapInitLat":	34.844069
			,"MapInitLong":	136.533418
			,"Comment":	"finished, small discrepancies"
		});
		//Kansai East
		this.refPoints[128] = this.CopyObjectWithModifications(this.refPoints[127], {"Name": "Kansai East","AltNames":"Kansai Kansai_East"});
		//Kansai West
		this.refPoints[129] = this.CopyObjectWithModifications(this.refPoints[127], {"Name": "Kansai West","AltNames":"Kansai Kansai_West"});
		//Kansai Classic
		this.refPoints[130] = this.CopyObjectWithModifications(this.refPoints[127], {"Name": "Kansai Classic","AltNames":"Kansai Kansai_Classic"});

		//Kyalami Historic - the track layout difference between the historic and the present track is too big and areas of the old track are built up with houses - set it to fictional, but added coordinates where it was in the past
		this.refPoints[131] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-25.992763
			,"refLong":	28.06786
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Kyalami Historic"
			,"Zoom":	16
			,"MapInitLat":	-25.994356
			,"MapInitLong":	28.068974
			,"fictional":	 true
			,"Comment":	"finished"
		});

		//Londrina Long
		this.refPoints[132] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-23.281094
			,"refLong":	-51.167276
			,"rotation":	0.2
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.987
			,"cor_PosY_mul":0.985
			,"Name":	"Londrina Long"
			,"AltNames":	"Londrina Londrina_long"
			,"Zoom":	17
			,"MapInitLat":	-23.281892
			,"MapInitLong":	-51.167368
			,"Comment":	"finished, discrepancies"
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
			"refLat":	45.503808
			,"refLong":	-73.523765
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1.007
			,"Name":	"Montreal Modern"
			,"Zoom":	15
			,"MapInitLat":	45.505605
			,"MapInitLong":	-73.524751
			,"Comment":	"finished, small discrepancies"
		});
		//Montreal Historic
		this.refPoints[137] = this.CopyObjectWithModifications(this.refPoints[136], {"Name": "Montreal Historic"});

		//Ortona Kart One
		this.refPoints[138] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	42.305351
			,"refLong":	14.379913
			,"rotation":	0.4
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":0.998
			,"Name":	"Ortona Kart One"
			,"AltNames":	"Ortona Ortona1"
			,"Zoom":	18
			,"MapInitLat":	42.304976
			,"MapInitLong":	14.378702
			,"Comment":	"finished"
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
			"refLat":	53.180045
			,"refLong":	-2.612829
			,"rotation":	-0.3
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.997
			,"cor_PosY_mul":0.9992
			,"Name":	"Oulton Park International"
			,"Zoom":	15
			,"MapInitLat":	53.176808
			,"MapInitLong":	-2.616589
			,"Comment":	"finished"
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
			"refLat":	-29.799978
			,"refLong":	-52.436404
			,"rotation":	-0.3
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1.035
			,"cor_PosY_mul":1.04
			,"Name":	"Santa Cruz"
			,"AltNames":	"SantaCruz SantaCruz"
			,"Zoom":	16
			,"MapInitLat":	-29.799883
			,"MapInitLong":	-52.436274
			,"Comment":	"finished, discrepancies"
		});

		//Snetterton 300
		this.refPoints[147] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	52.464919
			,"refLong":	0.947226
			,"rotation":	1.6
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.997
			,"cor_PosY_mul":0.999
			,"Name":	"Snetterton 300"
			,"Zoom":	16
			,"MapInitLat":	52.464971
			,"MapInitLong":	0.947056
			,"Comment":	"finished"
		});
		//Snetterton 200
		this.refPoints[148] = this.CopyObjectWithModifications(this.refPoints[147], {"Name": "Snetterton 200"});
		//Snetterton 100
		this.refPoints[165] = this.CopyObjectWithModifications(this.refPoints[147], {"Name": "Snetterton 100","AltNames":"Snetterton 200"});	//AltName ist duplicate of 200 variation, but comes from Shared Memory

		//Spielberg GP
		this.refPoints[149] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	47.219792
			,"refLong":	14.763686
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.994
			,"cor_PosY_mul":1
			,"Name":	"Spielberg GP"
			,"AltNames":	"Spielberg Modern"
			,"Zoom":	16
			,"MapInitLat":	47.223546
			,"MapInitLong":	14.761707
			,"Comment":	"finished, discrepancies"
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
		//Velo Città ClubDay
		this.refPoints[166] = this.CopyObjectWithModifications(this.refPoints[155], {"Name": "Velo Città ClubDay","AltNames":"VeloCitta ClubDay"});

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
