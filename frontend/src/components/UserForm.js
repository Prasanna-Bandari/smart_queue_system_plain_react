import React, { useState } from "react";

const API = "http://localhost:8080/api/queue";

function UserForm() {
  const [choice, setChoice] = useState(""); // order | status

  // Order form fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [orderDetails, setOrderDetails] = useState("");

  // Status
  const [token, setToken] = useState("");

  // Messages
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");

  // ================= ORDER =================

  const placeOrder = async () => {
    if (!name || !age || !email || !orderDetails) {
      alert("Fill all fields");
      return;
    }

    const data = {
      name: name,
      age: Number(age),
      email: email,
      orderDetails: orderDetails
    };

    try {
      const res = await fetch(`${API}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error("Order failed");
      }

      const result = await res.json();

      setResult(`✅ Order placed! Your Token ID: ${result.id}`);

      // Reset form
      setName("");
      setAge("");
      setEmail("");
      setOrderDetails("");

    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  // ================= STATUS =================

  const checkStatus = async () => {
    if (!token) {
      alert("Enter Token ID");
      return;
    }

    try {
      const res = await fetch(`${API}/status/${token}`);

      if (!res.ok) {
        throw new Error("Invalid Token");
      }

      const text = await res.text();

      setStatus(text);

    } catch (err) {
      console.error(err);
      alert("Invalid Token ID");
    }
  };

  // ================= UI =================

  return (
    <div className="card">

      <h2>User Panel</h2>

      {/* FIRST CHOICE */}
      {choice === "" && (
        <>
          <button onClick={() => setChoice("order")}>
            Want to Order
          </button>

          <button onClick={() => setChoice("status")}>
            Already Ordered
          </button>
        </>
      )}

      {/* ORDER FORM */}
      {choice === "order" && (
        <div>

          <h3>Place Order</h3>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Order Details"
            value={orderDetails}
            onChange={(e) => setOrderDetails(e.target.value)}
          />

          <button onClick={placeOrder}>
            Place Order
          </button>

          <p>{result}</p>

          <button onClick={() => setChoice("")}>
            ⬅ Back
          </button>

        </div>
      )}

      {/* STATUS FORM */}
      {choice === "status" && (
        <div>

          <h3>Check Status</h3>

          <input
            type="number"
            placeholder="Enter Token ID"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <button onClick={checkStatus}>
            Check
          </button>

          <p>{status}</p>

          <button onClick={() => setChoice("")}>
            ⬅ Back
          </button>

        </div>
      )}

    </div>
  );
}

export default UserForm;