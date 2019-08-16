exports.seed = function(knex, Promise) {
	// Inserts seed entries
	return knex('projects').insert([
		// Inserts seed entries
		{
			name: 'Make the world a better place',
			description: 'This will be a tough one',
			completed: 'false',
		},
		{
			name: 'Rock out with the Crue',
			description: 'This will be some serious fun',
			completed: 'false',
		},
		{
			name: 'Get a new dog',
			description: 'His name will be Cornhollio',
			completed: 'false',
		},
	])
}
