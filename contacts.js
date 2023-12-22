const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.resolve("db", "contacts.json");

async function readFile() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

function writeFile(contacts) {
  fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readFile();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readFile();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);

  await writeFile(contacts);

  return deletedContact;
}

async function addContact(data) {
  const contacts = await readFile();
  const newContact = { ...data, id: crypto.randomUUID() };

  contacts.push(newContact);

  await writeFile(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
