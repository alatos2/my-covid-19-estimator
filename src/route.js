const express = require('express');
const o2x = require('object-to-xml');
const path = require('path');
const os = require('os');
const fs = require('fs');
const covid19ImpactEstimator = require('./estimator');

const route = express.Router();

/* eslint-disable object-shorthand */
route.post('/', (req, res) => {
  res.set('Content-Type', 'application/json');
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

route.post('/json', (req, res) => {
  res.set('Content-Type', 'application/json');
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

  // res.status(200).json(covid19ImpactEstimator(inputData));
  res.status(200).json(covid19ImpactEstimator(inputData));
});


route.post('/xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
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

  res.send(o2x({
    '?xml version="1.0" encoding="utf-8"?': null,
    ...covid19ImpactEstimator(inputData)
  }));
});

route.get('/logs', (req, res) => {
  const filePath = path.join(__dirname, 'access.log');
  const contents = fs.readFileSync(filePath);
  res.send(contents);
});

// export default route;
module.exports = route;
