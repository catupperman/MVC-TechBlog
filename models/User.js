const { Sequelize } = require("sequelize/types");

const {Model, DataTypes} = require("sequelize")
const bcrypt = require('bcrypt')

const sequalize = require('../config/connection');
const { is } = require("sequelize/types/lib/operators");

class User extends Model{
    checkPassword(loginPW){
        return bcrypt.compareSync(loginPW, this.password)
    }
};
User.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,  
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        } 
    }
},{
    hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'User', 
})

module.exports = User;