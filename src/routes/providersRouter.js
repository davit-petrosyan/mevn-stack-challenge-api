const express = require('express');
const validator = require('../middlewares/validatorMiddleware');
const router = express.Router();
const providerController = require('../controllers/providerController');

/**
 * Аll routes start with '/provider'
 **/
router
    .route('/')
    .post(validator('provider-create'), providerController.create)
    .get(providerController.findAll);

router
    .route('/:id')
    .get( providerController.find)
    .put( validator('provider-update'), providerController.update )
    .delete(providerController.delete)

module.exports = router;
