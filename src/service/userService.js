import bcrypt from "bcryptjs";
import mysql from "mysql2";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  try {
    await db.User.create({
      email: email,
      password: hashPassword,
      username: username,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async () => {
  //test relationship
  let newUser = await db.User.findOne({
    where: { id: 2 },
    attributes: ["id", "username", "email"],
    include: db.Group,
    raw: true,
    nest: true,
  });

  let roles = await db.Group.findAll({
    where: { id: 1 },

    include: db.Role,
    raw: true,
    nest: true,
  });

  console.log(newUser);
  console.log(roles);

  let user = [];
  user = await db.User.findAll();
  return user;
};

module.exports = {
  createNewUser,
  getUserList,
};
