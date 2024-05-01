const express = require("express");
const StaticImages = require("../models/StaticImages");

const imageRoute = express.Router();

imageRoute.get("/", async (req, res) => {
    let type = [];

    if (Array.isArray(req.query.type) === true) {
        type = req.query.type;
    } else if (req.query.type === undefined) type = null;
    else {
        type = [req.query.type];
    }

    let options = {};

    if (type !== null) {
        options.where = {
            type,
        };
    }

    let items = await StaticImages.findAll(options);

    res.json(items).status(200).end();
});

imageRoute.put("/", async (req, res) => {
    const data = req.body;
    const images = data.images;

    for (let image of images) {
        await StaticImages.update(
            { queueNumber: image.queueNumber },
            { where: { id: image.id } }
        );
    }

    res.status(200).end();
});

imageRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const resultCode = await StaticImages.destroy({
        where: {
            id,
        },
    });

    if (resultCode === 0) {
        res.status(404).end();
    } else if (resultCode === 1) {
        res.status(200).end();
    }
});

imageRoute.post("/", async (req, res) => {
    const data = req.body;
    const type = data.type;

    try {
        let queueNumber = await StaticImages.max("queueNumber", {
            where: { type },
        });
        queueNumber += 1;

        const image = await StaticImages.create({
            type,
            url: data.url,
            queueNumber,
        });

        res.json(image).status(200).end();
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

module.exports = imageRoute;
