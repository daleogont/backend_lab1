'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
    }
  }
  Category.init({
    cat_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: true,
  });
  return Category;
};