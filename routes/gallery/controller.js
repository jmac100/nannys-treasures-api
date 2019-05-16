const model = require('./model')
const jwt = require('jsonwebtoken')
const memberModel = require('../member/model')

module.exports = {
  create: async (req, res) => {
    try {
      const { gallery, auth_token } = req.body
      if (!auth_token) {
        return res.status(200).send({ auth: false, msg: 'Missing Token' })
      }

      const decodedToken = jwt.decode(auth_token)
      if (!decodedToken) {
        return res.send({ auth: false, msg: 'Invalid Token' })
      }

      const member_id = decodedToken.id
      const member = await memberModel.findById(member_id)
      if (!member) {
        return res.send({ success: false, msg: 'Member not found' })
      }

      const newGallery = await new model(gallery).save()
      res.status(200).send({ newGallery })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },
  retrieve: async (req, res) => {
    try {
      const gallery = await model.find().sort('created')
      res.status(200).send({ gallery })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const { gallery, auth_token } = req.body
      const id = req.params.id
      
      if (!auth_token) {
        return res.status(200).send({ auth: false, msg: 'Missing Token' })
      }

      const decodedToken = jwt.decode(auth_token)
      if (!decodedToken) {
        return res.send({ auth: false, msg: 'Invalid Token' })
      }

      const member_id = decodedToken.id
      const member = await memberModel.findById(member_id)
      if (!member) {
        return res.send({ success: false, msg: 'Member not found' })
      }

      const updatedModel = await model.findByIdAndUpdate(id, gallery, { new: true })
      res.status(200).send({ updatedModel })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },
  addComment: async(req, res) => {
    try {
      const { comment, auth_token } = req.body
      if (!auth_token) {
        return res.status(200).send({ auth: false, msg: 'Missing Token' })
      }

      const decodedToken = jwt.decode(auth_token)
      if (!decodedToken) {
        return res.send({ auth: false, msg: 'Invalid Token' })
      }

      const member_id = decodedToken.id
      const member = await memberModel.findById(member_id)
      if (!member) {
        return res.send({ success: false, msg: 'Member not found' })
      }

      const galleryId = req.params.id
      const gallery = await model.findById(galleryId)

      if (gallery) {
        comment.member_id = member._id
        gallery.comments.push(comment)
        await new model(gallery).save()
        res.status(200).send({ gallery })
      } else {
        res.status(404).send({ msg: 'poem not found' })
      }
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },
  removeComment: async(req, res) => {
    try {
      const { auth_token } = req.body
      if (!auth_token) {
        return res.status(200).send({ auth: false, msg: 'Missing Token' })
      }

      const decodedToken = jwt.decode(auth_token)
      if (!decodedToken) {
        return res.send({ auth: false, msg: 'Invalid Token' })
      }

      const member_id = decodedToken.id
      const member = await memberModel.findById(member_id)
      if (!member) {
        return res.send({ success: false, msg: 'Member not found' })
      }

      const gallery_id = req.params.gallery_id
      const id = req.params.id

      await model.findOneAndUpdate({ _id: gallery_id }, { $pull: { comments: { _id: id, member_id: member._id } } })
      res.status(200).send({ msg: `Comment ${id} successfully deleted` })

    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }
}