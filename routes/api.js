const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all Todos
router.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new Todo
router.post("/api/todos", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

// Update a Todo
router.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

// Delete a Todo
router.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(deletedTodo);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
