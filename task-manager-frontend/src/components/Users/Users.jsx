import React, { useEffect, useState } from 'react';
import { deleteUser, fetchUsers } from '../../utils/api';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Users.css'
import { FaSearch } from 'react-icons/fa';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  
  useEffect(() => {
    const filtered = users.filter(user =>
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === '' || user.role === roleFilter)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='users-container'>
      <div className="d-flex justify-content-between align-items-center">
        <h2><i className="fas fa-users shadow me-2" style={{ color:'#FF8000' }}></i> User List </h2>
        <Link className="btn create-user shadow" to="/user/create">
          <i className="fas fa-plus-circle" ></i> Create
        </Link>
      </div>
      <p className='mt-2'>Total des utilisateurs: {users?.length}</p>


      <div className='d-flex justify-content-between mb-3'>
        <div className="input-group " style={{ width:'30%' }}>
          <span className="input-group-text border-0 shadow" style={{ color:'#8B5DFF' }}>
            <FaSearch />
          </span>
          <input
            type="text" style={{ fontSize:'1rem' }}
            className="form-control border-0 shadow"
            placeholder="Search by name or username or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={roleFilter} className='shadow px-3'
          onChange={e => setRoleFilter(e.target.value)}
          style={{
            padding: '6px',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          <option value="">Filter by Role</option>
          <option value="Designer">Designer</option>
          <option value="Developer">Developer</option>
          <option value="Tester">Tester</option>
        </select>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div className="spinner" style={{ display: 'inline-block', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 2s linear infinite' }}></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <table className='table table-hover shadow'>
            <thead>
              <tr>
                <th style={thStyle}>
                  <i className="bi bi-person"></i> Username
                </th>
                <th style={thStyle}>
                  <i className="bi bi-envelope"></i> Email
                </th>
                <th style={thStyle}>
                  <i className="bi bi-person-fill"></i> First Name
                </th>
                <th style={thStyle}>
                  <i className="bi bi-person-fill"></i> Last Name
                </th>
                <th style={thStyle}>
                  <i className="bi bi-telephone"></i> Phone Number
                </th>
                <th style={thStyle}>
                  <i className="bi bi-shield-lock"></i> Role
                </th>
                <th style={thStyle}>
                  <i className="bi bi-check-circle"></i> Status
                </th>
                <th style={thStyle}>
                  <i className="bi bi-gear"></i> Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user.id} style={trStyle}>
                  <td style={tdStyle}>{user.username}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>{user.first_name}</td>
                  <td style={tdStyle}>{user.last_name}</td>
                  <td style={tdStyle}>{user.phone_number}</td>
                  <td style={tdStyle}>{user.role}</td>
                  <td style={tdStyle}>{user.status}</td>
                  <td style={tdStyle} className='text-center'>
                    <div className="dropdown">
                      <button
                        className="btn  dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${user.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v"></i> {/* Icon for actions */}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${user.id}`}>
                        <li>
                          <Link className="dropdown-item" to={`/user/${user.id}`}>
                            <i className="bi bi-eye"></i> Show
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to={`/user/${user.id}/edit`}>
                            <i className="bi bi-pencil"></i> Edit
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleDelete(user.id)}
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
                key={number} className='shadow'
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

export default Users;
