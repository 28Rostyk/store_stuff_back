const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  refreshToken,
} = require("../../controller");

const { validateBody } = require("../../utils");

const { authenticate } = require("../../middlewares");

const { schemas } = require("../../models");
const { userValidation, refreshValidation } = require("../../shemas");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), register);
// router.get("/verify/:verificationCode", verify);
// router.post(
//   "/resend-verify-email",
//   validateBody(schemas.emailSchema),
//   resendVerifyEmail
// );

// // signin
router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);
router.post("/refresh", validateBody(refreshValidation), refreshToken);

// router.patch("/", authenticate, userUpdateSubscription);

// router.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   resizeFile,
//   updateAvatar
// );

module.exports = router;
