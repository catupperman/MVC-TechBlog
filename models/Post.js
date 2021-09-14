const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { };

Post.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING
},
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;

