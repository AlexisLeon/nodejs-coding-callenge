const { Schema, Mongo } = require('../init/db');

const config = {
  timestamps: true,
};

const modelSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    default: Date.now,
  },
  scope: {
    type: String,
    required: true,
  },
}, config);

module.exports = Mongo.model('RefreshToken', modelSchema);
