const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ClientSchema = new Schema(
        {
          name: {
            type: String,
            required: true
          },
          email: {
            type: String,
            unique: true,
            trim: true,
            required: true
          },
          phone: {
            type: String,
            required: true
          },
          providers: [
            {
              type: ObjectId,
              uniqueItems: true,
              ref: 'Provider'
            }
          ]
        }
);

module.exports = mongoose.model('Client', ClientSchema);
