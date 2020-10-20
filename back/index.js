const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')
const express = require('express')

const router = require('./app/router')

const PORT = process.env.PORT || 5050
const JEDI_USERNAME = process.env.JEDI_USERNAME
const HASH_PASSWORD = process.env.HASH_PASSWORD

const app = express()

// Middleware
app.use(express.json())
app.use(cors('*'))

// Router
app.use(router)

app.listen(PORT, () => {
  if (process.argv[2] === JEDI_USERNAME && bcrypt.compareSync(process.argv[3], HASH_PASSWORD)) {
    console.log(`Welcome ${process.argv[2]}.`)
    console.log(`Listening on ${PORT}...`)
  } else if (process.argv[2] === JEDI_USERNAME) {
    console.log(`Sorry ${process.argv[2]} : You entered an incorrect password. Try again or contact the rebellion if necessary.`)
    process.exit()
  } else {
    console.log(`Sorry ${process.argv[2]} : You are not registered in the rebellion database. For safety reasons, the rebellion denies you the right of access. Goodbye.`)
    process.exit()
  }
});