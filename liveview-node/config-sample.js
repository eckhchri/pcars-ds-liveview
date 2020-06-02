module.exports = {
	//API mode, possible values: DS, DS2, DS-AMS2, CREST, CREST2, CREST2-AMS2 - it defines which API settings from below are used
	APIMODE:	"DS2",
	
	// API settings
	//Project CARS Dedicated Server
	DsServerURL:	"mydomain.com",
	DsPort:			9000,
	DsPath:			"/api/session/status?attributes&members&participants",
	//Project CARS 2 Dedicated Server
	Ds2ServerURL:	"mydomain2.com",
	Ds2Port:		9000,
	Ds2Path:		"/api/session/status?attributes&members&participants",
	//Automobilista 2 Dedicated Server
	DsAMS2ServerURL:"mydomainAMS2.com",
	DsAMS2Port:		9000,
	DsAMS2Path:		"/api/session/status?attributes&members&participants",
	//Project CARS CREST
	CRESTServerURL:	"localhost",
	CRESTPort:		8080,
	CRESTPath:		"/crest/v1/api?gameStates=true&participants=true&eventInformation=true&timings=true&weather=true",
	//Project CARS 2 CREST2
	CREST2ServerURL:"localhost",
	CREST2Port:		8180,
	CREST2Path:		"/crest2/v1/api?gameStates=true&participants=true&eventInformation=true&timings=true&weather=true",
	//Automobilista 2 CREST2
	CREST2AMS2ServerURL:"localhost",
	CREST2AMS2Port:		8180,
	CREST2AMS2Path:		"/crest2/v1/api?gameStates=true&participants=true&eventInformation=true&timings=true&weather=true",
	
	poll_timeout:	500,	// in ms - how long to wait for response; to prevent responses in wrong order, set it to the same value as the interval;
	poll_interval:	500,	// in ms - time between each API poll
	
	// Webserver settings
	webserver_port:	8080,	// listening TCP port of the webserver

	// Logging
	//Log Levels for console.log commands: 0 = off or special use, 1 = error, 2 = warning, 3 = info, 4 = extended info (output of variables for example)
	log:	1
}