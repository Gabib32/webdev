'use strict';

var http = require('http'); // do not change this line


var server = http.createServer(function(req, res) {

  // http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text
  if (req.url === '/missing') {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('your princess is in another castle');
    res.end();

  // http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code
  } else if (req.url === '/redirect') {
    res.writeHead(302, {
      'Location': 'http://localhost:8080/redirected'
    });
    res.end();
  } else if (req.url === '/redirected') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end();

  // http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
  } else if (req.url === '/cache') {
    res.writeHead(200, {
      'Cache-Control': 'max-age=1',
      'Content-Type': 'text/plain'
    });
    res.write('cache this resource');
    res.end();
}

});

server.listen(process.env.PORT || 8080);



// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
