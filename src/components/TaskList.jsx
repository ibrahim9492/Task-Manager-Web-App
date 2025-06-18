import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm.jsx';

const API = `${import.meta.env.VITE_API_BASE}/tasks`;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchTasks = async () => {
    if (!token) return;  // Only fetch if token is available
    try {
      const res = await axios.get(`${API}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("TASKS RETURNED FROM BACKEND:", res.data);
      setTasks(res.data);
    } catch (e) {
      console.error("Error fetching tasks:", e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <TaskForm token={token} onSuccess={fetchTasks} editTask={editTask} setEditTask={setEditTask} />
      <ul>
        {tasks.map(task =>
          <li key={task._id}>
            <b>{task.title}</b> ({task.status}) - Due: {task.dueDate && task.dueDate.slice(0,10)}
            <br />
            {task.description}
            <button style={{ marginRight: '0.5rem' }} onClick={() => setEditTask(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
