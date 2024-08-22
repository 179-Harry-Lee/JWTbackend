import loginRegisterService from "../service/loginRegisterService.js";

const testAPI = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test API",
  });
};

const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res
        .status(200)
        .json({ EM: "Missing required parameters", EC: "1", DT: "" });
    }
    if (req.body.password && req.body.password.length < 2) {
      return res.status(200).json({
        EM: "Password must be at least 2 characters long",
        EC: "1",
        DT: "",
      });
    }
    let data = await loginRegisterService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //error code
      DT: "", //data
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

module.exports = {
  testAPI,
  handleRegister,
  handleLogin,
};
