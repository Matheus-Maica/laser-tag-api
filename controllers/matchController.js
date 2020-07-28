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
    const killed = query.killed;
    const killer = query.killer;
    try {
        socket.emit('death', {
            killed,
            killer,
            timeStamp: Date.now(),
        })
        return res.send("Sucesso");
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