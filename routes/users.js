const router = require('express').Router();
const userController = require('../controllers/user');
const policies = require('../policies');

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

// Get current user details route
router.get('/user-details', policies.isAuthenticated, userController.userData);

module.exports = router;
