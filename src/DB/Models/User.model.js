import { DataTypes } from "sequelize";
import { sequelize } from "../db.connection.js";
import Blog from "./Blog.model.js";

export const userModel = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isAdmin(value) {
          if (
            value === "admin" ||
            value == "Mr. admin" ||
            value == "Ms. admin"
          ) {
            throw new Error(`firstName cannot be ${value}`);
          }
        },
      },

      set(value) {
        this.setDataValue("firstName", value.toLowerCase());
      },
      get() {
        return this.getDataValue("firstName").toUpperCase();
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userName: {
      type: DataTypes.VIRTUAL,
      get() {
        return (
          this.getDataValue("firstName") + " " + this.getDataValue("lastName")
        );
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Please enter valid email" },
      },
    },

    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: [8], msg: "age must be greater than 8" },
        max: 80,
      },
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      defaultValue: "Male",

      set(value) {
        if (value == "Male")
          this.setDataValue(
            "firstName",
            "Mr." + " " + this.getDataValue("firstName")
          );
        else
          this.setDataValue(
            "firstName",
            "Ms." + " " + this.getDataValue("firstName")
          );
      },
    },
  },
  {
    paranoid: true,
  }
);

userModel.hasMany(Blog, { foreignKey: {} });
Blog.belongsTo(userModel);
