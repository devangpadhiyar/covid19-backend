const axios = require('axios');
const moment = require('moment');
const _ = require('lodash');

const COVID_API_URL = 'http://corona-api.com';

const getCovidDataFromAPI = async (countryId, from = null, to = null) => {
  const url = `${COVID_API_URL}/countries/${countryId}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    const {
      data: { timeline },
    } = response.data;
    const sanitisedTimeline = timeline
      ? timeline.map((timeObj) => ({
          ...timeObj,
          date: moment(timeObj.date, 'YYYY-MM-DD').toDate(),
        }))
      : [];
    let filteredData = sanitisedTimeline;
    if (from && to) {
      filteredData = _.filter(
        sanitisedTimeline,
        (o) => o.date >= from && o.date <= to
      );
    }
    filteredData.reverse();
    return filteredData;
  }
  throw Error('Error while fetching data from API');
};

module.exports = {
  getCovidDataFromAPI,
};
