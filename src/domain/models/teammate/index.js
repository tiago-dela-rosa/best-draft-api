import { EntitySchema } from "typeorm";

export default new EntitySchema({
  columns: {
    teammate_uid: {
      primary: true,
      type: "uuid",
    },
    name: {
      type: "varchar",
    },
    data: {
      type: "json",
    },
    created_by: {
      type: "uuid",
    },
    config: {
      type: "uuid",
    },
    created_at: {
      type: "timestamptz",
    },
    updated_at: {
      type: "timestamptz",
    },
  },
  name: "teammate",
  schema: "public",
  tableName: "teammate",
  target: "teammate",
});
