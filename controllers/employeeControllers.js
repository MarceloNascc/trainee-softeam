const employee = require('../models/employeeModel');

//funcionalidade: retornar todos os funcionários
const readAll = async (req, res) => {
    try {
        const employees = await Employee.find({});
        return res.status(200).json({ message: 'Todos os funcionários:', employees });
    } catch (error) {
        return res.status(500).json({message: 'Erro ao tentar mostrar todos os funcionários:', error});
    }
};

//funcionalidade: retornar um funcionário pelo cpf
const readOne = async (req, res) => {
    try {
        const { cpf } = req.params;
        const employee = await Employee.findOne({ cpf: cpf });

        if(!employee){
            return res.status(404).json({message: `Funcionário com cpf = ${cpf} não encontrado`});
        }

        return res.status(200).json({ message: 'Funcionário:', employees });
    } catch (error) {
        return res.status(500).json({message: `Erro ao tentar mostrar o funcionário com cpf = ${cpf}:`, error});
    }
};

//funcionalidade: atualizar um funcionário
const update = async (req, res) => {
    try {
        const { cpf } = req.params;
        const { name: newName, cpf, phone: newPhone, code: newCode, number: newNumber, complement: newComplement } = req.body;
        const updateEmployee = await Employee.findOneAndUpdate(
            {
                cpf: cpf
            }, 
            {
                name: newName,
                cpf,
                phone: newPhone,
                code: newCode,
                number: newNumber,
                complement: newComplement
            }
        );

        if(!updateEmployee){
            return res.status(404).json({message: `Funcionário com cpf = ${cpf} não encontrado`});
        }

        return res.status(200).json({ message: 'Funcionário atualizado!\nDados atuais:', employees });
    } catch (error) {
        return res.status(500).json({message: `Erro ao tentar atualizar o funcionário com cpf = ${cpf}:`, error});
    }
};

//funcionalidade: remover um funcionário
const delet = async (req, res) => {
    try {
        const { cpf } = req.params;
        const employee = await Employee.findOneAndDelete({ cpf: cpf });
    
        if(!employee){
            return res.status(404).json({message: `Funcionário com cpf = ${cpf} não encontrado`});
        }
        
        return res.status(200).json({ message: `Funcionário removido:`, employees });
    } catch (error) {
        return res.status(500).json({message: `Erro ao tentar remover o funcionário com cpf = ${cpf}:`, error});
    }
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
        return res.status(201).json({ message: 'Funcionário adicionado:', employee });
    } catch (error) {
        return res.status(500).json({message: 'Erro ao tentar adicionar um funcionário:', error});
    }
};

module.exports = {
    readAll,
    readOne,
    update,
    delet,
    create
};