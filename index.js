const express = require('express'); //controle de rotas
const bodyParser = require('body-parser'); //converte JSON
const mongoose = require('mongoose'); //gerenciamento do banco de dados
const employeeRouter = require('./router/employeeRouter');
const swagger = require('swagger-ui-express'); //documentação
const swaggerDoc = require('./doc/doc.json');

mongoose.Promise = global.Promise; //erros com promise
mongoose.connect('mongodb://trainee:senhaTrainee@localhost:27017/traineeSofteam', {useNewUrlParser: true}); //conectando com o db

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //permite valores além de strings

app.use('/teste', (req, res) => res.json('A aplicação está rodando :)')); //criando uma rota de teste da aplicação
app.use('/employee', employeeRouter());
app.use('/', swagger.serve, swagger.setup(swaggerDoc));

//colocando a aplicação para rodar
module.exports = app.listen(3000, () => console.log('RUN'));