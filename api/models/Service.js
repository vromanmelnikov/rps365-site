const { Model } = require("sequelize");

class Services extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                cost: {
                    type: DataTypes.INTEGER
                },
                description: {
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

module.exports = Services