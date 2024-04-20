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