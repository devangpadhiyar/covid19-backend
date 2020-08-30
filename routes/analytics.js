const router = require('express').Router();
const queryString = require('query-string');
const policies = require('../policies');
const analyticsController = require('../controllers/analytics');

// Fetch data within the range
router.get(
  '/get-covid-data/:countryId',
  policies.isAuthenticated,
  analyticsController.validate('getCovidData'),
  analyticsController.getCovidData
);

// Generate and send mail to user
router.get(
  '/send-covid-data-to-mail/:countryId',
  policies.isAuthenticated,
  analyticsController.validate('getCovidData'),
  analyticsController.sendCovidDataToMail
);

module.exports = router;
