const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const router = require('./app/router')
const cors = require('cors')

const PORT = process.env.PORT || 5050
const app = express()

// Middleware
app.use(express.json())
app.use(cors('*'))

// Router
app.use(router)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`)
});