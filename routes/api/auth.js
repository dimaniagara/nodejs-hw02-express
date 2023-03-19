const express = require("express");
const { userSchemas } = require("../../models");
const { validateBody, authenticate } = require("../../middlewares");
const { authCtrl } = require("../../controllers");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.changeStatus),
  authCtrl.updateSubdiscription
);

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  authCtrl.signUp
);

router.post("/login", validateBody(userSchemas.loginSchema), authCtrl.logIn);

router.get("/current", authenticate, authCtrl.getCurrent);

router.post("/logout", authenticate, authCtrl.logOut);

module.exports = router;
