/**
 *
 * @class ProviderRepository
 */
const Repository = require("./repository.model");
const providerSchema = require('../schemas/providerSchema');
const customErrors = require("../utils/customErrors");

module.exports = class ProviderRepository extends Repository{

    async find(id) {
        const provider = await providerSchema
            .findById(id)
            .lean();
        if (!provider) throw customErrors.providerNotFound;
        return provider;
    }

    async findAll() {
        const providers = await providerSchema
            .find()
            .lean();
        if (!providers.length) return [];
        return providers;
    }

    async create(data) {
        return providerSchema.create(data);
    }

    async update(id,data) {
        const provider = await providerSchema
            .findByIdAndUpdate(
                id,
                data,
                {new: true}
            )
            .lean();
        if (!provider) throw customErrors.providerNotFound;

        return provider;
    }

    async delete(id) {
        return providerSchema.findByIdAndDelete(id);
    }
}