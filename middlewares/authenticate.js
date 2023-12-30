const jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY } = process.env;

const { HttpError } = require("../helpers");

const { User } = require("../models");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  console.log(authorization);

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    req.token = token;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
