const express = require("express");
const {
  getContact,
  getContactsList,
  addNewContact,
  changeContact,
  deleteContact,
} = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", getContactsList);

router.get("/:id", getContact);

router.post(
  "/",
  validateBody(schemas.addShema, "missing required name field"),
  addNewContact
);

router.put(
  "/:id",
  validateBody(schemas.addShema, "missing fields"),
  changeContact
);

router.delete("/:id", deleteContact);

module.exports = router;
