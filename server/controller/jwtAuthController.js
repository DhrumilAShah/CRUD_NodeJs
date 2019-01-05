var passportJWT = require("passport-jwt");
var passport = require('passport');
var userController = require('../controller/userController');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = { };
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'SuruchiJeevNuJeevan';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, cb) {
  userController.findOne(jwt_payload.email).then( (user) => {
      return (user) ? cb(null, user) : cb(null, false);
    }).catch((err) => {
      console.log(err);
        return done(err, false);
    });
});

passport.use(strategy);
exports.isAuthenticated = passport.authenticate('jwt', { session : false });
exports.jwtOptions = jwtOptions;
