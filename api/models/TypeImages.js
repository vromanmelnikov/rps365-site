const { Model } = require("sequelize")

class TypeImages extends Model {
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
            }
        },
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

module.exports = TypeImages