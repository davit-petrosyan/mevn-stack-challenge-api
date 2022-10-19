const customErrors = require('../utils/customErrors');
const ProviderRepository = require("../repositories/providerRepository");

class ProviderController  {

    constructor(repository) {
        this.repository = repository;
    }

    create = async (req, res, next) => {
        try {
            const provider = await this.repository.create(req.body);
            res.status(201).json(provider);
        } catch (err) {
            next(err);
        }
    };

    find = async (req, res, next) => {
        try {
            const provider = await this.repository.find(req.params.id);
            if (!provider) throw customErrors.providerNotFound;
            res.json(provider);
        } catch (err) {
            next(err);
        }
    };

    findAll = async (req, res, next) => {
        try {
            const providers = await this.repository.findAll();
            res.json(providers);
        } catch (err) {
            next(err);
        }
    };

    update = async (req, res, next) => {
        try {
            const provider = await this.repository.update(req.params.id, req.body);
            if (!provider) throw customErrors.providerNotFound;
            res.json(provider);
        } catch (err) {
            next(err);
        }
    };

    delete = async (req, res, next) => {
        try {
            const provider= await this.repository.delete(req.params.id);
            if (!provider) throw customErrors.providerNotFound;
            res.status(204);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new ProviderController(new ProviderRepository());
