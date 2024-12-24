import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Projects from './components/Projects/Projects';
import Tasks from './components/Tasks/Tasks';
import Assignment from './components/Assignment/Assignment';
import './App.css'; // Global styles
import Sidebar from './components/Navs/Sidebar';
import Users from './components/Users/Users';
import AddUser from './components/Users/AddUser';
import ReadUser from './components/Users/ReadUser';
import EditUser from './components/Users/EditUser';
 
function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/user/create" element={<AddUser />} /> 
            <Route path="/user/:id" element={<ReadUser />} />
            <Route path="/user/:id/edit" element={<EditUser />} />
            
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/task-assignments" element={<Assignment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
