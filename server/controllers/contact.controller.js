const Contact = require('../models/contact.schema');

// Controller methods
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchContacts = async (req, res) => {
    const { name, tags } = req.query;
    try {
        const query = {};
        if (name) query.name = { $regex: name, $options: 'i' };
        if (tags) query.tags = { $in: tags.split(',') };
        const contacts = await Contact.find(query);
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addContact = async (req, res) => {
    const contact = new Contact(req.body);
    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.addContacts = async (req, res) => {
    const contacts = req.body;
    try {
        const newContacts = await Contact.insertMany(contacts);
        res.status(201).json(newContacts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.updateContact = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(204).json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
