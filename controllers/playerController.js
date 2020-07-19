const express = require("express");

const Player = require('../models/player')

const router = express.Router();

router.get('/', async (req, res) => {
    try {      
        var player = await Player.find();          
        return res.send(player);
    } catch(err) {
        return res.status(400).send({ error: "Erro ao buscar usuários" });
    }
})

router.get('/leaderboard', async (req, res) => {
    const { skip, offset } = req.body;
    try {
        var player = await Player
                        .find()
                        .sort('-kills')
                        .skip(skip)  
                        .limit(offset)       
        return res.send(player);
    } catch(err) {
        return res.status(400).send({ error: "Erro ao buscar lista de jogadores" });
    }
})

router.post('/', async (req, res) => {
    const { 
        name,
        kills,
        deaths,
        kd,
    } = req.body;
    try {      
        var player = Player.create({
            name,
            kills,
            deaths,
            kd,
        });          
        return res.send(player);
    } catch(err) {
        return res.status(400).send({ error: "Erro ao criar usuário" });
    }
})

module.exports = app => app.use("/players", router);