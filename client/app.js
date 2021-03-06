/* eslint-disable no-console */

// Init Express Application
const express = require('express')
const app = express()

// For redirect http to https in production
if (process.env.NODE_ENV === 'production') {
  const enforce = require('express-sslify')
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

// For Cors headers
const cors = require('cors')
app.use(cors())

// For Gzip compression
const compression = require('compression')
app.use(compression())

// For static files
const oneWeek = 604800000
const maxAge = process.env.NODE_ENV === 'production' ? oneWeek : 0
app.use(express.static(__dirname + '/build', { maxAge }))

// For all routes, SPA redirection
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

// Launch server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Emendare client running on port ${port}`))
