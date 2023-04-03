const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

// work with file
const rewriteFile = async (contArr) => {
	await fs.writeFile(contactsPath, JSON.stringify(contArr, null, 2));
};

// contacts API
const getAllContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
};

const getContactByID = async (id) => {
	const data = await getAllContacts();
	const oneItem = data.find((item) => item.id === id);
	return oneItem || null;
};

const addContact = async (name, email, phone) => {
	const contacts = await getAllContacts();

	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};

	contacts.push(newContact);
	await rewriteFile(contacts);
	return newContact;
};

const updateContact = async (id, data) => {
	const contacts = await getAllContacts();
	const index = contacts.findIndex((item) => {
		return item.id === id;
	});

	if (index === -1) {
		return null;
	}

	contacts[index] = { id, ...data };

	await rewriteFile(contacts);

	return contacts[index];
};

const removeContact = async (id) => {
	const contacts = await getAllContacts();
	const index = contacts.findIndex((item) => {
		return item.id === id;
	});

	if (index === -1) {
		return null;
	}

	const [result] = contacts.splice(index, 1);

	await rewriteFile(contacts);
	return result;
};

module.exports = {
	getAllContacts,
	getContactByID,
	addContact,
	updateContact,
	removeContact,
};
