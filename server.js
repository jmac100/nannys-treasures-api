require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('An error has occured', err))

const memberRouter = require('./routes/member')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ msg: "Hey there, where are you trying to go?" })
})

app.use('/member', memberRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server started on Port ${PORT}`))