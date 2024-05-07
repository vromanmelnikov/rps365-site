const { Router } = require("express");

const nodemailer = require("nodemailer");
const {
    MAIL_PORT,
    MAIL_SECURE,
    MAIL_USER,
    MAIL_PASSWORD,
    MAIL_NAME,
} = require("../enviroment/enviroments.dev");
const {
    createCartMail,
    createRequestMail,
    createCodeMail,
} = require("../services/mail.service");
const Users = require("../models/Users");
const PasswordCodes = require("../models/PasswordCodes");

const transporter = nodemailer.createTransport({
    host: "smtp.beget.com",
    port: MAIL_PORT,
    secure: MAIL_SECURE, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    },
});

const mailRoute = Router();

mailRoute.post("/", async (req, res) => {
    const data = req.body;

    const html = createRequestMail(
        data.name,
        data.number,
        data.request,
        data.email
    );

    try {
        const info = await transporter.sendMail({
            from: `${MAIL_NAME} ${MAIL_USER}`,
            to: "vromanmelnikov@yandex.ru", // list of  receivers
            subject: "Заявка на консультацию", // Subject line
            // text: "Hello world?", // plain text body
            html, // html body
        });
        res.send(info).status(200).end();
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

mailRoute.post("/cart", async (req, res) => {
    const data = req.body;

    const html = createCartMail(
        data.items,
        { name: data.user.name, number: data.user.number },
        data.cost
    );

    try {
        const info = await transporter.sendMail({
            from: `${MAIL_NAME} ${MAIL_USER}`,
            to: "vromanmelnikov@yandex.ru", // list of receivers
            subject: "Заявка на покупку товара", // Subject line
            // text: "Hello world?", // plain text body
            html, // html body
        });
        res.send(html).status(200).end();
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getDigitalCode(length) {
    let code = "";

    for (let i = 0; i < length; i++) {
        code += getRandomInt(9);
    }

    return code;
}

mailRoute.get("/code", async (req, res) => {
    const email = req.query.email;

    const user = await Users.findOne({ where: { email } });

    // console.log(user)

    if (user === null) {
        res.status(404).send('Не правильная почта').end();
    } else {

        const code = getDigitalCode(6);

        await PasswordCodes.destroy({where: {email}})
        await PasswordCodes.create({email, code})

        const html = createCodeMail(email, code);

        try {
            const info = await transporter.sendMail({
                from: `${MAIL_NAME} ${MAIL_USER}`,
                to: email, // list of receivers
                subject: "Заявка на восстановление пароля", // Subject line
                // text: "Hello world?", // plain text body
                html, // html body
            });
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(500).end();
        }
    }
});

module.exports = mailRoute;
