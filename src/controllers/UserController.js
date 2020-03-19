import { createConnection, getManager, getRepository } from 'typeorm';
import { User } from '../db/entities/User';
import Database from '../db/index'

const db = new Database;

class UserController {

    getUsers(req, res) {

        // const entityManager = getManager(); // you can also get it via getConnection().manager
        // const user = await entityManager.findOne(User, 1);

        // user.name = "Umed";
        // await entityManager.save(user);

        //console.log(db.check())

        return res.send({ message: db.check() })
    }
}

export default UserController;