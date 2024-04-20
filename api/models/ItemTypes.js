const { Model } = require("sequelize");

// const ItemTypes = sequelize.define('item_types', {
//     title: {
//         type: DataTypes.STRING
//     },
//     description: {
//         type: DataTypes.STRING
//     },
//     cost: {
//         type: DataTypes.INTEGER
//     },
//     itemType: {
//         type: DataTypes.STRING
//     },
// })

class ItemTypes extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            cost: {
                type: DataTypes.INTEGER
            },
            itemType: {
                type: DataTypes.STRING
            },
        },
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

module.exports = ItemTypes