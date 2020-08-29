const router = require('express').Router();
const userController = require('../controllers/user');

// Signup route
router.post(
  '/signup',
  userController.validate('userSignUp'),
  userController.userSignUp
);

// Sign in route

router.post(
  '/signin',
  userController.validate('userSignin'),
  userController.userSignin
);

module.exports = router;
