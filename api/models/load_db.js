const { Sequelize, DataTypes } = require('sequelize');
const initModels = require('./init_db');
const fs = require('fs');
const Categories = require('./Categories');
const Tags = require('./Tags');
const StaticImages = require('./StaticImages');

const logStream = fs.createWriteStream('./sql.log', { 'flags': 'a' });

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sql',
    logging: msg => logStream.write(msg + '\n')
});

// db.dropAllSchemas()

initModels(db);

async function loadCategories() {
    await Categories.sync({ force: true })
    // await Categories
    return Categories.bulkCreate([
        {
            name: 'rubber',
            rusName: 'Резина'
        },
        {
            name: 'plastic',
            rusName: 'Пластик'
        },
        {
            name: 'steel',
            rusName: 'Сталь'
        },
    ])
}

async function loadTags() {
    await Tags.sync({ force: true })
    await Tags.bulkCreate([
        {
            name: 'Для бетона/фундамента'
        },
        {
            name: 'Для фанеры/дерева'
        },
        {
            name: 'Для металла'
        },
    ])
}

async function loadStaticImages() {
    await StaticImages.sync({ force: true })
    await StaticImages.bulkCreate([
        {
            "url": "sertificat_1.jpg",
            type: 'sertificat',
            queueNumber: 0
        },
        {
            "url": "sertificat_2.jpg",
            type: 'sertificat',
            queueNumber: 1
        },
        {
            "url": "sertificat_3.jpg",
            type: 'sertificat',
            queueNumber: 2
        },
        {
            "url": "sertificat_4.jpg",
            type: 'sertificat',
            queueNumber: 3
        },
        {
            "url": "sertificat_5.jpg",
            type: 'sertificat',
            queueNumber: 4
        },
        {
            "url": "feedback_1.jpg",
            type: 'feedback',
            queueNumber: 0
        },
        {
            "url": "feedback_2.jpg",
            type: 'feedback',
            queueNumber: 1
        },
        {
            "url": "feedback_3.jpg",
            type: 'feedback',
            queueNumber: 2
        },
        {
            "url": "feedback_4.jpg",
            type: 'feedback',
            queueNumber: 3
        },
        {
            "url": "feedback_5.jpg",
            type: 'feedback',
            queueNumber: 4
        },
        {
            "url": "real_object_1.jpg",
            type: 'real_object',
            queueNumber: 0
        },
        {
            "url": "real_object_2.jpg",
            type: 'real_object',
            queueNumber: 1
        },
        {
            "url": "real_object_3.jpg",
            type: 'real_object',
            queueNumber: 2
        },
        {
            "url": "real_object_4.jpg",
            type: 'real_object',
            queueNumber: 3
        },
        {
            "url": "real_object_5.jpg",
            type: 'real_object',
            queueNumber: 4
        },
        {
            "url": "real_object_6.jpg",
            type: 'real_object',
            queueNumber: 5
        },
        {
            "url": "real_object_7.jpg",
            type: 'real_object',
            queueNumber: 6
        },
        {
            "url": "real_object_8.jpg",
            type: 'real_object',
            queueNumber: 7
        },
        {
            "url": "real_object_9.jpg",
            type: 'real_object',
            queueNumber: 8
        },
        {
            "url": "real_object_10.jpg",
            type: 'real_object',
            queueNumber: 9
        },
        {
            "url": "real_object_11.jpg",
            type: 'real_object',
            queueNumber: 10
        },
        {
            "url": "real_object_12.jpg",
            type: 'real_object',
            queueNumber: 11
        },
        {
            "url": "real_object_13.jpg",
            type: 'real_object',
            queueNumber: 12
        },
        {
            "url": "real_object_14.jpg",
            type: 'real_object',
            queueNumber: 13
        },
        {
            "url": "real_object_15.jpg",
            type: 'real_object',
            queueNumber: 14
        },
        {
            "url": "real_object_16.jpg",
            type: 'real_object',
            queueNumber: 15
        }
    ])
}

(
    async function () {
        try {
            await db.authenticate();
            // await db.sync({force: true})    

            // await loadCategories() 
            // await loadTags()

            await loadStaticImages()

            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
)();

module.exports = db