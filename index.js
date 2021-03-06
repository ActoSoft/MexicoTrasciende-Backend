const express = require('express')
const app = express()
const http = require('http')
const passport = require('passport')
const mongoose = require('mongoose')
const teamOrganizerMemberRouter = require('./routes/teamOrganizerMemberRouter')
const speakerRouter = require('./routes/speakerRouter')
const sponsorRouter = require('./routes/sponsorRouter')
const authRouter = require('./routes/authRoutes')
require('dotenv').config()
const upload = require('./utils/fileUpload')
const path = require('path')
require('./utils/passportConfig')(passport)
const cors = require('cors')
const userRouter = require('./routes/userRoutes')

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
app.use('/public', express.static(path.join(__dirname, './public')))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(passport.initialize())
app.use(upload)
app.use(cors())
app.use('/', authRouter)
app.use('/users',
    passport.authenticate('jwt', { session: false }),
    userRouter)
app.use('/members', teamOrganizerMemberRouter)
app.use('/speakers', speakerRouter)
app.use('/sponsors', sponsorRouter)

const server = http.createServer(app)
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})
