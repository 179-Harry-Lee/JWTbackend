require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser, { json } from "body-parser";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());

// config view engine
configViewEngine(app);

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
  return res.send("404 not found");
});
app.listen(PORT, () => {
  console.log(`JWT backend is running on port http://localhost:${PORT}/`);
});
