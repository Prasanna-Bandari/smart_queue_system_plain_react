import React, { useState, useEffect } from "react";

const API = "http://localhost:8080/api/queue";
const quotes = [
  "Good things take time 🍕",
  "Almost there, your meal is on the way 🥗",
  "Patience is delicious 😋",
  "Your taste buds are about to celebrate 🎉",
  "Food is love, and love is worth the wait ❤️",
  "Hang tight! Something tasty is coming 🥪",
];

export default function StatusForm() {
  const [token, setToken] = useState(localStorage.getItem("tokenId") || "");
  const [status, setStatus] = useState("");
  const [quote, setQuote] = useState("");

  const checkStatus = async () => {
    if (!token) return alert("Enter token!");
    const res = await fetch(`${API}/status/${token}`);
    const text = await res.text();
    setStatus(text);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  useEffect(() => {
    if (token) checkStatus();
  }, []);

  return (
    <div className="card">
      <h2>🔹 Check Status</h2>
      <input
        placeholder="Enter Token ID"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={checkStatus}>Check</button>
      <p>{status}</p>
      <p>{quote}</p>
    </div>
  );
}