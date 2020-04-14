const express = require('express');
// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');
const requestLogger = require('./logger');
const route = require('./route');

const app = express();

// app.use(morgan(':method   :url  :status  :response-time ms', {
//   stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// }));

// app.use(morgan(':method\t\t:url\t\t:status\t\t:response-time[digits] ms', {
//   stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// }));

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Hi! Welcome to Alabi Tosin\'s Covid-19 Estimator');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/v1/on-covid-19', route);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
