const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    tags: [{
        type: String
    }],
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
