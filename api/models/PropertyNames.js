const { Model } = require("sequelize")

class PropertyNames extends Model {
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
                }
            },
            {
                sequelize,
                timestamps: false,
                indexes: [
                    {
                        unique: true,
                        fields: ['name']
                    }
                ]
            }
        )
    }
}

module.exports = PropertyNames