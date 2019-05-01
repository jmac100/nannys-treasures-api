const mongoose = require('mongoose')

const poemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const poemModel = mongoose.model('poem', poemSchema)

module.exports = poemModel