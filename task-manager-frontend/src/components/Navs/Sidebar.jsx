import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaUser, FaProjectDiagram, FaTasks, FaClipboardList } from 'react-icons/fa';
import logo from '../../Assets/logo.png';

function Sidebar() {
    const [activeButton, setActiveButton] = useState("users");

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <h1>Task Manager</h1>
            </div>
            <nav  className='mt-5 w-100  d-flex justify-content-center'>
                <ul className=' px-auto w-75 '>
                    <li
                        className={activeButton === "users" ? "active" : ""}
                        onClick={() => handleButtonClick("users")}
                    >
                        <Link to="/">
                            <FaUser className="icon" />
                            <span>Users</span>
                        </Link>
                    </li>
                    <li
                        className={activeButton === "projects" ? "active" : ""}
                        onClick={() => handleButtonClick("projects")}
                    >
                        <Link to="/projects">
                            <FaProjectDiagram className="icon" />
                            <span>Projects</span>
                        </Link>
                    </li>
                    <li
                        className={activeButton === "tasks" ? "active" : ""}
                        onClick={() => handleButtonClick("tasks")}
                    >
                        <Link to="/tasks">
                            <FaTasks className="icon" />
                            <span>Tasks</span>
                        </Link>
                    </li>
                    <li
                        className={activeButton === "task-assignments" ? "active" : ""}
                        onClick={() => handleButtonClick("task-assignments")}
                    >
                        <Link to="/task-assignments">
                            <FaClipboardList className="icon" />
                            <span>Assignments</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="logo" style={{ marginTop:'auto' }}>
                <img src={logo} alt="Logo" className="logo-img" />
            </div>
        </div>
    );
}

export default Sidebar;
