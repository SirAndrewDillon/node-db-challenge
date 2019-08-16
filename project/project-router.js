const router = require('express').Router()
const knex = require('knex')

const db = require('../data/dbConfig')

router.get('/', (req, res) => {
	db('lambda')
		.then((projects) => {
			res.status(200).json(projects)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
})

router.post('/', async (req, res) => {
	try {
		const project = await db('lambda').insert(req.body)
		res.status(201).json(project)
	} catch (error) {
		res.status(500).json({ error: 'There was an error posting that!' })
	}
})

router.get('/project/:id', (req, res) => {
	const { id } = req.params
	db('lambda')
		.where({ id: id })
		.first()
		.then((projects) => {
			db('actions')
				.where({ project_id: id })
				.then((actions) => {
					projects.actions = actions
					return res.status(200).json(projects)
				})
		})
		.catch((err) => {
			res.status(500).json({ Error: 'There was an error getting that' })
		})
})
module.exports = router
