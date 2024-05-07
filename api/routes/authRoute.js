const express = require("express");
const Users = require("../models/Users");

const PasswordCodes = require("../models/PasswordCodes");

const authRoute = express.Router();

authRoute.get('/', async (req, res) => {

    const admin = {
        email: req.query.email,
        hashedPassword: req.query.password
    }

    const user = await Users.findOne({where: {email: admin.email}})

    if (user === null) {
        res.status(404).end()
    }
    else if (user.hashedPassword === admin.hashedPassword) {
        res.json(user.id).status(200).end()
    }
    else {
        res.status(401).end()
    }

})

authRoute.get('/code', async (req, res) => {

    const email = req.query.email
    const code = req.query.code

    const result = await PasswordCodes.findOne({where: {email}})

    if (result !== null) {
        if (result.code === code) {
            await PasswordCodes.destroy({where: {email}})
            res.status(200).end()
        }
        else {
            res.status(401).end()
        }
    }
    else {
        res.status(404).end()
    }

})

authRoute.post('/', async (req, res) => {
    const admin = {
        email: req.body.email,
        hashedPassword: req.body.password
    }

    const existedUser = await Users.findOne({where: {email: admin.email}})

    if (existedUser !== null) {
        res.status(400).end()
    }
    else {
        const user = await Users.create(admin)
        res.json(user.id).status(200).end()
    }
})

authRoute.put('/', async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const user = await Users.findOne({where: {email}})

    if (user === null) {
        res.status(404).end()
    }
    else {
        const result = await Users.update({hashedPassword: password}, {where: {id: user.id}})

        res.status(200).end()
    }

})

module.exports = authRoute