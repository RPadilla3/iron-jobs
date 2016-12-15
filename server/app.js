var express = require('express');
var server = express();
var bodyParser = require('body-parser');

server.set('port', process.env.PORT || 3000);
server.use(bodyParser.json());

server.listen(server.get('port'), function startedServer(err) {
 if(err) {
   console.error(err);
 } else {
   console.log('Server starting on http://localhost:' + server.get('port'));
 }
})
server.use('/jobs', require('./routes/jobs'));
