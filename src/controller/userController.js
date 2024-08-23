import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
  try {
    let data = await userApiService.getAllUsers();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const createFunc = async (req, res) => {
  try {
    let users = await userApiService.getAllUsers();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let users = await userApiService.getAllUsers();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let users = await userApiService.getAllUsers();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
