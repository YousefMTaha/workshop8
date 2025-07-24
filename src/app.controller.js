import express from "express";
import { testDBConnection, DBSync } from "./DB/db.connection.js";
import userController from "./modules/user/user.controller.js";
import blogController from "./modules/blog/blog.controller.js";

function bootstrap() {
  const app = express();
  const port = 3000;

  // parse body
  app.use(express.json());

  // check DB connection
  testDBConnection();

  // sync Models
  DBSync({ alter: true });

  // APIs routing
  app.use("/users", userController);
  app.use("/blogs", blogController);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

export default bootstrap;
