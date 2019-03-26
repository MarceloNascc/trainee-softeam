const express = require('express'); //controle de rotas
const bodyParser = require('body-parser'); //converte JSON
const mongoose = require('mongoose'); //gerenciamento do banco de dados

mongoose.Promise = global.Promise; //erros com promise
mongoose.connect('mongodb://localhost:27017/traineeSofteam'); //conectando com o db

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //permite valores além de strings


//criando um middleware para teste da aplicação
app.use('/teste', (req, res) => res.json('A aplicação está rodando :)'));


//colocando a aplicação para rodar
module.exports = app.listen(3000, () => console.log('RUN'));