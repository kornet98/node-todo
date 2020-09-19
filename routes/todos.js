const { Router } = require('express')

const TodoTask = require("../models/TodoTask");
const schemaValidator = require("../middlewares/schemaValidator")
const router = new Router();

// GET METHOD

router.get('/todos', async (req, res, next) => {
	try {
		const todos = await TodoTask.find({})
		res.status(200).json(todos)
	} catch (error) {
		res.status(400).json({ message: "Error" })
	}
})

//POST METHOD

router.post('/todos', schemaValidator, async (req, res, next) => {
	try {
		const { title, description } = req.body;
		const taskTitle = await TodoTask.findOne({ title });

		if (taskTitle) {
			return res.status(400).json({ message: "Task already exist" });
		}

		const todo = new TodoTask({ title, description });
		await todo.save();
		res.status(201).json({ message: 'Task was created' });

	} catch (error) {
		res.status(500).json({ message: 'Something went wrong, try again' });
		next(error)
	}

});

//UPDATE

router.put("/todos/:id", async (req, res, next) => {
	try {
		const task = await TodoTask.findById(req.params.id);

		if (!task) {
			return res.status(400).json({ message: 'The task wasn`t found' })
		}

		task.done = !task.done;
		await task.save();
		res.status(204).json({ message: "Task was switched" });

	} catch (error) {
		res.status(500).json({ message: "The task wasn`t updated " })
		next(error)
	}
});

//DELETE

router.delete("/todos/:id", async (req, res, next) => {
	try {
		const task = await TodoTask.findByIdAndRemove(req.params.id);

		if (!task) {
			return res.status(400).json({ message: 'The task wasn`t found' })
		}

		res.status(204).json({ message: "Task was deleted" });

	} catch (error) {
		res.status(500).json({ message: "Task was deleted" })
		res.redirect('/')
		next(error)
	}
});


module.exports = router;