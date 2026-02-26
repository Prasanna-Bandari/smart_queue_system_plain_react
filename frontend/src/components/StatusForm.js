import React, { useState } from "react";

const StatusForm = () => {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const checkStatus = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:8080/api/user/status/${token}`
      );

      if (!res.ok) {
        throw new Error("Invalid token");
      }

      const data = await res.json();

      setStatus(data.status);
      setError("");
    } catch (err) {
      setError("Invalid Token ID");
      setStatus("");
    }
  };

  return (
    <div>
      <h2>Check Order Status</h2>

      <form onSubmit={checkStatus}>
        <input
          type="number"
          placeholder="Enter Token ID"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Check</button>
      </form>

      {status && <p>Status: <b>{status}</b></p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default StatusForm;