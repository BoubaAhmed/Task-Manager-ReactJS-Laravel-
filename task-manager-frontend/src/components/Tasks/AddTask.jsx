import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ projects }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

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
      setSuccess("Task added successfully!");
      setNewTask({
        project_id: "",
        name: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        due_date: "",
      });
    } catch (err) {
      setError("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-3">Add New Task </h2>
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
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </div>
  );
};

export default AddTask;
