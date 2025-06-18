import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = `${import.meta.env.VITE_API_BASE}/tasks`;
const init = { title: "", description: "", status: "Pending", dueDate: "" };

const TaskForm = ({ onSuccess, editTask, setEditTask }) => {
  const [task, setTask] = useState(init);
  const token = localStorage.getItem('token');  // ✅ Directly get token from localStorage

  useEffect(() => {
    if (editTask) {
      setTask({
        ...editTask,
        dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 10) : ""
      });
    } else {
      setTask(init);
    }
  }, [editTask]);

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await axios.put(`${API}/${editTask._id}`, task, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditTask(null);
      } else {
        await axios.post(API, task, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setTask(init);
      onSuccess();
    } catch (e) {
      alert("Error: " + (e.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" required value={task.title} onChange={handleChange} />
      <input name="description" placeholder="Description" value={task.description} onChange={handleChange} />
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <input name="dueDate" type="date" value={task.dueDate} onChange={handleChange} />
      <button type="submit">{editTask ? "Update" : "Add Task"}</button>
      {editTask && <button type="button" onClick={() => setEditTask(null)}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
