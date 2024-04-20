const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config()

// Middleware
app.use(bodyParser.json());

// Routes
const contactRoutes = require('./routes/contact.route');
app.use('/contacts', contactRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://kunalborkar2001:pveoINdiVlZx2wEm@kunalsmongo.5raphyd.mongodb.net/alnacular')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
