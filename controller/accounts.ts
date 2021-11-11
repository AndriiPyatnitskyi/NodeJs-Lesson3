import {Request, Response} from 'express';

import * as fs from 'fs';
import Account from "../model/account";

const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const secretKey = "mySecretKey";

// app.use(express.static(__dirname + "/public"));

const filePath = "./accounts.json";

const getAccounts: any = async (req: Request, res: Response) => {
    const content = fs.readFileSync(filePath, "utf8");
    const accounts: [Account] = JSON.parse(content);
    res.send(accounts);
};

const getAccountById: any = async (req: Request, res: Response) => {

    const id = req.params.id; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const accounts = JSON.parse(content);
    let account = null;
    // находим в массиве пользователя по id
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id == id) {
            account = accounts[i];
            break;
        }
    }
    // отправляем пользователя
    if (account) {
        res.send(account);
    } else {
        res.status(404).send();
    }
};

const createAccount: any = async (req: Request, res: Response) => {

    if (!req.body) return res.sendStatus(400);

    const accountName: String = req.body.name;
    let account: Account = new Account();
    account.name = accountName;

    let data = fs.readFileSync(filePath, "utf8");
    let accounts = JSON.parse(data);

    // находим максимальный id
    const id: number = Math.max.apply(Math, accounts.map((o: Account) => o.id));
    // увеличиваем его на единицу
    account.id = id + 1;

    // Create token
    // save user token
    account.token = jwt.sign(
        {account_name: account.name},
        secretKey,
        {
            expiresIn: "2h",
        }
    );

    // добавляем пользователя в массив
    accounts.push(account);
    data = JSON.stringify(accounts);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("accounts.json", data);
    res.send(account);
};

const updateAccount: any = async (req: Request, res: Response) => {

    if (!req.body) return res.sendStatus(400);

    const accountId = req.params.id; // получаем id
    const accountName: String = req.body.name;

    let data = fs.readFileSync(filePath, "utf8");

    const accounts = JSON.parse(data);
    let account;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id == accountId) {
            account = accounts[i];
            break;
        }
    }

    // изменяем данные у пользователя
    if (account) {
        account.name = accountName;
        data = JSON.stringify(accounts);
        fs.writeFileSync("accounts.json", data);
        res.send(account);
    } else {
        res.status(404).send(account);
    }
};

const deleteAccount: any = async (req: Request, res: Response) => {

    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let accounts = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        // удаляем пользователя из массива по индексу
        const account = accounts.splice(index, 1)[0];
        data = JSON.stringify(accounts);
        fs.writeFileSync(filePath, data);
        // отправляем удаленного пользователя
        res.send(account);
    } else {
        res.status(404).send();
    }
};


const getAccountTokensByAccountId: any = async (req: Request, res: Response) => {

    const id = +req.params.id; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const accounts = JSON.parse(content);
    let account: Account = new Account();
    // находим в массиве пользователя по id
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id == id) {
            account = accounts[i];
            break;
        }
    }
    // отправляем пользователя
    if (account) {
        res.send(account.token);
    } else {
        res.status(404).send();
    }
};

const createAccountToken: any = async (req: Request, res: Response) => {

    if (!req.body) return res.sendStatus(400);

    const accountId: number = +req.params.id; // получаем id

    let data = fs.readFileSync(filePath, "utf8");

    const accounts: [Account] = JSON.parse(data);
    let account: Account = new Account();
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id == accountId) {
            account = accounts[i];
            break;
        }
    }

    if (account) {
        account.token = jwt.sign(
                {account_name: account.name},
                secretKey,
                {
                    expiresIn: "2h",
                }
            );
        data = JSON.stringify(accounts);
        fs.writeFileSync("accounts.json", data);
        res.send(account);
    } else {
        res.status(404).send(account);
    }
};

export default {getAccounts, getAccountById, createAccount, updateAccount, deleteAccount, getAccountTokensByAccountId, createAccountToken};

