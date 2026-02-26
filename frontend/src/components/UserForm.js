import React, { useState } from "react";

const API = "http://localhost:8080/api/queue";

export default function UserForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [result, setResult] = useState("");

  const addCustomer = async () => {
    const data = { name, age, email, orderDetails: order };
    const res = await fetch(`${API}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setResult(`✅ Your Token ID: ${json.id}`);
    localStorage.setItem("tokenId", json.id);
  };

  return (
    <div className="card">
      <h2>🍽 Place Your Order</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Order Details" value={order} onChange={(e) => setOrder(e.target.value)} />
      <button onClick={addCustomer}>Get Token</button>
      <p>{result}</p>
    </div>
  );
}