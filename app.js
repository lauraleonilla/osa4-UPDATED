const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
  })

app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app