import React, { useState } from "react";
import Choice from "./components/Choice";
import UserForm from "./components/UserForm";
import Dashboard from "./components/Dashboard"; // admin panel

function App() {
  const [role, setRole] = useState(""); // "" | "user" | "admin"

  if (!role) return <Choice setRole={setRole} />;

  return (
    <div>
      {role === "user" && <UserForm />}
      {role === "admin" && <Dashboard />}
    </div>
  );
}

export default App;