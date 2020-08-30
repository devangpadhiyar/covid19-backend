const { param, query, validationResult } = require('express-validator');
const moment = require('moment');
const { sendCovidDataEmailToUser } = require('../backgroundTasks/queues');
const { getCovidDataFromAPI } = require('../services/analyticsService');
const { toDate } = require('../utils/sanitizers');

const getCovidData = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    resp.status(400).json(errors.mapped());
    return;
  }
  const { countryId } = req.params;
  const { from, to } = req.query;
  try {
    const filteredData = await getCovidDataFromAPI(countryId, from, to);
    resp.json(filteredData);
  } catch (e) {
    next();
  }
};
const sendCovidDataToMail = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    resp.status(400).json(errors.mapped());
    return;
  }
  const { countryId } = req.params;
  const { from, to } = req.query;
  const task = await sendCovidDataEmailToUser.add({
    countryId,
    from,
    to,
    userId: req.user._id,
  });
  try {
    resp.json({
      message: `Check you mailbox you will receive email on ${req.user.email}`,
    });
  } catch (e) {
    next();
  }
};

const validate = (method) => {
  switch (method) {
    case 'getCovidData':
      return [
        query('from')
          .customSanitizer(toDate('DDMMYYYY'))
          .customSanitizer((value) => {
            if (value) {
              return value;
            }
            return moment().subtract(15, 'days').toDate();
          }),
        query('to')
          .customSanitizer(toDate('DDMMYYYY'))
          .customSanitizer((value) => {
            if (value) {
              return value;
            }
            return moment().toDate();
          }),
      ];
  }
};

module.exports = {
  getCovidData,
  sendCovidDataToMail,
  validate,
};
