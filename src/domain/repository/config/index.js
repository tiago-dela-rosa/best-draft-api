import Config from "../../models/config";
import { v4 as uuidv4 } from "uuid";

export default class ConfigRepository {
  constructor(connection) {
    this.connection = connection;
  }

  create({ name, active_status, public_status, user_uid, date }) {
    this.connection
      .createQueryBuilder()
      .insert()
      .into(Config)
      .values({
        config_uid: uuidv4(),
        name: name,
        active_status: active_status,
        public_status: public_status,
        created_by: user_uid,
        created_at: date,
        updated_at: date,
      })
      .execute();
  }
}
