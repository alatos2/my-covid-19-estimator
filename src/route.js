const express = require('express');
const o2x = require('object-to-xml');
const path = require('path');
// const os = require('os');
const fs = require('fs');
const covid19ImpactEstimator = require('./estimator');

const route = express.Router();

/* eslint-disable object-shorthand */
route.post('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  const estimates = covid19ImpactEstimator({
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  });

  res.status(200).json(estimates);
});

route.post('/json', (req, res) => {
  res.set('Content-Type', 'application/json');
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  const estimates = covid19ImpactEstimator({
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  });

  res.status(200).json(estimates);
});


route.post('/xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  const estimates = covid19ImpactEstimator({
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  });

  res.send(o2x({
    '?xml version="1.0" encoding="utf-8"?': null,
    ...estimates
  }));
});

// route.get('/logs', (req, res) => {
//   const filePath = path.join(__dirname, 'access.log');
//   const contents = fs.readFileSync(filePath);
//   res.send(contents);
// });


route.get('/logs', async (req, res) => {
  fs.readFile(path.join(__dirname, 'access.log'), (err, content) => {
    if (err) {
      // console.log(err);
      return;
    }
    res.header('Content-Type', 'text/plain; charset=UTF-8');
    res.status(200).send(content);
  });
});

module.exports = route;
