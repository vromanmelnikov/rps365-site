const { Model } = require("sequelize")

class Properties extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            value: {
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

module.exports = Properties