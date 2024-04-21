const { Router } = require('express')

const nodemailer = require("nodemailer");
const { MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASSWORD, MAIL_NAME } = require('../enviroment/enviroments.dev');
const { createCartMail, createRequestMail } = require('../services/mail.service');

const transporter = nodemailer.createTransport({
    host: "smtp.beget.com",
    port: MAIL_PORT,
    secure: MAIL_SECURE, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    },
});

const mailRoute = Router()

mailRoute.post('/', async (req, res) => {

    const data = req.body

    const html = createRequestMail(data.name, data.number, data.request, data.email)

    try {
        const info = await transporter.sendMail({
            from: `${MAIL_NAME} ${MAIL_USER}`,
            to: 'vromanmelnikov@yandex.ru', // list of  receivers
            subject: "Заявка на консультацию", // Subject line
            // text: "Hello world?", // plain text body
            html, // html body
        });
        res.send(info).status(200).end()
    }
    catch (err) {
        console.log(err)
        res.status(500).end()
    }
})

mailRoute.post('/cart', async (req, res) => {

    const data = req.body

    const html = createCartMail(data.items, {name: data.user.name, number: data.user.number}, data.cost)

    try {
        const info = await transporter.sendMail({
            from: `${MAIL_NAME} ${MAIL_USER}`,
            to: 'vromanmelnikov@yandex.ru', // list of receivers
            subject: "Заявка на покупку товара", // Subject line
            // text: "Hello world?", // plain text body
            html, // html body
        });
        res.send(html).status(200).end()
    }
    catch (err) {
        console.log(err)
        res.status(500).end()
    }
})


module.exports = mailRoute