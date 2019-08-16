exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('resource')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('table_name').insert([
				{ name: 'Barbara Dillon', description: 'Mom' },
				{ name: 'Gina Dillon', description: 'Ex-Wife' },
				{ name: 'Cassie Dillon', description: 'Daughter' },
			])
		})
}
