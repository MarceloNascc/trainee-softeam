const app = require('../index');
const request = require('supertest');
const chai = require('chai');
const Employee = require('../models/employeeModel');

before(async () => {
    await Employee.remove({});
});

describe('Testes do CRUD de funcionários', () => {
    describe('Testes para o verbo GET', () => {
        describe('Testes na rota /employee', () => {
            it('Sem funcionários no db', done => {
                request(app).get('/employee').end((err, res) => {
                    chai.expect(res.statusCode).to.equal(200);
                    chai.expect(res.body.employees).to.be.an('array').that.is.empty;
                    chai.expect(res.body.message).to.be.an('string');
                    chai.expect(res.body.message).to.equal('Todos os funcionários');

                    done();
                });
            });

            it('Com funcionários no db', done => {
                request(app).get('/employee').end((err, res) => {
                    chai.expect(res.statusCode).to.equal(200);
                    chai.expect(res.body.employees).to.be.an('array').that.not.is.empty;
                    chai.expect(res.body.employees[0].name).to.equal('João Marcelo');
                    chai.expect(res.body.message).to.be.an('string');
                    chai.expect(res.body.message).to.equal('Todos os funcionários');
    
                    done();
                });
            });
        });

        /*describe('Testes na rota /employee/:cpf', () => {

        });*/
    });
    /*
    describe('Testes para o verbo POST', () => {

    });

    describe('Testes para o verbo PUT', () => {

    });

    describe('Testes para o verbo DELETE', () => {

    });*/
});