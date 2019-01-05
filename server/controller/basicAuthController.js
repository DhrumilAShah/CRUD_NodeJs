var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var userController = require('../controller/userController');

passport.use(new BasicStrategy(
  function(email, password, done) {
    userController.findOne(email).then( (user) => {
      user = JSON.parse(user);
      if (!user) { return done(null, false); }
      if (!userController.verifyPassword(password,user[0].password)) { return done(null, false); }
      return done(null, user);
    }).catch((err) => {
      console.log(err);
      return done(err);
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
