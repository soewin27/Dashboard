'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'UserInfo'
      })
    }
  }
  UserProfile.init({
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    region: { 
      type: DataTypes.NUMBER,
      allowNull: true
    },
    city: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    township: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    hometown: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    profileImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coverImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
    timestamps: true
  });
  return UserProfile;
};