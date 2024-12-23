import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersManager() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: { Accept: 'application/json' },
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const addUser = async () => {
    if (!newUser.username.trim() || !newUser.email.trim() || !newUser.password.trim()) {
      setError('Username, email, and password are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users', newUser, {
        headers: { Accept: 'application/json' },
      });
      setUsers([response.data, ...users]);
      setSuccessMessage('User added successfully!');
      setNewUser({ username: '', email: '', password: '' });
      setError(null);
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: { Accept: 'application/json' },
      });
      setSuccessMessage('User deleted successfully!');
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update user information
  const updateUser = async (id) => {
    const userToUpdate = users.find((user) => user.id === id);
    if (!userToUpdate) return;

    setLoading(true);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${id}`,
        { username: userToUpdate.username, email: userToUpdate.email, password: userToUpdate.password },
        { headers: { Accept: 'application/json' } }
      );
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setSuccessMessage('User updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Manager</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {/* New User Form */}
      <div>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={addUser} disabled={loading}>
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </div>

      {/* Users List */}
      <div>
        <h3>Users List</h3>
        {loading && <p>Loading users...</p>}
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                <h4>{user.username}</h4>
                <p>Email: {user.email}</p>
                <button onClick={() => updateUser(user.id)} disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </button>
                <button onClick={() => deleteUser(user.id)} disabled={loading}>
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </li>
            ))
          ) : (
            <p>No users available. Add a new user to get started!</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default UsersManager;
