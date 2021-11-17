const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

const start = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL)
    const listener = app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is listening on port ${listener.address().port}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
