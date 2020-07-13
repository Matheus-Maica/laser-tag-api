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

let port = 3000;

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port + '!!!');
});