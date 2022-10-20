const customErrors = require('../utils/customErrors');
const ClientRepository = require("../repositories/clientRepository");

class ClientController  {

    constructor(repository) {
        this.repository = repository;
    }

    create = async (req, res, next) => {
        try {
            const client = await this.repository.create(req.body);
            res.status(201).json(client);
        } catch (err) {
            next(err);
        }
    };

    find = async (req, res, next) => {
        try {
            const client = await this.repository.find(req.params.id);
            res.json(client);
        } catch (err) {
            next(err);
        }
    };

    findAll = async (req, res, next) => {
        try {
            const clients = await this.repository.findAll();
            res.json(clients);
        } catch (err) {
            next(err);
        }
    };

    update = async (req, res, next) => {
        try {
            const client = await this.repository.update(req.params.id,req.body);
            res.json(client);
        } catch (err) {
            next(err);
        }
    };


    delete = async (req, res, next) => {
        try {
            const client= await this.repository.delete(req.params.id);
            if (!client) throw customErrors.clientNotFound;
            res.status(204).json({success: true});
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new ClientController(new ClientRepository());
