"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get("/", (req, res) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res) => {
    const { title } = req.body;
    const todo = {
        id: new Date().toISOString(),
        title: title
    };
    todos.push(todo);
    res.status(201).json({ todo: todo });
});
router.delete('/todos/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(200).json({ todo: todos });
});
router.put('/todos/edit/:id', (req, res) => {
    const { title } = req.body;
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos[index].title = title;
    res.status(200).json({ todo: todos });
});
exports.default = router;
