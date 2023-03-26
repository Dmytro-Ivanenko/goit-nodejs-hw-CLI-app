const { Command } = require('commander');
const contacts = require('./db');

const program = new Command();

program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case 'list':
			const allContacts = await contacts.getAllContacts();
			console.log(allContacts);
			break;

		case 'get':
			const contact = await contacts.getContactByID(id);
			console.log(contact);
			break;

		case 'add':
			const newContact = await contacts.addContact(name, email, phone);
			console.log(newContact);
			break;

		case 'update':
			const updatedContact = await contacts.updateContact(id, {
				name,
				email,
				phone,
			});
			console.log(updatedContact);
			break;

		case 'remove':
			const deleteContact = await contacts.removeContact(id);
			console.log(deleteContact);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
};

invokeAction(argv);
