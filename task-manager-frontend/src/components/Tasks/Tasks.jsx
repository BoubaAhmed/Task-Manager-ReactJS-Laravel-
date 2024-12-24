import React, { useEffect, useState } from "react";
import { fetchProjects, fetchTasks } from "../../utils/api";
import AddTask from "./AddTask";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    const loadTasksAndProjects = async () => {
      try {
        const [taskData, projectData] = await Promise.all([fetchTasks(), fetchProjects()]);
        setTasks(taskData);
        setProjects(projectData);
        setFilteredTasks(taskData);
      } catch (error) {
        setError("Failed to load tasks or projects.");
      }
    };

    loadTasksAndProjects();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`);
      setSuccess("Task deleted successfully!");

      // Fetch updated tasks after deletion
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  };

  useEffect(() => {
    let updatedTasks = tasks;

    // Filter tasks
    if (filter !== "All") {
      updatedTasks = updatedTasks.filter((task) => task.status === filter);
    }

    // Search tasks
    if (search.trim()) {
      updatedTasks = updatedTasks.filter(
        (task) =>
          task.name.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredTasks(updatedTasks);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filter, search, tasks]);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-3">Tasks List</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Filters and Search */}
          <div className="d-flex mb-3">
            <select className="form-select me-2" value={filter} onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          {/* Tasks Table */}
          <div style={{ minHeight: "60vh" }}>
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.length ? (
                  currentTasks.map((task) => (
                    <tr key={task.id}>
                      <td>{projects.find((p) => p.id === task.project_id)?.name || "Unknown"}</td>
                      <td>{task.name}</td>
                      <td>{task.description}</td>
                      <td>{task.status}</td>
                      <td>{task.priority}</td>
                      <td>{task.due_date || "N/A"}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }, (_, i) => i + 1).map((page) => (
                <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Add Task Form */}
        <div className="col-md-4">
          <AddTask projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
