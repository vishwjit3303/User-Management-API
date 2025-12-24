const Todo = require('../models/Todo');

// Create Todo
exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            user: req.user,
            title: req.body.title
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Todos with Search & Pagination
exports.getTodos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        const query = {
            user: req.user,
            title: { $regex: search, $options: 'i' } // Case insensitive search
        };

        const todos = await Todo.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Todo.countDocuments(query);

        res.json({
            todos,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};