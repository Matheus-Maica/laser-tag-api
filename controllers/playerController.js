const express = require("express");

const Player = require('../models/player')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        var player = await Player.find();
        return res.send(player);
    } catch (err) {
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
        return res.send({ players, playersCount });
    } catch (err) {
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
        const existingPlayer = await Player.findOne({ name })
        if (existingPlayer) {
            existingPlayer.kills += kills
            existingPlayer.deaths += deaths
            await existingPlayer.save();
            return res.json({ message: "jogador atualizado" })
        }
        var player = Player.create({
            name,
            kills,
            deaths
        });

        return res.json({ player });
    } catch (err) {
        return res.status(400).json({ error: "Erro ao criar usuário" });
    }
})

module.exports = app => app.use("/players", router);