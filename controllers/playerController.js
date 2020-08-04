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
    const query = req.query;
    const skip = 10 * (query.page * 1 - 1)
    try {
        let playersCount;
        var players = await Player
                        .find()
                        .sort('-kills')
                        .skip(skip)  
                        .limit(10)  
        await Player.countDocuments({}, function (err, count) {
            playersCount = count;
        });
        return res.send({players,playersCount});
    } catch(err) {
        return res.status(400).send({ error: "Erro ao buscar lista de jogadores" });
    }
})

router.post('/', async (req, res) => {
    const { 
        name,
        kills,
        deaths,
    } = req.body;
    try {  
        existingPlayer = await Player.findOne({name})   
        if(existingPlayer) {
            await Player.findOneAndUpdate(existingPlayer, {
                kills: existingPlayer.kills + kills,
                deaths: existingPlayer.deaths + deaths,
                kd: (existingPlayer.kills + kills) / (existingPlayer.deaths + deaths)
            })
        }
        var player = await Player.create({
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