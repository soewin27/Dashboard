'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Friend.belongsTo(models.User, { 
        foreignKey: 'friendId', 
        as: 'FriendInformation'
      });
    }
  }
  Friend.init({
    friendshipSince: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};