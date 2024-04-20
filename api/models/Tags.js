const { Model } = require("sequelize");

// const Tags = sequelize.define('tags', {
//     name: {
//         type: DataTypes.STRING
//     }
// })

class Tags extends Model {
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
            }
        },
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

module.exports = Tags