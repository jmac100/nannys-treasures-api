require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const model = require('./routes/member/model')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('An error has occured', err))

// const memberRouter = require('./routes/member')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ msg: "Hey there, what do you want?" })
})

app.post('/member/register', async (req, res) => {
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
})

// app.use('/member', memberRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server started on Port ${PORT}`))