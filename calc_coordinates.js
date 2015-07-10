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


function calc_coordinates (cuircit_id,PosX,PosY){

        var aRefPointTmp         =       new Refpoint(cuircit_id);

        // variablen definieren
        var q = degreeToRadians ( aRefPointTmp["rotation"] );           //Rotationswinkel in Rad, da Math.cos() den Winkel in Rad will
        var x_neu;
        var y_neu;

	//console.log("CALC:", aRefPointTmp );

        //Rotation herausrechnen (muss vor der Umrechnung in den Winkel passieren . bei Hockenheim nicht notwendig)
        if ( aRefPointTmp[cuircit_id]["rotation"] != 0) {

                //ACHTUNG: Math.cos benoetigt einen Winkel in rad
                x_neu = (Math.cos(q) * PosX) - (Math.sin(q) * PosY);
                y_neu = (Math.sin(q) * PosX) + (Math.cos(q) * PosY);

                //console.log ("X_alt:" + PosX + " X_Neu:" + x_neu + "Y_alt:" + PosY + " Y_Neu:" + y_neu);
        }else{
                // werte unveraendert uebernehmen
                x_neu = PosX;
                y_neu = PosY;

                //console.log ("PosX und PosY unveraendert uebernommen. PosX: " + x_neu + " PosY:" + y_neu );
        }

        //Umrechnung Positionsdaten in Winkel (Radius Erde 6371.000.000 mm, da Daten im Spiel als Millimeter raus kommen):
        //var radius_zur_erdachse = 6371000000 * Math.cos( aRefPointTmp[cuircit_id]["refLat"] ) + aRefPointTmp["cor_r"]; // Ungenauigkeit -> erhoete Korrekturwerte notwendig
        //ACHTUNG: Math.cos benoetigt einen Winkel in rad
        var radius_zur_erdachse = 6371000000 * Math.cos( degreeToRadians(aRefPointTmp[cuircit_id]["refLat"]) ) +  aRefPointTmp[cuircit_id]["cor_r_Long"];

		
	/************************************************************
	////Methode über rechtwinkliges Dreieck
        var winkelX = Math.asin(x_neu/radius_zur_erdachse);
        var winkelY = Math.asin(y_neu/6371000000);

        //konvertiere Bogenmas in Grad
       // console.log("WinkelX VOR Umrechnung: " + winkelX + " WinkelY: " + winkelY );
        winkelX = radiansToDegrees(winkelX);
        winkelY = radiansToDegrees(winkelY);
	**************************************************************/

	//Methode über Winkel ins Verhaeltnis setzen zu 360° entspricht 40030km
        //var umfang_erde = 40030000000; //in millimeteri
	var umfang_erde = 2 * Math.PI * (6371000000 + aRefPointTmp[cuircit_id]["cor_r_Lat"]);
        var umfang_erde_Lat = 2 * Math.PI * radius_zur_erdachse; //in millimeter


        var winkelX = x_neu / umfang_erde_Lat * 360;
        var winkelY = y_neu / umfang_erde * 360;
		
		
        //console.log("CuircitName: "     + aRefPointTmp[cuircit_id]["Name"]);
        //console.log("RadiusErdachse: "  + radius_zur_erdachse);
        //console.log("WinkelX: "         + winkelX + " WinkelY: " + winkelY );

        // finalen Wert berechnen
        var car_coordinateLong  =  aRefPointTmp[cuircit_id]["refLong"] + winkelX;
        var car_coordinateLat   =  aRefPointTmp[cuircit_id]["refLat"] + winkelY;
		
	//console.log ("GPS RefLong: " + aRefPointTmp[cuircit_id]["refLong"] + " RefLat: " + aRefPointTmp[cuircit_id]["refLat"] );
        //console.log ("GPS Long:    " + car_coordinateLong + " Lat: " + car_coordinateLat + "++++++++++++End++++++");

        // retrn a hash of gps coordinates
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
q = Rotationswinkel
x' = cosq * x - sinq * y
y' = sinq * x + cosq * y


///
ahh, da fehlen noch 2 nullen beim erdradius
6371km = 6371.000 m = 6371.000.000
hab nochmal die mail korrigiert
einfach zu viele nullen
und rotation ist gegen den urhzeigersinn
aber das ist ja hier noch nicht relevant
ich bin dann so langsam mal weg
*/

