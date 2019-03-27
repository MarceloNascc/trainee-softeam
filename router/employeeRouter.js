const router = require('express').Router();
const employeeController = require('../controllers/employeeControllers');

const employeeRouter = () => {
    router.route('/')
        .get(employeeController.readAll)
        .post(employeeController.create);

    router.route('/:cpf')
        .get(employeeController.readOne)
        .put(employeeController.update)
        .delete(employeeController.delet);

    return router;
};

module.exports = employeeRouter;