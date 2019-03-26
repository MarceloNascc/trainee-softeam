const employee = require('../models/employeeModel');

//funcionalidade: retornar todos os funcionários
const findAll = async (req, res) => {

};

//funcionalidade: retornar um funcionário pelo cpf
const findOne = async (req, res) => {

};

//funcionalidade: atualizar um funcionário
const update = async (req, res) => {

};

//funcionalidade: remover um funcionário
const delet = async (req, res) => {

};

//funcionalidade: adiciona um novo funcionário
const create = async (req, res) => {
    try {
        const {name, cpf, phone, code, number, complement} = req.body;

        const employee = new Employee ({
            name,
            cpf,
            phone,
            code,
            number,
            complement
        });

        await employee.save();
        return res.status(201).json({ message: 'Funcionário adicionado ao db:', employee });
    } catch (error) {
        return res.status(500).json({message: 'Erro ao tentar mostrar todos os funcionários:', error});
    }
};

module.exports = {
    findAll,
    findOne,
    update,
    delet,
    create
};