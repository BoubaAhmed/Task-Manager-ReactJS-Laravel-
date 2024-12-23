import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskManager from './TaskManager';
import ProjectManager from './ProjectManager';
import UsersManager from './UsersManager';
import Navbar from './components/Navbar';
import Users from './components/Users';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import TaskAssignments from './components/Assignment';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/task-assignments" element={<TaskAssignments />} />

        {/* <Route path="/" element={<TaskManager />} /> */}
        <Route path="/users" element={<UsersManager />} />
        <Route path="/user" element={<Users />} />
        {/* <Route path="/projects" element={<ProjectManager />} /> */}
      </Routes>
    </Router>
    
  );
}

export default App;
