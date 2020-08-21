import { EntitySchema } from "typeorm";

export default new EntitySchema({
    columns: {
        config_uid: {
            primary: true,
            type: "uuid"
        },
        name: {
            type: "varchar"
        },
        active_status: {
            type: "integer"
        },
        public_status: {
            type: "integer"
        },
        created_by: {
            type: "uuid"
        },
        created_at: {
            type: "timestamptz"
        },
        updated_at: {
            type: "timestamptz"
        }
    },
    name: 'config',
    schema: 'public',
    tableName: 'config',
    target: 'config'
})