const userController = require("../controllers/user");
const router = require('express').Router();
const {body, validationResult} = require('express-validator');


router.post('/signup/', [body('email').notEmpty().isEmail()], userController.userSignUp);

module.exports = router;
