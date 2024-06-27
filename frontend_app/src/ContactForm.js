import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ContactForm = () => {
    const [contact, setContact] = useState({
        title: '',
        firstName: '',
        lastName: '',
        position: '',
        company: '',
        streetNr: '',
        additionalInfo: '',
        zipCode: '',
        place: '',
        country: '',
        code: '',
        phoneNumber: '',
        email: '',
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/contacts/${id}`)
                .then(response => setContact(response.data))
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://localhost:5000/api/contacts/${id}`, contact)
                .then(() => navigate('/'))
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:5000/api/contacts', contact)
                .then(() => navigate('/'))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="container mt-4">
            <h1>{id ? 'Edit Contact' : 'Add Contact'}</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(contact).map(key => (
                    <div className="mb-3" key={key}>
                        <label className="form-label">{key}</label>
                        <input
                            type="text"
                            name={key}
                            value={contact[key]}
                            onChange={handleChange}
                            className="form-control"
                            placeholder={key}
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
};

export default ContactForm;
