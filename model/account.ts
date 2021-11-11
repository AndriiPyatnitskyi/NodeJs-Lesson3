class Account {
    id: Number;
    name: String;
    token: String;

    constructor(
        id: Number,
        name: String,
        token: String) {
        this.id = id;
        this.name = name;
        this.token = token;
    }
}

export default Account;
