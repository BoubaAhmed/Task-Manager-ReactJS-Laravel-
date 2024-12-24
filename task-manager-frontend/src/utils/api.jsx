import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: { Accept: 'application/json' }, // Default headers for all requests
});

// === User API Calls ===

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    console.log('Response:', response.data); // Log the response from the API
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new user
// ../utils/api.jsx

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message); 
    throw error; // Re-throw the error to be handled elsewhere if needed
  }
};


// Update an existing user
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message); 
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// === Task API Calls ===

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single task by ID
export const fetchTaskById = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing task
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// === Project API Calls ===

// Fetch all projects
export const fetchProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single project by ID
export const fetchProjectById = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing project
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// === UserTask API Calls ===

// Assign a task to a user
export const assignTaskToUser = async (userId, taskId, assignedDate) => {
  try {
    const response = await api.post('/user-tasks', { user_id: userId, task_id: taskId, assigned_date: assignedDate });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove a task assignment from a user
export const removeTaskFromUser = async (userId, taskId) => {
  try {
    const response = await api.delete(`/user-tasks/${userId}/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
