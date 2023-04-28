"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get("/", (req, res) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res) => {
    const todo = {
        id: new Date().toISOString(),
        title: req.body.title
    };
    todos.push(todo);
    res.status(201).json({ todo: todo });
});
router.post('/todos/delete/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(200).json({ todo: todos });
});
router.post('/todos/edit/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos[index].title = req.body.title;
    res.status(200).json({ todo: todos });
});
exports.default = router;
