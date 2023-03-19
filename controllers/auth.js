const bcrypt = require("bcrypt");

const { User } = require("../models");
const { handlerError, catcherWrapper } = require("../utils");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({
    email,
    name,
  });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout success",
  });
};

const updateSubdiscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: subscription,
  });
  if (!result) throw handlerError(404, "Not found");
  res.json(result);
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw handlerError(401, "Email or password is wrong");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw handlerError(401, "Email or password is wrong");
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw handlerError(409, "Email already in use");
  const hash = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hash });
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const authCtrl = {
  getCurrent: catcherWrapper(getCurrent),
  logOut: catcherWrapper(logOut),
  logIn: catcherWrapper(logIn),
  updateSubdiscription: catcherWrapper(updateSubdiscription),
  signUp: catcherWrapper(signUp),
};

module.exports = authCtrl;
