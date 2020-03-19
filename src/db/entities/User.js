const User = {
    name: "User",
    columns: {
        user_uid: {
            primary: true,
            type: "string"
        },
        name: {
            type: "string"
        },
        email: {
            type: "string"
        },
        password: {
            type: "string"
        },
        level: {
            type: "number"
        }
    }
}

export default User;