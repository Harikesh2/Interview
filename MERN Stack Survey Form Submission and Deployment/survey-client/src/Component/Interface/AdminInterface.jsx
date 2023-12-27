// AdminInterface.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminInterface = () => {
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });

  const [token, setToken] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', loginFormData);
      const { success, token } = response.data;

      if (success) {
        setToken(token);
        setError(null);
      } else {
        setToken(null);
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setToken(null);
      setError('Internal Server Error');
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions', {
          headers: { Authorization: token },
        });
        setSubmissions(response.data.submissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    if (token) {
      fetchSubmissions();
    }
  }, [token]);

  if (!token) {
    return (
      <div>
        <h2>Admin Login</h2>
        <label>
          Username:
          <input
            type="text"
            value={loginFormData.username}
            onChange={(e) => setLoginFormData({ ...loginFormData, username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={loginFormData.password}
            onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>Admin Interface</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Survey Submissions</h3>
      <ul>
        {submissions.map((submission) => (
          <li key={submission._id}>
            <strong>Name:</strong> {submission.name}, <strong>Email:</strong> {submission.email}
            {/* Display other submission details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminInterface;


