const { Model } = require("sequelize");

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
            isService: {
                type: DataTypes.BOOLEAN
            }
        },
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

module.exports = Items