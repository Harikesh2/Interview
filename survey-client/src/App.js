import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './App.css'
import SignUp from './Component/SignUp';
import AdminInterface from './Component/Interface/AdminInterface';
import UserInterface from './Component/Interface/UserInterface';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000', formData);
      alert('Survey response submitted!');
      setFormData({
        name: '',
        gender: '',
        nationality: '',
        email: '',
        phone: '',
        address: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting survey response:', error);
    }
  };

  return (
     
      <UserInterface />
  );
}

export default App;
