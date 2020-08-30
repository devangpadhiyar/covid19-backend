const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/users');

const SECRET_KEY = process.env.JWT_SECRET || 'Some secret here';

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
  algorithms: ['HS256'],
  ignoreExpiration: false,
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      // Find the user from the given id
      User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        // If user found then authenticate  else not authorised
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
