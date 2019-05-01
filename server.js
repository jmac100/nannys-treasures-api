require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.MONGO_URI, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('An error has occured', err))

const memberRouter = require('./routes/member')
const poemRouter = require('./routes/poems')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ msg: "Hey there, what do you want?" })
})

app.use('/member', memberRouter)
app.use('/poems', poemRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server started on Port ${PORT}`))