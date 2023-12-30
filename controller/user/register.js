const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ctrlWrapper, HttpError } = require("../../helpers");

const { User } = require("../../models");

const {
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
  ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE,
} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = {
    id: result._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_LIFE,
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_LIFE,
  });

  const newUser = await User.findByIdAndUpdate(result._id, {
    accessToken,
    refreshToken,
  });

  res.status(201).json({
    // email: result.email,
    // avatar: result.avatar,
    // name: result.name,
    // id: result._id,

    newUser,
    // avatar: result.avatar,
    accessToken,
    refreshToken,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
