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
		//Adelaide
		this.refPoints[827815091] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-34.928456
			,"refLong":	138.618758
			,"rotation":	-1.55
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Adelaide"
			,"AltNames":	"Adelaide Adelaide_Modern"
			,"Zoom":	16
			,"MapInitLat":	-34.928456
			,"MapInitLong":	138.618758
			,"Comment":	""
		});
		//Adelaide Historic 1988
		this.refPoints[-559709709] = this.CopyObjectWithModifications(this.refPoints[827815091], {"Name": "Adelaide Historic 1988","AltNames":"Adelaide Adelaide_Historic","MapInitLat": -34.927166,"MapInitLong": 138.617828});

		//Azure Circuit
		this.refPoints[832629329] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	43.73705
			,"refLong":	7.427437
			,"rotation":	126
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.978
			,"cor_PosY_mul":0.985
			,"Name":	"Azure Circuit"
			,"AltNames":	"Azure_Circuit Azure_Circuit"
			,"Zoom":	16
			,"MapInitLat":	43.737186
			,"MapInitLong":	7.425732
			,"Comment":	"discrepancies"
		});

		//Brands Hatch GP
		this.refPoints[1534602052] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	51.36051
			,"refLong":	0.261179
			,"rotation":	2.1
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":0.998
			,"Name":	"Brands Hatch GP"
			,"AltNames":	"BrandsHatch BrandsHatch_GP"
			,"Zoom":	16
			,"MapInitLat":	51.356786
			,"MapInitLong":	0.262930
			,"Comment":	""
		});
		//Brands Hatch Indy
		this.refPoints[-572148012] = this.CopyObjectWithModifications(this.refPoints[1534602052], {"Name": "Brands Hatch Indy","AltNames":"BrandsHatch BrandsHatch_Indy","Zoom": 17,"MapInitLat": 51.359136,"MapInitLong": 0.26105});

		//Cadwell Park
		this.refPoints[1910889511] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	"small discrepancies"
		});

		//Campo Grande
		this.refPoints[2135405654] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	""
		});

		//Cascavel
		this.refPoints[-916478809] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-24.981055
			,"refLong":	-53.386346
			,"rotation":	-1
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.999
			,"cor_PosY_mul":1.003
			,"Name":	"Cascavel"
			,"AltNames":	"Cascavel4 Cascavel"
			,"Zoom":	17
			,"MapInitLat":	-24.982412
			,"MapInitLong":	-53.384565
			,"Comment":	""
		});

		//Curitiba
		this.refPoints[844082431] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	""
		});
		//Curitiba Outer
		this.refPoints[-549646259] = this.CopyObjectWithModifications(this.refPoints[844082431], {"Name": "Curitiba Outer","AltNames":"Curitiba Curitiba_outer"});

		//Curvelo Long
		this.refPoints[-923996694] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	""
		});
		//Curvelo Short
		this.refPoints[-203742941] = this.CopyObjectWithModifications(this.refPoints[-923996694], {"Name": "Curvelo Short","AltNames":"Curvelo CurveloShort"});

		//Donington GP
		this.refPoints[1497365379] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	""
		});
		//Donington National
		this.refPoints[-865646115] = this.CopyObjectWithModifications(this.refPoints[1497365379], {"Name": "Donington National","AltNames":"Donington Donington_Nat"});

		//Goiânia
		this.refPoints[-438882031] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	""
		});
		//Goiânia External
		this.refPoints[693994049] = this.CopyObjectWithModifications(this.refPoints[-438882031], {"Name": "Goiânia External","AltNames":"Goiania GoianiaOuter"});
		//Goiânia Short
		this.refPoints[-916412256] = this.CopyObjectWithModifications(this.refPoints[-438882031], {"Name": "Goiânia Short","AltNames":"Goiania GoianiaShort","Zoom": 17,"MapInitLat": -16.719984,"MapInitLong": -49.19113});

		//Guapore
		this.refPoints[2058166835] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	""
		});

		//Ibarra Autódromo Yahuarcocha
		this.refPoints[2111076703] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	0.380338
			,"refLong":	-78.098315
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.007
			,"Name":	"Ibarra Autódromo Yahuarcocha"
			,"AltNames":	"Ibarra4 Ibarra5"
			,"Zoom":	17
			,"MapInitLat":	0.380725
			,"MapInitLong":	-78.094564
			,"Comment":	"small discrepancies"
		});

		//Imola
		this.refPoints[731129913] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	""
		});
		//Imola Historic 1972
		this.refPoints[1003427592] = this.CopyObjectWithModifications(this.refPoints[731129913], {"Name": "Imola Historic 1972","AltNames":"ImolaAMS2 Imola_GP_1972"});
		//Imola Historic 1988
		this.refPoints[1544603199] = this.CopyObjectWithModifications(this.refPoints[731129913], {"Name": "Imola Historic 1988","AltNames":"ImolaAMS2 Imola_GP_1988"});
		//Imola Historic 2001
		this.refPoints[-29732804] = this.CopyObjectWithModifications(this.refPoints[731129913], {"Name": "Imola Historic 2001","AltNames":"ImolaAMS2 Imola_GP_2001"});

		//Interlagos
		this.refPoints[-1478712571] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-23.702013
			,"refLong":	-46.695844
			,"rotation":	0.2
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.004
			,"Name":	"Interlagos"
			,"AltNames":	"Interlagos Interlagos_GP"
			,"Zoom":	16
			,"MapInitLat":	-23.701256
			,"MapInitLong":	-46.696486
			,"Comment":	""
		});
		//Interlagos SCB - from V1.2.1.9
		this.refPoints[420324528] = this.CopyObjectWithModifications(this.refPoints[-1478712571], {"Name": "Interlagos SCB","AltNames":"Interlagos Interlagos_SCB"});
		//Interlagos Historic 1976
		this.refPoints[1312214486] = this.CopyObjectWithModifications(this.refPoints[-1478712571], {"Name": "Interlagos Historic 1976","AltNames":"Interlagos Interlagos_Historic","refLat": -23.701977,"refLong": -46.69619,"cor_PosX_mul": 0.985});
		//Interlagos Historic Outer
		this.refPoints[-1704124105] = this.CopyObjectWithModifications(this.refPoints[1312214486], {"Name": "Interlagos Historic Outer","AltNames":"Interlagos Interlagos_Historic_Outer"});
		//Interlagos 1991 - v1.5.2.6
		this.refPoints[930258290] = this.CopyObjectWithModifications(this.refPoints[-1478712571], {
			"Name": "Interlagos Historic 1991"
			,"AltNames":"Interlagos Interlagos_1991"
			,"refLat": -23.70202
			,"refLong": -46.69621
			,"rotation": -0.5
			,"cor_PosX_mul": 0.975
			,"cor_PosY_mul":1.0075
		});
		//Interlagos 1993 - v1.5.2.8
		this.refPoints[1641699173] = this.CopyObjectWithModifications(this.refPoints[930258290], {"Name": "Interlagos Historic 1993","AltNames":"Interlagos Interlagos_1993"});
		//Interlagos Kart One
		this.refPoints[228315736] = this.CopyObjectWithModifications(this.refPoints[-1478712571], {
			"refLat":	-23.702023
			,"refLong":	-46.695884
			,"rotation":	-0.2
			,"cor_PosX_mul":1.01
			,"cor_PosY_mul":1.005
			,"Name": "Interlagos Kart One"
			,"AltNames":"Interlagos GP"
			,"Zoom": 		18
			,"MapInitLat": -23.703726
			,"MapInitLong":-46.693496
			,"Comment":	"discrepancies"
		});
		//Interlagos Kart Two
		this.refPoints[870961348] = this.CopyObjectWithModifications(this.refPoints[228315736], {"Name": "Interlagos Kart Two","AltNames":""});
		//Interlagos Kart Three
		this.refPoints[1869056157] = this.CopyObjectWithModifications(this.refPoints[228315736], {"Name": "Interlagos Kart Three","AltNames":""});

		//Jacarepaguá Historic 1988 - not existing anymore - added coordinates where it was in the past
		this.refPoints[-89774641] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Zoom":	17
			,"MapInitLat":	-22.976879
			,"MapInitLong":	-43.393929
			,"fictional":	 true
			,"Comment":	"NA anymore"
		});
		//Jacarepaguá Historic 2005
		this.refPoints[393495474] = this.CopyObjectWithModifications(this.refPoints[-89774641], {"Name": "Jacarepaguá Historic 2005","AltNames":"Jacarepagua Jacarepagua_2005"});
		//Jacarepaguá Historic 2005 Oval
		this.refPoints[-1081969582] = this.CopyObjectWithModifications(this.refPoints[-89774641], {"Name": "Jacarepaguá Historic 2005 Oval","AltNames":"Jacarepagua Jacarepagua_OVAL","MapInitLat":-22.975779});
		//Jacarepaguá Historic 2005 SCB
		this.refPoints[-467386624] = this.CopyObjectWithModifications(this.refPoints[-89774641], {"Name": "Jacarepaguá Historic 2005 SCB","AltNames":"Jacarepagua Jacarepagua_SCB","MapInitLong":-43.396529});
		//Jacarepaguá Historic 2005 Short
		this.refPoints[1891554116] = this.CopyObjectWithModifications(this.refPoints[-89774641], {"Name": "Jacarepaguá Historic 2005 Short","AltNames":"Jacarepagua Jacarepagua_SHORT","MapInitLong":-43.395809});

		//Jerez Chicane
		this.refPoints[1406264747] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	36.708457
			,"refLong":	-6.032549
			,"rotation":	-1.75
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.9975
			,"cor_PosY_mul":1.002
			,"Name":	"Jerez Chicane"
			,"AltNames":	""
			,"Zoom":	16
			,"MapInitLat":	36.708665
			,"MapInitLong":	-6.033030
			,"Comment":	""
		});
		//Jerez Moto
		this.refPoints[-1602971785] = this.CopyObjectWithModifications(this.refPoints[1406264747], {"Name": "Jerez Moto","AltNames":"Jerez Standard"});
		//Jerez Historic 1988 - from V1.4.4.8
		this.refPoints[-1548942089] = this.CopyObjectWithModifications(this.refPoints[1406264747], {"Name": "Jerez Historic 1988","AltNames":"Jerez GP"});

		//Kansai GP
		this.refPoints[1261622488] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	"small discrepancies"
		});
		//Kansai East
		this.refPoints[530399487] = this.CopyObjectWithModifications(this.refPoints[1261622488], {"Name": "Kansai East","AltNames":"Kansai Kansai_East","MapInitLat": 34.842529,"MapInitLong": 136.540108});
		//Kansai West
		this.refPoints[85029775] = this.CopyObjectWithModifications(this.refPoints[1261622488], {"Name": "Kansai West","AltNames":"Kansai Kansai_West","Zoom": 17,"MapInitLat": 34.845769,"MapInitLong": 136.528438});
		//Kansai Classic
		this.refPoints[1035236174] = this.CopyObjectWithModifications(this.refPoints[1261622488], {"Name": "Kansai Classic","AltNames":"Kansai Kansai_Classic"});

		//Kyalami 2019
		this.refPoints[2018595322] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-25.997815
			,"refLong":	28.068152
			,"rotation":	0.03
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.992
			,"cor_PosY_mul":0.987
			,"Name":	"Kyalami 2019"
			,"AltNames":	"Kyalami Kyalami_2019"
			,"Zoom":	16
			,"MapInitLat":	-25.996806
			,"MapInitLong":	28.067484
			,"Comment":	""
		});
		//Kyalami Historic 1976 - the track layout difference between the historic and the present track is too big and areas of the old track are built up with houses - set it to fictional, but added coordinates where it was in the past
		this.refPoints[-1384297883] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-25.992763
			,"refLong":	28.06786
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Kyalami Historic 1976"
			,"AltNames":	"Kyalami Kyalami_Historic"
			,"Zoom":	16
			,"MapInitLat":	-25.994356
			,"MapInitLong":	28.068974
			,"fictional":	 true
			,"Comment":	"NA anymore"
		});

		//Londrina Long
		this.refPoints[-1959616750] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	"discrepancies"
		});
		//Londrina Short
		this.refPoints[-1540556268] = this.CopyObjectWithModifications(this.refPoints[-1959616750], {"Name": "Londrina Short","AltNames":"Londrina Londrina_short"});
		//Londrina Kart One
		this.refPoints[1373891276] = this.CopyObjectWithModifications(this.refPoints[-1959616750], {"Name": "Londrina Kart One","AltNames":"Londrina LondrinaKart1","refLat": -23.281084,"refLong": -51.167289,"cor_PosY_mul": 1.01,"Zoom": 19,"MapInitLat": -23.281612,"MapInitLong": -51.161878});
		//Londrina Kart Two
		this.refPoints[16295271] = this.CopyObjectWithModifications(this.refPoints[1373891276], {"Name": "Londrina Kart Two","AltNames":"Londrina LondrinaKart2"});

		//Montreal
		this.refPoints[-1239363445] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	45.503808
			,"refLong":	-73.523765
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1.007
			,"Name":	"Montreal"
			,"AltNames":	"Montreal Montreal_Modern"
			,"Zoom":	15
			,"MapInitLat":	45.505605
			,"MapInitLong":	-73.524751
			,"Comment":	"small discrepancies"
		});
		//Montreal Historic 1988
		this.refPoints[-696853932] = this.CopyObjectWithModifications(this.refPoints[-1239363445], {"Name": "Montreal Historic 1988","AltNames":"Montreal Montreal_Historic"});
		//Montreal Historic 1991 - V1.5.2.0
		this.refPoints[880948150] = this.CopyObjectWithModifications(this.refPoints[-1239363445], {"Name": "Montreal Historic 1991","AltNames":"Montreal Montreal_Historic_1991"});

		//Ortona Kart One
		this.refPoints[809214670] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	""
		});
		//Ortona Kart Two
		this.refPoints[1549441566] = this.CopyObjectWithModifications(this.refPoints[809214670], {"Name": "Ortona Kart Two","AltNames":"Ortona Ortona_2"});
		//Ortona Kart Three
		this.refPoints[-1213903939] = this.CopyObjectWithModifications(this.refPoints[809214670], {"Name": "Ortona Kart Three","AltNames":"Ortona Ortona_3"});
		//Ortona Kart Four
		this.refPoints[59749392] = this.CopyObjectWithModifications(this.refPoints[809214670], {"Name": "Ortona Kart Four","AltNames":"Ortona Ortona4","MapInitLat": 42.305336});

		//Oulton Park International
		this.refPoints[-498735748] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	53.180045
			,"refLong":	-2.612829
			,"rotation":	-0.3
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.997
			,"cor_PosY_mul":0.9992
			,"Name":	"Oulton Park International"
			,"AltNames":	"OultonPark OultonPark_International"
			,"Zoom":	15
			,"MapInitLat":	53.176808
			,"MapInitLong":	-2.616589
			,"Comment":	""
		});
		//Oulton Park Fosters
		this.refPoints[-92069206] = this.CopyObjectWithModifications(this.refPoints[-498735748], {"Name": "Oulton Park Fosters","AltNames":"OultonPark OultonPark_Fosters","Zoom": 16,"MapInitLat": 53.178898});
		//Oulton Park Island
		this.refPoints[1820168870] = this.CopyObjectWithModifications(this.refPoints[-498735748], {"Name": "Oulton Park Island","AltNames":"OultonPark OultonPark_Island"});
		//Oulton Park Classic
		this.refPoints[-914088887] = this.CopyObjectWithModifications(this.refPoints[-498735748], {"Name": "Oulton Park Classic","AltNames":"OultonPark OultonPark_Classic"});

		//Santa Cruz do Sul
		this.refPoints[1932830334] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-29.799978
			,"refLong":	-52.436404
			,"rotation":	-0.3
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1.035
			,"cor_PosY_mul":1.04
			,"Name":	"Santa Cruz do Sul"
			,"AltNames":	"SantaCruz SantaCruzDoSul"
			,"Zoom":	16
			,"MapInitLat":	-29.799883
			,"MapInitLong":	-52.436274
			,"Comment":	"discrepancies"
		});

		//Snetterton 300
		this.refPoints[987592900] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	52.464919
			,"refLong":	0.947226
			,"rotation":	1.6
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.997
			,"cor_PosY_mul":0.999
			,"Name":	"Snetterton 300"
			,"AltNames":	"Snetterton Snetterton_300"
			,"Zoom":	16
			,"MapInitLat":	52.464971
			,"MapInitLong":	0.947056
			,"Comment":	""
		});
		//Snetterton 200
		this.refPoints[-1338478783] = this.CopyObjectWithModifications(this.refPoints[987592900], {"Name": "Snetterton 200","AltNames":"Snetterton Snetterton_200"});
		//Snetterton 100
		this.refPoints[-1470317805] = this.CopyObjectWithModifications(this.refPoints[987592900], {"Name": "Snetterton 100","AltNames":"Snetterton Snetterton_100","Zoom": 17,"MapInitLong": 0.942476});

		//Spielberg GP
		this.refPoints[735562025] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	47.219792
			,"refLong":	14.763686
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.994
			,"cor_PosY_mul":1
			,"Name":	"Spielberg GP"
			,"AltNames":	"Spielberg Spielberg_Modern"
			,"Zoom":	16
			,"MapInitLat":	47.223546
			,"MapInitLong":	14.761707
			,"Comment":	"discrepancies"
		});
		//Spielberg Short
		this.refPoints[1819432538] = this.CopyObjectWithModifications(this.refPoints[735562025], {"Name": "Spielberg Short","AltNames":"Spielberg Spielberg_Short","refLong": 14.763715,"cor_PosX_mul": 0.997,"cor_PosY_mul": 0.997,"Zoom": 17,"MapInitLat": 47.221266,"MapInitLong": 14.764347});
		//Spielberg Historic 1974
		this.refPoints[-213305159] = this.CopyObjectWithModifications(this.refPoints[735562025], {"Name": "Spielberg Historic 1974","AltNames":"Spielberg Spielberg_Vintage","refLat": 47.219763,"refLong": 14.763679,"cor_PosX_mul": 0.997,"cor_PosY_mul": 0.99,"MapInitLat": 47.223176,"MapInitLong": 14.760487});
		//Spielberg Historic 1977
		this.refPoints[-100668052] = this.CopyObjectWithModifications(this.refPoints[-213305159], {"Name": "Spielberg Historic 1977","AltNames":"Spielberg Spielberg_Historic"});

		//Tarumã Internacional
		this.refPoints[2074495683] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-30.048717
			,"refLong":	-51.018292
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.992
			,"cor_PosY_mul":0.99
			,"Name":	"Tarumã Internacional"
			,"AltNames":	"Taruma Taruma_Internacional"
			,"Zoom":	17
			,"MapInitLat":	-30.048547
			,"MapInitLong":	-51.019394
			,"Comment":	"discrepancies"
		});
		//Tarumã Chicane
		this.refPoints[-108853074] = this.CopyObjectWithModifications(this.refPoints[2074495683], {"Name": "Tarumã Chicane","AltNames":"Taruma Taruma_Chicane"});

		//Velo Città
		this.refPoints[1882187011] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-22.287702
			,"refLong":	-46.848099
			,"rotation":	-0.65
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.003
			,"Name":	"Velo Città"
			,"AltNames":	"VeloCitta VeloCitta1"
			,"Zoom":	16
			,"MapInitLat":	-22.289251
			,"MapInitLong":	-46.848153
			,"Comment":	"small discrepancies"
		});
		//Velo Città Track Day
		this.refPoints[1557615576] = this.CopyObjectWithModifications(this.refPoints[1882187011], {"Name": "Velo Città Track Day","AltNames":"VeloCitta VeloCittaTD"});
		//Velo Città Club Day
		this.refPoints[1956507207] = this.CopyObjectWithModifications(this.refPoints[1882187011], {"Name": "Velo Città Club Day","AltNames":"VeloCitta VeloCittaClubDay","Zoom": 17,"MapInitLat": -22.287711,"MapInitLong": -46.849323});

		//Velopark 2017
		this.refPoints[-1642426225] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-29.823389
			,"refLong":	-51.320824
			,"rotation":	-0.5
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1.04
			,"cor_PosY_mul":1.044
			,"Name":	"Velopark 2017"
			,"AltNames":	"Velopark Velopark_2017"
			,"Zoom":	16
			,"MapInitLat":	-29.823810
			,"MapInitLong":	-51.320110
			,"Comment":	""
		});
		//Velopark 2010
		this.refPoints[193535285] = this.CopyObjectWithModifications(this.refPoints[-1642426225], {"Name": "Velopark 2010","AltNames":"Velopark Velopark_2010"});

		//Virginia Full
		this.refPoints[1063112912] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment":	""
		});		
		//Virgina Grand
		this.refPoints[-1592912773] = this.CopyObjectWithModifications(this.refPoints[1063112912], {"Name": "VIRginia International Raceway Grand","AltNames":"Virginia Virginia_Grand"});
		//Virgina North
		this.refPoints[2134032188] = this.CopyObjectWithModifications(this.refPoints[1063112912], {"Name": "VIRginia International Raceway North","AltNames":"Virginia Virginia_North","Zoom":16,"MapInitLat":36.564636});
		//Virgina South
		this.refPoints[-1235504884] = this.CopyObjectWithModifications(this.refPoints[1063112912], {"Name": "VIRginia International Raceway South","AltNames":"Virginia Virginia_South","Zoom":16,"MapInitLat":36.556187,"MapInitLong":-79.206856});
		//Virgina Patriot
		this.refPoints[1284894334] = this.CopyObjectWithModifications(this.refPoints[1063112912], {"Name": "VIRginia International Raceway Patriot","AltNames":"Virginia Virginia_Patriot","Zoom":17,"MapInitLat":36.558623,"MapInitLong":-79.207231});



		// temporarily used dummy IDs till DS is updated

		//Brasília Full / Autódromo de Brasília / Autódromo Internacional Nelson Piquet
		this.refPoints[202837760] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-15.772805
			,"refLong":	-47.899622
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.98
			,"cor_PosY_mul":1.025
			,"Name":	"Brasília Full"
			,"AltNames":	"Brasilia Brasilia_Full"
			,"Zoom":	16
			,"MapInitLat":	-15.775946
			,"MapInitLong":	-47.899455
			,"Comment":	"Discrepancies"
		});
		//Brasília Outer
		this.refPoints[1828328431] = this.CopyObjectWithModifications(this.refPoints[202837760], {"Name": "Brasília Outer","AltNames":"Brasilia Brasilia_Outer"});

		//Granja Viana CopaSaoPauloStage2
		this.refPoints[-939269561] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-23.604927
			,"refLong":	-46.836331
			,"rotation":	-0.5
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.99
			,"cor_PosY_mul":1.01
			,"Name":	"Granja Viana CopaSaoPauloStage2"
			,"AltNames":	"Granja_Viana CopaSaoPauloStage2"
			,"Zoom":	18
			,"MapInitLat":	-23.605089
			,"MapInitLong":	-46.836638
			,"Comment":	""
		});
		//Granja Viana GranjaVianaKart101
		this.refPoints[-844021865] = this.CopyObjectWithModifications(this.refPoints[-939269561], {"Name": "Granja Viana GranjaVianaKart101","AltNames":"Granja_Viana GranjaVianaKart101"});
		//Granja Viana GranjaVianaKart102
		this.refPoints[553029608] = this.CopyObjectWithModifications(this.refPoints[-939269561], {"Name": "Granja Viana GranjaVianaKart102","AltNames":"Granja_Viana GranjaVianaKart102"});
		//Granja Viana GranjaVianaKart121
		this.refPoints[1153901510] = this.CopyObjectWithModifications(this.refPoints[-939269561], {"Name": "Granja Viana GranjaVianaKart121","AltNames":"Granja_Viana GranjaVianaKart121"});

		//Cascais (Estoril)
		this.refPoints[1650761166] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	38.750455
			,"refLong":	-9.393799
			,"rotation":	0.25
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.002
			,"Name":	"Cascais"
			,"AltNames":	"Cascais GP"
			,"Zoom":	16
			,"MapInitLat":	38.750706
			,"MapInitLong":	-9.393352
			,"Comment":	""
		});
		//Cascais Alternate - from V1.2.1.6
		this.refPoints[-1015082583] = this.CopyObjectWithModifications(this.refPoints[1650761166], {"Name": "Cascais Alternate","AltNames":"Cascais Cascais_Alternate"});
		//Cascais Historic 1988 - from V1.4.4.8
		this.refPoints[-869897529] = this.CopyObjectWithModifications(this.refPoints[1650761166], {"Name": "Cascais Historic 1988","AltNames":"Cascais Cascais_1988"});

		//Bathurst 2020
		this.refPoints[1080325116] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-33.448739
			,"refLong":	149.54617
			,"rotation":	1.3
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.003
			,"Name":	"Bathurst 2020"
			,"AltNames":	"Bathurst Bathurst_2020"
			,"Zoom":	15
			,"MapInitLat":	-33.448809
			,"MapInitLong":	149.555024
			,"Comment":	"Discrepancies"
		});
		//Bathurst 1983
		this.refPoints[-620880244] = this.CopyObjectWithModifications(this.refPoints[1080325116], {"Name": "Bathurst 1983","AltNames":"Bathurst Bathurst_1983"});

		//Hockenheim
		this.refPoints[-435924753] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	49.328901
			,"refLong":	8.565022
			,"rotation":	0.35
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Hockenheim"
			,"AltNames":	"Hockenheim GP"
			,"Zoom":	16
			,"MapInitLat":	49.329718
			,"MapInitLong":	8.574300
			,"Comment":	""
		});
		//Hockenheim National
		this.refPoints[-327427534] = this.CopyObjectWithModifications(this.refPoints[-435924753], {"Name": "Hockenheim National","AltNames":"","MapInitLong":8.5725});
		//Hockenheim Short A
		this.refPoints[239659483] = this.CopyObjectWithModifications(this.refPoints[-435924753], {"Name": "Hockenheim Short A","AltNames":"Hockenheim Short_A","MapInitLat":49.329058,"MapInitLong":8.56877});
		//Hockenheim Short B
		this.refPoints[230784137] = this.CopyObjectWithModifications(this.refPoints[-435924753], {"Name": "Hockenheim Short B","AltNames":"Hockenheim Short_B","MapInitLat":49.329058,"MapInitLong":8.56877});
		//Hockenheim Historic 2001
		this.refPoints[-108270200] = this.CopyObjectWithModifications(this.refPoints[-435924753], {"Name": "Hockenheim Historic 2001","AltNames":"Hockenheim GP_2001","Zoom":15,"MapInitLat":49.332988,"MapInitLong":8.58105});
		//Hockenheim Historic 1988
		this.refPoints[534374248] = this.CopyObjectWithModifications(this.refPoints[-108270200], {"Name": "Hockenheim Historic 1988","AltNames":"Hockenheim GP_1988"});
		//Hockenheim Historic 1988 Short
		this.refPoints[-543681041] = this.CopyObjectWithModifications(this.refPoints[-108270200], {"Name": "Hockenheim Historic 1988 Short","AltNames":"Hockenheim Hockenheim_1988_short","Zoom":16,"MapInitLat":49.328698,"MapInitLong":8.56829});
		//Hockenheim Historic 1977
		this.refPoints[473366003] = this.CopyObjectWithModifications(this.refPoints[-108270200], {"Name": "Hockenheim Historic 1977","AltNames":"Hockenheim GP_1977"});
		//Hockenheim Rallycross - 1.4.9.7   - same Track ID as in pcars2
		this.refPoints[761864750] = this.CopyObjectWithModifications(this.refPoints[-435924753], {"Name": "Hockenheim Rallycross","AltNames":"Hockenheim GP","Zoom":17,"MapInitLat":49.327448,"MapInitLong":8.56839});

		//Silverstone GP
		this.refPoints[-931849903] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	52.071259
			,"refLong":	-1.016689
			,"rotation":	-1.55
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.997
			,"cor_PosY_mul":0.9995
			,"Name":	"Silverstone GP"
			,"AltNames":	"Silverstone Silverstone_GP"
			,"Zoom":	15
			,"MapInitLat":	52.071727
			,"MapInitLong":	-1.015736
			,"Comment":	""
		});
		//Silverstone Historic 2001
		this.refPoints[509991425] = this.CopyObjectWithModifications(this.refPoints[-931849903], {"Name": "Silverstone Historic 2001","AltNames":"Silverstone Silverstone_2001"});
		//Silverstone Historic 1991
		this.refPoints[-797317755] = this.CopyObjectWithModifications(this.refPoints[-931849903], {"Name": "Silverstone Historic 1991","AltNames":"Silverstone Silverstone_1991","MapInitLat":52.071277});
		//Silverstone Historic 1975
		this.refPoints[-526206945] = this.CopyObjectWithModifications(this.refPoints[-797317755], {"Name": "Silverstone Historic 1975","AltNames":"Silverstone Silverstone_1975","MapInitLat":52.071277});
		//Silverstone Historic 1975 No Chicane
		this.refPoints[-533867030] = this.CopyObjectWithModifications(this.refPoints[-797317755], {"Name": "Silverstone Historic 1975 No Chicane","AltNames":"Silverstone Silverstone_1975_No_Chicane"});
		//Silverstone National Historic 2001
		this.refPoints[-507834810] = this.CopyObjectWithModifications(this.refPoints[-931849903], {"Name": "Silverstone National Historic 2001","AltNames":"Silverstone Silverstone_2001_National","Zoom":16,"MapInitLat":52.075957});
		//Silverstone International Historic 2001
		this.refPoints[1648317775] = this.CopyObjectWithModifications(this.refPoints[-931849903], {"Name": "Silverstone International Historic 2001","AltNames":"Silverstone Silverstone_2001_International","MapInitLat":52.074607});
		//Silverstone National
		this.refPoints[-1061474453] = this.CopyObjectWithModifications(this.refPoints[-931849903], {"Name": "Silverstone National","AltNames":"Silverstone Silverstone_Natl_2019","Zoom":16,"MapInitLat":52.076347});
		//Silverstone International
		this.refPoints[964004535] = this.CopyObjectWithModifications(this.refPoints[-931849903], {"Name": "Silverstone International","AltNames":"Silverstone Silverstone_Intl_2019","MapInitLat":52.068097});

		//Buskerud Long
		this.refPoints[-1786068114] = this.CopyObjectWithModifications(this.refPoints[8888888888],
		{
			//"refLat":	-22.976979
			//,"refLong":	-43.394669
			//,
			"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1
			,"Name":	"Buskerud Long"
			,"AltNames":	"Buskerud Buskerud_Long"
			,"Zoom":	17
			,"MapInitLat":	40.998954
			,"MapInitLong":	-113.566703
			,"fictional":	 true
			,"Comment":	""
		});
		//Buskerud Short
		this.refPoints[2097280990] = this.CopyObjectWithModifications(this.refPoints[-1786068114], {"Name": "Buskerud Short","AltNames":"Buskerud Buskerud_Short","MapInitLat":40.998344});

		//Speedland Kart Center 1
		this.refPoints[756011139] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	-23.532388
			,"refLong":	-46.584453
			,"rotation":	-0.5
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1.015
			,"cor_PosY_mul":1.002
			,"Name":	"Speedland 1"
			,"AltNames":	"Speedland Speedland1"
			,"Zoom":	19
			,"MapInitLat":	-23.532057
			,"MapInitLong":	-46.584825
			,"Comment":	"WIP"
		});
		//Speedland Kart Center 2
		this.refPoints[-588458518] = this.CopyObjectWithModifications(this.refPoints[756011139], {"Name": "Speedland 2","AltNames":"Speedland Speedland2"});
		//Speedland Kart Center 3
		this.refPoints[-327486946] = this.CopyObjectWithModifications(this.refPoints[756011139], {"Name": "Speedland 3","AltNames":"Speedland Speedland3"});
		//Speedland Kart Center 4
		this.refPoints[-1941017299] = this.CopyObjectWithModifications(this.refPoints[756011139], {"Name": "Speedland 4","AltNames":"Speedland Speedland4"});

		//Nürburgring GP 2020
		this.refPoints[899109770] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	50.332773
			,"refLong":	6.943377
			,"rotation":	-0.75
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.999
			,"cor_PosY_mul":0.9995
			,"Name":	"Nürburgring GP 2020"
			,"AltNames":	"Nurburgring_2020 Nurb_GP_2020"
			,"Zoom":	15
			,"MapInitLat":	50.331144
			,"MapInitLong":	6.940467
			,"Comment":	""
		});
		//Nürburgring Sprint 2020
		this.refPoints[1133983668] = this.CopyObjectWithModifications(this.refPoints[899109770], {"Name": "Nürburgring Sprint 2020","AltNames":"Nurburgring_2020 Nurb_GP_2020_Sprint","Zoom":16,"MapInitLat":50.333534,"MapInitLong":6.943427});
		//Nürburgring Sprint S 2020
		this.refPoints[1819021861] = this.CopyObjectWithModifications(this.refPoints[1133983668], {"Name": "Nürburgring Sprint S 2020","AltNames":"Nurburgring_2020 Nurb_GP_2020_Sprint_S"});
		//Nürburgring Veedol 2020
		this.refPoints[-581740816] = this.CopyObjectWithModifications(this.refPoints[899109770], {"Name": "Nürburgring Veedol 2020","AltNames":"Nurburgring_2020 Nurb_GP_2020_Veedol"});
		//Nürburgring RX - 1.4.9.8
		this.refPoints[-1012344423] = this.CopyObjectWithModifications(this.refPoints[899109770], {"Name": "Nürburgring RX","AltNames":"Nurburgring_2020 RX","Zoom":17,"MapInitLat":50.325774,"MapInitLong":6.936487});
		//Nordschleife 2020
		this.refPoints[884472481] = this.CopyObjectWithModifications(this.refPoints[899109770],
		{
				"rotation":		-0.815
				,"cor_PosX_mul":0.9979
				,"cor_PosY_mul":0.9996
				,"Name": 		"Nordschleife 2020"
				,"AltNames":	"Nurburgring_2020 Nordschleife_2020"
				,"Zoom":	13
				,"MapInitLat":	50.359101
				,"MapInitLong":	6.962529
		});
		//Nordschleife 2020 24h
		this.refPoints[-472366150] = this.CopyObjectWithModifications(this.refPoints[884472481], {"Name": "Nordschleife 2020 24h","AltNames":"Nurburgring_2020 Nordschleife_2020_24hr","MapInitLat":50.353881});
		//Gesamtstrecke Historic 1971
		this.refPoints[-1099915987] = this.CopyObjectWithModifications(this.refPoints[884472481], {"Name": "Gesamtstrecke Historic 1971","AltNames":"Nurburgring_2020 Nurb_1971_Gesamt","MapInitLat":50.34988});
		//Nordschleife Historic 1971
		this.refPoints[399001429] = this.CopyObjectWithModifications(this.refPoints[884472481], {"Name": "Nordschleife Historic 1971","AltNames":"Nurburgring_2020 Nurb_1971_Nords"});
		//Südschleife Historic 1971
		this.refPoints[199279675] = this.CopyObjectWithModifications(this.refPoints[884472481], {"Name": "Südschleife Historic 1971","AltNames":"Nurburgring_2020 Nurb_1971_Suds","Zoom":14,"MapInitLat":50.32758,"MapInitLong":6.93579});

		//Spa-Francorchamps 2020
		this.refPoints[-1262750090] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	50.437348
			,"refLong":	5.967998
			,"rotation":	-2.3
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.9965
			,"cor_PosY_mul":0.9995
			,"Name":	"Spa-Francorchamps 2020"
			,"AltNames":	"SpaFrancorchamps Spa_Francorchamps_2020"
			,"Zoom":	15
			,"MapInitLat":	50.436800
			,"MapInitLong":	5.970570
			,"Comment":	""
		});
		//Spa-Francorchamps Historic 1993
		this.refPoints[1283905272] = this.CopyObjectWithModifications(this.refPoints[-1262750090], {"Name": "Spa-Francorchamps Historic 1993","AltNames":"SpaFrancorchamps Spa_Francorchamps_1993"});
		//V1.4
		//Spa-Francorchamps 2022
		this.refPoints[775712153] = this.CopyObjectWithModifications(this.refPoints[-1262750090], {"Name": "Spa-Francorchamps 2022","AltNames":"SpaFrancorchamps Spa_Francorchamps_2022"});
		//Spa-Francorchamps RX - V1.5.0.0
		this.refPoints[-1531498465] = this.CopyObjectWithModifications(this.refPoints[-1262750090], {"Name": "Spa-Francorchamps RX","AltNames":"SpaFrancorchamps Spa_Francorchamps_2022_RX","Zoom":17,"MapInitLat":50.44302,"MapInitLong":5.97125});
		//V1.4.2.9
		//Spa-Francorchamps 1970
		this.refPoints[-1736505524] = this.CopyObjectWithModifications(this.refPoints[-1262750090],
		{
			"refLat":	50.437348
			,"refLong":	5.967996
			,"rotation":	-2.28
			,"cor_PosX_mul":0.9963
			,"cor_PosY_mul":0.9997
			,"Name":	"Spa-Francorchamps 1970"
			,"AltNames":	"SpaFrancorchamps Spa_Francorchamps_1970"
			,"Zoom":	14
			,"MapInitLat":	50.4247
			,"MapInitLong":	5.97057
			,"Comment":	""
		});
		//Spa-Francorchamps 1970 1000km
		this.refPoints[1170932587] = this.CopyObjectWithModifications(this.refPoints[-1736505524], {"Name": "Spa-Francorchamps 1970 1000km","AltNames":"SpaFrancorchamps Spa_Francorchamps_1970_1000km"});

		//V1.1.5.5
		//Daytona Road Course
		this.refPoints[467707118] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		29.185571
			,"refLong":		-81.069434
			,"rotation":		-125.8
			,"cor_r_Long":		0
			,"cor_r_Lat":		0
			,"cor_PosX_mul":	1.002
			,"cor_PosY_mul":	0.999
			,"Name":		"Daytona Road Course"
			,"AltNames":	 	"Daytona Daytona_Road_Course"
			,"Zoom":		16
			,"MapInitLat":	29.185007
			,"MapInitLong":	-81.069100
			,"Comment":		"same Track ID as pcars2"
		});
		//Daytona Nascar Road Course
		this.refPoints[705412912] = this.CopyObjectWithModifications(this.refPoints[467707118], {"Name": "Daytona Nascar Road Course","AltNames":"Daytona Daytona_Nascar_Road_Course","Comment":""});
		//V1.3.9.8
		//Daytona Tri-Oval
		this.refPoints[2054003546] = this.CopyObjectWithModifications(this.refPoints[467707118], {"Name": "Daytona Tri-Oval","AltNames":"Daytona Daytona_Speedway_Tri_Oval","Comment":""});

		//Long Beach
		this.refPoints[1731699995] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":        33.763798
			,"refLong":      -118.191507
			,"rotation":     0.6
			,"cor_r_Long":   0
			,"cor_r_Lat":    0
			,"cor_PosX_mul": 0.998
			,"cor_PosY_mul": 1.002
			,"Name":         "Long Beach"
			,"AltNames":	 "Long_Beach Long_Beach"
			,"Zoom":         17
			,"MapInitLat":   33.764020
			,"MapInitLong":  -118.190768
			,"Comment": "same Track ID as pcars2"
		});

		//V1.1.7.0
		//Laguna Seca
		this.refPoints[568559152] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		36.584272
			,"refLong":		-121.753386
			,"rotation":	-0.75
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.003
			,"Name":		"Laguna Seca"
			,"AltNames":	"Laguna_Seca Laguna_Seca_2020"
			,"Zoom":		16
			,"MapInitLat":	36.584275
			,"MapInitLong":	-121.753345
			,"Comment": ""
		});

		//V1.2.1.7
		//Salvador Street Circuit
		this.refPoints[761562120] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		-12.944537
			,"refLong":		-38.431418
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1.005
			,"cor_PosY_mul":1.007
			,"Name":		"Salvador Street Circuit"
			,"AltNames":	"Salvador Salvador_Street_Circuit"
			,"Zoom":		17
			,"MapInitLat":	-12.946795
			,"MapInitLong":	-38.429754
			,"Comment": ""
		});

		//V1.2.3.5
		//Monza
		this.refPoints[-1257095693] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		45.623527
			,"refLong":		9.284271
			,"rotation":	-0.2
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.9975
			,"cor_PosY_mul":1.001
			,"Name":		"Monza"
			,"AltNames":	"Monza Monza_2020"
			,"Zoom":		15
			,"MapInitLat":	45.621690
			,"MapInitLong":	9.286990
			,"Comment": ""
		});
		//Monza Junior
		this.refPoints[-2098177408] = this.CopyObjectWithModifications(this.refPoints[-1257095693], {"Name": "Monza Junior","AltNames":"Monza Monza_2020_Junior","Zoom":16,"MapInitLat":45.61679,"MapInitLong":9.28292});
		//V1.2.3.8
		//Monza Historic 1971
		this.refPoints[-332593300] = this.CopyObjectWithModifications(this.refPoints[-1257095693], {"Name": "Monza Historic 1971","AltNames":"Monza Monza_1971"});
		//Monza Historic 1971 Junior
		this.refPoints[-1956398437] = this.CopyObjectWithModifications(this.refPoints[-1257095693], {"Name": "Monza Historic 1971 Junior","AltNames":"Monza Monza_1971_Junior","Zoom":16,"MapInitLat":45.61679,"MapInitLong":9.28292});
		//Monza Historic 1971 10km
		this.refPoints[-2054918047] = this.CopyObjectWithModifications(this.refPoints[-1257095693], {"Name": "Monza Historic 1971 10km","AltNames":"Monza Monza_1971_10k"});
		//Monza Historic 1971 10km no chicane
		this.refPoints[612695202] = this.CopyObjectWithModifications(this.refPoints[-1257095693], {"Name": "Monza Historic 1971 10km no chicane","AltNames":"Monza Monza_1971_10knc"});
		//V1.2.4.0
		//Monza 1991
		this.refPoints[1003665316] = this.CopyObjectWithModifications(this.refPoints[-1257095693], {"Name": "Monza 1991","AltNames":"Monza Monza_1991"});

		//V1.2.9.0
		//Azure Circuit 2021
		this.refPoints[-1939104917] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":	43.737142
			,"refLong":	7.427485
			,"rotation":	125.7
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.997
			,"cor_PosY_mul":0.998
			,"Name":	"Azure Circuit 2021"
			,"AltNames":	"Azure_Circuit Azure_Circuit_2021"
			,"Zoom":	16
			,"MapInitLat":	43.737186
			,"MapInitLong":	7.425732
			,"Comment":	""
		});

		//V1.3.1.0
		//Watkins Glen GP
		this.refPoints[-875185854] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		42.336421
			,"refLong":		-76.924775
			,"rotation":	1.3
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.997
			,"cor_PosY_mul":1.001
			,"Name":		"Watkins Glen GP"
			,"AltNames":	"Watkins_Glen Watkins_Glen_GP"
			,"Zoom":		15
			,"MapInitLat":	42.336564
			,"MapInitLong":	-76.924519
			,"Comment": ""
		});
		//Watkins Glen GP Inner Loop
		this.refPoints[-191952188] = this.CopyObjectWithModifications(this.refPoints[-875185854], {"Name": "Watkins Glen GP Inner Loop","AltNames":"Watkins_Glen Watkins_Glen_GPIL"});
		//Watkins Glen Short
		this.refPoints[2035789624] = this.CopyObjectWithModifications(this.refPoints[-875185854], {"Name": "Watkins Glen Short","AltNames":"Watkins_Glen Watkins_Glen_S","MapInitLat":42.337204});
		//Watkins Glen Short Inner Loop
		this.refPoints[-619438500] = this.CopyObjectWithModifications(this.refPoints[-875185854], {"Name": "Watkins Glen Short Inner Loop","AltNames":"Watkins_Glen Watkins_Glen_SIL","MapInitLat":42.337204});

		//Cleveland GP
		this.refPoints[-2123543761] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		41.520765
			,"refLong":		-81.678257
			,"rotation":	0.53
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.999
			,"cor_PosY_mul":0.999
			,"Name":		"Cleveland GP"
			,"AltNames":	"Cleveland Cleveland_GP"
			,"Zoom":		16
			,"MapInitLat":	41.51866
			,"MapInitLong":	-81.679858
			,"Comment": ""
		});

		//V1.3.3.0
		//Road America
		this.refPoints[-398562049] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		43.798198
			,"refLong":		-87.996168
			,"rotation":	0.68
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.997
			,"cor_PosY_mul":1.001
			,"Name":		"Road America"
			,"AltNames":	"Road_America Road_America_RC"
			,"Zoom":		15
			,"MapInitLat":	43.798710
			,"MapInitLong":	-87.995182
			,"Comment": ""
		});
		//Road America (Bend)
		this.refPoints[372107672] = this.CopyObjectWithModifications(this.refPoints[-398562049], {"Name": "Road America (Bend)","AltNames":"Road_America Road_America_RCB"});

		//V1.3.5.0
		//Galeão Airport
		this.refPoints[1674501695] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		-22.799539
			,"refLong":		-43.239885
			,"rotation":	0.8
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1.003
			,"Name":		"Galeão Airport"
			,"AltNames":	"Galeao_Airport Galeao_Airport"
			,"Zoom":		17
			,"MapInitLat":	-22.799817
			,"MapInitLong":	-43.23892
			,"Comment": ""
		});

		//V1.3.7.3
		//Buenos Aires Circuito No.15
		this.refPoints[-430748509] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		-34.694051
			,"refLong":		-58.458974
			,"rotation":	-0.1
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.974
			,"cor_PosY_mul":0.976
			,"Name":		"Buenos Aires Circuito No.15"
			,"AltNames":	"Buenos_Aires Buenos_Aires_Circuito_15"
			,"Zoom":		16
			,"MapInitLat":	-34.690437
			,"MapInitLong":	-58.455127
			,"Comment": ""
		});
		//Buenos Aires Circuito No.12
		this.refPoints[799677855] = this.CopyObjectWithModifications(this.refPoints[-430748509], {"Name": "Buenos Aires Circuito No.12","AltNames":"Buenos_Aires Buenos_Aires_Circuito_12"});
		//Buenos Aires Circuito No.6 S
		this.refPoints[-1914387303] = this.CopyObjectWithModifications(this.refPoints[-430748509], {"Name": "Buenos Aires Circuito No.6 S","AltNames":"Buenos_Aires Buenos_Aires_Circuito_6","Zoom":17,"MapInitLat":-34.69445,"MapInitLong":-58.459867});
		//Buenos Aires Circuito No.6
		this.refPoints[-44643975] = this.CopyObjectWithModifications(this.refPoints[-1914387303], {"Name": "Buenos Aires Circuito No.6","AltNames":"Buenos_Aires Buenos_Aires_Circuito_6T"});
		//Buenos Aires Circuito No.7
		this.refPoints[-1297377774] = this.CopyObjectWithModifications(this.refPoints[-1914387303], {"Name": "Buenos Aires Circuito No.7","AltNames":"Buenos_Aires Buenos_Aires_Circuito_7"});
		//Buenos Aires Circuito No.8
		this.refPoints[-444279793] = this.CopyObjectWithModifications(this.refPoints[-1914387303], {"Name": "Buenos Aires Circuito No.8","AltNames":"Buenos_Aires Buenos_Aires_Circuito_8"});
		//Buenos Aires Circuito No.9
		this.refPoints[325651039] = this.CopyObjectWithModifications(this.refPoints[-1914387303], {"Name": "Buenos Aires Circuito No.9","AltNames":"Buenos_Aires Buenos_Aires_Circuito_9"});

		//V1.3.7.6
		//Termas de Río Hondo
		this.refPoints[163877389] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		-27.507524
			,"refLong":		-64.915548
			,"rotation":	-0.9
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.9985
			,"cor_PosY_mul":1.004
			,"Name":		"Termas de Río Hondo"
			,"AltNames":	"Termas_Rio_Hondo Termas_Rio_Hondo"
			,"Zoom":		16
			,"MapInitLat":	-27.507662
			,"MapInitLong":	-64.913847
			,"Comment": ""
		});

		//V1.3.8.0
		//Córdoba TC
		this.refPoints[-1142444519] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		-31.573589
			,"refLong":		-64.363897
			,"rotation":	-0.05
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.003
			,"Name":		"Córdoba TC"
			,"AltNames":	"Cordoba Cordoba_International"
			,"Zoom":		17
			,"MapInitLat":	-31.575023
			,"MapInitLong":	-64.361592
			,"Comment": ""
		});
		//Córdoba No.4 / Córdoba GP
		this.refPoints[-1043857231] = this.CopyObjectWithModifications(this.refPoints[-1142444519], {"Name": "Córdoba No.4","AltNames":"Cordoba Cordoba_GP"});
		//Córdoba No.2 / Córdoba National
		this.refPoints[-171682166] = this.CopyObjectWithModifications(this.refPoints[-1142444519], {"Name": "Córdoba No.2","AltNames":"Cordoba Cordoba_NATL","MapInitLong":-64.364662});

		//V1.3.9.4
		//WWT Raceway Road Course 1
		this.refPoints[-385022794] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		38.651002
			,"refLong":		-90.135621
			,"rotation":	-1.85
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1
			,"cor_PosY_mul":1.001
			,"Name":		"WWT Raceway Road Course 1"
			,"AltNames":	"Gateway Gateway_RC1"
			,"Zoom":		16
			,"MapInitLat":	38.651326
			,"MapInitLong":	-90.135041
			,"Comment": ""
		});
		//WWT Raceway Road Course 2
		this.refPoints[175033766] = this.CopyObjectWithModifications(this.refPoints[-385022794], {"Name": "WWT Raceway Road Course 2","AltNames":"Gateway Gateway_RC2"});
		//V1.3.9.8
		//WWT Raceway Oval
		this.refPoints[2044979547] = this.CopyObjectWithModifications(this.refPoints[-385022794], {"Name": "WWT Raceway Oval","AltNames":"Gateway Gateway_OVAL"});

		//V1.3.9.8
		//Auto Club Speedway Sports Car Course
		this.refPoints[-1899621736] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		34.088868
			,"refLong":		-117.500521
			,"rotation":	0.27
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.998
			,"cor_PosY_mul":1.003
			,"Name":		"Auto Club Speedway Sports Car Course"
			,"AltNames":	"Fontana Fontana_SCC"
			,"Zoom":		17
			,"MapInitLat":	34.088944
			,"MapInitLong":	-117.500440
			,"Comment": ""
		});
		//Auto Club Speedway Oval
		this.refPoints[1602044389] = this.CopyObjectWithModifications(this.refPoints[-1899621736], {"Name": "Auto Club Speedway Oval","AltNames":"Fontana Fontana_OVAL"});

		//V1.4.3.2
		//Indianapolis Motor Speedway Road Course
		this.refPoints[328837350] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		39.793347
			,"refLong":		-86.238889
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.9975
			,"cor_PosY_mul":1.002
			,"Name":		"Indianapolis Motor Speedway Road Course"
			,"AltNames":	"Indianapolis Indianapolis_2022_RC"
			,"Zoom":		15
			,"MapInitLat":	39.794972
			,"MapInitLong":	-86.234559
			,"Comment": ""
		});
		//Indianapolis Motor Speedway Oval
		this.refPoints[-468654879] = this.CopyObjectWithModifications(this.refPoints[328837350], {"Name": "Indianapolis Motor Speedway Oval","AltNames":"Indianapolis Indianapolis_2022_OVAL"});

		//V1.4.7.9
		//Circuit de Barcelona-Catalunya GP
		this.refPoints[788137081] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		41.56943
			,"refLong":		2.257912
			,"rotation":	0.56
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.999
			,"cor_PosY_mul":1.001
			,"Name":		"Circuit de Barcelona-Catalunya GP"
			,"AltNames":	"Barcelona GP"
			,"Zoom":		16
			,"MapInitLat":	41.569512
			,"MapInitLong":	2.257745
			,"Comment": ""
		});
		//Circuit de Barcelona-Catalunya GP (no chicane)
		this.refPoints[-2045930240] = this.CopyObjectWithModifications(this.refPoints[788137081], {"Name": "Circuit de Barcelona-Catalunya GP (no chicane)","AltNames":"Barcelona Circuit_de_Catalunya_GP_NC"});
		//Circuit de Barcelona-Catalunya RX - V1.4.9.7
		this.refPoints[-1698375535] = this.CopyObjectWithModifications(this.refPoints[788137081], {"Name": "Circuit de Barcelona-Catalunya RX","AltNames":"Barcelona Barcelona_RX","Zoom":18,"MapInitLat":41.573722,"MapInitLong":2.260605});
		//Circuit de Barcelona-Catalunya National (no chicane) - V1.5.1.3
		this.refPoints[-1460882916] = this.CopyObjectWithModifications(this.refPoints[788137081], {"Name": "Circuit de Barcelona-Catalunya National (no chicane)","AltNames":"Barcelona Circuit_de_Catalunya_NATL_NC","MapInitLat":41.570622,"MapInitLong":2.259125});
		//Circuit de Barcelona-Catalunya Historic 1991 - V1.5.2.8
		this.refPoints[-1976262540] = this.CopyObjectWithModifications(this.refPoints[788137081], {"Name": "Circuit de Barcelona-Catalunya Historic 1991","AltNames":"Barcelona Barcelona_1991"});

		//V1.4.9.6
		//Ascurra Dirt
		this.refPoints[1328659519] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		-26.934041
			,"refLong":		-49.386504
			,"rotation":	1
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1.004
			,"cor_PosY_mul":0.99
			,"Name":		"Ascurra Dirt"
			,"AltNames":	"Ascurra Ascurra_Dirt"
			,"Zoom":		17
			,"MapInitLat":	-26.934491
			,"MapInitLong":	-49.388907
			,"Comment": ""
		});
		//Ascurra RX
		this.refPoints[-2021270791] = this.CopyObjectWithModifications(this.refPoints[1328659519], {"Name": "Ascurra RX","AltNames":"Ascurra Ascurra_RX"});

		//Tykki RX
		this.refPoints[1637229097] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		60.884125
			,"refLong":		26.795916
			,"rotation":	0
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":1.03
			,"cor_PosY_mul":1.03
			,"Name":		"Tykki RX"
			,"AltNames":	"Tykki Tykki_RX"
			,"Zoom":		17
			,"MapInitLat":	60.883436
			,"MapInitLong":	26.796558
			,"Comment": ""
		});
		//Tykki Tarmac
		this.refPoints[-1627472795] = this.CopyObjectWithModifications(this.refPoints[1637229097], {"Name": "Tykki Tarmac","AltNames":"Tykki Tykki_Tarmac","Zoom":18,"MapInitLat":60.883726});
		//Tykki Dirt1
		this.refPoints[779269607] = this.CopyObjectWithModifications(this.refPoints[1637229097], {"Name": "Tykki Dirt1","AltNames":"Tykki Tykki_Dirt1"});
		//Tykki Dirt2
		this.refPoints[-1929604728] = this.CopyObjectWithModifications(this.refPoints[1637229097], {"Name": "Tykki Dirt2","AltNames":"Tykki Tykki_Dirt2","MapInitLat":60.883026});

		//Foz RX
		this.refPoints[-1399336065] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":		-25.604479
			,"refLong":		-54.490209
			,"rotation":	-2
			,"cor_r_Long":	0
			,"cor_r_Lat":	0
			,"cor_PosX_mul":0.96
			,"cor_PosY_mul":1
			,"Name":		"Foz RX"
			,"AltNames":	"Foz Foz_RX"
			,"Zoom":		18
			,"MapInitLat":	-25.604355
			,"MapInitLong":	-54.489663
			,"Comment": ""
		});





		///////////////////////////////
		////  MOD Tracks
		///////////////////////////////
		//Rouen Les Essarts
		this.refPoints[-1031249929] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment": "pcars2 Mod"
		});
		//Rouen Les Essarts Short
		this.refPoints[-1515473908] = this.CopyObjectWithModifications(this.refPoints[-1031249929], {"Name": "Rouen Les Essarts Short","AltNames":"Rouen Short","Zoom": 15,"MapInitLat": 49.330981});

		//Sportsland SUGO
		this.refPoints[-1024221192] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":        38.140381
			,"refLong":      140.776663
			,"rotation":     0
			,"cor_r_Long":   0
			,"cor_r_Lat":    0
			,"cor_PosX_mul": 0.9985
			,"cor_PosY_mul": 1
			,"Name":         "Sportsland SUGO"
			,"AltNames":	 "SUGO GP,Sugo Grand Prix"
			,"Zoom":         17
			,"MapInitLat":   38.140497
			,"MapInitLong":  140.776549
			,"Comment": "pcars2 Mod"
		});

		//Fuji
		this.refPoints[-1695214357] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":        35.373892
			,"refLong":      138.929643
			,"rotation":     1.3
			,"cor_r_Long":   0
			,"cor_r_Lat":    0
			,"cor_PosX_mul": 0.9985
			,"cor_PosY_mul": 1.0005
			,"Name":         "Fuji GP"
			,"AltNames":	 "Fuji Grand Prix"
			,"Zoom":         16
			,"MapInitLat":   35.370554
			,"MapInitLong":  138.927871
			,"Comment": "pcars2 Mod"
		});

		//Brno
		this.refPoints[-907901266] = this.CopyObjectWithModifications(this.refPoints[9999999999],
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
			,"Comment": "pcars2 Mod"
		});

		//Sonoma Raceway
		this.refPoints[-1454279631] = this.CopyObjectWithModifications(this.refPoints[9999999999],
		{
			"refLat":        38.162520
			,"refLong":      -122.457175
			,"rotation":     141.5
			,"cor_r_Long":   0
			,"cor_r_Lat":    0
			,"cor_PosX_mul": 1.004
			,"cor_PosY_mul": 0.99
			,"Name":         "Sonoma Raceway GP"
			,"AltNames":	 "Sonoma Raceway Grand Prix,Sonoma_Raceway GP"
			,"Zoom":         16
			,"MapInitLat":   38.162600
			,"MapInitLong":  -122.457415
			,"Comment": "pcars2 Mod"
		});
		//Sonoma Raceway National
		this.refPoints[-995202729] = this.CopyObjectWithModifications(this.refPoints[-1454279631],{"Name":"Sonoma Raceway National","AltNames":"Sonoma_Raceway National","Zoom":16,"MapInitLat":38.163366,"MapInitLong":  -122.457876});
		//Sonoma Sonoma Raceway Short
		this.refPoints[1035110721] = this.CopyObjectWithModifications(this.refPoints[-1454279631], {"Name": "Sonoma Raceway Short","AltNames":"Sonoma_Raceway Short"});

		//Mojave Cougar Ridge
		this.refPoints[31280808] = this.CopyObjectWithModifications(this.refPoints[8888888888],
		{
			"Name":         "Mojave Cougar Ridge"
			,"AltNames":	"Mojave Cougar_Ridge"
			,"Zoom":	16
			,"MapInitLat":	40.9966
			,"MapInitLong":	-113.565
			,"Comment": 	"pcars2 Mod - fictional"
		});
		//Mojave Boa Ascent - TrackID pcars1 [850003838]
		this.refPoints[-984009759] = this.CopyObjectWithModifications(this.refPoints[31280808], {"Name": "Mojave Boa Ascent","AltNames":"Mojave Boa_Ascent","Zoom":17,"MapInitLat":41.0033,"MapInitLong":-113.569});
		//Mojave Gila Crest - TrackID pcars1 [2089801285]
		this.refPoints[-60500434] = this.CopyObjectWithModifications(this.refPoints[31280808], {"Name": "Mojave Gila Crest","AltNames":"Mojave Gila_Crest","MapInitLat":40.9955,"MapInitLong":-113.559});
		//Mojave Coyote Noose - TrackID pcars1 [-2125682335]
		this.refPoints[369271528] = this.CopyObjectWithModifications(this.refPoints[31280808], {"Name": "Mojave Coyote Noose","AltNames":"Mojave Coyote_Noose","MapInitLong":-113.5675});
		//Mojave Sidewinder - TrackID pcars1 [-1463443929]
		this.refPoints[2015693491] = this.CopyObjectWithModifications(this.refPoints[31280808], {"Name": "Mojave Sidewinder","AltNames":"","Zoom":17,"MapInitLat":40.9968,"MapInitLong":-113.5605});
		//Mojave Test Track - only in Game API available, because you cannot play it in Multiplayer, it has no TrackID -> works only in CREST Mode
		this.refPoints[-1] = this.CopyObjectWithModifications(this.refPoints[31280808], {"Name": "Mojave Test Track","AltNames":""});

		//Azure Coast
		this.refPoints[560711985] = this.CopyObjectWithModifications(this.refPoints[8888888888],
		{
			"Name":         "Azure Coast"
			,"AltNames":	 "Azure Coast Eastbound,Azure_Coast Eastbound"
			,"Zoom":         13
			,"Comment": 	"pcars2 Mod - fictional"
		});
		//Azure Coast Westbound
		this.refPoints[-1936790504] = this.CopyObjectWithModifications(this.refPoints[560711985], {"Name": "Azure Coast Westbound","AltNames":"Azure_Coast Westbound"});
		//Azure Coast Stage 1
		this.refPoints[550129415] = this.CopyObjectWithModifications(this.refPoints[560711985], {"Name": "Azure Coast Stage 1","AltNames":"Azure_Coast Stage_1","Zoom":15,"MapInitLat":40.979});
		//Azure Coast Stage 2
		this.refPoints[-780879576] = this.CopyObjectWithModifications(this.refPoints[560711985], {"Name": "Azure Coast Stage 2","AltNames":"Azure_Coast Stage_2","Zoom":14,"MapInitLong":-113.56});
		//Azure Coast Stage 3
		this.refPoints[-1737261125] = this.CopyObjectWithModifications(this.refPoints[560711985], {"Name": "Azure Coast Stage 3","AltNames":"Azure_Coast Stage_3","Zoom":15,"MapInitLat":41.018,"MapInitLong":-113.59});

		//California Highway Full
		this.refPoints[-1593944167] = this.CopyObjectWithModifications(this.refPoints[8888888888],
		{
			"Name":         "California Highway Full"
			,"AltNames":	"California_Highway Full"
			,"Zoom":	13
			,"MapInitLat": 	41.032
			,"MapInitLong":	-113.58
			,"Comment": 	"pcars2 Mod - fictional"
		});
		//California Highway Reverse
		this.refPoints[928006536] = this.CopyObjectWithModifications(this.refPoints[-1593944167], {"Name": "California Highway Reverse","AltNames":"California_Highway Reverse"});
		//California Highway Stage 1
		this.refPoints[1676943041] = this.CopyObjectWithModifications(this.refPoints[-1593944167], {"Name": "California Highway Stage 1","AltNames":"California_Highway Stage1","Zoom":15,"MapInitLat":41.005,"MapInitLong":-113.563});
		//California Highway Stage 2
		this.refPoints[940391868] = this.CopyObjectWithModifications(this.refPoints[-1593944167], {"Name": "California Highway Stage 2","AltNames":"California_Highway Stage2","MapInitLat":41.038,"MapInitLong":-113.55});
		//California Highway Stage 3
		this.refPoints[-331502851] = this.CopyObjectWithModifications(this.refPoints[-1593944167], {"Name": "California Highway Stage 3","AltNames":"California_Highway Stage3","Zoom":15,"MapInitLat":41.06,"MapInitLong":-113.593});
	}
}
