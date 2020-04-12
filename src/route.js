const express = require('express');
const covid19ImpactEstimator = require('./estimator');

const route = express.Router();

/* eslint-disable object-shorthand */

route.post('/on-covid-19', (req, res) => {
  const {
    name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation, periodType,
    timeToElapse, reportedCases, population, totalHospitalBeds
  } = req.body;

  const inputData = {
    region: {
      name: name,
      avgAge: avgAge,
      avgDailyIncomeInUSD: avgDailyIncomeInUSD,
      avgDailyIncomePopulation: avgDailyIncomePopulation
    },
    periodType: periodType,
    timeToElapse: timeToElapse,
    reportedCases: reportedCases,
    population: population,
    totalHospitalBeds: totalHospitalBeds
  };

  res.status(200).json(covid19ImpactEstimator(inputData));
});

route.post('/on-covid-19/json', (req, res) => {
  const {
    name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation, periodType,
    timeToElapse, reportedCases, population, totalHospitalBeds
  } = req.body;

  const inputData = {
    region: {
      name: name,
      avgAge: avgAge,
      avgDailyIncomeInUSD: avgDailyIncomeInUSD,
      avgDailyIncomePopulation: avgDailyIncomePopulation
    },
    periodType: periodType,
    timeToElapse: timeToElapse,
    reportedCases: reportedCases,
    population: population,
    totalHospitalBeds: totalHospitalBeds
  };

  res.status(200).json(covid19ImpactEstimator(inputData));
});

// export default route;
module.exports = route;
