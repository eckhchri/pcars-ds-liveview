var config = require('./config.js');
//console.log("config: ", config);

var http = require('http');

var content = "";   // polled data from API and provided through webserver again

var poll_host;
var poll_port;
var poll_path;
var poll_statusCode = 503;

// set APIMODE
switch(config.APIMODE){
	case "DS":
		poll_host = config.DsServerURL;
		poll_port = config.DsPort;
		poll_path = config.DsPath;
		break;
	case "DS2":
		poll_host = config.Ds2ServerURL;
		poll_port = config.Ds2Port;
		poll_path = config.Ds2Path;
		break;
	case "CREST":
		poll_host = config.CRESTServerURL;
		poll_port = config.CRESTPort;
		poll_path = config.CRESTPath;
		break;
	case "CREST2":
		poll_host = config.CREST2ServerURL;
		poll_port = config.CREST2Port;
		poll_path = config.CREST2Path;
		break;
	case "CREST2-AMS2":
		poll_host = config.CREST2AMS2ServerURL;
		poll_port = config.CREST2AMS2Port;
		poll_path = config.CREST2AMS2Path;
		break;
	default:
		poll_host = config.Ds2ServerURL;
		poll_port = config.Ds2Port;
		poll_path = config.Ds2Path;
}

// Show info on startup
console.log(
	"#####################################\n" +
	"#          Starting Server          #\n" +
	"#####################################\n" +
	"# Poll API on: " + poll_host + ":" + poll_port + "\n" +
	"# Webserver listen on Port: " + config.webserver_port + "\n" +
	"#####################################\n\n" +
	"#####################################\n" +
	"# Break with CTRL+C or close Window #\n" +
	"#####################################\n"
);


////////////////////////////////////////
//// Poll Game API
////////////////////////////////////////
setInterval(function () {

	var http_options = {
		host: poll_host,
		port: poll_port,
		path: poll_path,
		method: 'GET',
		timeout: config.poll_timeout
	};

	var time = new Date();
	var strtime = timeAddZero(time.getHours(),2) + ":" + timeAddZero(time.getMinutes(),2) + ":" + timeAddZero(time.getSeconds(),2) + "." + timeAddZero(time.getMilliseconds(),3);

	if(config.log >= 3){console.log(strtime + " - Request " + poll_host + ":" + poll_port + poll_path);}

	//API HTTP request
	var request = http.request(http_options, function(response) {
		content = "";
		poll_statusCode = response.statusCode;

		// Handle data chunks
		response.on('data', function(chunk) {
			content += chunk;
		});

		// Once we're done streaming the response, parse it as json.
		response.on('end', function() {
			var data = {};
			try {
				data = JSON.parse(content);
			} catch(e) {
				if(config.log >= 1){console.log(strtime, "- Error on parsing JSON data: ",e);} // Error can happen if the providing service is started or stopped during runtime
				//return ...?
			}
			if(config.log >= 4){console.log(strtime, "- Received Data:\n",data);}
			//TODO: Do something with `data`.
		});

	});

	// Report errors
	request.on('error', function(error) {
		if(config.log >= 1){console.log(strtime, "- Error while calling endpoint.", error);}
	});

	//Abort request if reaching timeout
	request.on('timeout', function() {
		request.abort();
		content = "";
		if(config.log >= 3){console.log(strtime , "- Timeout reached, abort request");}
	});

	request.end();
}, config.poll_interval);



////////////////////////////////////////
//// Webserver - providing API data
////////////////////////////////////////

var server = require('http');

server.createServer(function (req, res) {
	// return 503 HTTP status if there is no data available or the API returns also a status code != 200
	if (content == "" || poll_statusCode != 200){
		res.writeHead(503, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		});
		res.write("{\"status\": \"503 Service unavailable\"}");
		res.end();
	}else{
		// return data with HTTP status 200
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		});
		res.write(content);
		res.end();
	}
}).listen(config.webserver_port);



////////////////////////////////////////
//// Functions
////////////////////////////////////////
function timeAddZero(x,n) {
	while (x.toString().length < n) {
		x = "0" + x;
	}
	return x;
}
