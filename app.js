const express = require('express');
const societesRouter = require('./resources/societes');

module.exports = database => {
    const app = express();

    //utiliser format JSON
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/societes', societesRouter(database));
    //add others resources here

    return app;
};
