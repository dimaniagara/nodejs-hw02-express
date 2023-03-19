const express = require("express");
const { contactsCtrl } = require("../../controllers");
const { validateBody, validId } = require("../../middlewares");

const { contactsSchemas } = require("../../models");
const router = express.Router();

router.get("/", contactsCtrl.getContactsList);

router.get("/:id", validId, contactsCtrl.getContact);

router.post(
  "/",
  validateBody(contactsSchemas.addSchema, "missing required name field"),
  contactsCtrl.addNewContact
);

router.put(
  "/:id",
  validId,
  validateBody(contactsSchemas.addSchema, "missing fields"),
  contactsCtrl.changeContact
);
router.patch(
  "/:id/favorite",
  validId,
  validateBody(contactsSchemas.changeStatus, "missing fields"),
  contactsCtrl.updateStatusContact
);

router.delete("/:id", validId, contactsCtrl.deleteContact);

module.exports = router;
