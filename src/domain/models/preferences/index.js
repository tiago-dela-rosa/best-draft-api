import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  columns: {
    preference_uid: {
      primary: true,
      type: 'uuid',
    },
    data: {
      type: 'json',
    },
    created_by: {
      type: 'uuid',
    },
    config: {
      type: 'uuid',
    },
    created_at: {
      type: 'timestamptz',
    },
    updated_at: {
      type: 'timestamptz',
    },
  },
  name: 'preferences',
  schema: 'public',
  tableName: 'preferences',
  target: 'preferences',
});
