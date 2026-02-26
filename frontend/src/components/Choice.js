import React from "react";

const Choice = ({ setRole }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Select Your Role</h2>
      <button onClick={() => setRole("user")} style={{ margin: "10px" }}>User</button>
      <button onClick={() => setRole("admin")} style={{ margin: "10px" }}>Admin</button>
    </div>
  );
};

export default Choice;