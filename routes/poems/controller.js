const model = require('./model')
const jwt = require('jsonwebtoken')
const memberModel = require('../member/model')

module.exports = {
  create: async (req, res) => {
    try {
      const { poem, auth_token } = req.body
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

      await new model(poem).save()
      const poems = await model.find().sort('name')
      res.status(200).send({ poems })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },
  retrieve: async (req, res) => {
    try {
      const poems = await model.find().sort('name')
      res.status(200).send({ poems })
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

      const poemId = req.params.id
      const poem = await model.findById(poemId)

      if (poem) {
        comment.member_id = member._id
        poem.comments.push(comment)
        await new model(poem).save()
        res.status(200).send({ poem })
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

      const poem_id = req.params.poem_id
      const id = req.params.id

      await model.findOneAndUpdate({ _id: poem_id }, { $pull: { comments: { _id: id, member_id: member._id } } })
      res.status(200).send({ msg: `Comment ${id} successfully deleted` })

    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }
}