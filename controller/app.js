// const express = require("express");
// const fs = require("fs");
// const auth = require("../middleware/auth");
// const jwt = require("jsonwebtoken");
// const secretKey = "mySecretKey";
//
// const app = express();
// const jsonParser = express.json();
//
// app.use(express.static(__dirname + "/public"));
//
// const filePath = "../accounts.json";
//
// app.get("/api/accounts", function(req, res){
//
//     const content = fs.readFileSync(filePath,"utf8");
//     const accounts = JSON.parse(content);
//     res.send(accounts);
// });
//
// // получение одного пользователя по id
// app.get("/api/accounts/:id", function(req, res){
//
//     const id = req.params.id; // получаем id
//     const content = fs.readFileSync(filePath, "utf8");
//     const accounts = JSON.parse(content);
//     let account = null;
//     // находим в массиве пользователя по id
//     for(let i=0; i<accounts.length; i++){
//         if(accounts[i].id == id){
//             account = accounts[i];
//             break;
//         }
//     }
//     // отправляем пользователя
//     if(account){
//         res.send(account);
//     }
//     else{
//         res.status(404).send();
//     }
// });
// // получение отправленных данных
// app.post("/api/accounts", jsonParser, function (req, res) {
//
//     if(!req.body) return res.sendStatus(400);
//
//     const accountName = req.body.name;
//     let account = {name: accountName};
//
//     let data = fs.readFileSync(filePath, "utf8");
//     let accounts = JSON.parse(data);
//
//     // находим максимальный id
//     const id = Math.max.apply(Math,accounts.map(function(o){return o.id;}))
//     // увеличиваем его на единицу
//     account.id = id+1;
//
//     // Create token
//     // save user token
//     account.token = jwt.sign(
//         {account_name: account.name},
//         secretKey,
//         {
//             expiresIn: "2h",
//         }
//     );
//
//     // добавляем пользователя в массив
//     accounts.push(account);
//     data = JSON.stringify(accounts);
//     // перезаписываем файл с новыми данными
//     fs.writeFileSync("accounts.json", data);
//     res.send(account);
// });
//
// // удаление пользователя по id
// app.delete("/api/accounts/:id", function(req, res){
//
//     const id = req.params.id;
//     let data = fs.readFileSync(filePath, "utf8");
//     let accounts = JSON.parse(data);
//     let index = -1;
//     // находим индекс пользователя в массиве
//     for(var i=0; i < accounts.length; i++){
//         if(accounts[i].id == id){
//             index=i;
//             break;
//         }
//     }
//     if(index > -1){
//         // удаляем пользователя из массива по индексу
//         const account = accounts.splice(index, 1)[0];
//         data = JSON.stringify(accounts);
//         fs.writeFileSync("accounts.json", data);
//         // отправляем удаленного пользователя
//         res.send(account);
//     }
//     else{
//         res.status(404).send();
//     }
// });
// // изменение пользователя
// app.put("/api/accounts", jsonParser, function(req, res){
//
//     if(!req.body) return res.sendStatus(400);
//
//     const accountId = req.body.id;
//     const accountName = req.body.name;
//     const accountAge = req.body.age;
//
//     let data = fs.readFileSync(filePath, "utf8");
//     const accounts = JSON.parse(data);
//     let account;
//     for(let i=0; i<accounts.length; i++){
//         if(accounts[i].id == accountId){
//             account = accounts[i];
//             break;
//         }
//     }
//     // изменяем данные у пользователя
//     if(account){
//         account.age = accountAge;
//         account.name = accountName;
//         data = JSON.stringify(accounts);
//         fs.writeFileSync("accounts.json", data);
//         res.send(account);
//     }
//     else{
//         res.status(404).send(account);
//     }
// });
//
//
// app.get("/api/tokens", function(req, res){
//
//     let data = fs.readFileSync(filePath, "utf8");
//     const accounts = JSON.parse(data);
//     let tokens = accounts.map(account => account.token);
//
//     for(let i=0; i<accounts.length; i++){
//         console.log(accounts[i].token);
//     }
//
//     res.send(tokens);
//
//
//     // console.log(content);
//     // const a = content.map(function (item) {
//     //     return item.token;
//     // });
//
//
//     // let parse = JSON.parse("[" + content + "]");
//     // console.log(parse);
//
//     // let map = parse.map(value => JSON.parse(value.token));
//     // let map = parse.map(value => value.token);
//     // console.log(map);
//     // let contentArray = content.split("},");
//     // let tokens = contentArray.map(value => JSON.parse(value));
//
//     // console.log(contentArray);
//     // console.log(tokens);
//     // console.log(JSON.parse(tokens));
//
//     // res.send(JSON.parse(tokens));
// });
//
// app.listen(3000, function(){
//     console.log("Сервер ожидает подключения...");
// });
