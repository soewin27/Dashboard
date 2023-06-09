'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Media.belongsTo(models.Post, { 
        foreignKey: 'mediableId', 
        as: 'MediaPost'
      });
      Media.belongsTo(models.Comment, { 
        foreignKey: 'mediableId', 
        as: 'MediaComment'
      });
    }
  }
  Media.init({
    mediableType: DataTypes.STRING,
    mediableId: DataTypes.INTEGER,
    fileType: DataTypes.STRING,
    fileName: DataTypes.STRING,
    fileSize: DataTypes.STRING,
    filePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};