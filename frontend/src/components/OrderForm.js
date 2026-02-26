import React, { useState } from "react";

const OrderForm = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    orderDetails: "",
  });

  const [msg, setMsg] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/user/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setToken(data.tokenId);
      setMsg("Order placed successfully!");
    } catch {
      setMsg("Failed to place order");
    }
  };

  return (
    <div>
      <h2>New Order</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="orderDetails"
          placeholder="Order Details"
          value={form.orderDetails}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Place Order</button>

      </form>

      {msg && <p>{msg}</p>}
      {token && <p><b>Your Token: {token}</b></p>}
    </div>
  );
};

export default OrderForm;