const { Model } = require("sequelize");
const Items = require("./Items");
const Tags = require("./Tags");

class ItemsTags extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            // ItemId: {
            //     type: DataTypes.INTEGER,
            //     references: {
            //         model: Items, // 'Movies' would also work
            //         key: 'id',
            //     },
            // },
            // TagId: {
            //     type: DataTypes.INTEGER,
            //     references: {
            //         model: Tags, // 'Movies' would also work
            //         key: 'id',
            //     },
            // },
        },
            {
                sequelize,
                timestamps: false,
            }
        )
    }
}

module.exports = ItemsTags