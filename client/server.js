// Init Express Application
const express = require('express')
const app = express()

// For redirect http to https
const enforce = require('express-sslify')
app.use(enforce.HTTPS({ trustProtoHeader: true }))

// For Cors headers
const cors = require('cors')
app.use(cors())

// For Gzip compression
const compression = require('compression')
app.use(compression())

// For static files
const oneDay = 86400000
app.use(express.static(__dirname + '/build', { maxAge: oneDay }))

// For all routes, SPA redirection
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

// Launch server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Emendare client running on port ${port}`))
