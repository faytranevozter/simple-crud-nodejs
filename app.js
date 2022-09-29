require('dotenv').config() // load dotenv

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT ?? 3000

app.use(bodyParser.json())

app.use('', require('./routes/base'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})