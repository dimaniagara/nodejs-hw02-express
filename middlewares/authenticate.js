const { handlerError } = require("../utils");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (token === "" || bearer !== "Bearer") {
    next(handlerError(401));
    return;
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) next(handlerError(401));
    req.user = user;
    next();
  } catch {
    next(handlerError(401));
  }
};

module.exports = authenticate;
