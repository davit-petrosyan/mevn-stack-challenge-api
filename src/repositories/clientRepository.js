/**
 *
 * @class ClientRepository
 */
const Repository= require("./repository.model");
const customErrors = require("../utils/customErrors");
const ObjectId = require('mongoose').Types.ObjectId;
const clientSchema = require('../schemas/clientSchema');

module.exports =  class ClientRepository extends Repository{

    constructor() {
        super();
    }

    async find(id) {
        const client = await clientSchema
            .findById(id)
            .populate('providers')
            .lean();

        if (!client) throw customErrors.clientNotFound;
        return client;
    }

    async findAll() {
        const clients = await clientSchema
            .find()
            .populate('providers')
            .lean();

        if (!clients) throw customErrors.clientNotFound;
        return clients;
    }

    async create(data) {
        return clientSchema
            .findOneAndUpdate({_id: ObjectId()}, data, {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
                populate: 'providers'
            })
            .lean();
    }

    async update(id,data) {
        const client = await clientSchema
            .findByIdAndUpdate(
                id,
                data,
                {new: true}
            )
            .populate('providers')
            .lean();

        if (!client) throw customErrors.clientNotFound;

        return client;
    }

    async delete(id) {
        try {
            const client = await clientSchema.findByIdAndDelete(id);
            if (!client) throw customErrors.clientNotFound;
           return {success: true};
        } catch (err) {
            throw err;
        }
    }
}


