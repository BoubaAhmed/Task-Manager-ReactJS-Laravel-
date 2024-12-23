import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; 

const api = axios.create({
  baseURL: API_URL,
});

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users', {
        headers: { Accept: 'application/json' },
      });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProjects = async () => {
  try {
    const response = await api.get('/projects', {
        headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks', {
        headers: { Accept: 'application/json' },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
};

export const fetchTaskAssignments = async () => {
  try {
    const response = await api.get('/user-tasks', {
        headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }

  
};
