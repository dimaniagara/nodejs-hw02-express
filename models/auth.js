const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");
const { subscriptionValues } = require("../constData");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const changeStatus = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionValues)
    .required(),
});

const userSchemas = {
  registerSchema,
  changeStatus,
  loginSchema,
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Set phone number for contact"],
    },
    subscription: {
      type: String,
      enum: subscriptionValues,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseError);

const User = model("user", userSchema);

module.exports = { User, userSchemas };
