import { Op } from "sequelize";
import { userModel } from "../../DB/Models/User.model.js";
import errResponse from "../../utils/response.js";
import Blog from "../../DB/Models/Blog.model.js";

export const signup = async (req, res, next) => {
  try {
    const user = await userModel.findOrCreate({
      where: { email: req.body.email },
      defaults: req.body,
    });

    return user[1]
      ? res.status(201).json({ message: "done", user })
      : res.status(409).json({ message: "email already exist" });
  } catch (error) {
    return errResponse({ error, res });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const { limit = 5, page = 1 } = req.query;

    // offset =
    // page 1 => limit * (page - 1) => 0
    // page 2 =>  5 * (2 - 1) => 5
    // page 3 => offset =

    const users = await userModel.findAndCountAll({
      where: { gender: "Male" },
      include: [{ model: Blog }],
      limit: limit,
      offset: (page - 1) * limit,
    });

    const totalPages = Math.ceil(users.count / limit); // 3.1

    return res.status(200).json({
      message: "done",
      users: users.rows,
      currentPage: page,
      pageSize: limit,
      totalPages,
    });
  } catch (error) {
    return errResponse({ error, res });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.findByPk(req.params.userId, {
      // paranoid: false,
    });

    return res.status(200).json({
      message: "done",
      user,
    });
  } catch (error) {
    return errResponse({ error, res });
  }
};

export const updateUser = async (req, res) => {
  try {
    const result = await userModel.update(req.body, {
      where: {
        id: req.params.userId,
      },
    });

    return !result[0]
      ? res.status(404).json({ message: "user id not found" })
      : res.status(200).json({ message: "updated" });
  } catch (error) {
    return errResponse({ error, res });
  }
};

export const freezeUser = async (req, res) => {
  try {
    const result = await userModel.destroy({
      where: {
        id: req.params.userId,
      },
    });

    return !result
      ? res.status(404).json({ message: "user id not found" })
      : res.status(200).json({ message: "deleted" });
  } catch (error) {
    return errResponse({ error, res });
  }
};

export const hardDeleteUser = async (req, res) => {
  try {
    const result = await userModel.destroy({
      where: {
        id: req.params.userId,
      },
      force: true,
    });

    return !result
      ? res.status(404).json({ message: "user id not found" })
      : res.status(200).json({ message: "deleted" });
  } catch (error) {
    return errResponse({ error, res });
  }
};

export const restoreUser = async (req, res) => {
  try {
    const result = await userModel.restore({
      where: {
        id: req.params.userId,
      },
    });

    return !result
      ? res.status(404).json({ message: "user id not found or not deleted" })
      : res.status(200).json({ message: "restored" });
  } catch (error) {
    return errResponse({ error, res });
  }
};
