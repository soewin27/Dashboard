'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImsTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImsTransaction.init({
    transactionType: DataTypes.STRING,
    transactionId: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    stickerId: DataTypes.INTEGER,
    stickerCode: DataTypes.STRING,
    stickerUrl: DataTypes.TEXT,
    accountFrom: DataTypes.STRING,
    accountTo: DataTypes.STRING,
    iceAmount: DataTypes.DOUBLE,
    commissionTotal: DataTypes.DOUBLE,
    commissionAmount: DataTypes.INTEGER,
    commissionType: DataTypes.STRING,
    description: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    sentBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ImsTransaction',
  });
  return ImsTransaction;
};