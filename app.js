const express = require("express");
const fs = require("fs");

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
    for(var i=0; i<accounts.length; i++){
        if(accounts[i].id==id){
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
        if(accounts[i].id==id){
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
        if(accounts[i].id==accountId){
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

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});
