const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  title: {
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
})

const galleryModel = mongoose.model('gallery', gallerySchema)

module.exports = galleryModel