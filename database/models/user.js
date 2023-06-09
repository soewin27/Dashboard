"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.FriendRequest, { 
        foreignKey: 'requesterId', 
        as: 'RequestedList'
      });
      User.hasMany(models.FriendRequest, { 
        foreignKey: 'recipientId', 
        as: 'ReceivedList'
      });
      User.hasMany(models.Friend, { 
        foreignKey: 'friendId', 
        as: 'FriendList'
      });

      // Post
      User.hasMany(models.Post, { 
        foreignKey: 'postBy', 
        as: 'PostList'
      });
      
      // Profile
      User.hasOne(models.UserProfile, { 
        foreignKey: 'userId', 
        as: 'Profile'
      });
    }
  }
  User.init(
    {
      accountId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      firstName: { 
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: { 
        type: DataTypes.STRING,
        allowNull: true,
      },
      nickName: { 
        type: DataTypes.STRING,
        allowNull: true,
      },
      uniqueName: { 
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: { 
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountStatus: { 
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'ACTIVATE'
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deviceToken: {
        type: DataTypes.TEXT,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
