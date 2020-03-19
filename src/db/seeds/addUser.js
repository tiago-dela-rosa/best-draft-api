const faker = require("faker");

const createFakeUser = () => ({
    user_uid: faker.random.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(10),
    created_at: faker.date.recent(3)
})

var fakeRecords = {
    users: [],
    usersRecords: 10
}

exports.seed = function (knex) {

    return knex('user').del()
        .then(() => {
            for (let i = 0; i < fakeRecords.usersRecords; i++) {
                fakeRecords.users.push(createFakeUser());
            }
            return fakeRecords.users;
        })
        .then(newUsers => {
            console.log(newUsers)
            return knex('user').insert(newUsers);
        })
}