const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const memberSchema = mongoose.Schema({
  displayname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: Boolean
  },
  account_created: {
    type: String,
    default: Date.now()
  }
})

memberSchema.pre('save', function(next) {
  let member = this
  if (!member.isModified('password')) return next()

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(member.password, salt, function(err, hash) {
      if (err) return next(err)

      member.password = hash
      next()
    })
  })
})

memberSchema.methods.comparePasswords = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

const memberModel = mongoose.model('member', memberSchema)

module.exports = memberModel