const { Schema, Mongo } = require('../init/db')

const config = {
  timestamps: true
}

const modelSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
}, config)

module.export = Mongo.model('User', modelSchema)
