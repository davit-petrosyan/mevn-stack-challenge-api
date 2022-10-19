/**
 * Base Class Repository.
 *
 * @class Repository
 */
module.exports = class Repository {

    constructor() {
        if (this.constructor == Repository) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    find() {
        throw new Error("Method 'find()' must be implemented.");
    }

    findAll() {
        throw new Error("Method 'findAll()' must be implemented.");
    }

    create() {
        throw new Error("Method 'create()' must be implemented.");
    }

    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    delete() {
        throw new Error("Method 'delete()' must be implemented.");
    }
}