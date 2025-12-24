const express = require('express');
const router = express.Router();
const { createTodo, getTodos } = require('../controllers/todoController');
const protect = require('../middleware/authMiddleware');

router.route('/').post(protect, createTodo).get(protect, getTodos);

module.exports = router;