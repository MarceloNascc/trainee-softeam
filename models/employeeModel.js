//lib for management of the database
const mongoose = require('mongoose');

//schema of employee
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cpf: {
        type: Number,
        unique: true
    },
    phone: {
        type: Number
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

module.exports = mongoose.model("Employee", employeeSchema);