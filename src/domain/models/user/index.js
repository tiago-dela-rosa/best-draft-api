import { EntitySchema } from "typeorm";

export default new EntitySchema({
    columns: {
        user_uid: {
            primary: true,
            type: "uuid"
        },
        name: {
            type: "varchar"
        },
        email: {
            type: "varchar"
        },
        password: {
            type: "varchar"
        },
        level: {
            type: "integer"
        },
        created_at: {
            type: "timestamptz"
        },
        updated_at: {
            type: "timestamptz"
        }
    },
    name: 'user',
    schema: 'public',
    tableName: 'user',
    target: 'user'
})