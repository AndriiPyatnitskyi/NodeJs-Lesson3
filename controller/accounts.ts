import { Request, Response } from 'express';

import * as fs from 'fs';
import Account from "../model/account";
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const secretKey = "mySecretKey";


// app.use(express.static(__dirname + "/public"));

const filePath = "./accounts.json";

const getAccounts: any = async (req: Request, res: Response) => {
    const content = fs.readFileSync(filePath,"utf8");
    const accounts: [Account] = JSON.parse(content);
    res.send(accounts);
};



export default { getAccounts };

