'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FriendRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FriendRequest.belongsTo(models.User, { 
        foreignKey: 'requesterId', 
        as: 'Requester'
      });

      FriendRequest.belongsTo(models.User, { 
        foreignKey: 'recipientId', 
        as: 'Recipient'
      });
    }
  }
  FriendRequest.init({
    requestedSince: DataTypes.DATE,
    requesterId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    deletedAt: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FriendRequest',
  });
  return FriendRequest;
};