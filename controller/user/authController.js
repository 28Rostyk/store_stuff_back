const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const gravatar = require("gravatar");
const { ctrlWrapper, HttpError } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

// const avatarsDir = path.join(__dirname, "..", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  //   const avatarURL = gravatar.url(email);
  // const verificationCode = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    // avatarURL,
    // verificationCode,
  });

  //   const verifyEmail = {
  //     to: email,
  //     subject: "Verify email",
  //     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  //   };

  //   await sendEmail(verifyEmail);

  res.status(201).json({
    email: result.email,
    avatar: result.avatar,
    name: result.name,
    id: result._id,
  });
};

// const verify = async (req, res) => {
//   const { verificationCode } = req.params;
//   const user = await User.findOne({ verificationCode });
//   if (!user) {
//     throw HttpError(404, "User not found");
//   }

//   await User.findByIdAndUpdate(user._id, {
//     verify: true,
//     verificationCode: "",
//   });

//   res.json({
//     message: "Verification successful",
//   });
// };

// const resendVerifyEmail = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!email) {
//     throw HttpError(400, "missing required field email");
//   }
//   if (!user) {
//     throw HttpError(404, "User not found");
//   }
//   if (user.verify) {
//     throw HttpError(400, "Verification has already been passed");
//   }

//   const verifyEmail = {
//     to: email,
//     subject: "Verify email",
//     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`,
//   };

//   await sendEmail(verifyEmail);

//   res.json({
//     message: "Verification email sent",
//   });
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  //   if (!user.verify) {
  //     throw HttpError(401, "Email not verify");
  //   }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ user, token });
};
const getCurrent = async (req, res) => {
  const user = req.user;
  const token = req.token;

  res.status(200).json({
    token: user.token,
    user,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

// const userUpdateSubscription = async (req, res) => {
//   const { _id } = req.user;
//   const { subscription } = req.body;
//   await User.findByIdAndUpdate(_id, { subscription }, { runValidators: true });
//   res.status(200).json({
//     subscription,
//   });
// };

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempUpload, filename } = req.file;
//   console.log(tempUpload);
//   console.log(filename);
//   const avatarName = `${_id}_${filename}`;
//   const resultUpload = path.join(avatarsDir, avatarName);
//   await fs.rename(tempUpload, resultUpload);
//   const avatarURL = path.join("avatars", avatarName);
//   await User.findByIdAndUpdate(_id, { avatarURL });
//   res.json({ avatarURL });
// };

module.exports = {
  register: ctrlWrapper(register),
  //   verify: ctrlWrapper(verify),
  //   resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  //   userUpdateSubscription: ctrlWrapper(userUpdateSubscription),
  //   updateAvatar: ctrlWrapper(updateAvatar),
};
