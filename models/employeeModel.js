const mongoose = require('mongoose'); //lib para o gerenciamento do banco de dados

//schema do funcionário
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    code: {
        type: String
    },
    number: {
        type: Number
    },
    complement: {
        type: String
    }
});

//Tornando o modelo visível fora do arquivo
module.exports = mongoose.model("Employee", employeeSchema);