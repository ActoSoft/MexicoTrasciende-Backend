const express = require('express')
const app = express()
const http = require('http')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

const server = http.createServer(app)
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})
