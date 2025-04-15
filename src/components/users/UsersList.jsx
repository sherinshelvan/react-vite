// src/components/UsersList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const userDetails = async (e, id) => {
    e.preventDefault();
    console.log('Clicked user id:', id);
    navigate(`/users/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td key={user.id}>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td><a onClick={(e) => userDetails(e, user.id)}>Details</a></td> */}
                <td>
                  <Link to={`/users/${user.id}`}>View</Link>
                  <Link to={`/users/edit/${user.id}`}>Edit</Link>
                </td>
              </tr>
              ))}
            </tbody>
        </table>
      </ul>
    </div>
  );
};

export default UsersList;
