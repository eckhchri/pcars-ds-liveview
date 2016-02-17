//    cuircit_name,PosX,PosY=Z aus pCars API
//nochmal die Logik zusammengefasst:
//wir haben als input den referenzpunkt der strecke in Lat und Long degree
//weiterhin haben wir die Positionsdaten in X und Z richtung aus der API in millimeter als delta/abstand vom referenzpunkt
//als ergebnis wollen wir die live positionsdaten in Lat und Long degree.

//der weg:
//1. die positionsdaten in ein delta von Lang und Lat umrechnen (darin enthalten ist auch den möglicherweise enthaltenen rotationsfehler heraus zu rechnen)
//2. das aus 1. ermittelte delta auf das Lang und Lat des referenzpunktes aufaddieren
//3. die in 2. ermittelten koordinaten in google maps anzeigen
// http://www.latlong.net/Show-Latitude-Longitude.html


function calc_coordinates (circuit_id,PosX,PosY, aRefPoint){

	// define variables
	var aRefPointTmp = aRefPoint;
	var rotation = degreeToRadians ( aRefPointTmp[circuit_id]["rotation"] );           //rotation angle in radian, because Math.cos() needs angle in radian
	var x_new;
	var y_new;

	//correction multiplier
	PosX = PosX * aRefPointTmp[circuit_id]["cor_PosX_mul"];
	PosY = PosY * aRefPointTmp[circuit_id]["cor_PosY_mul"];
	
	//console.log("CALC:", aRefPointTmp );
	//console.log("Calc rotation: " + rotation);

	//eliminate rotation error
	if ( aRefPointTmp[circuit_id]["rotation"] != 0) {
		//ATTENTION: Math.cos needs angle in radian
		x_new = (Math.cos(rotation) * PosX) - (Math.sin(rotation) * PosY);
		y_new = (Math.sin(rotation) * PosX) + (Math.cos(rotation) * PosY);
	}else{
		// no rotation
		x_new = PosX;
		y_new = PosY;
	}

	//console.log ("X_old: " + PosX + " X_New: " + x_new + "Y_old: " + PosY + " Y_New: " + y_new);

	//calculation from game position data to an GPS angle (radius earth 6371.000.000 mm, because the data from the Game DS API is in millimeter):
	//ATTENTION: Math.cos needs angle in radian
	var radius2EarthAxis = 6371000000 * Math.cos( degreeToRadians(aRefPointTmp[circuit_id]["refLat"]) ) +  aRefPointTmp[circuit_id]["cor_r_Long"];

		
	/************************************************************
	////Method 1: right-angled triangle
        var angleX = Math.asin(x_new/radius2EarthAxis);
        var angleY = Math.asin(y_new/6371000000);
        //convert radian to degree
       // console.log("angleX before calculation: " + angleX + " angleY: " + angleY );
        angleX = radiansToDegrees(angleX);
        angleY = radiansToDegrees(angleY);
	**************************************************************/

	//Method 2: set angle in relation, 360 degrees are 40030km circumference  - better method
	//var circumference_earth = 40030000000; //in millimeter
	var circumference_earth = 2 * Math.PI * (6371000000 + aRefPointTmp[circuit_id]["cor_r_Lat"]);
	var circumference_earth_Lat = 2 * Math.PI * radius2EarthAxis; //in millimeter


	//console.log("Calc Coordinates. circumference_earth/circumference_earth_Lat: " + circumference_earth + " / " + circumference_earth_Lat );
 
	var angleX = x_new / circumference_earth_Lat * 360;
	var angleY = y_new / circumference_earth * 360;
		
		
	//console.log("CuircitName: "     + aRefPointTmp[circuit_id]["Name"]);
	//console.log("radius2EarthAxis: "  + radius2EarthAxis);
	//console.log("angleX: "         + angleX + " angleY: " + angleY );

	// calculate final value
	var car_coordinateLong  =  aRefPointTmp[circuit_id]["refLong"] + angleX;
	var car_coordinateLat   =  aRefPointTmp[circuit_id]["refLat"] + angleY;
		
	//console.log ("GPS RefLong: " + aRefPointTmp[circuit_id]["refLong"] + " RefLat: " + aRefPointTmp[circuit_id]["refLat"] );
	//console.log ("GPS Long:    " + car_coordinateLong + " Lat: " + car_coordinateLat + "++++++++++++End++++++");

	// return a hash of gps coordinates
	return {"Lat" : car_coordinateLat , "Long" : car_coordinateLong};
}

function degreeToRadians($degree)
{
    return $degree * Math.PI / 180;
}

function radiansToDegrees($radian)
{
        return $radian * 180/ Math.PI;
}



/*Referenzpunkt Hockenheim:
49.329718, 8.574290

Umrechnung Positionsdaten in Winkel (Radius Erde 6371.000.000 mm, da Daten im Spiel als Millimeter raus kommen):
radius_zur_erdachse = 6371.000.000 * cos (breitengrad) //(6371km = 6371.000 m = 6371.000.000)
winkelX = arcsin(PosX/radius_zur_erdachse)

winkelY = arcsin(PosX/ 6371.000.000)

Rotation herausrechnen (muss vor der Umrechnung in den Winkel passieren . bei Hockenheim nicht notwendig):
rotation = Rotationswinkel
x' = cos (rotation) * x - sin (rotation) * y
y' = sin (rotation) * x + cos (rotation) * y


///
ahh, da fehlen noch 2 nullen beim erdradius
6371km = 6371.000 m = 6371.000.000
hab nochmal die mail korrigiert
einfach zu viele nullen
und rotation ist gegen den urhzeigersinn
aber das ist ja hier noch nicht relevant
ich bin dann so langsam mal weg
*/

