import React, { useEffect, useState } from 'react';
import { deleteProject, fetchProjects } from '../../utils/api';
import { FaSearch, FaCog } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const projectsPerPage = 5;

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

   const handleDelete = async (userId) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        try {
          await deleteProject(userId);
          const data = await fetchProjects();
          setProjects(data);
          setFilteredProjects(data);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    };
  useEffect(() => {
    const filtered = projects.filter(project =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (priorityFilter === '' || project.priority === priorityFilter) &&
      (statusFilter === '' || project.status === statusFilter)
    );
    setFilteredProjects(filtered);
  }, [searchTerm, priorityFilter, statusFilter, projects]);

  // Pagination calculations
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="projects-container">
      <div className="d-flex justify-content-between align-items-center">
        <h2><i className="fas fa-project-diagram shadow me-2" style={{ color: '#FF8000' }}></i> Project List </h2>
        <button className="btn create-project shadow">
          <i className="fas fa-plus-circle"></i> Create
        </button>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div className="input-group" style={{ width: '30%' }}>
          <span className="input-group-text" style={{ color: '#8B5DFF' }}>
            <FaSearch />
          </span>
          <input
            type="text"
            style={{ fontSize: '1rem' }}
            className="form-control"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="form-select shadow px-3"
            style={{ marginRight: '10px' }}
          >
            <option value="">Filter by Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="form-select shadow px-3"
          >
            <option value="">Filter by Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button className="btn btn-outline-secondary">
          <FaCog /> Settings
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div className="spinner" style={{ display: 'inline-block', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 2s linear infinite' }}></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <table className="table table-hover shadow">
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Priority</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map(project => (
                <tr key={project.id} style={trStyle}>
                  <td style={tdStyle}>{project.name}</td>
                  <td style={tdStyle}>{project.description}</td>
                  <td style={tdStyle}>{project.priority}</td>
                  <td style={tdStyle}>{project.status}</td>
                  <td style={tdStyle} className='text-center'>
                    <div className="dropdown">
                      <button
                        className="btn  dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${project.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v"></i> {/* Icon for actions */}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${project.id}`}>
                        <li>
                          <a className="dropdown-item" href={`/project/${project.id}`}>
                            <i className="bi bi-eye"></i> Show
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href={`/project/${project.id}/edit`}>
                            <i className="bi bi-pencil"></i> Edit
                          </a>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleDelete(project.id)}
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'end', marginTop: '20px' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                style={{
                  padding: '7px 15px',
                  fontSize: '0.8rem',
                  margin: '5px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: currentPage === number ? '#624E88' : '#fff',
                  color: currentPage === number ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const thStyle = {
  textAlign: 'left',
  padding: '10px',
  backgroundColor: '#6439FF',
  border: 'none',
  fontFamily: "Outfit",
  color:'#FFF4EA'
};

const tdStyle = {
  textAlign: 'left',
  padding: '10px',
  border: 'none',
};

const trStyle = {
  backgroundColor: '#fff',
  transition: 'background-color 0.2s',
}; 

export default Projects;
