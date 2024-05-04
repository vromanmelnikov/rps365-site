const { Model } = require("sequelize");

class TypeImages extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                url: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                hooks: {
                    beforeBulkDestroy: async (image) => {

                        try {
                            const urls = (
                                await this.findAll({
                                    where: { id: image.where.id },
                                })
                            ).map((image) => image.toJSON().url);
    
                            for (let url of urls) {
                                const requestOptions = {
                                    method: "DELETE",
                                    redirect: "follow",
                                };
    
                                await fetch(
                                    `http://localhost:8080/static?url=${url}`,
                                    requestOptions
                                )
                            }
                        } catch (err) {
                            console.log('image delete error', err)
                        }

                        
                    },
                },
            }
        );
    }
}

module.exports = TypeImages;
