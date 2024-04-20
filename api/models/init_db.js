const { DataTypes } = require("sequelize")
const Items = require("./Items")
const ItemTypes = require("./ItemTypes")
const Tags = require("./Tags")
const Categories = require("./Categories")
const StaticImages = require("./StaticImages")
const TypeImages = require("./TypeImages")
const ItemsTags = require("./ItemsTags")
const PropertyNames = require("./PropertyNames")
const PropertyValues = require("./PropertyValues")
const Properties = require("./Properties")
const ItemsProperties = require("./ItemsProperties")

function initModels(sequelize) {

    //основные модели
    Items.init(sequelize, DataTypes)
    ItemTypes.init(sequelize, DataTypes)
    TypeImages.init(sequelize, DataTypes)
    Tags.init(sequelize, DataTypes)
    Categories.init(sequelize, DataTypes)
    StaticImages.init(sequelize, DataTypes)
    PropertyNames.init(sequelize, DataTypes)
    PropertyValues.init(sequelize, DataTypes)

    //свойства
    Properties.init(sequelize, DataTypes)
    PropertyNames.belongsToMany(PropertyValues, {through: Properties})
    PropertyValues.belongsToMany(PropertyNames, {through: Properties})

    //свойства товаров
    ItemsProperties.init(sequelize, DataTypes)
    Items.belongsToMany(Properties, { through: ItemsProperties, as: 'properties' })
    Properties.belongsToMany(Items, { through: ItemsProperties, as: 'items' })

    Items.hasMany(ItemTypes, { onDelete: 'cascade', as: 'types' })
    ItemTypes.belongsTo(Items)

    ItemTypes.hasMany(TypeImages, { onDelete: 'cascade', as: 'images' })
    TypeImages.belongsTo(ItemTypes)

    Categories.hasMany(Items, { foreignKey: 'categoryId' })
    Items.belongsTo(Categories, { as: 'category' })

    ItemsTags.init(sequelize, DataTypes)
    Items.belongsToMany(Tags, { through: ItemsTags, as: 'tags' })
    Tags.belongsToMany(Items, { through: ItemsTags, as: 'items' })

}

module.exports = initModels