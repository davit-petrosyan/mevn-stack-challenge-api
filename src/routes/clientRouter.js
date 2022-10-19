const express = require('express');
const validator = require('../middlewares/validatorMiddleware');
const router = express.Router();
const clientController = require('../controllers/clientController');

/**
 * Аll routes start with '/client'
 **/
router
    .route('/')
    .post(validator('client-create'),clientController.create)
    .get(clientController.findAll);

router
    .route('/:id')
    .get( clientController.find)
    .put(validator('client-update'),clientController.update )
    .delete(clientController.delete)

module.exports = router;
