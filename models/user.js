const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaErrors } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      matсh: emailRegexp,
      unique: true,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", function (error, doc, next) {
  handleSchemaErrors(error, doc, next);
});

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().allow(""),
  avatar: Joi.string().allow(""),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": `missing required field email` }),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};
const User = model("users", userSchema);

module.exports = {
  User,
  schemas,
};
