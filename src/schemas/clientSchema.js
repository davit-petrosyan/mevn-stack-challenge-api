const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

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
