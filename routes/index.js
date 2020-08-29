const router = require('express').Router();
const { isAuthenticated } = require('../policies');

router.use('/users', require('./users'));
router.use('/analytics', require('./analytics'));

router.get('/test', isAuthenticated, (req, res) => {
  res.status(200).json({ status: 'Ok' });
});

module.exports = router;
