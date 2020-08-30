const { body, validationResult } = require('express-validator');
const User = require('../models/users');
const { loginUser } = require('../services/userServices');
const { createUser } = require('../services/userServices');

const userSignUp = async (req, resp, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    resp.status(400).json(errors.mapped());
    return;
  }

  const { email, firstName, lastName, country, password } = req.body;
  const user = await createUser(email, firstName, lastName, country, password);
  resp.json(user.toJSON());
};

const userSignin = async (req, resp, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    resp.status(400).json(errors.mapped());
  }
  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmail(email);
    const validated = user.validatePassword(password);
    if (!validated) {
      resp.status(400).json({ password: { msg: 'Password is incorrect' } });
      return;
    }
    const secureData = loginUser(user);
    resp.json(secureData);
  } catch (e) {
    next(e);
  }
};

const userData = async (req, res, next) => {
  const { user } = req;
  res.json(user.toJSON());
};

// eslint-disable-next-line consistent-return
const validate = (method) => {
  // eslint-disable-next-line default-case
  switch (method) {
    case 'userSignUp':
      return [
        body('email')
          .notEmpty()
          .withMessage('This field is required')
          .isEmail()
          .custom(async (val) => {
            const user = await User.findUserByEmail(val);
            if (user) {
              return Promise.reject('This user is already registered');
            }
          }),
        body('firstName').notEmpty().withMessage('This field is required'),
        body('lastName').notEmpty().withMessage('This field is required'),
        body('country').notEmpty().withMessage('This field is required'),
        body('password')
          .notEmpty()
          .withMessage('This field is required')
          .isLength({ min: 8 })
          .withMessage('Password should contain minimum 8 letters'),
        body('password2')
          .notEmpty()
          .withMessage('This field is required')
          .isLength({ min: 8 })
          .withMessage('Password should contain minimum 8 letters')
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password confirmation does not match password');
            }
            return true;
          }),
      ];

    case 'userSignin':
      return [
        body('email')
          .notEmpty()
          .withMessage('This field is required')
          .isEmail()
          .custom(async (val) => {
            const user = await User.findUserByEmail(val);
            if (!user) {
              return Promise.reject('No user found with this email');
            }
          }),
        body('password')
          .notEmpty()
          .withMessage('This field is required')
          .withMessage('Password should contain minimum 8 letters'),
      ];
  }
};

module.exports = {
  userSignUp,
  userSignin,
  userData,
  validate,
};
