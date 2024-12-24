// src/pages/UserCreate.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../utils/api';

const AddUser = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        role: 'Designer',
        status: 'active',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(userData);
            navigate('/users');
        } catch (error) {
            setError('Failed to create user');
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    name="phone_number"
                    value={userData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
                <select
                name="role"
                value={userData.role}
                onChange={handleChange}
                >
                <option value="Designer">Designer</option>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
                </select>

                <select
                    name="status"
                    value={userData.status}
                    onChange={handleChange}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default AddUser;
