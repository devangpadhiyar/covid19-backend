const jsonwebtoken = require("jsonwebtoken");

token = jsonwebtoken.sign({sub:"Devang",iat: Date.now()}, 'secret-sauce',{ expiresIn: '1d', algorithm: 'HS256' })
console.log(token)
