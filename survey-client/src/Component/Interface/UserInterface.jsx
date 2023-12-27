// UserInterface.js
import React from 'react';
import { useState,axios } from 'react';

const UserInterface = () => {
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
    <div>
      <h1>Survey Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <br />
          <label>
            Gender:
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
          </label>
          <br />
          <label>
            Nationality:
            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <br />
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </label>
          <br />
          <label>
            Message:
            <textarea name="message" value={formData.message} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
  );
};

export default UserInterface;
