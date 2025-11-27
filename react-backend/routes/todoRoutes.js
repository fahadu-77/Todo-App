import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// GET all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// GET a single todo
router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

// CREATE a todo
router.post("/", async (req, res) => {
  const newTodo = await Todo.create(req.body);
  res.json(newTodo);
});

// UPDATE a todo
router.put("/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

export default router;
