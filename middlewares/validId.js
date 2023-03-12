const { isValidObjectId } = require("mongoose");
const { handlerError } = require("../utils");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) next(handlerError(400, `${id} is not valid id`));
  next();
};

module.exports = isValidId;
