// User related services are defined here

const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');

const createUser = (email, firstName, lastName, country, password) => {
  const user = new User({ email, firstName, lastName, password, country });
  return user.save();
};

const loginUser = (user) => {
  const { _id } = user;
  const expiresIn = 60;

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const PRIV_KEY = process.env.JWT_SECRET;

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: 'HS256',
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

module.exports = {
  createUser,
  loginUser,
};
