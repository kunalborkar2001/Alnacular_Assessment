const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Routes
router.get('/', contactController.getAllContacts);

router.get('/search', contactController.searchContacts);

router.post('/', contactController.addContact);

router.post('/bulk-upload', contactController.addContacts);

router.patch('/:id', contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;
