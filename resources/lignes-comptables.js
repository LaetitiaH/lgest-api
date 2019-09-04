const express = require('express');
const router = express.Router();


module.exports = database => {

//GET ALL LIGNES COMPTABLES
router.get('/', (reqHttp, resHttp) => {
    database.query('SELECT id,date_facture,date_encaissement,montant_ttc,montant_ht, montant_tva,transmis_compta,commentaires,typeligne_id,societe_id FROM ligne_comptable;', (err, res) =>
        resHttp.send(res.rows)
    );
});



//GET ONE LIGNE COMPTABLE
router.get('/:id', (reqHttp, resHttp) => {
    const id = reqHttp.params.id;
    database.query(
        'SELECT id,date_facture,date_encaissement,montant_ttc,montant_ht, montant_tva,transmis_compta,commentaires,typeligne_id,societe_id FROM ligne_comptable WHERE id = $1',
        [id],
        (err, res) => resHttp.send(res.rows)
    );
});


//INSERT ONE LIGNE COMPTABLE


//PUT ONE LIGNE COMPTABLE


//DELETE ONE LIGNE COMPTABLE


return router;
};
