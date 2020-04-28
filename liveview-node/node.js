const config = require('./config.json');

var http = require('http');

var content = "";   // polled data from API and provided through webserver again

////////////////////////////////////////
//// Poll Game API
////////////////////////////////////////
setInterval(function () {

	var http_options = {
		host: config.poll_host,
		port: config.poll_port,
		path: config.poll_path,
		method: 'GET',
		timeout: config.poll_timeout
	};

	console.log("Request");

	//API HTTP request
	var request = http.request(http_options, function(response) {
		content = "";

		// Handle data chunks
		response.on('data', function(chunk) {
			content += chunk;
		});

		// Once we're done streaming the response, parse it as json.
		response.on('end', function() {
			var data = JSON.parse(content);
				console.log("data: ",data);
			//TODO: Do something with `data`.
		});
	});

	// Report errors
	request.on('error', function(error) {
		console.log("Error while calling endpoint.", error);
	});

	//Abort request if reaching timeout
	request.on('timeout', function() {
		request.abort();
		console.log("abort");
	});

	request.end();
}, config.poll_interval);

////////////////////////////////////////
//// Webserver - providing API data
////////////////////////////////////////

var server = require('http');

server.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	});
	res.write(content);
	res.end();
}).listen(config.webserver_port);
