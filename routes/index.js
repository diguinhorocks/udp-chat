var config = require('../config.json')
	, app = module.parent.exports.app
	, passport = require('passport');
/*
 * Homepage
 */
exports.main = function(req, res, next) {
	if(req.user) {
		console.log(req.user);
		res.render('client', { user: req.user.username });
	}
	else
		res.render('login');
}

exports.login = function(req, res) {
	res.render('login');
}

/*
 * Authentication routes
 */

if(config.auth.twitter.consumerkey.length) {
  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );
}

if(config.auth.facebook.clientid.length) {
  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );
}

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});