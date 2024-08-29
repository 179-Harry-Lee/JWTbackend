import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser, { json } from "body-parser";
import configCors from "./config/cors";
require("dotenv").config();

import { createJWT, verifyToken } from "./middleware/JWTAction";
// import connection from "./config/connectDB";

const app = express();

const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection DB
// connection();

//test JWT
createJWT();
let decodedData = verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRHVuZyIsImFkZHJlc3MiOiJIQ00iLCJpYXQiOjE3MjQ5MzI2MDF9.WaHV4FTqOeOt_ulFBah7l2SxvBqUTwgjePyMSbM7Xgc"
);

console.log(decodedData);

// config view engine
configViewEngine(app);

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(`JWT backend is running on port http://localhost:${PORT}/`);
});
