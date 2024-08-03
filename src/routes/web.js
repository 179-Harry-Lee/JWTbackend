import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

const initWebRoutes = (app) => {
  //path,handler
  router.get("/", homeController.handleHelloWorld);

  router.get("/user", homeController.handleUserPage);

  router.use((req, res, next) => {
    res.status(404).send("Page Not Found");
  });

  return app.use("/", router);
};

export default initWebRoutes;
