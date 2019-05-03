require('dotenv').config()

const jwt = require('jsonwebtoken')
const model = require('./model')

module.exports = {
  register: async (req, res) => {
    let newMember = new model({
      displayname: req.body.displayname,
      email: req.body.email,
      password: req.body.password
    })

    try {
      const result = await newMember.save()
      let token = jwt.sign({ id: result._id }, process.env.SECRET, { expiresIn: 86400 })
      res.status(200).send({ auth: true, token })
    } catch (error) {
      if (error.code === 11000) {
        return res.send({ auth: false, msg: 'Email already exists' })
      }
      res.send({ auth: false, msg: 'An internal server error has occured' })
    }
  },
  login: (req, res) => {
    model.findOne({ email: req.body.email }, (err, member) => {
      if (err) throw err

      if (!member) {
        return res.send({ auth: false, msg: 'Login Failed' })
      }

      member.comparePasswords(req.body.password, (err, isMatch) => {
        if (err) throw err

        if (isMatch) {
          let token = jwt.sign({ id: member._id }, process.env.SECRET, { expiresIn: 86400 })
          res.status(200).send({ auth: true, token })
        } else {
          res.status(200).send({ auth: false, msg: 'Login Failed' })
        }
      })
    })
  },
  profile: async (req, res) => {
    const { auth_token } = req.body
    if (!auth_token) {
      return res.status(200).send({ auth: false, msg: 'Missing Token' })
    }

    const decodedToken = jwt.decode(req.body.auth_token)
    if (!decodedToken) {
      return res.send({ auth: false, msg: 'Invalid Token' })
    }
    
    const member_id = decodedToken.id
    try {
      const member = await model.findById(member_id)
      if (!member) {
        res.send({ success: false, msg: 'Member not found' })
      }
      const { _id, displayname, email } = member
      res.send({
        success: true,
        profile: {
          _id,
          displayname,
          email
        }
      })
    } catch (error) {
      res.send({ success: false, error: error.message })
    }
  }
}