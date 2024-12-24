// src/pages/UserShow.jsx

import React, { useEffect, useState } from 'react';
import { fetchUserById } from '../../utils/api';
import { useParams } from 'react-router-dom';
// import './UserShow.css'; // Custom CSS for styling

const ReadUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await fetchUserById(id);
                setUser(userData);
            } catch (error) {
                setError('Failed to fetch user');
            }
        };
        loadUser();
    }, [id]);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!user) {
        return <p className="loading-message">Loading...</p>;
    }

    return (
        <div className="user-show-container">
            {/* User Details */}
            <div className="user-details">
                <h1>{user.first_name} {user.last_name}</h1>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone_number}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Status:</strong> {user.status}</p>
            </div>

            {/* Tasks Section */}
            <div className="tasks-section">
                <h2>Assigned Tasks</h2>
                {user.tasks && user.tasks.length > 0 ? (
                    <table className="tasks-table">
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Due Date</th>
                                <th>Assigned Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.tasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.due_date}</td>
                                    <td>{task.pivot.assigned_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tasks assigned.</p>
                )}
            </div>
        </div>
    );
};

export default ReadUser;
