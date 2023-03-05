const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const changeStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  changeStatus,
};

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", mongooseError);
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
