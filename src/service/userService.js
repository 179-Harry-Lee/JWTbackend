import bcrypt from "bcryptjs";
import mysql from "mysql2";
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

const createNewUser = (email, password, username) => {
  let hashPassword = hashUserPassword(password);
  connection.query(
    "INSERT INTO users (email, password ,username) VALUES (?,?,?)",
    [email, hashPassword, username],
    function (err, results, fields) {
      if (err) {
        console.log("Error inserting user: ", err);
      }
    }
  );
};

const getUserList = () => {
  let users = [];
  connection.query("SELECT * FROM users ", function (err, results, fields) {
    if (err) {
      console.log("Error inserting user: ", err);
    }
    console.log(results);
  });
};

module.exports = {
  createNewUser,
  getUserList,
};
