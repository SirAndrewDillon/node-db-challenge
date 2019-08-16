const router = require('express').Router()
const knex = require('knex')

const db = require('../data/dbConfig')

router.get('/', (req, res) => {
	db('lambda')
		.then((actions) => {
			res.status(200).json(actions)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
})

router.post('/', async (req, res) => {
	try {
		const action = await db('lambda').insert(req.body)
		res.status(201).json(action)
	} catch (error) {
		res.status(500).json({ error: 'There was an error posting that!' })
	}
})
module.exports = router
