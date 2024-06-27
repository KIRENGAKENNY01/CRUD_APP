const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/contactdetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const ContactSchema = new mongoose.Schema({
    title: String,
    firstName: String,
    lastName: String,
    position: String,
    company: String,
    streetNr: String,
    additionalInfo: String,
    zipCode: String,
    place: String,
    country: String,
    code: String,
    phoneNumber: String,
    email: String,
});

const Contact = mongoose.model('Contact', ContactSchema);

app.post('/api/contacts', (req, res) => {
    const contact = new Contact(req.body);
    contact.save()
        .then(contact => res.status(201).json(contact))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/api/contacts', (req, res) => {
    Contact.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/api/contacts/:id', (req, res) => {
    Contact.findById(req.params.id)
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.put('/api/contacts/:id', (req, res) => {
    Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/api/contacts/:id', (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(400).json({ error: err.message }));
});

const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
