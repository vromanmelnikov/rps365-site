const express = require('express')
const StaticImages = require('../models/StaticImages')

const imageRoute = express.Router()

imageRoute.get('/', async (req, res) => {

    let type = []

    if (Array.isArray(req.query.type) === true) {
        type = req.query.type
    }
    else if (req.query.type === undefined)(
        type = null
    )
    else {
        type = [req.query.type]
    }

    let options = {}

    if (type !== null) {
        options.where = {
            type
        }
    }
    
    let items = await StaticImages.findAll(options)

    res.json(items).status(200).end()
})

module.exports = imageRoute