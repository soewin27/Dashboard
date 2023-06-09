'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostSticker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      PostSticker.belongsTo(models.User, { 
        foreignKey: 'sentBy', 
        as: 'SentBy'
      });
    }
  }
  PostSticker.init({
    sentBy: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    stickerId: DataTypes.INTEGER,
    stickerCode: DataTypes.STRING,
    stickerUrl: DataTypes.TEXT,
    stickerAmount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostSticker',
    paranoid: true
  });
  return PostSticker;
};