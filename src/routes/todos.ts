import { Router } from "express";

import { Todo } from "../models/todo";

const router = Router();

const todos: Todo[] = [];
type RequestBody = { title: string };
type RequestParams = { id: string };

router.get("/", (req, res) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res) => {
    const { title } = req.body as RequestBody;
    const todo: Todo = {
        id: new Date().toISOString(),
        title: title
    };
    todos.push(todo);
    res.status(201).json({ todo: todo });
})

router.delete('/todos/delete/:id', (req, res) => {
    const { id } = req.params as RequestParams;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(200).json({ todo: todos });
})

router.put('/todos/edit/:id', (req, res) => {
    const { title } = req.body as RequestBody;
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos[index].title = title;
    res.status(200).json({ todo: todos });
})

export default router;