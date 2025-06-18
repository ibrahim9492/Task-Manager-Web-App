import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoPeople } from "react-icons/io5";

const notificationStyle = {
  position: "fixed",
  bottom: "30px",
  right: "30px",
  background: "#262d41",
  color: "#fff",
  padding: "15px 28px",
  borderRadius: "32px",
  boxShadow: "0 4px 16px #0003",
  fontSize: "1rem",
  fontWeight: 500,
  zIndex: 1000,
  opacity: 0.96,
  animation: "fadeIn 0.7s",
};

const UserCountNotification = () => {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/users/count`);
        setUserCount(res.data.count);
      } catch {
        setUserCount(null);
      }
    };

    fetchCount();
    const timer = setInterval(fetchCount, 10000); // update every 10 seconds

    return () => clearInterval(timer);
  }, []);

  if (userCount === null) return null;

  return (
    
  <div style={notificationStyle}>
    <IoPeople /> &nbsp;
 {userCount} Active Users — 🚀Register now! <br/>
  </div>
);

};

export default UserCountNotification;