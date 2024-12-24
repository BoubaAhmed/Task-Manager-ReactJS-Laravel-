import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchTasks, fetchUsers } from "../../utils/api";

const Assignment = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users and tasks on component mount
  useEffect(() => {
    const fetchUsersAndTasks = async () => {
      try {
        const [userData, taskData] = await Promise.all([fetchUsers(), fetchTasks()]);
        setUsers(userData);
        setTasks(taskData);
      } catch (err) {
        setError("Failed to load users or tasks.");
      }
    };
    fetchUsersAndTasks();
  }, []);

  // Fetch tasks assigned to a specific user, with search and pagination
  const handleUserChange = async (userId) => {
    setSelectedUserId(userId);
    fetchUserTasks(userId);
  };

  const fetchUserTasks = async (userId, page = 1) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user-tasks/${userId}?page=${page}&search=${searchTerm}`
      );
      setUserTasks(response.data.data); // Assuming paginated data is inside 'data'
      setTotalPages(response.data.last_page); // Assuming the total pages are returned as 'last_page'
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to load user tasks.");
    }
  };

  // Create a new user-task assignment
  const handleAddAssignment = async () => {
    try {
      const newAssignment = {
        user_id: selectedUserId,
        task_id: selectedTaskId,
        assigned_date: assignedDate,
      };
      await axios.post("http://127.0.0.1:8000/api/user-tasks", newAssignment);
      setSuccess("Task assigned successfully!");
      fetchUserTasks(selectedUserId); // Refresh user tasks
    } catch (err) {
      setError("Failed to assign task.");
    }
  };

  // Delete a task assignment
  const handleDeleteAssignment = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user-tasks/${id}`);
      setSuccess("Task assignment deleted successfully!");
      fetchUserTasks(selectedUserId); // Refresh user tasks
    } catch (err) {
      setError("Failed to delete task assignment.");
    }
  };

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (selectedUserId) {
      fetchUserTasks(selectedUserId, 1); // Fetch user tasks with search
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (selectedUserId) {
      fetchUserTasks(selectedUserId, page); // Fetch user tasks for the specific page
    }
  };

  return (
    <div className="container my-4">
      <h2>Manage User Task Assignments</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* User and Task Assignment Form */}
      <div className="form-group">
        <label htmlFor="userSelect">Select User:</label>
        <select
          id="userSelect"
          className="form-control"
          value={selectedUserId}
          onChange={(e) => handleUserChange(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="taskSelect">Select Task:</label>
        <select
          id="taskSelect"
          className="form-control"
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
        >
          <option value="">Select a task</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="assignedDate">Assigned Date:</label>
        <input
          type="date"
          id="assignedDate"
          className="form-control"
          value={assignedDate}
          onChange={(e) => setAssignedDate(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleAddAssignment}>
        Assign Task
      </button>

      {/* Search and Table of Assigned Tasks */}
      {selectedUserId && (
        <div className="my-4">
          <h3>Assigned Tasks</h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userTasks?.length ? (
                userTasks.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>{tasks.find((task) => task.id === assignment.task_id)?.name}</td>
                    <td>{assignment.assigned_date}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteAssignment(assignment.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No tasks assigned to this user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Assignment;
