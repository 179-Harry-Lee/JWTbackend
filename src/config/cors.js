require("dotenv").config();

const configCors = (app) => {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
};

export default configCors;
