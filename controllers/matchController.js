const express = require("express");

const socketIOClient = require('socket.io-client');
const socket = socketIOClient("http://localhost:3030/");

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

router.get('/death', async (req, res) => {
    const query = req.query;
    const id = parseInt(query.id)
    const killed = {
        player: id,
        team: id === 1 ? "blue" : "red"
    }
    const killer = {
        player: id === 1 ? 2 : 1,
        team: id === 1 ? "red" : "blue"
    }
    try {
        socket.emit('death', {
            killed,
            killer,
            timeStamp: Date.now(),
        })
        return res.send("Morto!");
    } catch(err) {
        return res.status(400).send({ error: "Erro ao emitir morte" });
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