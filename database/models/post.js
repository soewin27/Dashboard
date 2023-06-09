'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // User
      Post.belongsTo(models.User, { 
        foreignKey: 'postBy', 
        as: 'PostBy'
      });

      // Media
      Post.hasMany(models.Media, { 
        foreignKey: 'mediableId', 
        as: 'PostImages'
      });

      // Comment
      Post.hasMany(models.Comment, {
        foreignKey: 'commentableId', 
        as: 'Comments'
      });

      // React
      Post.hasMany(models.React, { 
        foreignKey: 'reactableId', 
        as: 'Reacts'
      });

      // Share
      Post.belongsTo(models.Post, { 
        foreignKey: 'parentId', 
        as: 'Share'
      });

      // Post Stickers
      Post.hasMany(models.PostSticker, {
        foreignKey: "postId",
        as: "PostStickers",
      });
    }
  }
  Post.init({
    postBy: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    feeling: DataTypes.STRING,
    privacy: DataTypes.STRING,
    status: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
    paranoid: true
  });
  return Post;
};