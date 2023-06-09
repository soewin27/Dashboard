'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class React extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Post
      React.belongsTo(models.Post, { 
        foreignKey: 'reactableId', 
        as: 'Post'
      });

      // User
      React.belongsTo(models.User, { 
        foreignKey: 'reacterId', 
        as: 'Reacter'
      });

    }
  }
  React.init({
    reactableType: DataTypes.STRING,
    reactableId: DataTypes.INTEGER,
    reacterId: DataTypes.INTEGER,
    react: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'React',
  });
  return React;
};