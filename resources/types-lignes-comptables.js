const express = require("express");
const router = express.Router();

module.exports = database => {
    //GET ALL TYPES LIGNES COMPTABLES
    router.get("/", (reqHttp, resHttp) => {
        database.query(
            "SELECT id,label FROM type_ligne_comptable;",
            (err, res) => {
                if (err) {
                    return resHttp.status(500).send({ error: "server error" });
                } else {
                    return resHttp.send(res.rows);
                }
            }
        );
    });

    //GET ONE TYPES LIGNES COMPTABLES
    router.get("/:id", (reqHttp, resHttp) => {
        const id = reqHttp.params.id;
        database.query(
            "SELECT id,label FROM type_ligne_comptable WHERE id = $1",
            [id],
            (err, res) => {
                if (err) {
                    return resHttp.status(500).send({ error: "server error" });
                } else if (res.rows.length === 0) {
                    return resHttp.status(404).send({
                        error: "not_found",
                        error_description: `The type of the ligne comptable '${id}' does not exist`
                    });
                } else {
                    return resHttp.send(res.rows[0]);
                }
            }
        );
    });

    // POST TYPES LIGNES COMPTABLES
    router.post("/", (reqHttp, resHttp) => {
        const label = reqHttp.body.label;

        if (!label) {
            return resHttp.status(400).send({ error: "undefined label" });
        }

        database.query(
            "INSERT INTO type_ligne_comptable(label) VALUES($1) RETURNING *;",
            [label],
            (err, res) => {
                if (err) {
                    return resHttp.status(500).send({ error: "server error" });
                } else {
                    return resHttp.status(201).send(res.rows[0]);
                }
            }
        );
    });

    //PUT ONE TYPE LIGNE COMPTABLE
    router.put("/:id", (reqHttp, resHttp) => {
        const idurl = reqHttp.params.id;
        const id = reqHttp.body.id;
        const label = reqHttp.body.label;

        //error if label null or undefined
        if (!label) {
            return resHttp.status(400).send({ error: "undefined label" });
        }

        //error if different id
        if (idurl !== id) {
            return resHttp.status(400).send({ error: "different id" });
        }

        database.query(
            `UPDATE type_ligne_comptable SET label = $1 WHERE id = $2 RETURNING *;`,
            [label, id],
            (err, res) => {
                if (err) {
                    return resHttp.status(500).send({ error: "server error" });
                } else if (res.rowCount === 0) {
                    return resHttp.status(404).send({
                        error: "not_found",
                        error_description: `The type of the ligne comptable '${id}' does not exist`
                    });
                } else {
                    return resHttp.status(200).send(res.rows[0]);
                }
            }
        );
    });

    //DELETE ONE TYPE LIGNE COMPTABLE
    router.delete("/:id", (reqHttp, resHttp) => {
        const id = reqHttp.params.id;

        database.query(
            `DELETE FROM type_ligne_comptable WHERE id = $1;`,
            [id],
            (err, res) => {
                if (err) {
                    return resHttp.status(500).send({ error: "server error" });
                } else if (res.rowCount === 0) {
                    return resHttp.status(404).send({
                        error: "not_found",
                        error_description: `The type of the ligne comptable '${id}' does not exist`
                    });
                } else {
                    return resHttp.status(204).send();
                }
            }
        );
    });

    return router;
};
