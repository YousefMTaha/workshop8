import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.connection.js";
import { userModel } from "./User.model.js";

class Blog extends Model {
  id;
  async isUserExist(userId) {
    const user = await userModel.findByPk(userId);
    if (!user) {
      throw new Error("invalid userId");
    }

    return true;
  }
}

Blog.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);
export default Blog;
