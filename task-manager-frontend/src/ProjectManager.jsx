import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({ name: '', description: '', start_date: '', end_date: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/projects', {
        headers: { Accept: 'application/json' },
      });
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addProject = async () => {
    if (!project.name.trim() || !project.start_date.trim()) {
      setError('Name and start date are required.');
      return;
    }

    setLoading(true);
    try {
      const newProject = await axios.post('http://127.0.0.1:8000/api/projects', project, {
        headers: { Accept: 'application/json' },
      });
      setProjects([newProject.data, ...projects]);
      setSuccessMessage('Project added successfully!');
      setProject({ name: '', description: '', start_date: '', end_date: '' });
      setError(null);
    } catch (err) {
      console.error('Error adding project:', err);
      setError('Failed to add project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Project Manager</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <div>
        <input
          type="text"
          placeholder="Project Name"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={project.start_date}
          onChange={(e) => setProject({ ...project, start_date: e.target.value })}
        />
        <input
          type="date"
          placeholder="End Date"
          value={project.end_date}
          onChange={(e) => setProject({ ...project, end_date: e.target.value })}
        />
        <button onClick={addProject} disabled={loading}>
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </div>

      {loading && <p>Loading projects...</p>}

      <ul>
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>Start Date: {project.start_date}</p>
              <p>End Date: {project.end_date ? project.end_date : 'Ongoing'}</p>
            </li>
          ))
        ) : (
          <p>No projects available. Add a new project to get started!</p>
        )}
      </ul>
    </div>
  );
}

export default ProjectManager;
