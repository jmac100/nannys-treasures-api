const mongoose = require('mongoose')

const poemSchema = mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  comments: [
    {
      member_id: {
        type: mongoose.Types.ObjectId,
        required: true
      },
      displayname: {
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