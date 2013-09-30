/*
 * Module dependencies
*/

var app = module.parent.exports.app
	, path = require('path')


/*
 * Homepage
 */
app.get('/', function(req, res) {
  res.sendfile(path.resolve(__dirname + '/../views/client.html'))
});