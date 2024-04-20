const { Model } = require("sequelize");

// const StaticImages = sequelize.define('static_images', {
//     url: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     type: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })

class StaticImages extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            url: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['sertificat', 'feedback', 'real_object']]
                }
            }
        },
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

module.exports = StaticImages