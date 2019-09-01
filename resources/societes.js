const express = require('express');
const database = require('../database');
const router = express.Router();

//GET ALL SOCIETIES
router.get("/", (reqHttp, resHttp) => {
    database.query('SELECT id,label FROM societe;', (err, res) => resHttp.send(res.rows));
});

//GET ONE SOCIETY
router.get("/:id", (reqHttp, resHttp) => {
    const id = reqHttp.params.id;
    database.query('SELECT id,label FROM societe WHERE id = $1', [id], (err, res) => resHttp.send(res.rows));
});

// POST SOCIETY
router.post("/", (reqHttp, resHttp) => {
    const label = reqHttp.body.label;

    if (!label) {
        return resHttp.status(400).send({error:'undefined label'});
    }

    database.query('INSERT INTO societe(label) VALUES($1);', [label], (err, res) => {
        if (err) {
            console.log(err);
            return resHttp.status(500).send({error:'server error'});
        }
        return resHttp.status(201).send();
    });
});

//PUT ONE SOCIETY


const putSociety = (reqHttp, resHttp) => {
    const idurl = reqHttp.params.id;
    const id = reqHttp.body.id;
    const label = reqHttp.body.label;

       //error if label null or undefined
    if (!label) {
        return resHttp.status(400).send({error:'undefined label'});
    }

     //error if different id
     if(idurl != id) {
        return resHttp.status(400).send({error:'different id'});
    }

    database.query(`UPDATE societe SET label = $1 WHERE id = $2;`, [label, id], (err, res) => {
        if (err) {
            console.log(err);
            return resHttp.status(500).send({error:'server error'});
        }

        if(res.rowCount === 0){
            return resHttp.status(500).send({error:'no data to update'});

        }
        return resHttp.status(200).send();
    });
}
router.put("/:id", putSociety);


//DELETE ONE SOCIETY

router.delete("/:id", (reqHttp, resHttp) => {
    const id = reqHttp.params.id;

    database.query(`DELETE FROM societe WHERE id = $1;`, [id], (err, res) => {
         console.log(res)
        if (err) {
            return resHttp.status(500).send({error:'server error'});
        }
        if (res.rowCount === 0) {
            return resHttp.status(500).send({error:'No delete, because no data to delete'});
        }

        return resHttp.status(204).send();
    });
});






module.exports = router;
