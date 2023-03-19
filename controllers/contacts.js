const { Contact } = require("../models");
const { handlerError, catcherWrapper } = require("../utils");

const addNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const changeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw handlerError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw handlerError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const getContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);
  if (!data) {
    throw handlerError(404, "Not found");
  }
  res.json(data);
};

const getContactsList = async (_, res) => {
  res.json(await Contact.find({}, "-createAt -updateAt"));
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw handlerError(404, "Not found");
  }
  res.json(result);
};

const contactsCtrl = {
  getContactsList: catcherWrapper(getContactsList),
  getContact: catcherWrapper(getContact),
  addNewContact: catcherWrapper(addNewContact),
  changeContact: catcherWrapper(changeContact),
  deleteContact: catcherWrapper(deleteContact),
  updateStatusContact: catcherWrapper(updateStatusContact),
};

module.exports = contactsCtrl;
