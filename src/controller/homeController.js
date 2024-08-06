// Get the client
import mysql from "mysql2";

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  connection.query(
    "INSERT INTO users (email, password,username) VALUES (?,?,?)",
    [email, password, username],
    function (err, results, fields) {
      if (err) {
        console.log("Error inserting user: ", err);
      }
    }
  );
  return res.send("handle create new user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
