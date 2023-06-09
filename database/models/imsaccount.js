'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImsAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // User Profile
      // ImsAccount.hasOne(models.UserProfile, { 
      //   foreignKey: 'userId',
      //   as: 'AccountProfile',
      //   sourceKey: 'userId'
      // });
    }
  }
  ImsAccount.init({
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    imsAccountId: DataTypes.STRING,
    imsAccountType: DataTypes.STRING,
    imsReferenceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ImsAccount',
  });
  return ImsAccount;
};