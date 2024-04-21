const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

require('./models/load_db')

const itemsRoute = require('./routes/itemsRoute')
const imageRoute = require('./routes/imagesRoute')
const staticRoute = require('./routes/staticRoute')
const mailRoute = require('./routes/mailRoute')

const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(cors())

app.use('/items', itemsRoute)
app.use('/images', imageRoute)
app.use('/static', staticRoute)
app.use('/mail', mailRoute)

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
})