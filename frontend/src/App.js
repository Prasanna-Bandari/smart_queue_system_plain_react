import React from "react";
import Dashboard from "./components/Dashboard";
import UserForm from "./components/UserForm";
import StatusForm from "./components/StatusForm";

function App() {
  return (
    <div>
      <Dashboard />      {/* Admin panel */}
      <UserForm />       {/* Customer order */}
      <StatusForm />     {/* Customer status */}
    </div>
  );
}

export default App;