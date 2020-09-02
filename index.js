const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./controllers/')(app);


var server = app.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta ' + process.env.PORT + '!!!');
});

const io = require('socket.io')(server);

io.on('connection', socket => {
    app.get('/teste', (req, res) => {
        io.sockets.emit('teste', { teste: 'teste' })
        res.send("teste")
    })
    console.log("New connection", socket.id)
    var onGoingMatch;
    socket.on('startMatch', matchInfo => {
        onGoingMatch = true;
        console.log("A partida começou")
        io.sockets.emit('startMatch', "A partida começou!");
    })

    socket.on('endMatch', matchInfo => {
        onGoingMatch = false;
        console.log("A partida terminou")
        io.sockets.emit('endMatch', "A partida acabou!");
    })

    socket.on('death', deathInfo => {
        console.log(deathInfo)
        io.sockets.emit('killfeed', deathInfo)
    })
})