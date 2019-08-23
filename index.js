const express = require('express')
const app = express()
const http = require('http')
const passport = require('passport')
const mongoose = require('mongoose')
require('dotenv').config()
require('./utils/passportConfig')(passport)
const authRoutes = require('./routes/authRoutes')

// Connection to mongoDB database
const {
    DB_USER,
    DB_PWD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env

mongoose.connect(`mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { useNewUrlParser: true }
)
    .then(connection => {
        console.log(`Connected to ${connection.connections[0].name} database`)
    })
    .catch(error => {
        console.log(`Error connecting to database ${error}`)
    })

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(passport.initialize())

app.use('/', authRoutes)

const server = http.createServer(app)
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})
