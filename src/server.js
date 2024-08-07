import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser, { json } from "body-parser";
require("dotenv").config();
// import connection from "./config/connectDB";

const app = express();

const PORT = process.env.PORT || 8080;

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection DB
// connection();

// config view engine
configViewEngine(app);

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(`JWT backend is running on port http://localhost:${PORT}/`);
});
