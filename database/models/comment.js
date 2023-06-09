'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      Comment.belongsTo(models.User, { 
        foreignKey: 'commenterId', 
        as: 'Commenter'
      });

      // Post
      Comment.belongsTo(models.Post, { 
        foreignKey: 'commentableId', 
        as: 'Post'
      });

      // Media
      Comment.hasOne(models.Media, { 
        foreignKey: 'mediableId', 
        as: 'CommentMedia'
      });

      // Hierarchy
      Comment.hasMany(Comment, {
        as: 'replys',
        foreignKey: 'parentId',
        onDelete: 'cascade',
        hooks: true
      })

      Comment.belongsTo(Comment ,{
        as: 'parentComment',
        foreignKey: 'parentId',
        constraints: false
      })

    }
  }
  Comment.init({
    commentableType: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
    commenterId: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true
  });
  
  // Comment.isHierarchy();

  return Comment;
};