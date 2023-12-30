const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ctrlWrapper, HttpError } = require("../../helpers");

const { User } = require("../../models");

const {
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
  REFRESH_TOKEN_LIFE,
  ACCESS_TOKEN_LIFE,
} = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_LIFE,
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_LIFE,
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.json({ accessToken, refreshToken, user });
};

module.exports = {
  login: ctrlWrapper(login),
};
