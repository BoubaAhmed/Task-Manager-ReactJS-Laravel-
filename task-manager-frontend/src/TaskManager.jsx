import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({ name: '', description: '', status: 'Pending', due_date: '', project_id: '', user_ids: [] });
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch tasks, projects, and users when the component mounts
  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
        headers: { Accept: 'application/json' },
      });
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all projects
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

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: { Accept: 'application/json' },
      });
      setUsers(response.data); // Store users in state
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!task.name.trim() || !task.description.trim() || !task.project_id) {
      setError('Name, description, and project are required.');
      return;
    }

    setLoading(true);
    try {
      const newTask = await axios.post('http://127.0.0.1:8000/api/tasks', task, {
        headers: { Accept: 'application/json' },
      });
      setTasks([newTask.data, ...tasks]);
      setSuccessMessage('Task added successfully!');
      setTask({ name: '', description: '', due_date: '', project_id: '', user_ids: [] });
      setError(null);
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mark a task as completed
  const markCompleted = async (id) => {
    setLoading(true);
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      await axios.put(
        `http://127.0.0.1:8000/api/tasks/${id}`,
        { ...taskToUpdate, status: 'Completed' },
        { headers: { Accept: 'application/json' } }
      );
      setSuccessMessage('Task marked as completed!');
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
        headers: { Accept: 'application/json' },
      });
      setSuccessMessage('Task deleted successfully!');
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Task Manager</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add a New Task</h5>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Task Description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              value={task.due_date}
              onChange={(e) => setTask({ ...task, due_date: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={task.project_id}
              onChange={(e) => setTask({ ...task, project_id: e.target.value })}
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
            <select
              multiple
              className="form-select"
              value={task.user_ids}
              onChange={(e) => {
                const selectedUsers = Array.from(e.target.selectedOptions, option => option.value);
                setTask({ ...task, user_ids: selectedUsers });
              }}
            >
              <option value="">Select Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={addTask} disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </div>

      {loading && <p>Loading tasks...</p>}

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Tasks</h5>
          {tasks.length > 0 ? (
            <ul className="list-group">
              {tasks.map((task) => (
                <li key={task.id} className="list-group-item mb-3">
                  <h6>{task.name}</h6>
                  <p>{task.description}</p>
                  <p>Status: {task.status}</p>
                  <p>Due Date: {task.due_date}</p>
                  <p>Project: {task.project ? task.project.name : 'No project assigned'}</p>
                  <p>Assigned Users: {task.users?.map(user => user.username).join(', ') || 'No users assigned'}</p>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => markCompleted(task.id)}
                    disabled={loading || task.status === 'Completed'}
                  >
                    {task.status === 'Completed' ? 'Completed' : 'Mark as Completed'}
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteTask(task.id)} disabled={loading}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks available. Add a new task to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
