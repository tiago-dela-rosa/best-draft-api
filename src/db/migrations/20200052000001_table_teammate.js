exports.up = (knex) => {
  return knex.schema.withSchema("public").createTable("teammate", (table) => {
    table.uuid("teammate_uid", 30).primary().notNull();

    table.string("name", 80).notNull();

    table.json("data").comment("Team mate data in json format");

    table.uuid("created_by", 30).notNull().comment("Created By for user_uid");

    table.uuid("config", 11);

    table.timestamps();

    table.foreign("created_by").references("user_uid").inTable("user");

    table.foreign("config").references("config_uid").inTable("config");
  });
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.withSchema("public").dropTableIfExists("teammate"),
  ]);
};
