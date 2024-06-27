import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        axios.get('http://localhost:5000/api/contacts')
            .then(response => setContacts(response.data))
            .catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/contacts/${id}`)
            .then(() => {
                setContacts(contacts.filter(contact => contact._id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-4">
            <h1>Contact List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact._id}>
                            <td>{contact.title}</td>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>
                                <Link to={`/edit/${contact._id}`} className="btn btn-warning me-2">Edit</Link>
                                <button onClick={() => handleDelete(contact._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;
