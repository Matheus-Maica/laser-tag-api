const express = require("express");

const socketIOClient = require('socket.io-client');
const socket = socketIOClient("http://localhost:3030/");

const Match = require('../models/match')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const matches = await Match.find();
        return res.send(matches);
    } catch (err) {
        return res.status(400).send({ error: "Erro ao pegar as atividades" });
    }
})

router.get('/death/:killed/:killer', async (req, res) => {
    const query = req.params;

    const id_killed = parseInt(query.killed)
    const id_killer = parseInt(query.killer)
    const killed = {
        player: id_killed,
        team: id_killed === 1 ? "#519BFC" : "#FC5185"
    }
    const killer = {
        player: id_killer,
        team: id_killer === 1 ? "#519BFC" : "#FC5185"
    }
    try {
        socket.emit('death', {
            killed,
            killer,
            timeStamp: Date.now(),
        })
        return res.send("Morto!");
    } catch (err) {
        return res.status(400).send({ error: "Erro ao emitir morte" });
    }
})

router.post('/', async (req, res) => {
    try {
        const {
            bluePlayer,
            blueScore,
            blueResult,
            redPlayer,
            redScore,
            redResult,
            time
        } = req.body

        const match = Match.create({
            blueTeam: {
                player: bluePlayer,
                score: blueScore,
                result: blueResult,
            },
            redTeam: {
                player: redPlayer,
                score: redScore,
                result: redResult,
            },
            time,
        })

        return res.send(match)
    } catch (err) {
        return res.status(400).send({ error: "Erro ao armazenar partida" });
    }
})

module.exports = app => app.use("/matches", router);