const express = require("express");

const Team = require('../models/teams')

const router = express.Router();

router.get('/', async (req, res) => {
    try {                
        return res.send("TesteTeams");
    } catch(err) {
        return res.status(400).send({ error: "Erro ao pegar as atividades" });
    }
})

router.post('/cadastrar', async (req, res) => {
    try {
        const {
            teamName
        } = req.body        

        console.log(teamName)
        const team = Team.create({
            teamName
        })

        return res.send(team)
    } catch(err) {
        return res.status(400).send({ error: "Erro ao cadastrar usuario" });
    }
})

module.exports = app => app.use("/teams", router);