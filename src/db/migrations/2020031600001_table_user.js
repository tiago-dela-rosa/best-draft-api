exports.up = (knex) => {
    return knex.schema.withSchema('public').createTable('user', (table) => {
        table.uuid('user_uid', 11).primary().notNull()
        table.string('name', 80).notNull()
        table.string('email', 80).notNull()
        table.string('password', 80).notNull()
        table.integer('level', 2).defaultTo(1)
        table.timestamps()
    })
}

exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.withSchema('public').dropTableIfExists('user')
    ])
}