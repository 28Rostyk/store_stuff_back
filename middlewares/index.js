const { authenticate } = require("./authenticate");
const { passport } = require("./google-auth");

module.exports = {
  authenticate,
  passport,
};
