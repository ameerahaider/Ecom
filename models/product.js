const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("../models/category");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

Category.hasMany(Product, { foreignKey: "categoryID" });
Product.belongsTo(Category, { foreignKey: "categoryID" });

module.exports = Product;
