const Employee = require('../models/employeeModel');

//funcionalidade: retornar todos os funcionários
const readAll = async (req, res) => {
    try {
        const employees = await Employee.find({});

        return res.status(200).json({ message: 'Todos os funcionários', employees });
    } catch (error) {
        return res.status(500).json({message: 'Erro ao tentar mostrar todos os funcionários:', error});
    }
};

//funcionalidade: retornar um funcionário pelo cpf
const readOne = async (req, res) => {
    const { cpf } = req.params;
    try {
        const employee = await Employee.findOne({ cpf: cpf });

        if(employee === null){
            return res.status(404).json({message: `Funcionário com cpf = ${cpf} não encontrado`});
        }
        
        return res.status(200).json({ message: 'Funcionário encontrado', employee });
    } catch (error) {
        return res.status(500).json({message: `Erro ao tentar mostrar o funcionário com cpf = ${cpf}:`, error});
    }
};

//funcionalidade: atualizar um funcionário
const update = async (req, res) => {
    const { cpf } = req.params;
    try {
        const { name: newName, phone: newPhone, code: newCode, number: newNumber, complement: newComplement } = req.body;
        
        if(!newName){
            return res.status(400).json({message: `Nome é obrigatório`});
        }
        const updateEmployee = await Employee.findOneAndUpdate(
            {
                cpf: cpf
            }, 
            {
                name: newName,
                cpf: cpf,
                phone: newPhone,
                code: newCode,
                number: parseInt(newNumber),
                complement: newComplement
            }
        );

        if(updateEmployee === null){
            return res.status(404).json({message: `Funcionário com cpf = ${cpf} não encontrado`});
        }

        return res.status(200).json({ message: 'Funcionário atualizado!', updateEmployee });
    } catch (error) {
        return res.status(500).json({message: `Erro ao tentar atualizar o funcionário com cpf = ${cpf}:`, error});
    }
};

//funcionalidade: remover um funcionário
const delet = async (req, res) => {
    const { cpf } = req.params;
    try {
        const employee = await Employee.findOneAndDelete({ cpf: cpf });
    
        if(!employee){
            return res.status(404).json({message: `Funcionário com cpf = ${cpf} não encontrado`});
        }
        
        return res.status(200).json({ message: `Funcionário removido!`, employee });
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
            number: parseInt(number),
            complement
        });
        
        await employee.save();
        return res.status(201).json({ message: 'Funcionário adicionado!', employee });
    } catch (error) {
        return res.status(500).json({message: 'Erro ao tentar adicionar um funcionário', error});
    }
};

module.exports = {
    readAll,
    readOne,
    update,
    delet,
    create
};
