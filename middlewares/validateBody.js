const { handlerError } = require("../utils");

const validateBody = (shema, text) => {
  const foo = (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      next(handlerError(400, text));
    }
    next();
  };
  return foo;
};

module.exports = validateBody;
