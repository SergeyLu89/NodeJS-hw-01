const Contacts = require("./contacts");

const { program } = require("commander");
program
  .option("-a, --action <type>")
  .option("-id, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-ph, --phone <type>");

program.parse();
const options = program.opts();

const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "list":
      const allContacts = await Contacts.listContacts();
      return console.table(allContacts);
    case "get":
      const contactById = await Contacts.getContactById(id);
      return console.log(contactById);
    case "add":
      const newContact = await Contacts.addContact(data);
      return console.log(newContact);
    case "remove":
      const removedContact = await Contacts.removeContact(id);
      return console.log(removedContact);
    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(options);
