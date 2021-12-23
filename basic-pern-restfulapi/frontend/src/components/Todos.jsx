import React, { useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      const feedback = await res.text();

      setFeedback(feedback);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/todos");
      const todos = await res.json();

      setTodos(todos);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {!!feedback && (
        <div className="alert alert-danger mt-5" role="alert">
          {feedback}
        </div>
      )}
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Todo_id</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <th scope="row">{todo.todo_id}</th>
              <td>{todo.description}</td>
              <td>
                <button className="btn btn-warning">Edit</button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
