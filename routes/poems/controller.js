const model = require('./model')
const jwt = require('jsonwebtoken')
const memberModel = require('../member/model')

module.exports = {
  retrieve: async (req, res) => {
    try {
      const poems = await model.find()
      res.status(200).send({ poems })
    } catch (error) {
      res.send({ error })
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
        poem.comments.push(comment)
        await new model(poem).save()
        res.status(200).send({ poem })
      } else {
        res.status(404).send({ msg: 'poem not found' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}