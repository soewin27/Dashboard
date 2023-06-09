'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init({
    userId: DataTypes.INTEGER,
    requestUrl: DataTypes.STRING,
    requestMethod: DataTypes.STRING,
    action: DataTypes.STRING,
    actionTo: DataTypes.STRING,
    actionToId: DataTypes.INTEGER,
    actionBy: DataTypes.STRING,
    actionById: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};