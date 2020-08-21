exports.up = (knex) => {
  return knex.schema.withSchema("public").createTable("config", (table) => {
    table
      .uuid("config_uid", 30)
      .primary()
      .notNull()
      .comment("Configuration identificator");

    table.string("name", 80).notNull().comment("Name given to configuration");

    table
      .integer("active_status", 1)
      .notNull()
      .comment("Configuration status. 0 = inative, 1 = ative");

    table
      .integer("public_status", 2)
      .notNull()
      .defaultTo(1)
      .comment(
        "Public configuration can be shared, global config are the admin config. 0 = private, 1 = public, 3 = global"
      );

    table.uuid("created_by", 30).notNull().comment("Created By for user_uid");

    table.timestamps();

    table.foreign("created_by").references("user_uid").inTable("user");
  });
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.withSchema("public").dropTableIfExists("config"),
  ]);
};
