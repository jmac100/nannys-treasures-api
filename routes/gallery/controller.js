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
  }
}