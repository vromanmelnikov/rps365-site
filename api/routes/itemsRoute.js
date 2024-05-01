const express = require("express");
const Items = require("../models/Items");
const ItemTypes = require("../models/ItemTypes");
const TypeImages = require("../models/TypeImages");
const ItemsTags = require("../models/ItemsTags");
const Tags = require("../models/Tags");
const PropertyValues = require("../models/PropertyValues");
const PropertyNames = require("../models/PropertyNames");
const Properties = require("../models/Properties");
const ItemsProperties = require("../models/ItemsProperties");
const Categories = require("../models/Categories");

const itemsRoute = express.Router();

const itemsOptions = {
    include: [
        {
            model: ItemTypes,
            as: "types",
            include: {
                model: TypeImages,
                as: "images",
                attributes: {
                    exclude: ["ItemTypeId"],
                },
            },
            attributes: {
                exclude: ["ItemId"],
            },
        },
        {
            association: "category",
            // as: 'category',
            // model: Categories,
        },
        {
            association: "tags",
            through: {
                attributes: [],
            },
        },
        {
            model: Properties,
            as: "properties",
            attributes: {
                exclude: ["itemId"],
            },
        },
    ],
    attributes: {
        exclude: ["categoryId"],
    },
};

async function getItemProperties(item) {
    let newProperties = {};
    const properties = item.properties;
    for (let j = 0; j < properties.length; j++) {
        const property = (
            await Properties.findOne({
                where: {
                    id: properties[j].id,
                },
            })
        ).toJSON();

        const name = (
            await PropertyNames.findOne({
                where: { id: property.PropertyNameId },
            })
        ).toJSON().name;
        const value = (
            await PropertyValues.findOne({
                where: { id: property.PropertyValueId },
            })
        ).toJSON().value;

        newProperties[name] = value;
    }

    return newProperties;
}

itemsRoute.get("/", async (req, res) => {
    const query = req.query;

    let where = {};

    if (query.popular) {
        where.popular = query.popular === "true" ? true : false;
    }

    let items = await Items.findAll({ ...itemsOptions, where });

    items = items.map((item) => item.toJSON());
    const costRange = {
        min: [],
        max: [],
    };

    for (let i = 0; i < items.length; i++) {
        // items[i].properties = await getItemProperties(items[i])

        const typesCosts = items[i].types.map((type) => type.cost);
        const min = Math.min(...typesCosts);
        const max = Math.max(...typesCosts);
        items[i].typesCosts = {
            min,
            max,
        };
        costRange.min.push(min);
        costRange.max.push(max);
    }

    const result = {
        items,
        costRange: {
            min: items.length === 0 ? 0 : Math.min(...costRange.min),
            max: items.length === 0 ? 0 : Math.max(...costRange.max),
        },
    };

    res.status(200).json(result).end();
});

itemsRoute.get("/categories", async (req, res) => {
    let categories = (await Categories.findAll()).map((category) =>
        category.toJSON()
    );

    // categories = Object.fromEntries(categories)

    let result = {};

    for (let category of categories) {
        // console.log(category)
        const items = (
            await Items.findAll({
                include: [
                    {
                        model: ItemTypes,
                        as: "types",
                    },
                ],
                where: {
                    categoryId: category.id,
                },
                attributes: {
                    exclude: ["categoryId"],
                },
                limit: 3,
            })
        ).map((item) => item.toJSON());

        for (let i = 0; i < items.length; i++) {
            const typesCosts = items[i].types.map((type) => type.cost);
            const min = Math.min(...typesCosts);
            const max = Math.max(...typesCosts);
            items[i].typesCosts = {
                min,
                max,
            };
            delete items[i].types;
        }

        result[category.name] = items;
    }

    res.status(200).json(result).end();
});

itemsRoute.get("/properties", async (req, res) => {
    try {
        let properties = (await Properties.findAll()).map((item) =>
            item.toJSON()
        );

        let names = [];
        let values = [];

        for (let i = 0; i < properties.length; i++) {
            const name = properties[i].name;
            const value = properties[i].value;

            if (names.includes(name) === false) {
                names.push(name);
            }

            if (values.includes(value) === false) {
                values.push(value);
            }
        }

        res.json({ names, values }).status(200);

        // res.json(properties).status(200)
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

itemsRoute.get("/types", async (req, res) => {
    const items = await ItemTypes.findAll();

    res.json(items).status(200);
});

itemsRoute.get("/tags/:id", async (req, res) => {
    const ItemId = req.params.id;

    const tags = await ItemsTags.findAll({
        where: { ItemId },
    });

    res.json(tags).end();
});

itemsRoute.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let item = (
            await Items.findOne({ ...itemsOptions, where: { id } })
        ).toJSON();
        // item.properties = await getItemProperties(item)

        res.json(item).status(200).end();
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

itemsRoute.post("/", async (req, res) => {
    const data = req.body;

    const item = await Items.create(
        {
            title: data.title,
            subtitle: data.subtitle,
            popular: false,
            isService: data.isService,
            categoryId: data.categoryId,
        },
        {
            include: {
                association: "category",
            },
        }
    );

    let types = data.types;
    if (types) {
        for (let type of types) {
            const resType = await ItemTypes.create({
                ItemId: item.id,
                title: type.title,
                description: type.description,
                cost: type.cost,
                itemType: type.itemType,
            });

            if (type.images) {
                await TypeImages.bulkCreate(
                    type.images.map((image) => ({
                        ItemTypeId: resType.id,
                        url: image.url,
                    }))
                );
            }
        }
    }

    const tags = await Tags.findAll({
        where: {
            id: [...data.tags],
        },
    });
    await item.addTags(tags, { through: ItemsTags });

    let properties = data.properties.map((property) => {
        return {
            name: property.name,
            value: property.value,
            ItemId: item.id,
        };
    });

    await Properties.bulkCreate(properties);

    res.status(200).end();
});

itemsRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const resultCode = await Items.destroy({
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

itemsRoute.delete("/", async (req, res) => {
    await Items.destroy({
        where: {},
        truncate: true,
    });

    res.status(200).end();
});

itemsRoute.put("/:id", async (req, res) => {
    const id = req.params.id;

    const data = req.body;

    const result = await Items.update(
        {
            title: data.title,
            subtitle: data.subtitle,
            isService: data.isService,
            categoryId: data.categoryId,
        },
        {
            where: {
                id,
            },
        }
    );

    const item = await Items.findOne({
        where: {
            id: data.id,
        },
    });

    //change tags
    await item.setTags([]);
    const tags = await Tags.findAll({
        where: {
            id: [...data.tags],
        },
    });
    await item.addTags(tags, { through: ItemsTags });

    //change properties
    await item.setProperties([]);
    let properties = data.properties.map((property) => {
        return {
            name: property.name,
            value: property.value,
            ItemId: item.id,
        };
    });
    await Properties.bulkCreate(properties);

    //change types
    let types = data.types
        .filter((type) => type.id !== undefined)
        .map((type) => {
            return {
                // ItemId: item.id,
                title: type.title,
                description: type.description,
                cost: type.cost,
                itemType: type.itemType,
                id: type.id,
                images: type.images,
            };
        });

    for (let type of types) {
        await ItemTypes.update(type, { where: { id: type.id } });
        await TypeImages.destroy({ where: { ItemTypeId: type.id } });
        await TypeImages.bulkCreate(
            type.images.map((image) => ({
                ItemTypeId: type.id,
                url: image.url,
            }))
        );
    }

    //create new types
    types = data.types
        .filter((type) => type.id === undefined)
        .map((type) => {
            return {
                ItemId: item.id,
                title: type.title,
                description: type.description,
                cost: type.cost,
                itemType: type.itemType,
                images: type.images,
            };
        });

    for (let type of types) {
        const resType = await ItemTypes.create(type);
        if (type.images) {
            await TypeImages.bulkCreate(
                type.images.map((image) => ({
                    ItemTypeId: resType.id,
                    url: image.url,
                }))
            );
        }
    }

    // if (types.length !== 0) {
    //     await ItemTypes.bulkCreate(types);
    // }

    res.json(result).status(200).end();
});

itemsRoute.put("/types/:id", async (req, res) => {
    const id = req.params.id;

    const data = req.body;

    const result = await ItemTypes.update(
        {
            ...data,
        },
        {
            where: {
                id,
            },
        }
    );

    res.json(result).status(200).end();
});

itemsRoute.delete("/types/:id", async (req, res) => {
    const id = req.params.id;

    const resultCode = await ItemTypes.destroy({
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

itemsRoute.delete("/types/images/:id", async (req, res) => {
    const id = req.params.id;

    const resultCode = await TypeImages.destroy({
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

// itemsRoute.pu

module.exports = itemsRoute;
