const { nanoid } = require("nanoid");
const path = require("path");
const file = require("fs").promises;
const contactsPath = path.resolve(__dirname, "contacts.json");
async function listContacts() {
  const contacts = await file.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const findContact = contacts.find((el) => el.id === id);
  return findContact;
}
async function removeContact(id) {
  let contacts = await listContacts();
  const findContact = contacts.find((el) => el.id === id);
  contacts = contacts.filter((el) => el.id !== id);
  await file.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return findContact;
}

async function addContact(data) {
  const contactData = { ...data, id: nanoid() };
  const contacts = await listContacts();
  contacts.unshift(contactData);
  await file.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactData;
}
async function updateContact(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === id);
  if (index === -1) return null;
  contacts[index] = { id, ...data };
  await file.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
