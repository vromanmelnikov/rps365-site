const { Model } = require("sequelize");

// const Categories = sequelize.define('categories', {
//     name: {
//         type: DataTypes.STRING
//     }
// })

class Categories extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            rusName: {
                type: DataTypes.STRING
            }
        },
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

module.exports = Categories