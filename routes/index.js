var config = require('../config.json')
  , main = require('./home')
  , passport = require('passport');

exports.configure = function (app) {

    app.get('/', main.home);
    app.get('/login', main.login);
    app.get('/logout', main.logout);

    // Auth stuff
    app.namespace('/auth', function () {
      if(config.auth.twitter.consumerkey.length) {
        app.get('/twitter', passport.authenticate('twitter'));

        app.get('/twitter/callback', 
          passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
          })
        );
      }

      if(config.auth.facebook.clientid.length) {
        app.get('/facebook', passport.authenticate('facebook'));
        app.get('/facebook/callback', 
          passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
          })
        );
      }
    });
}


