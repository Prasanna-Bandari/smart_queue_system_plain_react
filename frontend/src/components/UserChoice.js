import React from "react";

const UserChoice = ({ onChoice }) => {
  return (
    <div>
      <h2>User Portal</h2>

      <p>Please choose an option:</p>

      <button onClick={() => onChoice("order")}>
        I want to Order
      </button>

      <br /><br />

      <button onClick={() => onChoice("status")}>
        Already Ordered
      </button>
    </div>
  );
};

export default UserChoice;