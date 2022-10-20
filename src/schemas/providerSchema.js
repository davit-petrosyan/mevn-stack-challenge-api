const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProviderSchema = new Schema(
        {
          name: {
            type: String,
            unique: true,
            required: true
          }
        }
);

module.exports = mongoose.model('Provider', ProviderSchema);