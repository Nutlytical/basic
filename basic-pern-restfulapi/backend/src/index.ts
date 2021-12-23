import express from "express";
import cors from "cors";
import pool from "./db";

const app = express();

app.use(cors());
app.use(express.json());

// ADD TODO
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// GET ALL TODO
app.get("/todos", async (_req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");

    res.json(todos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// GET A TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// UPDATE A TODO
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
      description,
      id,
    ]);

    res.json("🚀 Todo was updated");
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE A TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    res.send(`🚀 Todo id ${id} was deleted`);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log(`🚀 Server is ready at http://localhost:5000}`);
});
