var route = {};
route.main = {};

route.main.home = function(req, res, next) {
	if(req.user) {
		console.log(req.user);
		res.render('client', { user: req.user.username });
	}
	else
		res.render('login');
}

route.main.login = function(req, res) {
	res.render('login');
}

route.main.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
}

module.exports = route.main;