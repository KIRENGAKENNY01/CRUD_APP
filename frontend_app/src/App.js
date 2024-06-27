import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<ContactList />} />
                    <Route path="/add" element={<ContactForm />} />
                    <Route path="/edit/:id" element={<ContactForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
