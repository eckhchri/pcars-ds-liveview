# Project CARS Dedicated Server live view (pcars-ds-liveview)

## What is it?

The main goal of this project was to show information about races like you have it in TV broadcasts.\
This project is webbased and written in javascript. It polls the Dedicated Server API for Multiplayer sessions of Project CARS 1 and 2 to get this information, which is also the main focus. But it can also poll the CREST1/CREST2 API, which provides the Shared Memory data of Project CARS 1 and 2 via HTTP.\
If you open this website it has Google Maps in background, which shows the current race track and markers of all drivers where they are.
As overlay you have some tables:
- Driver Table - shows all driver names with their position, which car they drive and timings.
- Car Table - a list of all cars, which are available in Project CARS
- Track Table - a list of all tracks, which are available in Project CARS

Further there is a recording/playback panel and some other great stuff. You can find more info about the features in the "Nice to know" section at the end.\
It's also important to know that javascript is executed on client side. That means your PC/Tablet/... where you start a browser and open this website is polling the Dedicated Server or CREST API via HTTP requests.

## Usage:
- default URL after extracting/cloning to your Webserver: http://[your Webserver url]/index.html
- rename config-sample.js to config.js and change settings with an editor
- put the google API key into the file "config_googleapikey.txt" in root directory of the project if available. It also works without the key, but then you have watermarks on map.

**URL paramters**
- If you want to use URL parameters, set AllowUrlParams to true in config.js
- Overwriting default DS parameters:  
						http://[your Webserver url]/index.html?dsurl=[DS HTTP API url]&dsport=[DS HTTP API Port]
						
						example: http://www.xyz.com/index.html?dsurl=www.xyzDS.com&dsport=9000
				
- Overwriting default pcars2 DS parameters:  
						http://[your Webserver url]/index.html?ds2url=[DS HTTP API url]&ds2port=[DS HTTP API Port]
						
						example: http://www.xyz.com/index.html?ds2url=www.xyzDS.com&ds2port=9000
- Overwriting default CREST parameters:   
						http://[your Webserver url]/index.html?cresturl=[IP address of gaming PC]&crestport=[CREST Port]
						
						example: http://www.xyz.com/index.html?cresturl=192.168.0.1&crestport=8080

- Overwriting default CREST2 parameters:   
						http://[your Webserver url]/index.html?crest2url=[IP address of gaming PC]&crest2port=[CREST2 Port]
						
						example: http://www.xyz.com/index.html?crest2url=192.168.0.1&crest2port=8180

- Overwriting Google Map API Key from configuration:  
						http://[your Webserver url]/index.html?api_key=[YOUR_CUSTOM_API_KEY]
						
						example: http://www.xyz.com/index.html?api_key=1234567890ABCDEF

**Supports the following Data Sources**
- Dedicated Server API from Project CARS 1 and 2 - http://forum.projectcarsgame.com/showthread.php?26520-Dedicated-Server-API
- CREST/CREST2 API - CREST1: http://cars-rest-api.com/, CREST2: http://forum.projectcarsgame.com/showthread.php?62359-CREST2-a-k-a-CARS2-REST-API&p=1494976#post1494976

**Default parameters**:
- dedicated server url:   MY-URL.com
- dedicated server port:  9000
- pcars2 dedicated server url:   MY-URL.com
- pcars2 dedicated server port:  9000
- CREST server url:       localhost
- CREST server port:      8080
- CREST2 server url:      localhost
- CREST2 server port:     8180
 
## Requirements:
- browser support: CHROME 44 or newer

## Shared some info in Project CARS Forum
- http://forum.projectcarsgame.com/showthread.php?65112-Live-stats-from-Dedicated-Server&p=1543705&viewfull=1#post1543705
- http://forum.projectcarsgame.com/showthread.php?39269-Provide-GPS-coordinates-of-all-track-reference-points-GPS-calculation-in-javascript
- http://pcars2.wmdportal.com/showthread.php?23757-pCars-1-(Aries)-Track-Feedback&p=947602&viewfull=1#post947602

## FAQ
- Why are the pits not correct counted?
The number of pits comes not directly through the API. It is counted by the application and a pit is detected if a driver enters the pits. In result the application have to run in these cases.
If the race is already running and you open the website of this application the counting begins at this moment, all prevoius pit stops are not counted. Further if you reload the website during a race the counting begins from zero again.
- What is the function of the export buttons in the driver table header?
"Export" initiates a CSV download of the currrent table view. 
"Export All" sorts the table after driver position and initiates a download of all past session results of the race weekend. There must be at least one session change during the application is running, for example from Practice to Qualifying or Qualifying to Race. If this is not the case there is nothing to download, because there is no session result.
- What is the function of the "Pause" buttons in the table headers?
......
- Why are the markers jerky moving?
.......
- How works the result auto export?
If the autoExport is set to true in the config.js the application automatically triggers a CSV download of all session and race results of the current race weekend. The trigger is the SessionState change from "Race" to "PostRace". The application has to run all the time over the race weekend to save all the data.

## Troubleshooting

Javascript is executed on client side. That means your browser is polling the DS HTTP API.\
If you get no data from DS or CREST check your firewall settings on client side outgoing and maybe on DS/CREST side incoming. The tool uses normal HTTP requests, which means your DS can run on another machine. For CREST2 the same, CREST2 must run on the same system where the game runs, but you can open the liveview on another system with browser. But here the CREST2 TCP port must be open in the firewall of your game system.

liveview polls the following paths on the DS:\
/api/session/status?attributes&members&participants\
/api/list/tracks\
/api/list/vehicles \
We have no authentication implemented, which means these paths must be accessable for public in the DS server.cfg. I think tracks and vehicles are public by default, but session/status not. \
You have to add the following for httpApiAccessLevels in the DS config
```
httpApiAccessLevels : {
      "api/session/status" : "public"
}
```
You should be able to open the URL without authentication:\
http://DS_domain_name/api/session/status?attributes&members&participants. If this works, liveview should work,too.

relevant settings in DS config:
```
enableHttpApi : true
httpApiPort : 9009
httpApiInterface : ""
```
Another problem could be if you open the liveview via HTTPS on your webserver, because the DS is polled via HTTP. In this case your Chrome prevents this and shows an icon on the right side of the address field.\
Then you can click on it and "Load unsafe scripts".


## Nice to know

- If you want to scroll a table, use the Pause Button. The table is reloaded every poll interval and then it jumps automatically to the beginning.

- You can record a session. Use the "Start Recording" switch for starting and stopping the record. After stopping click the "Export" button. For long sessions this takes some time, because the record is saved in RAM of the Browser process. With clicking on export a zip file is generated. This zip file can be loaded with the Button "Datei auswählen"/"Select File" (in my bowser it is german). You maybe have to switch to DEMO API Type, if it is not switched automatically.

- There are some records already in for demonstration. Switch to DEMO API Type. Click on Button "Load from URL" and choose a record. 

- The Pit information during a race is no info from DS. It is detected by liveview, if a participant state changes to "EnteringPits". That means this info is only correct, if liveview is running all the time and receives these state changes. If you open liveview during a race, it can only detects from this moment on.

- Same for the "Export All" Button in the Driver Table. liveview collects all session results for the complete race weekend and if you click on the button you get a csv and/or pdf (configurable via config.js) with all finished sessions till this moment. But liveview have to run from beginning of the first session. I hope this still works, I haven't test it for a long time and there were already some DS changes in the past. Further this feature only works in DS mode.

- If you open the track table, you can use the left mouse button to select a track, the map then jumps to it, right mouse button jumps back again. Fictional tracks have only a white background. For Sakitto GP are border lines available for example (there is also a recording for Sakitto GP), but for the most others not. These lines must be recorded with a car on track, which needs a lot of time and time is short - sorry.

- The main focus of liveview is the DS mode, which means that some features are not working in CREST mode, like mentioned above with the Export All, but also the the Pit counting or the Session States in the Driver Table Header etc.

- You can click on the column headers for sorting the table

- DS settings window: with the DisplayDurationCorrector you can manipulate the smoothness of the marker moving. WorkerDelay changes the time in ms between every polling. I think liveview needs at least 100 ms calculation time for one run. That means if the worker delay is 300ms for example, the time between every run is 400ms. The DS updates the data only every half seconds. It makes no sense to poll it more often. In this case you only get same data again. The color driver objects dropdown menu changes the marker colors, Top 3 is gold/silver/bronze color, but you can also change it to same class, then all cars of a vehicle class have the same marker color. Driver labels can be changed to show the complete driver name or only the position on the markers.

- If you filter the driver table for "GT3" for example, only the GT3 car markers are completely shown, all others are transparent. You can change the strength with the "Hidden driver opacity" slider in the DS settings window. If you set it to 0 all other cars are completely hidden.

- You can use the map in fullscreen with the icon in the upper right of the map. In this case you see only the map and the markers.

- In the config.js file you can change many defaults, which windows are default shown, tables default collapsed or not, default API mode (DS2 for example), marker colors, Export Type (csv/pdf), etc.

- Chrome seems to have a problem, if you have liveview open, switch to another browser tab and later back again. Then the liveview tab freezes, normally it catches itself after several seconds. But better is you don't switch to other tabs. Maybe opening a new instance of Chrome instead of new tabs work. Further minimizing the Chrome window has the same effect.
