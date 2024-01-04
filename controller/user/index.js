const { login } = require("./login");
const { register } = require("./register");
const { logout } = require("./logout");
const { refreshToken } = require("./refreshToken");
const { getCurrent } = require("./getCurrent");
const { googleAuth } = require("./googleAuth");

module.exports = {
  login,
  register,
  logout,
  refreshToken,
  getCurrent,
  googleAuth,
};
