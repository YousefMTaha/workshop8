import { Router } from "express";
import * as userService from "./user.service.js";

const userRouter = Router();


// localhost:3000/users
userRouter.post("/signup", userService.signup);

userRouter.get("/", userService.getAllUsers);

userRouter.get("/:userId", userService.getUserById);

userRouter.patch("/restore/:userId", userService.restoreUser);

userRouter.patch("/:userId", userService.updateUser);

userRouter.delete("/freeze/:userId", userService.freezeUser);

userRouter.delete("/hard/:userId", userService.hardDeleteUser);

export default userRouter;
