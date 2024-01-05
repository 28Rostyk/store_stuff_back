const { User } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const userUpdate = async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id);

  if (!user) {
    throw HttpError(401, "User is not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { ...req.body },
    { new: true }
  );

  // console.log("updatedUser :>> ", updatedUser);

  res.status(201).json(updatedUser);
};

module.exports = {
  userUpdate: ctrlWrapper(userUpdate),
};
