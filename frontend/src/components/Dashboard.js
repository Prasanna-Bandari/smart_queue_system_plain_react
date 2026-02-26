import React, { useEffect, useState } from "react";

const API = "http://localhost:8080/api/queue";
const maxWaitTime = 20;

export default function Dashboard() {
  const [waitingList, setWaitingList] = useState([]);
  const [nowServing, setNowServing] = useState("No customer yet");

  const fetchWaiting = async () => {
    const res = await fetch(`${API}/waiting`);
    const data = await res.json();
    setWaitingList(data);
  };

  const callNext = async () => {
    const res = await fetch(`${API}/next`, { method: "POST" });
    const data = await res.json();
    if (data) setNowServing(`Now Serving: ${data.customer.name} (Token ${data.id})`);
    fetchWaiting();
  };

  const callPriorityNext = async () => {
    const res = await fetch(`${API}/priority-next`, { method: "POST" });
    const data = await res.json();
    if (data) setNowServing(`Now Serving: ${data.customer.name} (Token ${data.id})`);
    fetchWaiting();
  };

  const callThisNext = async (tokenId) => {
    const res = await fetch(`${API}/call/${tokenId}`, { method: "POST" });
    const data = await res.json();
    if (data) setNowServing(`Now Serving: ${data.customer.name} (Token ${data.id})`);
    fetchWaiting();
  };

  useEffect(() => {
    fetchWaiting();
    const interval = setInterval(fetchWaiting, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h2>🧑‍💼 Admin Panel</h2>
      <button onClick={callNext}>Call Next</button>
      <button onClick={callPriorityNext}>Call Priority Next</button>
      <h3>{nowServing}</h3>
      <h4>Waiting List</h4>
      <ul>
        {waitingList.map((item) => {
          const now = new Date().getTime();
          const createdAt = new Date(item.createdAt).getTime();
          const waited = Math.floor((now - createdAt) / 60000);

          let className = "";
          if (waited >= maxWaitTime) className = "waiting-long";
          else if (item.priority > 0) className = "priority";

          return (
            <li key={item.id} className={className}>
              <div>
                <div className="token-info">
                  🎫 Token: {item.id} | {item.customer.name} | {item.customer.orderDetails}
                </div>
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${Math.min((waited / maxWaitTime) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <button onClick={() => callThisNext(item.id)}>Call Now</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}