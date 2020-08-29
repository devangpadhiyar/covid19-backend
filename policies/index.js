const passport = require('passport');

// Make middleware that checks for current request authentication
const isAuthenticated = passport.authenticate('jwt', { session: false });

module.exports = {
  isAuthenticated,
};
