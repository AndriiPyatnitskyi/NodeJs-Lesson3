const express = require("express");
const fs = require("fs");
const auth = require("./middleware/auth");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

const filePath = "accounts.json";
app.get("/api/accounts", function(req, res){

    const content = fs.readFileSync(filePath,"utf8");
    const accounts = JSON.parse(content);
    res.send(accounts);
});
// получение одного пользователя по id
app.get("/api/accounts/:id", function(req, res){

    const id = req.params.id; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const accounts = JSON.parse(content);
    let account = null;
    // находим в массиве пользователя по id
    for(let i=0; i<accounts.length; i++){
        if(accounts[i].id === id){
            account = accounts[i];
            break;
        }
    }
    // отправляем пользователя
    if(account){
        res.send(account);
    }
    else{
        res.status(404).send();
    }
});
// получение отправленных данных
app.post("/api/accounts", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const accountName = req.body.name;
    const accountAge = req.body.age;
    let account = {name: accountName, age: accountAge};

    let data = fs.readFileSync(filePath, "utf8");
    let accounts = JSON.parse(data);

    // находим максимальный id
    const id = Math.max.apply(Math,accounts.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    account.id = id+1;
    // добавляем пользователя в массив
    accounts.push(account);
    data = JSON.stringify(accounts);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("accounts.json", data);
    res.send(account);
});
// удаление пользователя по id
app.delete("/api/accounts/:id", function(req, res){

    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let accounts = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i < accounts.length; i++){
        if(accounts[i].id === id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        const account = accounts.splice(index, 1)[0];
        data = JSON.stringify(accounts);
        fs.writeFileSync("accounts.json", data);
        // отправляем удаленного пользователя
        res.send(account);
    }
    else{
        res.status(404).send();
    }
});
// изменение пользователя
app.put("/api/accounts", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    const accountId = req.body.id;
    const accountName = req.body.name;
    const accountAge = req.body.age;

    let data = fs.readFileSync(filePath, "utf8");
    const accounts = JSON.parse(data);
    let account;
    for(var i=0; i<accounts.length; i++){
        if(accounts[i].id === accountId){
            account = accounts[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(account){
        account.age = accountAge;
        account.name = accountName;
        data = JSON.stringify(accounts);
        fs.writeFileSync("accounts.json", data);
        res.send(account);
    }
    else{
        res.status(404).send(account);
    }
});


app.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});


app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});
