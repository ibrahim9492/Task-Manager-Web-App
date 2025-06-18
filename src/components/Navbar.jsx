import React from 'react';

const Navbar = ({ token, logout }) => (
  <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
    <div><b>Task Manager</b></div>
    {token ? <button onClick={logout}>Logout</button> : null}
  </nav>
);

export default Navbar;