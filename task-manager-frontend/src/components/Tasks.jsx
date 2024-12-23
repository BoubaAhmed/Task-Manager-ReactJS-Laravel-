import React, { useEffect, useState } from "react";
import { fetchProjects, fetchTasks } from "../utils/api";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newTask, setNewTask] = useState({
    project_id: "",
    name: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    due_date: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newTask.name.trim() || !newTask.description.trim() || !newTask.project_id) {
      setError("Name, description, and project selection are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tasks", newTask, {
        headers: { Accept: "application/json" },
      });

      setTasks([response.data, ...tasks]);
      setNewTask({
        project_id: "",
        name: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        due_date: "",
      });
      setSuccess("Task added successfully!");
    } catch (err) {
      setError("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Project</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

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
          <h2 className="mb-3">Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="project_id" className="form-label">
                Project
              </label>
              <select
                className="form-select"
                id="project_id"
                name="project_id"
                value={newTask.project_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Task Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={newTask.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                className="form-select"
                id="priority"
                name="priority"
                value={newTask.priority}
                onChange={handleInputChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="due_date" className="form-label">
                Due Date
              </label>
              <input
                type="date"
                className="form-control"
                id="due_date"
                name="due_date"
                value={newTask.due_date}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Adding..." : "Add Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
