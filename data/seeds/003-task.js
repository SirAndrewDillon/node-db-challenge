exports.seed = function(knex, Promise) {
	// Inserts seed entries
	return knex('task').insert([
		{
			description: 'host to website',
			notes: 'start with a plan',
			project_id: 1,
			completed: 'false',
		},
		{
			description: 'make sure to learn gutiar',
			notes: 'set apart time to play',
			project_id: 2,
			completed: 'false',
		},
		{
			description: 'Might need a dog house',
			notes: 'make time train the dog',
			project_id: 3,
			completed: 'false',
		},
	])
}
