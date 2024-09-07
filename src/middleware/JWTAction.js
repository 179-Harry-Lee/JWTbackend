import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = ["/register", "/login"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    console.log(error);
  }

  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1, //error code
        DT: "", //data
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1, //error code
      DT: "", //data
      EM: "Not authenticated",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles.Roles;
    let currentUrl = req.path;

    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1, //error code
        DT: "", //data
        EM: "You dont have permission to access this",
      });
    }

    let canAccess = roles.some((item) => item.url === currentUrl);
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1, //error code
        DT: "", //data
        EM: "You dont have permission to access this",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1, //error code
      DT: "", //data
      EM: "Not authenticated",
    });
  }
};
module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
