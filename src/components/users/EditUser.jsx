// src/components/EditUser.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [disableButton, setDisableButton] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', password: '', avatar: '' });
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`);
        setUser({ ...res.data, password: '' }); // Don’t prefill password
        setLoading(false);
      } catch (err) {
        setError('Failed to load user');
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setDisableButton(true);
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/users/${id}`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('User updated:', res.data);
      navigate('/users');
    } catch (err) {
      setError('Failed to update user');
      setDisableButton(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2>Edit User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input name="name" value={user.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password (leave blank to keep existing):</label>
          <input name="password" type="password" value={user.password} onChange={handleChange} />
        </div>
        <div>
          <label>Avatar URL:</label>
          <input name="avatar" value={user.avatar} onChange={handleChange} required />
        </div>
        {disableButton && <div>Updating...</div>}
        <button disabled={disableButton} type="submit">{disableButton? <span>Updating...</span>: <span>Update</span>}</button>
      </form>
    </div>
  );
};

export default EditUser;
