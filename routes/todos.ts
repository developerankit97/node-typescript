import { Router } from "express";

import { Todo } from "../models/todo";

const router = Router();

const todos: Todo[] = [];

router.get("/", (req, res) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res) => {
    const todo: Todo = {
        id: new Date().toISOString(),
        title: req.body.title
    };
    todos.push(todo);
    res.status(201).json({ todo: todo });
})

router.delete('/todos/delete/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(200).json({ todo: todos });
})

router.put('/todos/edit/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos[index].title = req.body.title;
    res.status(200).json({ todo: todos });
})

export default router;