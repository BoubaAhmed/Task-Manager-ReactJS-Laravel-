import React, { useEffect, useState } from 'react';
import { fetchTaskAssignments, fetchTasks, fetchUsers } from '../utils/api';

const TaskAssignments = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, tasksData, assignmentsData] = await Promise.all([
          fetchUsers(),
          fetchTasks(),
          fetchTaskAssignments(),
        ]);
        setUsers(usersData);
        setTasks(tasksData);
        setAssignments(assignmentsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const handleAssignTask = async () => {
    // Call the API to assign task
  };

  return (
    <div>
      <h2>Task Assignments</h2>
      <form onSubmit={handleAssignTask}>
        <label>
          User:
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </label>
        <label>
          Task:
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
          >
            {tasks.map(task => (
              <option key={task.id} value={task.id}>{task.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Assign Task</button>
      </form>

      <h3>Assignments</h3>
      <ul>
        {assignments.map(assignment => (
          <li key={assignment.id}>
            {assignment.user.username} is assigned to {assignment.task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskAssignments;
