express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const cors = require('cors')

app = express()

mongoose.connect(config.MONGOURL)

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/api/blogs',notesRouter)  
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app