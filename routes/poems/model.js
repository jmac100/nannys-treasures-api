const mongoose = require('mongoose')

const poemSchema = mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  comments: [
    {
      user: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      replies: [
        {
          user: {
            type: String,
            required: true
          },
          text: {
            type: String,
            required: true
          },
          created: {
            type: String,
            required: true
          }
        }
      ],
      created: {
        type: String,
        default: Date.now()
      }
    }
  ]
})

const poemModel = mongoose.model('poem', poemSchema)

module.exports = poemModel