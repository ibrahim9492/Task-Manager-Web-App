import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onAuth }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  // Reset form and error on mode change
  useEffect(() => {
    setForm({ username: '', password: '' });
    setError('');
  }, [isLogin]);

  // Auto-clear success message after 3.5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? 'login' : 'register';
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/users/${endpoint}`, form);

      if (isLogin) {
        localStorage.setItem('token', res.data.token); 
        onAuth(res.data.token);
        setError('');
        setSuccess('');
        navigate('/'); // Redirect after successful login
      } else {
        setSuccess('Registered successfully! Please login.');
        setError('');
        setForm({ username: '', password: '' });
      }
    } catch (err) {
      let msg = err.response?.data?.message || "Error";
      if (isLogin && msg.toLowerCase().includes('invalid')) {
        msg = "User not registered. Please register yourself first.";
      }
      setError(msg);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => { setIsLogin((x) => !x); setSuccess(''); }}>
        {isLogin ? "No account? Register" : "Have an account? Login"}
      </button>
      {/* Show messages */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
};

export default Auth;