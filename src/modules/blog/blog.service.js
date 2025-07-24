import Blog from "../../DB/Models/Blog.model.js";
import { userModel } from "../../DB/Models/User.model.js";
import errResponse from "../../utils/response.js";

export const findAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: userModel }],
    });

    return res.json({ blogs });
  } catch (error) {
    return errResponse({ error, res });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.upsert(req.body);

    return res.json({ blog });
  } catch (error) {
    return errResponse({ error, res });
  }
};
