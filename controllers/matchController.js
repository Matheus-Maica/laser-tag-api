const express = require("express");

const Match = require('../models/match')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const matches = await Match.find();        
        return res.send(matches);
    } catch(err) {
        return res.status(400).send({ error: "Erro ao pegar as atividades" });
    }
})

router.post('/', async (req, res) => {
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

module.exports = app => app.use("/matches", router);