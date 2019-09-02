const express = require('express')
const app = express()
const http = require('http')
const mongoose = require('mongoose')
const teamOrganizerMemberRouter = require('./routes/teamOrganizerMemberRouter')
const speakerRouter = require('./routes/speakerRouter')
const sponsorRouter = require('./routes/sponsorRouter')
require('dotenv').config()

// Connection to mongoDB database
const {
    DB_USER,
    DB_PWD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env

console.log(DB_HOST)

mongoose.connect(`mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { useNewUrlParser: true }
)
    .then(connection => {
        console.log(`Connected to ${connection.connections[0].name} database`)
    })
    .catch(error => {
        console.log(`Error connecting to database ${error}`)
    })
mongoose.set('useFindAndModify', false)
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use('/members', teamOrganizerMemberRouter)
app.use('/speakers', speakerRouter)
app.use('/sponsor', sponsorRouter)

const server = http.createServer(app)
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})
