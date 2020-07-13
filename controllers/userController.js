const express = require("express");

const User = require('../models/user')

const router = express.Router();

router.get('/', async (req, res) => {
    try {                
        return res.send("Teste");
    } catch(err) {
        return res.status(400).send({ error: "Erro ao pegar as atividades" });
    }
})

module.exports = app => app.use("/user", router);