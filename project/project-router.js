const express = require('express')
const knex = require('knex')
const project = require('./project-model.js')

const router = express.Router()

router.post('/resource', async (req, res) => {
	const resourceData = req.body
	try {
		const resource = await project.addResource(resourceData)
		res.status(201).json(resource)
	} catch (err) {
		res.status(500).json({ message: 'Failed to create new resource.' })
	}
})

router.get('/resource', async (req, res) => {
	try {
		const resources = await project.getResources()
		if (resources) {
			res.status(200).json(resources)
		} else {
			res.status(404).json({ message: 'Could not find resources.' })
		}
	} catch (err) {
		res.status(500).json({ message: 'Failed to get resources.' })
	}
})

router.post('/', async (req, res) => {
	const projectData = req.body
	try {
		const projects = await project.addProject(projectData)
		res.status(201).json(projects)
	} catch (err) {
		res.status(500).json({ message: 'Failed to add project.' })
	}
})

router.get('/', async (req, res) => {
	try {
		const projects = await project.getProjects()
		if (projects) {
			for (let i = 0; i < projects.length; i++) {
				projects[i].project_completed === 0
					? (projects[i].project_completed = false)
					: (projects[i].project_completed = true)
			}
			res.status(200).json(projects)
		} else {
			res.status(404).json({ message: 'Could not find projects.' })
		}
	} catch (err) {
		res.status(500).json({ message: 'Failed to retrieve projects.' })
	}
})

router.post('/tasks', async (req, res) => {
	const taskData = req.body
	try {
		const task = await project.addTask(taskData)
		res.status(201).json(task)
	} catch (err) {
		res.status(500).json({ message: 'Failed to add task.' })
	}
})

router.get('/tasks', async (req, res) => {
	try {
		const tasks = await project.getTasks()
		if (tasks) {
			for (let i = 0; i < tasks.length; i++) {
				tasks[i].task_completed === 0
					? (tasks[i].task_completed = false)
					: (tasks[i].task_completed = true)
			}
			res.status(200).json(tasks)
		} else {
			res.status(404).json({ message: 'Could not find tasks.' })
		}
	} catch (err) {
		res.status(500).json({ message: 'Failed to retrieve tasks.' })
	}
})

router.get('/full', async (req, res) => {
	try {
		const full = await project.getProjects()
		if (full) {
			for (let i = 0; i < full.length; i++) {
				full[i].project_completed === 0
					? (full[i].project_completed = false)
					: (full[i].project_completed = true)
				full[i].tasks = await project.getFullTasks(full[i].id)
				for (let j = 0; j < full[i].tasks.length; j++) {
					full[i].tasks[j].task_completed === 0
						? (full[i].tasks[j].task_completed = false)
						: (full[i].tasks[j].task_completed = true)
				}
				full[i].resources = await project.getFullResources(full[i].id)
			}
			res.status(200).json(full)
		} else {
			res.status(404).json({ message: 'Could not find projects.' })
		}
	} catch (err) {
		res.status(500).json({ message: 'Failed to retrieve projects.' })
	}
})

module.exports = router
