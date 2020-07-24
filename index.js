const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
require('./controllers/')(app);

let port = 3030;

var server = app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port + '!!!');
});

const io = require('socket.io')(server);

io.on('connection', socket => {
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
        // deathinfo = {
        //     killed: {
        //         name,
        //         team
        //     },
        //     killer: {
        //         name,
        //         team
        //     },
        //     timeStamp,
        // }
        io.sockets.emit('killfeed', deathInfo)
    })
})