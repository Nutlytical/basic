import React, { useState } from "react";

export default function AddTodo() {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { description };
    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    window.location = "/";
  };

  return (
    <div>
      <h1 className="text-center mt-5">Add Todo</h1>
      <form className="d-flex mt-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Add Todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ">
          ADD
        </button>
      </form>
    </div>
  );
}
