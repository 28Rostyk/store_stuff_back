const { login } = require("./login");
const { register } = require("./register");
const { logout } = require("./logout");
const { refreshToken } = require("./refreshToken");
const { getCurrent } = require("./getCurrent");
const { googleAuth } = require("./googleAuth");
const { userUpdate } = require("./userUpdate");

module.exports = {
  login,
  register,
  logout,
  refreshToken,
  getCurrent,
  googleAuth,
  userUpdate,
};
