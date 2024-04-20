const express = require('express')
const Categories = require('../models/Categories')
const Tags = require('../models/Tags')

const staticRoute = express.Router()

staticRoute.get('/categories', async (req, res) => {

    const items = await Categories.findAll()

    res.json(items).status(200).end()
})

staticRoute.get('/tags', async (req, res) => {

    const items = await Tags.findAll()

    res.json(items).status(200).end()
})

staticRoute.post('/categories', async (req, res) => {

    const data = req.body

    await Categories.create({
        name: data.name,
        rusName: data.rusName
    })

    res.status(200).end()
})

staticRoute.post('/tags', async (req, res) => {

    const data = req.body

    await Tags.create({
        name: data.name
    })

    res.status(200).end()

})

module.exports = staticRoute