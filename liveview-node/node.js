const config = require('./config.json');

var host = config.host;
var port = config.port;
var path = config.path;

var http = require('http');

setInterval(function () {

    var rest_options = {
        host: host,
        port: port,
        path: path,
        method: 'GET',
        timeout: 3000
    };

        console.log("Request");

    var request = http.request(rest_options, function(response) {
        var content = "";

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

        request.on('timeout', function() {
                request.abort();
                console.log("abort");
        });

    request.end();
}, 1000);
