const Bull = require('bull');
const config = require('../../config');

const sendCovidDataEmailToUser = new Bull('covid-mail', config.REDIS_URL);

sendCovidDataEmailToUser.on('error', (error) => {
  console.log(error);
});

module.exports = {
  sendCovidDataEmailToUser,
};
