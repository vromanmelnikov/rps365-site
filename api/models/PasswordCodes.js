const { Model } = require("sequelize");

class PasswordCodes extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

module.exports = PasswordCodes