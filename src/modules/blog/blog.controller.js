import { Router } from "express";
import * as blogService from "./blog.service.js";
const blogRouter = Router();

blogRouter.get("/", blogService.findAllBlogs);
blogRouter.post("/", blogService.createBlog);

export default blogRouter;
