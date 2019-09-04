const express = require('express');
const cors = require('cors');
const societesRouter = require('./resources/societes');
const typesLignesComptablesRouter = require('./resources/types-lignes-comptables');
const lignescomptablesRouter = require('./resources/lignes-comptables.js');

module.exports = database => {
    const app = express();
    app.use(cors());
    //utiliser format JSON

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/societes', societesRouter(database));
    app.use('/types-lignes-comptables', typesLignesComptablesRouter(database));
    app.use('/lignes-comptables', lignescomptablesRouter(database));
    //add others resources here

    return app;
};
