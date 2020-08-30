const moment = require('moment');

const toDate = (format) => (value) => {
  if (!value) {
    return null;
  }
  try {
    return moment(value, format).toDate().getUTCDate();
  } catch (e) {
    return null;
  }
};

module.exports = {
  toDate,
};
