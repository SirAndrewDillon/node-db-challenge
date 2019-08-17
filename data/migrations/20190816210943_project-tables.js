exports.up = function(knex) {
	return knex.schema
		.createTable('project', (tbl) => {
			tbl.increments()
			tbl.text('name', 128).notNullable()
			tbl.text('description', 128)
			tbl.boolean('project_completed')
				.notNullable()
				.defaultTo(false)
		})
		.createTable('task', (tbl) => {
			tbl.increments()
			tbl.text('description', 128).notNullable()
			tbl.text('notes', 128)
			tbl.integer('project_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('project')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
			tbl.boolean('task_completed')
				.defaultTo(false)
				.notNullable()
		})
		.createTable('resource', (tbl) => {
			tbl.increments()
			tbl.text('name', 128).notNullable()
			tbl.text('description', 128)
		})
		.createTable('pro_res', (tbl) => {
			tbl.increments()
			tbl.integer('pro_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('project')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
			tbl.integer('res_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('resource')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
		})
}

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('pro_res')
		.dropTableIfExists('resource')
		.dropTableIfExists('task')
		.dropTableIfExists('project')
}
