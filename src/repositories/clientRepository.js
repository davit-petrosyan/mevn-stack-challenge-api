/**
 *
 * @class ClientRepository
 */
const Repository= require("./repository.model");
const customErrors = require("../utils/customErrors");
const ObjectId = require('mongoose').Types.ObjectId;
const clientSchema = require('../schemas/clientSchema');

module.exports =  class ClientRepository extends Repository{

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

        if (!clients.length) return [];
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
        return clientSchema.findByIdAndDelete(id);
    }
}


