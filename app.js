const express = require('express');

const societesRouter = require('./resources/societes');

const app = express();

//utiliser format JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/societes', societesRouter);
//add others resources here

module.exports = app;
