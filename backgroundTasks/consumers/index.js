const moment = require('moment');
const fs = require('fs');
const stream = require('stream');
const config = require('../../config');

const User = require('../../models/users');
const { sendMail } = require('../../utils/mail');
const { getCovidDataFromAPI } = require('../../services/analyticsService');
const { sendCovidDataEmailToUser } = require('../queues');

const plotly = require('plotly')(config.PLOTLY_USERNAME, config.PLOTLY_API_KEY);

// Process emails that will be sent to user
sendCovidDataEmailToUser.process(async (job) => {
  const { countryId, from, to, userId } = job.data;
  const user = await User.findOne({ _id: userId });
  const data = await getCovidDataFromAPI(
    countryId,
    moment(from).toDate(),
    moment(to).toDate()
  );

  const graphDataXAxis = [];
  const graphDeaths = [];
  const graphConfirmed = [];
  const graphRecovered = [];
  const graphActive = [];
  const graphNewConfirmed = [];
  const graphNewDeaths = [];
  const graphNewRecovered = [];
  data.forEach((timeObj) => {
    graphDataXAxis.push(moment(timeObj.date).format('YYYY-MM-DD'));
    graphDeaths.push(timeObj.deaths);
    graphConfirmed.push(timeObj.confirmed);
    graphRecovered.push(timeObj.recovered);
    graphActive.push(timeObj.active);
    graphNewConfirmed.push(timeObj.new_confirmed);
    graphNewDeaths.push(timeObj.new_deaths);
    graphNewRecovered.push(timeObj.new_recovered);
  });

  const deathTrace = {
    x: graphDataXAxis,
    y: graphDeaths,
    type: 'scatter',
    name: 'Deaths',
  };

  const confirmedTrace = {
    x: graphDataXAxis,
    y: graphConfirmed,
    type: 'scatter',
    name: 'Confirmed',
  };

  const recoveredTrace = {
    x: graphDataXAxis,
    y: graphRecovered,
    type: 'scatter',
    name: 'Recovered',
  };

  const activeTrace = {
    x: graphDataXAxis,
    y: graphActive,
    type: 'scatter',
    name: 'Active',
  };

  const newConfirmedTrace = {
    x: graphDataXAxis,
    y: graphNewConfirmed,
    type: 'scatter',
    name: 'New confirmed',
  };

  const newDeathsTrace = {
    x: graphDataXAxis,
    y: graphNewDeaths,
    type: 'scatter',
    name: 'New deaths',
  };

  const newRecoveredTrace = {
    x: graphDataXAxis,
    y: graphNewRecovered,
    type: 'scatter',
    name: 'New recovered',
  };

  const imgOpts = {
    format: 'png',
    width: 1000,
    height: 500,
  };
  const figure = {
    data: [
      deathTrace,
      confirmedTrace,
      recoveredTrace,
      activeTrace,
      newConfirmedTrace,
      newDeathsTrace,
      newRecoveredTrace,
    ],
  };

  plotly.getImage(figure, imgOpts, (error, imageStream) => {
    if (error) return console.log(error);

    sendMail({
      from: 'Devang PAdhiyar',
      to: ['devangpadhiyar700@gmail.com'],
      subject: 'Covid 19 reports',
      text: 'Hello world!',
    });
  });
});
