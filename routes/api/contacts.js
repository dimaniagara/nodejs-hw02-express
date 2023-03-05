const express = require("express");
const {
  getContact,
  getContactsList,
  addNewContact,
  changeContact,
  deleteContact,
  updateStatusContact,
} = require("../../controllers");
const { validateBody, validId } = require("../../middlewares");

const { schemas } = require("../../models");
const router = express.Router();

router.get("/", getContactsList);

router.get("/:id", validId, getContact);

router.post(
  "/",
  validateBody(schemas.addSchema, "missing required name field"),
  addNewContact
);

router.put(
  "/:id",
  validId,
  validateBody(schemas.addSchema, "missing fields"),
  changeContact
);
router.patch(
  "/:id/favorite",
  validId,
  validateBody(schemas.changeStatus, "missing fields"),
  updateStatusContact
);

router.delete("/:id", validId, deleteContact);

module.exports = router;
