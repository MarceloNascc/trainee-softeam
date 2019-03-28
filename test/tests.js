const app = require('../index');
const request = require('supertest');
const chai = require('chai');
const Employee = require('../models/employeeModel');

const employeeOne = new Employee ({
    name: 'Teste 1',
    cpf: '045.482.357-17',
    phone: '(79) 9 8125-3587',
    code: '49400-000',
    number: 428,
    complement: 'Testando tudooooo'
});

const employeeTwo = new Employee ({
    name: 'Teste 2',
    cpf: '055.402.256-27',
    phone: '(75) 9 9815-3267',
    code: '49200-000',
    number: 525,
    complement: 'Testando tudooooo mesmooooo'
});

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
                employeeOne.save(err => {
                    request(app).get('/employee').end((err, res) => {
                        chai.expect(res.statusCode).to.equal(200);
                        chai.expect(res.body.employees).to.be.an('array').that.not.is.empty;
                        chai.expect(res.body.employees[0].name).to.equal('Teste 1');
                        chai.expect(res.body.message).to.be.an('string');
                        chai.expect(res.body.message).to.equal('Todos os funcionários');
    
                        done();
                    });
                });
            });
        });

        describe('Testes na rota /employee/:cpf', () => {
            it('Buscando funcionários específicos: não contém funcionário', done => {
                request(app).get('/employee/123.482.357-00').end((err, res) => {
                    chai.expect(res.statusCode).to.equal(404);
                    chai.expect(res.body).to.have.property('message').that.not.is.undefined;

                    done();
                });
            });

            it('Buscando funcionários específicos: contém funcionário', done => {
                request(app).get('/employee/' + employeeOne.cpf).end((err, res) => {
                    chai.expect(res.statusCode).to.equal(200);
                    chai.expect(res.body.employee.name).to.equal('Teste 1');
                    chai.expect(res.body.employee).to.have.property('name').that.not.is.undefined;
                    chai.expect(res.body.employee).to.have.property('cpf').that.not.is.undefined;
                    chai.expect(res.body.employee).to.have.property('phone').that.not.is.undefined;
                    chai.expect(res.body.employee).to.have.property('number').that.not.is.undefined;
                    chai.expect(res.body.employee).to.have.property('complement').that.not.is.undefined;
                    chai.expect(res.body.employee).to.have.property('code').that.not.is.undefined;

                    done();
                });
            });
        });
    });
    
    describe('Testes para o verbo POST', () => {
        it('Adicionando funcionários: sem cpf', done => {
            request(app).post('/employee').send(
                {
                    name: 'Testando',
                    phone: '(75) 9 9815-3267',
                    code: '49200-000',
                    number: 525,
                    complement: 'Testando tudooooo mesmooooo'
                }
            ).end((err, res) => {
                chai.expect(res.statusCode).to.equal(500);

                done();
            })
        });

        it('Adicionando funcionários: sem nome', done => {
            request(app).post('/employee').send(
                {
                    cpf: '123.482.357-00',
                    phone: '(75) 9 9815-3267',
                    code: '49200-000',
                    number: 525,
                    complement: 'Testando tudooooo mesmooooo'
                }
            ).end((err, res) => {
                chai.expect(res.statusCode).to.equal(500);

                done();
            })
        });

        it('Adicionando funcionários: parâmetros ok', done => {
            request(app).post('/employee').send(employeeTwo).end((err, res) => {
                chai.expect(res.statusCode).to.equal(201);
                chai.expect(res.body.employee.name).to.equal('Teste 2');

                done();
            })
        });

        it('Adicionando funcionários: cpf já existente no db', done => {
            request(app).post('/employee').send(employeeTwo).end((err, res) => {
                chai.expect(res.statusCode).to.equal(500);

                done();
            })
        });
    });
    
    describe('Testes para o verbo PUT', () => {
        it('Atualizando funcionário: funcionário não existe', done => {
            request(app).put('/employee/123.482.357-00').send(employeeOne).end((err, res) => {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(res.body).to.have.property('message').that.not.is.undefined;

                done();
            });
        });

        it('Atualizando funcionário: funcionário existe: parâmetros ok', done => {
            request(app).put('/employee/' + employeeOne.cpf).send(employeeOne).end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body.updateEmployee.name).to.equal('Teste 1');

                done();
            });
        })

        it('Atualizando funcionário: funcionário existe: parâmetros com erro', done => {
            request(app).put('/employee/' + employeeOne.cpf).send(
                {
                    cpf: '055.402.256-27',
                    phone: '(75) 9 9815-3267',
                    code: '49200-000',
                    number: 525,
                    complement: 'Testando tudooooo mesmooooo'
                }
            ).end((err, res) => {
                chai.expect(res.statusCode).to.equal(400);

                done();
            });
        });
    });

    describe('Testes para o verbo DELETE', () => {
        it('Deletando funcionários: funcionário não existe', done => {
            request(app).delete('/employee/123.482.357-00').end((err, res) => {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(res.body).to.have.property('message').that.not.is.undefined;

                done();
            });
        });

        it('Deletando funcionários: funcionário existe', done => {
            request(app).delete('/employee/' + employeeOne.cpf).end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body.employee.name).to.equal('Teste 1');

                done();
            });
        });
    });
});