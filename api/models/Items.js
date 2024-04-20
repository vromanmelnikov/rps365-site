const { Model } = require("sequelize");

// const Items = sequelize.define('items', {
//     title: {
//         type: DataTypes.STRING
//     },
//     subtitle: {
//         type: DataTypes.STRING
//     },
//     categoryID: {
//         type: DataTypes.INTEGER
//     },
//     popular: {
//         type: DataTypes.BOOLEAN
//     }
// })

class Items extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING
            },
            subtitle: {
                type: DataTypes.STRING
            },
            popular: {
                type: DataTypes.BOOLEAN
            },
        },
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

module.exports = Items