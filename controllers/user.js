const { body, validationResult } = require('express-validator');

const userSignUp = (req, resp, next)=>{
    console.log(req)
}

module.exports = {
    userSignUp,
}
