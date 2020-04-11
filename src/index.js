// import express from 'express';
// import route from './route';
const express = require('express');
const route = require('./route');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/v1', route);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
