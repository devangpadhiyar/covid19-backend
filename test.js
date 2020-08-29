const jsonwebtoken = require('jsonwebtoken');

const token = jsonwebtoken.sign(
  { sub: 'Devang', iat: Date.now() },
  'secret-sauce',
  {
    expiresIn: 1,
    algorithm: 'HS256',
  }
);
console.log(token);

const a = jsonwebtoken.verify(token, 'secret-sauce', {
  algorithms: ['HS256'],
  ignoreExpiration: false,
});

console.log(a);
