// src/pages/UserEdit.jsx

import React, { useEffect, useState } from 'react';
import { fetchUserById, updateUser } from '../../utils/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        role: '',
        status: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await fetchUserById(id);
                setUserData(user);
            } catch (error) {
                setError('Failed to fetch user');
            }
        };
        loadUser();
    }, [id]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(userData)
            await updateUser(id, userData);
            navigate(`/user/${id}`);
        } catch (error) {
            setError('Failed to update user');
        }
    };

    return (
        <div>
            <h1>Edit User</h1>
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditUser;
