const { Model } = require("sequelize")

class PropertyValues extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            value: {
                type: DataTypes.STRING
            }
        },
            {
                sequelize,
                timestamps: false,
                indexes: [
                    {
                        unique: true,
                        fields: ['value']
                    }
                ]
            }
        )
    }
}

module.exports = PropertyValues