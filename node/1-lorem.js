'use strict';

var http = require('http'); // do not change this line


var server = http.createServer(function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(
    '<!DOCTYPE html>' +
    '<html>' +
    '<body>' +
      'lorem ipsum' +
    '</body>' +
    '</html>'
  );
  res.end();
});


  server.listen(process.env.PORT || 8080);



// any request should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html
