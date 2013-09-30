/*
 * Module dependencies
*/

var app = module.parent.exports.app

/*
 * Homepage
 */
app.get('/', function(req, res) {
  res.render('client')
});