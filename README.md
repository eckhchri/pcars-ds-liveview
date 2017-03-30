Project CARS Dedicated Server live view (pcars-ds-liveview)

**Usage**:
- Using default parameter: http://[your Webserver url]/index.html
- change settings in config.js with an editor
- put the google API key into the file "config_googleapikey.txt" in root directory of the project if available. It also works without the key.

**Url paramters**
- set AllowUrlParams to true in config.js
- Overwriting default DS parameters:  
						http://[your Webserver url]/index.html?dsurl=[DS HTTP API url]&dsport=[DS HTTP API Port]
						
						example: http://www.xyz.com/index.html?dsurl=www.xyzDS.com&dsport=9000
- Overwriting default CREST parameters:   
						http://[your Webserver url]/index.html?cresturl=[IP address of gaming PC]&crestport=[CREST Port]
						
						example: http://www.xyz.com/index.html?cresturl=192.168.0.1&crestport=8080

- Overwriting default CREST2 parameters:   
						http://[your Webserver url]/index.html?crest2url=[IP address of gaming PC]&crest2port=[CREST2 Port]
						
						example: http://www.xyz.com/index.html?crest2url=192.168.0.1&crest2port=8180

**Features**
- Dedicated Server API - http://forum.projectcarsgame.com/showthread.php?26520-Dedicated-Server-API
- CREST API - http://cars-rest-api.com/

**Default parameter**:
- dedicated server url:   MY-URL.com
- dedicated server port:  9000
- CREST server url:       localhost
- CREST server port:      8080
- CREST2 server url:      localhost
- CREST2 server port:     8180
 
**Requirements**:
- browser support: CHROME 44 or newer

**Shared some info in Project CARS Forum**
- http://forum.projectcarsgame.com/showthread.php?39269-Provide-GPS-coordinates-of-all-track-reference-points-GPS-calculation-in-javascript
- http://pcars2.wmdportal.com/showthread.php?23757-pCars-1-(Aries)-Track-Feedback&p=947602&viewfull=1#post947602

**FAQ**
- Why are the pits not correct counted?
The number of pits comes not directly through the API. It is counted by the application and a pit is detected if a driver enters the pits. In result the application have to run in these cases.
If the race is already running and you open the website of this application the counting begins at this moment, all prevoius pit stops are not counted. Further if you reload the website during a race the counting begins from zero again.
- What is the function of the export buttons in the driver table header?
"Export" initiates a CSV download of the currrent table view. 
"Export All" sorts the table after driver position and initiates a download of all past session results of the race weekend. There must be at least one session change during the application is running, for example from Practice to Qualifying or Qualifying to Race. If this is not the case there is nothing to download, because there is no session result.
What ist he function of the "Pause" buttons in the table headers?
......
- How works the result auto export?
If the autoExport is set to true in the config.js the application automatically triggers a CSV download of all session and race results of the current race weekend. The trigger is the SessionState change from "Race" to "PostRace". The application has to run all the time over the race weekend to save all the data.

