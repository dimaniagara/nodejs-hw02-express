const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const fs = require("fs/promises");
const path = require("path");

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
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hash, avatarURL });
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    avatarURL: "link to the image will be here",
  });
};

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const setAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

const authCtrl = {
  getCurrent: catcherWrapper(getCurrent),
  logOut: catcherWrapper(logOut),
  logIn: catcherWrapper(logIn),
  updateSubdiscription: catcherWrapper(updateSubdiscription),
  signUp: catcherWrapper(signUp),
  setAvatar: catcherWrapper(setAvatar),
};

module.exports = authCtrl;
