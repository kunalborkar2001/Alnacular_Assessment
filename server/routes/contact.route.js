const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const validate = require("../middlewares/validate")
const contactValidation = require("../validations/contact.validation")

// Routes
router.get('/', contactController.getAllContacts);

router.get('/search', contactController.searchContacts);

router.post('/', validate(contactValidation.addSingle), contactController.addContact);

router.post('/bulk-upload', (req, res, next) => {
    // Log the request body data before validation
    console.log("Request Body Data (Before Validation):", req.body);
    next();
}, validate(contactValidation.bulkUpload), contactController.addContacts);

router.patch('/:id', contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;
